"""Render review sheets for the curated Gallery 1–16 standalone replacements."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PROGRAM_PATH = ROOT / "src" / "data" / "museum" / "museumLegacyImageDiversity.json"
MANIFEST_PATHS = (
    ROOT / "scripts" / "museumModernAssetManifest.json",
    ROOT / "scripts" / "museumSuccessorGalleriesAssetManifest.json",
    ROOT / "scripts" / "museumGalleries13And16AssetManifest.json",
)
PUBLIC_ROOT = ROOT / "public"
SHEET_COLUMNS = 4
SHEET_ROWS = 3
TILE_WIDTH = 360
IMAGE_HEIGHT = 270
LABEL_HEIGHT = 52


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("output_directory", type=Path)
    args = parser.parse_args()
    args.output_directory.mkdir(parents=True, exist_ok=True)

    program = json.loads(PROGRAM_PATH.read_text(encoding="utf-8"))
    replacement_ids = list(program["standaloneReplacements"])
    locks = {}
    for path in MANIFEST_PATHS:
        locks.update(json.loads(path.read_text(encoding="utf-8"))["assets"])

    font = ImageFont.load_default(size=15)
    per_sheet = SHEET_COLUMNS * SHEET_ROWS
    for sheet_index in range(0, len(replacement_ids), per_sheet):
        sheet_ids = replacement_ids[sheet_index:sheet_index + per_sheet]
        sheet = Image.new(
            "RGB",
            (SHEET_COLUMNS * TILE_WIDTH, SHEET_ROWS * (IMAGE_HEIGHT + LABEL_HEIGHT)),
            "#181817",
        )
        draw = ImageDraw.Draw(sheet)
        for tile_index, asset_id in enumerate(sheet_ids):
            column = tile_index % SHEET_COLUMNS
            row = tile_index // SHEET_COLUMNS
            left = column * TILE_WIDTH
            top = row * (IMAGE_HEIGHT + LABEL_HEIGHT)
            lock = locks[asset_id]
            path = (
                PUBLIC_ROOT
                / "assets"
                / "museum"
                / lock["hallFolder"]
                / f"{asset_id}-panel.webp"
            )
            with Image.open(path) as opened:
                image = ImageOps.contain(
                    opened.convert("RGB"),
                    (TILE_WIDTH - 16, IMAGE_HEIGHT - 16),
                    Image.Resampling.LANCZOS,
                )
            image_left = left + (TILE_WIDTH - image.width) // 2
            image_top = top + (IMAGE_HEIGHT - image.height) // 2
            sheet.paste(image, (image_left, image_top))
            draw.text(
                (left + 10, top + IMAGE_HEIGHT + 8),
                f"{sheet_index + tile_index + 1:02d}. {asset_id}",
                fill="#f0eadb",
                font=font,
            )
        output = args.output_directory / f"museum-standalone-replacements-{sheet_index // per_sheet + 1}.jpg"
        sheet.save(output, quality=92)
        print(output)


if __name__ == "__main__":
    main()
