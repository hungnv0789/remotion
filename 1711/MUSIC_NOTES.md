# Nhạc bổ sung

`public/audio/finance-news.wav` là nhạc electronic finance nhẹ, 108 BPM, tạo từ oscillator bass, pad, percussion và arpeggio trong `scripts/sound_design.py`. `news-sting.wav` là hiệu ứng mở đầu tổng hợp ngắn.

Phần nhạc bổ sung không dùng nhạc thương mại, sample ghi âm, loop tải ngoài hay giai điệu sao chép. Mã nguồn và manifest giúp truy xuất xuất xứ; không khẳng định quyền sở hữu đối với âm thanh gốc do người dùng cung cấp.

Nhạc được cân theo RMS phần có lời, mục tiêu thấp hơn giọng 24 dB và thêm 6 dB dự phòng cho cách trộn mono/stereo. Video duck nhạc khi phụ đề hiển thị, fade đầu/cuối. Có thể đặt `audio.musicVolume = 0` trong props để chỉ dùng âm thanh nguồn. `verify-media.py` đo lại trên MP4 cuối ở nhiều đoạn, không chỉ dựa trên thông số gain.
