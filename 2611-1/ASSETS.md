# Assets và nguồn sử dụng

- `2611-1.mp3`: âm thanh người dùng cung cấp; sao chép nguyên byte vào `public/audio/2611-1/2611-1.mp3`. SHA-256 trong production manifest.
- `src/components/NewsGraphics.tsx`: bảng thuế, quả địa cầu hình học, thẻ so sánh, timeline và sơ đồ tự dựng bằng SVG/React. Không sử dụng ảnh báo chí hoặc video stock.
- `public/audio/2611-1/finance-news.wav`: nhạc news tension/electronic tự tổng hợp, 108 BPM; không sample hoặc bản ghi bên thứ ba. Mã tái tạo tại `scripts/sound_design.py`.
- `public/audio/2611-1/news-sting.wav`: hiệu ứng mở tổng hợp bằng bộ dao động.
- Be Vietnam Pro: gói `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License giữ trong gói npm.

Mức thuế theo lời dẫn, nhãn đề xuất/điều kiện hiệp định hiển thị trên hình. Không dùng đồ họa như dữ liệu áp thuế đã có hiệu lực. Quả địa cầu không phải bản đồ lãnh thổ. `assets-manifest.json` lưu kích thước và SHA-256 của tài nguyên.
