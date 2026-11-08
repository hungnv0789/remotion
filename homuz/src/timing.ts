import { SCENE_IDS, type SceneId, type VideoProps } from './config';

export type WordTiming = { text: string; from: number; to: number };
export type SceneTiming = {
  id: SceneId;
  from: number;
  durationInFrames: number;
  words: WordTiming[];
  speechTo: number;
};
export type SceneProps = VideoProps & { scene: SceneTiming };
export type CaptionCue = { start: number; end: number; words: WordTiming[] };
const normalize = (text: string) => text.trim().replace(/\s+/g, ' ');

export const totalFrames = (props: VideoProps, fps: number) =>
  Math.ceil(
    (props.timing.voiceoverStartSeconds +
      props.timing.audioDurationSeconds / props.audio.playbackRate +
      props.timing.endingHoldSeconds) *
      fps,
  );

export const buildTimeline = (props: VideoProps, fps: number): SceneTiming[] => {
  const { timing, audio } = props;
  const recording = timing.recording;
  if (
    !Number.isFinite(fps) ||
    fps <= 0 ||
    !Number.isFinite(audio.playbackRate) ||
    audio.playbackRate <= 0
  )
    throw new Error('fps và playbackRate phải là số dương hữu hạn.');
  if (
    ![timing.voiceoverStartSeconds, timing.endingHoldSeconds].every(
      (value) => Number.isFinite(value) && value >= 0,
    )
  )
    throw new Error('Khoảng đầu/cuối video không được âm.');
  if (!Number.isFinite(timing.audioDurationSeconds) || timing.audioDurationSeconds <= 0)
    throw new Error('Thời lượng audio không hợp lệ.');
  if (
    audio.voiceover !== recording.audioSrc ||
    Math.abs(recording.durationSeconds - timing.audioDurationSeconds) > 0.2
  )
    throw new Error('Bản thu đã thay đổi. Cần cập nhật dữ liệu căn lời.');
  if (recording.scenes.length !== SCENE_IDS.length)
    throw new Error('Dữ liệu căn lời cần đủ 7 cảnh.');
  const toFrame = (seconds: number) =>
    Math.round((seconds / audio.playbackRate + timing.voiceoverStartSeconds) * fps);
  const boundaries = recording.scenes.map((scene, index) => {
    if (scene.id !== SCENE_IDS[index] || !scene.words.length)
      throw new Error('Thứ tự cảnh hoặc timestamp lời đọc không hợp lệ.');
    if (normalize(scene.words.map((word) => word.text).join(' ')) !== normalize(scene.text))
      throw new Error(`Lời dẫn ${scene.id} không khớp timestamp.`);
    if (index === 0) return 0;
    const previous = recording.scenes[index - 1].words;
    return toFrame((previous[previous.length - 1].end + scene.words[0].start) / 2);
  });
  return recording.scenes.map((scene, index) => {
    const from = boundaries[index];
    const end = boundaries[index + 1] ?? totalFrames(props, fps);
    const durationInFrames = end - from;
    if (durationInFrames < 30) throw new Error(`Cảnh ${scene.id} quá ngắn.`);
    let priorEnd = 0;
    const words = scene.words.map((word) => {
      if (
        !Number.isFinite(word.start) ||
        !Number.isFinite(word.end) ||
        word.end <= word.start ||
        word.start < 0 ||
        word.end > recording.durationSeconds
      )
        throw new Error(`Timestamp không hợp lệ: ${word.text}`);
      const start = Math.max(priorEnd, toFrame(word.start) - from);
      const to = Math.max(start + 1, toFrame(word.end) - from);
      if (to > durationInFrames) throw new Error(`Timestamp vượt cảnh ${scene.id}.`);
      priorEnd = to;
      return { text: word.text, from: start, to };
    });
    return {
      id: SCENE_IDS[index],
      from,
      durationInFrames,
      words,
      speechTo: words[words.length - 1].to,
    };
  });
};

export const at = (scene: SceneTiming, phrase: string, fallback = 0) => {
  const full = scene.words.map((word) => word.text).join(' ');
  const character = full.toLocaleLowerCase('vi').indexOf(phrase.toLocaleLowerCase('vi'));
  if (character < 0) return fallback;
  const index = full.slice(0, character).trim().split(/\s+/).filter(Boolean).length;
  return scene.words[index]?.from ?? fallback;
};

export const buildCaptionCues = (timeline: SceneTiming[]): CaptionCue[] =>
  timeline.flatMap((scene) => {
    const groups: WordTiming[][] = [];
    let group: WordTiming[] = [];
    for (const word of scene.words) {
      if (group.length && [...group, word].map((item) => item.text).join(' ').length > 66) {
        groups.push(group);
        group = [];
      }
      group.push({ ...word, from: scene.from + word.from, to: scene.from + word.to });
      if (/[.!?]["”']*$/.test(word.text) && group.map((item) => item.text).join(' ').length >= 30) {
        groups.push(group);
        group = [];
      }
    }
    if (group.length) groups.push(group);
    return groups.map((words, index) => ({
      start: words[0].from,
      end:
        groups[index + 1]?.[0].from ??
        Math.min(scene.from + scene.durationInFrames, words[words.length - 1].to + 6),
      words,
    }));
  });
