import recording from './data/voiceover.json';
import editorial from './data/editorial.json';
import mix from '../public/audio/2611-1/mix-calibration.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = editorial.map(scene => scene.id);
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'flow' | 'bars' | 'line' | 'cards' | 'timeline' | 'comparison' | 'chip' | 'globe' | 'factory' | 'donut' | 'gold' | 'quotes' | 'tariffs';
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
  brand: 'TÀI CHÍNH • THƯƠNG MẠI',
  issue: '26 / 11',
  showCaptions: true,
  theme: {
    background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E',
    muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B',
    border: '#E6D9F1', danger: '#CE4567',
  },
  audio: {
    voiceover: recording.audioSrc, playbackRate: 1, volume: .82,
    music: 'audio/2611-1/finance-news.wav', musicVolume: mix.musicVolume,
    musicDuck: mix.duckFactor, sting: 'audio/2611-1/news-sting.wav',
    stingVolume: .22, source: '2611-1.mp3',
  },
  timing: {
    voiceoverStartSeconds: .2, endingHoldSeconds: .8,
    audioDurationSeconds: recording.durationSeconds, recording,
  },
  production: { shotSeconds: 3 },
  assets: [{
    id: 'news-graphics', source: 'src/components/NewsGraphics.tsx',
    license: 'Original SVG/React trade-policy financial illustrations',
  }],
  copy: {
    sections: editorial.map(scene => scene.section),
    footer: 'ĐỀ XUẤT THUẾ / CHƯA CÓ HIỆU LỰC',
    keywords: ['Trump', 'USTR', 'thuế', 'đề', 'xuất', 'Việt', 'Nam', '35%', '20%', '15%', '18%', '25%'],
    ticker: 'THƯƠNG MẠI  •  ĐỀ XUẤT THUẾ  •  USTR  •  VIỆT NAM  •  ĐÀM PHÁN  •  ',
    scenes: editorial.map(scene => scene.shots) as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
