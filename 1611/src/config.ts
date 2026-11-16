import recording from './data/voiceover.json';
import mix from '../public/audio/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'flow', 'pressure', 'opportunity', 'liquidity', 'turning', 'stocks', 'property', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'phone' | 'book' | 'flow' | 'costs' | 'market' | 'quality' | 'lock' | 'allocation' | 'curve' | 'signals' | 'stocks' | 'stages' | 'property' | 'legal' | 'balance';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; dark?: boolean; endGraphic?: GraphicKind; endAfterSeconds?: number };
export const defaultProps = {
  brand: 'TIỀN & CHU KỲ', issue: '16 / 11', showCaptions: true,
  theme: { background: '#F7F2FE', panel: '#FFFFFF', text: '#28143F', muted: '#786A87', accent: '#8229e3', teal: '#167E79', border: '#E5D9F2', danger: '#CE4765' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .95, music: 'audio/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/news-sting.wav', stingVolume: .4, voiceAlias: 'female_north', engine: 'VieNeu-TTS v3 Turbo', preset: 'Ngọc Huyền' },
  timing: { voiceoverStartSeconds: .3, endingHoldSeconds: 1.3, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'finance-graphics', source: 'src/components/FinanceGraphics.tsx', license: 'Original project SVG artwork' }],
  copy: {
    sections: ['NGHỊCH LÝ LÃI SUẤT', 'DÒNG TIỀN DỊCH CHUYỂN', 'ÁP LỰC LÊN TÀI SẢN', 'CƠ HỘI CẦN CHỌN LỌC', 'GIỮ TÍNH LINH HOẠT', 'QUAN SÁT ĐIỂM UỐN', 'HÀNH ĐỘNG: CHỨNG KHOÁN', 'HÀNH ĐỘNG: BẤT ĐỘNG SẢN', 'BẠN ĐANG ƯU TIÊN ĐIỀU GÌ?'],
    footer: 'LÃI SUẤT / THANH KHOẢN / TÀI SẢN',
    keywords: ['lãi', 'suất', 'thanh', 'khoản', 'tiền', 'mặt', 'điểm', 'uốn', 'all-in', 'tài', 'sản'],
    ticker: 'GIỮ THANH KHOẢN  •  CHỜ TÍN HIỆU  •  CHỌN TÀI SẢN  •  ',
    illustration: 'SƠ ĐỒ MINH HỌA • KHÔNG PHẢI DỮ LIỆU THỊ TRƯỜNG',
    phone: ['LÃI SUẤT TIỀN GỬI', 'KỲ HẠN', 'LÃI SUẤT', 'NGẮN HẠN', 'DÀI HẠN', 'ĐANG TĂNG'],
    book: ['SỔ TIẾT KIỆM', 'VỘI KHÓA TIỀN?'],
    flow: ['DOANH NGHIỆP', 'THỊ TRƯỜNG', 'NGÂN HÀNG', 'TIỀN NHÀN RỖI'],
    costs: ['VỐN VAY', 'CHI PHÍ', 'LỢI NHUẬN', 'MỞ RỘNG'],
    quality: ['TÀI SẢN TỐT', 'DÀI HẠN', 'CHỌN LỌC'],
    lock: ['TIỀN KHÓA DÀI HẠN', 'CƠ HỘI', 'LINH HOẠT'],
    allocation: ['DỰ PHÒNG', 'KỲ HẠN', 'CƠ HỘI'],
    curve: ['LÃI SUẤT', 'ĐIỂM UỐN?', 'THỜI GIAN'],
    signals: ['Lãi suất huy động', 'Lãi suất liên ngân hàng', 'Tín dụng', 'Chính sách tiền tệ'],
    stocks: ['ĐẦU NGÀNH', 'TÀI CHÍNH LÀNH MẠNH', 'DÒNG TIỀN TỐT'],
    stages: ['ĐỢT 1', 'ĐỢT 2', 'ĐỢT 3', 'CHIA VỐN THEO TỪNG ĐỢT'],
    property: ['KHẢO SÁT', 'SO SÁNH GIÁ', 'KIỂM TRA PHÁP LÝ'],
    legal: ['Pháp lý rõ ràng', 'Nhu cầu thật', 'Dòng tiền hợp lý', 'Chịu được chi phí vốn'],
    balance: ['TIẾT KIỆM', 'DANH MỤC TÀI SẢN'],
    scenes: [
      [
        { anchor: '', title: 'LÃI TIỀN GỬI\nCÀNG CAO…', value: 'CÀNG CAO ↑', label: 'MỘT TÍN HIỆU CẦN HIỂU', detail: 'Có nên vội khóa tiền vào tiết kiệm?', graphic: 'phone', dark: true },
        { anchor: 'càng không nên', title: 'CÀNG KHÔNG NÊN\nVỘI GỬI TIẾT KIỆM?', value: 'NGHE VÔ LÝ?', label: 'ĐỪNG CHỈ NHÌN VÀO LÃI SUẤT', detail: 'Nhìn dòng tiền và cơ hội phía sau.', graphic: 'book', dark: true },
      ],
      [
        { anchor: '', title: 'Lãi suất cao.\nChi phí vốn cao.', value: 'CHI PHÍ VỐN ↑', label: 'KHI NGÂN HÀNG NÂNG LÃI SUẤT HUY ĐỘNG', detail: 'Chi phí vốn của hệ thống có thể tăng lên.', graphic: 'flow', tone: 'danger' },
        { anchor: 'Tiền nhàn rỗi', title: 'Tiền nhàn rỗi\ncó thể dịch chuyển.', value: 'ƯU TIÊN GỬI?', label: 'MỘT XU HƯỚNG CÓ THỂ XUẤT HIỆN', detail: 'Tùy bối cảnh, thay vì vào tài sản rủi ro.', graphic: 'flow' },
      ],
      [
        { anchor: '', title: 'Vốn đắt hơn.\nLợi nhuận chịu áp lực.', value: 'VỐN ĐẮT HƠN', label: 'CHI PHÍ TÀI CHÍNH TĂNG', detail: 'Kế hoạch mở rộng có thể bị trì hoãn.', graphic: 'costs', tone: 'danger' },
        { anchor: 'Khi lợi nhuận', title: 'Kỳ vọng giảm.\nGiá tài sản chịu sức ép.', value: 'CHỊU ÁP LỰC', label: 'CỔ PHIẾU VÀ NHIỀU TÀI SẢN', detail: 'Nhà đầu tư đòi hỏi mức sinh lời cao hơn.', graphic: 'market', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Thị trường bi quan.\nCơ hội ở đâu?', value: 'CẦN CHỌN LỌC', label: 'TÀI SẢN TỐT CÓ THỂ GIẢM CÙNG THỊ TRƯỜNG', detail: 'Giá giảm không có nghĩa tài sản nào cũng rẻ.', graphic: 'quality', tone: 'teal' },
        { anchor: 'Người có tiền mặt', title: 'Tiền mặt. Dài hạn.\nKhả năng chọn lọc.', value: 'ĐỊNH GIÁ TỐT?', label: 'CƠ HỘI CẦN ĐI KÈM CHẤT LƯỢNG', detail: 'Chỉ cân nhắc tài sản mình đánh giá được.', graphic: 'quality', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Đừng để mất\nthanh khoản.', value: 'KHÓA TOÀN BỘ?', label: 'KỲ HẠN DÀI CÓ THỂ LÀM GIẢM LINH HOẠT', detail: 'Cơ hội đến khi tiền chưa sẵn sàng?', graphic: 'lock', tone: 'danger' },
        { anchor: 'Nhưng điều đó', title: 'Giữ linh hoạt.\nTránh chọn cực đoan.', value: 'KHÔNG RÚT HẾT', label: 'KHÔNG CÓ NGHĨA BỎ TIẾT KIỆM ĐỂ ĐẦU TƯ', detail: 'Phân bổ vốn theo nhu cầu sử dụng tiền.', graphic: 'allocation', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Điểm uốn lãi suất:\ntạo đỉnh, đảo chiều?', value: 'ĐIỂM UỐN?', label: 'KHI ÁP LỰC TĂNG LÃI SUẤT DỊU LẠI', detail: 'Quan sát mặt bằng lãi suất bắt đầu giảm.', graphic: 'curve' },
        { anchor: 'Tuy nhiên', title: 'Đừng đoán đáy\nbằng một tin tức.', value: 'CẦN XÁC NHẬN', label: 'NHIỀU TÍN HIỆU, THAY VÌ MỘT TIÊU ĐỀ', detail: 'Các loại lãi suất có thể đảo chiều khác lúc.', graphic: 'curve', tone: 'danger' },
        { anchor: 'Hãy xác nhận', title: 'Theo dõi\n4 nhóm tín hiệu.', value: 'QUAN SÁT', label: 'LÃI SUẤT • TÍN DỤNG • CHÍNH SÁCH', detail: 'Kết hợp nhiều tín hiệu trước khi hành động.', graphic: 'signals' },
      ],
      [
        { anchor: '', title: 'Chứng khoán:\nkỳ vọng phản ánh sớm.', value: 'PHẢN ỨNG SỚM', label: 'GIÁ CÓ THỂ PHẢN ÁNH KỲ VỌNG LÃI SUẤT', detail: 'Giá có thể phản ánh kỳ vọng từ sớm.', graphic: 'stocks' },
        { anchor: 'Nếu tham gia', title: 'Giải ngân từng phần.\nƯu tiên chất lượng.', value: 'CHIA VỐN', label: 'ĐẦU NGÀNH • NỢ VAY HỢP LÝ • DÒNG TIỀN', detail: 'Chia thành nhiều đợt, tránh vội vàng.', graphic: 'stages', tone: 'teal' },
        { anchor: 'Đừng mua', title: 'Giảm sâu\nchưa đủ để mua.', value: 'NHÌN NỀN TẢNG', label: 'TÀI CHÍNH LÀNH MẠNH & DÒNG TIỀN TỐT', detail: 'Đừng mua chỉ vì giá đã giảm sâu.', graphic: 'stocks', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Bất động sản:\ncần kiên nhẫn.', value: 'CHẬM HƠN', label: 'KHẢO SÁT • SO SÁNH GIÁ • KIỂM TRA PHÁP LÝ', detail: 'Không mặc định một mốc phục hồi cố định.', graphic: 'property' },
        { anchor: 'Chỉ cân nhắc', title: 'Xuống tiền\nkhi đủ điều kiện.', value: 'KIỂM TRA KỸ', label: 'PHÁP LÝ • NHU CẦU • DÒNG TIỀN • CHI PHÍ VỐN', detail: 'Tính cả khả năng chịu chi phí vốn của bạn.', graphic: 'legal', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Lãi suất cao.\nKhông có nghĩa all-in.', value: 'ĐỪNG ALL-IN', label: 'GIỮ THANH KHOẢN – CHỜ TÍN HIỆU', detail: 'Chỉ mua tài sản mình hiểu rõ.', graphic: 'balance' },
        { anchor: 'Bạn đang ưu tiên', title: 'Gửi tiết kiệm\nhay chờ tích sản?', value: 'BẠN CHỌN GÌ?', label: 'GIỮ THANH KHOẢN – CHỜ TÍN HIỆU – CHỌN TÀI SẢN', detail: 'BÌNH LUẬN BÊN DƯỚI NHÉ ↓', graphic: 'balance', endGraphic: 'curve', endAfterSeconds: 2, tone: 'teal' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
