# Assets và nguồn sử dụng

- `2311.mp3`: âm thanh do người dùng cung cấp. Bản phát trong video tại `public/audio/2311/2311.mp3` được sao chép nguyên byte; SHA-256 trong production manifest.
- `src/components/NewsGraphics.tsx`: đồ họa SVG/React tự dựng: dòng tiền, thẻ nội dung, cột so sánh và đường xu hướng minh họa. Không dùng ảnh báo chí hoặc video stock.
- `public/audio/2311/finance-news.wav`: nhạc news tension/electronic tự tổng hợp bằng `scripts/sound_design.py`, 108 BPM. Không dùng sample, bản ghi hay giai điệu có sẵn của bên thứ ba.
- `public/audio/2311/news-sting.wav`: hiệu ứng mở đầu tổng hợp bằng dao động hình sin.
- Be Vietnam Pro: font đóng gói qua `@fontsource/be-vietnam-pro`; giấy phép SIL Open Font License được giữ trong gói npm.

`assets-manifest.json` lưu kích thước và SHA-256 tài nguyên. Không đưa nhãn xác minh hay nguồn báo chí vào video; dữ liệu trình bày theo nội dung người dùng cung cấp. Đường biểu đồ minh họa có chú thích, không đóng vai trò dữ liệu giao dịch thực tế.
