import recording from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'china', 'land', 'cycle', 'capital', 'urban', 'evolution', 'vietnam', 'debate', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'GÓC NHÌN • KINH TẾ',
  issue: '10 / 11',
  showCaptions: true,
  theme: {
    background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A',
    accent: '#8229E3', teal: '#197E78', border: '#E3D6EF',
  },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  copy: {
    sections: ['DÒNG VỐN & TĂNG TRƯỞNG', 'NHÌN LẠI TRUNG QUỐC', 'NGUỒN LỰC TỪ ĐẤT', 'VÒNG LẶP HẠ TẦNG', 'HUY ĐỘNG NGUỒN LỰC', 'ĐÔ THỊ HÓA & VỐN NGOẠI', 'CHUYỂN ĐỔI MÔ HÌNH', 'CÂU CHUYỆN VIỆT NAM', 'HAI GÓC NHÌN', 'HẠ TẦNG & GIÁ TRỊ'],
    footer: 'BẤT ĐỘNG SẢN / HẠ TẦNG / TĂNG TRƯỞNG',
    keywords: ['Việt', 'Nam', 'Trung', 'Quốc', 'vốn', 'đất', 'hạ', 'tầng', 'FDI', 'tăng', 'trưởng', 'đô', 'thị'],
    hook: { title: 'Tiền từ đất.\nĐộng lực từ hạ tầng.', tag: 'MỘT MÔ HÌNH TĂNG TRƯỞNG', flow: ['Bất động sản', 'Nguồn vốn', 'Hạ tầng'], question: 'Vì sao Việt Nam\nchọn bơm tiền mạnh?' },
    china: { title: 'Trung Quốc:\nđòn bẩy tăng trưởng.', tag: 'TỪ THẬP NIÊN 1990', value: '10%', label: 'TĂNG TRƯỞNG TRONG LỜI DẪN', period: '3 THẬP KỶ', rank: '#2', rankLabel: 'QUY MÔ KINH TẾ THẾ GIỚI', progression: ['Nguồn lực từ đất', 'Tăng trưởng', 'Vị thế kinh tế'] },
    land: { title: 'Nguồn lực\ntừ đất đai.', year: '1994', yearLabel: 'CẢI CÁCH THUẾ', first: 'Ngân sách địa phương', second: 'Nguồn thu từ đất', arrow: 'Giảm → Tìm nguồn bù đắp', graphTitle: 'NGUỒN THU TỪ ĐẤT TĂNG', graphNote: 'Minh họa xu hướng theo lời dẫn', takeaway: 'Đất đai trở thành\nnguồn lực đầu tư.' },
    cycle: { title: 'Một vòng vốn.\nNhiều lớp tác động.', nodes: ['Nguồn thu từ đất', 'Đầu tư hạ tầng', 'Giá trị đất gia tăng', 'Tái đầu tư'], loop: 'VÒNG LẶP NGUỒN LỰC', note: 'Sân bay · Đường sắt · Đô thị' },
    capital: { title: '4 mục tiêu.\nBắt đầu từ nguồn vốn.', first: 'Huy động vốn nhanh', firstDetail: 'Tạo nguồn lực cho tăng trưởng.', second: 'Nguồn thu trong nước', secondDetail: 'Giảm phụ thuộc vào nợ quốc tế.', focus: 'NGUỒN VỐN → ĐỘNG LỰC PHÁT TRIỂN' },
    urban: { title: 'Đô thị hóa.\nMở rộng sức tiêu thụ.', tag: 'MỤC TIÊU 03 / 04', rate: '50%', rateLabel: 'TỶ LỆ ĐÔ THỊ HÓA TRONG BẢN THU', population: '>215', populationLabel: 'TRIỆU NGƯỜI DỊCH CHUYỂN ĐÔ THỊ', fdiTitle: 'Hạ tầng tốt.\nVốn ngoại tìm đến.', fdiTag: 'MỤC TIÊU 04 / 04', fdi: 'FDI', fdiLabel: 'VỐN ĐẦU TƯ NƯỚC NGOÀI', channels: ['Hạ tầng hiện đại', 'Thị trường tiêu thụ', 'Tập đoàn đa quốc gia'] },
    evolution: { title: 'Từ đòn bẩy vốn\nđến tăng trưởng bền vững.', nodes: ['Công nghệ lõi', 'Tiêu dùng', 'Sản xuất'], tag: 'CHUYỂN ĐỔI MÔ HÌNH' },
    vietnam: { title: 'Việt Nam:\nnhững bước bản lề.', year: '2025', yearLabel: 'MỐC KHỞI ĐỘNG TRONG LỜI DẪN', policyTitle: 'Đất đai &\nnguồn lực ngân sách.', policies: ['Chính sách đất đai', 'Nguồn thu ngân sách', 'Đầu tư công'], buildTitle: 'Kết nối hạ tầng.\nMở rộng chuỗi cung ứng.', projects: ['Sân bay', 'Cảng biển', 'Thu hút FDI'], corridor: 'BẮC → NAM' },
    debate: { title: 'Bơm tiền mạnh:\nnhìn từ hai phía.', risk: 'ÁP LỰC TIỀN TỆ', riskDetail: 'Lo ngại về giá trị đồng tiền.', growth: 'KỲ VỌNG TĂNG TRƯỞNG', growthDetail: 'Tầm nhìn dài hạn của lời dẫn.', year: '2045', yearLabel: 'TẦM NHÌN ĐƯỢC NHẮC TỚI' },
    closing: { title: 'Hạ tầng kết nối.\nGiá trị dịch chuyển.', items: ['Bất động sản dòng tiền', 'Đô thị vệ tinh', 'Kết nối hạ tầng'], note: 'CÁC CHỦ ĐỀ ĐƯỢC NHẮC TRONG BẢN THU', final: 'Hiểu dòng vốn.\nNhìn dài hạn.', question: 'Bạn nhìn nhận thế nào\nvề mô hình tăng trưởng này?', cta: 'CHIA SẺ GÓC NHÌN CỦA BẠN ↓' },
  },
};
export type VideoProps = typeof defaultProps;
