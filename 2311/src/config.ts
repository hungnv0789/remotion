import recording from './data/voiceover.json';
import mix from '../public/audio/2311/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'news', 'mechanism', 'loan', 'savings', 'stocks', 'gold', 'oil', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'flow' | 'bars' | 'line' | 'cards' | 'timeline' | 'comparison';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string; nodes: string[]; values: number[]; metrics: string[]; note: string };
export const defaultProps = {
  brand: 'TÀI CHÍNH • VĨ MÔ', issue: '23 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .82, music: 'audio/2311/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/2311/news-sting.wav', stingVolume: .22, source: '2311.mp3' },
  timing: { voiceoverStartSeconds: .2, endingHoldSeconds: .8, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'news-graphics', source: 'src/components/NewsGraphics.tsx', license: 'Original SVG/React financial illustrations' }],
  copy: {
    sections: ['FED PHÁT TÍN HIỆU', 'KỲ VỌNG LÃI SUẤT', 'GIÁ CỦA ĐỒNG TIỀN', 'VÍ DỤ KHOẢN VAY MUA NHÀ', 'DÒNG TIỀN ĐỔI HƯỚNG', 'VÌ SAO CỔ PHIẾU GIẢM?', 'VÀNG & SỨC MẠNH USD', 'GIÁ DẦU & NHU CẦU', 'KỲ VỌNG ĐI TRƯỚC CHÍNH SÁCH'],
    footer: 'LÃI SUẤT / DÒNG TIỀN / ĐỊNH GIÁ',
    keywords: ['Fed', 'lãi', 'suất', '91%', '5%', '7%', 'vàng', 'dầu', 'USD', 'Nasdaq', 'triệu'],
    ticker: 'FED  •  LÃI SUẤT  •  DÒNG TIỀN  •  CHỨNG KHOÁN  •  VÀNG  •  DẦU  •  ',
    scenes: [
  [
    {
      "anchor": "",
      "title": "Fed chưa tăng lãi suất.\nThị trường đã lao dốc?",
      "value": "CHỈ MỘT TÍN HIỆU",
      "label": "CHỨNG KHOÁN • VÀNG • DẦU",
      "detail": "Vì sao lời nói của Fed khiến tài sản biến động?",
      "graphic": "cards",
      "nodes": [
        "CHỨNG KHOÁN",
        "VÀNG",
        "DẦU",
        "LÃI SUẤT"
      ],
      "values": [],
      "metrics": [],
      "tone": "danger",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "vậy mà",
      "title": "Chỉ sau một đêm,\n3 thị trường chao đảo.",
      "value": "TIỀN ĐẮT HƠN?",
      "label": "ĐIỀU GÌ ĐANG XẢY RA?",
      "detail": "Câu trả lời nằm ở giá của đồng tiền.",
      "graphic": "line",
      "nodes": [
        "KỲ VỌNG THỊ TRƯỜNG",
        "DIỄN BIẾN MINH HỌA"
      ],
      "values": [
        9,
        8,
        9,
        6,
        7,
        4,
        3
      ],
      "metrics": [],
      "tone": "danger",
      "note": "ĐƯỜNG GIÁ MINH HỌA • KHÔNG PHẢI DỮ LIỆU GIAO DỊCH"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Biên bản Fed:\nlãi suất có thể tăng thêm.",
      "value": "18 / 11",
      "label": "BIÊN BẢN CUỘC HỌP GẦN NHẤT",
      "detail": "Lạm phát ở Mỹ vẫn chưa chịu hạ.",
      "graphic": "cards",
      "nodes": [
        "BIÊN BẢN FED",
        "LẠM PHÁT",
        "LÃI SUẤT",
        "KỲ VỌNG"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Gần như",
      "title": "Lạm phát chưa hạ.\nÁp lực tăng lãi suất.",
      "value": "FED PHÁT TÍN HIỆU",
      "label": "QUAN ĐIỂM CỦA CÁC QUAN CHỨC",
      "detail": "Thị trường bắt đầu điều chỉnh kỳ vọng.",
      "graphic": "flow",
      "nodes": [
        "LẠM PHÁT",
        "FED",
        "LÃI SUẤT",
        "DÒNG TIỀN",
        "TÀI SẢN"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Ngay lập tức",
      "title": "Thị trường đặt cược\nvào tháng 12.",
      "value": "91%",
      "label": "KỲ VỌNG FED TĂNG LÃI SUẤT",
      "detail": "Kỳ vọng đã đủ tạo ra phản ứng tức thì.",
      "graphic": "bars",
      "nodes": [
        "ĐẶT CƯỢC",
        "CÒN LẠI"
      ],
      "values": [
        91,
        9
      ],
      "metrics": [
        "91%",
        "9%"
      ],
      "tone": "accent",
      "note": "TỶ LỆ ĐƯỢC NÊU • KHÔNG PHẢI CAM KẾT CỦA FED"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Tiền cũng là\nmột món hàng.",
      "value": "LÃI SUẤT = GIÁ TIỀN",
      "label": "HIỂU CƠ CHẾ TỪ GỐC",
      "detail": "Tiền đắt hơn khi lãi suất tăng.",
      "graphic": "comparison",
      "nodes": [
        "MÓN HÀNG",
        "ĐỒNG TIỀN"
      ],
      "values": [],
      "metrics": [
        "GIÁ BÁN",
        "LÃI SUẤT"
      ],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Khi Fed",
      "title": "Chi phí vốn tăng\ntheo chuỗi.",
      "value": "VAY ĐẮT HƠN",
      "label": "FED → NGÂN HÀNG → NGƯỜI VAY",
      "detail": "Ngân hàng vay đắt hơn, bạn cũng vay đắt hơn.",
      "graphic": "flow",
      "nodes": [
        "FED",
        "NGÂN HÀNG",
        "NGƯỜI VAY",
        "DOANH NGHIỆP",
        "HỘ GIA ĐÌNH"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Vay mua nhà:\ncùng khoản nợ 1 tỷ.",
      "value": "1 TỶ ĐỒNG",
      "label": "VÍ DỤ TÍNH LÃI HẰNG NĂM",
      "detail": "Lãi suất 5% → 50 triệu đồng tiền lãi mỗi năm.",
      "graphic": "comparison",
      "nodes": [
        "KHOẢN VAY",
        "LÃI MỖI NĂM"
      ],
      "values": [],
      "metrics": [
        "1 TỶ",
        "50 TRIỆU"
      ],
      "tone": "accent",
      "note": "VÍ DỤ MINH HỌA • DƯ NỢ GIẢ ĐỊNH KHÔNG ĐỔI"
    },
    {
      "anchor": "Lãi suất lên",
      "title": "Lãi suất từ 5%\nlên 7% mỗi năm.",
      "value": "50 → 70 TRIỆU",
      "label": "CHI PHÍ TIỀN LÃI MỖI NĂM",
      "detail": "Căn nhà vẫn vậy. Tiền lãi đã khác.",
      "graphic": "bars",
      "nodes": [
        "LÃI SUẤT 5%",
        "LÃI SUẤT 7%"
      ],
      "values": [
        50,
        70
      ],
      "metrics": [
        "50 TRIỆU",
        "70 TRIỆU"
      ],
      "tone": "danger",
      "note": "MINH HỌA LÃI ĐƠN • CÙNG KHOẢN VAY 1 TỶ ĐỒNG"
    },
    {
      "anchor": "Thêm",
      "title": "Căn nhà y nguyên.\nChi phí tăng thêm.",
      "value": "+20 TRIỆU / NĂM",
      "label": "ĐÓ LÀ TIỀN ĐẮT HƠN",
      "detail": "Chênh lệch 2 điểm phần trăm lãi suất.",
      "graphic": "comparison",
      "nodes": [
        "LÃI SUẤT CŨ",
        "LÃI SUẤT MỚI"
      ],
      "values": [],
      "metrics": [
        "5%",
        "7%"
      ],
      "tone": "danger",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Tiết kiệm\nđược trả lãi cao hơn.",
      "value": "ĐỂ DÀNH NHIỀU HƠN",
      "label": "CHIỀU NGƯỢC LẠI CỦA LÃI SUẤT",
      "detail": "Sức hấp dẫn của tiền gửi tăng lên.",
      "graphic": "flow",
      "nodes": [
        "TIỀN NHÀN RỖI",
        "TIẾT KIỆM",
        "LÃI SUẤT",
        "LỰA CHỌN",
        "DÒNG TIỀN"
      ],
      "values": [],
      "metrics": [],
      "tone": "teal",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Thế là",
      "title": "Vay ít. Tiêu ít.\nĐể dành nhiều hơn.",
      "value": "DÒNG TIỀN ĐỔI HƯỚNG",
      "label": "HÀNH VI THAY ĐỔI THEO GIÁ VỐN",
      "detail": "Lãi suất tác động đến quyết định chi tiêu.",
      "graphic": "cards",
      "nodes": [
        "VAY ÍT ĐI",
        "TIÊU ÍT ĐI",
        "TĂNG TIẾT KIỆM",
        "GIỮ TIỀN MẶT"
      ],
      "values": [],
      "metrics": [],
      "tone": "teal",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Tiền đắt lên.\nTài sản phải định giá lại.",
      "value": "ĐỊNH GIÁ LẠI",
      "label": "CỔ PHIẾU CHỊU HAI TÁC ĐỘNG",
      "detail": "Chi phí doanh nghiệp và lựa chọn của nhà đầu tư.",
      "graphic": "cards",
      "nodes": [
        "CHI PHÍ VỐN",
        "LỢI NHUẬN",
        "TRÁI PHIẾU",
        "CỔ PHIẾU"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Thứ nhất",
      "title": "Lãi vay cao hơn,\nlợi nhuận chịu áp lực.",
      "value": "01 • CHI PHÍ VỐN",
      "label": "LÃI VAY TĂNG → LỢI NHUẬN GIẢM",
      "detail": "Doanh nghiệp phải trả chi phí tài chính cao hơn.",
      "graphic": "flow",
      "nodes": [
        "LÃI VAY TĂNG",
        "DOANH NGHIỆP",
        "CHI PHÍ VỐN",
        "LỢI NHUẬN",
        "ĐỊNH GIÁ"
      ],
      "values": [],
      "metrics": [],
      "tone": "danger",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Thứ hai",
      "title": "Trái phiếu Mỹ\ntrở nên hấp dẫn hơn.",
      "value": "~5% / NĂM",
      "label": "LỢI SUẤT TRÁI PHIẾU ĐƯỢC NÊU",
      "detail": "Nhà đầu tư cân nhắc lại phần bù cho rủi ro.",
      "graphic": "comparison",
      "nodes": [
        "TRÁI PHIẾU MỸ",
        "CỔ PHIẾU"
      ],
      "values": [],
      "metrics": [
        "~5%",
        "RỦI RO"
      ],
      "tone": "teal",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "nhiều nhà đầu tư",
      "title": "Nắm giữ cổ phiếu:\nrủi ro có đáng không?",
      "value": "02 • LỰA CHỌN VỐN",
      "label": "DÒNG TIỀN TÌM KIẾM LỢI SUẤT",
      "detail": "Kênh đầu tư cạnh tranh với nhau.",
      "graphic": "flow",
      "nodes": [
        "DÒNG TIỀN",
        "LỢI SUẤT",
        "CỔ PHIẾU",
        "TRÁI PHIẾU",
        "TIỀN GỬI"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Tiền rút khỏi",
      "title": "S&P 500 giảm\n5 phiên liên tiếp.",
      "value": "5 PHIÊN",
      "label": "ÁP LỰC RÚT TIỀN KHỎI CỔ PHIẾU",
      "detail": "Kỳ vọng lãi suất phản ánh vào giá thị trường.",
      "graphic": "line",
      "nodes": [
        "S&P 500",
        "5 PHIÊN GIẢM LIÊN TIẾP"
      ],
      "values": [
        10,
        9,
        7,
        6,
        4
      ],
      "metrics": [],
      "tone": "danger",
      "note": "XU HƯỚNG MINH HỌA • KHÔNG PHẢI MỨC ĐIỂM THỰC TẾ"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Vàng khác cổ phiếu:\nkhông sinh ra lãi.",
      "value": "VÀNG KHÔNG TRẢ LÃI",
      "label": "CHI PHÍ CƠ HỘI CỦA VIỆC GIỮ VÀNG",
      "detail": "Lãi gửi USD cao hơn khiến vàng kém hấp dẫn.",
      "graphic": "comparison",
      "nodes": [
        "GIỮ VÀNG",
        "GỬI USD"
      ],
      "values": [],
      "metrics": [
        "KHÔNG LÃI",
        "CÓ LÃI"
      ],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Khi gửi",
      "title": "Lãi gửi USD cao hơn.\nChi phí cơ hội tăng.",
      "value": "USD ↗",
      "label": "SỨC HẤP DẪN GIỮA CÁC KÊNH ĐẦU TƯ",
      "detail": "Dòng tiền cân nhắc lại việc nắm giữ vàng.",
      "graphic": "flow",
      "nodes": [
        "LÃI SUẤT USD",
        "DÒNG TIỀN",
        "VÀNG",
        "TIỀN GỬI",
        "CHI PHÍ CƠ HỘI"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Đô la mạnh",
      "title": "Đô la mạnh:\nvàng đắt hơn để mua.",
      "value": "SỨC MẠNH USD",
      "label": "VỚI NGƯỜI MUA BẰNG ĐỒNG TIỀN KHÁC",
      "detail": "Giá vàng chịu thêm áp lực từ tỷ giá.",
      "graphic": "comparison",
      "nodes": [
        "USD MẠNH",
        "NGƯỜI MUA VÀNG"
      ],
      "values": [],
      "metrics": [
        "TĂNG GIÁ",
        "TỐN HƠN"
      ],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Thế là",
      "title": "Giá vàng giảm\nxuống vùng thấp.",
      "value": "−3,5%",
      "label": "THẤP NHẤT TỪ THÁNG 9 NĂM NGOÁI",
      "detail": "Hai lực tác động: lãi suất và đồng USD.",
      "graphic": "line",
      "nodes": [
        "GIÁ VÀNG",
        "LÃI SUẤT + TỶ GIÁ"
      ],
      "values": [
        10,
        9,
        9.5,
        7,
        5,
        3
      ],
      "metrics": [],
      "tone": "danger",
      "note": "XU HƯỚNG MINH HỌA • KHÔNG PHẢI DỮ LIỆU GIAO DỊCH"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Lãi suất cao,\nkinh tế chậm lại.",
      "value": "NHU CẦU DẦU GIẢM",
      "label": "CHI TIÊU • SẢN XUẤT • ĐI LẠI",
      "detail": "Nền kinh tế hoạt động ít hơn, cần ít dầu hơn.",
      "graphic": "flow",
      "nodes": [
        "LÃI SUẤT CAO",
        "KINH TẾ",
        "CHI TIÊU",
        "SẢN XUẤT",
        "NHU CẦU DẦU"
      ],
      "values": [],
      "metrics": [],
      "tone": "danger",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Người dân",
      "title": "Tiêu ít. Sản xuất ít.\nĐi lại cũng ít hơn.",
      "value": "ÍT DẦU HƠN",
      "label": "NHU CẦU NĂNG LƯỢNG CHỊU ÁP LỰC",
      "detail": "Chuỗi tác động từ lãi suất tới hàng hóa.",
      "graphic": "cards",
      "nodes": [
        "NGƯỜI TIÊU DÙNG",
        "NHÀ MÁY",
        "GIAO THÔNG",
        "NĂNG LƯỢNG"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Cộng thêm",
      "title": "Tồn kho Mỹ tăng.\nGiá dầu giảm mạnh.",
      "value": "HƠN 3% / NGÀY",
      "label": "MỨC GIẢM ĐƯỢC NÊU CỦA GIÁ DẦU",
      "detail": "Nhu cầu yếu đi, tồn kho lại tăng.",
      "graphic": "line",
      "nodes": [
        "GIÁ DẦU",
        "NHU CẦU ↓ • TỒN KHO ↑"
      ],
      "values": [
        10,
        9,
        8,
        8.5,
        6,
        3
      ],
      "metrics": [],
      "tone": "danger",
      "note": "XU HƯỚNG MINH HỌA • KHÔNG PHẢI DỮ LIỆU GIAO DỊCH"
    }
  ],
  [
    {
      "anchor": "",
      "title": "Nhưng không phải\ntất cả đều giảm.",
      "value": "NASDAQ TĂNG NHẸ",
      "label": "CỔ PHIẾU CHIP TẠO KHÁC BIỆT",
      "detail": "Mỗi nhóm ngành vẫn có câu chuyện riêng.",
      "graphic": "cards",
      "nodes": [
        "NASDAQ",
        "CỔ PHIẾU CHIP",
        "CÂU CHUYỆN RIÊNG",
        "CHỌN LỌC"
      ],
      "values": [],
      "metrics": [],
      "tone": "teal",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Điều quan trọng",
      "title": "Thông điệp Fed:\nưu tiên dập lạm phát.",
      "value": "LẠM PHÁT",
      "label": "CHẤP NHẬN KINH TẾ CHẬM LẠI",
      "detail": "Nhà đầu tư phản ứng trước khi chính sách đổi.",
      "graphic": "flow",
      "nodes": [
        "FED",
        "CHÍNH SÁCH",
        "LẠM PHÁT",
        "KINH TẾ",
        "KỲ VỌNG"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Hãy nhớ",
      "title": "Khi tiền đắt lên,\ntài sản phải định giá lại.",
      "value": "HIỂU GIÁ CỦA TIỀN",
      "label": "LÃI SUẤT → DÒNG TIỀN → ĐỊNH GIÁ",
      "detail": "Đây là cơ chế xuyên suốt câu chuyện.",
      "graphic": "cards",
      "nodes": [
        "LÃI SUẤT",
        "DÒNG TIỀN",
        "CHI PHÍ VỐN",
        "ĐỊNH GIÁ"
      ],
      "values": [],
      "metrics": [],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    },
    {
      "anchor": "Và Fed",
      "title": "Fed mới chỉ nói.\nThị trường đã phản ứng.",
      "value": "KỲ VỌNG ĐI TRƯỚC",
      "label": "THEO DÕI DÒNG TIỀN VÀ CHÍNH SÁCH",
      "detail": "Giá tài sản phản ánh cả kỳ vọng tương lai.",
      "graphic": "comparison",
      "nodes": [
        "FED",
        "THỊ TRƯỜNG"
      ],
      "values": [],
      "metrics": [
        "TÍN HIỆU",
        "PHẢN ỨNG"
      ],
      "tone": "accent",
      "note": "SƠ ĐỒ MINH HỌA CƠ CHẾ"
    }
  ]
] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
