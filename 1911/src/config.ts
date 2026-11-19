import recording from './data/voiceover.json';
import mix from '../public/audio/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'demand', 'valuation', 'size', 'option', 'private', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'price' | 'versus' | 'demand' | 'valuation' | 'ipoInitial' | 'ipoTotal' | 'shares' | 'option' | 'private' | 'scenarios' | 'summary';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string };
export const defaultProps = {
  brand: 'TIÊU ĐIỂM • IPO', issue: '19 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567', gold: '#B88930' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .95, music: 'audio/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/news-sting.wav', stingVolume: .4, rise: 'audio/rising-whoosh.wav', riseVolume: .28, voiceAlias: 'female_north', engine: 'VieNeu-TTS v3 Turbo', preset: 'Ngọc Huyền' },
  timing: { voiceoverStartSeconds: .3, endingHoldSeconds: 1.3, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'ipo-graphics', source: 'src/components/IPOGraphics.tsx', license: 'Original SVG/React motion graphics and typographic company names' }],
  data: { price: 83, rangeLow: 70, rangeHigh: 78, demandBillion: 500, demandMultiple: 6, anthropicValuationBillion: 1500, spacexValuationBillion: 1770, baseIpoBillion: 81.34, spacexInitialBillion: 75, spacexTotalBillion: 86.25, extraSharesMillion: 147, expandedIpoBillion: 93.54, privateBillion: 26 },
  copy: {
    sections: ['ANTHROPIC • GIÁ IPO', 'CƠN SỐT ĐĂNG KÝ MUA', 'SO SÁNH ĐỊNH GIÁ', 'CUỘC ĐUA QUY MÔ IPO', 'QUYỀN CHÀO BÁN BỔ SUNG', 'VỐN HUY ĐỘNG RIÊNG', 'ANT • PHIÊN GIAO DỊCH ĐẦU'],
    footer: 'ANTHROPIC / SPACEX / IPO',
    keywords: ['Anthropic', 'SpaceX', 'IPO', '83', '93,54', '81,34', '26', 'ANT', 'AI'],
    ticker: 'ANTHROPIC  •  CLAUDE  •  ANT  •  IPO  •  SPACEX  •  ĐỊNH GIÁ  •  QUY MÔ HUY ĐỘNG  •  ',
    illustration: 'ĐỒ HỌA MINH HỌA',
    company: ['ANTHROPIC', 'SpaceX'], price: ['IPO PRICE', 'USD / CỔ PHIẾU', 'ĐỨNG SAU CLAUDE', '$70', '$78', '$83'],
    demand: ['NHU CẦU ĐĂNG KÝ', 'QUY MÔ IPO CƠ SỞ', '~$500B', '~$81.34B', '≈6 LẦN'],
    valuation: ['ĐỊNH GIÁ', 'ANTHROPIC', 'SPACEX', '$1.50T', '$1.77T', 'CHÊNH LỆCH $270B', 'ANTHROPIC: GỒM CỔ PHIẾU THƯỞNG & QUYỀN MUA'],
    ipo: ['QUY MÔ IPO • TỶ USD', 'Anthropic', 'SpaceX', '$81.34B', '$75B', '$86.25B', 'ĐỢT BÁN ĐẦU TIÊN', 'TỔNG SAU BÁN THÊM', 'CHÊNH LỆCH $4.91B'],
    option: ['QUYỀN CHÀO BÁN BỔ SUNG', '147 TRIỆU CỔ PHIẾU', 'NẾU BÁN HẾT PHẦN BỔ SUNG', '$93.54B', 'SPACEX TOTAL $86.25B'],
    private: ['PUBLIC IPO', 'PRIVATE PLACEMENT', '~$81.34B', '$26B', 'GOOGLE', 'NVIDIA', 'ĐỐI TÁC CÔNG NGHỆ', 'KHÔNG GỌI TỔNG HAI KHOẢN LÀ QUY MÔ IPO'],
    scenarios: ['NASDAQ', 'ANT', 'IPO PRICE $83', 'TĂNG MẠNH?', 'SELL THE NEWS?', 'HAI KỊCH BẢN MINH HỌA • KHÔNG PHẢI GIÁ THỰC TẾ'],
    summary: ['ĐỊNH GIÁ', 'QUY MÔ IPO', 'GIAO DỊCH ĐẦU', 'CHƯA VƯỢT SPACEX', 'CÒN PHƯƠNG ÁN BỔ SUNG', 'THỊ TRƯỜNG TRẢ LỜI'],
    scenes: [
      [
        { anchor: '', title: 'ANTHROPIC IPO.\nGIÁ CHỐT: 83 USD!', value: '$83', label: 'GIÁ IPO • MỖI CỔ PHIẾU', detail: 'Công ty đứng sau Claude bước vào tâm điểm.', graphic: 'price', focus: '83 đô la' },
        { anchor: 'Một thương vụ', title: 'Hơn 81 tỷ USD.\nCó thể vượt 93 tỷ?', value: 'IPO QUY MÔ LỚN', label: 'HƠN 93 TỶ CHỈ NẾU BÁN HẾT CỔ PHIẾU BỔ SUNG', detail: 'Phân biệt quy mô cơ sở và phương án bán thêm.', graphic: 'versus' },
        { anchor: 'Nhưng liệu', title: 'Anthropic\nđã vượt SpaceX?', value: 'SO GĂNG IPO', label: 'ĐỊNH GIÁ ≠ QUY MÔ HUY ĐỘNG', detail: 'Hai thước đo, hai cuộc đua.', graphic: 'versus' },
      ],
      [
        { anchor: '', title: 'Giá chốt vượt\nvùng chào bán ban đầu.', value: '$70 → $78 → $83', label: 'VÙNG CHÀO BÁN VÀ GIÁ IPO', detail: 'Giá cuối cao hơn cả biên trên ban đầu.', graphic: 'price' },
        { anchor: 'Đáng chú ý', title: 'Gần 500 tỷ USD\nđăng ký mua.', value: '~$500B', label: 'NHU CẦU ĐĂNG KÝ • KHOẢNG 6 LẦN', detail: 'Quy mô IPO cơ sở khoảng 81,34 tỷ USD.', graphic: 'demand', focus: '500 tỷ' },
        { anchor: 'Một con số', title: 'Sức hút lớn\ncủa câu chuyện AI.', value: '≈6 LẦN', label: 'LƯỢNG ĐĂNG KÝ SO VỚI CHÀO BÁN', detail: 'Không chỉ là một đợt IPO riêng lẻ.', graphic: 'demand', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Về định giá:\nvẫn chưa vượt SpaceX.', value: '$1.50T / $1.77T', label: 'ANTHROPIC / SPACEX • CÙNG THƯỚC ĐO ĐỊNH GIÁ', detail: 'Anthropic tính cả cổ phiếu thưởng và quyền mua.', graphic: 'valuation' },
        { anchor: 'Khoảng cách', title: 'Khoảng cách\n270 tỷ USD.', value: '$270B', label: 'SPACEX CAO HƠN VỀ ĐỊNH GIÁ', detail: 'Đừng nhầm định giá với số tiền huy động IPO.', graphic: 'valuation', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Quy mô IPO:\nso với đợt bán đầu.', value: '$81.34B > $75B', label: 'ANTHROPIC / SPACEX INITIAL', detail: 'Anthropic vượt đợt chào bán đầu tiên của SpaceX.', graphic: 'ipoInitial' },
        { anchor: 'Tuy nhiên', title: 'Nhưng SpaceX\nđã bán thêm sau đó.', value: '$86.25B', label: 'TỔNG QUY MÔ THƯƠNG VỤ SPACEX', detail: 'So tổng thương vụ, Anthropic vẫn chưa vượt.', graphic: 'ipoTotal' },
        { anchor: 'Vì vậy', title: 'So tổng thương vụ:\ncòn cách 4,91 tỷ USD.', value: '$4.91B', label: '86,25 − 81,34 = 4,91 TỶ USD', detail: 'Chưa vượt nếu chỉ tính quy mô IPO cơ sở.', graphic: 'ipoTotal', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Quân bài dự phòng:\n147 triệu cổ phiếu.', value: '147 TRIỆU CP', label: 'QUYỀN CHÀO BÁN THÊM', detail: 'Khả năng mở rộng quy mô IPO.', graphic: 'shares' },
        { anchor: 'Nếu toàn bộ', title: 'Nếu bán hết:\nquy mô lên 93,54 tỷ.', value: '~$93.54B', label: 'CHỈ KHI BÁN HẾT 147 TRIỆU CỔ PHIẾU BỔ SUNG', detail: 'Khi đó có thể vượt mức 86,25 tỷ USD của SpaceX.', graphic: 'option', tone: 'teal', focus: '93,54 tỷ' },
      ],
      [
        { anchor: '', title: 'Ngoài IPO:\nkế hoạch huy động riêng.', value: '$26B', label: 'PRIVATE PLACEMENT • KẾ HOẠCH VỐN RIÊNG', detail: 'Google, Nvidia và các đối tác công nghệ khác.', graphic: 'private' },
        { anchor: 'Đây là', title: 'Hai khoản vốn.\nHai cách phân loại.', value: 'IPO ≠ VỐN RIÊNG', label: 'KHÔNG CỘNG CHUNG THÀNH QUY MÔ IPO', detail: 'Khoản riêng không phải tiền mua cổ phiếu công khai.', graphic: 'private', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'ANT trên Nasdaq.\nTâm điểm phiên đầu.', value: 'ANT', label: 'GIÁ IPO $83 • CHƯA PHẢI GIÁ GIAO DỊCH ĐẦU', detail: 'Thị trường sẽ trả giá thế nào cho câu chuyện AI?', graphic: 'scenarios' },
        { anchor: 'Anthropic chưa vượt', title: 'Định giá: chưa vượt.\nQuy mô: cuộc đua còn mở.', value: 'HAI THƯỚC ĐO', label: 'ĐỊNH GIÁ / QUY MÔ IPO', detail: 'Theo dõi kết quả giao dịch và phương án bán thêm.', graphic: 'summary' },
        { anchor: 'Bạn nghĩ', title: 'ANT tăng mạnh\nhay “sell the news”?', value: 'BẠN DỰ ĐOÁN GÌ?', label: 'HAI KỊCH BẢN MINH HỌA • KHÔNG PHẢI GIÁ THỰC TẾ', detail: 'BÌNH LUẬN DỰ ĐOÁN CỦA BẠN ↓', graphic: 'scenarios', tone: 'teal' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
