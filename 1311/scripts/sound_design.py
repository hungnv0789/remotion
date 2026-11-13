"""Original electronic financial-news score and narration alignment helpers."""
import wave
import numpy as np
from pathlib import Path
def write_wav(path,data,sr):
 data=np.clip(data,-.98,.98)
 with wave.open(str(path),'wb') as f:
  f.setnchannels(1 if data.ndim==1 else data.shape[1]);f.setsampwidth(2);f.setframerate(sr);f.writeframes((data*32767).astype('<i2').tobytes())
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
