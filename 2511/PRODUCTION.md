# Báo cáo sản xuất 2511

## Nội dung và quy cách

- Chủ đề: công nghệ lõi, tích lũy nguồn lực và bối cảnh phát triển của Việt Nam.
- Audio nguồn: `2511.mp3`, 325.732354 giây sau giải mã.
- SHA-256: `6f56f81084877c7ec7474c2342140a51cc506e917bbcbf0611b0e60f55d1a885`.
- Giữ nguyên MP3 byte-for-byte; phát ở tốc độ 1×, gain 0,82. Không tạo TTS, không thêm lời đọc.
- Video: 1080 × 1920, 30 fps, 9802 frame = 326.733 giây. Intro 0,2 giây, giữ cuối 0,8 giây.
- 20 cảnh, 62 bố cục nội dung; zoom, highlight và chuyển động theo nhịp khoảng 3 giây.
- 103 cue phụ đề / 1297 từ/tokens. Nội dung đầy đủ tại `Kichban.md` và `src/data/script.json`.
- Nền tím nhạt #F8F3FD, màu nhấn #8229e3; phụ đề tương phản cao, chừa vùng điều khiển TikTok.

## Căn lời và hình ảnh

ASR tại máy dùng faster-whisper medium, CPU int8, timestamp từng từ. Tỷ lệ khớp văn bản sau chuẩn hóa lỗi nhận dạng: 98.61%. Một đoạn từ 190–207 giây được đối chiếu thêm bằng large-v3-turbo để làm rõ “đáy của thế giới này” và WTO. ASR gốc giữ trong `transcription.json`; dữ liệu đối chiếu tại `transcription-review.json`.

Đồ họa SVG tự dựng: chip, quả địa cầu hình học, nhà máy, sơ đồ dòng nguồn lực, donut 84% và 1/4, so sánh thời gian, các mốc 1994–2007. Các đồ họa không phải ảnh sự kiện hoặc bản đồ lãnh thổ lịch sử. Văn bản và số liệu theo lời dẫn, không bổ sung nguồn tin bên ngoài.

Các anchor chuyển hình được kiểm tra theo thứ tự tăng dần để tránh nhầm những câu lặp như “và chính những…” hoặc “một quốc gia…”. Khung giữ cuối dừng ở trạng thái rõ nét.

## Timeline

| Cảnh | Thời gian | Frame (bao gồm) |
| --- | --- | --- |
| 01 · hook | 0.00–24.53s | 0–735 |
| 02 · world | 24.53–43.77s | 736–1312 |
| 03 · history | 43.77–61.80s | 1313–1853 |
| 04 · empires | 61.80–78.13s | 1854–2343 |
| 05 · europe | 78.13–90.90s | 2344–2726 |
| 06 · america | 90.90–114.13s | 2727–3423 |
| 07 · japan | 114.13–132.10s | 3424–3962 |
| 08 · capital | 132.10–147.37s | 3963–4420 |
| 09 · research | 147.37–161.93s | 4421–4857 |
| 10 · resources | 161.93–175.33s | 4858–5259 |
| 11 · vietnam | 175.33–196.87s | 5260–5905 |
| 12 · opening | 196.87–206.57s | 5906–6196 |
| 13 · comparison | 206.57–224.77s | 6197–6742 |
| 14 · perspective | 224.77–243.07s | 6743–7291 |
| 15 · reflection | 243.07–263.10s | 7292–7892 |
| 16 · transfer | 263.10–275.87s | 7893–8275 |
| 17 · investment | 275.87–290.90s | 8276–8726 |
| 18 · niche | 290.90–298.97s | 8727–8968 |
| 19 · process | 298.97–317.73s | 8969–9531 |
| 20 · closing | 317.73–326.73s | 9532–9801 |

## Nhạc nền và kiểm tra

Nhạc news tension/electronic tự tổng hợp 108 BPM, không dùng sample hoặc bản ghi nhạc bên thứ ba. Fade đầu/cuối, ducking khi có lời. Mức nền được hiệu chỉnh theo RMS lời đang nói.

TypeScript và 8 test đã đạt: tính nguyên vẹn nguồn, timestamp, liên tục timeline, nội dung phụ đề, thứ tự anchor và mức nhạc. Ảnh xem trước được kiểm tra bố cục, dấu tiếng Việt và vùng caption. Báo cáo MP4 thực tế sau render tại `out/audio-verification-2511.json`; các ảnh trích từ MP4 tại `out/render-review.jpg`.

Các bước tái tạo nằm trong README. Bản nguồn đóng gói tại `out/2511-source.zip`, không chứa node_modules hoặc video render.

## Kết quả kiểm tra MP4

- Video H.264/yuv420p, 1080 × 1920, 30 fps, 9.802 frame; thời lượng hình 326,733 giây. Audio AAC.
- Cả 20 cửa sổ kiểm tra đạt: nền thấp hơn giọng khoảng 26.8–32.3 dB; tương quan giọng gốc tối thiểu 0.998952.
- Peak 0.554291; không có mẫu chạm giới hạn số.
- Đã xem các khung trích trực tiếp từ MP4, bao gồm donut 84%, trích dẫn, WTO 2007, nhà máy và khung kết rõ nét.
