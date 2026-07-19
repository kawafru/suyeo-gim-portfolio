from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("usage: prepare-ioi-loop-reference.py DEST SOURCE...")

    destination = Path(sys.argv[1])
    destination.mkdir(parents=True, exist_ok=True)

    for index, source_arg in enumerate(sys.argv[2:], start=1):
        source = Path(source_arg)
        if not source.is_file():
            raise FileNotFoundError(source)

        original = destination / f"ioi-loop-reference-{index:02d}.jpg"
        preview = destination / f"ioi-loop-reference-{index:02d}-preview.jpg"
        shutil.copy2(source, original)

        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            if image.width > 1024:
                height = round(image.height * (1024 / image.width))
                image = image.resize((1024, height), Image.Resampling.LANCZOS)
            image.save(preview, "JPEG", quality=86, optimize=True, progressive=True)


if __name__ == "__main__":
    main()
