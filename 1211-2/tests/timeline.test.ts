import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { defaultProps, VIDEO, SCENE_IDS } from '../src/config';
import { buildTimeline, buildCaptionCues, totalFrames, at } from '../src/timing';

test('complete recording is preserved byte for byte', () => {
  const original = readFileSync(new URL('../1211-2.mp3', import.meta.url));
  assert.deepEqual(original, readFileSync(new URL('../public/audio/1211-2.mp3', import.meta.url)));
  assert.equal(createHash('sha256').update(original).digest('hex'), defaultProps.timing.recording.sourceSha256);
});
test('scenes cover the full audio and ending hold without gaps', () => {
  const scenes = buildTimeline(defaultProps, VIDEO.fps);
  assert.deepEqual(scenes.map((s) => s.id), SCENE_IDS);
  let end = 0;
  for (const scene of scenes) {
    assert.equal(scene.from, end);
    let last = 0;
    for (const word of scene.words) {
      assert.ok(word.from >= last && word.to > word.from && word.to <= scene.durationInFrames);
      last = word.to;
    }
    end += scene.durationInFrames;
  }
  assert.equal(end, totalFrames(defaultProps, VIDEO.fps));
  assert.ok(end >= Math.ceil(defaultProps.timing.audioDurationSeconds * VIDEO.fps));
});
test('captions contain every spoken word once and never overlap', () => {
  const cues = buildCaptionCues(buildTimeline(defaultProps, VIDEO.fps));
  assert.equal(cues.flatMap((c) => c.words.map((w) => w.text)).join(' '), defaultProps.timing.recording.scenes.map((s) => s.text).join(' '));
  for (let i = 0; i < cues.length; i++) {
    assert.ok(cues[i].end > cues[i].start);
    if (i) assert.ok(cues[i].start >= cues[i - 1].end);
  }
});
test('timing follows playback speed, intro and spoken anchors', () => {
  const props = structuredClone(defaultProps);
  props.audio.playbackRate = .9;
  props.timing.voiceoverStartSeconds = 1;
  const scenes = buildTimeline(props, 30);
  const source = props.timing.recording.scenes[2].words[0].start;
  assert.ok(Math.abs(scenes[2].from + at(scenes[2], 'Những nhà tư bản') - (source / .9 + 1) * 30) <= 1);
});
test('invalid timing or a different voiceover requires realignment', () => {
  const props = structuredClone(defaultProps);
  props.audio.playbackRate = 0;
  assert.throws(() => buildTimeline(props, 30));
  props.audio.playbackRate = 1;
  props.audio.voiceover = 'different.mp3';
  assert.throws(() => buildTimeline(props, 30));
});
test('visual phase markers match phrases in the recording', () => {
  const phrases = [['Có 5 triệu', 'họ đã nhìn'], ['Vấn đề không'], ['Cứ mắc', 'Đến lúc', 'Thiếu thì'], ['Nhưng chiếc xe', '150–200', 'Có thêm xe'], ['có khi', 'Người biết ưu tiên'], ['5 năm'], ['Vì vậy']];
  const scenes = buildTimeline(defaultProps, VIDEO.fps);
  for (let i = 0; i < phrases.length; i++) {
    for (const phrase of phrases[i]) {
      assert.ok(at(scenes[i], phrase, -1) >= 0, `Missing phrase: ${phrase}`);
    }
  }
});

