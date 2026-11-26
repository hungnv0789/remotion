# Báo cáo sản xuất 2611-1

- Chủ đề: đề xuất thuế Mỹ với 14 nền kinh tế, phản hồi Việt Nam và khả năng đàm phán.
- Audio `2611-1.mp3`, 51.245000 giây sau giải mã; giữ nguyên file, tốc độ và phần kết.
- SHA-256: `084f7485862cd1221bd3ca949e9deb1ea52f187257e0307955a60eae114f5f2e`.
- Video 1080 × 1920, 30 fps, 1568 frame = 52.267 giây. Intro 0,2 giây, giữ cuối 0,8 giây.
- 6 cảnh, 15 bố cục nội dung, 20 cue phụ đề, 183 từ/tokens.
- Tông tím nhạt #F8F3FD, accent #8229e3. Zoom, flash, blur ngắn và highlight theo nhịp khoảng 3 giây.

## Căn lời và trình bày

ASR local CPU int8 bằng faster-whisper large-v3-turbo; chuẩn hóa “mức”, “trấn an”, “Na Uy”, tên quốc gia, USTR và Bộ Công Thương. Tỷ lệ khớp từ 97.55%; ASR gốc giữ riêng, timestamp từng từ trong `src/data/voiceover.json`.

Bảng 5 hàng trình bày đầy đủ nhóm 15% và nhóm tối đa 18%; Singapore 20%, Ấn Độ 25%; Việt Nam và Trung Quốc tối đa 35%. Mexico và Na Uy được tách thành nhóm chưa bị đề xuất trong đợt được nhắc. Nhãn đề xuất/chưa có hiệu lực giữ trên hình. 35% → 20% có dấu hỏi và điều kiện đạt hiệp định thương mại đối ứng công bằng, cân bằng. Không thêm năm vào mốc 25/11 hoặc thông tin bên ngoài lời dẫn.

## Timeline

| Cảnh | Thời gian | Frame (bao gồm) |
| --- | --- | --- |
| 01 · hook | 0.00–4.03s | 0–120 |
| 02 · proposal | 4.03–10.60s | 121–317 |
| 03 · groups | 10.60–22.63s | 318–678 |
| 04 · highest | 22.63–28.07s | 679–841 |
| 05 · response | 28.07–38.77s | 842–1162 |
| 06 · negotiation | 38.77–52.27s | 1163–1567 |

## Kiểm tra và tái tạo

TypeScript và 8 test đã đạt: hash MP3, timestamps, liên tục cảnh, caption không chồng/lặp, thứ tự anchor và mức nền. Đã rà khung đầu/cuối, bảng thuế, các điều kiện và dấu tiếng Việt.

Nhạc news tension/electronic 108 BPM tự tổng hợp, không dùng sample bên thứ ba. Báo cáo MP4 thực tế tại `out/audio-verification-2611-1.json`; ảnh trích tại `out/render-review.jpg`. README có lệnh tái tạo; mã nguồn và tài nguyên được gói trong `out/2611-1-source.zip`.

## Kết quả kiểm tra MP4

H.264/yuv420p, 1080 × 1920, 30 fps, 1.568 frame; video 52,267 giây, audio AAC. Cả 6 cửa sổ âm thanh đạt; nền/residual thấp hơn giọng khoảng 24.2–27.3 dB, tương quan nguồn tối thiểu 0.998110. Peak 0.459961, không có mẫu chạm giới hạn số.

Đã xem ảnh trích trực tiếp từ MP4, bao gồm bảng 5 nền kinh tế ở mức tối đa 18%, dấu hỏi/điều kiện của 35% → 20% và khung kết rõ nét.
