"""Calibrate the original bed below active speech; does not modify narration."""
import argparse,json,hashlib,wave
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
def read(path):
 with wave.open(str(path)) as w:
  channels=w.getnchannels();sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
 return a.reshape(-1,channels).mean(axis=1),sr
p=argparse.ArgumentParser();p.add_argument('--target-db',type=float,default=-22);p.add_argument('--headroom-db',type=float,default=6);args=p.parse_args()
voice,sr=read(ROOT/'public/audio/voiceover.wav');bed,mr=read(ROOT/'public/audio/finance-news.wav')
blocks=voice[:len(voice)//2400*2400].reshape(-1,2400);active=np.sqrt(np.mean(blocks**2,axis=1))>.018
voiceRms=float(np.sqrt(np.mean(blocks[active]**2)));musicRms=float(np.sqrt(np.mean(bed**2)))
voiceVolume=.95;duck=.65;volume=voiceRms*voiceVolume*10**((args.target_db-args.headroom_db)/20)/musicRms/duck
result={'targetMusicBelowVoiceDb':args.target_db,'safetyHeadroomDb':args.headroom_db,'sourceBedTargetDb':args.target_db-args.headroom_db,'musicVolume':round(volume,6),'voiceVolume':voiceVolume,'duckFactor':duck,'activeVoiceRms':voiceRms,'rawMusicMonoRms':musicRms,'method':'Active speech 50ms RMS, caption ducking and 6 dB headroom checked against the actual mono/stereo render.','musicOrigin':'Original procedural synthesis, no third-party recordings or samples.','musicBpm':116,'musicSha256':hashlib.sha256((ROOT/'public/audio/finance-news.wav').read_bytes()).hexdigest()}
(ROOT/'public/audio/mix-calibration.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
manifest=ROOT/'public/audio/production-manifest.json';m=json.loads(manifest.read_text());m['music']='Original soft electronic finance bed, 116 BPM; no third-party samples';m['mix']=result;manifest.write_text(json.dumps(m,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False))
