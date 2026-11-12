import recording from './data/voiceover.json';

export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'comparison', 'conditions', 'concentration', 'liquidity', 'solution', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'TÀI CHÍNH • ĐỜI SỐNG',
  issue: '12 / 11',
  showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: 1 },
  timing: { voiceoverStartSeconds: 0, endingHoldSeconds: 1, audioDurationSeconds: recording.durationSeconds, recording },
  finance: { principal: 1_000_000_000, largeBankRate: 8.1, smallBankRate: 9.2, termYears: 1, insuranceLimit: 350_000_000 },
  copy: {
    sections: ['BẠN CHỌN NGÂN HÀNG NÀO?', 'CHÊNH LỆCH BAO NHIÊU?', 'LÃI SUẤT CÓ THỰC NHẬN?', 'RỦI RO TẬP TRUNG', 'THANH KHOẢN & AN TÂM', 'CHIA TIỀN THEO NHU CẦU', 'LỰA CHỌN CỦA BẠN'],
    footer: 'TIỀN GỬI / THANH KHOẢN / AN TÂM',
    keywords: ['tỷ', '8,1%', '9,2%', '11', 'triệu', 'thanh', 'khoản', 'rủi', 'ro', 'an', 'tâm', 'kỳ', 'hạn'],
    units: { billion: 'TỶ ĐỒNG', million: 'TRIỆU ĐỒNG', annual: '% / NĂM' },
    hook: { title: 'Có 1 tỷ.\nBạn gửi ở đâu?', first: 'NGÂN HÀNG LỚN', second: 'NGÂN HÀNG NHỎ', or: 'HAY', question: 'Lãi cao hơn.\nCó phải tốt hơn?', gift: 'Lãi suất · Quà tặng · Điều kiện' },
    comparison: { title: 'Tính lãi.\nRồi tính thêm điều khác.', extraLabel: 'CHÊNH LỆCH SAU 1 NĂM', interestLabel: 'TIỀN LÃI / KỲ HẠN 1 NĂM', first: 'Lãi 8,1%', second: 'Lãi 9,2%', monthlyTitle: 'Chưa tới 1 triệu\nmỗi tháng.', monthlyLabel: 'CHÊNH LỆCH BÌNH QUÂN / THÁNG', takeaway: 'Đừng chỉ nhìn\nvào lãi suất.', details: ['Lãi thực nhận', 'Mức độ tập trung', 'Nhu cầu dùng tiền'] },
    conditions: { title: '9,2%:\ncó thực nhận?', tag: '01 / KIỂM TRA ĐIỀU KIỆN', items: ['Kỳ hạn áp dụng', 'Số dư tối thiểu', 'Điều kiện khuyến mại'], earlyTitle: 'Cần tiền gấp.\nRút trước hạn thì sao?', early: 'RÚT TRƯỚC HẠN', earlyDetail: 'Khoản chênh lệch có thể không còn.', review: 'Đọc kỹ điều kiện trước khi gửi' },
    concentration: { title: 'Đừng dồn hết\nvào một nơi.', tag: '02 / RỦI RO TẬP TRUNG', limitLabel: 'HẠN MỨC CHI TRẢ BẢO HIỂM', scope: 'Tối đa / cá nhân / ngân hàng', includes: 'Bao gồm cả gốc và lãi', date: 'TỪ 13 / 07', oneBank: 'Một ngân hàng duy nhất', question: 'Một tỷ đồng.\nMột nơi giữ tiền?', takeaway: 'Cân nhắc mức độ tập trung' },
    liquidity: { title: 'Tiền cần sẵn.\nTâm cần an.', tag: '03 / TÍNH THANH KHOẢN', items: [{ title: 'Dễ rút khi cần', detail: 'Phù hợp dòng tiền của gia đình.' }, { title: 'Thuận tiện sử dụng', detail: 'Cân đối với nhu cầu thực tế.' }, { title: 'An tâm mỗi ngày', detail: 'Sự thảnh thơi cũng có giá trị.' }], restTitle: 'Ngủ ngon mỗi đêm\ncũng là một giá trị.', restLabel: 'LÃI SUẤT + SỰ THUẬN TIỆN + AN TÂM' },
    solution: { title: 'Chia dòng tiền.\nKhớp nhu cầu sử dụng.', lanes: ['Nhu cầu gần', 'Kỳ hạn phù hợp', 'Nhu cầu dài hơn'], end: 'Chia kỳ hạn · Giữ khả năng chủ động' },
    closing: { title: 'Trước 1 tỷ đồng,\nbạn chọn an tâm thế nào?', choices: ['Lãi thực nhận', 'Thanh khoản', 'An tâm'], cta: 'BÌNH LUẬN CÙNG THẢO LUẬN ↓', final: 'Lãi suất là một phần.\nChủ động mới dài lâu.' },
  },
};
export type VideoProps = typeof defaultProps;
