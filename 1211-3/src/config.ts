import recording from './data/voiceover.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'vinpearl', 'retail', 'visitors', 'sectors', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'DOANH NGHIỆP • TIÊU ĐIỂM', issue: '12 / 11', showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  copy: {
    sections: ['HAI ĐỘNG LỰC TĂNG TRƯỞNG', 'VINPEARL / DU LỊCH', 'VINCOM RETAIL / BÁN LẺ', 'DÒNG KHÁCH THỰC TẾ', 'HAI LĨNH VỰC ĐÓNG GÓP', 'GÓC NHÌN CỦA BẠN'],
    footer: 'DU LỊCH / BÁN LẺ / KẾT QUẢ KINH DOANH', keywords: ['Vinpearl', 'Vincom', 'Retail', 'lợi', 'nhuận', 'tăng', 'khách', 'triệu', 'tỷ'],
    hook: { title: 'Nhóm Vin:\nhai động lực tăng trưởng.', pearl: 'VINPEARL', growth: '6,6', growthUnit: 'LẦN', retail: 'VINCOM RETAIL', profit: '≈4.800', profitUnit: 'TỶ ĐỒNG', period: '9', periodUnit: 'THÁNG ĐẦU NĂM', wideTitle: 'Bức tranh không chỉ\ncó bất động sản, xe điện.', sectors: ['Du lịch nghỉ dưỡng', 'Bán lẻ thương mại'] },
    vinpearl: { title: 'Vinpearl:\ndu lịch đóng góp mạnh.', profit: '>2.800', profitUnit: 'TỶ ĐỒNG LỢI NHUẬN', period: 'SAU 9 THÁNG', growth: '6,6 LẦN', growthLabel: 'SO VỚI CÙNG KỲ', note: 'Nghỉ dưỡng · Vui chơi · Trải nghiệm' },
    retail: { title: 'Vincom Retail:\nkết quả tăng trưởng.', nineMonths: '9 THÁNG', quarter: 'RIÊNG QUÝ 3', profit: '4.737', growth: '+25,1%', q3Profit: '1.522', q3Growth: '+10,6%', profitUnit: 'TỶ ĐỒNG LỢI NHUẬN', q3ProfitUnit: 'TỶ ĐỒNG LỢI NHUẬN SAU THUẾ', growthUnit: 'SO VỚI CÙNG KỲ' },
    visitors: { title: 'Phía sau tăng trưởng\nlà những dòng người.', clients: '171,1', clientsUnit: 'TRIỆU LƯỢT KHÁCH / 9 THÁNG', vehicles: '20,4', vehiclesUnit: 'TRIỆU LƯỢT XE', daily: '>700.000', dailyUnit: 'LƯỢT KHÁCH / NGÀY', dailyTitle: 'Nhịp sống\ntrung tâm thương mại.' },
    sectors: { title: 'Hai lĩnh vực.\nCùng tạo sức hút.', pearl: 'DU LỊCH NGHỈ DƯỠNG', pearlDetail: 'Kỳ nghỉ · Vui chơi · Trải nghiệm', retail: 'BÁN LẺ THƯƠNG MẠI', retailDetail: 'Mua sắm · Ăn uống · Giải trí', end: 'Hai cách khai thác nhu cầu tiêu dùng' },
    closing: { title: 'Từ giờ tới Tết âm,\nbạn kỳ vọng điều gì?', cta: 'BÌNH LUẬN GÓC NHÌN CỦA BẠN ↓', note: 'DU LỊCH & BÁN LẺ' },
  },
};
export type VideoProps = typeof defaultProps;
