"""Bundle the runnable project with local assets, excluding caches and renders."""
import hashlib,json,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
assets=[]
for p in sorted((ROOT/'public').rglob('*')):
 if p.is_file() and p.name!='assets-manifest.json':
  assets.append({'path':str(p.relative_to(ROOT/'public')),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(ROOT/'public/assets-manifest.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n')
output=ROOT/'out/1411-source.zip'
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(ROOT.rglob('*')):
  rel=p.relative_to(ROOT)
  if p.is_file() and not any(x in ['out','node_modules','.git','__pycache__','.venv-voice','.venv-align'] for x in rel.parts):
   z.write(p,str(Path('1411')/rel))
with zipfile.ZipFile(output) as z:
 assert z.testzip() is None
 print('Source archive:',len(z.namelist()),'files;',output.stat().st_size,'bytes')
