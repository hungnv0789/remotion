# Báo cáo sản xuất 2311

- Chủ đề: Fed phát tín hiệu tăng lãi suất và cơ chế định giá lại tài sản.
- Nguồn: `2311.mp3`, giữ nguyên byte và tốc độ 1×.
- SHA-256: `25eb19989f7cbac1d68245a6a2e0bf7b3253f922a209316698518e11df81413b`.
- Audio giải mã: 96.407813 giây.
- Video: 2923 frame / 30 fps = 97.433 giây, 1080 × 1920.
- 9 cảnh, 28 bố cục nội dung; chuyển động camera và highlight theo nhịp 3 giây.
- 41 cue phụ đề, 460 từ/tokens hiển thị theo lời; intro 0,2 giây, giữ cuối 0,8 giây.
- ASR tại máy: faster-whisper medium, int8 CPU. Lỗi nhận dạng lãi suất, vay, lạm phát, trái phiếu, tồn kho và Nasdaq đã được chuẩn hóa; dữ liệu ASR gốc giữ riêng. Tỷ lệ khớp từ sau chuẩn hóa 92.34%.
- Không thêm năm cho ngày 18/11; không thêm lời thoại hoặc CTA vào MP3.
- Bảng/đường minh họa có chú thích, không dùng đường giá giả làm dữ liệu giao dịch.
- Nền sáng tím nhạt, accent #8229e3; phụ đề tương phản cao và chừa vùng giao diện TikTok.
- Nhạc điện tử finance tự tổng hợp, 108 BPM, không sample bên thứ ba; ducking theo lời, fade đầu/cuối.

| Cảnh | Thời gian | Frame (bao gồm) |
| --- | --- | --- |
| hook | 0.00–5.30s | 0–158 |
| news | 5.30–15.87s | 159–475 |
| mechanism | 15.87–23.50s | 476–704 |
| loan | 23.50–34.07s | 705–1021 |
| savings | 34.07–39.77s | 1022–1192 |
| stocks | 39.77–57.40s | 1193–1721 |
| gold | 57.40–70.33s | 1722–2109 |
| oil | 70.33–81.07s | 2110–2431 |
| closing | 81.07–97.43s | 2432–2922 |

## Validation

TypeScript và 8 test tự động đã đạt. `out/contact-sheet.jpg` tổng hợp các khung xem trước. Kết quả kiểm tra MP4 thực tế nằm trong `out/audio-verification-2311.json`; mức nhạc và peak căn cứ trên file render. Các file trong `out/` có thể tái tạo bằng lệnh trong README.

Kiểm tra trên MP4 hoàn tất: H.264 1080 × 1920, 30 fps, 2.923 frame; audio AAC. Nền thấp hơn giọng khoảng 29.2–31.6 dB ở các cửa sổ lời của 9 cảnh; tương quan với giọng gốc tối thiểu 0.999404. Peak 0.726562, không có mẫu chạm giới hạn số. `out/render-review.jpg` là các khung trích từ MP4, bao gồm khung cuối rõ nét.
