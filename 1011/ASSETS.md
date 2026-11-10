# Tài nguyên

- **Audio:** `1011.mp3` do người dùng cung cấp, được sao chép nguyên byte sang `public/audio/1011.mp3`. Giá trị SHA-256 nằm trong `src/data/voiceover.json`. Không thêm nhạc, cắt lời, đổi tốc độ hoặc xử lý âm lượng ngoài mức phát gốc mặc định.
- **Minh họa:** toàn bộ đô thị, tiền tệ, đường sắt, cảng, nhà máy, chip và sơ đồ dòng vốn viết trực tiếp bằng React/SVG trong `src/components/Illustrations.tsx`. Đồ họa mang tính khái niệm, không phải ảnh tư liệu hay bản đồ thực tế. Không dùng ảnh/video tải từ nguồn ngoài.
- **Font:** Be Vietnam Pro, đóng gói qua `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.
- **Nội dung:** từ bản thu của người dùng, không xác minh thông tin theo yêu cầu. `Kichban.md` là bản chép lời; nội dung đồ họa nằm trong `src/config.ts`.
