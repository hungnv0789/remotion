export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = [
  'hook',
  'question',
  'provision',
  'accounting',
  'core',
  'conclusion',
] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type NarrationSegment = { id: string; text: string; pauseAfterSeconds?: number };
export type ScriptScene = { id: SceneId; label: string; segments: NarrationSegment[] };

export type VideoProps = {
  brand: string;
  series: string;
  subject: string;
  status: string;
  showCaptions: boolean;
  theme: {
    background: string;
    panel: string;
    soft: string;
    text: string;
    muted: string;
    primary: string;
    onPrimary: string;
    border: string;
    danger: string;
    dangerSoft: string;
    positive: string;
    positiveSoft: string;
    shadow: string;
  };
  timing: {
    syllablesPerSecond: number;
    commaPauseSeconds: number;
    sentencePauseSeconds: number;
    leadInSeconds: number;
    tailSeconds: number;
    sceneDurationsSeconds: number[];
  };
  audio: { sceneVoiceovers: string[]; music: string; musicVolume: number };
  script: ScriptScene[];
  copy: {
    unit: string;
    revenue: string;
    loss: string;
    provisionValue: string;
    profit: string;
    previousProfit: string;
    growth: string;
    hook: {
      title: string;
      revenueLabel: string;
      lossLabel: string;
      question: string;
      year: string;
    };
    question: {
      title: string;
      growthLabel: string;
      revenueLabel: string;
      lossLabel: string;
      question: string;
    };
    provision: { title: string; amountLabel: string; flow: { title: string; detail: string }[] };
    accounting: {
      title: string;
      left: string;
      right: string;
      leftDetail: string;
      rightDetail: string;
      equation: string;
      takeaway: string;
    };
    core: {
      title: string;
      currentLabel: string;
      previousLabel: string;
      comparison: string;
      pressureTitle: string;
      pressures: string[];
    };
    conclusion: {
      title: string;
      checklist: { title: string; detail: string }[];
      contrasts: { title: string; detail: string }[];
      quote: string;
      question: string;
      choices: string[];
      action: string;
    };
  };
};

