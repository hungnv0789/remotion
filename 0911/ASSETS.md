# Nguồn tài nguyên

## Âm thanh

`0911.mp3` do người dùng cung cấp, sao chép nguyên byte sang `public/audio/0911.mp3`. Không cắt, tăng tốc, thêm nhạc hoặc thay lời. Giá trị SHA-256 nằm trong `src/data/voiceover.json`.

## Hình ảnh báo chí

- `public/images/signing.jpg`: ảnh trao hợp đồng tại lễ ký kết 06/10/2026, nguồn **Vingroup**. [Bài công bố](https://vingroup.net/vi/tin-tuc-su-kien/bai-viet/9093/vingroup-va-alsto) · [Tệp gốc](https://ircdn.vingroup.net/storage/Uploads/0_Tintuchoatdong/2026/T10/ALstom.jpg). Dùng trong cảnh hợp đồng, crop khung hình, giữ ghi nguồn trên video.
- `public/images/alstom-signing.jpg`: ảnh lễ ký kết, nguồn **Alstom**. [Bài công bố](https://www.alstom.com/press-releases-news/2026/10/alstom-and-vingroup-join-forces-advance-vietnams-urban-rail-ambitions) · [Tệp gốc](https://www.alstom.com/sites/alstom.com/files/styles/large_media_cover/public/2026/10/06/Alstom_Vingroup-2.jpg?h=caf26d13&itok=6Ccr8YKl). Tài nguyên dự phòng để thay `images.signing` trong props.

Hai ảnh lấy từ thông cáo chính thức; bản quyền thuộc chủ sở hữu, không có giấy phép Creative Commons được công bố tại nguồn đã tra cứu. Việc ghi nguồn không phải cấp phép tái sử dụng; quyền phát hành các ảnh này cần được người phát hành xác nhận. Có thể thay bằng ảnh có quyền sử dụng thông qua props.

## Đồ họa và font

Tàu 5 toa, sơ đồ mạng lưới, thẻ số liệu viết trực tiếp bằng React/SVG trong dự án. Không dùng ảnh/video tàu đang vận hành để giả làm đoàn tàu trong đơn hàng mới. Font **Be Vietnam Pro**, bản cục bộ từ `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 (kèm theo gói npm).
