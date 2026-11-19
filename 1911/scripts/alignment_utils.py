import re,unicodedata,difflib
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
