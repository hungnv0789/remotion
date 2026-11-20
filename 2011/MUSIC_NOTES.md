# Nhạc bổ sung cho 2011

`finance-news.wav`: electronic news nhẹ, 108 BPM, bass/pad/arpeggio/percussion tạo trong `scripts/sound_design.py`. `news-sting.wav`: sweep mở đầu ngắn tạo trong `prepare-audio.py`. Không dùng sample, loop tải ngoài hoặc giai điệu sao chép.

Nguồn MP3 giữ nguyên, playback rate 1. Phần nhạc bổ sung được cân theo RMS audio chính với mục tiêu thấp hơn 24 dB và thêm 6 dB dự phòng cách trộn mono/stereo; video có duck khi hiển thị phụ đề và fade đầu/cuối. Đo lại trên MP4 bằng `verify-media.py`; manifest lưu hash và gain. Có thể đặt `audio.musicVolume = 0` trong props để chỉ dùng âm thanh nguồn.
