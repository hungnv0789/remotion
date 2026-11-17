# Nguồn tài nguyên

- `1711.mp3`: âm thanh người dùng cung cấp. Bản sử dụng ở `public/audio/1711.mp3` giữ nguyên từng byte, không cắt hoặc kéo tốc độ. Gain chỉ được điều chỉnh khi trộn.
- `src/components/SCBGraphics.tsx`: đồ họa SVG viết riêng; sử dụng tên SCB bằng chữ thông thường, không giả hình ảnh chi nhánh hay dấu/văn bản pháp lý. Sơ đồ mạng lưới không phải bản đồ vị trí thực tế.
- Font: Be Vietnam Pro qua `@fontsource/be-vietnam-pro`, SIL Open Font License.
- Phần nhạc và hiệu ứng bổ sung: tổng hợp riêng bằng mã Python, không dùng bản ghi, sample hoặc clip stock bên thứ ba. Chi tiết ở `MUSIC_NOTES.md`.

Toàn bộ audio và đồ họa cần thiết được đóng gói trong dự án; render không tải ảnh từ internet. Trọng số mô hình ASR chỉ cần khi tái tạo transcript, không được đóng gói trong source ZIP.
