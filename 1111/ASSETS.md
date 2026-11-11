# Tài nguyên

- **Audio:** `1111.mp3` do người dùng cung cấp, sao chép nguyên byte sang `public/audio/1111.mp3`. SHA-256 lưu trong `src/data/voiceover.json`. Không thêm nhạc hoặc thay đổi bản thu; mức phát và tốc độ mặc định là 1.
- **Minh họa:** biểu đồ, Quốc hội, ngân hàng, hồ sơ, chip và trung tâm dữ liệu là React/SVG trong `src/components/MarketIllustrations.tsx`. Không có ảnh/video tải từ bên ngoài. Hồ sơ là biểu tượng khái niệm, không phải tài liệu ngân hàng thật. Biểu đồ không có trục giá/thời gian và mang nhãn minh họa tại các cảnh thị trường.
- **Font:** Be Vietnam Pro, đóng gói bởi `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.
- **Nội dung:** theo bản thu được cung cấp; không xác minh thông tin theo yêu cầu. Các con số trên hình là những con số được nhắc trong lời dẫn. Lời dẫn và timestamp có thể chỉnh tại `src/data/voiceover.json`; chữ đồ họa nằm trong `src/config.ts`.
