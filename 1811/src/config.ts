import recording from './data/voiceover.json';
import mix from '../public/audio/1811/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'preparation', 'goal', 'administration', 'network', 'targets', 'infrastructure', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'skyline' | 'checklist' | 'calendar' | 'admin' | 'network' | 'stats' | 'mobility' | 'roadmap';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string };
export const defaultProps = {
  brand: 'TIÊU ĐIỂM • ĐÔ THỊ', issue: '18 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .82, music: 'audio/1811/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/1811/news-sting.wav', stingVolume: .22, source: '1811.mp3' },
  timing: { voiceoverStartSeconds: .2, endingHoldSeconds: .8, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'urban-graphics', source: 'src/components/UrbanGraphics.tsx', license: 'Original project SVG artwork' }],
  copy: {
    sections: ['HƯNG YÊN ĐẶT MỤC TIÊU MỚI', 'CHUẨN BỊ NỀN TẢNG PHÁT TRIỂN', 'LỘ TRÌNH ĐÔ THỊ LOẠI I', 'SẮP XẾP HÀNH CHÍNH', 'ĐA CỰC • ĐA TRUNG TÂM', 'CÁC CHỈ TIÊU ĐẾN 2030', 'ĐẦU MỐI GIAO THÔNG', 'TĂNG TỐC THEO LỘ TRÌNH'],
    footer: 'HƯNG YÊN / QUY HOẠCH / HẠ TẦNG', keywords: ['Hưng', 'Yên', 'đô', 'thị', '2030', '55%', 'hai', 'I', 'II'],
    ticker: 'HƯNG YÊN  •  ĐÔ THỊ LOẠI I  •  ĐA TRUNG TÂM  •  GIAO THÔNG  •  HẠ TẦNG LIÊN VÙNG  •  ',
    illustration: 'SƠ ĐỒ MINH HỌA • KHÔNG PHẢI BẢN ĐỒ QUY HOẠCH',
    skyline: ['HƯNG YÊN', 'MỤC TIÊU ĐÔ THỊ LOẠI I', 'ĐỊNH HƯỚNG PHÁT TRIỂN'],
    checklist: ['Sắp xếp đơn vị hành chính', 'Thành lập thêm phường', 'Quy hoạch đa trung tâm'],
    calendar: ['MỤC TIÊU CUỐI NĂM', '2028', 'ĐÔ THỊ LOẠI I', 'PHẤN ĐẤU HOÀN THIỆN TIÊU CHÍ'],
    admin: ['ĐƠN VỊ CẤP XÃ', 'THÊM PHƯỜNG', 'ĐỀ ÁN THÀNH PHỐ'],
    network: ['CỰC TĂNG TRƯỞNG', 'KẾT NỐI GIAO THÔNG • HẠ TẦNG LIÊN VÙNG'],
    stats: ['MỤC TIÊU 2030', '≥55%', 'TỶ LỆ ĐÔ THỊ HÓA', '50%', 'SỐ PHƯỜNG ĐẠT TRÌNH ĐỘ', 'ĐÔ THỊ LOẠI II TRỞ LÊN'],
    mobility: ['GA ĐƯỜNG SẮT ĐÔ THỊ', 'NÚT GIAO CAO TỐC', 'CẢNG CẠN ICD'],
    roadmap: ['ĐÔ THỊ LOẠI I', 'ĐA TRUNG TÂM', 'HẠ TẦNG LIÊN VÙNG', 'MỤC TIÊU • ĐỊNH HƯỚNG • LỘ TRÌNH'],
    scenes: [
      [
        { anchor: '', title: 'HƯNG YÊN\nSẮP BƯỚC LÊN NẤC MỚI?', value: 'ĐÔ THỊ LOẠI I', label: 'MỤC TIÊU TRONG HAI NĂM TỚI', detail: 'Định hướng xa hơn: thành phố trực thuộc Trung ương.', graphic: 'skyline' },
        { anchor: 'xa hơn', title: 'Đích đến xa hơn:\nthành phố trực thuộc TW.', value: 'HƯNG YÊN', label: 'ĐỊNH HƯỚNG PHÁT TRIỂN DÀI HƠI', detail: 'Lộ trình đô thị là bước chuẩn bị nền tảng.', graphic: 'roadmap' },
      ],
      [
        { anchor: '', title: 'Hàng loạt thay đổi\nđang được chuẩn bị.', value: 'NỀN TẢNG MỚI', label: 'HÀNH CHÍNH • PHƯỜNG • MẠNG LƯỚI ĐÔ THỊ', detail: 'Chuẩn bị cho nấc thang phát triển mới.', graphic: 'checklist' },
        { anchor: 'Tất cả đều', title: 'Chuẩn bị hôm nay.\nTạo nền tảng ngày mai.', value: 'PHÁT TRIỂN', label: 'MỘT NẤC THANG MỚI CHO TỈNH', detail: 'Sắp xếp tổ chức gắn với quy hoạch đô thị.', graphic: 'skyline' },
      ],
      [
        { anchor: '', title: 'Lộ trình:\nhoàn thiện tiêu chí.', value: '2028', label: 'MỤC TIÊU CUỐI NĂM • ĐÔ THỊ LOẠI I', detail: 'Hưng Yên phấn đấu hoàn thiện các tiêu chí.', graphic: 'calendar', focus: '2028' },
      ],
      [
        { anchor: '', title: 'Từ sắp xếp cấp xã\nđến hồ sơ đô thị.', value: 'HÀNH CHÍNH', label: 'SẮP XẾP • HỢP NHẤT MỘT SỐ ĐƠN VỊ CẤP XÃ', detail: 'Xây dựng phương án và hoàn thiện hồ sơ.', graphic: 'admin' },
        { anchor: 'hoàn thiện hồ sơ', title: 'Thêm phường.\nXây dựng đề án thành phố.', value: 'ĐỀ ÁN ĐÔ THỊ', label: 'THÀNH PHỐ HƯNG YÊN', detail: 'Các nhiệm vụ cần thực hiện theo lộ trình.', graphic: 'checklist' },
      ],
      [
        { anchor: '', title: 'Không chỉ đổi\ncấp hành chính.', value: 'ĐA TRUNG TÂM', label: 'ĐỊNH HƯỚNG ĐA CỰC • ĐA TRUNG TÂM', detail: 'Không dồn mọi nguồn lực vào một khu vực.', graphic: 'network', tone: 'teal' },
        { anchor: 'mà hình thành', title: 'Nhiều cực tăng trưởng.\nKết nối cùng phát triển.', value: 'LIÊN VÙNG', label: 'GIAO THÔNG & HẠ TẦNG KẾT NỐI', detail: 'Liên kết các cực tăng trưởng với nhau.', graphic: 'network', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Mục tiêu 2030:\nđô thị hóa tối thiểu 55%.', value: '≥55%', label: 'TỶ LỆ ĐÔ THỊ HÓA • MỤC TIÊU 2030', detail: 'Một nửa số phường đạt trình độ loại II trở lên.', graphic: 'stats', focus: '55%' },
        { anchor: 'một nửa', title: 'Một nửa số phường:\ntrình độ loại II trở lên.', value: '50%', label: 'SỐ PHƯỜNG • MỤC TIÊU PHÁT TRIỂN ĐÔ THỊ', detail: 'Chỉ tiêu đặt ra cho giai đoạn đến năm 2030.', graphic: 'stats', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Ít nhất hai\nđầu mối giao thông.', value: '≥2 CÔNG TRÌNH', label: 'ĐẦU MỐI GIAO THÔNG CẤP KHU VỰC', detail: 'Mục tiêu hoàn thành các hạ tầng đầu mối.', graphic: 'mobility' },
        { anchor: 'như ga', title: 'Ga đô thị. Cao tốc.\nCảng cạn ICD.', value: 'HẠ TẦNG', label: 'VÍ DỤ VỀ CÁC LOẠI HÌNH ĐẦU MỐI', detail: 'Kết nối vùng qua mạng lưới giao thông.', graphic: 'mobility', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Thay đổi vị thế.\nNâng cấp diện mạo đô thị.', value: 'HƯNG YÊN', label: 'TĂNG TỐC THEO LỘ TRÌNH', detail: 'Không chỉ là thay đổi trên bản đồ hành chính.', graphic: 'skyline' },
        { anchor: 'Nếu hoàn thành', title: 'Nếu đúng lộ trình:\nhai năm tới đáng chú ý.', value: 'HAI NĂM TỚI', label: 'MỤC TIÊU CẦN ĐƯỢC TRIỂN KHAI', detail: 'Đô thị loại I • Đa trung tâm • Hạ tầng liên vùng.', graphic: 'roadmap', tone: 'teal' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
