# Tài nguyên

- **Audio:** `1211-1.mp3` do người dùng cung cấp, sao chép nguyên byte sang `public/audio/1211-1.mp3`. SHA-256 lưu trong `src/data/voiceover.json`. Giữ nguyên giọng đọc, tốc độ và phần nhạc có sẵn.
- **Minh họa:** biểu đồ, doanh nghiệp, tiền mặt, cổ phiếu và cảnh báo là React/SVG trong `src/components/StockIllustrations.tsx`. Không tải hình/video bên ngoài. Biểu đồ minh họa xu hướng và ví dụ giao dịch, không phải dữ liệu giá thực tế.
- **Ví dụ:** 100 cổ phiếu, giá mua 20.000 đồng và bán 25.000 đồng. Phép tính là lãi gộp, chưa tính thuế/phí; không tạo ví dụ định lượng cho cổ tức hoặc giả định khoản thu được đảm bảo.
- **Font:** Be Vietnam Pro, `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.
- **Nội dung:** từ audio được cung cấp, không xác minh thông tin theo yêu cầu. Chữ đồ họa có thể sửa trong `src/config.ts`; phụ đề và timestamp ở `src/data/voiceover.json`.
