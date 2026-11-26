# 2611 · Vàng nhẫn PNJ và chênh lệch giá

Dự án Remotion độc lập dựng theo `2611.mp3`: **1080 × 1920, 30 fps**, phong cách Financial News / Motion Graphics. Nền tím nhạt #F8F3FD, điểm nhấn #8229e3. Giữ nguyên giọng, tốc độ và phần kết MP3; không tạo TTS. Thời lượng lấy từ audio thực tế, cộng 0,2 giây mở và 0,8 giây giữ cuối.

## Chạy dự án

Yêu cầu Node.js 22+.

```bash
cd 2611
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

`previews` xuất SRT, báo cáo timeline và ảnh đầu/cuối từng cảnh. `render` xuất `out/2611.mp4` H.264/yuv420p kèm AAC. Có thể đặt `REMOTION_BROWSER_EXECUTABLE` để dùng Chromium cục bộ; Remotion có thể tải trình duyệt khi chạy lần đầu.

## Nội dung và cấu trúc

8 cảnh: hook, diễn biến mới, bảng giá 25/11, chênh lệch giữa thương hiệu, vị thế giá PNJ, bối cảnh điều chỉnh, giá trong nước/thế giới và cuộc đua giá. Có 22 bố cục nội dung, 30 cue phụ đề.

- `src/Root.tsx`: composition `FinancialNews2611`, tự tính thời lượng qua `calculateMetadata`.
- `src/MainVideo.tsx`: Sequence, font Việt, phụ đề, chuyển cảnh và audio.
- `src/scenes/`: component cho từng phần lời dẫn.
- `src/config.ts`: màu, nhịp chuyển động, âm lượng và props mặc định.
- `src/data/editorial.json`: headline, nhãn, bảng giá và anchor chuyển hình theo lời.
- `src/data/script.json`: lời dẫn chuẩn hóa lỗi nhận dạng; `transcription.json`: ASR gốc; `voiceover.json`: timestamp từng từ. Phần đối chiếu tên thương hiệu và kết âm thanh lưu trong `transcription-review.json`.
- `src/components/NewsGraphics.tsx`: nhẫn vàng SVG, bảng giá, so sánh, donut và đồ thị minh họa.
- `public/audio/2611/`: MP3 nguyên bản, nhạc nền tổng hợp, manifest và SHA-256.

Giá mua PNJ 126, giá bán 131,5; giá bán SJC/DOJI 133,5 và Mi Hồng 134 triệu đồng/lượng được trình bày theo lời dẫn, gắn mốc sáng 25/11. Không thêm năm hoặc cập nhật bảng giá. Đồ thị đường chỉ minh họa xu hướng, có nhãn nhận diện. Các giá trị mua vào, bán ra và chênh giá thế giới được tách rõ.

## Tái tạo dữ liệu căn lời và nhạc

Bản nguồn đã có tài nguyên và timestamp để chạy bằng npm. Python chỉ cần khi thay audio, sửa lời hoặc tái tạo nhạc:

```bash
python3 -m venv .venv-align
.venv-align/bin/pip install -r scripts/requirements-align.txt
.venv-align/bin/python scripts/transcribe.py
# Rà lại tên thương hiệu và chính tả trong src/data/script.json.
.venv-align/bin/python scripts/prepare-audio.py
.venv-align/bin/python scripts/calibrate-mix.py
npm run previews
.venv-align/bin/python scripts/preview-contact.py
npm run render
.venv-align/bin/python scripts/verify-media.py
.venv-align/bin/python scripts/review-render.py
.venv-align/bin/python scripts/package-source.py
```

ASR tải mô hình nếu chưa có. Khi thay MP3 cần nhận dạng, căn lời và cập nhật anchor. Pipeline từ chối hash nguồn khác với transcript; không cắt hoặc thay đổi tốc độ MP3 để khớp phụ đề.

## Kiểm tra và đầu ra

`npm test` kiểm tra nguyên vẹn MP3, timeline, caption, thứ tự anchor và mức nền. `verify-media.py` kiểm tra MP4 thực tế: codec, kích thước, fps, số frame, tương quan với nguồn, mức nhạc mỗi cảnh và peak. Xem khung cuối, dấu tiếng Việt và vùng an toàn TikTok trong `out/render-review.jpg`.

Sản phẩm: `out/2611.mp4`, `out/2611.srt`, `out/2611-mix.mp3`, `out/2611-source.zip`. Báo cáo: `PRODUCTION.md`, `out/timing-report-2611.json`, `out/audio-verification-2611.json`.
