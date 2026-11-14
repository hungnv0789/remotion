"""Align the approved script to VieNeu speech; compose the original music bed."""
import argparse,hashlib,json
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel
from alignment_utils import align
from sound_design import music,write_wav
ROOT=Path(__file__).resolve().parents[1]
def main():
 p=argparse.ArgumentParser();p.add_argument('--model',default='small');args=p.parse_args()
 model=WhisperModel(args.model,device='cpu',compute_type='int8',cpu_threads=2)
 plan=json.loads((ROOT/'out/tts-cache/plan.json').read_text());recordings=[];stats=[]
 for scene in plan:
  segments,_=model.transcribe(str(ROOT/scene['file']),language='vi',word_timestamps=True,beam_size=5,vad_filter=True,condition_on_previous_text=True,initial_prompt='Ngân hàng Nhà nước, lãi suất, thanh tra, tín dụng, năm 2026, năm 2027, không phẩy năm, một phẩy năm.')
  recognized=[{'text':w.word.strip(),'start':w.start,'end':w.end} for s in segments for w in s.words]
  if not recognized:raise RuntimeError('No recognized speech '+scene['id'])
  words,ratio=align(scene['text'],recognized,scene['offset'])
  if ratio<.65:raise RuntimeError('Alignment needs review '+scene['id']+' '+str(ratio))
  recordings.append({'id':scene['id'],'text':scene['text'],'words':words});stats.append({'id':scene['id'],'matchRatio':ratio});print('ALIGNED',scene['id'],round(ratio,3),flush=True)
 audio=ROOT/'public/audio';manifest=json.loads((audio/'production-manifest.json').read_text());duration=manifest['sourceDurationSeconds']
 record={'audioSrc':'audio/voiceover.mp3','durationSeconds':duration,'sourceSha256':manifest['sourceSha256'],'scenes':recordings}
 (ROOT/'src/data/voiceover.json').write_text(json.dumps(record,ensure_ascii=False,indent=2))
 music(duration+2.0,audio/'finance-news.wav');sr=24000;t=np.arange(round(.7*sr))/sr;write_wav(audio/'news-sting.wav',(.07*np.sin(2*np.pi*(520*t+35*np.sin(t*12)))*np.exp(-t*8)+.14*np.sin(2*np.pi*58*t)*np.exp(-t*11)),sr)
 manifest['alignment']=stats;manifest['music']='Original cinematic financial news bed, 104 BPM; no third-party samples';(audio/'production-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));print('AUDIO COMPLETE',duration,flush=True)
if __name__=='__main__':main()
