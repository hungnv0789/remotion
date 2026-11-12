# Tài nguyên

- **Audio:** `1211.mp3` do người dùng cung cấp, sao chép nguyên byte sang `public/audio/1211.mp3`. SHA-256 lưu trong `src/data/voiceover.json`. Giữ nguyên giọng đọc, tốc độ và phần nhạc có sẵn.
- **Minh họa:** ngân hàng, két, lịch, ví tiền, mặt trăng, quà tặng và sơ đồ chia kỳ hạn là React/SVG trong `src/components/SavingsIllustrations.tsx`. Không tải ảnh/video bên ngoài; không dùng logo hoặc gắn mức lãi suất với tên ngân hàng cụ thể. Các nhánh chia tiền chỉ minh họa lịch sử dụng, không biểu thị tỷ trọng phân bổ.
- **Font:** Be Vietnam Pro qua `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.
- **Nội dung:** từ audio được cung cấp, không xác minh thông tin theo yêu cầu. Chữ đồ họa có thể chỉnh tại `src/config.ts`; lời phụ đề và timestamp nằm ở `src/data/voiceover.json`.
