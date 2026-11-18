import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defaultProps, VIDEO, SCENE_IDS } from '../src/config';
import { at, buildTimeline, buildCaptionCues, totalFrames } from '../src/timing';
import manifest from '../public/audio/1811/production-manifest.json';
import mix from '../public/audio/1811/mix-calibration.json';
const source = () => readFileSync(new URL('../1811.mp3', import.meta.url));

test('1811: supplied MP3 is copied byte for byte and its identity is retained', () => {
  assert.deepEqual(source(),readFileSync(new URL('../public/audio/1811/1811.mp3',import.meta.url)));
  assert.equal(createHash('sha256').update(source()).digest('hex'),defaultProps.timing.recording.sourceSha256);
  assert.equal(manifest.sourceSha256,defaultProps.timing.recording.sourceSha256);
  assert.equal(defaultProps.audio.playbackRate,1);
});
test('1811: the timeline covers every scene and word without gaps or overflow', () => {
  const scenes=buildTimeline(defaultProps,VIDEO.fps);
  assert.deepEqual(scenes.map(s=>s.id),SCENE_IDS);
  let end=0;
  for (const scene of scenes) {
    assert.equal(scene.from,end);
    let last=0;
    for (const word of scene.words) {
      assert.ok(word.from>=last && word.to>word.from && word.to<=scene.durationInFrames);
      last=word.to;
    }
    end=scene.from+scene.durationInFrames;
  }
  assert.equal(end,totalFrames(defaultProps,VIDEO.fps));
});
test('1811: captions retain every transcript word once and never overlap', () => {
  const cues=buildCaptionCues(buildTimeline(defaultProps,VIDEO.fps));
  assert.equal(cues.flatMap(c=>c.words.map(w=>w.text)).join(' '),defaultProps.timing.recording.scenes.map(s=>s.text).join(' '));
  for(let i=0;i<cues.length;i++) {
    assert.ok(cues[i].end>cues[i].start);
    if(i)assert.ok(cues[i].start>=cues[i-1].end);
    assert.ok(cues[i].words.map(w=>w.text).join(' ').length<=66);
  }
});
test('1811: shot changes reference actual spoken phrases', () => {
  const scenes=buildTimeline(defaultProps,VIDEO.fps);
  defaultProps.copy.scenes.forEach((shots,i)=>shots.forEach(shot=>{
    if(shot.anchor)assert.ok(at(scenes[i],shot.anchor,-1)>=0,shot.anchor);
  }));
});
test('1811: changing audio identity or invalid playback requires realignment', () => {
  const props=structuredClone(defaultProps);props.audio.voiceover='different.mp3';
  assert.throws(()=>buildTimeline(props,VIDEO.fps));
  props.audio.voiceover=defaultProps.audio.voiceover;props.audio.playbackRate=0;
  assert.throws(()=>buildTimeline(props,VIDEO.fps));
});
test('1811: duration follows supplied audio at 1080 by 1920 and 30 fps', () => {
  assert.deepEqual(VIDEO,{fps:30,width:1080,height:1920});
  assert.equal(totalFrames(defaultProps,30),Math.ceil((defaultProps.timing.audioDurationSeconds+.2+.8)*30-1e-4));
  assert.ok(manifest.alignmentMatchRatio>.8);
});
test('1811: all local original visual and audio assets are present', () => {
  for(const a of defaultProps.assets)assert.ok(readFileSync(new URL(`../${a.source}`,import.meta.url)).length>0);
  for(const p of [defaultProps.audio.music,defaultProps.audio.sting])assert.ok(readFileSync(new URL(`../public/${p}`,import.meta.url)).length>0);
});
test('1811: original background music stays below narration and matches its manifest', () => {
  const ratio=mix.rawMusicMonoRms*defaultProps.audio.musicVolume*defaultProps.audio.musicDuck/(mix.activeVoiceRms*defaultProps.audio.volume);
  assert.ok(20*Math.log10(ratio)<-23);
  assert.equal(createHash('sha256').update(readFileSync(new URL('../public/audio/1811/finance-news.wav',import.meta.url))).digest('hex'),mix.musicSha256);
  assert.ok(mix.musicOrigin.includes('no third-party'));
});

test('approved year 2028 is retained and generated promotional tail is excluded', () => {
  const text=defaultProps.timing.recording.scenes.map(s=>s.text).join(' ');
  assert.ok(text.includes('cuối năm 2028'));
  assert.equal(defaultProps.copy.calendar[1],'2028');
  assert.ok(!/subscribe|Ghiền Mì Gõ/i.test(text));
});
