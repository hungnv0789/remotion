import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { defaultProps, VIDEO } from '../src/config';
import { buildTimeline, cue, getDurationInFrames } from '../src/timing';
import { buildCaptionCues } from '../src/components/Captions';

const freshProps = () => structuredClone(defaultProps);

test('the bundled audio is an exact copy of src/1106.MP3', () => {
  const source = readFileSync('src/1106.MP3');
  assert.deepEqual(readFileSync('public/audio/1106.MP3'), source);
  assert.equal(
    createHash('sha256').update(source).digest('hex'),
    defaultProps.timing.recording?.sourceSha256,
  );
});

test('the recorded timeline covers the full audio without gaps or overlaps', () => {
  const timeline = buildTimeline(defaultProps, VIDEO.fps);
  assert.equal(getDurationInFrames(timeline), Math.ceil(87.092208 * 30));
  assert.equal(timeline[0].from, 0);
  for (const [index, scene] of timeline.entries()) {
    assert(scene.durationInFrames >= 30);
    if (index)
      assert.equal(scene.from, timeline[index - 1].from + timeline[index - 1].durationInFrames);
    for (const word of scene.words) {
      assert(Number.isInteger(word.from) && Number.isInteger(word.to));
      assert(word.from >= 0 && word.to > word.from && word.to <= scene.durationInFrames);
    }
    assert.equal(
      Object.keys(scene.markers).length,
      Object.keys(defaultProps.timing.markers[index]).length,
    );
  }
});

test('solution highlights follow the actual spoken numbers, not five-second intervals', () => {
  const scene = buildTimeline(defaultProps, VIDEO.fps)[3];
  assert.equal(scene.from + cue(scene, 'step1'), Math.round(60.18 * 30));
  assert.equal(scene.from + cue(scene, 'step2'), Math.round(66.18 * 30));
  assert.equal(scene.from + cue(scene, 'step3'), Math.round(70.6 * 30));
});

test('captions preserve the script and stay within the recorded composition', () => {
  const timeline = buildTimeline(defaultProps, VIDEO.fps);
  const captions = buildCaptionCues(timeline);
  assert.equal(
    captions.map((caption) => caption.text).join(' '),
    defaultProps.copy.narration.join(' '),
  );
  assert.equal(captions.at(-1)?.end, getDurationInFrames(timeline));
  for (const [index, caption] of captions.entries()) {
    assert(caption.start >= 0 && caption.end > caption.start);
    if (index) assert(caption.start >= captions[index - 1].end);
  }
});

test('stale timestamps are rejected when the audio length or script changes', () => {
  const props = freshProps();
  props.timing.audioDurationSeconds = 120;
  assert.throws(() => buildTimeline(props, 30), /Bản thu đã đổi/);
  props.timing.audioDurationSeconds = 87.092208;
  props.copy.narration[0] += ' Thêm lời mới.';
  assert.throws(() => buildTimeline(props, 30), /Lời dẫn cảnh hook đã thay đổi/);
});

test('estimated mode follows reading speed and can scale to a new recording', () => {
  const props = freshProps();
  props.timing.recording = null;
  props.audio.voiceover = '';
  const baseline = getDurationInFrames(buildTimeline(props, 30));
  props.timing.syllablesPerSecond = 3;
  assert(getDurationInFrames(buildTimeline(props, 30)) > baseline);
  props.audio.voiceover = 'audio/new-recording.mp3';
  props.timing.audioDurationSeconds = 100;
  assert.equal(getDurationInFrames(buildTimeline(props, 30)), 3000);
});

test('empty narration has no captions in estimated mode and invalid timing fails clearly', () => {
  const props = freshProps();
  props.timing.recording = null;
  props.audio.voiceover = '';
  props.copy.narration = Array(5).fill('');
  assert.deepEqual(buildCaptionCues(buildTimeline(props, 30)), []);
  props.timing.syllablesPerSecond = 0;
  assert.throws(() => buildTimeline(props, 30), /syllablesPerSecond/);
  assert.throws(() => buildTimeline(props, 0), /fps/);
});
