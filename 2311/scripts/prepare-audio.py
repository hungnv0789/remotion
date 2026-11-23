"""Keep supplied MP3 intact, prepare timestamped captions and an original quiet bed."""
import hashlib,json,subprocess,sys,wave
from pathlib import Path
import numpy as np
from sound_design import music,write_wav
from alignment_utils import align
ROOT=Path(__file__).resolve().parents[1]
FF=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'
source=ROOT/'2311.mp3';audio=ROOT/'public/audio/2311';audio.mkdir(parents=True,exist_ok=True)
(audio/'2311.mp3').write_bytes(source.read_bytes())
subprocess.run([str(FF),'-v','error','-i',str(source),'-ar','48000','-ac','1','-y',str(audio/'voiceover.wav')],check=True)
with wave.open(str(audio/'voiceover.wav')) as w:duration=w.getnframes()/w.getframerate()
script=json.loads((ROOT/'src/data/script.json').read_text())
raw=json.loads((ROOT/'src/data/transcription.json').read_text())
if raw['sourceSha256']!=hashlib.sha256(source.read_bytes()).hexdigest():raise RuntimeError('Source audio changed; transcribe and review script before alignment.')
recognized=[w for s in raw['segments'] for w in s['words']]
words,ratio=align(' '.join(s['text'] for s in script),recognized,0)
if ratio<.8:raise RuntimeError('Review speech alignment: '+str(ratio))
scenes=[];cursor=0
for s in script:
 count=len(s['text'].split());part=words[cursor:cursor+count];cursor+=count
 for word in part:word['end']=min(duration,word['end'])
 scenes.append({'id':s['id'],'text':s['text'],'words':part})
record={'audioSrc':'audio/2311/2311.mp3','durationSeconds':duration,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'scenes':scenes}
(ROOT/'src/data/voiceover.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
manifest={'sourceFile':'2311.mp3','sourceSha256':record['sourceSha256'],'durationSeconds':duration,'audioPolicy':'Original supplied MP3 preserved byte for byte; playbackRate 1; no TTS.','transcription':'faster-whisper medium, local CPU int8; spelling and proper names reviewed.','alignmentMatchRatio':ratio,'music':'Original 108 BPM procedural electronic finance bed; no third-party samples.'}
(audio/'production-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
music(duration+1,audio/'finance-news.wav')
sr=24000;t=np.arange(round(.7*sr))/sr
write_wav(audio/'news-sting.wav',.05*np.sin(2*np.pi*(400*t+700*t*t))*np.sin(np.pi*t/.7)**2,sr)
print(json.dumps({'audioDurationSeconds':duration,'alignmentMatchRatio':ratio,'words':cursor},ensure_ascii=False))
