import recording from './data/voiceover.json';
import assets from './data/assets.json';
import mix from '../public/audio/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'inspection', 'sanctions', 'safety', 'deposits', 'borrowers', 'balance', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'photo' | 'banks' | 'document' | 'chart' | 'vault' | 'phone' | 'factory' | 'balance' | 'question';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; stamp?: string };
export const defaultProps = {
  brand: 'TÀI CHÍNH • CHÍNH SÁCH', issue: '14 / 11', showCaptions: true,
  theme: { background: '#F7F2FE', panel: '#FFFFFF', text: '#28143F', muted: '#766785', accent: '#8229e3', teal: '#167D7E', border: '#E5D8F2', danger: '#D73B5A' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .95, music: 'audio/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/news-sting.wav', stingVolume: .4, voiceAlias: 'female_north', engine: 'VieNeu-TTS v3 Turbo', preset: 'Ngọc Huyền' },
  timing: { voiceoverStartSeconds: .3, endingHoldSeconds: 1.4, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3.0 }, assets,
  copy: {
    sections: ['NHNN RA TAY', 'THANH TRA TRONG THÁNG 11', 'CHẾ TÀI VỀ TÍN DỤNG', 'SIẾT CÁC TỶ LỆ AN TOÀN', 'LÃI SUẤT TIỀN GỬI', 'LÃI SUẤT CHO VAY', 'BA PHÍA CỦA BÀI TOÁN', 'ĐIỀU CẦN THEO DÕI'],
    footer: 'LÃI SUẤT / NGUỒN VỐN / TÍN DỤNG', keywords: ['lãi', 'suất', 'thanh', 'tra', '0,5', '1,5', '2026', '2027', 'tín', 'dụng'],
    ticker: 'LÃI SUẤT  ↓  •  TÍN DỤNG  •  THANH TRA  •  CHI PHÍ VỐN  •  ',
    credit: 'Ảnh NHNN: Edgardo W. Olivera · CC BY 2.0 · 2017',
    illustration: 'ĐỒ HỌA MINHỌA', calendar: ['THÁNG', '11', '2026'],
    bankLabel: 'NGÂN HÀNG', centralLabel: 'NGÂN HÀNG NHÀ NƯỚC', documentLabel: 'KIỂM TRA CHUYÊN ĐỀ', vaultLabel: 'BẢO ĐẢM AN TOÀN', phoneLabel: 'TIỀN GỬI • KỲ HẠN ≥ 6 THÁNG', factoryLabel: 'SẢN XUẤT • KINH DOANH',
    balanceLabels: ['DOANH NGHIỆP', 'NGƯỜI GỬI TIỀN', 'NGÂN HÀNG'], closingLabels: ['Lãi suất thực tế', 'Chi phí vốn', 'Tăng trưởng tín dụng'],
    scenes: [
      [
        { anchor: '', title: 'THANH TRA\nNGÂN HÀNG!', value: 'NHNN', label: 'ĐỘNG THÁI CỨNG RẮN', detail: 'Yêu cầu giảm lãi suất', graphic: 'photo', tone: 'danger' },
        { anchor: 'Các ngân hàng', title: 'Không giảm lãi suất?\nTín dụng chịu áp lực.', value: 'CẮT ROOM?', label: 'NGUY CƠ VỚI NGÂN HÀNG KHÔNG TUÂN THỦ', detail: 'Có thể bị cắt hạn mức tăng trưởng tín dụng', graphic: 'banks', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Thanh tra\nngay trong tháng 11.', value: '11 / 2026', label: 'KIỂM TRA VIỆC GIẢM LÃI SUẤT', detail: 'Chi nhánh khu vực thành lập đoàn thanh tra', graphic: 'document', stamp: 'THANH TRA' },
        { anchor: 'Đặc biệt', title: 'Kết quả phải\nbáo cáo ngay.', value: 'THÁNG 11', label: 'TIẾN ĐỘ BÁO CÁO', detail: 'Kịp thời báo cáo Thủ tướng', graphic: 'document', stamp: 'KHẨN' },
      ],
      [
        { anchor: '', title: 'Chế tài đáng chú ý:\ngiảm hạn mức tín dụng.', value: 'GIẢM ROOM', label: 'NGÂN HÀNG VI PHẠM CÓ THỂ BỊ XEM XÉT', detail: 'Không tuân thủ hoặc cạnh tranh không lành mạnh', graphic: 'chart', tone: 'danger' },
        { anchor: 'trong phần còn lại', title: 'Áp lực ngay\nphần còn lại của năm.', value: '2026', label: 'CÓ THỂ GIẢM CHỈ TIÊU TĂNG TRƯỞNG', detail: 'Khả năng mở rộng tín dụng bị thu hẹp', graphic: 'banks', tone: 'danger' },
        { anchor: 'đồng thời', title: 'Hạn mức năm sau\ncó thể thấp hơn.', value: '2027', label: 'ÁP LỰC KÉO DÀI SANG NĂM SAU', detail: 'Giao chỉ tiêu tín dụng thấp hơn', graphic: 'chart', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Không chỉ room.\nCòn áp lực an toàn.', value: 'SIẾT CHẶT', label: 'MỘT HOẶC NHIỀU TỶ LỆ BẢO ĐẢM AN TOÀN', detail: 'Có thể yêu cầu cao hơn mức quy định', graphic: 'vault' },
        { anchor: 'Đây là áp lực', title: 'Kinh doanh ngân hàng\nchịu thêm sức ép.', value: 'AN TOÀN ↑', label: 'ÁP LỰC ĐỐI VỚI TỔ CHỨC VI PHẠM', detail: 'Cân đối nguồn vốn và hoạt động kinh doanh', graphic: 'banks' },
      ],
      [
        { anchor: '', title: 'Tiền gửi:\nyêu cầu giảm tối thiểu.', value: '0,5%', label: 'GIẢM 0,5 ĐIỂM PHẦN TRĂM / NĂM', detail: 'Lãi suất tiền gửi niêm yết • kỳ hạn từ 6 tháng', graphic: 'phone', tone: 'danger' },
        { anchor: 'Đồng thời', title: 'Không chạy đua\nlãi suất huy động.', value: 'DỪNG ĐUA', label: 'KHÔNG CẠNH TRANH BẰNG TĂNG LÃI SUẤT', detail: 'Tiền gửi kỳ hạn từ 6 tháng trở lên', graphic: 'banks', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Lãi suất cho vay:\nyêu cầu giảm.', value: '1,5–2%', label: 'GIẢM 1,5–2 ĐIỂM PHẦN TRĂM / NĂM', detail: 'Sản xuất, kinh doanh và lĩnh vực ưu tiên', graphic: 'factory', tone: 'teal' },
        { anchor: 'Nếu được triển khai', title: 'Triển khai thực chất:\ndoanh nghiệp có lợi.', value: 'VỐN RẺ HƠN?', label: 'TÍN HIỆU TÍCH CỰC CHO DOANH NGHIỆP', detail: 'Cơ hội giảm áp lực chi phí vốn', graphic: 'factory', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Một chính sách.\nNhiều tác động.', value: 'CHI PHÍ VỐN ↓', label: 'DOANH NGHIỆP CÓ THỂ HƯỞNG LỢI', detail: 'Cơ hội giảm chi phí vay vốn', graphic: 'balance', tone: 'teal' },
        { anchor: 'Nhưng người gửi', title: 'Người gửi tiết kiệm:\ncần nhìn lại lãi suất.', value: 'TIỀN GỬI MỚI', label: 'LỢI NHUẬN TIỀN GỬI CÓ THỂ THẤP HƠN', detail: 'Theo dõi mặt bằng lãi suất huy động', graphic: 'balance' },
        { anchor: 'Còn với', title: 'Ngân hàng:\nbài toán khó hơn.', value: 'CÂN ĐỐI VỐN', label: 'NGUỒN VỐN & TĂNG TRƯỞNG TÍN DỤNG', detail: 'Áp lực cân đối hai phía của bảng vốn', graphic: 'banks', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Lãi suất có\nthực sự hạ nhiệt?', value: 'THEO DÕI', label: 'NGÂN HÀNG NÀO CHỊU ÁP LỰC LỚN NHẤT?', detail: 'Mặt bằng lãi suất và tăng trưởng tín dụng', graphic: 'question' },
        { anchor: 'Bạn nghĩ', title: 'Ai sẽ hưởng lợi\nnhiều nhất?', value: 'BẠN CHỌN AI?', label: 'DOANH NGHIỆP • NGƯỜI VAY • CHỨNG KHOÁN', detail: 'BÌNH LUẬN GÓC NHÌN CỦA BẠN ↓', graphic: 'balance', tone: 'teal' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
