# Nguồn tài nguyên

- `1811.mp3`: âm thanh người dùng cung cấp; bản cục bộ `public/audio/1811/1811.mp3` giữ nguyên từng byte và tốc độ phát. Gain được điều chỉnh khi phối âm.
- Đồ họa: SVG/React riêng trong `src/components/`; tên doanh nghiệp sử dụng chữ thông thường, không giả hình chụp sự kiện, logo hoặc văn bản công bố chính thức.
- Font: Be Vietnam Pro, SIL Open Font License, đóng gói qua Fontsource.
- Nhạc/hiệu ứng bổ sung: bộ tổng hợp sóng âm trong `scripts/sound_design.py` và `scripts/prepare-audio.py`, không dùng mẫu ghi âm hay nhạc stock.

Dự án không cần ảnh/video tải từ internet khi render. Trọng số mô hình ASR chỉ dùng để tái tạo transcript, không đóng gói vào source ZIP.
