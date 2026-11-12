"""Generate consistent Vietnamese narration, align subtitles and compose an original news bed.
Install requirements-audio.txt; supply --model for an existing faster-whisper model directory.
"""
import argparse,difflib,hashlib,json,os,re,subprocess,unicodedata,wave
from pathlib import Path
import numpy as np
from gtts import gTTS

ROOT=Path(__file__).resolve().parents[1]
FFMPEG=os.environ.get('FFMPEG_BINARY',str(ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'))
def run(*args):subprocess.run([FFMPEG,'-v','error',*map(str,args)],check=True)
def write_wav(path,data,sr):
 data=np.clip(data,-.98,.98)
 with wave.open(str(path),'wb') as f:f.setnchannels(1 if data.ndim==1 else data.shape[1]);f.setsampwidth(2);f.setframerate(sr);f.writeframes((data*32767).astype('<i2').tobytes())
def read_wav(path):
 with wave.open(str(path)) as f:return np.frombuffer(f.readframes(f.getnframes()),dtype='<i2').astype(np.float64)/32768,f.getframerate()
def normalize(word):
 word=unicodedata.normalize('NFD',word.lower().replace('đ','d'));return re.sub('[^a-z0-9]','', ''.join(c for c in word if unicodedata.category(c)!='Mn'))
def align(text,recognized,offset):
 target=text.split();times=[None]*len(target)
 matcher=difflib.SequenceMatcher(None,[normalize(w['text']) for w in recognized],[normalize(w) for w in target],autojunk=False)
 for tag,a,b,c,d in matcher.get_opcodes():
  if tag=='equal':
   for x,y in zip(range(a,b),range(c,d)):times[y]=(recognized[x]['start'],recognized[x]['end'])
  elif d>c:
   start=recognized[a]['start'] if a<len(recognized) else recognized[-1]['end']
   end=recognized[b-1]['end'] if b>a else start+.025*(d-c)
   for y in range(c,d):times[y]=(start+(end-start)*(y-c)/(d-c),start+(end-start)*(y-c+1)/(d-c))
 words=[];last=0
 for word,(start,end) in zip(target,times):
  start=max(start,last);end=max(end,start+.012);last=end
  words.append({'text':word,'start':round(offset+start,5),'end':round(offset+end,5)})
 return words,matcher.ratio()
def music(duration,output):
 sr=24000;t=np.arange(int(duration*sr))/sr;beat=60/120;p=(t%beat)/beat
 bass=np.sin(2*np.pi*65.406*t)+.35*np.sin(2*np.pi*130.812*t)
 pulse=.11*bass*np.exp(-p*10)
 kick=.13*np.sin(2*np.pi*(44*t+1.8*(1-np.exp(-p*20))))*np.exp(-p*26)
 arpFreq=np.array([261.626,311.127,391.995,466.164,391.995,311.127,261.626,233.082])
 note=arpFreq[(t/(beat/2)).astype(int)%len(arpFreq)]
 arp=.032*np.sin(2*np.pi*note*t)*np.exp(-((t%(beat/2))/(beat/2))*7)
 hat=.016*np.sin(2*np.pi*7200*t)*np.exp(-((t%(beat/2))/(beat/2))*55)
 pad=.022*(np.sin(2*np.pi*130.813*t)+np.sin(2*np.pi*155.563*t)+np.sin(2*np.pi*195.998*t))
 fade=np.minimum(1,t/.7)*np.minimum(1,(duration-t)/1.5)
 left=(pulse+kick+arp+hat+pad)*fade
 right=(pulse+kick+.9*arp-.7*hat+pad)*fade
 write_wav(output,np.column_stack([left,right]),sr)
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--model',default='small');parser.add_argument('--tempo',type=float,default=1.12);args=parser.parse_args()
 from faster_whisper import WhisperModel
 model=WhisperModel(args.model,device='cpu',compute_type='int8',cpu_threads=2)
 scripts=json.loads((ROOT/'src/data/script.json').read_text());cache=ROOT/'out/tts-cache';cache.mkdir(parents=True,exist_ok=True)
 sr=24000;parts=[];offset=0;scenes=[];qualities=[]
 for index,scene in enumerate(scripts):
  raw=cache/(scene['id']+'.mp3');processed=cache/(scene['id']+'.wav')
  if not raw.exists():gTTS(scene['speech'],lang='vi',tld='com',slow=False,timeout=(10,50)).save(str(raw))
  run('-i',raw,'-af',f'atempo={args.tempo}','-ar',sr,'-ac',1,'-y',processed)
  data,_=read_wav(processed)
  # Keep one voice and a consistent restrained peak level across every scene.
  data*=.88/max(.01,np.max(np.abs(data)));write_wav(processed,data,sr)
  segments,_=model.transcribe(str(processed),language='vi',beam_size=5,word_timestamps=True,vad_filter=True,condition_on_previous_text=True)
  recognized=[{'text':w.word.strip(),'start':w.start,'end':w.end} for s in segments for w in s.words]
  if not recognized:raise RuntimeError('No speech aligned: '+scene['id'])
  words,quality=align(scene['text'],recognized,offset)
  if quality<.55:raise RuntimeError('Alignment needs review: '+scene['id'])
  scenes.append({'id':scene['id'],'text':scene['text'],'words':words});qualities.append({'id':scene['id'],'matchRatio':quality,'duration':len(data)/sr})
  parts.append(data);offset+=len(data)/sr
  if index<len(scripts)-1:pause=np.zeros(round(.18*sr));parts.append(pause);offset+=len(pause)/sr
  print(scene['id'],round(len(data)/sr,2),'seconds, match',round(quality,3),flush=True)
 full=np.concatenate(parts);audio=ROOT/'public/audio';audio.mkdir(parents=True,exist_ok=True)
 voiceWav=audio/'voiceover.wav';write_wav(voiceWav,full,sr)
 run('-i',voiceWav,'-codec:a','libmp3lame','-b:a','128k','-y',audio/'voiceover.mp3')
 (ROOT/'1211-4.mp3').write_bytes((audio/'voiceover.mp3').read_bytes())
 duration=len(full)/sr
 music(duration+2.0,audio/'finance-news.wav')
 stingT=np.arange(int(.7*sr))/sr;sting=.12*np.sin(2*np.pi*(100*stingT+40*stingT**2))*np.exp(-stingT*10);write_wav(audio/'news-sting.wav',sting,sr)
 recording={'audioSrc':'audio/voiceover.mp3','durationSeconds':duration,'sourceSha256':hashlib.sha256((audio/'voiceover.mp3').read_bytes()).hexdigest(),'scenes':scenes}
 (ROOT/'src/data/voiceover.json').write_text(json.dumps(recording,ensure_ascii=False,indent=2))
 manifest={'voiceAlias':'female_north','provider':'gTTS / Google Translate TTS','language':'vi','tld':'com','tempo':args.tempo,'scenePauseSeconds':.18,'decodedDurationSeconds':duration,'alignment':qualities,'music':'Original procedural electronic news composition, 120 BPM'}
 (ROOT/'public/audio/production-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
 print('COMPLETE',duration,flush=True)
if __name__=='__main__':main()
