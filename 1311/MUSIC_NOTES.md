# Nhạc nền và mức phối

## Nguồn âm thanh

`public/audio/finance-news.wav` được tạo mới cho dự án bằng mã nguồn `scripts/sound_design.py`: oscillator hình sin, hợp âm nền, bass pulse và các xung nhịp mềm ở 116 BPM. Không tải hoặc sử dụng nhạc thương mại, bản ghi, loop hoặc sample của bên thứ ba. Không chép lại giai điệu từ ca khúc có sẵn.

`public/audio/news-sting.wav` cũng được tổng hợp trực tiếp bằng mã nguồn, không lấy từ thư viện hiệu ứng. Vì vậy video không cần mua hoặc gia hạn giấy phép nhạc stock cho các tệp này. Không áp dụng tuyên bố này cho những tệp người dùng tự thay vào sau này.

## Mức phối

Giọng đọc là lớp chính. `scripts/calibrate-mix.py` đo RMS theo cửa sổ 50 ms trên phần có lời, rồi đặt mục tiêu nền thấp hơn giọng 22 dB, kèm thêm 6 dB dự phòng. Phần dự phòng được bổ sung sau khi đo bản render thực tế vì nguồn giọng mono và nền stereo được trộn với hệ số khác nhau. Remotion còn giảm âm nhạc khi phụ đề đang phát và fade nhạc ở đầu/cuối. Số đo, gain, nguồn tạo và SHA-256 của tệp nhạc nằm trong `public/audio/mix-calibration.json`.

Mức tương đối được đo theo RMS của đoạn có lời; không phải lời hứa rằng mọi mẫu âm nhạc luôn nhỏ hơn mọi mẫu giọng, vì trong khoảng lặng giọng đọc bằng không. Kiểm tra bản mix xuất cuối bằng `out/audio-verification.json` và file MP3 nghe thử.
