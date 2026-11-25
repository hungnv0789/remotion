"""Extract actual encoded MP4 frames for a final visual review."""
import json,subprocess,math
from pathlib import Path
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'out';ff=ROOT/'node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg'
timeline=json.loads((out/'timing-report-2511.json').read_text());last=timeline['durationInFrames']-1
frames=list(dict.fromkeys([54,*[min(last,s['from']+90) for s in timeline['scenes']],last]))
canvas=Image.new('RGB',(1080,math.ceil(len(frames)/4)*510),'#eee6f7');draw=ImageDraw.Draw(canvas)
for i,frame in enumerate(frames):
 target=out/f'encoded-frame-{frame}.png'
 subprocess.run([str(ff),'-v','error','-ss',str(frame/30),'-i',str(out/'2511.mp4'),'-frames:v','1','-vf','scale=540:960','-y',str(target)],check=True)
 im=Image.open(target).convert('RGB');im.thumbnail((270,480));x=i%4*270;y=i//4*510;canvas.paste(im,(x,y));draw.text((x+12,y+488),f'MP4 | {frame/30:.2f}s',fill='#24143e')
canvas.save(out/'render-review.jpg',quality=92)
print(out/'render-review.jpg')
