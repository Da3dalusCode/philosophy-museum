from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "artifacts" / "museum-lighting-rollout" / "phase-2" / "visual-validation"
OUTPUT = ROOT / "artifacts" / "museum-lighting-rollout" / "phase-2"
THUMBNAIL = (320, 161)
LABEL_HEIGHT = 27

GALLERIES = [
    (3, "track", 18), (4, "recessed", 30), (5, "recessed", 30),
    (6, "recessed", 24), (7, "track", 18), (8, "recessed", 30),
    (9, "recessed", 12), (10, "track", 24), (11, "recessed", 25),
    (12, "track", 18), (13, "track", 18), (14, "track", 18),
    (15, "recessed", 26), (16, "track", 25), (17, "track", 25),
    (18, "track", 18), (19, "track", 24), (20, "recessed", 30),
    (21, "recessed", 30), (22, "recessed", 24), (23, "recessed", 24),
    (24, "track", 18), (25, "recessed", 24), (26, "track", 18),
]
CEILING_GALLERIES = [3, 6, 11, 15, 22, 23, 25, 26]


def label_font(size: int = 16) -> ImageFont.ImageFont:
    for candidate in (
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def render(entries, columns: int, output_name: str, suffix: str) -> None:
    rows = (len(entries) + columns - 1) // columns
    canvas = Image.new("RGB", (columns * THUMBNAIL[0], rows * (THUMBNAIL[1] + LABEL_HEIGHT)), "#0b0f19")
    draw = ImageDraw.Draw(canvas)
    font = label_font()
    for index, (number, system, fixture_count) in enumerate(entries):
        source = SOURCE / f"gallery-{number:02d}-{suffix}.png"
        with Image.open(source) as image:
            tile = image.convert("RGB")
            tile.thumbnail(THUMBNAIL, Image.Resampling.LANCZOS)
        column = index % columns
        row = index // columns
        left = column * THUMBNAIL[0]
        top = row * (THUMBNAIL[1] + LABEL_HEIGHT)
        canvas.paste(tile, (left, top))
        label = f"G{number:02d}  {system.upper()}  ·  {fixture_count} FIXTURES"
        draw.rectangle((left, top + THUMBNAIL[1], left + THUMBNAIL[0], top + THUMBNAIL[1] + LABEL_HEIGHT), fill="#111827")
        draw.text((left + 9, top + THUMBNAIL[1] + 5), label, font=font, fill="#f5d7a1")
    canvas.save(OUTPUT / output_name, quality=88, optimize=True, progressive=True)


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    render(GALLERIES, 6, "lighting-rollout-contact-sheet.jpg", "forward")
    ceiling_entries = [entry for entry in GALLERIES if entry[0] in CEILING_GALLERIES]
    render(ceiling_entries, 4, "lighting-rollout-ceiling-contact-sheet.jpg", "ceiling")
