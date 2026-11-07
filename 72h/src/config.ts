import voiceover from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'context', 'supplies', 'message', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type Recording = {
  audioSrc: string;
  durationSeconds: number;
  sourceSha256: string;
  scenes: { id: string; text: string; words: { text: string; start: number; end: number }[] }[];
};
export type VideoProps = {
  brand: { name: string; monogram: string; category: string; series: string };
  showCaptions: boolean;
  theme: {
    background: string;
    panel: string;
    text: string;
    muted: string;
    accent: string;
    blue: string;
    caution: string;
    border: string;
  };
  audio: {
    voiceover: string;
    playbackRate: number;
    voiceoverVolume: number;
    music: string;
    musicVolume: number;
  };
  timing: {
    voiceoverStartSeconds: number;
    endingHoldSeconds: number;
    audioDurationSeconds: number;
    recording: Recording;
  };
  images: {
    box: string;
    relief: string;
    family: string;
    food: string;
    water: string;
    medical: string;
    bag: string;
    home: string;
  };
  copy: {
    labels: string[];
    illustration: string;
    hook: { number: string; unit: string; title: string; eyebrow: string; fact: string };
    context: { title: string; regions: string[]; detail: string };
    supplies: {
      title: string;
      items: { title: string; detail: string; image: string; position: string }[];
      footer: string;
    };
    message: { title: string; first: string; second: string; positive: string };
    closing: {
      title: string;
      steps: string[];
      line1: string;
      line2: string;
      share: string;
      follow: string;
    };
    keywords: string[];
  };
};

export const defaultProps: VideoProps = {
  brand: {
    name: 'TIN ĐỜI SỐNG',
    monogram: '72H',
    category: 'THÔNG TIN ĐỜI SỐNG',
    series: 'CHỦ ĐỘNG ỨNG PHÓ / 01',
  },
  showCaptions: true,
  theme: {
    background: '#071526',
    panel: '#102842',
    text: '#F6F8FC',
    muted: '#B5C6DA',
    accent: '#FFD45A',
    blue: '#498CF5',
    caution: '#FA8B7B',
    border: '#FFFFFF24',
  },
  audio: {
    voiceover: voiceover.audioSrc,
    playbackRate: 1,
    voiceoverVolume: 0.95,
    music: 'audio/news-bed.wav',
    musicVolume: 0.12,
  },
  timing: {
    voiceoverStartSeconds: 0.6,
    endingHoldSeconds: 1,
    audioDurationSeconds: voiceover.durationSeconds,
    recording: voiceover,
  },
  images: {
    box: 'images/supplies-box.jpg',
    relief: 'images/relief-box.jpg',
    family: 'images/family-kit.jpg',
    food: 'images/reserve-food.jpg',
    water: 'images/water-food.jpg',
    medical: 'images/first-aid.jpg',
    bag: 'images/emergency-bag.jpg',
    home: 'images/home-preparation.jpg',
  },
  copy: {
    labels: [
      'ĐIỀU CẦN BIẾT',
      'VÌ SAO NÊN CHUẨN BỊ?',
      'NHỮNG THỨ CẦN CÓ',
      'HIỂU ĐÚNG KHUYẾN NGHỊ',
      'CHỦ ĐỘNG, BÌNH TĨNH',
    ],
    illustration: 'ẢNH MINH HỌA',
    hook: {
      number: '72',
      unit: 'GIỜ',
      title: 'DỰ TRỮ\nNHU YẾU PHẨM',
      eyebrow: 'ĐIỀU MỖI GIA ĐÌNH NÊN BIẾT',
      fact: 'Không có nghĩa thảm họa sắp xảy ra.',
    },
    context: {
      title: 'Chuẩn bị sẵn.\nChủ động hơn.',
      regions: ['LIÊN MINH CHÂU ÂU', 'CANADA'],
      detail: 'Khuyến nghị chuẩn bị nhu yếu phẩm cho tình huống khẩn cấp.',
    },
    supplies: {
      title: 'Vừa đủ cho\nnhu cầu thiết yếu.',
      items: [
        {
          title: 'THỰC PHẨM',
          detail: 'Dễ bảo quản, phù hợp gia đình.',
          image: 'images/reserve-food.jpg',
          position: '50% 48%',
        },
        {
          title: 'NƯỚC UỐNG',
          detail: 'Chuẩn bị nước uống dự trữ.',
          image: 'images/water-food.jpg',
          position: '50% 50%',
        },
        {
          title: 'THUỐC MEN · SƠ CỨU',
          detail: 'Thuốc thiết yếu và bộ sơ cứu.',
          image: 'images/first-aid.jpg',
          position: '50% 48%',
        },
        {
          title: 'ĐÈN PIN · PIN DỰ PHÒNG',
          detail: 'Vật dụng thiết yếu khi có sự cố.',
          image: 'images/emergency-bag.jpg',
          position: '50% 55%',
        },
      ],
      footer: 'CHUẨN BỊ THEO NHU CẦU GIA ĐÌNH',
    },
    message: {
      title: 'CHUẨN BỊ\nKHÔNG PHẢI\nLÀ HOẢNG SỢ',
      first: 'Biện pháp phòng ngừa lâu dài.',
      second: 'Không phải dấu hiệu một thảm họa cụ thể sắp xảy ra.',
      positive: 'CHỦ ĐỘNG ĐỂ BẢO VỆ GIA ĐÌNH',
    },
    closing: {
      title: '3 điều cần lưu ý',
      steps: ['Chuẩn bị vừa đủ', 'Tìm hiểu phương án ứng phó', 'Giữ bình tĩnh'],
      line1: 'CHỦ ĐỘNG HÔM NAY',
      line2: 'AN TOÀN HƠN\nNGÀY MAI',
      share: 'CHIA SẺ ĐỂ MỌI GIA ĐÌNH CÙNG CHỦ ĐỘNG',
      follow: 'THEO DÕI KÊNH ĐỂ CẬP NHẬT TIN TỨC!',
    },
    keywords: [
      '72',
      'giờ',
      'không',
      'nhu',
      'yếu',
      'phẩm',
      'chủ',
      'động',
      'bình',
      'tĩnh',
      'phòng',
      'ngừa',
    ],
  },
};
