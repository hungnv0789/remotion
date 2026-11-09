import recording from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'deal', 'transfer', 'technology', 'network', 'industry'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type Recording = typeof recording;
export const defaultProps = {
  brand: 'HẠ TẦNG • VIỆT NAM',
  showCaptions: true,
  theme: {
    background: '#F5F1FC', panel: '#FFFFFF', text: '#24143E',
    muted: '#756982', accent: '#8229E3', teal: '#187A74', border: '#DED2ED',
  },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 0.5,
    audioDurationSeconds: recording.durationSeconds, recording },
  images: { signing: 'images/signing.jpg', ceremony: 'images/alstom-signing.jpg' },
  copy: {
    sections: ['BƯỚC NGOẶT HỢP TÁC', 'VINGROUP × ALSTOM', 'TỪ PHÁP ĐẾN VIỆT NAM', 'CÔNG NGHỆ THẾ HỆ MỚI', 'TẦM NHÌN HÀ NỘI', 'NĂNG LỰC TỰ CHỦ'],
    hook: { title: '200 đoàn tàu.\nMột bước chuyển lớn.', number: '200', unit: 'ĐOÀN TÀU METRO', tag: 'KHÔNG NGƯỜI LÁI', local: '117 đoàn lắp ráp tại Việt Nam' },
    deal: { title: 'Vingroup\nbắt tay Alstom.', subtitle: 'Hợp đồng cung cấp tàu &\nchuyển giao quyền sử dụng công nghệ', date: 'HÀ NỘI · 06.10.2026', shift: 'Mua sắm → Tiếp nhận công nghệ', source: 'Ảnh: Vingroup · Lễ ký kết 06.10.2026' },
    transfer: { title: 'Công nghệ Pháp.\nNăng lực Việt Nam.', france: 'SẢN XUẤT TẠI PHÁP', vietnam: 'LẮP RÁP TẠI VIỆT NAM', first: '83', second: '117', label: 'ĐOÀN TÀU', location: 'Valenciennes Petite-Forêt', note: 'Công nghệ · Chuyên môn · Linh kiện', share: '58,5% số đoàn tàu lắp ráp trong nước' },
    technology: { title: 'Tự động hoàn toàn.\nThiết kế để tiết kiệm.', automation: 'GoA4', automationLabel: 'CẤP ĐỘ TỰ ĐỘNG HÓA', cars: '5 TOA / ĐOÀN', aluminium: 'Thân hợp kim nhôm', brake: 'Phanh tái sinh', energy: 'Thu hồi năng lượng khi hãm', illustration: 'ĐỒ HỌA MINH HỌA · KHÔNG PHẢI THIẾT KẾ TÀU CHÍNH THỨC' },
    network: { title: 'Hà Nội:\ntầm nhìn đến 2045.', routes: '18', routesLabel: 'TUYẾN', length: '979', lengthLabel: 'KM QUY HOẠCH', note: 'Quy mô quy hoạch toàn mạng lưới;\nkhông phải hiện trạng đã hoàn thành.', schematic: 'SƠ ĐỒ KHÁI NIỆM · KHÔNG THỂ HIỆN TUYẾN THỰC TẾ', contractor: 'Vinhomes: tổng thầu dự án metro' },
    industry: { title: 'Từ tiếp nhận\nđến từng bước tự chủ.', items: ['Lắp ráp ngay tại Việt Nam', 'Tiếp cận công nghệ đường sắt', 'Tham gia chuỗi giá trị toàn cầu'], final: '200 đoàn tàu.\nCơ hội vượt ra ngoài\nmột hợp đồng.', question: 'Bạn kỳ vọng điều gì\nở metro Hà Nội?', cta: 'CHIA SẺ GÓC NHÌN CỦA BẠN ↓', note: 'HỢP TÁC CÔNG NGHIỆP · HƯỚNG TỚI TƯƠNG LAI' },
    footer: 'METRO HÀ NỘI / HỢP TÁC CÔNG NGHỆ',
    keywords: ['200', '117', '83', 'Alstom', 'Vingroup', 'GoA4', 'metro', 'công', 'nghệ'],
  },
};
export type VideoProps = typeof defaultProps;