export const defaultProps: VideoProps = {
  brand: 'TIỀN & TƯƠNG LAI',
  series: 'GIẢI MÃ DOANH NGHIỆP / 02',
  subject: 'PNJ',
  status: 'KẾ HOẠCH DỰ KIẾN 2026',
  showCaptions: true,
  theme: {
    background: '#F8F4FF',
    panel: '#FFFFFF',
    soft: '#EDE0FF',
    text: '#251139',
    muted: '#796589',
    primary: '#8229e3',
    onPrimary: '#FFFFFF',
    border: '#E1D2EE',
    danger: '#BE315E',
    dangerSoft: '#FCE6EF',
    positive: '#267367',
    positiveSoft: '#E2F3EC',
    shadow: '#45186C0B',
  },
  timing: {
    syllablesPerSecond: 4.2,
    commaPauseSeconds: 0.15,
    sentencePauseSeconds: 0.32,
    leadInSeconds: 0.4,
    tailSeconds: 0.8,
    sceneDurationsSeconds: [],
  },
  audio: { sceneVoiceovers: [], music: '', musicVolume: 0.1 },
  script: [
    {
      id: 'hook',
      label: 'NGHỊCH LÝ',
      segments: [
        { id: 'revenue', text: 'Một doanh nghiệp dự kiến doanh thu hơn 39.000 tỷ đồng,' },
        { id: 'loss', text: 'nhưng lại có thể báo lỗ hơn 6.000 tỷ đồng', pauseAfterSeconds: 1 },
        { id: 'year', text: 'trong năm 2026.' },
        { id: 'reveal', text: 'Bạn có tin không? Đây chính là câu chuyện của PNJ!' },
      ],
    },
    {
      id: 'question',
      label: 'ĐẶT VẤN ĐỀ',
      segments: [
        {
          id: 'growth',
          text: 'Điều đáng chú ý là doanh thu PNJ vẫn dự kiến tăng khoảng 10% so với năm trước.',
        },
        {
          id: 'question',
          text: 'Vậy câu hỏi là: Nếu hoạt động kinh doanh vẫn tạo ra doanh thu tăng trưởng, thì hơn 6.000 tỷ đồng tiền lỗ này thực chất đến từ đâu?',
        },
      ],
    },
    {
      id: 'provision',
      label: 'BÓC TÁCH',
      segments: [
        {
          id: 'amount',
          text: 'Nguyên nhân chính nằm ở khoản chi phí dự phòng hơn 7.000 tỷ đồng mà PNJ dự kiến trích lập.',
        },
        {
          id: 'obligation',
          text: 'Hiểu đơn giản thế này: PNJ có những nghĩa vụ và cam kết thu đổi sản phẩm với khách hàng trong tương lai.',
        },
        {
          id: 'risk',
          text: 'Khi thị trường vàng biến động, doanh nghiệp phải tính đến những rủi ro có thể phát sinh',
        },
        { id: 'record', text: 'và ghi nhận chi phí dự phòng theo nguyên tắc kế toán.' },
      ],
    },
    {
      id: 'accounting',
      label: 'TRÁNH HIỂU NHẦM',
      segments: [
        { id: 'intro', text: 'Và đây là điểm rất nhiều nhà đầu tư dễ nhầm.' },
        {
          id: 'split',
          text: 'Trích lập dự phòng không đồng nghĩa với việc doanh nghiệp ngay lập tức phải chi ra từng ấy tiền mặt.',
        },
        { id: 'profit', text: 'Nó có thể làm lợi nhuận kế toán giảm mạnh,' },
        { id: 'cash', text: 'nhưng không đồng nghĩa dòng tiền thực tế đã mất đi tương ứng.' },
        {
          id: 'takeaway',
          text: 'Đây là lý do chúng ta không thể chỉ nhìn vào con số lợi nhuận âm để kết luận doanh nghiệp đang cạn tiền.',
        },
      ],
    },
    {
      id: 'core',
      label: 'GÓC NHÌN PHẢN BIỆN',
      segments: [
        {
          id: 'current',
          text: 'Nhưng khoan! Nếu loại bỏ khoản dự phòng hơn 7.000 tỷ đồng, PNJ vẫn chỉ dự kiến lãi khoảng 800 tỷ đồng.',
        },
        {
          id: 'previous',
          text: 'So với mục tiêu từng được kỳ vọng khoảng 3.400 tỷ đồng, đây vẫn là một sự suy giảm đáng kể.',
        },
        {
          id: 'pressure',
          text: 'Điều đó cho thấy câu chuyện không chỉ nằm ở kế toán. Hoạt động kinh doanh cốt lõi cũng đang chịu áp lực từ sức mua, giá vàng và chi phí đầu vào.',
        },
      ],
    },
    {
      id: 'conclusion',
      label: 'NHÌN SAU CON SỐ',
      segments: [
        {
          id: 'intro',
          text: 'Vậy nếu đang quan tâm đến cổ phiếu PNJ, tôi nghĩ bạn nên theo dõi 3 thứ:',
        },
        { id: 'cashflow', text: 'Một là dòng tiền kinh doanh thực tế.' },
        { id: 'inventory', text: 'Hai là khả năng quản trị hàng tồn kho.' },
        { id: 'commitments', text: 'Ba là năng lực thực hiện các cam kết thu đổi với khách hàng.' },
        {
          id: 'contrast',
          text: 'Bởi vì một doanh nghiệp báo lỗ chưa chắc đã cạn tiền. Nhưng một doanh nghiệp loại trừ chi phí dự phòng cũng chưa chắc đã kinh doanh tốt.',
        },
        {
          id: 'quote',
          text: 'Đầu tư không phải là đọc một con số. Mà là hiểu điều gì đang thực sự diễn ra phía sau con số đó!',
        },
        {
          id: 'cta',
          text: 'Bạn nghĩ đây là bước đi phòng thủ hợp lý của PNJ hay là tín hiệu cảnh báo về hoạt động kinh doanh? Hãy để lại góc nhìn của bạn ở phần bình luận nhé!',
        },
      ],
    },
  ],
  copy: {
    unit: 'TỶ ĐỒNG',
    revenue: '39.000',
    loss: '−6.000',
    provisionValue: '7.000',
    profit: '800',
    previousProfit: '3.400',
    growth: '+10%',
    hook: {
      title: 'Doanh thu lớn.\nVẫn có thể lỗ?',
      revenueLabel: 'DOANH THU DỰ KIẾN HƠN',
      lossLabel: 'LỢI NHUẬN DỰ KIẾN ÂM HƠN',
      question: 'PNJ ĐANG GẶP CHUYỆN GÌ?',
      year: '2026',
    },
    question: {
      title: 'Doanh thu tăng.\nVì sao lợi nhuận âm?',
      growthLabel: 'SO VỚI NĂM TRƯỚC',
      revenueLabel: 'DOANH THU DỰ KIẾN HƠN',
      lossLabel: 'LỢI NHUẬN DỰ KIẾN ÂM HƠN',
      question: 'Khoản lỗ thực chất đến từ đâu?',
    },
    provision: {
      title: 'Điểm mấu chốt:\nkhoản dự phòng.',
      amountLabel: 'CHI PHÍ DỰ PHÒNG DỰ KIẾN HƠN',
      flow: [
        { title: 'Cam kết thu đổi', detail: 'Nghĩa vụ với khách hàng trong tương lai.' },
        { title: 'Thị trường biến động', detail: 'Tính đến những rủi ro có thể phát sinh.' },
        { title: 'Ghi nhận chi phí', detail: 'Dự phòng theo nguyên tắc kế toán.' },
      ],
    },
    accounting: {
      title: 'Lỗ kế toán.\nTiền mặt đã mất?',
      left: 'BÁO CÁO\nLỢI NHUẬN',
      right: 'TIỀN MẶT\n& DÒNG TIỀN',
      leftDetail: 'Ghi nhận chi phí\nLợi nhuận có thể giảm',
      rightDetail: 'Không đồng nghĩa\nphải chi ngay tương ứng',
      equation: 'LỖ KẾ TOÁN\n≠ DÒNG TIỀN MẤT ĐI',
      takeaway: 'Một con số lợi nhuận âm chưa đủ để kết luận doanh nghiệp cạn tiền.',
    },
    core: {
      title: 'Nhưng khoan.\nLõi kinh doanh thì sao?',
      currentLabel: 'LÃI DỰ KIẾN KHI LOẠI TRỪ DỰ PHÒNG',
      previousLabel: 'KỲ VỌNG TRƯỚC ĐÓ',
      comparison: 'Khoảng cách vẫn rất lớn.',
      pressureTitle: 'KINH DOANH CỐT LÕI VẪN CÓ ÁP LỰC',
      pressures: ['Sức mua', 'Giá vàng', 'Chi phí đầu vào'],
    },
    conclusion: {
      title: 'Theo dõi 3 thứ.\nĐọc sau những con số.',
      checklist: [
        { title: 'Dòng tiền kinh doanh', detail: 'Tiền thực tế tạo ra từ hoạt động.' },
        { title: 'Quản trị hàng tồn kho', detail: 'Chất lượng và khả năng xoay vòng.' },
        { title: 'Năng lực thực hiện cam kết', detail: 'Nghĩa vụ thu đổi với khách hàng.' },
      ],
      contrasts: [
        { title: 'BÁO LỖ', detail: 'Chưa chắc đã cạn tiền.' },
        { title: 'LOẠI TRỪ DỰ PHÒNG', detail: 'Chưa chắc đã kinh doanh tốt.' },
      ],
      quote: 'ĐỪNG CHỈ NHÌN LỢI NHUẬN\nHÃY NHÌN CHẤT LƯỢNG DÒNG TIỀN',
      question: 'Bạn nhìn câu chuyện\nPNJ như thế nào?',
      choices: ['Phòng thủ hợp lý', 'Tín hiệu cảnh báo'],
      action: 'ĐỂ LẠI GÓC NHÌN CỦA BẠN ↓',
    },
  },
};
