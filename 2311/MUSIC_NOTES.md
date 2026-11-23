# Nhạc nền và bản phối

Nhạc được tạo tại máy từ bộ dao động bass, pad, arpeggio, kick và hi-hat tổng hợp; không sử dụng mẫu âm thanh thương mại. Xem `scripts/sound_design.py` để tái tạo.

Giọng đọc phát ở tốc độ 1, gain 0,82; không cắt hoặc tạo lại nội dung. Nhạc giảm thêm khi có phụ đề đang chạy, có fade đầu/cuối. `calibrate-mix.py` đo RMS lời đang nói, đặt nền mục tiêu thấp hơn khoảng 30 dB để có dư địa cho khác biệt mono/stereo và mã hóa AAC.

`out/audio-verification-2311.json` ghi phép đo trên video thực tế ở từng cảnh, tương quan giọng đọc và đỉnh âm thanh. Đây là phép kiểm tra kỹ thuật; âm thanh người dùng cung cấp vẫn giữ nguồn và quyền sử dụng của chủ sở hữu.
