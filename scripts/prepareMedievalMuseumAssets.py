"""Create the committed Medieval Museum WebP derivatives from exact source files.

Original downloads live only in a temporary directory. The typed provenance ledger
in museumAssets.ts remains the authoritative human-reviewed record.
"""

from __future__ import annotations

import hashlib
import json
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "assets" / "museum" / "medieval-worlds"
MANIFEST_PATH = ROOT / "scripts" / "medievalMuseumAssetManifest.json"
USER_AGENT = "Philosophy Atlas Museum asset preparation (local educational project)"

ASSETS = {
    "augustine-lateran": "https://upload.wikimedia.org/wikipedia/commons/2/23/AugustineLateran.jpg",
    "augustine-city-of-god": "https://upload.wikimedia.org/wikipedia/commons/9/96/Civitate_Dei-UBU_Hs._42-f.001v-Augustinus_en_de_filosofen.jpg",
    "boethius-consolation-teaching": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Boethius_initial_consolation_philosophy.jpg",
    "boethius-arithmetic": "https://upload.wikimedia.org/wikipedia/commons/7/70/Boethius%2C_De_institutione_arithmetica%2C_Bamberg_Ms._Class._5.jpg",
    "avicenna-canon": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Qanun_Avicenna_NLM.jpg",
    "avicenna-thevet-portrait": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Portrait_of_Avicenna.jpg",
    "al-ghazali-asas-al-qiyas": "https://upload.wikimedia.org/wikipedia/commons/1/10/Asas_alqiyas_manuscript.jpg",
    "al-ghazali-faysal": "https://upload.wikimedia.org/wikipedia/commons/1/16/Faysal_manuscript.jpg",
    "averroes-de-anima": "https://upload.wikimedia.org/wikipedia/commons/3/34/Bnf_lat16151_f22.jpg",
    "averroes-lithograph": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Averrho%C3%ABs_CIPC0098.jpg",
    "maimonides-mishnah-autograph": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Maimonides_Commentary_on_the_Mishnah.jpg",
    "maimonides-mishneh-torah": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Mishneh_Torah_%28Books_7_to_14%29_by_Maimonides_-_Google_Art_Project.jpg",
    "aquinas-summa": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Basel%2C_Universit%C3%A4tsbibliothek%2C_A_I_14%2C_f._69v_%E2%80%93_Thomas_Aquinas%2C_Summa_theologiae_%28prima_pars.JPG",
    "aquinas-triumph": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Le_Triomphe_de_saint_Thomas_d%27Aquin_-_Benozzo_Gozzoli_-_Mus%C3%A9e_du_Louvre_Peintures_INV_104_%3B_MR_255_-_avec_cadre.jpg",
    "ockham-logica-sketch": "https://upload.wikimedia.org/wikipedia/commons/1/16/William_of_Ockham_-_Logica_-_1341.jpg",
    "ockham-sentences": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Basel%2C_Universit%C3%A4tsbibliothek%2C_A_VI_22%2C_f._111r_%E2%80%93_Super_sententiarum_libros_quattuor.JPG",
}

def load_manifest() -> dict[str, dict[str, object]]:
    document = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    if document.get("version") != 1 or not isinstance(document.get("assets"), dict):
        raise RuntimeError(f"Unsupported or malformed manifest: {MANIFEST_PATH}")
    assets = document["assets"]
    if set(assets) != set(ASSETS):
        raise RuntimeError("The lock manifest and ASSETS recipe contain different Medieval asset IDs.")
    for slug, source_image_url in ASSETS.items():
        locked = assets[slug]
        if locked.get("sourceImageUrl") != source_image_url:
            raise RuntimeError(f"{slug} sourceImageUrl differs between the recipe and lock manifest.")
        selected_url = locked.get("selectedThumbnailUrl")
        if not isinstance(selected_url, str) or not selected_url.startswith(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/"
        ):
            raise RuntimeError(f"{slug} does not have a locked HTTPS Commons thumbnail URL.")
        for variant in ("scene", "panel"):
            expected = locked.get(variant)
            if not isinstance(expected, dict):
                raise RuntimeError(f"{slug} {variant} lock metadata is missing.")
            if not isinstance(expected.get("bytes"), int) or expected["bytes"] <= 0:
                raise RuntimeError(f"{slug} {variant} has an invalid locked byte count.")
            digest = expected.get("sha256")
            if not isinstance(digest, str) or len(digest) != 64 or any(character not in "0123456789abcdef" for character in digest):
                raise RuntimeError(f"{slug} {variant} has an invalid locked SHA-256 digest.")
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
            time.sleep(8 * (attempt + 1))
    raise RuntimeError(f"Unable to download {url}")


