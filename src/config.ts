export const VIDEO = {
  fps: 30,
  durationInFrames: 1800,
  width: 1080,
  height: 1920,
} as const;

export const TIMELINE = [
  { id: 'hook', from: 0, duration: 5 },
  { id: 'situation', from: 5, duration: 15 },
  { id: 'analysis', from: 20, duration: 20 },
  { id: 'solution', from: 40, duration: 15 },
  { id: 'cta', from: 55, duration: 5 },
] as const;

export type AssetKind = 'home' | 'gold' | 'stock';
export type VideoProps = {
  brand: string;
  series: string;
  showCaptions: boolean;
  theme: {
    background: string;
    panel: string;
    text: string;
    muted: string;
    accent: string;
    danger: string;
    gold: string;
  };
  audio: { voiceover: string; music: string; musicVolume: number };
  copy: {
    sections: string[];
    hook: {
      eyebrow: string;
      wealth: string;
      wealthLabel: string;
      bridge: string;
      urgent: string;
      urgentLabel: string;
      question: string;
    };
    situation: {
      title: string;
      subtitle: string;
      assets: { kind: AssetKind; label: string; value: string; risk: string; amount: number }[];
      totalLabel: string;
      totalValue: string;
      emergencyLabel: string;
      emergencyValue: string;
      question: string;
    };
    analysis: {
      title: string;
      wealthTitle: string;
      wealthDetail: string;
      liquidityTitle: string;
      liquidityDetail: string;
      equation: string;
      cards: { title: string; detail: string }[];
      pillars: string[];
    };
    solution: {
      title: string;
      subtitle: string;
      steps: { title: string; detail: string; badge: string }[];
    };
    cta: {
      title: string;
      subtitle: string;
      choices: { label: string; amount: string; detail: string }[];
      action: string;
      footer: string;
    };
    narration: string[];
  };
};

