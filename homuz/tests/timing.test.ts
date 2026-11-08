import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import { defaultProps, VIDEO, SCENE_IDS } from '../src/config';
import { at, buildCaptionCues, buildTimeline, totalFrames } from '../src/timing';
import world from '../src/data/world.json';

test('the narration is the supplied original audio', () => {
  const original = readFileSync('amthanh.mp3');
  assert.deepEqual(readFileSync('public/audio/amthanh.mp3'), original);
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    defaultProps.timing.recording.sourceSha256,
  );
});

test('every selected photo exists and has a documented usable license', () => {
  assert(defaultProps.assets.length >= 5);
  for (const asset of defaultProps.assets) {
    assert(existsSync(`public/${asset.src}`));
    assert(asset.page.startsWith('https://commons.wikimedia.org/'));
    assert(asset.author && asset.credit && asset.title);
    assert(['Public domain', 'CC BY 2.0', 'CC BY 3.0', 'CC BY 4.0'].includes(asset.license));
  }
  for (const id of Object.values(defaultProps.images))
    assert(defaultProps.assets.some((asset) => asset.id === id));
});

test('the seven chapters cover the full voiceover and ending', () => {
  const timeline = buildTimeline(defaultProps, VIDEO.fps);
  assert.deepEqual(
    timeline.map((s) => s.id),
    [...SCENE_IDS],
  );
  assert.equal(timeline[0].from, 0);
  assert.equal(
    timeline.at(-1)!.from + timeline.at(-1)!.durationInFrames,
    totalFrames(defaultProps, 30),
  );
  for (const [i, scene] of timeline.entries()) {
    if (i) assert.equal(scene.from, timeline[i - 1].from + timeline[i - 1].durationInFrames);
    for (const [j, word] of scene.words.entries()) {
      assert(word.from >= 0 && word.to > word.from && word.to <= scene.durationInFrames);
      if (j) assert(word.from >= scene.words[j - 1].to);
    }
  }
});

test('captions retain the recording text without omissions or overlap', () => {
  const cues = buildCaptionCues(buildTimeline(defaultProps, 30));
  assert.equal(
    cues.flatMap((c) => c.words.map((w) => w.text)).join(' '),
    defaultProps.timing.recording.scenes.map((s) => s.text).join(' '),
  );
  for (const [i, cue] of cues.entries()) {
    assert(cue.end > cue.start && cue.end <= totalFrames(defaultProps, 30));
    if (i) assert(cue.start >= cues[i - 1].end);
  }
});

test('chapter markers follow the spoken material', () => {
  const timeline = buildTimeline(defaultProps, 30);
  const strategy = timeline[5];
  assert.equal(strategy.from + at(strategy, 'Về quyền lực'), Math.round((129.16 + 0.5) * 30));
  assert.equal(strategy.from + at(strategy, 'Về dầu mỏ'), Math.round((133.34 + 0.5) * 30));
  assert.equal(strategy.from + at(strategy, 'Và quan trọng nhất'), Math.round((137.92 + 0.5) * 30));
});

test('playback rate and intro changes keep words and chapters together', () => {
  const props = structuredClone(defaultProps);
  const baseline = buildTimeline(props, 30);
  props.audio.playbackRate = 1.1;
  assert(totalFrames(props, 30) < totalFrames(defaultProps, 30));
  assert(buildTimeline(props, 30)[5].from < baseline[5].from);
  props.audio.playbackRate = 1;
  props.timing.voiceoverStartSeconds += 1;
  assert.equal(buildTimeline(props, 30)[5].from - baseline[5].from, 30);
});

test('map geometry includes the relevant countries and is numeric SVG data', () => {
  for (const id of ['IRN', 'USA', 'VNM', 'RUS', 'UKR'])
    assert(world.some((country) => country.id === id));
  assert(world.every((country) => /^M[-\d.,LZM]+$/.test(country.d)));
});

test('invalid rates and changed recordings fail clearly', () => {
  const props = structuredClone(defaultProps);
  props.audio.playbackRate = 0;
  assert.throws(() => buildTimeline(props, 30));
  props.audio.playbackRate = 1;
  props.timing.audioDurationSeconds += 3;
  assert.throws(() => buildTimeline(props, 30), /Bản thu đã thay đổi/);
});
