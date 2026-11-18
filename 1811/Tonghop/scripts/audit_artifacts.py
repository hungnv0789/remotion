#!/usr/bin/env python3
"""Read-only audit of current source identity, approved copy and delivered artifacts."""
import hashlib
import json
import os
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    recording = json.loads((ROOT / 'src/data/voiceover.json').read_text())
    manifest = json.loads((ROOT / 'public/audio/1811/production-manifest.json').read_text())
    timeline = json.loads((ROOT / 'out/timing-report-1811.json').read_text())
    audio_qa = json.loads((ROOT / 'out/audio-verification-1811.json').read_text())
    source_sha = sha(ROOT / '1811.mp3')
    assert source_sha == recording['sourceSha256'] == manifest['sourceSha256']
    assert source_sha == sha(ROOT / 'public/audio/1811/1811.mp3')
    assert len(recording['scenes']) == 8
    text = ' '.join(scene['text'] for scene in recording['scenes'])
    assert 'cuối năm 2028' in text
    assert 'subscribe' not in text.lower() and 'Ghiền Mì Gõ' not in text
    ffprobe = os.environ.get('FFPROBE_BINARY', str(ROOT / 'node_modules/@remotion/compositor-linux-x64-gnu/ffprobe'))
    probe = json.loads(subprocess.check_output([ffprobe, '-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,nb_frames,duration', '-of', 'json', str(ROOT / 'out/1811.mp4')], text=True))
    video = next(stream for stream in probe['streams'] if stream['codec_name'] == 'h264')
    assert (video['width'], video['height'], video['r_frame_rate']) == (1080, 1920, '30/1')
    assert int(video['nb_frames']) == timeline['durationInFrames'] == 2523
    srt = (ROOT / 'out/1811.srt').read_text().strip()
    assert len(srt.split('\n\n')) == 28 and '2028' in srt
    assert audio_qa['samplesAtDigitalLimit'] == 0
    assert all(window['voiceCorrelation'] > .97 and window['musicBelowVoiceDb'] < -20 for window in audio_qa['audioWindows'])
    with zipfile.ZipFile(ROOT / 'out/1811-source.zip') as archive:
        assert archive.testzip() is None
        assert '1811/Tonghop/Overview.md' in archive.namelist(), 'Rebuild source ZIP to include Tonghop.'
        for name in archive.namelist():
            relative = Path(name)
            assert relative.parts[0] == '1811' and '..' not in relative.parts
            assert archive.read(name) == (ROOT.parent / relative).read_bytes(), f'Stale ZIP entry: {name}'
        archive_files = len(archive.namelist())
    print(json.dumps({'status': 'passed', 'sourceSha256': source_sha, 'frames': int(video['nb_frames']), 'seconds': float(video['duration']), 'scenes': len(recording['scenes']), 'captionCues': 28, 'year': 2028, 'sourceArchiveFiles': archive_files, 'note': 'Audio measurements are read from the existing final-render QA report; this audit does not remeasure audio or edit media.'}, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
