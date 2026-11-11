import recording from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'congress', 'bank', 'files', 'pivot', 'ai', 'power', 'common', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'THỊ TRƯỜNG • GÓC NHÌN',
  issue: '11 / 11',
  showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#BB496F' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  copy: {
    sections: ['SÓNG GIÓ PHỐ WALL', 'QUYỀN LỰC QUỐC HỘI', 'JPMORGAN & HỒ SƠ', 'ĐIỀU TRA & MINH BẠCH', 'TỪ NGÂN HÀNG ĐẾN AI', 'AI CẦN BAO NHIÊU ĐIỆN?', 'KỲ VỌNG & CHÍNH SÁCH', 'ĐIỂM CHUNG PHÍA SAU', 'GÓC NHÌN DÀI HƠI'],
    footer: 'BẦU CỬ MỸ / NGÂN HÀNG / CÔNG NGHỆ',
    keywords: ['Mỹ', 'Quốc', 'hội', 'JPMorgan', 'Epstein', 'AI', 'điện', 'điều', 'tra', 'công', 'nghệ'],
    illustration: 'ĐỒ HỌA MINH HỌA · KHÔNG PHẢI DỮ LIỆU GIAO DỊCH',
    hook: { title: 'Sóng gió\nsau bầu cử.', value: '2.500', unit: 'TỶ USD', tag: 'CON SỐ MỞ ĐẦU', question: 'Vì sao nhà đầu tư\nquay xe mạnh?', link: 'Bầu cử → Kỳ vọng → Thị trường' },
    congress: { title: 'Quốc hội:\nquyền lực và giám sát.', chamber: '2 VIỆN', tag: 'CÂU CHUYỆN TRONG LỜI DẪN', powers: ['Ngân sách', 'Nhân sự', 'Điều tra'], investigation: 'Quyền điều tra.\nÁp lực công bố hồ sơ.', steps: ['Yêu cầu hồ sơ', 'Làm rõ dòng tiền', 'Đặt câu hỏi'] },
    bank: { title: 'JPMorgan:\nđược nhắc tên.', role: 'NGÂN HÀNG', name: 'JPMorgan', connection: 'HỒ SƠ EPSTEIN', person: 'Jeffrey Epstein', years: '15', yearsUnit: 'NĂM QUAN HỆ KHÁCH HÀNG', flow: '1', flowUnit: 'TỶ USD DÒNG TIỀN', year: '2023', amount: '365', amountUnit: 'TRIỆU USD', settlement: 'Khoản dàn xếp được nhắc trong lời dẫn', qualifier: 'CÁC CON SỐ' },
    files: { title: 'Hồ sơ và dòng tiền.\nAi có quyền yêu cầu?', request: 'YÊU CẦU CÔNG BỐ HỒ SƠ', partyA: 'ĐẢNG DÂN CHỦ', partyB: 'ĐẢNG CỘNG HÒA', actions: ['Yêu cầu điều tra', 'Tranh cãi chính trị'], question: 'Cuốn sổ đang\nche giấu điều gì?', questionLabel: 'CÂU HỎI ĐƯỢC ĐẶT TRONG LỜI DẪN' },
    pivot: { title: 'JPMorgan giảm.\nNhưng chưa hết chuyện.', value: '−4%', label: 'MỨC GIẢM', techTitle: 'Vì sao công nghệ\nvà AI chịu áp lực?', tag: 'CHUYỂN GÓC NHÌN', chips: ['Công nghệ', 'AI'] },
    ai: { title: 'AI cần dữ liệu.\nDữ liệu cần điện.', label: 'TRUNG TÂM DỮ LIỆU', tag: 'HẠ TẦNG PHÍA SAU AI', demand: 'Nhu cầu điện tăng', concern: 'Điện cho AI\nhay cho đời sống?', people: 'Người dân', technology: 'Trung tâm dữ liệu', note: 'CẠNH TRANH NGUỒN LỰC TRONG LỜI DẪN' },
    power: { title: 'Chính sách đổi.\nKỳ vọng đổi theo.', steps: ['Lo ngại của người dân', 'Chính sách giám sát', 'Tiến độ trung tâm dữ liệu'], impactTitle: 'Tiến độ xây dựng\nảnh hưởng kỳ vọng AI.', impactSteps: ['Trung tâm dữ liệu', 'Tốc độ phát triển AI', 'Kỳ vọng nhà đầu tư'], tag: 'CHUỖI TÁC ĐỘNG ĐƯỢC PHÂN TÍCH' },
    common: { title: 'Hai nhóm cổ phiếu.\nMột điểm chung.', banks: 'Ngân hàng', tech: 'Công nghệ & AI', center: 'MÔI TRƯỜNG CHÍNH SÁCH', message: 'Rủi ro giám sát.\nKỳ vọng được định giá lại.' },
    closing: { title: 'Khi chính trị\nđi vào giá cổ phiếu.', steps: ['Bầu cử', 'Giám sát', 'Kỳ vọng thị trường'], date: '03 / 11', dateLabel: 'MỐC THỜI GIAN', final: 'Đọc thị trường.\nNhìn cả chính sách.', question: 'Bạn nhìn nhận thế nào\nvề phản ứng của Phố Wall?', cta: 'CHIA SẺ GÓC NHÌN CỦA BẠN ↓' },
  },
};
export type VideoProps = typeof defaultProps;
