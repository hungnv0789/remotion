# 1711 · SCB: Lãi suất tiết kiệm online về 0%

Dự án Remotion Financial News / Motion Graphics, 1080 × 1920, 30 fps, nền tím nhạt và điểm nhấn `#8229e3`. Âm thanh sử dụng trực tiếp `1711.mp3`, giữ nguyên tốc độ, không tạo giọng thay thế. Thời lượng composition theo file âm thanh thực tế.

## Chạy và xuất video

Node.js ≥ 22:

```bash
cd 1711
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

Composition: `SCBZeroRate1711`. Đầu ra: `out/1711.mp4` (H.264, yuv420p). `npm run captions` xuất `out/1711.srt` và `out/timing-report.json`. Có thể đặt `REMOTION_BROWSER_EXECUTABLE`; Remotion tải Chrome nếu chưa có trình duyệt.

## Cấu trúc và chỉnh sửa

- `src/Root.tsx`: kích thước, fps và metadata thời lượng.
- `src/MainVideo.tsx`: timeline, phụ đề, font tiếng Việt và phối âm.
- `src/scenes/`: 8 cảnh: hook, online, giao dịch tại quầy, lịch sử, thanh khoản, chuyển tiền, mạng lưới và kết.
- `src/config.ts`: toàn bộ text hiển thị, màu, đường dẫn audio và cụm từ làm mốc animation.
- `src/components/SCBGraphics.tsx`: điện thoại, ngân hàng, lịch, hai kỳ hạn tham chiếu, dòng tiền và mạng lưới SVG.
- `src/data/script.json`: lời thoại đã chuẩn hóa chính tả; `transcription.json`: nhận dạng tiếng nói và timestamp; `voiceover.json`: căn lời dùng để render.
- `public/audio/1711.mp3`: bản sao giữ nguyên từng byte của file nguồn; `production-manifest.json` lưu hash để đối chiếu.

Các mức 3,7% và 8,7% được gắn với kỳ hạn 12/13 tháng và chú thích mốc tham chiếu lãi cho vay thả nổi. Đồ họa ngân hàng/mạng lưới là minh họa, không dùng hình ảnh sự kiện hoặc văn bản chính thức giả. Không bổ sung dữ kiện ngoài lời dẫn.

## Căn lại khi đổi âm thanh

Python cần NumPy và faster-whisper (`pip install -r scripts/requirements-align.txt`). File transcript đã kèm nên render lại không cần tải mô hình.

```bash
python scripts/transcribe.py --model medium
# Rà soát nhận dạng và cập nhật src/data/script.json cho khớp lời đọc.
python scripts/prepare-audio.py
python scripts/calibrate-mix.py --target-db -24 --headroom-db 6
npm run captions
```

Lần đầu nhận dạng cần tải mô hình. Script chuẩn bị âm thanh từ chối transcript có hash không trùng file nguồn. Không áp dụng timestamp cũ cho MP3 mới.

## Kiểm tra và đóng gói

`python scripts/verify-media.py` kiểm tra định dạng/số frame, tương quan lời đọc, mức nhạc và đỉnh âm trên MP4; đồng thời xuất `out/1711-mix.mp3`. `python scripts/package-source.py` tạo gói nguồn `out/1711-source.zip` gồm tài nguyên, không gồm cache, node_modules hay video. Xem `ASSETS.md` và `MUSIC_NOTES.md` về nguồn tài nguyên.

## Video 1811

Dự án có thêm composition `ACBInvestorExit1811`, sử dụng `1811.mp3`. Chạy `npm run previews:1811` hoặc `npm run render:1811`; video mới xuất tại `out/1811.mp4`. Xem [README-1811.md](README-1811.md) để chỉnh nội dung và đóng gói. Các lệnh SCB cũ tiếp tục hoạt động.
