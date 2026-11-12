import { vndFromUsdBillions } from '../src/finance';
import script from '../src/data/script.json';
import audioManifest from '../public/audio/production-manifest.json';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { defaultProps, VIDEO, SCENE_IDS } from '../src/config';
import { buildTimeline, buildCaptionCues, totalFrames, at } from '../src/timing';

test('complete recording is preserved byte for byte', () => {
  const original = readFileSync(new URL('../1211-4.mp3', import.meta.url));
  assert.deepEqual(original, readFileSync(new URL('../public/audio/voiceover.mp3', import.meta.url)));
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
  assert.ok(Math.abs(scenes[2].from + at(scenes[2], 'Nhưng cần') - (source / .9 + 1) * 30) <= 1);
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
  const phrases = [
    ['Ngân hàng Nhà nước'], ['với tỷ giá','Hoạt động','dành cho'],
    ['Còn lần này','182'], ['Lượng tiền này','Nếu dòng tiền','khi NHNN'],
    ['Đầu tiên','Thứ hai','Thứ ba','Cuối cùng'],
    ['Hãy theo dõi','Đây có thể','Bạn nghĩ'],
  ];
  const scenes = buildTimeline(defaultProps, VIDEO.fps);
  for (let i = 0; i < phrases.length; i++) {
    for (const phrase of phrases[i]) {
      assert.ok(at(scenes[i], phrase, -1) >= 0, `Missing phrase: ${phrase}`);
    }
  }
});

test('hypothetical USD purchase converts to VND without implying actual purchases', () => {
  assert.deepEqual(vndFromUsdBillions(1,25_500), { vnd:25_500_000_000_000, vndBillions:25_500 });
  assert.equal(vndFromUsdBillions(.5,25_500).vndBillions,12_750);
  assert.throws(() => vndFromUsdBillions(-1,25_500));
});
test('complete approved script and one TTS voice are retained', () => {
  assert.deepEqual(defaultProps.timing.recording.scenes.map(s => s.text),script.map(s => s.text));
  assert.equal(audioManifest.voiceAlias,'female_north');
  assert.ok(audioManifest.alignment.every(scene => scene.matchRatio > .7));
});
test('photo license and every rendered audio stem are bundled', () => {
  for (const src of [defaultProps.photo.src,defaultProps.audio.music,defaultProps.audio.sting]) {
    assert.ok(readFileSync(new URL(`../public/${src}`, import.meta.url)).length > 0);
  }
  assert.equal(defaultProps.photo.license,'CC BY 2.0');
  assert.ok(defaultProps.photo.credit.includes('Olivera'));
});