export const defaultProps: VideoProps = {
  brand: 'TIỀN & TƯƠNG LAI',
  series: 'GÓC NHÌN TÀI CHÍNH / 01',
  showCaptions: true,
  theme: {
    background: '#091614',
    panel: '#142724',
    text: '#F3F3E9',
    muted: '#A0B4AA',
    accent: '#C1F581',
    danger: '#FF8A79',
    gold: '#EACB83',
  },
  audio: { voiceover: '', music: '', musicVolume: 0.1 },
  copy: {
    sections: ['NGHỊCH LÝ', 'TÌNH HUỐNG', 'BẢN CHẤT', 'GIẢI PHÁP', 'LỰA CHỌN'],
    hook: {
      eyebrow: 'BẠN CÓ THỂ SỞ HỮU',
      wealth: '3 TỶ',
      wealthLabel: 'TÀI SẢN',
      bridge: 'NHƯNG VẪN CÓ THỂ PHÁ SẢN VÌ THIẾU',
      urgent: '200 TRIỆU',
      urgentLabel: 'TIỀN CẦN GẤP',
      question: 'Ngày mai cần tiền.\nBạn xoay kịp không?',
    },
    situation: {
      title: 'Tài sản nhiều.\nTiền mặt đâu?',
      subtitle: 'MỘT TÌNH HUỐNG RẤT ĐỜI THƯỜNG',
      assets: [
        {
          kind: 'home',
          label: 'BẤT ĐỘNG SẢN',
          value: '2,5 tỷ',
          risk: 'Không thể bán ngay',
          amount: 2500,
        },
        {
          kind: 'gold',
          label: 'VÀNG',
          value: '300 triệu',
          risk: 'Có thể lỗ khi bán lúc này',
          amount: 300,
        },
        {
          kind: 'stock',
          label: 'CỔ PHIẾU',
          value: '200 triệu',
          risk: 'Có thể đang giảm sâu',
          amount: 200,
        },
      ],
      totalLabel: 'TỔNG TÀI SẢN',
      totalValue: '3 TỶ',
      emergencyLabel: 'GIA ĐÌNH CẦN GẤP',
      emergencyValue: '200 triệu',
      question: 'Vậy tiền đâu để sử dụng?',
    },
    analysis: {
      title: 'Giàu tài sản ≠\nChủ động tài chính.',
      wealthTitle: 'GIÀU CÓ',
      wealthDetail: 'Bạn sở hữu\nbao nhiêu?',
      liquidityTitle: 'KHẢ NĂNG\nTÀI CHÍNH',
      liquidityDetail: 'Bạn có thể sử dụng\nbao nhiêu khi cần?',
      equation: 'CÓ TÀI SẢN ≠ CÓ TIỀN MẶT',
      cards: [
        {
          title: '3 tỷ · Không có quỹ dự phòng',
          detail: 'Vẫn có thể bị động trước một việc khẩn cấp.',
        },
        {
          title: 'Ít tài sản · Dòng tiền ổn định',
          detail: 'Có thể chủ động hơn khi cần sử dụng tiền.',
        },
      ],
      pillars: ['KIẾM TIỀN', 'GIỮ TIỀN', 'THANH KHOẢN'],
    },
    solution: {
      title: '3 bước để\nluôn chủ động.',
      subtitle: 'QUẢN LÝ TÀI CHÍNH TỐT HƠN',
      steps: [
        {
          title: 'Xây quỹ dự phòng',
          detail: 'Khoảng 3–6 tháng chi phí thiết yếu, tùy hoàn cảnh.',
          badge: '3–6 THÁNG',
        },
        {
          title: 'Giữ khả năng thanh khoản',
          detail: 'Không đầu tư toàn bộ tiền nhàn rỗi vào tài sản khó bán.',
          badge: 'CÂN ĐỐI TÀI SẢN',
        },
        {
          title: 'Biết khi nào cần tiền',
          detail: 'Trước khi đầu tư, xác định rõ thời điểm cần sử dụng số tiền đó.',
          badge: 'CÓ KẾ HOẠCH',
        },
      ],
    },
    cta: {
      title: 'Bạn chọn\nphương án nào?',
      subtitle: 'TÀI SẢN HAY SỰ CHỦ ĐỘNG?',
      choices: [
        { label: 'A', amount: '3 TỶ', detail: 'Tài sản nhưng không có tiền mặt' },
        { label: 'B', amount: '1 TỶ', detail: 'Tài sản và luôn chủ động dòng tiền' },
      ],
      action: 'BÌNH LUẬN A HOẶC B',
      footer: 'Tôi muốn biết quan điểm của bạn.',
    },
    // Nguyên văn lời dẫn trong remotion.md, theo thứ tự 5 phân cảnh.
    narration: [
      'Bạn có 3 tỷ tài sản, nhưng nếu ngày mai cần gấp 200 triệu, bạn có chắc mình xoay được tiền không? Nghe vô lý đúng không? Nhưng đây là một sai lầm tài chính rất nhiều người đang mắc phải!',
      'Hãy tưởng tượng: Bạn có một căn nhà trị giá 2,5 tỷ, 300 triệu tiền vàng và 200 triệu cổ phiếu. Tổng tài sản là 3 tỷ. Nhưng bất ngờ gia đình cần 200 triệu để giải quyết một việc khẩn cấp. Nhà thì không thể bán ngay, vàng có thể đang lỗ nếu bán lúc này, cổ phiếu thì có thể đang giảm sâu. Vậy tiền đâu để sử dụng?',
      'Đây chính là sự khác biệt giữa GIÀU CÓ và KHẢ NĂNG TÀI CHÍNH. Có tài sản không đồng nghĩa với có tiền mặt. Một người có 3 tỷ tài sản nhưng không có quỹ dự phòng đôi khi còn dễ rơi vào khủng hoảng hơn người có ít tài sản nhưng dòng tiền ổn định. Vì vậy, quản lý tài chính không chỉ là làm sao để kiếm được nhiều tiền hơn, mà còn phải biết giữ tiền và đảm bảo khả năng thanh khoản.',
      '3 bước để quản lý tài chính thật tốt. Một. Luôn xây dựng quỹ dự phòng khoảng 3–6 tháng chi phí thiết yếu, tùy hoàn cảnh. Hai. Không đầu tư toàn bộ tiền nhàn rỗi vào những tài sản khó bán. Ba. Trước khi đầu tư, hãy xác định rõ khi nào bạn cần sử dụng số tiền đó.',
      'Bạn chọn phương án nào: có 3 tỷ tài sản nhưng không có tiền mặt, hay có 1 tỷ tài sản nhưng luôn chủ động về dòng tiền? Hãy bình luận bên dưới. Tôi muốn biết quan điểm của bạn!',
    ],
  },
};
