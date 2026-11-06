import { SCENE_IDS, type VideoProps } from './config';

export type AlignedRecording = {
  audioSrc: string;
  durationSeconds: number;
  sourceSha256: string;
  scenes: {
    id: string;
    text: string;
    words: { text: string; start: number; end: number }[];
  }[];
};
export type SpokenWord = { text: string; from: number; to: number };
export type SceneTiming = {
  id: string;
  from: number;
  durationInFrames: number;
  speechFrom: number;
  speechTo: number;
  words: SpokenWord[];
  markers: Record<string, number>;
};
export type SceneProps = VideoProps & { scene: SceneTiming };

const normalize = (text: string) => text.trim().replace(/\s+/g, ' ');
const positive = (value: number, name: string, allowZero = false) => {
  if (!Number.isFinite(value) || (allowZero ? value < 0 : value <= 0)) {
    throw new Error(`${name} phải là số ${allowZero ? 'không âm' : 'dương'} hữu hạn.`);
  }
};

const addMarkers = (scene: SceneTiming, markers: Record<string, string>) => {
  const text = scene.words.map((word) => word.text).join(' ');
  for (const [name, phrase] of Object.entries(markers)) {
    const target = normalize(phrase).toLocaleLowerCase('vi');
    const character = target ? text.toLocaleLowerCase('vi').indexOf(target) : -1;
    if (character < 0) continue;
    const wordIndex = text.slice(0, character).trim().split(/\s+/).filter(Boolean).length;
    scene.markers[name] = scene.words[wordIndex]?.from ?? scene.speechFrom;
  }
  return scene;
};

