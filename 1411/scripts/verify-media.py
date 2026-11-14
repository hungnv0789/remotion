"""Check the actual H.264 render, narration alignment, music level and peaks."""
import json,os,subprocess,wave
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
BIN=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu'
FF=os.environ.get('FFMPEG_BINARY',str(BIN/'ffmpeg'))
PROBE=os.environ.get('FFPROBE_BINARY',str(BIN/'ffprobe'))
OUT=ROOT/'out'
def decode(src,dst):
 subprocess.run([FF,'-hide_banner','-loglevel','error','-i',str(src),'-vn','-ac','1','-ar','16000','-y',str(dst)],check=True)
def load(p):
 with wave.open(str(p)) as w:
  return np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
probe=json.loads(subprocess.check_output([PROBE,'-v','error','-show_entries','stream=codec_name,width,height,r_frame_rate,nb_frames,duration:format=duration','-of','json',str(OUT/'1411.mp4')]))
video=next(s for s in probe['streams'] if s['codec_name']=='h264')
assert (video['width'],video['height'],video['r_frame_rate'])==(1080,1920,'30/1')
timeline=json.loads((OUT/'timing-report.json').read_text())
assert int(video['nb_frames'])==timeline['durationInFrames']
decode(ROOT/'public/audio/voiceover.mp3',OUT/'qa-voice.wav')
decode(OUT/'1411.mp4',OUT/'qa-mix.wav')
x=load(OUT/'qa-voice.wav');mix=load(OUT/'qa-mix.wav');y=mix[4800:4800+len(x)]
windows=[]
for name,start,end in [('hook',1,7),('inspection',10,18),('safety',36,43),('borrowers',58,65),('closing',83,91)]:
 a=x[start*16000:end*16000];b=y[start*16000:end*16000];n=len(a)//800*800;a=a[:n];b=b[:n]
 active=np.repeat(np.sqrt(np.mean(a.reshape(-1,800)**2,axis=1))>.018,800);a=a[active];b=b[active]
 gain=np.dot(a,b)/np.dot(a,a);res=b-gain*a
 below=float(20*np.log10(np.sqrt(np.mean(res**2))/np.sqrt(np.mean((gain*a)**2))))
 correlation=float(np.corrcoef(a,b)[0,1]);windows.append({'scene':name,'musicBelowVoiceDb':below,'voiceCorrelation':correlation})
assert all(w['voiceCorrelation']>.97 and w['musicBelowVoiceDb']<-20 for w in windows),windows
peak=float(np.max(np.abs(mix)));assert peak<.99
report={'media':probe,'audioWindows':windows,'peak':peak,'samplesAtDigitalLimit':int(np.sum(np.abs(mix)>=.9999))}
(OUT/'audio-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
subprocess.run([FF,'-v','error','-i',str(OUT/'1411.mp4'),'-vn','-codec:a','libmp3lame','-b:a','160k','-y',str(OUT/'1411-mix.mp3')],check=True)
for name in ['qa-voice.wav','qa-mix.wav']:(OUT/name).unlink()
print(json.dumps(report,ensure_ascii=False,indent=2))
