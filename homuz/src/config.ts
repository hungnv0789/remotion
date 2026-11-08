import recording from './data/voiceover.json';
import assets from './data/assets.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = [
  'hook',
  'hormuz',
  'vietnam',
  'vulnerability',
  'pressure',
  'strategy',
  'closing',
] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type PhotoAsset = {
  id: string;
  src: string;
  credit: string;
  title: string;
  page: string;
  author: string;
  license: string;
  licenseUrl: string;
  date: string;
};
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
    teal: string;
    danger: string;
    border: string;
    mapLand: string;
  };
  audio: { voiceover: string; playbackRate: number; volume: number };
  timing: {
    voiceoverStartSeconds: number;
    endingHoldSeconds: number;
    audioDurationSeconds: number;
    recording: Recording;
  };
  assets: PhotoAsset[];
  images: {
    fuel: string;
    gulf: string;
    navy: string;
    navyWide: string;
    port: string;
    iran: string;
    diplomacy: string;
  };
  copy: {
    sections: string[];
    archive: string;
    scenario: string;
    commentary: string;
    map: {
      us: string;
      russia: string;
      ukraine: string;
      iran: string;
      vietnam: string;
      hormuz: string;
      gulf: string;
      note: string;
    };
    hook: {
      title: string;
      amount: string;
      volume: string;
      label: string;
      countries: string;
      connection: string;
      question: string;
    };
    hormuz: {
      title: string;
      share: string;
      shareLabel: string;
      reference: string;
      stages: string[];
      scenarioLabel: string;
      oilRange: string;
      oilUnit: string;
      takeaway: string;
    };
    vietnam: {
      title: string;
      scenarioLabel: string;
      from: string;
      to: string;
      unit: string;
      steps: { title: string; detail: string }[];
      takeaway: string;
    };
    vulnerability: {
      title: string;
      eyebrow: string;
      factors: { title: string; detail: string }[];
      note: string;
    };
    pressure: {
      title: string;
      domestic: string;
      foreign: string;
      cards: { title: string; detail: string }[];
    };
    strategy: {
      title: string;
      tag: string;
      benefits: { title: string; detail: string }[];
      note: string;
    };
    closing: {
      title: string;
      subjects: string[];
      question: string;
      action: string;
      endLine: string;
    };
    keywords: string[];
  };
};

const choose = (...ids: string[]) =>
  ids.find((id) => (assets as PhotoAsset[]).some((asset) => asset.id === id)) ?? 'hormuz';