export const buildTimeline = (props: VideoProps, fps: number): SceneTiming[] => {
  const { timing, copy, audio } = props;
  positive(fps, 'fps');
  if (copy.narration.length !== SCENE_IDS.length) {
    throw new Error('copy.narration cần đúng 5 lời dẫn tương ứng 5 phân cảnh.');
  }
  const recording = timing.recording;
  const useRecording = recording !== null && audio.voiceover === recording.audioSrc;
  if (useRecording) {
    if (recording.scenes.length !== SCENE_IDS.length) {
      throw new Error('Dữ liệu căn lời cần đủ 5 phân cảnh.');
    }
    const durationSeconds = timing.audioDurationSeconds || recording.durationSeconds;
    positive(durationSeconds, 'audioDurationSeconds');
    if (Math.abs(durationSeconds - recording.durationSeconds) > 0.2) {
      throw new Error(
        'Bản thu đã đổi thời lượng. Cần cập nhật dữ liệu căn lời hoặc đặt timing.recording = null.',
      );
    }
    const totalFrames = Math.ceil(durationSeconds * fps);
    const boundaries = recording.scenes.map((scene, index) => {
      if (
        scene.id !== SCENE_IDS[index] ||
        normalize(scene.text) !== normalize(copy.narration[index])
      ) {
        throw new Error(
          `Lời dẫn cảnh ${SCENE_IDS[index]} đã thay đổi. Cần căn lại bản thu hoặc đặt timing.recording = null.`,
        );
      }
      if (!scene.words.length) throw new Error(`Cảnh ${scene.id} thiếu timestamp lời đọc.`);
      if (index === 0) return 0;
      const previous = recording.scenes[index - 1].words;
      return Math.round(((previous[previous.length - 1].end + scene.words[0].start) / 2) * fps);
    });
    return recording.scenes.map((scene, index) => {
      const from = boundaries[index];
      const end = boundaries[index + 1] ?? totalFrames;
      const durationInFrames = end - from;
      if (durationInFrames < 30) throw new Error(`Cảnh ${scene.id} cần ít nhất 30 frame.`);
      const words = scene.words.map((word) => {
        const start = Math.max(
          0,
          Math.min(durationInFrames - 1, Math.round(word.start * fps) - from),
        );
        const to = Math.max(
          start + 1,
          Math.min(durationInFrames, Math.round(word.end * fps) - from),
        );
        return { text: word.text, from: start, to };
      });
      return addMarkers(
        {
          id: scene.id,
          from,
          durationInFrames,
          speechFrom: words[0].from,
          speechTo: words[words.length - 1].to,
          words,
          markers: {},
        },
        timing.markers[index] ?? {},
      );
    });
  }

  // Fallback cho lời mới hoặc khi tắt dữ liệu căn bản thu: ước lượng theo tiếng/dấu câu.
  positive(timing.syllablesPerSecond, 'syllablesPerSecond');
  for (const key of [
    'commaPauseSeconds',
    'sentencePauseSeconds',
    'leadInSeconds',
    'tailSeconds',
  ] as const) {
    positive(timing[key], key, true);
  }
  let offset = 0;
  const estimated = SCENE_IDS.map((id, index) => {
    const text = normalize(copy.narration[index]);
    const tokens = text ? text.split(' ') : [];
    const weights = tokens.map(
      (token) =>
        1 / timing.syllablesPerSecond +
        (/[.!?…]["”')]*$/.test(token)
          ? timing.sentencePauseSeconds
          : /[,;:]["”')]*$/.test(token)
            ? timing.commaPauseSeconds
            : 0),
    );
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    const durationInFrames = Math.ceil(
      Math.max(3, timing.leadInSeconds + totalWeight + timing.tailSeconds) * fps,
    );
    const speechFrom = Math.round(timing.leadInSeconds * fps);
    const speechTo = durationInFrames - Math.round(timing.tailSeconds * fps);
    if (speechTo - speechFrom < Math.max(1, tokens.length))
      throw new Error(`Cảnh ${id} quá ngắn cho tốc độ đọc đã chọn.`);
    const remaining = speechTo - speechFrom - tokens.length;
    let consumed = 0;
    const words = tokens.map((token, tokenIndex) => {
      const from = speechFrom + tokenIndex + Math.round((remaining * consumed) / totalWeight);
      consumed += weights[tokenIndex];
      return {
        text: token,
        from,
        to: speechFrom + tokenIndex + 1 + Math.round((remaining * consumed) / totalWeight),
      };
    });
    const scene = { id, from: offset, durationInFrames, speechFrom, speechTo, words, markers: {} };
    offset += durationInFrames;
    return scene;
  });
  // Bản thu mới vẫn quyết định tổng thời lượng; nội cảnh chỉ ước lượng nếu chưa căn lời.
  if (audio.voiceover && timing.audioDurationSeconds > 0) {
    const total = Math.ceil(timing.audioDurationSeconds * fps);
    const ratio = total / offset;
    for (const [index, scene] of estimated.entries()) {
      const end =
        index === estimated.length - 1
          ? total
          : Math.round((scene.from + scene.durationInFrames) * ratio);
      scene.from = Math.round(scene.from * ratio);
      scene.durationInFrames = end - scene.from;
      if (scene.durationInFrames < 30) throw new Error(`Bản thu quá ngắn cho cảnh ${scene.id}.`);
      scene.speechFrom = Math.round(scene.speechFrom * ratio);
      scene.speechTo = Math.round(scene.speechTo * ratio);
      scene.words = scene.words.map((word) => ({
        text: word.text,
        from: Math.round(word.from * ratio),
        to: Math.round(word.to * ratio),
      }));
    }
  }
  return estimated.map((scene, index) => addMarkers(scene, timing.markers[index] ?? {}));
};

export const getDurationInFrames = (timeline: SceneTiming[]) =>
  timeline.reduce((sum, scene) => sum + scene.durationInFrames, 0);
export const cue = (scene: SceneTiming, key: string, fallback = 0) =>
  scene.markers[key] ??
  Math.round(scene.speechFrom + (scene.speechTo - scene.speechFrom) * fallback);