def rgb_image(source: Path) -> Image.Image:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGBA", image.size, "white")
            background.alpha_composite(image.convert("RGBA"))
            return background.convert("RGB")
        return image.convert("RGB")


def save_variant(image: Image.Image, destination: Path, maximum: int, quality: int) -> dict[str, int]:
    derivative = image.copy()
    derivative.thumbnail((maximum, maximum), Image.Resampling.LANCZOS)
    derivative.save(destination, "WEBP", quality=quality, method=6)
    return {
        "width": derivative.width,
        "height": derivative.height,
        "bytes": destination.stat().st_size,
    }


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def validate_derivative(slug: str, variant: str, path: Path, expected: dict[str, object]) -> dict[str, int | str]:
    with Image.open(path) as image:
        actual: dict[str, int | str] = {
            "width": image.width,
            "height": image.height,
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
        }
    mismatches = [field for field in ("bytes", "sha256") if actual[field] != expected[field]]
    if mismatches:
        detail = ", ".join(f"{field}: expected {expected[field]}, got {actual[field]}" for field in mismatches)
        raise RuntimeError(
            f"{slug} {variant} does not match {MANIFEST_PATH.name} ({detail}). "
            "Refusing to accept or replace a locked derivative."
        )
    return actual


def main() -> None:
    manifest = load_manifest()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    ledger: dict[str, dict[str, object]] = {}
    with tempfile.TemporaryDirectory(prefix="philosophy-atlas-medieval-") as temp:
        temporary = Path(temp)
        for index, slug in enumerate(ASSETS, start=1):
            locked = manifest[slug]
            scene_path = OUTPUT / f"{slug}-scene.webp"
            panel_path = OUTPUT / f"{slug}-panel.webp"
            if scene_path.exists() and panel_path.exists():
                ledger[slug] = {
                    "selectedThumbnailUrl": locked["selectedThumbnailUrl"],
                    "scene": validate_derivative(slug, "scene", scene_path, locked["scene"]),
                    "panel": validate_derivative(slug, "panel", panel_path, locked["panel"]),
                }
                print(f"[{index:02d}/{len(ASSETS)}] {slug} (cached)", flush=True)
                continue
            source = temporary / f"{index:02d}-{slug}"
            candidate_scene = temporary / f"{slug}-scene.webp"
            candidate_panel = temporary / f"{slug}-panel.webp"
            print(f"[{index:02d}/{len(ASSETS)}] {slug}", flush=True)
            download(str(locked["selectedThumbnailUrl"]), source)
            image = rgb_image(source)
            save_variant(image, candidate_scene, 640, 82)
            save_variant(image, candidate_panel, 1280, 88)
            ledger[slug] = {
                "selectedThumbnailUrl": locked["selectedThumbnailUrl"],
                "source": {"width": image.width, "height": image.height, "bytes": source.stat().st_size},
                "scene": validate_derivative(slug, "scene", candidate_scene, locked["scene"]),
                "panel": validate_derivative(slug, "panel", candidate_panel, locked["panel"]),
            }
            candidate_scene.replace(scene_path)
            candidate_panel.replace(panel_path)
            time.sleep(2)
    print(json.dumps(ledger, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
