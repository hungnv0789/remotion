# Tài nguyên

- **Audio:** `1211-2.mp3` do người dùng cung cấp, sao chép nguyên byte sang `public/audio/1211-2.mp3`. SHA-256 lưu trong `src/data/voiceover.json`. Không cắt lời, đổi tốc độ hoặc thêm nhạc.
- **Minh họa:** React/SVG trong `src/components/BehaviorIllustrations.tsx`. Nhà, túi mua sắm, đồng tiền, cốc nước, xe và đồng hồ. Biểu đồ cột chỉ minh họa việc cộng dồn các khoản nhỏ, không phải dự báo lợi suất hoặc dữ liệu chi tiêu thực tế. Không tải hình/video từ bên ngoài.
- **Font:** Be Vietnam Pro qua `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.
- **Nội dung:** từ audio được cung cấp, bỏ qua xác minh thông tin theo yêu cầu. Chữ đồ họa có thể sửa ở `src/config.ts`; phụ đề và timestamp ở `src/data/voiceover.json`.
