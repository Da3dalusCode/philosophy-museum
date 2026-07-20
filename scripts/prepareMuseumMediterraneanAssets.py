"""Build and verify the locked Gallery 01 Mediterranean media derivatives.

The manifest records exact Wikimedia Commons source pages and download URLs.
Only optimized local WebP derivatives are committed and used at runtime.
"""

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
MANIFEST_PATH = ROOT / "scripts" / "museumMediterraneanAssetManifest.json"
OUTPUT_ROOT = ROOT / "public" / "assets" / "museum" / "ancient-greek"
USER_AGENT = (
    "PhilosophyAtlasMuseum/1.0 "
    "(+https://github.com/Da3dalusCode/philosophy-museum; local educational asset preparation)"
)
EXPECTED_ASSET_COUNT = 19
MAX_DERIVATIVE_BYTES = 600_000


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def load_manifest(refresh_locks: bool) -> dict[str, dict[str, object]]:
    document = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    assets = document.get("assets")
    if document.get("version") != 1 or not isinstance(assets, dict):
        raise RuntimeError(f"Unsupported or malformed manifest: {MANIFEST_PATH}")
    if len(assets) != EXPECTED_ASSET_COUNT:
        raise RuntimeError(f"Expected {EXPECTED_ASSET_COUNT} Gallery 01 assets, found {len(assets)}.")
    for slug, record in assets.items():
        for field in ("sourcePageUrl", "sourceImageUrl", "selectedThumbnailUrl"):
            value = record.get(field)
            if not isinstance(value, str) or not value.startswith("https://"):
                raise RuntimeError(f"{slug}.{field} must be a locked HTTPS URL.")
        if not refresh_locks:
            for variant in ("scene", "panel"):
                expected = record.get(variant)
                if not isinstance(expected, dict):
                    raise RuntimeError(f"{slug}.{variant} lock is missing; run --refresh-locks intentionally.")
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
            suggested_delay = int(retry_after) if retry_after and retry_after.isdigit() else 0
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


def save_variant(image: Image.Image, destination: Path, maximum: int, quality: int) -> dict[str, int | str]:
    derivative = image.copy()
    derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    qualities = tuple(range(quality, 59, -4))
    for candidate_quality in qualities:
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


def assert_locked(slug: str, variant: str, actual: dict[str, int | str], expected: object) -> None:
    if not isinstance(expected, dict):
        raise RuntimeError(f"{slug}.{variant} has no lock.")
    differences = [field for field in ("width", "height", "bytes", "sha256") if actual[field] != expected.get(field)]
    if differences:
        detail = ", ".join(f"{field}: expected {expected.get(field)}, got {actual[field]}" for field in differences)
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
        help="Limit preparation or lock refresh to a named Gallery 01 asset; repeat for multiple assets.",
    )
    args = parser.parse_args()
    assets = load_manifest(args.refresh_locks)
    selected = set(args.only)
    unknown = selected.difference(assets)
    if unknown:
        raise RuntimeError(f"Unknown Gallery 01 asset selection: {', '.join(sorted(unknown))}")
    refreshed = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    processed = 0

    with ExitStack() as stack:
        temporary: Path | None = None
        for index, (slug, record) in enumerate(assets.items(), start=1):
            if selected and slug not in selected:
                continue
            processed += 1
            scene_path = OUTPUT_ROOT / f"{slug}-scene.webp"
            panel_path = OUTPUT_ROOT / f"{slug}-panel.webp"

            if not args.refresh_locks and scene_path.exists() and panel_path.exists():
                assert_locked(slug, "scene", inspect_variant(scene_path), record.get("scene"))
                assert_locked(slug, "panel", inspect_variant(panel_path), record.get("panel"))
                print(f"[{index:02d}/{len(assets)}] {slug} (verified)", flush=True)
                continue

            if temporary is None:
                temporary = Path(stack.enter_context(tempfile.TemporaryDirectory(prefix="philosophy-atlas-mediterranean-assets-")))
            source = temporary / f"{index:02d}-{slug}"
            candidate_scene = temporary / f"{slug}-scene.webp"
            candidate_panel = temporary / f"{slug}-panel.webp"
            print(f"[{index:02d}/{len(assets)}] {slug}", flush=True)
            download(str(record["selectedThumbnailUrl"]), source)
            image = rgb_image(source)
            scene_lock = save_variant(image, candidate_scene, 640, 82)
            panel_lock = save_variant(image, candidate_panel, 1280, 88)

            if args.refresh_locks:
                refreshed["assets"][slug]["scene"] = scene_lock
                refreshed["assets"][slug]["panel"] = panel_lock
            else:
                assert_locked(slug, "scene", scene_lock, record.get("scene"))
                assert_locked(slug, "panel", panel_lock, record.get("panel"))

            # Copy into the repository instead of moving from the temporary
            # directory so Windows gives every derivative the repository's ACL.
            for candidate, destination in ((candidate_scene, scene_path), (candidate_panel, panel_path)):
                if destination.exists():
                    destination.unlink()
                shutil.copyfile(candidate, destination)
            time.sleep(1)

    if args.refresh_locks:
        MANIFEST_PATH.write_text(json.dumps(refreshed, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"Refreshed {processed * 2} Gallery 01 derivative locks in {MANIFEST_PATH.name}.")
    else:
        print(f"Verified {processed * 2} locked Gallery 01 derivatives.")


if __name__ == "__main__":
    main()
