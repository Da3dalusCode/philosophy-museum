"""Render deterministic, code-native Museum interpretation panels.

These panels are authored diagrams rather than generated reconstructions or
photographs of historical objects. Their visible labels carry that distinction
into every derivative.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SPITZER_ASSET_ID = "nyaya-spitzer-sht810-interpretive"
SPITZER_OUTPUT_DIRECTORY = ROOT / "public" / "assets" / "museum" / "classical-south-asian-worlds"


def font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        Path("C:/Windows/Fonts/seguisb.ttf") if bold else Path("C:/Windows/Fonts/segoeui.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf") if bold else Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    )
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def render_spitzer_sht810_source() -> Image.Image:
    width, height = 1600, 900
    image = Image.new("RGB", (width, height), "#111817")
    draw = ImageDraw.Draw(image)

    ink = "#f1ead8"
    muted = "#b9c8c0"
    verdigris = "#5db5a6"
    amber = "#d2a454"
    panel = "#192421"
    line = "#365149"

    draw.rounded_rectangle((52, 44, 1548, 856), radius=30, fill=panel, outline=line, width=3)
    draw.text((92, 82), "SHT 810  /  VERIFIED FACT MAP", font=font(28, bold=True), fill=verdigris)
    draw.text((92, 127), "THE SPITZER MANUSCRIPT", font=font(62, bold=True), fill=ink)
    draw.rounded_rectangle((1050, 76, 1498, 143), radius=22, fill="#362f20", outline=amber, width=2)
    draw.text((1081, 96), "INTERPRETIVE • NO MANUSCRIPT IMAGE", font=font(19, bold=True), fill="#f4d99c")

    nodes = [
        (210, "KIZIL", "Discovered in 1906 during the\nthird Prussian Turfan expedition"),
        (800, "SHT 810", "About 1,000 mostly small fragments\nPalaeographic date: third century CE"),
        (1390, "BERLIN", "Held by the Staatsbibliothek zu Berlin\nOriental Department"),
    ]
    for index in range(len(nodes) - 1):
        draw.line((nodes[index][0] + 78, 345, nodes[index + 1][0] - 78, 345), fill=verdigris, width=6)
        draw.polygon(
            (
                (nodes[index + 1][0] - 90, 334),
                (nodes[index + 1][0] - 68, 345),
                (nodes[index + 1][0] - 90, 356),
            ),
            fill=verdigris,
        )
    for x, title, detail in nodes:
        draw.ellipse((x - 49, 296, x + 49, 394), fill="#203e38", outline=verdigris, width=4)
        draw.ellipse((x - 13, 332, x + 13, 358), fill=amber)
        title_box = draw.textbbox((0, 0), title, font=font(26, bold=True))
        draw.text((x - (title_box[2] - title_box[0]) / 2, 415), title, font=font(26, bold=True), fill=ink)
        for line_index, text in enumerate(detail.splitlines()):
            box = draw.textbbox((0, 0), text, font=font(18))
            draw.text((x - (box[2] - box[0]) / 2, 458 + line_index * 27), text, font=font(18), fill=muted)

    draw.rounded_rectangle((92, 575, 1508, 724), radius=22, fill="#13201d", outline=line, width=2)
    draw.text((128, 610), "WHAT THE VERIFIED RECORD SUPPORTS", font=font(23, bold=True), fill=amber)
    draw.text(
        (128, 656),
        "A unique, noncanonical Abhidharma tract that also discusses the Vaiśeṣika theory of qualities (guṇa).",
        font=font(25),
        fill=ink,
    )

    draw.line((92, 773, 1508, 773), fill=line, width=2)
    draw.text((92, 792), "CURATORIAL LIMIT", font=font(21, bold=True), fill=verdigris)
    draw.text(
        (300, 792),
        "This code-native panel reproduces no fragment, folio, join, or manuscript photograph.",
        font=font(21),
        fill=muted,
    )
    return image


def render_spitzer_derivatives() -> None:
    SPITZER_OUTPUT_DIRECTORY.mkdir(parents=True, exist_ok=True)
    source = render_spitzer_sht810_source()
    for variant, dimensions, quality in (
        ("scene", (640, 360), 84),
        ("panel", (1280, 720), 90),
    ):
        output = SPITZER_OUTPUT_DIRECTORY / f"{SPITZER_ASSET_ID}-{variant}.webp"
        source.resize(dimensions, Image.Resampling.LANCZOS).save(output, "WEBP", quality=quality, method=6)
        print(f"Rendered {output.relative_to(ROOT)} ({dimensions[0]}×{dimensions[1]}).")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("panel", choices=("spitzer-sht810",))
    args = parser.parse_args()
    if args.panel == "spitzer-sht810":
        render_spitzer_derivatives()


if __name__ == "__main__":
    main()
