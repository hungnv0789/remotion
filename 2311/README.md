# 2311 · Fed và giá của đồng tiền

Dự án Remotion độc lập, dựng theo `2311.mp3`. Video dọc **1080 × 1920, 30 fps**, nền tím nhạt và màu nhấn **#8229e3**. Giữ nguyên MP3 gốc và tốc độ đọc; không tạo TTS. Thời lượng tự tính từ audio, cộng 0,2 giây mở và 0,8 giây giữ cuối.

## Chạy dự án

Yêu cầu Node.js 22+.

```bash
cd 2311
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

`previews` xuất SRT, báo cáo timeline và ảnh đầu/cuối từng cảnh. `render` xuất `out/2311.mp4` H.264/yuv420p, có âm thanh. Có thể đặt `REMOTION_BROWSER_EXECUTABLE` nếu Chromium không ở đường dẫn mặc định. Remotion có thể tải trình duyệt khi chạy lần đầu.

## Cấu trúc

- `src/Root.tsx`: composition `FinancialNews2311`, tự đọc thời lượng MP3.
- `src/MainVideo.tsx`: Sequence, phụ đề, chuyển cảnh, voice-over và ducking nhạc.
- `src/config.ts`: màu, nội dung, mốc chuyển hình theo câu nói, nhãn và số liệu.
- `src/scenes/`: 9 cảnh riêng: hook, tin Fed, cơ chế, khoản vay, tiết kiệm, cổ phiếu, vàng, dầu, kết luận.
- `src/components/NewsGraphics.tsx`: sơ đồ dòng tiền, biểu đồ cột/đường và thẻ so sánh SVG.
- `src/data/script.json`: lời dẫn đã sửa lỗi nhận dạng; `transcription.json`: dữ liệu ASR; `voiceover.json`: timestamp từng từ.
- `public/audio/2311/`: MP3 nguyên bản, nhạc tự tổng hợp và manifest kiểm tra SHA-256.

Các đường giá là minh họa cơ chế, có nhãn nhận diện trên hình. Không thêm năm vào mốc 18/11. Nội dung chuyển thể từ lời đọc được cung cấp.

## Tái tạo audio và phụ đề

Chỉ cần Python khi chỉnh lời/căn thời gian hoặc tái tạo nhạc. Bản nguồn đã chứa audio và timestamp sẵn dùng.

```bash
python3 -m venv .venv-align
.venv-align/bin/pip install -r scripts/requirements-align.txt
.venv-align/bin/python scripts/transcribe.py --model Systran/faster-whisper-medium
# Rà lại lời trong src/data/script.json trước khi căn lời.
.venv-align/bin/python scripts/prepare-audio.py
.venv-align/bin/python scripts/calibrate-mix.py
npm run previews
.venv-align/bin/python scripts/preview-contact.py
npm run render
.venv-align/bin/python scripts/verify-media.py
.venv-align/bin/python scripts/review-render.py
.venv-align/bin/python scripts/package-source.py
```

ASR tải mô hình nếu máy chưa có. Không sửa MP3 để khớp văn bản. Khi thay bản thu phải nhận dạng và căn lời lại; pipeline từ chối nguồn có hash khác.

## Kiểm tra và đầu ra

`npm test` kiểm tra nguyên vẹn MP3, timeline, phụ đề, anchor theo lời và mức nhạc. `verify-media.py` kiểm tra MP4 thực tế: H.264, kích thước, fps, số frame, tương quan với giọng gốc và mức nền tại từng cảnh.

Sản phẩm: `out/2311.mp4`, `out/2311.srt`, `out/2311-mix.mp3`, `out/2311-source.zip`; báo cáo thời gian và âm thanh nằm cùng thư mục. Kiểm tra hình minh họa, dấu tiếng Việt và vùng phụ đề sau mỗi lần sửa trình bày.
