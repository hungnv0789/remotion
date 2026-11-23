"""Transcribe supplied audio locally; review spelling before preparing the timeline."""
import argparse,hashlib,json
from pathlib import Path
from faster_whisper import WhisperModel
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--model',default='medium');args=p.parse_args()
source=ROOT/'2311.mp3';m=WhisperModel(args.model,device='cpu',compute_type='int8',cpu_threads=4)
segments,info=m.transcribe(str(source),language='vi',word_timestamps=True,beam_size=5,vad_filter=True,condition_on_previous_text=False,initial_prompt='Tin tài chính, kinh tế, thị trường.')
data={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'duration':info.duration,'segments':[]}
for s in segments:
 data['segments'].append({'start':s.start,'end':s.end,'text':s.text.strip(),'words':[{'text':w.word.strip(),'start':w.start,'end':w.end} for w in s.words]})
 print(s.text,flush=True)
(ROOT/'src/data/transcription.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
