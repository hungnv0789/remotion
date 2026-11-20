#!/usr/bin/env python3
"""Build a contact sheet from existing preview frames; does not render new frames."""
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pattern', default='frame-*.png')
    parser.add_argument('--output', type=Path, default=ROOT / 'out/contact-sheet.jpg')
    args = parser.parse_args()
    from PIL import Image, ImageDraw
    files = sorted((ROOT / 'out').glob(args.pattern), key=lambda p: int(p.stem.rsplit('-', 1)[-1]))
    if not files:
        parser.error('No preview frames found. Run npm run previews first.')
    sheet = Image.new('RGB', (1080, 540 * ((len(files) + 3) // 4)), '#DDDDDD')
    for i, path in enumerate(files):
        picture = Image.open(path).convert('RGB')
        picture.thumbnail((270, 500))
        left, top = i % 4 * 270, i // 4 * 540
        sheet.paste(picture, (left, top))
        ImageDraw.Draw(sheet).text((left + 10, top + 506), path.stem, fill='black')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.output)
    print(f'{len(files)} frames -> {args.output}')

if __name__ == '__main__':
    main()