export const defaultProps: VideoProps = {
  brand: {
    name: 'GÓC NHÌN THẾ GIỚI',
    monogram: 'GN',
    category: 'PHÂN TÍCH KỊCH BẢN',
    series: 'HORMUZ / NĂNG LƯỢNG & ĐỊA CHÍNH TRỊ',
  },
  showCaptions: true,
  theme: {
    background: '#081524',
    panel: '#102940',
    text: '#F6F7F9',
    muted: '#ABBCD0',
    accent: '#FFC778',
    teal: '#61D6CD',
    danger: '#FF9391',
    border: '#FFFFFF20',
    mapLand: '#1B3A51',
  },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: {
    voiceoverStartSeconds: 0.5,
    endingHoldSeconds: 1.5,
    audioDurationSeconds: recording.durationSeconds,
    recording,
  },
  assets: assets as PhotoAsset[],
  images: {
    fuel: choose('vietnam-fuel', 'vietnam-port'),
    gulf: 'hormuz',
    navy: 'navy',
    navyWide: 'navy-wide',
    port: choose('vietnam-port'),
    iran: choose('tehran-wide', 'tehran'),
    diplomacy: choose('diplomacy', 'tehran-wide', 'navy-wide'),
  },
  copy: {
    sections: [
      'XUNG ĐỘT XA, TÁC ĐỘNG GẦN',
      'ĐIỂM NGHẼN HORMUZ',
      'TÁC ĐỘNG ĐẾN VIỆT NAM',
      'THỜI ĐIỂM CỦA IRAN',
      'ÁP LỰC TRONG & NGOÀI',
      'GÓC NHÌN CHIẾN LƯỢC MỸ',
      'TRỞ LẠI VỚI VIỆT NAM',
    ],
    archive: 'ẢNH TƯ LIỆU',
    scenario: 'GIẢ ĐỊNH TRONG BẢN THU',
    commentary: 'NHẬN ĐỊNH TRONG BẢN THU',
    map: {
      us: 'MỸ',
      russia: 'NGA',
      ukraine: 'UKRAINE',
      iran: 'IRAN',
      vietnam: 'VIỆT NAM',
      hormuz: 'HORMUZ',
      gulf: 'VỊNH BA TƯ',
      note: 'SƠ ĐỒ MINH HỌA LIÊN HỆ • NATURAL EARTH',
    },
    hook: {
      title: 'Một xung đột xa.\nMột hóa đơn gần.',
      amount: '100K',
      volume: '1 LÍT?',
      label: 'VÍ DỤ GIẢ ĐỊNH MỞ ĐẦU',
      countries: 'MỸ — IRAN',
      connection: 'Rủi ro địa chính trị.\nTác động xuyên biên giới.',
      question: 'Vì sao người Việt\ncũng phải quan tâm?',
    },
    hormuz: {
      title: 'HORMUZ\nĐiểm nghẽn năng lượng.',
      share: '≈20%',
      shareLabel: 'TIÊU THỤ DẦU TOÀN CẦU\nĐI QUA HORMUZ',
      reference: 'SỐ THAM CHIẾU 2024 · EIA',
      stages: ['Gián đoạn hàng hải', 'Nguồn cung chịu áp lực', 'Giá dầu có thể biến động'],
      scenarioLabel: 'KỊCH BẢN GIÁ DẦU TRONG BẢN THU',
      oilRange: '120–130',
      oilUnit: 'USD / THÙNG',
      takeaway: 'Một eo biển.\nTác động ra toàn cầu.',
    },
    vietnam: {
      title: 'VIỆT NAM\nSóng lan tới ví tiền.',
      scenarioLabel: 'VÍ DỤ GIÁ XĂNG TRONG BẢN THU',
      from: '18.000',
      to: '>30.000',
      unit: 'ĐỒNG / LÍT',
      steps: [
        { title: 'Nhiên liệu', detail: 'Áp lực từ giá năng lượng.' },
        { title: 'Vận chuyển & hàng hóa', detail: 'Chi phí có thể truyền dẫn.' },
        { title: 'Sức mua', detail: 'Lạm phát làm tăng áp lực chi tiêu.' },
      ],
      takeaway: 'DẦU MỎ → CHI PHÍ → ĐỜI SỐNG',
    },
    vulnerability: {
      title: 'Vì sao bản thu\nnhấn mạnh “lúc này”?',
      eyebrow: 'IRAN DƯỚI NHIỀU SỨC ÉP',
      factors: [
        { title: 'Cấm vận', detail: 'Hạn chế thương mại và nguồn thu.' },
        { title: 'Đồng tiền', detail: 'Áp lực tỷ giá và sức mua.' },
        { title: 'Lạm phát', detail: 'Sức ép lên đời sống người dân.' },
      ],
      note: 'ĐÁNH GIÁ VỀ THỜI ĐIỂM TRONG BẢN THU',
    },
    pressure: {
      title: 'Áp lực trong nước.\nRàng buộc bên ngoài.',
      domestic: 'NỘI TẠI',
      foreign: 'ĐỐI NGOẠI',
      cards: [
        { title: 'Kinh tế & xã hội', detail: 'Chi phí sinh hoạt và tâm lý người dân.' },
        { title: 'Liên kết khu vực', detail: 'Nguồn lực và ưu tiên của các đối tác.' },
      ],
    },
    strategy: {
      title: 'Mỹ có thể tìm kiếm\nnhững lợi ích gì?',
      tag: 'GIẢ THUYẾT ĐỘNG CƠ TRONG BẢN THU',
      benefits: [
        { title: 'Ảnh hưởng khu vực', detail: 'Cán cân quyền lực tại Trung Đông.' },
        { title: 'Năng lượng', detail: 'Vai trò của dầu mỏ và chuỗi cung ứng.' },
        { title: 'Câu chuyện đối ngoại', detail: 'Cách diễn giải và vị thế quốc tế.' },
      ],
      note: 'BA GÓC NHÌN PHÂN TÍCH',
    },
    closing: {
      title: 'Trở lại\nvới Việt Nam.',
      subjects: ['Năng lượng', 'Vận tải', 'Giá cả'],
      question: 'Cú sốc ngắn hạn\nhay rủi ro kéo dài?',
      action: 'BÌNH LUẬN GÓC NHÌN CỦA BẠN ↓',
      endLine: 'HIỂU BỐI CẢNH · THEO DÕI DIỄN BIẾN',
    },
    keywords: [
      'Mỹ',
      'Iran',
      'Hormuz',
      'Việt',
      'Nam',
      'dầu',
      'xăng',
      'giá',
      'chiến',
      'tranh',
      'có',
      'thể',
      'lạm',
      'phát',
      'chiến',
      'lược',
    ],
  },
};
