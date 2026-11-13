"""Generate one full VieNeu-TTS voice-over. No gTTS or fallback engine."""
import argparse,hashlib,json,logging,os,subprocess,time
from pathlib import Path
import numpy as np
import soundfile as sf
from vieneu import Vieneu
ROOT=Path(__file__).resolve().parents[1]
FFMPEG=os.environ.get('FFMPEG_BINARY',str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'))
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--voice',default='Mai Anh');parser.add_argument('--tempo',type=float,default=1.40);parser.add_argument('--threads',type=int,default=3);args=parser.parse_args()
 logging.basicConfig(level=logging.WARNING)
 os.environ.setdefault('HF_HUB_DISABLE_XET','1');os.environ.setdefault('HF_HUB_DISABLE_PROGRESS_BARS','1')
 tts=Vieneu(mode='v3turbo',backend='onnx',precision='fp32',threads=args.threads)
 preset=tts._preset_voices.get(args.voice)
 if not preset or preset.get('gender')!='female' or 'Bắc' not in preset.get('description',''):raise RuntimeError('Select a female Northern VieNeu preset.')
 print('VOICE',args.voice,preset['description'],flush=True)
 scenes=json.loads((ROOT/'src/data/script.json').read_text());cache=ROOT/'out/tts-cache';cache.mkdir(parents=True,exist_ok=True);parts=[];plan=[];offset=0.;sr=48000
 for scene in scenes:
  key=hashlib.sha256((scene['speech']+'|'+args.voice+'|v3turbo-3.8.4').encode()).hexdigest()[:10];raw=cache/(scene['id']+'-'+key+'.wav');processed=cache/(scene['id']+'-aligned.wav')
  started=time.time()
  if not raw.exists():
   wav=tts.infer(scene['speech'],voice=args.voice,temperature=.65,top_p=.9,max_chars=220,silence_p=.12)
   if len(wav)<sr:raise RuntimeError('Empty TTS chapter '+scene['id'])
   tts.save(wav,str(raw))
  subprocess.run([FFMPEG,'-v','error','-i',str(raw),'-af',f'atempo={args.tempo}','-ar',str(sr),'-ac','1','-y',str(processed)],check=True)
  wav,_=sf.read(processed,dtype='float32');wav*=.87/max(.01,float(np.max(np.abs(wav))));sf.write(processed,wav,sr,subtype='PCM_16')
  duration=len(wav)/sr;plan.append({'id':scene['id'],'text':scene['text'],'speech':scene['speech'],'file':str(processed.relative_to(ROOT)),'offset':offset,'duration':duration});parts.append(wav);offset+=duration
  if scene!=scenes[-1]:gap=np.zeros(round(.14*sr),np.float32);parts.append(gap);offset+=len(gap)/sr
  print(scene['id'],round(duration,2),'seconds; generated in',round(time.time()-started,1),'s',flush=True)
 full=np.concatenate(parts);audio=ROOT/'public/audio';audio.mkdir(parents=True,exist_ok=True);sf.write(audio/'voiceover.wav',full,sr,subtype='PCM_16')
 subprocess.run([FFMPEG,'-v','error','-i',str(audio/'voiceover.wav'),'-codec:a','libmp3lame','-b:a','160k','-y',str(audio/'voiceover.mp3')],check=True)
 (ROOT/'1311.mp3').write_bytes((audio/'voiceover.mp3').read_bytes())
 (cache/'plan.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2))
 manifest={'voiceAlias':'female_north','engine':'VieNeu-TTS v3 Turbo','sdkVersion':'3.8.4','model':'pnnbao-ump/VieNeu-TTS-v3-Turbo','modelLicense':'Apache-2.0','backend':'ONNX CPU fp32','preset':args.voice,'presetDescription':preset['description'],'presetGender':preset['gender'],'sampleRate':sr,'tempo':args.tempo,'sourceDurationSeconds':len(full)/sr,'sourceSha256':hashlib.sha256((audio/'voiceover.mp3').read_bytes()).hexdigest()}
 (audio/'production-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));print('VOICE COMPLETE',len(full)/sr,flush=True)
if __name__=='__main__':main()
