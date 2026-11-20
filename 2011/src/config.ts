import recording from './data/voiceover.json';
import mix from '../public/audio/2011/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'arrival', 'history', 'protocol', 'vietnam', 'china', 'russia', 'nuclear', 'iran', 'technology', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export type GraphicKind = 'summit' | 'contrast' | 'arrival' | 'history' | 'protocol' | 'group' | 'trade' | 'russia' | 'nuclear' | 'treaty' | 'iran' | 'chips' | 'alignment' | 'conflicts';
export type Shot = { anchor: string; title: string; value: string; label: string; detail: string; graphic: GraphicKind; tone?: 'danger' | 'teal' | 'accent'; focus?: string };
export const defaultProps = {
  brand: 'BÌNH LUẬN • QUỐC TẾ', issue: '20 / 11', showCaptions: true,
  theme: { background: '#F8F3FD', panel: '#FFFFFF', text: '#2B163E', muted: '#7B6B89', accent: '#8229e3', teal: '#197D7B', border: '#E6D9F1', danger: '#CE4567' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .82, music: 'audio/2011/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/2011/news-sting.wav', stingVolume: .22, source: '2011.mp3' },
  timing: { voiceoverStartSeconds: .2, endingHoldSeconds: .8, audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3 },
  assets: [{ id: 'world-graphics', source: 'src/components/WorldGraphics.tsx', license: 'Original SVG/React editorial illustrations' }],
  copy: {
    sections: ['APEC • MỸ – TRUNG – NGA', 'NGHI THỨC ĐÓN TIẾP', 'DẤU ẤN NGOẠI GIAO', 'KHÁC BIỆT TRONG LỄ ĐÓN', 'GÓC NHÌN VỀ VIỆT NAM', 'TRUNG QUỐC • THƯƠNG MẠI', 'NGA • TRỪNG PHẠT & HỢP TÁC', 'MỸ • VẤN ĐỀ HẠT NHÂN', 'IRAN • TRUNG ĐÔNG', 'CÔNG NGHỆ BÁN DẪN', 'NHỮNG BẤT ĐỒNG CÒN LẠI'],
    footer: 'APEC / NGOẠI GIAO / KINH TẾ', keywords: ['APEC', 'Mỹ', 'Trung', 'Quốc', 'Nga', 'Việt', 'Nam', 'thuế', 'quan', 'AI', 'START'],
    ticker: 'APEC  •  NGOẠI GIAO  •  THƯƠNG MẠI  •  KINH TẾ SỐ  •  CÔNG NGHỆ  •  AN NINH  •  ',
    illustration: 'ĐỒ HỌA MINH HỌA',
    countries: ['MỸ', 'TRUNG QUỐC', 'NGA', 'VIỆT NAM', 'HÀN QUỐC', 'NHẬT BẢN', 'IRAN', 'UKRAINE', 'MALAYSIA', 'SINGAPORE'],
    leaders: ['Donald Trump', 'Tập Cận Bình', 'Vladimir Putin'], roles: ['TỔNG THỐNG MỸ', 'CHỦ TỊCH TRUNG QUỐC', 'TỔNG THỐNG NGA'],
    summit: ['APEC 2026', 'THÂM QUYẾN • TRUNG QUỐC', 'NGHI THỨC', 'LẬP TRƯỜNG'],
    arrival: ['ĐÓN TẠI SÂN BAY', 'TẬP CẬN BÌNH', 'DONALD TRUMP', 'LỄ ĐÓN • NGHI THỨC NGOẠI GIAO'],
    history: ['1959', 'APEC', 'Mao Trạch Đông', 'Nikita Khrushchev', 'NHÌN LẠI NGHI THỨC ĐÓN TIẾP'],
    protocol: ['Tô Lâm', 'Hàn Quốc', 'Takaichi', 'VIỆT NAM', 'HÀN QUỐC', 'NHẬT BẢN'],
    group: ['HÀN QUỐC', 'HOA KỲ', 'TRUNG QUỐC', 'NGA', 'VIỆT NAM', 'BỐ CỤC MINH HỌA • KHÔNG PHẢI ẢNH SỰ KIỆN'],
    trade: ['THUẾ QUAN', 'THƯƠNG MẠI TỰ DO', 'KINH TẾ SỐ', 'AI & CÔNG NGHỆ', 'HỢP TÁC CHÂU Á – THÁI BÌNH DƯƠNG'],
    russia: ['TRỪNG PHẠT', 'THUẾ QUAN', 'HẠN CHẾ XUẤT KHẨU', 'CHÂU Á – THÁI BÌNH DƯƠNG', 'NGA ↔ TRUNG QUỐC'],
    nuclear: ['KIỂM SOÁT ĐẦU ĐẠN', 'MỸ', 'NGA', 'TRUNG QUỐC', 'THẢO LUẬN VỀ HẠT NHÂN'],
    treaty: ['START', 'NGA – MỸ', 'THÁNG 5', 'VẤN ĐỀ HIỆP ƯỚC & KIỂM SOÁT'],
    iran: ['IRAN', 'TRUNG ĐÔNG', 'HỌC THUYẾT HẠT NHÂN'],
    chips: ['CÔNG NGHỆ CAO', 'CHIP BÁN DẪN', 'MALAYSIA', 'SINGAPORE', 'TRUNG QUỐC', 'HẠN CHẾ CÔNG NGHỆ & DỊCH VỤ'],
    conflicts: ['NGA – UKRAINE', 'MỸ – IRAN', 'THỎA THUẬN?', 'NHỮNG VẤN ĐỀ CHƯA KHÉP LẠI'],
    scenes: [
      [
        { anchor: '', title: 'Mỹ – Trung – Nga\ncùng xuất hiện tại APEC.', value: 'APEC 2026', label: 'THÂM QUYẾN • TRUNG QUỐC', detail: 'Donald Trump • Tập Cận Bình • Vladimir Putin', graphic: 'summit' },
        { anchor: 'Vậy cùng nhau', title: 'Họ đã bàn gì?\nPhát biểu những gì?', value: '3 LẬP TRƯỜNG', label: 'NGOẠI GIAO • KINH TẾ • AN NINH', detail: 'Từ nghi thức đón tiếp tới nội dung thảo luận.', graphic: 'summit' },
        { anchor: 'Trông thì tưởng', title: 'Tay bắt mặt mừng.\nLập trường có đồng thuận?', value: 'NGHI THỨC ≠ QUAN ĐIỂM', label: 'GÓC NHÌN BÌNH LUẬN VỀ HỘI NGHỊ', detail: 'Phần phát biểu cho thấy những khác biệt.', graphic: 'contrast', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Nghi thức đặc biệt\ntrong lễ đón ông Trump.', value: 'TẠI SÂN BAY', label: 'TẬP CẬN BÌNH • DONALD TRUMP', detail: 'Đón tiếp tại chân cầu thang máy bay.', graphic: 'arrival' },
        { anchor: 'Kèm theo', title: 'Lễ đón\nvà dấu ấn ngoại giao.', value: 'NGHI THỨC', label: 'HOẠT ĐỘNG CHÀO ĐÓN', detail: 'Múa hát và đội hình máy bay đón tiếp.', graphic: 'arrival', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Nghi thức sân bay\nđược đặt trong so sánh.', value: 'DẤU ẤN NGOẠI GIAO', label: 'NHÌN LẠI CÁCH ĐÓN NGUYÊN THỦ', detail: 'Vai trò của nghi thức trong thông điệp ngoại giao.', graphic: 'history' },
        { anchor: 'Lần cuối cùng', title: 'Nhìn lại\nmốc năm 1959.', value: '1959', label: 'MAO TRẠCH ĐÔNG • NIKITA KHRUSHCHEV', detail: 'Một mốc được nhắc để đối chiếu nghi thức.', graphic: 'history' },
        { anchor: 'Và tất nhiên', title: 'Những đoàn khác\ncũng được đón tiếp.', value: 'LỄ ĐÓN', label: 'CÁC NHÀ LÃNH ĐẠO THAM DỰ APEC', detail: 'Chuyển sang câu chuyện nghi thức giữa các đoàn.', graphic: 'protocol' },
      ],
      [
        { anchor: '', title: 'Việt Nam, Hàn Quốc\nvà các nghi thức đón tiếp.', value: 'NGOẠI GIAO', label: 'TÔ LÂM • LÃNH ĐẠO HÀN QUỐC', detail: 'Các hoạt động chào đón được nhắc tới.', graphic: 'protocol', tone: 'teal' },
        { anchor: 'Thế mà', title: 'Câu chuyện khác\nvới đoàn Nhật Bản.', value: 'NHẬT BẢN', label: 'THỦ TƯỚNG TAKAICHI', detail: 'Nghi thức được nhìn từ quan hệ song phương.', graphic: 'protocol' },
        { anchor: 'Kể cũng khổ', title: 'Quan hệ song phương\nvà thông điệp lễ đón.', value: 'TRUNG – NHẬT', label: 'GÓC NHÌN VỀ YẾU TỐ NGOẠI GIAO', detail: 'Sự khác biệt trong cách đón tiếp.', graphic: 'contrast' },
      ],
      [
        { anchor: '', title: 'Điểm nhấn\nvề vị trí Việt Nam.', value: 'VIỆT NAM', label: 'GÓC NHÌN VỀ VỊ THẾ TẠI HỘI NGHỊ', detail: 'Vị trí trong bố cục các nhà lãnh đạo.', graphic: 'group', tone: 'teal' },
        { anchor: 'Hàn Quốc này', title: 'Các quốc gia\ntrong bố cục được nhắc.', value: 'BỐ CỤC LÃNH ĐẠO', label: 'HÀN QUỐC • HOA KỲ • TRUNG QUỐC • NGA • VIỆT NAM', detail: 'Minh họa bằng thẻ quốc gia và hình khối.', graphic: 'group', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Trở lại\nphát biểu của ba bên.', value: 'LẬP TRƯỜNG', label: 'NGA • TRUNG QUỐC • HOA KỲ', detail: 'Các thông điệp kinh tế và an ninh.', graphic: 'summit' },
        { anchor: 'Trung Quốc thì', title: 'Trung Quốc:\nchống chủ nghĩa bảo hộ.', value: 'THƯƠNG MẠI', label: 'THUẾ QUAN & THƯƠNG MẠI TỰ DO', detail: 'Kêu gọi hợp tác châu Á – Thái Bình Dương.', graphic: 'trade' },
        { anchor: 'thúc đẩy', title: 'Thương mại tự do.\nKinh tế số. AI.', value: 'HỢP TÁC', label: 'THƯƠNG MẠI • CÔNG NGHỆ • KINH TẾ SỐ', detail: 'Những lĩnh vực được đặt trong câu chuyện hợp tác.', graphic: 'trade', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Nga:\ntrừng phạt và thuế quan.', value: 'NGA', label: 'PHÁT BIỂU CỦA VLADIMIR PUTIN', detail: 'Trừng phạt, thuế quan, hạn chế xuất khẩu.', graphic: 'russia' },
        { anchor: 'Và ông nhấn mạnh', title: 'Vai trò châu Á\nvà Thái Bình Dương.', value: 'CHÂU Á – TBD', label: 'HỢP TÁC & THƯƠNG MẠI', detail: 'Đặc biệt là thương mại Nga – Trung Quốc.', graphic: 'alignment', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Mỹ:\nbàn về vấn đề hạt nhân.', value: 'KIỂM SOÁT HẠT NHÂN', label: 'MỸ • NGA • TRUNG QUỐC', detail: 'Kiểm soát số lượng đầu đạn là nội dung được nhắc.', graphic: 'nuclear' },
        { anchor: 'Bởi vì tại sao', title: 'Hiệp ước START\nvà bài toán kiểm soát.', value: 'START', label: 'NGA – MỸ • MỐC THÁNG 5', detail: 'Vai trò của các hiệp ước trong đối thoại.', graphic: 'treaty' },
        { anchor: 'Trung Quốc thì', title: 'Trung Quốc\ntrong câu chuyện hạt nhân.', value: 'ĐỐI THOẠI AN NINH', label: 'QUAN HỆ GIỮA CÁC CƯỜNG QUỐC', detail: 'Những khác biệt về phạm vi tham gia hiệp ước.', graphic: 'nuclear' },
      ],
      [
        { anchor: '', title: 'Iran:\nthêm một điểm nóng.', value: 'IRAN', label: 'TRUNG ĐÔNG • HỌC THUYẾT HẠT NHÂN', detail: 'Một nội dung khác trong bình luận về an ninh.', graphic: 'iran', tone: 'danger' },
      ],
      [
        { anchor: '', title: 'Công nghệ cao\nvà chip bán dẫn.', value: 'BÁN DẪN', label: 'CÁC BIỆN PHÁP SIẾT CÔNG NGHỆ', detail: 'Công nghệ trở thành một phần của đối đầu lợi ích.', graphic: 'chips' },
        { anchor: 'như Malaysia', title: 'Malaysia, Singapore\nvà chuỗi dịch vụ công nghệ.', value: 'ĐÔNG NAM Á', label: 'MALAYSIA • SINGAPORE', detail: 'Vấn đề cung cấp dịch vụ liên quan Trung Quốc.', graphic: 'chips', tone: 'teal' },
      ],
      [
        { anchor: '', title: 'Những liên kết\nvà khác biệt còn lại.', value: 'NGA – TRUNG QUỐC', label: 'GÓC NHÌN VỀ TƯƠNG QUAN BA BÊN', detail: 'Bình luận vẫn nhìn nhận bầu không khí căng thẳng.', graphic: 'alignment' },
        { anchor: 'Vẫn chưa có', title: 'Thỏa thuận rõ ràng:\nvẫn là câu hỏi mở.', value: 'THỎA THUẬN?', label: 'NHỮNG VẤN ĐỀ CHƯA KHÉP LẠI', detail: 'Từ Nga – Ukraine tới Mỹ – Iran.', graphic: 'conflicts', tone: 'danger' },
        { anchor: 'Và cuộc chiến', title: 'Các xung đột\nvà triển vọng phía trước.', value: 'CÒN NHIỀU BẤT ĐỒNG', label: 'NGOẠI GIAO • KINH TẾ • AN NINH', detail: 'Những cuộc đối thoại chưa khép lại các khác biệt.', graphic: 'conflicts' },
      ],
    ] as Shot[][],
  },
};
export type VideoProps = typeof defaultProps;
