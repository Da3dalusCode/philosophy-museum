"""Build and verify the locked Gallery 23 and 24 media derivatives."""

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
MANIFEST_PATH = ROOT / "scripts" / "museumGalleries23And24AssetManifest.json"
OUTPUT_ROOT = ROOT / "public" / "assets" / "museum"
USER_AGENT = (
    "PhilosophyAtlasMuseum/1.0 "
    "(+https://github.com/Da3dalusCode/philosophy-museum; local educational asset preparation)"
)
EXPECTED_ASSET_COUNT = 48
EXPECTED_FOLDER_COUNTS = {
    "critique-power-deconstruction": 24,
    "moral-life-practical-reason": 24,
}
MAX_DERIVATIVE_BYTES = 600_000
MIN_DERIVATIVE_EDGE = 180
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


def load_manifest(refresh_locks: bool) -> dict[str, dict[str, object]]:
    document = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = document.get("assets")
    if document.get("version") != 1 or not isinstance(assets, dict):
        raise RuntimeError(f"Unsupported or malformed manifest: {MANIFEST_PATH}")
    if len(assets) != EXPECTED_ASSET_COUNT:
        raise RuntimeError(
            f"Expected {EXPECTED_ASSET_COUNT} Gallery 23/24 assets, found {len(assets)}."
        )

    folder_counts = {folder: 0 for folder in EXPECTED_FOLDER_COUNTS}
    folder_characters = {folder: set() for folder in EXPECTED_FOLDER_COUNTS}
    for slug, record in assets.items():
        if not isinstance(record, dict):
            raise RuntimeError(f"{slug} must be an object.")
        folder = record.get("hallFolder")
        if folder not in EXPECTED_FOLDER_COUNTS:
            raise RuntimeError(f"{slug}.hallFolder is unsupported: {folder}")
        folder_counts[str(folder)] += 1
        for field in ("sourcePageUrl", "sourceImageUrl", "selectedThumbnailUrl"):
            value = record.get(field)
            if not isinstance(value, str) or not value.startswith("https://"):
                raise RuntimeError(f"{slug}.{field} must be a locked HTTPS URL.")
        visual_character = record.get("visualCharacter")
        if visual_character not in VALID_VISUAL_CHARACTERS:
            raise RuntimeError(f"{slug}.visualCharacter is missing or unsupported.")
        folder_characters[str(folder)].add(str(visual_character))
        if (
            visual_character == "text-dominant"
            or record.get("textDominantOrSingleBook") is not False
        ):
            raise RuntimeError(
                f"{slug} violates the zero paper-only/lone-book gate for Galleries 23 and 24."
            )
        for maximum_field in ("sceneMaximum", "panelMaximum"):
            maximum = record.get(maximum_field)
            if not isinstance(maximum, int) or maximum < MIN_DERIVATIVE_EDGE:
                raise RuntimeError(
                    f"{slug}.{maximum_field} must be an integer at least {MIN_DERIVATIVE_EDGE}."
                )
        if not refresh_locks:
            for variant in ("scene", "panel"):
                if not isinstance(record.get(variant), dict):
                    raise RuntimeError(
                        f"{slug}.{variant} lock is missing; run --refresh-locks intentionally after source review."
                    )

    if folder_counts != EXPECTED_FOLDER_COUNTS:
        raise RuntimeError(
            f"Gallery 23/24 folder counts drifted: expected {EXPECTED_FOLDER_COUNTS}, got {folder_counts}."
        )
    for folder, characters in folder_characters.items():
        if len(characters) < 4:
            raise RuntimeError(
                f"{folder} has only {len(characters)} visual-character groups; at least four are required."
            )
    require_unique(assets, "sourcePageUrl")
    require_unique(assets, "sourceImageUrl")
    require_unique(assets, "selectedThumbnailUrl")
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
    exact_ratio_reference: tuple[int, int] | None = None,
) -> dict[str, int | str]:
    derivative = image.copy()
    if min(derivative.size) < MIN_DERIVATIVE_EDGE:
        scale = MIN_DERIVATIVE_EDGE / min(derivative.size)
        derivative = derivative.resize(
            (round(derivative.width * scale), round(derivative.height * scale)),
            Image.Resampling.LANCZOS,
        )
    if exact_ratio_reference:
        reference_width, reference_height = exact_ratio_reference
        scale = min(maximum // reference_width, maximum // reference_height)
        if scale < 1:
            raise RuntimeError(
                f"{destination.name} cannot preserve the exact reference ratio within {maximum}px."
            )
        derivative = derivative.resize(
            (reference_width * scale, reference_height * scale),
            Image.Resampling.LANCZOS,
        )
    else:
        derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    for candidate_quality in range(quality, 59, -4):
        derivative.save(destination, "WEBP", quality=candidate_quality, method=6)
        if destination.stat().st_size <= MAX_DERIVATIVE_BYTES:
            break
    else:
        raise RuntimeError(f"{destination.name} remains above the derivative byte ceiling.")
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
            f"Unknown Gallery 23/24 asset selection: {', '.join(sorted(unknown))}"
        )
    refreshed = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    processed = 0

    with ExitStack() as stack:
        temporary: Path | None = None
        for index, (slug, record) in enumerate(assets.items(), start=1):
            if selected and slug not in selected:
                continue
            processed += 1
            output_folder = OUTPUT_ROOT / str(record["hallFolder"])
            output_folder.mkdir(parents=True, exist_ok=True)
            scene_path = output_folder / f"{slug}-scene.webp"
            panel_path = output_folder / f"{slug}-panel.webp"

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
                            prefix="philosophy-atlas-galleries-23-24-assets-"
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
                (
                    (int(scene_lock["width"]), int(scene_lock["height"]))
                    if record.get("panelMatchesSceneRatio") is True
                    else None
                ),
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
        print(f"Refreshed {processed * 2} Gallery 23/24 derivative locks.")
    else:
        print(f"Verified {processed * 2} locked Gallery 23/24 derivatives.")


if __name__ == "__main__":
    main()
