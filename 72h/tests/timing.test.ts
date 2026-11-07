import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { defaultProps, VIDEO } from '../src/config';
import { at, buildCaptionCues, buildTimeline, totalFrames } from '../src/timing';

const fresh = () => structuredClone(defaultProps);

test('served audio is a byte-exact copy of the supplied recording', () => {
  const original = readFileSync('asset/72h.mp3');
  assert.deepEqual(readFileSync('public/audio/72h.mp3'), original);
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    defaultProps.timing.recording.sourceSha256,
  );
});

test('selected photographs are the original supplied JPEGs', () => {
  const manifest = JSON.parse(readFileSync('public/assets-manifest.json', 'utf8')) as {
    publicPath: string;
    source: string;
  }[];
  assert.equal(manifest.length, 8);
  for (const image of manifest)
    assert.deepEqual(readFileSync(`public/${image.publicPath}`), readFileSync(image.source));
});

test('five scenes cover the audio plus intro and ending without gaps', () => {
  const timeline = buildTimeline(defaultProps, VIDEO.fps);
  assert.equal(timeline.length, 5);
  assert.equal(totalFrames(defaultProps, 30), 1200);
  assert.equal(timeline[0].from, 0);
  const last = timeline.at(-1)!;
  assert.equal(last.from + last.durationInFrames, 1200);
  for (const [index, scene] of timeline.entries()) {
    if (index)
      assert.equal(scene.from, timeline[index - 1].from + timeline[index - 1].durationInFrames);
    for (const [wordIndex, word] of scene.words.entries()) {
      assert(word.to > word.from && word.from >= 0 && word.to <= scene.durationInFrames);
      if (wordIndex) assert(word.from >= scene.words[wordIndex - 1].to);
    }
  }
});

test('captions use the approved recording text, preserving every word', () => {
  const captions = buildCaptionCues(buildTimeline(defaultProps, 30));
  assert.equal(
    captions.flatMap((cue) => cue.words.map((word) => word.text)).join(' '),
    defaultProps.timing.recording.scenes.map((scene) => scene.text).join(' '),
  );
  for (const [index, cue] of captions.entries()) {
    assert(cue.end > cue.start && cue.end <= totalFrames(defaultProps, 30));
    if (index) assert(cue.start >= captions[index - 1].end);
  }
  assert(captions.at(-1)!.end < totalFrames(defaultProps, 30) - 2 * 30);
});

test('word anchors include the original 0.6-second voiceover offset', () => {
  const timeline = buildTimeline(defaultProps, 30);
  assert.equal(timeline[0].words[0].from, 18);
  assert.equal(timeline[0].from + at(timeline[0], 'không có nghĩa'), Math.round((3 + 0.6) * 30));
  assert.equal(timeline[4].from + at(timeline[4], 'tìm hiểu'), Math.round((29.84 + 0.6) * 30));
});

test('changing playback rate or intro keeps narration and scene positions together', () => {
  const props = fresh();
  const baseline = buildTimeline(props, 30);
  props.audio.playbackRate = 1.1;
  const faster = buildTimeline(props, 30);
  assert(totalFrames(props, 30) < 1200);
  assert(faster[4].from < baseline[4].from);
  assert.equal(faster[0].words[10].from, Math.round((2.36 / 1.1 + 0.6) * 30));
  props.audio.playbackRate = 1;
  props.timing.voiceoverStartSeconds = 1.6;
  const delayed = buildTimeline(props, 30);
  assert.equal(delayed[0].words[0].from - baseline[0].words[0].from, 30);
  assert.equal(delayed[4].from - baseline[4].from, 30);
});

test('changed recordings and malformed timing are rejected', () => {
  const props = fresh();
  props.timing.audioDurationSeconds = 45;
  assert.throws(() => buildTimeline(props, 30), /Bản thu đã thay đổi/);
  props.timing.audioDurationSeconds = 38.381125;
  props.audio.playbackRate = 0;
  assert.throws(() => buildTimeline(props, 30), /playbackRate/);
  props.audio.playbackRate = 1;
  props.timing.recording.scenes[0].words[0].end = -1;
  assert.throws(() => buildTimeline(props, 30), /Timestamp/);
});
