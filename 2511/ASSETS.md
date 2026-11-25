# Assets và nguồn sử dụng

- `2511.mp3`: âm thanh do người dùng cung cấp; bản phát trong video được sao chép nguyên byte vào `public/audio/2511/2511.mp3`. SHA-256 được lưu trong production manifest.
- `src/components/NewsGraphics.tsx`: SVG/React tự dựng gồm chip, quả địa cầu, nhà máy, dòng nguồn lực, biểu đồ so sánh và mốc thời gian. Không dùng ảnh báo chí hoặc video stock.
- `public/audio/2511/finance-news.wav`: nhạc điện tử news tension tự tổng hợp tại máy bằng `scripts/sound_design.py`, 108 BPM; không sample hoặc bản ghi bên thứ ba.
- `public/audio/2511/news-sting.wav`: hiệu ứng mở đầu tự tổng hợp bằng bộ dao động.
- Be Vietnam Pro: đóng gói qua `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License nằm trong gói npm.

Quả địa cầu, kết nối và nhà máy là đồ họa minh họa; không phải bản đồ lãnh thổ lịch sử. Các hình ảnh không được trình bày như ảnh sự kiện. `assets-manifest.json` ghi kích thước và SHA-256 các tài nguyên.
