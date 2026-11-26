# Báo cáo sản xuất 2611

- Chủ đề: giá vàng nhẫn PNJ và chênh lệch với SJC, DOJI, Mi Hồng.
- Audio: `2611.mp3`, 80.804000 giây sau giải mã; giữ nguyên file, nội dung và tốc độ.
- SHA-256: `48818f5f539b8c41c8e091de79fa1fe530679209445680429f25463ae5001922`.
- Video: 1080 × 1920, 30 fps, 2455 frame = 81.833 giây.
- 8 cảnh, 22 bố cục nội dung, 30 cue phụ đề, 336 từ/tokens. Intro 0,2 giây, giữ cuối 0,8 giây ngoài phần kết âm thanh gốc.
- Nền sáng tím nhạt #F8F3FD, điểm nhấn #8229e3; nhẫn vàng, bảng giá và so sánh SVG.
- Chuyển động theo nhịp khoảng 3 giây, zoom/flash/blur ngắn; khung giữ cuối rõ nét.

## Nội dung và căn lời

ASR local CPU int8 bằng large-v3-turbo. Các lỗi tên riêng được chuẩn hóa: P&G → PNJ, SGC → SJC, Doji → DOJI, mì hồng → Mi Hồng; sửa “vàng nhẫn trơn”, “xấp xỉ”, “mặt bằng chung”. Tỷ lệ khớp từ sau chuẩn hóa: 92.38%.

Hai đoạn 0–7 và 69–80,804 giây được đối chiếu bằng medium. Giữ cụm mở đầu theo âm thanh; headline tập trung vào chênh giá. Không có lời bổ sung sau câu kết ở cả hai kết quả nhận dạng; phần kết của file nguồn vẫn được giữ nguyên. Các dữ liệu đối chiếu ở `src/data/transcription-review.json`.

Bảng giá gắn mốc sáng 25/11, không thêm năm hoặc giá cập nhật. Phân biệt PNJ mua vào 126 và bán ra 131,5; SJC/DOJI bán ra 133,5, Mi Hồng 134 triệu đồng mỗi lượng. Chênh lệch giữa các hãng khác với chênh giá trong nước/thế giới. Đường giá chỉ minh họa xu hướng, không phải dữ liệu giao dịch thực tế.

## Timeline

| Cảnh | Thời gian | Frame (bao gồm) |
| --- | --- | --- |
| 01 · hook | 0.00–6.97s | 0–208 |
| 02 · news | 6.97–15.97s | 209–478 |
| 03 · quotes | 15.97–31.67s | 479–949 |
| 04 · difference | 31.67–38.03s | 950–1140 |
| 05 · position | 38.03–49.23s | 1141–1476 |
| 06 · market | 49.23–57.87s | 1477–1735 |
| 07 · premium | 57.87–69.50s | 1736–2084 |
| 08 · closing | 69.50–81.83s | 2085–2454 |

## Kiểm tra và tái tạo

TypeScript và 8 test đã đạt: nguyên vẹn MP3, timestamps, liên tục cảnh, caption không lặp/chồng, thứ tự anchor và mức nhạc. Đã rà bố cục, bảng giá, dấu tiếng Việt và cỡ chữ các ô chênh lệch.

Nhạc electronic/news tension 108 BPM tự tổng hợp, không dùng sample bên thứ ba; fade và ducking khi có lời. Kết quả kiểm tra trên MP4 thực tế nằm trong `out/audio-verification-2611.json`, ảnh trích tại `out/render-review.jpg`. README có lệnh tái tạo; mã nguồn và tài nguyên gói trong `out/2611-source.zip`.

## Kết quả kiểm tra MP4

H.264/yuv420p, 1080 × 1920, 30 fps, 2.455 frame; thời lượng hình 81,833 giây, AAC 81,835 giây. Cả 8 cửa sổ âm thanh đạt, tương quan với nguồn tối thiểu 0.997886; nền/residual thấp hơn giọng khoảng 23.7–28.0 dB. Peak 0.626801, không có mẫu chạm giới hạn số.

Đã kiểm tra các khung trích trực tiếp từ MP4: bảng giá, cỡ chữ chênh 20–23 triệu, so sánh trước/hiện tại và khung cuối rõ nét.
