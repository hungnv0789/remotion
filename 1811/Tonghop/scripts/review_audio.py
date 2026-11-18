#!/usr/bin/env python3
"""Review a short audio section with local ASR; never changes source or subtitles."""
import argparse
import json
import os
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--start', type=float, required=True)
    parser.add_argument('--duration', type=float, required=True)
    parser.add_argument('--model', default='medium')
    parser.add_argument('--vad', action='store_true')
    parser.add_argument('--prompt', default='Hưng Yên, đô thị loại I, đô thị loại II, quy hoạch.')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    if args.start < 0 or args.duration <= 0:
        parser.error('start must be nonnegative; duration must be positive.')
    from faster_whisper import WhisperModel
    ffmpeg = os.environ.get('FFMPEG_BINARY', str(ROOT / 'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'))
    with tempfile.TemporaryDirectory(prefix='1811-review-') as directory:
        wav = Path(directory) / 'review.wav'
        subprocess.run([ffmpeg, '-v', 'error', '-ss', str(args.start), '-i', str(ROOT / '1811.mp3'), '-t', str(args.duration), '-ac', '1', '-ar', '16000', '-y', str(wav)], check=True)
        model = WhisperModel(args.model, device='cpu', compute_type='int8', cpu_threads=4)
        segments, _ = model.transcribe(str(wav), language='vi', word_timestamps=True, beam_size=5, vad_filter=args.vad, condition_on_previous_text=False, initial_prompt=args.prompt)
        result = {'source': '1811.mp3', 'start': args.start, 'duration': args.duration, 'model': args.model, 'vad': args.vad, 'segments': []}
        for segment in segments:
            result['segments'].append({'start': float(segment.start + args.start), 'end': float(segment.end + args.start), 'text': segment.text.strip(), 'words': [{'text': word.word.strip(), 'start': float(word.start + args.start), 'end': float(word.end + args.start)} for word in segment.words]})
    output = args.output or ROOT / 'out/tonghop' / f'review-{args.start:g}-{args.duration:g}.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print(f'Saved: {output}')

if __name__ == '__main__':
    main()
