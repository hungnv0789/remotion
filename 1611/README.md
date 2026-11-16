# 1611 · Lãi tiền gửi càng cao, càng không nên vội gửi tiết kiệm?

Faceless Financial News / Motion Graphics, 1080 × 1920, 30 fps. Màu tím nhạt, điểm nhấn `#8229e3`, giọng Ngọc Huyền (nữ miền Bắc) của VieNeu-TTS. Nhạc News tension + Electronic finance tổng hợp riêng, phối nhỏ hơn lời đọc.

## Chạy và xuất video

Node.js ≥ 22:

```bash
cd 1611
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

Composition: `SavingsTurningPoint1611`. Video: `out/1611.mp4`, H.264/yuv420p. `npm run captions` xuất `out/1611.srt` và `out/timing-report.json`. Thời lượng tính từ audio thực tế cộng phần mở đầu và khoảng giữ CTA; không cố định 90 giây. Có thể đặt `REMOTION_BROWSER_EXECUTABLE` để chọn Chrome; nếu chưa có, Remotion tự tải trình duyệt.

## Cấu trúc

- `src/Root.tsx`: khai báo composition và đọc thời lượng âm thanh.
- `src/MainVideo.tsx`: sắp cảnh, font tiếng Việt, phụ đề và trộn âm thanh.
- `src/scenes/`: 9 scene, mỗi scene dùng các nhịp đồ họa riêng theo lời dẫn.
- `src/components/FinanceGraphics.tsx`: SVG điện thoại, sổ tiết kiệm, dòng tiền, chi phí vốn, tài sản, khóa tiền, điểm uốn, chứng khoán và bất động sản.
- `src/config.ts`: văn bản hiển thị, palette, audio và cụm từ làm mốc chuyển cảnh.
- `src/data/script.json`: bản lời dẫn từng cảnh và chữ viết cho TTS; `voiceover.json`: timestamp từng từ.
- `public/audio/`: bản thu hoàn chỉnh, nhạc, whoosh, thông số phối và manifest engine.
- `scripts/`: tạo giọng, căn lời, tổng hợp nhạc, render, kiểm tra và đóng gói.

Giữ nguyên ý thận trọng trong script: lãi suất cao không đồng nghĩa all-in; tránh khóa toàn bộ tiền hoặc rút hết tiết kiệm; giá giảm chưa đủ để mua. Đồ thị minh họa không có số liệu giảm giá hoặc mã cổ phiếu. Cảnh bất động sản không gắn chu kỳ hồi phục cố định. Bản lời dẫn ưu tiên phiên bản đầy đủ từng cảnh, bao gồm “Tuy nhiên” và “Đừng mua chỉ vì giá đã giảm sâu”.

## Tái tạo TTS và phụ đề

Cài SDK VieNeu-TTS 3.8.4 theo tài liệu chính thức; Python cần NumPy, soundfile và backend ONNX. Bản MP3/WAV đã kèm dự án, không cần TTS để render lại.

```bash
python scripts/generate-speech.py --voice 'Ngọc Huyền' --tempo 1.12
pip install -r scripts/requirements-align.txt
python scripts/align-audio.py --model small
python scripts/calibrate-mix.py --target-db -22 --headroom-db 6
npm run captions
```

Bộ tạo giọng chèn khoảng nghỉ 0,3 giây trong hook trước “càng không nên”, bù tốc độ `atempo` để giữ đúng độ dài phần nghỉ được chèn. ASR căn chính bản đọc đầu ra, không nội suy đều theo số từ. Đổi audio phải căn lại phụ đề. Lần tải mô hình đầu tiên cần mạng. Có thể đặt `FFMPEG_BINARY`/`FFPROBE_BINARY`.

## Kiểm tra và đóng gói

`python scripts/verify-media.py` dùng NumPy và ffmpeg để kiểm tra định dạng, số frame, mức nhạc/lời, tương quan bản đọc và đỉnh âm thanh trên chính MP4; đồng thời xuất `out/1611-mix.mp3`. `python scripts/package-source.py` tạo `out/1611-source.zip` kèm toàn bộ audio, bỏ qua node_modules, cache và video. Xem `MUSIC_NOTES.md` và `ASSETS.md` về xuất xứ tài nguyên.
