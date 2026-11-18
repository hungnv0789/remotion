#!/usr/bin/env python3
"""Bundle the project and sibling summary without replacing the historical source ZIP."""
import argparse
import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
ROOT = REPO / '1611'
SUMMARY = REPO / 'tonghop'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'out/1611-with-summary-source.zip')
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    files = []
    for path in ROOT.rglob('*'):
        rel = path.relative_to(ROOT)
        if path.is_file() and not any(p in ['out', 'node_modules', '.git', '__pycache__', '.venv-voice', '.venv-align'] for p in rel.parts):
            files.append(path)
    files.append(SUMMARY / '1611.md')
    files.extend(p for p in (SUMMARY / '1611-scripts').rglob('*') if p.is_file() and '__pycache__' not in p.parts)
    with zipfile.ZipFile(args.output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(files):
            archive.write(path, str(path.relative_to(REPO)))
    with zipfile.ZipFile(args.output) as archive:
        assert archive.testzip() is None
        print(f'Source archive: {len(archive.namelist())} files; {args.output}')

if __name__ == '__main__':
    main()
