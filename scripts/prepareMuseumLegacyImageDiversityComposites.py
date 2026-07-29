"""Build and verify contextual composites for the Gallery 1–16 image-diversity pass.

The migration keeps each authenticated source object visible as a restrained
inset, then gives the rest of the frame to a subject-specific, non-documentary
visual study. This preserves object-level provenance and interpretation without
leaving walls dominated by plain pages and isolated book covers.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import random
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PROGRAM_PATH = ROOT / "src" / "data" / "museum" / "museumLegacyImageDiversity.json"
OUTPUT_ROOT = ROOT / "public" / "assets" / "museum"
MANIFEST_PATHS = (
    ROOT / "scripts" / "museumModernAssetManifest.json",
    ROOT / "scripts" / "museumSuccessorGalleriesAssetManifest.json",
    ROOT / "scripts" / "museumGalleries13And16AssetManifest.json",
)
COMPOSITE_VERSION = 1
USER_AGENT = (
    "PhilosophyAtlasMuseum/1.0 "
    "(+https://github.com/Da3dalusCode/philosophy-museum; local educational asset preparation)"
)
MAX_DERIVATIVE_BYTES = 600_000

PALETTES = {
    "renaissance": ("#172520", "#b8894f", "#dbc89e", "#7d3f34"),
    "phenomenology": ("#15252d", "#5a8292", "#d5c7b6", "#8d5b64"),
    "analytic": ("#101d2d", "#456f9f", "#d8c6a0", "#b06f3f"),
    "justice": ("#18202b", "#8d4a42", "#d9c59c", "#527687"),
    "forum": ("#13272a", "#3d7b7b", "#d2b77b", "#a15f45"),
    "south-asia": ("#29213b", "#c8843e", "#dfc890", "#6e526f"),
    "islamic": ("#162825", "#2e6d73", "#d2aa57", "#8b4b43"),
    "east-asia": ("#172822", "#3f735a", "#d0b16a", "#934f43"),
    "jewish": ("#17232f", "#466c8a", "#d3ad62", "#81514d"),
    "scholastic": ("#211b2c", "#6f4f76", "#c5a45c", "#87463f"),
    "hellenistic": ("#24241f", "#6d7560", "#c99a5a", "#9b5141"),
    "late-antiquity": ("#1e1830", "#604f86", "#c8a75e", "#714955"),
    "rationalism": ("#142333", "#3d6f8d", "#d0a65e", "#9a5545"),
}


def rgb(hex_color: str) -> tuple[int, int, int]:
    value = hex_color.lstrip("#")
    return tuple(int(value[index:index + 2], 16) for index in (0, 2, 4))


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


def blend(first: tuple[int, int, int], second: tuple[int, int, int], amount: float) -> tuple[int, int, int]:
    return tuple(round(a + (b - a) * amount) for a, b in zip(first, second))


def gradient_canvas(size: tuple[int, int], dark: tuple[int, int, int], middle: tuple[int, int, int]) -> Image.Image:
    width, height = size
    strip = Image.new("RGB", (1, 256))
    pixels = strip.load()
    for y in range(256):
        amount = y / 255
        pixels[0, y] = blend(dark, blend(dark, middle, .22), amount)
    return strip.resize((width, height), Image.Resampling.BICUBIC)


def line_width(size: tuple[int, int], ratio: float = .006) -> int:
    return max(2, round(min(size) * ratio))


def draw_architecture(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    stroke = max(2, round(min(width, height) * .018))
    floor_y = top + round(height * .82)
    draw.line((left, floor_y, right, floor_y), fill=blend(accent, pale, .45), width=stroke)
    columns = 3 + seed % 3
    for index in range(columns):
        x = left + round(width * (.12 + .76 * index / max(1, columns - 1)))
        draw.rectangle(
            (x - stroke * 2, top + round(height * .28), x + stroke * 2, floor_y),
            outline=blend(accent, pale, .35),
            width=stroke,
        )
        draw.line(
            (x - stroke * 4, top + round(height * .28), x + stroke * 4, top + round(height * .28)),
            fill=pale,
            width=stroke,
        )
    draw.arc(
        (left + round(width * .23), top + round(height * .04), right - round(width * .23), top + round(height * .64)),
        180,
        360,
        fill=accent,
        width=stroke,
    )


def draw_network(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    randomizer = random.Random(seed)
    points = [
        (
            left + round(width * randomizer.uniform(.08, .92)),
            top + round(height * randomizer.uniform(.1, .9)),
        )
        for _ in range(9)
    ]
    stroke = max(2, round(min(width, height) * .012))
    for index, point in enumerate(points):
        for target in points[index + 1:index + 3]:
            draw.line((*point, *target), fill=blend(accent, pale, .25), width=stroke)
    for index, (x, y) in enumerate(points):
        radius = round(min(width, height) * (.035 if index % 3 else .055))
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=accent if index % 2 else pale)
        inner = max(2, radius // 3)
        draw.ellipse((x - inner, y - inner, x + inner, y + inner), fill=blend(accent, (12, 18, 24), .55))


def draw_scales(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    stroke = max(3, round(min(width, height) * .016))
    center_x = (left + right) // 2
    pivot_y = top + round(height * .3)
    base_y = top + round(height * .86)
    tilt = (-1 if seed % 2 else 1) * round(height * .045)
    draw.line((center_x, pivot_y, center_x, base_y), fill=pale, width=stroke)
    draw.line((center_x - round(width * .15), base_y, center_x + round(width * .15), base_y), fill=accent, width=stroke * 2)
    draw.line(
        (left + round(width * .18), pivot_y + tilt, right - round(width * .18), pivot_y - tilt),
        fill=pale,
        width=stroke,
    )
    for x, y in (
        (left + round(width * .22), pivot_y + tilt),
        (right - round(width * .22), pivot_y - tilt),
    ):
        draw.line((x, y, x - round(width * .09), y + round(height * .25)), fill=accent, width=stroke)
        draw.line((x, y, x + round(width * .09), y + round(height * .25)), fill=accent, width=stroke)
        bowl_y = y + round(height * .27)
        draw.arc(
            (x - round(width * .12), bowl_y - round(height * .07), x + round(width * .12), bowl_y + round(height * .07)),
            0,
            180,
            fill=pale,
            width=stroke,
        )


def draw_light(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    center = (
        left + round(width * (.38 if seed % 2 else .62)),
        top + round(height * .46),
    )
    stroke = max(2, round(min(width, height) * .012))
    for ring in range(5, 0, -1):
        radius = round(min(width, height) * (.08 + ring * .065))
        draw.ellipse(
            (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius),
            outline=blend(accent, pale, ring / 7),
            width=stroke,
        )
    for index in range(12):
        angle = math.tau * index / 12
        inner = round(min(width, height) * .12)
        outer = round(min(width, height) * (.38 if index % 2 else .44))
        draw.line(
            (
                center[0] + math.cos(angle) * inner,
                center[1] + math.sin(angle) * inner,
                center[0] + math.cos(angle) * outer,
                center[1] + math.sin(angle) * outer,
            ),
            fill=accent,
            width=stroke,
        )
    draw.ellipse(
        (
            center[0] - round(min(width, height) * .09),
            center[1] - round(min(width, height) * .09),
            center[0] + round(min(width, height) * .09),
            center[1] + round(min(width, height) * .09),
        ),
        fill=pale,
    )


def draw_path(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    stroke = max(3, round(min(width, height) * .018))
    points = [
        (left + round(width * .08), bottom - round(height * .12)),
        (left + round(width * .3), top + round(height * .62)),
        (left + round(width * .47), top + round(height * .7)),
        (left + round(width * .65), top + round(height * .34)),
        (right - round(width * .08), top + round(height * .14)),
    ]
    draw.line(points, fill=accent, width=stroke * 2, joint="curve")
    for index, (x, y) in enumerate(points):
        radius = round(min(width, height) * (.045 if index not in (0, 4) else .065))
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=pale, outline=accent, width=stroke)
    for offset in range(4):
        y = top + round(height * (.28 + offset * .15))
        draw.line(
            (left + round(width * .16), y, right - round(width * .16), y),
            fill=blend(accent, pale, .28),
            width=max(1, stroke // 2),
        )


def draw_body_or_dialogue(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    stroke = max(3, round(min(width, height) * .016))
    centers = (
        (left + round(width * .3), top + round(height * .38)),
        (right - round(width * .3), top + round(height * .38)),
    )
    radius = round(min(width, height) * .12)
    for index, (x, y) in enumerate(centers):
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=pale, width=stroke)
        draw.arc(
            (x - radius * 2, y + radius, x + radius * 2, bottom - round(height * .06)),
            190,
            350,
            fill=accent if index else pale,
            width=stroke * 2,
        )
    midpoint = ((centers[0][0] + centers[1][0]) // 2, centers[0][1])
    draw.arc(
        (
            midpoint[0] - round(width * .18),
            midpoint[1] - round(height * .2),
            midpoint[0] + round(width * .18),
            midpoint[1] + round(height * .2),
        ),
        200,
        340,
        fill=accent,
        width=stroke,
    )
    if seed % 2:
        draw.line(
            (left + round(width * .2), bottom - round(height * .15), right - round(width * .2), bottom - round(height * .15)),
            fill=pale,
            width=stroke,
        )


def draw_grid_or_tree(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    accent: tuple[int, int, int],
    pale: tuple[int, int, int],
    seed: int,
) -> None:
    left, top, right, bottom = box
    width = right - left
    height = bottom - top
    stroke = max(2, round(min(width, height) * .012))
    root = ((left + right) // 2, bottom - round(height * .08))
    levels = 4
    previous = [root]
    for level in range(levels):
        count = 2 ** level
        y = bottom - round(height * (.12 + level * .22))
        nodes = [
            (left + round(width * ((index + 1) / (count + 1))), y)
            for index in range(count)
        ]
        if level:
            for index, node in enumerate(nodes):
                parent = previous[index // 2]
                draw.line((*parent, *node), fill=accent, width=stroke)
        previous = nodes
        for index, (x, node_y) in enumerate(nodes):
            radius = round(min(width, height) * (.035 + .01 * ((index + seed) % 2)))
            draw.rounded_rectangle(
                (x - radius * 2, node_y - radius, x + radius * 2, node_y + radius),
                radius=radius // 2,
                fill=pale if (index + level) % 2 else accent,
            )


def motif_family(motif: str) -> str:
    if any(word in motif for word in ("scales", "law", "authority", "entitlement", "exchange")):
        return "scales"
    if any(word in motif for word in ("light", "stars", "celestial", "radiance", "optics", "lens")):
        return "light"
    if any(word in motif for word in ("architecture", "forum", "city", "library", "fortress", "pulpit")):
        return "architecture"
    if any(word in motif for word in ("face", "dialogue", "practice", "teaching", "heart", "body")):
        return "dialogue"
    if any(word in motif for word in ("path", "voyage", "crossroads", "translation", "imaging")):
        return "path"
    if any(word in motif for word in ("network", "harmony", "continuum", "atom", "veins")):
        return "network"
    return "grid"


MOTIF_DRAWERS = {
    "architecture": draw_architecture,
    "network": draw_network,
    "scales": draw_scales,
    "light": draw_light,
    "path": draw_path,
    "dialogue": draw_body_or_dialogue,
    "grid": draw_grid_or_tree,
}


def artifact_box(
    size: tuple[int, int],
    artifact_side: str,
) -> tuple[tuple[int, int, int, int], tuple[int, int, int, int]]:
    width, height = size
    margin = round(min(width, height) * .065)
    if width >= height * .82:
        artifact_width = round(width * .34)
        if artifact_side == "left":
            artifact = (margin, margin, margin + artifact_width, height - margin)
            motif = (margin + artifact_width + margin, margin, width - margin, height - margin)
        else:
            artifact = (width - margin - artifact_width, margin, width - margin, height - margin)
            motif = (margin, margin, width - margin * 2 - artifact_width, height - margin)
        return artifact, motif
    artifact_height = round(height * .37)
    if artifact_side == "left":
        artifact = (margin, margin, width - margin, margin + artifact_height)
        motif = (margin, margin * 2 + artifact_height, width - margin, height - margin)
    else:
        motif = (margin, margin, width - margin, height - margin * 2 - artifact_height)
        artifact = (margin, height - margin - artifact_height, width - margin, height - margin)
    return artifact, motif


def contextual_composite(
    source: Image.Image,
    size: tuple[int, int],
    motif: str,
    palette_name: str,
    artifact_side: str,
    seed: int,
) -> Image.Image:
    dark_hex, middle_hex, pale_hex, accent_hex = PALETTES[palette_name]
    dark = rgb(dark_hex)
    middle = rgb(middle_hex)
    pale = rgb(pale_hex)
    accent = rgb(accent_hex)
    canvas = gradient_canvas(size, dark, middle)
    draw = ImageDraw.Draw(canvas)
    artifact, motif_box = artifact_box(size, artifact_side)
    stroke = line_width(size)

    # Quiet architectural field: enough depth to feel authored, never enough to
    # compete with the historical inset or subject-specific motif.
    for index in range(7):
        amount = (index + 1) / 8
        y = round(size[1] * amount)
        draw.line((0, y, size[0], y), fill=blend(dark, pale, .07), width=max(1, stroke // 3))
    for index in range(5):
        amount = (index + 1) / 6
        x = round(size[0] * amount)
        draw.line((x, 0, x, size[1]), fill=blend(dark, pale, .05), width=max(1, stroke // 3))

    family = motif_family(motif)
    MOTIF_DRAWERS[family](draw, motif_box, accent, pale, seed)

    # Secondary geometry makes repeated motif families remain visibly distinct.
    randomizer = random.Random(seed)
    for _ in range(5):
        radius = round(min(size) * randomizer.uniform(.012, .03))
        x = randomizer.randint(motif_box[0] + radius, max(motif_box[0] + radius, motif_box[2] - radius))
        y = randomizer.randint(motif_box[1] + radius, max(motif_box[1] + radius, motif_box[3] - radius))
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=blend(accent, pale, .38), width=max(1, stroke // 2))

    artifact_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_offset = max(5, round(min(size) * .018))
    shadow_draw.rounded_rectangle(
        (
            artifact[0] + shadow_offset,
            artifact[1] + shadow_offset,
            artifact[2] + shadow_offset,
            artifact[3] + shadow_offset,
        ),
        radius=max(4, stroke * 2),
        fill=(0, 0, 0, 145),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=max(4, stroke * 1.8)))
    artifact_layer.alpha_composite(shadow)

    frame_inset = max(7, stroke * 2)
    inner_size = (
        max(1, artifact[2] - artifact[0] - frame_inset * 2),
        max(1, artifact[3] - artifact[1] - frame_inset * 2),
    )
    fitted = ImageOps.contain(source.convert("RGB"), inner_size, Image.Resampling.LANCZOS)
    backing = Image.new("RGBA", size, (0, 0, 0, 0))
    backing_draw = ImageDraw.Draw(backing)
    backing_draw.rounded_rectangle(
        artifact,
        radius=max(4, stroke * 2),
        fill=(*blend(dark, pale, .16), 255),
        outline=(*pale, 255),
        width=stroke,
    )
    paste_x = artifact[0] + (artifact[2] - artifact[0] - fitted.width) // 2
    paste_y = artifact[1] + (artifact[3] - artifact[1] - fitted.height) // 2
    backing.alpha_composite(fitted.convert("RGBA"), (paste_x, paste_y))
    artifact_layer.alpha_composite(backing)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), artifact_layer).convert("RGB")

    final_draw = ImageDraw.Draw(canvas)
    rail = max(5, stroke * 2)
    if artifact_side == "left":
        final_draw.rectangle((0, 0, rail, size[1]), fill=accent)
    else:
        final_draw.rectangle((size[0] - rail, 0, size[0], size[1]), fill=accent)
    final_draw.rectangle((0, 0, size[0] - 1, size[1] - 1), outline=blend(accent, pale, .42), width=stroke)
    return canvas


def save_webp(image: Image.Image, destination: Path) -> dict[str, int | str]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    for quality in range(88, 59, -4):
        image.save(destination, "WEBP", quality=quality, method=6)
        if destination.stat().st_size <= MAX_DERIVATIVE_BYTES:
            return inspect_variant(destination)
    raise RuntimeError(f"{destination} remains larger than {MAX_DERIVATIVE_BYTES} bytes.")


def download_source(url: str) -> Image.Image:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    payload: bytes | None = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                payload = response.read()
            break
        except urllib.error.HTTPError as error:
            if error.code != 429 or attempt == 4:
                raise
            retry_after = error.headers.get("Retry-After")
            suggested_delay = int(retry_after) if retry_after and retry_after.isdigit() else 0
            time.sleep(min(30, max(suggested_delay, 6 * (attempt + 1))))
    if payload is None:
        raise RuntimeError(f"Unable to download {url}")
    with tempfile.NamedTemporaryFile(suffix=".source", delete=False) as target:
        target.write(payload)
        temporary_path = Path(target.name)
    try:
        with Image.open(temporary_path) as opened:
            return ImageOps.exif_transpose(opened).convert("RGB")
    finally:
        temporary_path.unlink(missing_ok=True)


def load_manifests() -> list[tuple[Path, dict[str, object]]]:
    manifests = []
    for path in MANIFEST_PATHS:
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("version") != 1 or not isinstance(document.get("assets"), dict):
            raise RuntimeError(f"Malformed Museum asset manifest: {path}")
        manifests.append((path, document))
    return manifests


def locate_asset(
    manifests: list[tuple[Path, dict[str, object]]],
    asset_id: str,
) -> tuple[Path, dict[str, object], dict[str, object]]:
    matches = []
    for path, document in manifests:
        assets = document["assets"]
        if asset_id in assets:
            matches.append((path, document, assets[asset_id]))
    if len(matches) != 1:
        raise RuntimeError(f"{asset_id} must belong to exactly one source-lock manifest; found {len(matches)}.")
    return matches[0]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--build",
        action="store_true",
        help="Create contextual composites for records not yet marked as migrated.",
    )
    parser.add_argument(
        "--rebuild-from-source",
        action="store_true",
        help="Download each locked selected source and intentionally rebuild existing composites.",
    )
    parser.add_argument(
        "--adopt-existing-through",
        type=int,
        default=0,
        metavar="COUNT",
        help="Resume an interrupted first build by locking the first COUNT already-rendered composites.",
    )
    parser.add_argument(
        "--contact-sheet",
        type=Path,
        help="Write a review contact sheet after verification.",
    )
    args = parser.parse_args()
    if sum(bool(value) for value in (args.build, args.rebuild_from_source, args.adopt_existing_through)) > 1:
        raise RuntimeError("Choose only one migration action.")

    program = json.loads(PROGRAM_PATH.read_text(encoding="utf-8"))
    if program.get("version") != COMPOSITE_VERSION:
        raise RuntimeError(f"Unsupported image-diversity program version in {PROGRAM_PATH}.")
    composites = program.get("contextualComposites")
    if not isinstance(composites, dict) or len(composites) != 52:
        raise RuntimeError(f"Expected 52 contextual composites, found {len(composites or {})}.")
    manifests = load_manifests()
    changed_manifests: set[Path] = set()
    reviewed_panels: list[tuple[str, Path]] = []

    for index, (asset_id, specification) in enumerate(composites.items(), start=1):
        manifest_path, _document, lock = locate_asset(manifests, asset_id)
        hall_folder = lock.get("hallFolder")
        motif = specification.get("motif")
        palette = specification.get("palette")
        artifact_side = specification.get("artifactSide")
        if not isinstance(hall_folder, str):
            raise RuntimeError(f"{asset_id} lacks a hallFolder.")
        if not isinstance(motif, str) or palette not in PALETTES or artifact_side not in {"left", "right"}:
            raise RuntimeError(f"{asset_id} has an invalid contextual-composite specification.")
        scene_path = OUTPUT_ROOT / hall_folder / f"{asset_id}-scene.webp"
        panel_path = OUTPUT_ROOT / hall_folder / f"{asset_id}-panel.webp"
        reviewed_panels.append((asset_id, panel_path))
        migrated = lock.get("contextualCompositeVersion") == COMPOSITE_VERSION

        if args.adopt_existing_through:
            if index <= args.adopt_existing_through and not migrated:
                lock["scene"] = inspect_variant(scene_path)
                lock["panel"] = inspect_variant(panel_path)
                lock["visualCharacter"] = "contextual-composite"
                lock["textDominantOrSingleBook"] = False
                lock["contextualCompositeVersion"] = COMPOSITE_VERSION
                lock["contextualCompositeMotif"] = motif
                manifest_path.write_text(
                    json.dumps(_document, ensure_ascii=False, indent=2) + "\n",
                    encoding="utf-8",
                )
                print(f"[{index:02d}/52] {asset_id} (adopted interrupted build)", flush=True)
            continue

        if not args.build and not args.rebuild_from_source:
            if not migrated:
                raise RuntimeError(f"{asset_id} has not been built; run with --build.")
            for variant_name, path in (("scene", scene_path), ("panel", panel_path)):
                actual = inspect_variant(path)
                expected = lock.get(variant_name)
                if actual != expected:
                    raise RuntimeError(f"{asset_id}.{variant_name} drifted: expected {expected}, got {actual}.")
            print(f"[{index:02d}/52] {asset_id} (verified)", flush=True)
            continue

        if args.build and migrated:
            for variant_name, path in (("scene", scene_path), ("panel", panel_path)):
                actual = inspect_variant(path)
                expected = lock.get(variant_name)
                if actual != expected:
                    raise RuntimeError(f"{asset_id}.{variant_name} drifted: expected {expected}, got {actual}.")
            print(f"[{index:02d}/52] {asset_id} (already built)", flush=True)
            continue

        if args.rebuild_from_source:
            source_url = lock.get("selectedThumbnailUrl")
            if not isinstance(source_url, str) or not source_url.startswith("https://"):
                raise RuntimeError(f"{asset_id} lacks a rebuildable selectedThumbnailUrl.")
            source = download_source(source_url)
        else:
            if not panel_path.exists():
                raise RuntimeError(f"{asset_id} has no local source derivative for first migration.")
            with Image.open(panel_path) as opened:
                source = ImageOps.exif_transpose(opened).convert("RGB")

        seed = int(hashlib.sha256(asset_id.encode("utf-8")).hexdigest()[:12], 16)
        for variant_name, path in (("scene", scene_path), ("panel", panel_path)):
            expected = lock.get(variant_name)
            if not isinstance(expected, dict):
                raise RuntimeError(f"{asset_id}.{variant_name} lacks its pre-migration dimension lock.")
            size = (int(expected["width"]), int(expected["height"]))
            composite = contextual_composite(
                source,
                size,
                motif=motif,
                palette_name=palette,
                artifact_side=artifact_side,
                seed=seed + (0 if variant_name == "scene" else 17),
            )
            lock[variant_name] = save_webp(composite, path)
        lock["visualCharacter"] = "contextual-composite"
        lock["textDominantOrSingleBook"] = False
        lock["contextualCompositeVersion"] = COMPOSITE_VERSION
        lock["contextualCompositeMotif"] = motif
        changed_manifests.add(manifest_path)
        manifest_path.write_text(
            json.dumps(_document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"[{index:02d}/52] {asset_id} (built {motif})", flush=True)

    for path, document in manifests:
        if path in changed_manifests:
            path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    if args.adopt_existing_through:
        print(f"\nAdopted the first {args.adopt_existing_through} interrupted composite builds.")
    else:
        verb = "built" if args.build or args.rebuild_from_source else "verified"
        print(f"\nLegacy image-diversity composites {verb}: {len(composites)} assets.")
    if args.contact_sheet:
        cell_width = 280
        cell_height = 230
        columns = 4
        rows = math.ceil(len(reviewed_panels) / columns)
        sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), "#11151b")
        sheet_draw = ImageDraw.Draw(sheet)
        for index, (asset_id, panel_path) in enumerate(reviewed_panels):
            with Image.open(panel_path) as opened:
                thumbnail = ImageOps.contain(
                    opened.convert("RGB"),
                    (cell_width - 20, cell_height - 42),
                    Image.Resampling.LANCZOS,
                )
            x = (index % columns) * cell_width
            y = (index // columns) * cell_height
            sheet.paste(
                thumbnail,
                (x + (cell_width - thumbnail.width) // 2, y + 8),
            )
            sheet_draw.text((x + 10, y + cell_height - 27), asset_id, fill="#eee4d2")
        args.contact_sheet.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(args.contact_sheet, "WEBP", quality=88, method=6)
        print(f"Contact sheet: {args.contact_sheet}")


if __name__ == "__main__":
    main()
