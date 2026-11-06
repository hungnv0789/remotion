import { SCENE_IDS, type SceneId, type VideoProps } from './config';

export type WordTiming = { text: string; from: number; to: number };
export type SegmentTiming = {
  id: string;
  from: number;
  speechTo: number;
  to: number;
  words: WordTiming[];
};
export type SceneTiming = {
  id: SceneId;
  from: number;
  durationInFrames: number;
  segments: SegmentTiming[];
};
export type SceneProps = VideoProps & { scene: SceneTiming };

const positive = (value: number, name: string, zero = false) => {
  if (!Number.isFinite(value) || (zero ? value < 0 : value <= 0))
    throw new Error(`${name} phải là số ${zero ? 'không âm' : 'dương'} hữu hạn.`);
};

// Các số trong lời cần nhiều tiếng đọc hơn một token văn bản.
const NUMERIC_SYLLABLES: Record<string, number> = {
  '39.000': 4,
  '6.000': 2,
  '7.000': 2,
  '3.400': 4,
  '800': 2,
  '10%': 3,
  '2026': 7,
};

export const buildTimeline = (props: VideoProps, fps: number): SceneTiming[] => {
  positive(fps, 'fps');
  const { timing, script } = props;
  positive(timing.syllablesPerSecond, 'syllablesPerSecond');
  for (const key of [
    'commaPauseSeconds',
    'sentencePauseSeconds',
    'leadInSeconds',
    'tailSeconds',
  ] as const)
    positive(timing[key], key, true);
  if (
    script.length !== SCENE_IDS.length ||
    script.some((scene, index) => scene.id !== SCENE_IDS[index])
  )
    throw new Error('script cần đủ 6 cảnh đúng thứ tự.');
  if (
    timing.sceneDurationsSeconds.length !== 0 &&
    timing.sceneDurationsSeconds.length !== script.length
  )
    throw new Error('sceneDurationsSeconds cần để trống hoặc chứa đủ 6 thời lượng.');
  let offset = 0;
  return script.map((scene, sceneIndex) => {
    if (
      !scene.segments.length ||
      new Set(scene.segments.map((s) => s.id)).size !== scene.segments.length
    )
      throw new Error(`Cảnh ${scene.id} cần các segment có id duy nhất.`);
    let cursor = Math.round(timing.leadInSeconds * fps);
    const segments = scene.segments.map((segment) => {
      positive(segment.pauseAfterSeconds ?? 0, 'pauseAfterSeconds', true);
      const tokens = segment.text.trim().split(/\s+/).filter(Boolean);
      if (!tokens.length) throw new Error(`Lời dẫn ${scene.id}/${segment.id} không được trống.`);
      const start = cursor;
      const words = tokens.map((text) => {
        const numeric = text.replace(/[,;:!?。]+$/, '').replace(/\.$/, '');
        const syllables = NUMERIC_SYLLABLES[numeric] ?? 1;
        const pause = /[.!?…]["”')]*$/.test(text)
          ? timing.sentencePauseSeconds
          : /[,;:]["”')]*$/.test(text)
            ? timing.commaPauseSeconds
            : 0;
        const from = cursor;
        cursor += Math.max(1, Math.round((syllables / timing.syllablesPerSecond + pause) * fps));
        return { text, from, to: cursor };
      });
      const speechTo = cursor;
      cursor += Math.round((segment.pauseAfterSeconds ?? 0) * fps);
      return { id: segment.id, from: start, speechTo, to: cursor, words };
    });
    const estimated = cursor + Math.round(timing.tailSeconds * fps);
    const manual = timing.sceneDurationsSeconds[sceneIndex];
    if (manual !== undefined) positive(manual, `Thời lượng ${scene.id}`);
    const durationInFrames = manual === undefined ? estimated : Math.ceil(manual * fps);
    if (durationInFrames < 30) throw new Error(`Cảnh ${scene.id} cần ít nhất 30 frame.`);
    const ratio = durationInFrames / estimated;
    const scale = (frame: number) => Math.round(frame * ratio);
    const scaled = segments.map((segment) => ({
      ...segment,
      from: scale(segment.from),
      speechTo: scale(segment.speechTo),
      to: scale(segment.to),
      words: segment.words.map((word) => ({
        text: word.text,
        from: scale(word.from),
        to: scale(word.to),
      })),
    }));
    if (scaled.some((segment) => segment.words.some((word) => word.to <= word.from)))
      throw new Error(`Cảnh ${scene.id} quá ngắn cho lời dẫn.`);
    const result = { id: scene.id, from: offset, durationInFrames, segments: scaled };
    offset += durationInFrames;
    return result;
  });
};

export const getDurationInFrames = (timeline: SceneTiming[]) =>
  timeline.reduce((sum, scene) => sum + scene.durationInFrames, 0);
export const at = (scene: SceneTiming, id: string) => {
  const segment = scene.segments.find((item) => item.id === id);
  if (!segment) throw new Error(`Không tìm thấy marker ${scene.id}/${id}.`);
  return segment.from;
};
export const segmentOf = (scene: SceneTiming, id: string) => {
  const segment = scene.segments.find((item) => item.id === id);
  if (!segment) throw new Error(`Không tìm thấy segment ${scene.id}/${id}.`);
  return segment;
};

export type CaptionCue = { start: number; end: number; text: string };
export const buildCaptionCues = (timeline: SceneTiming[]): CaptionCue[] =>
  timeline.flatMap((scene) =>
    scene.segments.flatMap((segment) => {
      const groups: WordTiming[][] = [];
      let group: WordTiming[] = [];
      for (const word of segment.words) {
        if (group.length && [...group, word].map((w) => w.text).join(' ').length > 84) {
          groups.push(group);
          group = [];
        }
        group.push(word);
        if (/[.!?…]["”')]*$/.test(word.text) && group.map((w) => w.text).join(' ').length >= 35) {
          groups.push(group);
          group = [];
        }
      }
      if (group.length) groups.push(group);
      return groups.map((chunk, index) => ({
        start: scene.from + chunk[0].from,
        end: scene.from + (groups[index + 1]?.[0].from ?? segment.to),
        text: chunk.map((w) => w.text).join(' '),
      }));
    }),
  );
