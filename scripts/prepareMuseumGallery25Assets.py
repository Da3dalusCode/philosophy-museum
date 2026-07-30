"""Build and verify the locked Gallery 25 media derivatives."""

from pathlib import Path

import prepareMuseumGallery26Assets as pipeline


pipeline.MANIFEST_PATH = (
    pipeline.ROOT / "scripts" / "museumGallery25AssetManifest.json"
)
pipeline.OUTPUT_ROOT = (
    pipeline.ROOT / "public" / "assets" / "museum" / "feminist-philosophies"
)
pipeline.EXPECTED_ASSET_COUNT = 24
pipeline.EXPECTED_HALL_FOLDER = "feminist-philosophies"
pipeline.GALLERY_NUMBER = 25
pipeline.ASSET_SOURCE_RECORD_PATH = (
    pipeline.ROOT
    / "src"
    / "data"
    / "museum"
    / "feministPhilosophiesGalleryAssets.ts"
)


if __name__ == "__main__":
    pipeline.main()
