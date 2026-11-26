# Âm thanh và nhạc nền

Giọng đọc giữ nguyên nội dung, phần kết và tốc độ 1×; gain 0,82, đệm mở 0,2 giây. Không tạo TTS.

Nhạc electronic/news tension tự tổng hợp từ bass, pad, arpeggio, kick và hi-hat; không sử dụng sample, bản ghi hoặc giai điệu có sẵn của bên thứ ba. Có fade đầu/cuối và ducking theo lời.

`calibrate-mix.py` căn nền theo RMS vùng lời nói. `verify-media.py` đối chiếu giọng gốc với audio MP4 và đo mức nền từng cảnh, đỉnh tín hiệu. Kết quả tại `out/audio-verification-2611-1.json`.
