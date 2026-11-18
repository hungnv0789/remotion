#!/usr/bin/env python3
"""Inspect interpreter packages and project paths without loading TTS/ASR models."""
import importlib.metadata
import json
import os
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / '1611'

def main():
    packages = {}
    for name in ['vieneu', 'numpy', 'soundfile', 'onnxruntime', 'sea-g2p', 'huggingface-hub', 'tokenizers', 'faster-whisper', 'av', 'pillow']:
        try:
            packages[name] = importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            packages[name] = None
    print(json.dumps({
        'python': sys.executable,
        'pythonVersion': sys.version.split()[0],
        'packages': packages,
        'node': shutil.which('node'),
        'nodeModulesSymlink': ROOT.joinpath('node_modules').is_symlink(),
        'nodeModulesAvailable': ROOT.joinpath('node_modules/remotion/package.json').is_file(),
        'ttsPlanAvailable': ROOT.joinpath('out/tts-cache/plan.json').is_file(),
        'ffmpeg': os.environ.get('FFMPEG_BINARY'),
        'ffprobe': os.environ.get('FFPROBE_BINARY'),
        'note': 'Missing ASR packages in the voice environment, or missing VieNeu in the ASR environment, can be expected. Use the appropriate interpreter for each job.'
    }, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
