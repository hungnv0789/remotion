# 2511 · Công nghệ lõi và nguồn lực phát triển

Dự án Remotion độc lập dựng theo `2511.mp3`: video dọc **1080 × 1920, 30 fps**, phong cách Financial News / Motion Graphics, nền tím nhạt với màu nhấn **#8229e3**. Giữ nguyên giọng và tốc độ MP3; không tạo TTS. Thời lượng lấy từ audio thực tế, cộng 0,2 giây mở và 0,8 giây giữ cuối.

## Chạy dự án

Yêu cầu Node.js 22+.

```bash
cd 2511
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

`previews` xuất SRT, báo cáo thời gian và ảnh đầu/cuối từng cảnh. `render` xuất `out/2511.mp4` H.264/yuv420p kèm âm thanh AAC. Nếu cần chỉ định Chromium, đặt `REMOTION_BROWSER_EXECUTABLE`. Remotion có thể tải trình duyệt khi chạy lần đầu.

## Cấu trúc và tùy chỉnh

- `src/Root.tsx`: composition `FinancialNews2511`, đọc thời lượng MP3 qua `calculateMetadata`.
- `src/MainVideo.tsx`: sắp cảnh bằng Sequence, captions, font Việt và audio.
- `src/scenes/`: component cho từng phần lời dẫn.
- `src/config.ts`: màu, âm lượng, nhịp animation và các props mặc định.
- `src/data/editorial.json`: headline, số liệu, nhãn đồ họa và anchor chuyển hình theo câu nói.
- `src/data/script.json`: lời dẫn chuẩn hóa lỗi nhận dạng; `transcription.json`: ASR gốc; `voiceover.json`: timestamp từng từ.
- `src/components/NewsGraphics.tsx`: đồ họa SVG về công nghệ, công nghiệp, quốc gia, nguồn vốn và các mốc thời gian.
- `public/audio/2511/`: MP3 nguyên bản, nhạc tự tổng hợp và các manifest SHA-256.

Quả địa cầu và sơ đồ là minh họa hình học, không đóng vai trò bản đồ lãnh thổ lịch sử. Không sử dụng ảnh/video stock. Mỗi hình có chuyển động theo nhịp khoảng 3 giây, kết hợp zoom, flash và motion blur ngắn khi chuyển nội dung. Phụ đề chừa vùng điều khiển TikTok.

## Tái tạo dữ liệu căn lời và âm thanh

Bản nguồn đã có audio và timestamp để chạy trực tiếp bằng npm. Python chỉ cần khi thay bản thu, chỉnh lời hoặc tái tạo nhạc:

```bash
python3 -m venv .venv-align
.venv-align/bin/pip install -r scripts/requirements-align.txt
.venv-align/bin/python scripts/transcribe.py --model Systran/faster-whisper-medium
# Rà lỗi nhận dạng trong src/data/script.json trước khi căn thời gian.
.venv-align/bin/python scripts/prepare-audio.py
.venv-align/bin/python scripts/calibrate-mix.py
npm run previews
.venv-align/bin/python scripts/preview-contact.py
npm run render
.venv-align/bin/python scripts/verify-media.py
.venv-align/bin/python scripts/review-render.py
.venv-align/bin/python scripts/package-source.py
```

ASR tải mô hình nếu chưa có. Khi đổi MP3, cần nhận dạng/căn lời lại và sửa anchor của cảnh tương ứng. Pipeline kiểm tra hash nguồn, từ và timestamp trước khi dựng.

## Kiểm tra và đầu ra

`npm test` kiểm tra MP3 được giữ nguyên, tính liên tục timeline, caption không chồng nhau, anchor có trong lời và nhạc nhỏ hơn giọng. Sau render, `verify-media.py` kiểm tra kích thước, fps, số frame, tương quan với nguồn, mức nền từng cảnh và peak. Xem khung cuối và các cảnh trong `out/render-review.jpg`.

Đầu ra: `out/2511.mp4`, `out/2511.srt`, `out/2511-mix.mp3`, `out/2511-source.zip`. Báo cáo chi tiết nằm trong `PRODUCTION.md` và `out/*report*.json`, `out/audio-verification-2511.json`.
