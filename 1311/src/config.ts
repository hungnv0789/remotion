import recording from './data/voiceover.json';
import assets from './data/assets.json';
import mix from '../public/audio/mix-calibration.json';
export const VIDEO = { fps: 30, width: 1080, height: 1920 } as const;
export const SCENE_IDS = ['hook', 'leadership', 'market', 'confidence', 'questions', 'lesson', 'closing'] as const;
export type SceneId = (typeof SCENE_IDS)[number];
export const defaultProps = {
  brand: 'TÀI CHÍNH • PHỐ WALL', issue: '13 / 11', showCaptions: true,
  theme: { background: '#F6F1FC', panel: '#FFFFFF', text: '#28143F', muted: '#7C6C8A', accent: '#8229E3', teal: '#197E78', border: '#E3D6EF', danger: '#B54773' },
  audio: { voiceover: recording.audioSrc, playbackRate: 1, volume: .95, music: 'audio/finance-news.wav', musicVolume: mix.musicVolume, musicDuck: mix.duckFactor, sting: 'audio/news-sting.wav', stingVolume: .65, voiceAlias: 'female_north', engine: 'VieNeu-TTS v3 Turbo', preset: 'Ngọc Huyền' },
  timing: { voiceoverStartSeconds: .3, endingHoldSeconds: Math.max(1,90 - .3 - recording.durationSeconds), audioDurationSeconds: recording.durationSeconds, recording },
  production: { shotSeconds: 3.2 },
  assets,
  photo: { jensen: 'jensen-huang', market: 'nyse', jensenCredit: 'Office of the President, Taiwan · CC BY 2.0 · 2023', marketCredit: 'Jeffrey Zeldman · CC BY 2.0 · 2015' },
  copy: {
    sections: ['MỘT QUYẾT ĐỊNH, NHIỀU TÁC ĐỘNG', 'BIẾN ĐỘNG BAN LÃNH ĐẠO', 'ÁP LỰC LAN SANG THỊ TRƯỜNG', 'NIỀM TIN VÀO TƯƠNG LAI AI', 'BA CÂU HỎI CỦA THỊ TRƯỜNG', 'GIÁ CỔ PHIẾU PHẢN ÁNH ĐIỀU GÌ?', 'HIỂU DOANH NGHIỆP TRƯỚC KHI ĐẦU TƯ'],
    footer: 'NVIDIA / AI / NIỀM TIN THỊ TRƯỜNG', keywords: ['Nvidia','Jensen','Huang','AI','niềm','tin','kỳ','vọng','rủi','ro','10%','4,3%'],
    chartNote: 'ĐỒ HỌA MINH HỌA · KHÔNG PHẢI DỮ LIỆU GIÁ THỰC TẾ',
    ticker: 'NVIDIA  •  AI  •  S&P 500  •  NASDAQ  •  LÃNH ĐẠO  •  CHIẾN LƯỢC  •  ',
    hook: { label:'THỊ TRƯỜNG MỸ', title:'MỘT CEO RỜI ĐI.\nTHỊ TRƯỜNG LUNG LAY?', question:'Một quyết định.\nHàng nghìn tỷ USD?', company:'NVIDIA', ai:'TRUNG TÂM CỦA LÀN SÓNG AI', market:'Niềm tin thị trường\nđang bị thử thách.' },
    leadership: { title:'Biến động\nban lãnh đạo Nvidia.', date:'12 / 11', dateLabel:'MỐC THỜI GIAN', founder:'Jensen Huang', founderRole:'NHÀ SÁNG LẬP · CEO', event:'TỪ CHỨC', interim:'Colette Kress', interimRole:'GIÁM ĐỐC TÀI CHÍNH', interimTitle:'Người thay thế\ntạm thời.', transition:'CFO → CEO TẠM THỜI', focus:'Câu hỏi về người kế nhiệm' },
    market: { title:'Áp lực bán mạnh.\nTâm lý lan rộng.', intraday:'>10%', intradayLabel:'MỨC GIẢM CÓ THỜI ĐIỂM TRONG PHIÊN', close:'−4,3%', closeLabel:'MỨC GIẢM KẾT PHIÊN', stocks:'NVIDIA', indexTitle:'Không chỉ\nmột cổ phiếu.', indices:['S&P 500','NASDAQ'], direction:'ĐỒNG LOẠT GIẢM ĐIỂM' },
    confidence: { title:'Không chỉ\nlà một CEO.', name:'Jensen Huang', roles:['Gương mặt của AI','Định hình chiến lược','Niềm tin nhà đầu tư'], chain:['Lãnh đạo','Chiến lược','Niềm tin','Kỳ vọng thị trường'], question:'Một người rời đi.\nVì sao thị trường lo?', ai:'HỆ SINH THÁI AI', tag:'TÁC ĐỘNG ĐẾN KỲ VỌNG' },
    questions: { title:'3 câu hỏi\nphía sau đợt bán.', cards:[
      {title:'Ai tiếp tục dẫn dắt?',detail:'Vai trò lãnh đạo trong cuộc đua AI.',icon:'people'},
      {title:'Chiến lược có đổi?',detail:'Hướng phát triển tương lai của Nvidia.',icon:'chip'},
      {title:'Bất ổn có lan rộng?',detail:'Những doanh nghiệp phụ thuộc hệ sinh thái AI.',icon:'network'},
    ], tag:'ĐIỀU THỊ TRƯỜNG MUỐN BIẾT' },
    lesson: { title:'Giá cổ phiếu\n& kỳ vọng tương lai.', price:'GIÁ CỔ PHIẾU', fundamentals:['Doanh thu','Lợi nhuận'], expectations:['Niềm tin','Kỳ vọng'], statement:'Công nghệ tốt, doanh thu lớn\nchưa chắc cổ phiếu luôn tăng.', future:'Nhà đầu tư\nnhìn về tương lai.', tag:'KẾT QUẢ HIỆN TẠI + KỲ VỌNG TƯƠNG LAI' },
    closing: { title:'Đừng chỉ nhìn\nvào kết quả kinh doanh.', checks:['Ban lãnh đạo','Chiến lược','Những rủi ro tương lai'], final:'Hiểu doanh nghiệp.\nNhìn cả tương lai.', question:'Nvidia có thể tiếp tục\nthống trị ngành AI?', cta:'BÌNH LUẬN GÓC NHÌN CỦA BẠN ↓', tag:'CÂU HỎI DÀNH CHO BẠN' },
  },
};
export type VideoProps = typeof defaultProps;
