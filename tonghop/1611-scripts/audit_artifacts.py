#!/usr/bin/env python3
"""Read-only audit of VieNeu output, captions, timing, render and source archive."""
import argparse
import hashlib
import json
import math
import os
import subprocess
import zipfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
ROOT = REPO / '1611'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--archive', type=Path, default=ROOT / 'out/1611-source.zip')
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'public/audio/production-manifest.json').read_text())
    recording = json.loads((ROOT / 'src/data/voiceover.json').read_text())
    script = json.loads((ROOT / 'src/data/script.json').read_text())
    timeline = json.loads((ROOT / 'out/timing-report.json').read_text())
    qa = json.loads((ROOT / 'out/audio-verification.json').read_text())
    digest = sha(ROOT / '1611.mp3')
    assert digest == sha(ROOT / 'public/audio/voiceover.mp3') == manifest['sourceSha256'] == recording['sourceSha256']
    assert manifest['engine'] == 'VieNeu-TTS v3 Turbo' and manifest['preset'] == 'Ngọc Huyền'
    assert manifest['presetGender'] == 'female' and 'Bắc' in manifest['presetDescription']
    assert manifest['tempo'] == 1.12 and manifest['sampleRate'] == 48000
    assert len(recording['scenes']) == 9 and [s['text'] for s in script] == [s['text'] for s in recording['scenes']]
    ffprobe = os.environ.get('FFPROBE_BINARY')
    if not ffprobe:
        candidates = [ROOT / 'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe', REPO / 'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe']
        ffprobe = str(next((p for p in candidates if p.is_file()), candidates[0]))
    probe = json.loads(subprocess.check_output([ffprobe, '-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,nb_frames,duration', '-of', 'json', str(ROOT / 'out/1611.mp4')], text=True))
    video = next(s for s in probe['streams'] if s['codec_name'] == 'h264')
    assert (video['width'], video['height'], video['r_frame_rate']) == (1080, 1920, '30/1')
    assert int(video['nb_frames']) == timeline['durationInFrames']
    assert int(video['nb_frames']) == math.ceil((recording['durationSeconds'] + .3 + 1.3) * 30 - 1e-4)
    srt = (ROOT / 'out/1611.srt').read_text().strip()
    cues = len(srt.split('\n\n'))
    assert cues > 0 and '00:00:' in srt
    assert qa['samplesAtDigitalLimit'] == 0
    assert all(w['voiceCorrelation'] > .97 and w['musicBelowVoiceDb'] < -20 for w in qa['audioWindows'])
    with zipfile.ZipFile(args.archive) as archive:
        assert archive.testzip() is None
        for name in archive.namelist():
            rel = Path(name)
            assert rel.parts[0] in ['1611', 'tonghop'] and '..' not in rel.parts
            assert archive.read(name) == (REPO / rel).read_bytes(), f'Stale ZIP entry: {name}'
        entries = len(archive.namelist())
    print(json.dumps({
        'status': 'passed', 'sourceSha256': digest, 'voice': manifest['preset'],
        'engine': manifest['engine'], 'ttsSeconds': manifest['sourceDurationSeconds'],
        'videoSeconds': float(video['duration']), 'frames': int(video['nb_frames']),
        'scenes': len(recording['scenes']), 'captionCues': cues,
        'archive': str(args.archive), 'archiveFiles': entries,
        'ttsCacheAvailable': ROOT.joinpath('out/tts-cache/plan.json').exists(),
        'note': 'Reads existing final-render audio QA; does not regenerate speech, render video, or remeasure audio.'
    }, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
