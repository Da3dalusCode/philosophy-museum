"""Build and verify standalone visual replacements for the Gallery 1–16 image audit.

Every replacement is one independently sourced Commons image selected for the
specific exhibit. The pipeline deliberately has no compositing, framing,
collage, motif, or source-inset feature: the selected image must carry the wall
installation by itself.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PROGRAM_PATH = ROOT / "src" / "data" / "museum" / "museumLegacyImageDiversity.json"
OUTPUT_ROOT = ROOT / "public" / "assets" / "museum"
MANIFEST_PATHS = (
    ROOT / "scripts" / "museumModernAssetManifest.json",
    ROOT / "scripts" / "museumSuccessorGalleriesAssetManifest.json",
    ROOT / "scripts" / "museumGalleries13And16AssetManifest.json",
)
PROGRAM_VERSION = 2
EXPECTED_REPLACEMENT_COUNT = 52
MAX_DERIVATIVE_BYTES = 600_000
USER_AGENT = (
    "PhilosophyAtlasMuseum/1.0 "
    "(+https://github.com/Da3dalusCode/philosophy-museum; local educational asset preparation)"
)
COMPOSITE_FIELDS = (
    "contextualCompositeVersion",
    "contextualCompositeMotif",
    "contextualCompositeSourceInset",
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def inspect_variant(path: Path) -> dict[str, int | str]:
    with Image.open(path) as image:
        return {
            "width": image.width,
            "height": image.height,
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
        }


def download(url: str, destination: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                destination.write_bytes(response.read())
            return
        except urllib.error.HTTPError as error:
            if error.code not in {429, 500, 502, 503, 504} or attempt == 4:
                raise
            retry_after = error.headers.get("Retry-After")
            suggested_delay = int(retry_after) if retry_after and retry_after.isdigit() else 0
            time.sleep(min(24, max(suggested_delay, 4 * (attempt + 1))))
    raise RuntimeError(f"Unable to download {url}")


def commons_file_title(source_page_url: str) -> str:
    parsed = urllib.parse.urlparse(source_page_url)
    prefix = "/wiki/File:"
    if parsed.scheme != "https" or parsed.hostname != "commons.wikimedia.org":
        raise RuntimeError(f"Replacement source must be an exact Commons file page: {source_page_url}")
    if not parsed.path.startswith(prefix):
        raise RuntimeError(f"Replacement source must identify a Commons File: page: {source_page_url}")
    return f"File:{urllib.parse.unquote(parsed.path[len(prefix):])}"


def commons_image_urls(source_page_url: str) -> tuple[str, str]:
    title = commons_file_title(source_page_url)
    query = urllib.parse.urlencode({
        "action": "query",
        "format": "json",
        "formatversion": "2",
        "prop": "imageinfo",
        "titles": title,
        "iiprop": "url",
        "iiurlwidth": "2000",
    })
    request = urllib.request.Request(
        f"https://commons.wikimedia.org/w/api.php?{query}",
        headers={"User-Agent": USER_AGENT},
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        payload = json.load(response)
    pages = payload.get("query", {}).get("pages", [])
    if len(pages) != 1 or pages[0].get("missing"):
        raise RuntimeError(f"Commons source is missing: {source_page_url}")
    image_info = pages[0].get("imageinfo", [])
    if len(image_info) != 1 or not image_info[0].get("url"):
        raise RuntimeError(f"Commons source has no downloadable image: {source_page_url}")
    original_url = image_info[0]["url"]
    selected_url = image_info[0].get("thumburl", original_url)
    return original_url, selected_url


def rgb_image(path: Path) -> Image.Image:
    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGBA", image.size, "white")
            background.alpha_composite(image.convert("RGBA"))
            return background.convert("RGB")
        return image.convert("RGB")


def save_variant(image: Image.Image, destination: Path, maximum: int, quality: int) -> dict[str, int | str]:
    derivative = image.copy()
    derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    if min(derivative.size) < 180:
        raise RuntimeError(
            f"{destination.name} has a {min(derivative.size)}px short edge; select a stronger source image."
        )
    for candidate_quality in range(quality, 59, -4):
        derivative.save(destination, "WEBP", quality=candidate_quality, method=6)
        if destination.stat().st_size <= MAX_DERIVATIVE_BYTES:
            return inspect_variant(destination)
    raise RuntimeError(f"{destination.name} cannot meet the {MAX_DERIVATIVE_BYTES:,}-byte ceiling.")


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def locate_manifest_record(manifests: dict[Path, dict], asset_id: str) -> tuple[Path, dict]:
    matches = [
        (path, manifest["assets"][asset_id])
        for path, manifest in manifests.items()
        if asset_id in manifest.get("assets", {})
    ]
    if len(matches) != 1:
        raise RuntimeError(f"{asset_id} must occur in exactly one managed source manifest; found {len(matches)}.")
    return matches[0]


def validate_source_uniqueness(
    replacements: dict[str, dict],
    manifests: dict[Path, dict],
) -> None:
    replacement_ids = set(replacements)
    existing_sources = {
        record.get("sourcePageUrl")
        for manifest in manifests.values()
        for asset_id, record in manifest.get("assets", {}).items()
        if asset_id not in replacement_ids
    }
    reused = sorted({
        replacement["sourcePageUrl"]
        for replacement in replacements.values()
        if replacement["sourcePageUrl"] in existing_sources
    })
    if reused:
        raise RuntimeError(
            "A standalone replacement reuses source media already installed elsewhere: "
            + ", ".join(reused)
        )


def validate_program(program: dict) -> dict[str, dict]:
    replacements = program.get("standaloneReplacements")
    if program.get("version") != PROGRAM_VERSION or not isinstance(replacements, dict):
        raise RuntimeError(f"Unsupported or malformed replacement program: {PROGRAM_PATH}")
    if len(replacements) != EXPECTED_REPLACEMENT_COUNT:
        raise RuntimeError(
            f"Expected {EXPECTED_REPLACEMENT_COUNT} standalone replacements, found {len(replacements)}."
        )
    source_pages: list[str] = []
    for asset_id, replacement in replacements.items():
        required = (
            "visualCharacter",
            "mediaKind",
            "title",
            "creator",
            "objectDate",
            "institution",
            "sourcePageUrl",
            "license",
            "rightsKind",
            "attribution",
            "alt",
            "caption",
            "historicalNote",
            "likenessStatus",
        )
        missing = [field for field in required if not replacement.get(field)]
        if missing:
            raise RuntimeError(f"{asset_id} replacement metadata is missing: {', '.join(missing)}")
        if replacement["visualCharacter"] in {"text-dominant", "contextual-composite"}:
            raise RuntimeError(f"{asset_id} is not a standalone non-textual replacement.")
        if replacement["mediaKind"] in {"book-page", "document", "manuscript", "papyrus"}:
            raise RuntimeError(f"{asset_id} still uses a text-dominant media kind.")
        crop_box = replacement.get("cropBox")
        if crop_box is not None:
            if (
                not isinstance(crop_box, list)
                or len(crop_box) != 4
                or not all(isinstance(value, (int, float)) for value in crop_box)
            ):
                raise RuntimeError(f"{asset_id}.cropBox must contain four normalized numbers.")
            left, top, right, bottom = crop_box
            if not (0 <= left < right <= 1 and 0 <= top < bottom <= 1):
                raise RuntimeError(f"{asset_id}.cropBox is not a valid normalized crop.")
        source_kind = replacement.get("sourceKind", "commons")
        if source_kind == "commons":
            commons_file_title(replacement["sourcePageUrl"])
            if not replacement.get("licenseUrl"):
                raise RuntimeError(f"{asset_id} Commons replacement has no rights-status URL.")
        elif source_kind == "owner-approved-original-illustration":
            if not replacement.get("localSourcePath"):
                raise RuntimeError(f"{asset_id} original illustration has no local source path.")
            if urllib.parse.urlparse(replacement["sourcePageUrl"]).hostname != "github.com":
                raise RuntimeError(f"{asset_id} original illustration must cite its GitHub source page.")
        else:
            raise RuntimeError(f"{asset_id} has unsupported source kind {source_kind}.")
        source_pages.append(replacement["sourcePageUrl"])
    if len(set(source_pages)) != len(source_pages):
        raise RuntimeError("The standalone replacement program repeats a Commons source page.")
    return replacements


def refresh(program: dict, replacements: dict[str, dict], manifests: dict[Path, dict]) -> None:
    staged: list[tuple[Path, Path]] = []
    with tempfile.TemporaryDirectory(prefix="museum-standalone-replacements-") as temporary:
        temporary_root = Path(temporary)
        for index, (asset_id, replacement) in enumerate(replacements.items(), start=1):
            _, lock = locate_manifest_record(manifests, asset_id)
            hall_folder = lock.get("hallFolder")
            if not isinstance(hall_folder, str):
                raise RuntimeError(f"{asset_id} has no locked hall folder.")

            source_kind = replacement.get("sourceKind", "commons")
            if source_kind == "owner-approved-original-illustration":
                source_path = ROOT / replacement["localSourcePath"]
                if not source_path.is_file():
                    raise RuntimeError(f"{asset_id} local source is missing: {source_path}")
                source_image_url = replacement["sourceImageUrl"]
                selected_thumbnail_url = replacement["selectedThumbnailUrl"]
            else:
                source_image_url, selected_thumbnail_url = commons_image_urls(
                    replacement["sourcePageUrl"]
                )
                replacement["sourceImageUrl"] = source_image_url
                replacement["selectedThumbnailUrl"] = selected_thumbnail_url
                source_path = temporary_root / f"{asset_id}-source"
                download(selected_thumbnail_url, source_path)
            image = rgb_image(source_path)
            if max(image.size) < 900:
                raise RuntimeError(
                    f"{asset_id} source is only {image.width}×{image.height}; select a higher-quality image."
                )
            crop_box = replacement.get("cropBox")
            if crop_box:
                left, top, right, bottom = crop_box
                pixel_crop = (
                    round(image.width * left),
                    round(image.height * top),
                    round(image.width * right),
                    round(image.height * bottom),
                )
                image = image.crop(pixel_crop)
                if min(image.size) < 600:
                    raise RuntimeError(
                        f"{asset_id} crop is only {image.width}×{image.height}; retain more source detail."
                    )

            variant_locks: dict[str, dict[str, int | str]] = {}
            for variant_name, maximum, quality in (
                ("scene", 640, 86),
                ("panel", 1280, 90),
            ):
                staged_path = temporary_root / f"{asset_id}-{variant_name}.webp"
                variant_locks[variant_name] = save_variant(image, staged_path, maximum, quality)
                destination = OUTPUT_ROOT / hall_folder / f"{asset_id}-{variant_name}.webp"
                staged.append((staged_path, destination))

            replacement["variants"] = {
                name: {"width": value["width"], "height": value["height"]}
                for name, value in variant_locks.items()
            }
            lock.update({
                "sourcePageUrl": replacement["sourcePageUrl"],
                "sourceImageUrl": source_image_url,
                "selectedThumbnailUrl": selected_thumbnail_url,
                "visualCharacter": replacement["visualCharacter"],
                "textDominantOrSingleBook": False,
                "standaloneReplacementVersion": 1,
                **variant_locks,
            })
            if source_kind == "owner-approved-original-illustration":
                lock["sourceKind"] = source_kind
            else:
                lock.pop("sourceKind", None)
            if crop_box:
                lock["sourceCropBox"] = crop_box
            else:
                lock.pop("sourceCropBox", None)
            for field in COMPOSITE_FIELDS:
                lock.pop(field, None)
            print(f"[{index:02d}/{len(replacements)}] curated {asset_id}")

        for staged_path, destination in staged:
            destination.parent.mkdir(parents=True, exist_ok=True)
            # Overwrite the existing file contents rather than replacing the
            # directory entry. On Windows this preserves the workspace ACL
            # instead of inheriting the elevated temporary directory's ACL.
            shutil.copyfile(staged_path, destination)

    write_json(PROGRAM_PATH, program)
    for path, manifest in manifests.items():
        write_json(path, manifest)


def verify(replacements: dict[str, dict], manifests: dict[Path, dict]) -> None:
    for asset_id, replacement in replacements.items():
        _, lock = locate_manifest_record(manifests, asset_id)
        hall_folder = lock["hallFolder"]
        for field in ("sourceImageUrl", "selectedThumbnailUrl", "variants"):
            if not replacement.get(field):
                raise RuntimeError(f"{asset_id}.{field} is not locked; run --refresh-locks.")
        for field in COMPOSITE_FIELDS:
            if field in lock:
                raise RuntimeError(f"{asset_id} retains rejected composite field {field}.")
        if lock.get("standaloneReplacementVersion") != 1:
            raise RuntimeError(f"{asset_id} lacks its standalone replacement lock.")
        for field in ("sourcePageUrl", "sourceImageUrl", "selectedThumbnailUrl", "visualCharacter"):
            if lock.get(field) != replacement.get(field):
                raise RuntimeError(f"{asset_id}.{field} differs between program and manifest.")
        if lock.get("sourceCropBox") != replacement.get("cropBox"):
            raise RuntimeError(f"{asset_id}.cropBox differs between program and manifest.")
        for variant_name in ("scene", "panel"):
            path = OUTPUT_ROOT / hall_folder / f"{asset_id}-{variant_name}.webp"
            actual = inspect_variant(path)
            if actual != lock.get(variant_name):
                raise RuntimeError(f"{asset_id}.{variant_name} differs from its manifest lock.")
            expected_dimensions = replacement["variants"][variant_name]
            if {
                "width": actual["width"],
                "height": actual["height"],
            } != expected_dimensions:
                raise RuntimeError(f"{asset_id}.{variant_name} runtime dimensions drifted.")
    print(f"Verified {len(replacements)} standalone Gallery 1–16 replacements.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--refresh-locks",
        action="store_true",
        help="Download the curated Commons sources, replace derivatives, and rewrite exact locks.",
    )
    args = parser.parse_args()

    program = load_json(PROGRAM_PATH)
    replacements = validate_program(program)
    manifests = {path: load_json(path) for path in MANIFEST_PATHS}
    validate_source_uniqueness(replacements, manifests)

    if args.refresh_locks:
        refresh(program, replacements, manifests)
        manifests = {path: load_json(path) for path in MANIFEST_PATHS}
        replacements = validate_program(load_json(PROGRAM_PATH))
        validate_source_uniqueness(replacements, manifests)
    verify(replacements, manifests)


if __name__ == "__main__":
    main()
