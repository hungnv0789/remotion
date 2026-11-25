# Âm thanh và nhạc nền

Giữ nguyên giọng, nội dung và tốc độ của MP3 được cung cấp. Không tạo TTS. Bản phát có gain 0,82 và khoảng đệm mở 0,2 giây.

Nhạc news tension/electronic được tổng hợp bằng oscillator bass, pad, arpeggio, kick và hi-hat; không dùng giai điệu hoặc mẫu âm thanh có sẵn của bên thứ ba. Xem `scripts/sound_design.py` để tái tạo.

`calibrate-mix.py` đo RMS vùng lời nói, giảm nhạc theo cue phụ đề và đặt dư địa cho bản phối. Nhạc có fade đầu/cuối. `verify-media.py` kiểm tra tương quan giọng gốc, mức nền ở từng cảnh và đỉnh tín hiệu trên file MP4 thực tế.
