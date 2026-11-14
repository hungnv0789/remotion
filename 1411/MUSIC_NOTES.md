# Financial News Cinematic · nhạc nền gốc

`public/audio/finance-news.wav` là bản nhạc tổng hợp riêng cho video: nhịp 104 BPM, bass, trống nhẹ, arpeggio và lớp pad; tăng nhẹ năng lượng ở đoạn kết. `news-sting.wav` là tiếng cảnh báo ngắn kèm bass tổng hợp ở phần mở đầu.

Không sử dụng nhạc thương mại, loop tải ngoài, sample ghi âm, hay sao chép giai điệu từ tác phẩm có sẵn. Mã nguồn tạo âm thanh được kèm dự án, giúp truy xuất xuất xứ. Không thể bảo đảm hệ thống nhận diện tự động của mọi nền tảng sẽ không gắn nhầm; lưu mã nguồn và manifest khi đăng video.

Nhạc được cân theo RMS phần có lời, với mục tiêu thấp hơn giọng khoảng 22 dB và thêm 6 dB khoảng dự phòng cho chuyển đổi mono/stereo. `MainVideo.tsx` giảm tiếp mức nhạc khi phụ đề đang hiển thị, fade đầu/cuối. `mix-calibration.json` lưu mức gain, phương pháp và hash nhạc. Luôn kiểm tra file MP4 sau cùng khi đổi voice hoặc nhạc.
