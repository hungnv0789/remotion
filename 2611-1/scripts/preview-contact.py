"""Build a labeled contact sheet from the frames in the current timing report."""
import json,math
from pathlib import Path
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'out'
timing=json.loads((out/'timing-report-2611-1.json').read_text())
frames=list(dict.fromkeys([55,*[f for s in timing['scenes'] for f in [min(s['to']-1,s['from']+60),max(s['from'],s['to']-12)]],timing['durationInFrames']-1]))
canvas=Image.new('RGB',(1080,math.ceil(len(frames)/4)*510),'#eee6f7');d=ImageDraw.Draw(canvas)
for i,frame in enumerate(frames):
 p=out/f'frame-{frame}.png'
 if not p.exists():raise FileNotFoundError(p)
 im=Image.open(p).convert('RGB');im.thumbnail((270,480));x=i%4*270;y=i//4*510
 canvas.paste(im,(x,y));d.text((x+10,y+487),f'frame {frame} | {frame/30:.2f}s',fill='#24143e')
canvas.save(out/'contact-sheet.jpg',quality=88)
print(out/'contact-sheet.jpg')
