import recording from './data/voiceover.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'spending', 'debt', 'car', 'saving', 'horizon', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'TIỀN BẠC • THÓI QUEN', issue: '12 / 11', showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  copy: {
    sections: ['MUA NHỎ, BỎ LỠ LỚN?', 'KHOẢN NHỎ CỘNG DỒN', 'VÒNG LẶP NỢ', 'CHI PHÍ SỞ HỮU', 'ƯU TIÊN TÍCH LŨY', 'SỨC MẠNH THỜI GIAN', 'BẮT ĐẦU TỪ HÔM NAY'],
    footer: 'TIÊU DÙNG / TÍCH LŨY / TÀI SẢN', keywords: ['tích', 'lũy', 'tiêu', 'dùng', 'tài', 'sản', 'nhỏ', 'nợ', 'chi', 'phí'],
    hook: { title: 'Khó mua thứ lớn.\nDễ tiêu vào thứ nhỏ?', labels: ['Tài sản lớn', 'Mua sắm nhỏ'], amount: '5–10', unit: 'TRIỆU ĐỒNG', patience: 'Nóng ruột\nhay kiên nhẫn tích lũy?', comparison: 'Người khác đi trước.\nMình càng sốt ruột?', note: 'ĐỪNG ĐỂ NÓNG VỘI DẪN DẮT CHI TIÊU' },
    spending: { title: 'Khoản nhỏ.\nCộng lại không nhỏ.', items: ['Một cốc trà sữa', 'Vài món lặt vặt', 'Thêm một lần mua'], tag: 'TÍCH TIỂU THÀNH ĐẠI', shift: 'Không phải tiêu tiền là xấu.\nQuan trọng là ưu tiên.', takeaway: 'Tiêu xài hay kiến tạo tài sản?' },
    debt: { title: 'Kiếm tiền. Tiêu tiền.\nRồi lại trả nợ.', nodes: ['Kiếm tiền', 'Tiêu dùng', 'Vay thêm', 'Trả nợ'], label: 'VÒNG LẶP DÒNG TIỀN', takeaway: 'Tiền tiếp tục\nchảy khỏi tay.' },
    car: { title: 'Giá mua xe\nchỉ là khởi đầu.', amount: '150–200', unit: 'TRIỆU ĐỒNG', tag: 'MUA XE', costTitle: 'Sở hữu thêm.\nChi phí đi kèm thêm.', costs: ['Cà phê & đi lại', 'Gửi xe', 'Các khoản sử dụng khác'], note: 'GIÁ MUA ≠ TỔNG CHI PHÍ SỞ HỮU' },
    saving: { title: 'Ưu tiên tích lũy.\nTừng chút một.', items: ['Bớt tiêu dùng theo cảm xúc', 'Giữ lại từng khoản nhỏ', 'Kiên nhẫn xây tài sản'], home: 'Từng khoản nhỏ.\nHướng tới tài sản lớn.' },
    horizon: { title: 'Kiên nhẫn hôm nay.\nNền tảng cho ngày mai.', milestones: ['5', '10', '15–20'], unit: 'NĂM', note: 'THỜI GIAN · KỶ LUẬT · TÍCH LŨY' },
    closing: { title: 'Những năm sung sức\nkhông kéo dài mãi.', final: 'Bắt đầu tích lũy.\nNgay từ hôm nay.', note: 'ƯU TIÊN HIỆN TẠI · XÂY DỰNG DÀI HẠN' },
  },
};
export type VideoProps = typeof defaultProps;
