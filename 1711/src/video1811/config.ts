import recording from './data/voiceover.json';
import mix from '../../public/audio/1811/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'exit', 'investor', 'holdings', 'valuation', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'shares' | 'exit' | 'investor' | 'announcement' | 'holdings' | 'valuation' | 'summary';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string };
export const defaultProps = {
  brand: 'TIÊU ĐIỂM • CỔ PHIẾU', issue: '18 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .82, music: 'audio/1811/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/1811/news-sting.wav', stingVolume: .22, source: '1811.mp3' },
  timing: { voiceoverStartSeconds: .2, endingHoldSeconds: .8, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'acb-graphics', source: 'src/video1811/components/EquityGraphics.tsx', license: 'Original project SVG artwork' }],
  copy: {
    sections: ['NHÀ ĐẦU TƯ MỸ THOÁI VỐN ACB', 'THOÁI TOÀN BỘ SỞ HỮU', 'TỔ CHỨC ĐỨNG SAU GIAO DỊCH', 'QUY MÔ NẮM GIỮ TRƯỚC ĐÓ', 'GIÁ TRỊ CỔ PHẦN ƯỚC TÍNH', 'ĐỘNG THÁI THU HÚT CHÚ Ý'],
    footer: 'ACB / DÒNG VỐN NGOẠI / SỞ HỮU', keywords: ['ACB', '51', '51,47', '1.053', 'Mỹ', 'thoái', 'vốn', 'cổ', 'phiếu'],
    ticker: 'ACB  •  PRINCIPAL GLOBAL INVESTORS  •  DÒNG VỐN NGOẠI  •  SỞ HỮU CỔ PHIẾU  •  ',
    illustration: 'ĐỒ HỌA MINH HỌA',
    bank: 'ACB', shares: ['CỔ PHIẾU', '51 TRIỆU', '>1.000 TỶ ĐỒNG', 'NHÀ ĐẦU TƯ MỸ'],
    exit: ['SỞ HỮU TRƯỚC ĐÓ', 'SỞ HỮU HIỆN TẠI', '0', 'CỔ PHIẾU ACB', 'THOÁI TOÀN BỘ'],
    investor: ['PRINCIPAL', 'GLOBAL INVESTORS', 'PRINCIPAL FINANCIAL GROUP', 'MỸ', 'QUẢN LÝ TÀI SẢN'],
    announcement: ['CÔNG BỐ', '11/11', 'KHÔNG CÒN SỞ HỮU', '0 CỔ PHIẾU ACB'],
    holdings: ['GIỮA THÁNG 6/2026', '51,47', 'TRIỆU CỔ PHIẾU', '>1%', 'VỐN ĐIỀU LỆ ACB'],
    valuation: ['51,47 TRIỆU CP', '20.450 ĐỒNG/CP', '≈1.053 TỶ', 'TRƯỚC PHIÊN 16/11', 'GIÁ TRỊ ƯỚC TÍNH'],
    summary: ['NHÀ ĐẦU TƯ MỸ', 'CỔ PHIẾU ACB', 'GIÁ TRỊ CỔ PHẦN', 'THOÁI VỐN', '51 TRIỆU', '>1.000 TỶ'],
    scenes: [
      [
        { anchor: '', title: 'CHUYỆN GÌ\nĐANG XẢY RA VỚI ACB?', value: 'ACB', label: 'NGÂN HÀNG CỦA CHỦ TỊCH TRẦN HÙNG HUY', detail: 'Một động thái từ nhà đầu tư Mỹ.', graphic: 'shares' },
        { anchor: 'Nhà đầu tư Mỹ', title: 'Nhà đầu tư Mỹ\nthoái sạch cổ phiếu.', value: '51 TRIỆU CP', label: 'GIÁ TRỊ HƠN 1.000 TỶ ĐỒNG', detail: 'Thoái toàn bộ vốn khỏi ACB.', graphic: 'shares', focus: '51 triệu' },
      ],
      [
        { anchor: '', title: 'Từng nắm giữ\nhơn 51 triệu cổ phiếu.', value: '>1.000 TỶ', label: 'GIÁ TRỊ LƯỢNG CỔ PHIẾU TỪNG NẮM GIỮ', detail: 'Một tổ chức đầu tư đến từ Mỹ.', graphic: 'exit' },
        { anchor: 'một tổ chức', title: 'Tổ chức đầu tư Mỹ\nrút toàn bộ vốn.', value: 'THOÁI SẠCH', label: 'TOÀN BỘ SỞ HỮU CỔ PHIẾU ACB', detail: 'Ngân hàng do ông Trần Hùng Huy làm Chủ tịch.', graphic: 'exit', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Principal\nGlobal Investors.', value: 'PRINCIPAL', label: 'THUỘC PRINCIPAL FINANCIAL GROUP CỦA MỸ', detail: 'Tổ chức quản lý tài sản.', graphic: 'investor' },
        { anchor: 'Theo công bố', title: 'Công bố ngày 11/11:\nkhông còn sở hữu ACB.', value: '0 CỔ PHIẾU', label: 'SỞ HỮU CỦA TỔ CHỨC TẠI ACB', detail: 'Tổ chức không còn sở hữu bất kỳ cổ phiếu ACB nào.', graphic: 'announcement', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Giữa tháng 6/2026:\nquy mô nắm giữ lớn.', value: '51,47 TRIỆU', label: 'CỔ PHIẾU ACB • NẮM GIỮ TRƯỚC ĐÓ', detail: 'Tương đương hơn 1% vốn điều lệ ngân hàng.', graphic: 'holdings', focus: '51,47 triệu' },
        { anchor: 'tương đương', title: 'Tỷ lệ nắm giữ:\nhơn 1% vốn điều lệ.', value: '>1%', label: 'VỐN ĐIỀU LỆ ACB', detail: 'Quy mô nắm giữ của Principal Global Investors.', graphic: 'holdings', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Ước tính theo giá\ntrước phiên 16/11.', value: '20.450 ĐỒNG', label: 'MỖI CỔ PHIẾU ACB', detail: 'Mức giá dùng để tính giá trị lượng cổ phần.', graphic: 'valuation' },
        { anchor: 'lượng cổ phần', title: 'Giá trị cổ phần:\nkhoảng 1.053 tỷ đồng.', value: '≈1.053 TỶ', label: 'GIÁ TRỊ ƯỚC TÍNH • THEO GIÁ TRƯỚC PHIÊN 16/11', detail: '51,47 triệu cổ phiếu × 20.450 đồng/cổ phiếu.', graphic: 'valuation', tone: 'teal', focus: '1.053 tỷ' },
      ],
      [
        { anchor: '', title: 'Thoái toàn bộ vốn.\nGiới đầu tư chú ý.', value: 'ACB', label: 'ĐỘNG THÁI CỦA NHÀ ĐẦU TƯ TỔ CHỨC NƯỚC NGOÀI', detail: 'Hơn 1.000 tỷ đồng giá trị cổ phần từng nắm giữ.', graphic: 'summary' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
