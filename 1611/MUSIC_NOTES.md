# Nhạc và hiệu ứng gốc

`finance-news.wav`: News tension + Electronic finance, nhịp 112 BPM, bass trầm, pad và các nốt điện tử nhẹ; nâng năng lượng vừa phải ở phần cuối. `news-sting.wav`: whoosh ngắn và bass mềm ở phần hook. Bộ tổng hợp: `scripts/sound_design.py` và `scripts/align-audio.py`.

Không sử dụng bản nhạc thương mại, mẫu ghi âm, loop hoặc giai điệu sao chép từ tác phẩm khác. Mã nguồn và hash trong manifest giúp truy xuất xuất xứ. Không thể bảo đảm mọi hệ thống nhận diện tự động sẽ không gắn nhầm; nên giữ các file nguồn khi đăng video.

`calibrate-mix.py` cân nhạc theo RMS phần có lời, mục tiêu thấp hơn giọng 22 dB và thêm 6 dB khoảng dự phòng cho mono/stereo. Video giảm nhạc khi có phụ đề, fade đầu/cuối, không tăng nhạc lấn lời ở CTA. `verify-media.py` đo lại trên MP4 thực tế ở nhiều cảnh để phát hiện thay đổi mức âm hoặc lệch giọng.
