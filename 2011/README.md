# 2011 · APEC Thâm Quyến: ngoại giao, thương mại và an ninh

Dự án Remotion độc lập, dùng trực tiếp `2011.mp3`. Video dọc 1080 × 1920, 30 fps, phong cách motion graphics tin tức/bình luận, nền tím nhạt `#8229e3`. Giữ toàn bộ âm thanh, playback rate bằng 1, không TTS hoặc cắt ngắn lời dẫn.

## Chạy dự án

Node.js ≥22:

```bash
cd 2011
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

Composition: `FinancialNews2011`. Video H.264/yuv420p: `out/2011.mp4`; phụ đề: `out/2011.srt`; timeline: `out/timing-report-2011.json`. Thời lượng tính từ file thực tế, khoảng 195,6 giây. `REMOTION_BROWSER_EXECUTABLE` cho phép chọn Chrome; Remotion tải trình duyệt nếu chưa có.

## Nội dung và cách thể hiện

11 cảnh gồm: mở đầu Mỹ – Trung – Nga; đón tiếp sân bay; mốc nghi thức; các đoàn Việt Nam/Hàn Quốc/Nhật Bản; bố cục Việt Nam; thương mại/kinh tế số/AI; phát biểu về trừng phạt và hợp tác của Nga; vấn đề hạt nhân/START; Iran; chuỗi dịch vụ bán dẫn; và các bất đồng còn lại.

Nội dung chữ được chuẩn hóa chính tả và tên riêng theo audio. Mốc năm ban đầu được ASR medium nhận dạng là 2016; lượt rà riêng giây 10–17 bằng large-v3-turbo nhận dạng 2026. Dữ liệu lưu tại `src/data/transcription.json`, trường `reviewedYear`.

Đây là chuyển thể lời bình luận người dùng cung cấp. Không tự bổ sung số liệu thị trường, lượng vũ khí, dự báo hoặc nguyên nhân ngoài lời dẫn. Các đồ họa quốc gia, sơ đồ đón tiếp, bố cục lãnh đạo và chuỗi công nghệ là minh họa, không phải ảnh sự kiện hay tài liệu chính thức.

## Cấu trúc

- `src/Root.tsx`: khai báo composition và đọc thời lượng audio.
- `src/MainVideo.tsx`: timeline, caption, font tiếng Việt và audio.
- `src/config.ts`: toàn bộ copy, màu sắc, đường dẫn và mốc đổi hình.
- `src/scenes/`: 11 component cảnh; `src/components/WorldGraphics.tsx`: đồ họa SVG.
- `src/data/script.json`: lời dẫn đã rà; `transcription.json`: kết quả ASR; `voiceover.json`: timestamp từng từ.
- `public/audio/2011/`: MP3 nguồn giữ nguyên byte, WAV tham chiếu, nhạc/hiệu ứng bổ sung và manifest.
- `tests/timeline.test.ts`: kiểm tra hash, timeline, lời phụ đề, mốc đổi cảnh, tài nguyên, thời lượng và mốc năm đã rà.

## Căn lại khi đổi file âm thanh

Các tài nguyên đã kèm nên render lại không cần nhận dạng hoặc TTS. Nếu thay nguồn, cần Python với NumPy/faster-whisper/PyAV:

```bash
pip install -r scripts/requirements-align.txt
python scripts/transcribe.py --model medium
# Rà lại src/data/transcription.json và src/data/script.json.
python scripts/prepare-audio.py
python scripts/calibrate-mix.py --target-db -24 --headroom-db 6
npm run captions
```

Chuẩn bị audio từ chối transcript có SHA-256 không trùng MP3 nguồn. Timestamp được căn theo chính file mới, không kéo giãn một bộ phụ đề cũ. Lần tải mô hình đầu tiên cần mạng.

## Hậu kỳ và gói nguồn

`python scripts/verify-media.py` đo tương quan audio nguồn, mức nhạc và clipping trên MP4; các cửa sổ lấy từ lời đọc từng cảnh. Script cũng xuất `out/2011-mix.mp3`. Có thể đặt `FFMPEG_BINARY`/`FFPROBE_BINARY` cho script kiểm tra. `python scripts/package-source.py` xuất `out/2011-source.zip`, bỏ qua node_modules, video và cache.

Nhạc bổ sung 108 BPM và whoosh được tổng hợp bằng mã, không dùng sample bên thứ ba; phối nhẹ, có duck và fade. Font Be Vietnam Pro, SIL OFL. Xem `ASSETS.md` và `MUSIC_NOTES.md`.
