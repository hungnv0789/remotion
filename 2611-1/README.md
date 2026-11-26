# 2611-1 · Đề xuất thuế Mỹ và Việt Nam

Dự án Remotion độc lập dựng theo `2611-1.mp3`: **1080 × 1920, 30 fps**, Financial News / Motion Graphics, nền tím nhạt #F8F3FD và điểm nhấn #8229e3. Giữ nguyên MP3, tốc độ và phần kết âm thanh; không tạo TTS. Thời lượng theo audio thực tế, cộng 0,2 giây mở và 0,8 giây giữ cuối.

## Chạy dự án

Yêu cầu Node.js 22+.

```bash
cd 2611-1
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

`previews` xuất SRT, báo cáo timeline và ảnh đầu/cuối từng cảnh. `render` tạo `out/2611-1.mp4` H.264/yuv420p, AAC. Có thể đặt `REMOTION_BROWSER_EXECUTABLE` nếu cần chỉ định Chromium cục bộ. Remotion có thể tải trình duyệt khi chạy lần đầu.

## Nội dung và cấu trúc

6 cảnh, 15 bố cục nội dung, 20 cue phụ đề: hook, thông báo USTR, các nhóm thuế, Việt Nam/Trung Quốc, phản hồi Bộ Công Thương, khả năng đàm phán.

- `src/Root.tsx`: composition `FinancialNews2611V1`; `calculateMetadata` lấy thời lượng MP3.
- `src/MainVideo.tsx`: Sequence, caption, font Việt, chuyển cảnh và audio.
- `src/scenes/`: component cho từng phân cảnh.
- `src/config.ts`: theme, âm lượng, nhịp chuyển động và props mặc định.
- `src/data/editorial.json`: headline, quốc gia, mức thuế và anchor chuyển hình theo lời.
- `src/data/script.json`: lời dẫn chuẩn hóa chính tả; `transcription.json`: ASR gốc; `voiceover.json`: timestamp từng từ.
- `src/components/NewsGraphics.tsx`: bảng thuế 5 hàng, globe hình học, thẻ so sánh, timeline và sơ đồ đàm phán.
- `public/audio/2611-1/`: MP3 nguyên bản, nhạc tổng hợp và manifest SHA-256.

Các mức 15%, tối đa 18%, 20%, 25% và tối đa 35% được trình bày theo lời dẫn. 35% → 20% là khả năng nếu đạt hiệp định, không phải mức đã chốt. Nhãn “đề xuất/chưa có hiệu lực” được giữ trên video. Mốc tin 25/11 không bổ sung năm. Globe chỉ minh họa kết nối, không phải bản đồ địa lý hoặc lãnh thổ.

## Tái tạo căn lời và nhạc

Tài nguyên và timestamp đã có sẵn để chạy bằng npm. Python chỉ cần khi thay MP3, sửa lời hoặc tạo lại nhạc:

```bash
python3 -m venv .venv-align
.venv-align/bin/pip install -r scripts/requirements-align.txt
.venv-align/bin/python scripts/transcribe.py
# Rà chính tả/tên riêng trong src/data/script.json trước khi căn lời.
.venv-align/bin/python scripts/prepare-audio.py
.venv-align/bin/python scripts/calibrate-mix.py
npm run previews
.venv-align/bin/python scripts/preview-contact.py
npm run render
.venv-align/bin/python scripts/verify-media.py
.venv-align/bin/python scripts/review-render.py
.venv-align/bin/python scripts/package-source.py
```

ASR tải mô hình nếu chưa có. Khi thay nguồn phải nhận dạng, căn lời và cập nhật anchor tương ứng; pipeline kiểm tra hash nguồn và thứ tự timestamp trước khi render.

## Kiểm tra và đầu ra

`npm test` kiểm tra nguyên vẹn MP3, timeline, caption không chồng/lặp, anchor đúng thứ tự và mức nền. `verify-media.py` kiểm tra MP4 thực tế: codec, kích thước, fps, số frame, tương quan nguồn, mức nhạc mỗi cảnh và peak.

Đầu ra: `out/2611-1.mp4`, `out/2611-1.srt`, `out/2611-1-mix.mp3`, `out/2611-1-source.zip`. Xem `PRODUCTION.md`, `out/render-review.jpg`, `out/audio-verification-2611-1.json` và `out/timing-report-2611-1.json` để rà kết quả.
