import script from '../src/data/script.json';
import audioManifest from '../public/audio/production-manifest.json';
import mix from '../public/audio/mix-calibration.json';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { defaultProps, VIDEO, SCENE_IDS } from '../src/config';
import { buildTimeline, buildCaptionCues, totalFrames, at } from '../src/timing';

test('complete recording is preserved byte for byte', () => {
  const original = readFileSync(new URL('../1911.mp3', import.meta.url));
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
  assert.ok(Math.abs(scenes[2].from + at(scenes[2], 'Nhưng nếu') - (source / .9 + 1) * 30) <= 1);
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
  const phrases = [['Một thương vụ', 'Nhưng liệu'], ['Đáng chú ý', 'Một con số'], ['Khoảng cách'], ['Tuy nhiên', 'Vì vậy'], ['Nếu toàn bộ'], ['Đây là'], ['Anthropic chưa vượt', 'Bạn nghĩ']];
  const scenes = buildTimeline(defaultProps, VIDEO.fps);
  for (let i = 0; i < phrases.length; i++) {
    for (const phrase of phrases[i]) {
      assert.ok(at(scenes[i], phrase, -1) >= 0, `Missing phrase: ${phrase}`);
    }
  }
});

test('complete approved script and one TTS voice are retained', () => {
  assert.deepEqual(defaultProps.timing.recording.scenes.map(s => s.text),script.map(s => s.text));
  assert.equal(audioManifest.voiceAlias,'female_north');
  assert.ok(audioManifest.alignment.every(scene => scene.matchRatio > .7));
  assert.equal(audioManifest.engine,'VieNeu-TTS v3 Turbo');
  assert.equal(audioManifest.preset,'Ngọc Huyền');
  assert.equal(audioManifest.presetGender,'female');
  assert.ok(audioManifest.presetDescription.includes('Bắc'));
});
test('all original graphic sources and audio stems are bundled', () => {
  for (const src of [defaultProps.audio.music,defaultProps.audio.sting,defaultProps.audio.rise]) {
    assert.ok(readFileSync(new URL(`../public/${src}`, import.meta.url)).length > 0);
  }
  for (const asset of defaultProps.assets) {
    assert.ok(readFileSync(new URL(`../${asset.source}`, import.meta.url)).length > 0);
    assert.ok(asset.license.includes('Original'));
  }
});

test('duration follows the complete recording rather than a fixed runtime', () => {
  assert.equal(totalFrames(defaultProps,VIDEO.fps),Math.ceil((defaultProps.timing.audioDurationSeconds + .3 + 1.3) * 30 - 1e-4));
  const scenes=buildTimeline(defaultProps,VIDEO.fps);
  assert.ok(scenes.at(-1)!.from+scenes.at(-1)!.speechTo<totalFrames(defaultProps,VIDEO.fps));
});

test('original background music is calibrated below speech', () => {
  const ratio = mix.rawMusicMonoRms * defaultProps.audio.musicVolume * defaultProps.audio.musicDuck / (mix.activeVoiceRms * defaultProps.audio.volume);
  assert.ok(20 * Math.log10(ratio) <= -21.5);
  assert.equal(mix.targetMusicBelowVoiceDb,-22);
  assert.equal(createHash('sha256').update(readFileSync(new URL('../public/audio/finance-news.wav',import.meta.url))).digest('hex'),mix.musicSha256);
  assert.ok(mix.musicOrigin.includes('no third-party'));
});


test('comparisons keep valuation, base IPO, conditional expansion and private funds distinct', () => {
  const d=defaultProps.data;
  assert.ok(Math.abs((d.spacexTotalBillion-d.baseIpoBillion)-4.91)<1e-9);
  assert.equal(d.spacexValuationBillion-d.anthropicValuationBillion,270);
  assert.ok(Math.abs(d.baseIpoBillion+d.extraSharesMillion*d.price/1000-d.expandedIpoBillion)<.005);
  assert.ok(defaultProps.copy.scenes[4].some(s=>s.label.includes('CHỈ KHI')));
  assert.ok(defaultProps.copy.scenes[5].some(s=>s.label.includes('KHÔNG CỘNG CHUNG')));
  assert.ok(defaultProps.copy.scenarios.at(-1)!.includes('KHÔNG PHẢI GIÁ THỰC TẾ'));
});


test('requested TTS names are applied consistently without changing displayed company names', () => {
  const spokenNames = { Anthropic: 'An thro pic', SpaceX: 'Space X' };
  for (const scene of script) {
    for (const [name, pronunciation] of Object.entries(spokenNames)) {
      assert.equal(scene.speech.split(pronunciation).length - 1, scene.text.split(name).length - 1);
    }
    assert.ok(!scene.speech.includes('An thờ rô píc'));
    assert.ok(!scene.speech.includes('X pây ích'));
  }
  assert.deepEqual(audioManifest.pronunciations,spokenNames);
});
