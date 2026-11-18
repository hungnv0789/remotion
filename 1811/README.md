# 1811 · Hưng Yên: lộ trình đô thị và hạ tầng

Dự án Remotion độc lập trong thư mục `1811`, dùng trực tiếp file âm thanh `1811.mp3`. Video dọc 1080 × 1920, 30 fps; nền tím nhạt, điểm nhấn `#8229e3`. Lời dẫn và thời lượng được căn theo phiên bản MP3 hiện tại, không tái sử dụng timestamp từ lần xuất trước.

## Chạy dự án

Yêu cầu Node.js ≥ 22:

```bash
cd 1811
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

Đầu ra: `out/1811.mp4` (H.264/yuv420p), `out/1811.srt` và `out/timing-report-1811.json`. Nếu cần chọn Chrome, đặt `REMOTION_BROWSER_EXECUTABLE`. Render lại dùng toàn bộ tài nguyên cục bộ, không cần nhận dạng giọng nói hoặc TTS.

## Cấu trúc và chỉnh sửa

- `src/Root.tsx`: composition, kích thước, fps và thời lượng theo audio thực tế.
- `src/MainVideo.tsx`: timeline, phụ đề, font, chuyển cảnh và phối âm.
- `src/config.ts`: nội dung hiển thị, palette, đường dẫn và mốc chuyển hình theo lời đọc.
- `src/scenes/`: các phân cảnh; `src/components/`: SVG, UI và caption.
- `src/data/`: lời thoại đã chuẩn hóa chính tả, kết quả ASR và timestamp từng từ.
- `public/audio/1811/`: MP3 nguồn giữ nguyên byte, nhạc bổ sung và manifest.
- `scripts/`: chuẩn bị âm thanh, xuất phụ đề, render, kiểm tra và đóng gói.

Đồ họa chỉ minh họa nội dung lời dẫn; không dùng bảng giá, văn bản công bố hoặc hình ảnh sự kiện giả. Các con số và trạng thái phấn đấu được trình bày như mục tiêu, không phải kết quả đã hoàn thành. Mốc 2028 trong phụ đề và đồ họa được dùng theo yêu cầu trực tiếp của người dùng; âm thanh giữ nguyên.

## Căn lại khi đổi âm thanh

Cần Python, NumPy và faster-whisper (`pip install -r scripts/requirements-align.txt`):

```bash
python scripts/transcribe.py --model medium
# Rà chính tả, tên riêng và cập nhật src/data/script.json.
python scripts/prepare-audio.py
python scripts/calibrate-mix.py --target-db -24 --headroom-db 6
npm run captions
```

Lần đầu nhận dạng cần tải mô hình. Script chuẩn bị từ chối transcript có hash khác audio nguồn. Giữ playback rate bằng 1; không dùng dữ liệu căn lời cũ cho file âm thanh mới.

## Kiểm tra bản xuất

`python scripts/verify-media.py` kiểm tra định dạng, số frame, đồng bộ lời đọc, mức nhạc và đỉnh âm trên chính MP4; đồng thời xuất `out/1811-mix.mp3`. `python scripts/package-source.py` tạo `out/1811-source.zip` chứa dự án độc lập và tài nguyên, bỏ qua video, cache và node_modules.

Nhạc và whoosh bổ sung được tổng hợp bằng mã, không dùng sample/bản ghi bên thứ ba; có duck và fade. Font Be Vietnam Pro qua Fontsource, SIL OFL. Quyền đối với âm thanh nguồn thuộc nguồn người dùng cung cấp.
