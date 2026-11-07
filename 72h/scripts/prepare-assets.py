"""Copy supplied JPEG assets and synthesize a quiet, original news music loop.

Run from the 72h project directory: python3 scripts/prepare-assets.py
"""
from array import array
import json
import math
from pathlib import Path
import random
import shutil
import wave

ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / 'public/assets-manifest.json').read_text())
for item in manifest:
    target = ROOT / 'public' / item['publicPath']
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / item['source'], target)

audio_dir = ROOT / 'public/audio'
audio_dir.mkdir(parents=True, exist_ok=True)
shutil.copyfile(ROOT / 'asset/72h.mp3', audio_dir / '72h.mp3')

# Soft pad, low pulse and restrained percussion; no sirens or alarm sounds.
sample_rate = 24000
duration = 8
rng = random.Random(72)
samples = array('h')
for index in range(sample_rate * duration):
    t = index / sample_rate
    beat = t % 0.5
    pad = sum(math.sin(2 * math.pi * f * t) for f in [110, 130.8128, 164.8138, 196]) / 4
    pulse = math.sin(2 * math.pi * 55 * t) * math.exp(-beat * 15)
    tick = (rng.random() * 2 - 1) * math.exp(-beat * 100)
    step = int(t / 0.5) % 4
    note = [220, 261.6256, 329.6276, 392][step]
    arpeggio = math.sin(2 * math.pi * note * t) * math.exp(-beat * 9)
    edge = min(1, t / 0.025, (duration - t) / 0.025)
    value = (0.16 * pad + 0.08 * pulse + 0.025 * tick + 0.045 * arpeggio) * max(0, edge)
    samples.append(round(max(-1, min(1, value)) * 32767))
with wave.open(str(audio_dir / 'news-bed.wav'), 'wb') as output:
    output.setnchannels(1)
    output.setsampwidth(2)
    output.setframerate(sample_rate)
    output.writeframes(samples.tobytes())
print(f'Prepared {len(manifest)} illustrations, original voiceover and news music.')
