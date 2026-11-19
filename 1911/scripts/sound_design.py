"""Original cinematic financial news bed. Synthesizers only; no recording samples."""
import wave
from pathlib import Path
import numpy as np

def write_wav(path,data,sr):
 data=np.clip(data,-.98,.98)
 with wave.open(str(path),'wb') as f:
  f.setnchannels(1 if data.ndim==1 else data.shape[1]);f.setsampwidth(2);f.setframerate(sr);f.writeframes((data*32767).astype('<i2').tobytes())

def music(duration,output):
 sr=24000;t=np.arange(int(duration*sr))/sr;beat=60/106;phase=(t%beat)/beat
 bass=.045*(np.sin(2*np.pi*73.416*t)+.2*np.sin(2*np.pi*146.832*t))*np.exp(-phase*6)
 kick=.035*np.sin(2*np.pi*(42*t+1.5*(1-np.exp(-phase*16))))*np.exp(-phase*24)
 freqs=np.array([293.665,349.228,440.0,587.33,440.0,349.228,293.665,220.0])
 arp=.011*np.sin(2*np.pi*freqs[(t/beat).astype(int)%8]*t)*np.exp(-phase*6)
 hat=.0035*np.sin(2*np.pi*6800*t)*np.exp(-((t%(beat/2))/(beat/2))*45)
 swell=.75+.25*np.sin(2*np.pi*.035*t)
 padL=.018*swell*(np.sin(2*np.pi*146.832*t)+np.sin(2*np.pi*174.614*t)+np.sin(2*np.pi*220.0*t))
 padR=.018*swell*(np.sin(2*np.pi*146.832*t+.12)+np.sin(2*np.pi*174.614*t-.1)+np.sin(2*np.pi*220.0*t+.18))
 fade=np.minimum(1,t/1.2)*np.minimum(1,(duration-t)/1.8)
 lift=.85+.15*np.clip((t-(duration-14))/12,0,1)
 data=np.column_stack([bass+kick+arp+hat+padL,bass+kick+.9*arp-.4*hat+padR])*(fade*lift)[:,None]
 data*=.075/max(1e-9,float(np.sqrt(np.mean(data**2))))
 write_wav(output,data,sr)

def rising_effect(output):
 sr=24000;duration=1.0;t=np.arange(int(sr*duration))/sr
 sweep=.065*np.sin(2*np.pi*(300*t+1050*t*t))*np.sin(np.pi*t/duration)**2
 hit_t=np.maximum(0,t-.76);hit=.09*np.sin(2*np.pi*55*hit_t)*np.exp(-hit_t*18)*(t>=.76)
 write_wav(output,sweep+hit,sr)
