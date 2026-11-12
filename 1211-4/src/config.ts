import recording from './data/voiceover.json';
import photo from './data/assets.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'news', 'explain', 'flow', 'opportunity', 'conclusion'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'BẢN TIN • VĨ MÔ', issue: '12 / 11', showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .95, music: 'audio/finance-news.wav', musicVolume: .26, sting: 'audio/news-sting.wav', stingVolume: .7, voiceAlias: 'female_north' },
  timing: { voiceoverStartSeconds: .3, endingHoldSeconds: 1.7, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3.2 },
  scenario: { rate: 25_500, assumedUsdBillions: 1, swapUsdBillions: 2, swapDays: 182 },
  photo,
  copy: {
    sections: ['TÍN HIỆU THANH KHOẢN', 'NHNN MUA USD GIAO NGAY', 'GIAO NGAY KHÁC HOÁN ĐỔI', 'VND CÓ THỂ CHẢY ĐI ĐÂU?', 'NHÓM NGÀNH CẦN THEO DÕI', 'QUAN SÁT DÒNG TIỀN'],
    footer: 'CHÍNH SÁCH / THANH KHOẢN / THỊ TRƯỜNG', keywords: ['USD', 'VND', 'NHNN', '25.500', 'thanh', 'khoản', 'lãi', 'suất', 'có', 'thể'],
    currency: { usd: 'USD', vnd: 'VND', usdUnit: 'TỶ USD', vndUnit: 'TỶ VND', rateUnit: 'VND / USD' },
    hook: { label: 'TÍN HIỆU MỚI', title: 'TÍN HIỆU\nBƠM TIỀN!', news: 'NHNN MUA USD\nTRỞ LẠI', question: 'Dòng tiền VND\ncó thể tăng lên?', tag: 'THANH KHOẢN MỚI?' },
    news: { title: 'Ngân hàng Nhà nước\nmua USD giao ngay.', institution: 'NGÂN HÀNG NHÀ NƯỚC', date: '11 / 11 / 2026', dateLabel: 'BẮT ĐẦU TRIỂN KHAI', days: ['THỨ HAI', 'THỨ TƯ'], calendar: 'LỊCH MUA ĐỊNH KỲ', condition: 'Ngân hàng thương mại\ncó trạng thái ngoại tệ dương', rule: 'ĐIỀU KIỆN THAM GIA', exchange: 'USD đi vào · VND đi ra' },
    explain: { title: 'Đừng nhầm\nhai nghiệp vụ.', swap: 'HOÁN ĐỔI', spot: 'MUA GIAO NGAY', swapDaysUnit: 'NGÀY', swapReturn: 'Bán lại USD khi đáo hạn', swapFlow: 'Bơm VND → Thu hồi', spotRate: 'VND / USD', spotReturn: 'KHÔNG CÓ CAM KẾT\nBÁN LẠI USD', spotFlow: 'Không có kỳ hạn hoàn trả\ntheo hợp đồng swap', swapFocus: 'Có cam kết\nđảo chiều khi đáo hạn.', spotFocus: 'Điểm khác biệt:\nkhông phải hợp đồng swap.' },
    flow: { title: '1 tỷ USD.\nBao nhiêu tiền VND?', assumption: 'GIẢ SỬ NHNN MUA 1 TỶ USD', valueLabel: 'ĐỒNG THỜI CUNG ỨNG TƯƠNG ỨNG', centralBank: 'NGÂN HÀNG NHÀ NƯỚC', commercialBanks: 'HỆ THỐNG NGÂN HÀNG', branches: ['Doanh nghiệp', 'Đầu tư', 'Tiêu dùng'], diagramNote: 'Sơ đồ minh họa cơ chế truyền dẫn,\nkhông phải phân bổ tiền thực tế.', supportTitle: 'Thanh khoản tốt hơn.\nÁp lực vốn giảm bớt.', effects: ['Hỗ trợ thanh khoản ngân hàng', 'Giảm áp lực vốn ngắn hạn', 'Có thể hỗ trợ mặt bằng lãi suất'], conditional: 'NẾU DÒNG TIỀN ĐƯỢC DUY TRÌ\nVÀ HẤP THỤ TỐT', conditionalTitle: 'Có thể hỗ trợ\ntín dụng và kinh doanh.' },
    opportunity: { title: 'Nhóm nào\ncó thể hưởng lợi?', ticker: 'NGÂN HÀNG  •  CHỨNG KHOÁN  •  BẤT ĐỘNG SẢN  •  XÂY DỰNG  •  SẢN XUẤT  •  ', sectors: [
      {name:'NGÂN HÀNG',icon:'bank',factor:'Thanh khoản & chi phí vốn',condition:'Thanh khoản cải thiện; áp lực chi phí vốn có thể giảm.',tag:'THEO DÕI'},
      {name:'CHỨNG KHOÁN',icon:'chart',factor:'Giao dịch & nhu cầu margin',condition:'Dòng tiền rẻ hơn có thể thúc đẩy giao dịch và vay ký quỹ.',tag:'THEO DÕI'},
      {name:'BẤT ĐỘNG SẢN\n& XÂY DỰNG',icon:'home',factor:'Chi phí tài chính & vay vốn',condition:'Nếu lãi vay giảm, doanh nghiệp có thể giảm áp lực tài chính.',tag:'TRUNG HẠN'},
      {name:'SẢN XUẤT\n& KINH DOANH',icon:'factory',factor:'Vốn lưu động & mở rộng',condition:'Các doanh nghiệp có nhu cầu vốn lớn cần được theo dõi.',tag:'TRUNG HẠN'},
    ] },
    conclusion: { warning:'BƠM TIỀN\n≠ CHỨNG KHOÁN TĂNG', title:'Đừng chỉ nhìn\nvào một con số.', indicators:['Lượng USD thực sự mua vào','Lãi suất liên ngân hàng','Tăng trưởng tín dụng','Dòng tiền chứng khoán'], positive:'Có thể là tín hiệu tích cực.\nCần quan sát sự truyền dẫn.', question:'TIỀN ĐANG\nCHẢY VỀ ĐÂU?', ctaQuestion:'Ngân hàng, chứng khoán\nhay bất động sản?', options:['Ngân hàng','Chứng khoán','Bất động sản'], cta:'BÌNH LUẬN GÓC NHÌN CỦA BẠN ↓', end:'THEO DÕI ĐỂ KHÔNG BỎ LỠ TÍN HIỆU' },
  },
};
export type VideoProps = typeof defaultProps;
