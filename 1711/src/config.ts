import recording from './data/voiceover.json';
import mix from '../public/audio/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'online', 'counter', 'history', 'liquidity', 'transfers', 'network', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'phone' | 'bank' | 'calendar' | 'counter' | 'history' | 'support' | 'costs' | 'transfer' | 'network' | 'summary';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string };
export const defaultProps = {
  brand: 'TIÊU ĐIỂM • NGÂN HÀNG', issue: '17 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .82, music: 'audio/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/news-sting.wav', stingVolume: .22, source: '1711.mp3' },
  timing: { voiceoverStartSeconds: .2, endingHoldSeconds: .6, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'scb-graphics', source: 'src/components/SCBGraphics.tsx', license: 'Original project SVG artwork' }],
  copy: {
    sections: ['TIẾT KIỆM ONLINE VỀ 0%', 'LÃI SUẤT TRỰC TUYẾN', 'GIAO DỊCH TẠI QUẦY', 'TỪ DẪN ĐẦU ĐẾN THAY ĐỔI', 'THANH KHOẢN & CHI PHÍ', 'HẠN MỨC CHUYỂN TIỀN', 'THU HẸP MẠNG LƯỚI', 'TẬP TRUNG TÁI CƠ CẤU'],
    footer: 'SCB / TIỀN GỬI / TÁI CƠ CẤU', keywords: ['SCB', '0%', '20', 'triệu', 'lãi', 'suất', 'tái', 'cơ', 'cấu'],
    ticker: 'SCB  •  TIẾT KIỆM ONLINE  •  LÃI SUẤT  •  GIAO DỊCH  •  MẠNG LƯỚI  •  ',
    illustration: 'ĐỒ HỌA MINH HỌA', bank: 'SCB', central: 'NGÂN HÀNG NHÀ NƯỚC',
    phone: ['TIẾT KIỆM ONLINE', 'LÃI SUẤT / NĂM', 'CÁC KỲ HẠN'],
    calendar: ['2020–2022', 'LẦN GIẢM THỨ 2', 'TRONG MỘT THÁNG'],
    counter: ['12 THÁNG', '13 THÁNG', '3,7%', '8,7%', 'MỐC THAM CHIẾU LÃI VAY THẢ NỔI'],
    history: ['DẪN ĐẦU LÃI SUẤT', 'KIỂM SOÁT ĐẶC BIỆT', '2022'],
    support: ['ĐẢM BẢO THANH KHOẢN', 'HẠN CHẾ CHO VAY', 'XỬ LÝ NỢ XẤU'],
    costs: ['VỐN HUY ĐỘNG MỚI', 'CHI PHÍ LÃI', 'NHU CẦU GIẢM'],
    transfer: ['CHUYỂN TIỀN NHANH', 'APP / INTERNET', 'TỐI ĐA MỖI NGÀY', '20', 'TRIỆU ĐỒNG'],
    network: ['~190', '39', '8', 'PHÒNG GIAO DỊCH', 'CHI NHÁNH', '2023–2025', 'TỪ GIỮA THÁNG 7', '3 TẠI TP.HCM'],
    summary: ['TIỀN GỬI ONLINE', 'GIAO DỊCH', 'MẠNG LƯỚI', '0%', '20 TRIỆU/NGÀY', 'TÁI CƠ CẤU'],
    scenes: [
      [
        { anchor: '', title: 'TIẾT KIỆM ONLINE\nVỀ 0%?', value: '0%', label: 'LÃI SUẤT TIẾT KIỆM ONLINE / NĂM', detail: 'SCB và sự thay đổi trên đường đua huy động vốn.', graphic: 'phone', focus: '0%' },
        { anchor: 'Chuyện tưởng', title: 'Chuyện tưởng đùa.\nNhưng là SCB.', value: 'SCB', label: 'NGÂN HÀNG SÀI GÒN', detail: 'Từ cuộc đua lãi suất đến một bước chuyển khác.', graphic: 'bank' },
      ],
      [
        { anchor: '', title: 'Từng dẫn đầu.\nNay online về 0%.', value: '2020–2022', label: 'GIAI ĐOẠN THƯỜNG XUYÊN DẪN ĐẦU LÃI SUẤT', detail: 'Toàn bộ kỳ hạn tiết kiệm trực tuyến về 0%/năm.', graphic: 'calendar' },
        { anchor: 'Đây đã là', title: 'Lần giảm thứ hai\nchỉ trong một tháng.', value: '0% / NĂM', label: 'TIẾT KIỆM TRỰC TUYẾN', detail: 'Thay đổi trên toàn bộ các kỳ hạn online.', graphic: 'phone' },
      ],
      [
        { anchor: '', title: 'Tại quầy:\nhầu hết kỳ hạn cũng 0%.', value: '0%', label: 'HẦU HẾT KỲ HẠN GIAO DỊCH TẠI QUẦY', detail: 'Có hai mốc ngoại lệ cần phân biệt.', graphic: 'counter' },
        { anchor: 'Ngoại trừ', title: 'Hai mốc\n12 và 13 tháng.', value: '3,7% / 8,7%', label: 'LẦN LƯỢT: 12 THÁNG / 13 THÁNG', detail: 'Mốc tham chiếu để tính lãi cho vay thả nổi.', graphic: 'counter', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Từng là\n“vua lãi suất”.', value: '1,5–2%', label: 'MỨC TỪNG CAO HƠN NHÓM BIG FOUR', detail: 'Nhìn lại cuộc đua thu hút tiền gửi.', graphic: 'history' },
        { anchor: 'kể từ khi', title: 'Bước ngoặt:\nkiểm soát đặc biệt.', value: '2022', label: 'VÀO DIỆN KIỂM SOÁT ĐẶC BIỆT', detail: 'Lãi suất chuyển xuống vùng thấp của thị trường.', graphic: 'history', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Thanh khoản được\nNgân hàng Nhà nước hỗ trợ.', value: 'THANH KHOẢN', label: 'NGÂN HÀNG NHÀ NƯỚC ĐẢM BẢO', detail: 'Hạn chế cho vay, tập trung xử lý nợ xấu.', graphic: 'support', tone: 'teal' },
        { anchor: 'không còn nhu cầu', title: 'Nhu cầu huy động mới\nkhông còn như trước.', value: 'CHI PHÍ VỐN', label: 'TRẢ LÃI CAO LÀM TĂNG CHI PHÍ', detail: 'Tập trung xử lý và tái cơ cấu hoạt động.', graphic: 'costs' },
      ],
      [
        { anchor: '', title: 'Không chỉ\nlà lãi suất.', value: 'GIAO DỊCH', label: 'HOẠT ĐỘNG TIẾP TỤC ĐƯỢC SIẾT CHẶT', detail: 'Thay đổi cả hạn mức chuyển tiền nhanh.', graphic: 'transfer' },
        { anchor: 'Hạn mức', title: 'Chuyển tiền nhanh:\ntối đa 20 triệu/ngày.', value: '20 TRIỆU', label: 'MỖI NGÀY • QUA APP VÀ INTERNET', detail: 'Tăng cường bảo mật, chống gian lận.', graphic: 'transfer', tone: 'danger', focus: '20 triệu' },
      ],
      [
        { anchor: '', title: 'Mạng lưới\ntiếp tục thu hẹp.', value: '~190', label: 'PHÒNG GIAO DỊCH ĐÃ ĐÓNG • 2023–2025', detail: 'Tiếp tục ngừng thêm 39 chi nhánh từ giữa tháng 7.', graphic: 'network' },
        { anchor: 'hiện chỉ còn', title: 'Mạng lưới còn lại\ntrên toàn quốc.', value: '8 CHI NHÁNH', label: 'TRONG ĐÓ: 3 CHI NHÁNH TẠI TP.HCM', detail: 'Thu hẹp quy mô hoạt động.', graphic: 'network', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Từ cuộc đua huy động\nđến tái cơ cấu.', value: 'SCB', label: 'TẬP TRUNG TÁI CƠ CẤU TOÀN DIỆN', detail: 'Tiền gửi • Giao dịch • Mạng lưới', graphic: 'summary' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
