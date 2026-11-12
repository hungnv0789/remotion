import recording from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'price', 'dividends', 'sources', 'risks', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'TÀI CHÍNH • CĂN BẢN',
  issue: '12 / 11',
  showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  example: { shares: 100, buyPrice: 20_000, sellPrice: 25_000 },
  copy: {
    sections: ['LỢI NHUẬN ĐẾN TỪ ĐÂU?', '01 / CHÊNH LỆCH GIÁ', '02 / CỔ TỨC', 'HAI NGUỒN LỢI NHUẬN', 'LỢI NHUẬN & RỦI RO', 'HIỂU TRƯỚC KHI ĐẦU TƯ'],
    footer: 'CỔ PHIẾU / LỢI NHUẬN / RỦI RO',
    keywords: ['cổ', 'phiếu', 'chênh', 'lệch', 'giá', 'cổ', 'tức', 'lợi', 'nhuận', 'rủi', 'ro', '500.000'],
    units: { shares: 'CỔ PHIẾU', price: 'ĐỒNG / CỔ PHIẾU', money: 'ĐỒNG', million: 'TRIỆU ĐỒNG' },
    hook: { title: 'Cổ phiếu:\nlợi nhuận đến từ đâu?', steps: ['Mua khi giá thấp', 'Chờ giá tăng', 'Bán để kiếm lời'], shift: 'Còn nguồn lợi nhuận\nnào khác?', tag: 'KHÔNG CHỈ LÀ MUA VÀ BÁN' },
    price: { title: 'Mua và bán.\nChênh lệch tạo lợi nhuận.', buy: 'GIÁ MUA', sell: 'GIÁ BÁN', capital: 'VỐN BAN ĐẦU', proceeds: 'TIỀN THU VỀ', profit: 'LỢI NHUẬN CHÊNH LỆCH', feeNote: 'Chưa tính thuế và phí giao dịch', example: 'VÍ DỤ MINH HỌA', equation: 'Tiền thu về − Vốn ban đầu', summary: 'Chênh lệch giá\ntrên mỗi cổ phiếu.' },
    dividends: { title: 'Doanh nghiệp có lãi.\nCổ đông có thể nhận cổ tức.', stages: ['Lợi nhuận doanh nghiệp', 'Quyết định phân phối', 'Cổ đông'], cash: 'TIỀN MẶT', stocks: 'CỔ PHIẾU', formsTitle: 'Cổ tức:\nhai hình thức phổ biến.', note: 'Chưa bán cổ phiếu\nvẫn có thể nhận cổ tức.' },
    sources: { title: '2 nguồn chính.\nCùng một khoản đầu tư.', first: 'Chênh lệch giá', firstDetail: 'Giữa giá mua và giá bán.', second: 'Cổ tức', secondDetail: 'Từ hoạt động của doanh nghiệp.', center: 'LỢI NHUẬN CỔ PHIẾU' },
    risks: { title: 'Thu nhập\nkhông được đảm bảo.', first: 'Giá cổ phiếu có thể giảm', firstDetail: 'Khoản đầu tư có thể thua lỗ.', second: 'Doanh nghiệp kém hiệu quả', secondDetail: 'Có thể không chia cổ tức.', tag: 'LUÔN CÂN NHẮC RỦI RO' },
    closing: { title: 'Đừng chỉ nhìn\nvào lợi nhuận.', final: 'Hiểu lợi nhuận.\nHiểu cả rủi ro.', themes: ['Chênh lệch giá', 'Cổ tức', 'Rủi ro'], endLine: 'HIỂU TRƯỚC KHI ĐẦU TƯ' },
  },
};
export type VideoProps = typeof defaultProps;
