import recording from './data/voiceover.json';
import editorial from './data/editorial.json';
import mix from '../public/audio/2611/mix-calibration.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = editorial.map(scene => scene.id);
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'flow' | 'bars' | 'line' | 'cards' | 'timeline' | 'comparison' | 'chip' | 'globe' | 'factory' | 'donut' | 'gold' | 'quotes';
export type Shot = {
  anchor: string;
  title: string;
  value: string;
  label: string;
  detail: string;
  graphic: GraphicKind;
  tone?: 'danger' | 'teal' | 'accent';
  focus?: string;
  headers?: string[];
  nodes: string[];
  values: number[];
  metrics: string[];
  note: string;
};

export const defaultProps = {
  brand: 'TÀI CHÍNH • THỊ TRƯỜNG',
  issue: '26 / 11',
  showCaptions: true,
  theme: {
    background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E',
    muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B',
    border: '#E6D9F1', danger: '#CE4567',
  },
  audio: {
    voiceover: recording.audioSrc, playbackRate: 1, volume: .82,
    music: 'audio/2611/finance-news.wav', musicVolume: mix.musicVolume,
    musicDuck: mix.duckFactor, sting: 'audio/2611/news-sting.wav',
    stingVolume: .22, source: '2611.mp3',
  },
  timing: {
    voiceoverStartSeconds: .2, endingHoldSeconds: .8,
    audioDurationSeconds: recording.durationSeconds, recording,
  },
  production: { shotSeconds: 3 },
  assets: [{
    id: 'news-graphics', source: 'src/components/NewsGraphics.tsx',
    license: 'Original SVG/React gold and financial news illustrations',
  }],
  copy: {
    sections: editorial.map(scene => scene.section),
    footer: 'VÀNG NHẪN / GIÁ BÁN / CHÊNH LỆCH',
    keywords: ['PNJ', 'SJC', 'DOJI', 'vàng', 'nhẫn', 'triệu', '2', '2,5', '131,5', '133,5'],
    ticker: 'VÀNG NHẪN  •  PNJ  •  SJC  •  DOJI  •  MI HỒNG  •  CHÊNH LỆCH GIÁ  •  ',
    scenes: editorial.map(scene => scene.shots) as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
