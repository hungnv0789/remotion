import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultProps, VIDEO } from '../src/config';
import { at, buildCaptionCues, buildTimeline, getDurationInFrames, segmentOf } from '../src/timing';

const fresh = () => structuredClone(defaultProps);

test('six scenes form a continuous frame timeline and cover every word', () => {
  const timeline = buildTimeline(defaultProps, VIDEO.fps);
  const captions = buildCaptionCues(timeline);
  assert.equal(timeline.length, 6);
  assert.equal(timeline[0].from, 0);
  for (const [index, scene] of timeline.entries()) {
    if (index)
      assert.equal(scene.from, timeline[index - 1].from + timeline[index - 1].durationInFrames);
    for (const segment of scene.segments)
      for (const word of segment.words) {
        assert(Number.isInteger(word.from) && Number.isInteger(word.to));
        assert(word.from >= 0 && word.to > word.from && word.to <= scene.durationInFrames);
      }
  }
  const script = defaultProps.script
    .flatMap((scene) => scene.segments.map((segment) => segment.text))
    .join(' ');
  assert.equal(captions.map((caption) => caption.text).join(' '), script);
  for (const [index, caption] of captions.entries()) {
    assert(caption.end > caption.start);
    if (index) assert(caption.start >= captions[index - 1].end);
    assert(caption.end <= getDurationInFrames(timeline));
  }
});

test('the hook holds for exactly one second after the loss phrase', () => {
  const hook = buildTimeline(defaultProps, 30)[0];
  const loss = segmentOf(hook, 'loss');
  assert.equal(loss.to - loss.speechTo, 30);
  assert.equal(at(hook, 'year'), loss.to);
});

test('editing narration or reading speed recalculates all subsequent scenes', () => {
  const props = fresh();
  const before = buildTimeline(props, 30);
  props.script[0].segments[0].text += ' Đây là một phần lời dẫn được bổ sung.';
  const after = buildTimeline(props, 30);
  assert(after[0].durationInFrames > before[0].durationInFrames);
  assert.equal(
    after[1].from - before[1].from,
    after[0].durationInFrames - before[0].durationInFrames,
  );
  props.timing.syllablesPerSecond = 3;
  assert(getDurationInFrames(buildTimeline(props, 30)) > getDurationInFrames(after));
});

test('recorded scene lengths override estimates without frame gaps', () => {
  const props = fresh();
  props.timing.sceneDurationsSeconds = [16.1, 18.2, 25.3, 30.4, 25.5, 40.6];
  const timeline = buildTimeline(props, 30);
  assert.equal(
    getDurationInFrames(timeline),
    props.timing.sceneDurationsSeconds.reduce(
      (total, seconds) => total + Math.ceil(seconds * 30),
      0,
    ),
  );
  for (const scene of timeline) assert(scene.segments.at(-1)!.to <= scene.durationInFrames);
});

test('invalid timing and incomplete scripts fail clearly', () => {
  const props = fresh();
  props.timing.sceneDurationsSeconds = [5];
  assert.throws(() => buildTimeline(props, 30));
  props.timing.sceneDurationsSeconds = [];
  props.timing.syllablesPerSecond = 0;
  assert.throws(() => buildTimeline(props, 30));
  props.timing.syllablesPerSecond = 4.2;
  props.script[0].segments[0].text = '';
  assert.throws(() => buildTimeline(props, 30));
  props.script.pop();
  assert.throws(() => buildTimeline(props, 30));
});
