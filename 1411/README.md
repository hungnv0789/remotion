# 1411 · Áp lực giảm lãi suất

Video Financial News / Motion Graphics, 1080 × 1920, 30 fps. Nền tím nhạt, điểm nhấn `#8229e3`. Nội dung lời đọc giữ theo kịch bản cung cấp, không bổ sung tên ngân hàng hay số liệu bên ngoài.

## Chạy dự án

Node.js ≥ 22:

```bash
cd 1411
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

`npm run render` tạo `out/1411.mp4` (H.264, yuv420p). `npm run captions` xuất `out/1411.srt` và báo cáo timeline. Remotion tự tải Chrome khi chưa có; có thể cấu hình `REMOTION_BROWSER_EXECUTABLE`.

## Nội dung và bố cục

- `src/Root.tsx`: composition `BankRatePressure1411`, thời lượng từ âm thanh thực tế.
- `src/MainVideo.tsx`: timeline, phụ đề, font tiếng Việt và trộn âm thanh.
- `src/scenes/`: 8 phân cảnh; cảnh 7 đối chiếu doanh nghiệp, người gửi tiết kiệm và ngân hàng.
- `src/config.ts`: toàn bộ nội dung hiển thị, màu, đường dẫn và điểm chuyển hình theo lời dẫn.
- `src/data/script.json`: lời thoại gốc và cách viết phục vụ phát âm số.
- `src/data/voiceover.json`: thời điểm từng từ, tạo bằng ASR trên chính giọng đọc.
- `public/`: âm thanh và ảnh đã lưu cục bộ; render không tải ảnh ngoài.

Đổi lời đọc phải tạo lại timestamp; không kéo giãn một bộ phụ đề cũ để dùng cho audio mới. Không cố định 60 hoặc 90 giây. Tiêu đề trong ba giây đầu, chuyển cảnh zoom/flash/blur bằng frame; chuyển động và nhịp camera 3 giây. Đồ thị tín dụng chỉ minh họa cơ chế, không phải dữ liệu ngân hàng cụ thể. Các mức 0,5% và 1,5–2% luôn đi cùng chú thích “điểm phần trăm / năm”.

## Tái tạo giọng đọc và nhạc

Dùng Python 3.11+, SDK VieNeu-TTS 3.8.4; cài VieNeu theo tài liệu chính thức. Chạy:

```bash
python scripts/generate-speech.py --voice 'Ngọc Huyền' --tempo 1.12
pip install -r scripts/requirements-align.txt
python scripts/align-audio.py --model small
python scripts/calibrate-mix.py --target-db -22 --headroom-db 6
npm run captions
```

Có thể đặt `FFMPEG_BINARY` nếu ffmpeg không ở vị trí mặc định. Lần đầu cần mạng để tải mô hình; các file âm thanh hoàn chỉnh đã kèm dự án nên không cần TTS khi chỉ chỉnh hình hoặc render. `public/audio/production-manifest.json` lưu engine, preset, tốc độ, hash audio và tỷ lệ khớp lời. Xem `ASSETS.md` và `MUSIC_NOTES.md` về nguồn tài nguyên.

## Kiểm tra bản xuất

Sau `npm run render`, chạy `python scripts/verify-media.py` (cần NumPy) để đo tương quan với bản đọc, tỷ lệ nhạc/lời ở năm đoạn có lời và đỉnh tín hiệu trên chính MP4. Script cũng xuất `out/1411-mix.mp3`. `python scripts/package-source.py` tạo gói nguồn độc lập kèm tài nguyên, không đóng gói `node_modules`, cache hay video.
