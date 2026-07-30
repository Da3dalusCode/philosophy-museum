"""Build and verify locked media derivatives for one museum gallery."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import tempfile
import time
import urllib.error
import urllib.request
from contextlib import ExitStack
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "scripts" / "museumGallery26AssetManifest.json"
OUTPUT_ROOT = (
    ROOT / "public" / "assets" / "museum" / "colonialism-race-liberation"
)
USER_AGENT = (
    "PhilosophyAtlasMuseum/1.0 "
    "(+https://github.com/Da3dalusCode/philosophy-museum; local educational asset preparation)"
)
EXPECTED_ASSET_COUNT = 18
EXPECTED_HALL_FOLDER = "colonialism-race-liberation"
GALLERY_NUMBER = 26
ASSET_SOURCE_RECORD_PATH = (
    ROOT / "src" / "data" / "museum" / "colonialismRaceLiberationGalleryAssets.ts"
)
EXPECTED_VISUAL_CHARACTER_MINIMUM = 4
MAX_DERIVATIVE_BYTES = 600_000
MIN_DERIVATIVE_EDGE = 180
PERCEPTUAL_HASH_SIZE = 16
NEAR_DUPLICATE_DISTANCE_LIMIT = 6
VALID_VISUAL_CHARACTERS = {
    "portrait-or-figure",
    "artwork-or-social-scene",
    "place-or-architecture",
    "material-object",
    "map-or-diagram",
    "text-dominant",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def difference_hash(path: Path) -> int:
    with Image.open(path) as opened:
        grayscale = ImageOps.grayscale(ImageOps.exif_transpose(opened))
        reduced = grayscale.resize(
            (PERCEPTUAL_HASH_SIZE + 1, PERCEPTUAL_HASH_SIZE),
            Image.Resampling.LANCZOS,
        )
        pixels = list(reduced.getdata())
    value = 0
    row_width = PERCEPTUAL_HASH_SIZE + 1
    for row in range(PERCEPTUAL_HASH_SIZE):
        start = row * row_width
        for column in range(PERCEPTUAL_HASH_SIZE):
            value = (value << 1) | (
                pixels[start + column] > pixels[start + column + 1]
            )
    return value


def require_unique(records: dict[str, dict[str, object]], field: str) -> None:
    seen: dict[str, str] = {}
    for slug, record in records.items():
        value = record.get(field)
        if not isinstance(value, str):
            raise RuntimeError(f"{slug}.{field} must be a string.")
        previous = seen.get(value)
        if previous:
            raise RuntimeError(f"{slug}.{field} duplicates {previous}: {value}")
        seen[value] = slug


def require_unique_locks(records: dict[str, dict[str, object]]) -> None:
    for variant in ("scene", "panel"):
        seen: dict[str, str] = {}
        for slug, record in records.items():
            lock = record.get(variant)
            if not isinstance(lock, dict):
                raise RuntimeError(f"{slug}.{variant} lock is missing.")
            value = lock.get("sha256")
            if not isinstance(value, str):
                raise RuntimeError(f"{slug}.{variant}.sha256 must be a string.")
            previous = seen.get(value)
            if previous:
                raise RuntimeError(
                    f"{slug}.{variant}.sha256 duplicates {previous}: {value}"
                )
            seen[value] = slug


def assert_source_urls_are_new(
    records: dict[str, dict[str, object]],
) -> None:
    paths = [
        *sorted((ROOT / "src" / "data" / "museum").glob("*.ts")),
        *sorted((ROOT / "scripts").glob("*AssetManifest.json")),
    ]
    exclusions = {
        MANIFEST_PATH.resolve(),
        ASSET_SOURCE_RECORD_PATH.resolve(),
    }
    searchable = [
        (path, path.read_text(encoding="utf-8"))
        for path in paths
        if path.resolve() not in exclusions
    ]
    for slug, record in records.items():
        for field in ("sourcePageUrl", "sourceImageUrl"):
            url = str(record[field])
            matches = [
                path.relative_to(ROOT).as_posix()
                for path, text in searchable
                if url in text
            ]
            if matches:
                raise RuntimeError(
                    f"{slug}.{field} reuses another gallery source in "
                    f"{', '.join(matches)}: {url}"
                )


def load_manifest(refresh_locks: bool) -> dict[str, dict[str, object]]:
    document = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = document.get("assets")
    if document.get("version") != 1 or not isinstance(assets, dict):
        raise RuntimeError(f"Unsupported or malformed manifest: {MANIFEST_PATH}")
    if len(assets) != EXPECTED_ASSET_COUNT:
        raise RuntimeError(
            f"Expected {EXPECTED_ASSET_COUNT} Gallery {GALLERY_NUMBER} assets, found {len(assets)}."
        )

    characters: set[str] = set()
    for slug, record in assets.items():
        if not isinstance(record, dict):
            raise RuntimeError(f"{slug} must be an object.")
        if record.get("hallFolder") != EXPECTED_HALL_FOLDER:
            raise RuntimeError(
                f"{slug}.hallFolder must be {EXPECTED_HALL_FOLDER}."
            )
        for field in ("sourcePageUrl", "sourceImageUrl", "selectedThumbnailUrl"):
            value = record.get(field)
            if not isinstance(value, str) or not value.startswith("https://"):
                raise RuntimeError(f"{slug}.{field} must be a locked HTTPS URL.")
        visual_character = record.get("visualCharacter")
        if visual_character not in VALID_VISUAL_CHARACTERS:
            raise RuntimeError(f"{slug}.visualCharacter is missing or unsupported.")
        characters.add(str(visual_character))
        if (
            visual_character == "text-dominant"
            or record.get("textDominantOrSingleBook") is not False
        ):
            raise RuntimeError(
                f"{slug} violates Gallery {GALLERY_NUMBER}'s zero text-dominant/lone-book gate."
            )
        for maximum_field in ("sceneMaximum", "panelMaximum"):
            maximum = record.get(maximum_field)
            if not isinstance(maximum, int) or maximum < MIN_DERIVATIVE_EDGE:
                raise RuntimeError(
                    f"{slug}.{maximum_field} must be an integer at least "
                    f"{MIN_DERIVATIVE_EDGE}."
                )
        if not refresh_locks:
            for variant in ("scene", "panel"):
                if not isinstance(record.get(variant), dict):
                    raise RuntimeError(
                        f"{slug}.{variant} lock is missing; run --refresh-locks "
                        "intentionally after source review."
                    )

    if len(characters) < EXPECTED_VISUAL_CHARACTER_MINIMUM:
        raise RuntimeError(
            f"Gallery {GALLERY_NUMBER} has only {len(characters)} visual-character groups; "
            f"at least {EXPECTED_VISUAL_CHARACTER_MINIMUM} are required."
        )
    require_unique(assets, "sourcePageUrl")
    require_unique(assets, "sourceImageUrl")
    require_unique(assets, "selectedThumbnailUrl")
    assert_source_urls_are_new(assets)
    if not refresh_locks:
        require_unique_locks(assets)
    return assets


def download(url: str, destination: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                destination.write_bytes(response.read())
            return
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 4:
                raise
            retry_after = error.headers.get("Retry-After")
            suggested_delay = (
                int(retry_after) if retry_after and retry_after.isdigit() else 0
            )
            time.sleep(min(24, max(suggested_delay, 4 * (attempt + 1))))
    raise RuntimeError(f"Unable to download {url}")


def rgb_image(source: Path) -> Image.Image:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGBA", image.size, "#f3eee4")
            background.alpha_composite(image.convert("RGBA"))
            return background.convert("RGB")
        return image.convert("RGB")


def save_variant(
    image: Image.Image,
    destination: Path,
    maximum: int,
    quality: int,
) -> dict[str, int | str]:
    derivative = image.copy()
    if min(derivative.size) < MIN_DERIVATIVE_EDGE:
        scale = MIN_DERIVATIVE_EDGE / min(derivative.size)
        derivative = derivative.resize(
            (round(derivative.width * scale), round(derivative.height * scale)),
            Image.Resampling.LANCZOS,
        )
    derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    for candidate_quality in range(quality, 59, -4):
        derivative.save(destination, "WEBP", quality=candidate_quality, method=6)
        if destination.stat().st_size <= MAX_DERIVATIVE_BYTES:
            break
    else:
        raise RuntimeError(
            f"{destination.name} remains above the derivative byte ceiling."
        )
    return {
        "width": derivative.width,
        "height": derivative.height,
        "bytes": destination.stat().st_size,
        "sha256": sha256(destination),
    }


def inspect_variant(path: Path) -> dict[str, int | str]:
    with Image.open(path) as image:
        return {
            "width": image.width,
            "height": image.height,
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
        }


def assert_locked(
    slug: str,
    variant: str,
    actual: dict[str, int | str],
    expected: object,
) -> None:
    if not isinstance(expected, dict):
        raise RuntimeError(f"{slug}.{variant} has no lock.")
    differences = [
        field
        for field in ("width", "height", "bytes", "sha256")
        if actual[field] != expected.get(field)
    ]
    if differences:
        detail = ", ".join(
            f"{field}: expected {expected.get(field)}, got {actual[field]}"
            for field in differences
        )
        raise RuntimeError(f"{slug} {variant} drifted ({detail}).")


def assert_no_local_asset_collisions(asset_ids: list[str]) -> None:
    new_paths = [
        OUTPUT_ROOT / f"{asset_id}-{variant}.webp"
        for asset_id in asset_ids
        for variant in ("scene", "panel")
    ]
    other_paths = [
        path
        for path in (ROOT / "public" / "assets" / "museum").rglob("*.webp")
        if OUTPUT_ROOT not in path.parents
    ]
    other_sha = {sha256(path): path for path in other_paths}
    for path in new_paths:
        collision = other_sha.get(sha256(path))
        if collision:
            raise RuntimeError(
                f"Exact local asset collision: {path.relative_to(ROOT)} matches "
                f"{collision.relative_to(ROOT)}."
            )

    new_panels = [OUTPUT_ROOT / f"{asset_id}-panel.webp" for asset_id in asset_ids]
    other_panels = [path for path in other_paths if path.name.endswith("-panel.webp")]
    hashes = {
        path: difference_hash(path)
        for path in [*new_panels, *other_panels]
    }
    closest: tuple[int, Path, Path] | None = None
    for index, left in enumerate(new_panels):
        comparisons = [*new_panels[index + 1 :], *other_panels]
        for right in comparisons:
            distance = (hashes[left] ^ hashes[right]).bit_count()
            if closest is None or distance < closest[0]:
                closest = (distance, left, right)
            if distance <= NEAR_DUPLICATE_DISTANCE_LIMIT:
                raise RuntimeError(
                    "Perceptual near-duplicate collision "
                    f"(dHash distance {distance}/{PERCEPTUAL_HASH_SIZE ** 2}): "
                    f"{left.relative_to(ROOT)} and {right.relative_to(ROOT)}."
                )
    if closest:
        distance, left, right = closest
        print(
            "Closest perceptual comparison: "
            f"{distance}/{PERCEPTUAL_HASH_SIZE ** 2} between "
            f"{left.relative_to(ROOT)} and {right.relative_to(ROOT)}."
        )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--refresh-locks",
        action="store_true",
        help="Intentionally rebuild derivatives and replace hashes after source review.",
    )
    parser.add_argument(
        "--only",
        action="append",
        default=[],
        metavar="ASSET_ID",
        help="Limit preparation or lock refresh to a named asset; repeat for multiple assets.",
    )
    args = parser.parse_args()
    assets = load_manifest(args.refresh_locks)
    selected = set(args.only)
    unknown = selected.difference(assets)
    if unknown:
        raise RuntimeError(
            f"Unknown Gallery {GALLERY_NUMBER} asset selection: {', '.join(sorted(unknown))}"
        )
    refreshed = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    processed = 0

    with ExitStack() as stack:
        temporary: Path | None = None
        for index, (slug, record) in enumerate(assets.items(), start=1):
            if selected and slug not in selected:
                continue
            processed += 1
            OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
            scene_path = OUTPUT_ROOT / f"{slug}-scene.webp"
            panel_path = OUTPUT_ROOT / f"{slug}-panel.webp"

            if not args.refresh_locks and scene_path.exists() and panel_path.exists():
                assert_locked(
                    slug, "scene", inspect_variant(scene_path), record.get("scene")
                )
                assert_locked(
                    slug, "panel", inspect_variant(panel_path), record.get("panel")
                )
                print(f"[{index:02d}/{len(assets)}] {slug} (verified)", flush=True)
                continue

            if temporary is None:
                temporary = Path(
                    stack.enter_context(
                        tempfile.TemporaryDirectory(
                            prefix="philosophy-atlas-gallery-26-assets-"
                        )
                    )
                )
            source = temporary / f"{index:02d}-{slug}"
            candidate_scene = temporary / f"{slug}-scene.webp"
            candidate_panel = temporary / f"{slug}-panel.webp"
            print(f"[{index:02d}/{len(assets)}] {slug}", flush=True)
            download(str(record["selectedThumbnailUrl"]), source)
            image = rgb_image(source)
            scene_lock = save_variant(
                image,
                candidate_scene,
                int(record.get("sceneMaximum", 640)),
                82,
            )
            panel_lock = save_variant(
                image,
                candidate_panel,
                int(record.get("panelMaximum", 1280)),
                88,
            )

            if args.refresh_locks:
                refreshed["assets"][slug]["scene"] = scene_lock
                refreshed["assets"][slug]["panel"] = panel_lock
            else:
                assert_locked(slug, "scene", scene_lock, record.get("scene"))
                assert_locked(slug, "panel", panel_lock, record.get("panel"))

            for candidate, destination in (
                (candidate_scene, scene_path),
                (candidate_panel, panel_path),
            ):
                if destination.exists():
                    destination.unlink()
                shutil.copyfile(candidate, destination)
            time.sleep(0.35)

    if args.refresh_locks:
        require_unique_locks(refreshed["assets"])
        MANIFEST_PATH.write_text(
            json.dumps(refreshed, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"Refreshed {processed * 2} Gallery {GALLERY_NUMBER} derivative locks.")
    else:
        print(f"Verified {processed * 2} locked Gallery {GALLERY_NUMBER} derivatives.")

    if not selected:
        assert_no_local_asset_collisions(list(assets))


if __name__ == "__main__":
    main()
