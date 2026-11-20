"""Check the actual H.264 render, narration alignment, music level and peaks."""
import json,os,subprocess,wave
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
BIN=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu'
FF=os.environ.get('FFMPEG_BINARY',str(BIN/'ffmpeg'))
PROBE=os.environ.get('FFPROBE_BINARY',str(BIN/'ffprobe'))
OUT=ROOT/'out'
QA=OUT/'2011';QA.mkdir(exist_ok=True)
def decode(src,dst):
 subprocess.run([FF,'-hide_banner','-loglevel','error','-i',str(src),'-vn','-ac','1','-ar','16000','-y',str(dst)],check=True)
def load(p):
 with wave.open(str(p)) as w:
  return np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
probe=json.loads(subprocess.check_output([PROBE,'-v','error','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_frames,duration:format=duration','-of','json',str(OUT/'2011.mp4')]))
video=next(s for s in probe['streams'] if s['codec_name']=='h264')
assert (video['width'],video['height'],video['r_frame_rate'])==(1080,1920,'30/1')
timeline=json.loads((OUT/'timing-report-2011.json').read_text())
assert int(video['nb_frames'])==timeline['durationInFrames']
decode(ROOT/'public/audio/2011/2011.mp3',QA/'qa-voice.wav')
decode(OUT/'2011.mp4',QA/'qa-mix.wav')
x=load(QA/'qa-voice.wav');mix=load(QA/'qa-mix.wav');y=mix[3200:3200+len(x)]
windows=[]
for chapter in timeline['scenes']:
 name=chapter['id'];start=max(0,chapter['speechFrom']/30-.2+.5);end=min(chapter['speechTo']/30-.2-.15,start+7)
 if end-start<.5:raise RuntimeError('Speech window too short: '+name)
 a=x[round(start*16000):round(end*16000)];b=y[round(start*16000):round(end*16000)];n=len(a)//800*800;a=a[:n];b=b[:n]
 active=np.repeat(np.sqrt(np.mean(a.reshape(-1,800)**2,axis=1))>.018,800);a=a[active];b=b[active]
 gain=np.dot(a,b)/np.dot(a,a);res=b-gain*a
 below=float(20*np.log10(np.sqrt(np.mean(res**2))/np.sqrt(np.mean((gain*a)**2))))
 correlation=float(np.corrcoef(a,b)[0,1]);windows.append({'scene':name,'musicBelowVoiceDb':below,'voiceCorrelation':correlation})
assert all(w['voiceCorrelation']>.97 and w['musicBelowVoiceDb']<-20 for w in windows),windows
peak=float(np.max(np.abs(mix)));assert peak<.99
report={'media':probe,'audioWindows':windows,'peak':peak,'samplesAtDigitalLimit':int(np.sum(np.abs(mix)>=.9999))}
(OUT/'audio-verification-2011.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
subprocess.run([FF,'-v','error','-i',str(OUT/'2011.mp4'),'-vn','-codec:a','libmp3lame','-b:a','160k','-y',str(OUT/'2011-mix.mp3')],check=True)
for name in ['qa-voice.wav','qa-mix.wav']:(QA/name).unlink()
print(json.dumps(report,ensure_ascii=False,indent=2))
