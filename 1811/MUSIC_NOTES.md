# Nhạc bổ sung

Nhạc 110 BPM được tổng hợp từ bass, pad, arpeggio và percussion bằng `scripts/sound_design.py`; whoosh mở đầu tạo trong `prepare-audio.py`. Không dùng loop, sample ghi âm hay giai điệu sao chép từ tác phẩm khác.

Gain nhạc được cân theo RMS phần có lời, mục tiêu thấp hơn giọng 24 dB và thêm 6 dB dự phòng cho cách trộn mono/stereo. `MainVideo.tsx` giảm nhạc khi có phụ đề và fade đầu/cuối. `verify-media.py` đo lại trên chính MP4.

File MP3 nguồn vẫn giữ nguyên byte, không TTS và không thay tốc độ. Có thể đặt `audio.musicVolume = 0` để chỉ dùng âm thanh nguồn. Nhận diện tự động của nền tảng có thể gắn nhầm; giữ mã tạo nhạc và manifest để truy xuất xuất xứ phần nhạc bổ sung.
