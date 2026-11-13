# Nvidia, thị trường Mỹ và niềm tin nhà đầu tư — 1311

Dự án Remotion/React/TypeScript tạo video faceless Financial News **1080 × 1920, 30 fps, 90 giây / 2.700 frame**, nền tím nhạt và màu nhấn **#8229e3**. Giữ đủ lời thoại, chia 7 chương, phụ đề theo từng từ; nhịp đổi hình mặc định 3,2 giây và theo các câu chuyển ý.

## Chạy dự án

Cần Node.js 22 trở lên. Từ thư mục `1311`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Chọn composition `NvidiaLeadership1311`. Kết quả ở `out/1311.mp4`, `out/1311.srt` và `out/timing-report.json`. Lần chạy đầu Remotion có thể tải Chrome Headless Shell. Audio, ảnh và font đều được dùng cục bộ; **render bản hiện tại không cần Python, model TTS hoặc khóa API**.

## Giọng đọc và âm thanh

Dùng đúng **VieNeu-TTS v3 Turbo**, SDK **3.8.4**, backend **ONNX CPU fp32**, đầu ra gốc **48 kHz**. Alias `female_north` ánh xạ trực tiếp tới preset **Ngọc Huyền**, được SDK mô tả **“Nữ · Bắc · Giọng đọc tự nhiên”**. Mọi đoạn đều gọi cùng preset, không dùng gTTS hoặc engine thay thế, không clone giọng Jensen Huang hay cá nhân trong câu chuyện.

File giọng hoàn chỉnh: `1311.mp3`, giống nguyên byte với `public/audio/voiceover.mp3`. Cách đọc tên riêng/số được chuẩn hóa trong `voiceover-tts.txt`; phụ đề vẫn hiển thị Jensen Huang, Colette Kress, Nvidia, S&P 500, Nasdaq và các số gốc. Tốc độ hậu xử lý `atempo=1.24`, giữ cao độ, để đủ lời trong khoảng 90 giây. Khoảng nghỉ giữa chương là 0,14 giây; phần giữ hình cuối được tính từ duration audio thực tế.

Nhạc soft electronic finance **116 BPM** được tổng hợp mới từ oscillator, không dùng bản ghi hoặc sample bên thứ ba. Nền nhạc được cân thấp hơn giọng đọc khoảng **22–25 dB** khi có lời, duck theo phụ đề và fade đầu/cuối. Cấu hình đo được nằm ở `public/audio/mix-calibration.json`. Engine, preset, duration, hash và kết quả căn lời nằm trong `public/audio/production-manifest.json`.

## Cấu trúc và chỉnh sửa

- `src/Root.tsx`: composition và metadata duration từ audio thực tế.
- `src/MainVideo.tsx`: Sequence, bố cục, font, caption và ba lớp âm thanh.
- `src/scenes/`: Hook, Leadership, Market, Confidence, Questions, Lesson, Closing.
- `src/components/`: chip AI, đồ thị, portrait, ticker, nhịp đổi hình và UI.
- `src/config.ts`: toàn bộ chữ đồ họa, màu, đường dẫn ảnh, âm lượng và nhịp dựng.
- `src/data/script.json`: lời thoại hiển thị và bản phát âm TTS.
- `src/data/voiceover.json`: timestamp từng từ; `src/timing.ts` tính frame và cue.
- `Kichban.md`, `voiceover.txt`: bản kịch bản để đọc/biên tập.

Đổi chữ trên hình không thay lời đọc. Khi đổi kịch bản, cập nhật cả `text` và `speech` trong `script.json`, tạo lại voice-over, căn lời và xuất lại SRT. Khi thay audio thủ công cần cập nhật timestamp, duration và SHA-256. `playbackRate` và `voiceoverStartSeconds` dịch đồng bộ cảnh/caption. Mức giảm trong phiên và kết phiên được trình bày riêng; đồ thị không mô phỏng dữ liệu giá thật.

## Tạo lại VieNeu-TTS (tùy chọn)

Model không được đưa vào ZIP. Cần Python 3.10+, hỗ trợ venv và Internet để tải model lần đầu. SDK được ghim theo bản đã sử dụng:

```bash
python3 -m venv .venv-voice
.venv-voice/bin/pip install --no-deps 'vieneu @ git+https://github.com/pnnbao97/VieNeu-TTS.git@22dd2ef2a89bba24a77da6dbc84c75f7f4fda05b'
.venv-voice/bin/pip install -r scripts/requirements-voice.txt
.venv-voice/bin/python scripts/generate-speech.py --voice 'Ngọc Huyền' --tempo 1.24

python3 -m venv .venv-align
.venv-align/bin/pip install -r scripts/requirements-align.txt
.venv-align/bin/python scripts/align-audio.py --model small
.venv-align/bin/python scripts/calibrate-mix.py --target-db -22
npm run captions
```

Preset inference không cần Torch hoặc Gradio. Máy thiếu `ensurepip` có thể dùng `virtualenv` để tạo môi trường. Có thể truyền thư mục Whisper cục bộ qua `--model`; `FFMPEG_BINARY` cho phép chỉ định ffmpeg khác, mặc định là binary Linux đi kèm Remotion. Cache TTS dùng hash nội dung và preset trong `out/tts-cache/`.

## Kiểm tra và nguồn

`npm test` kiểm tra audio nguyên vẹn, giữ đủ script, timeline/caption, mốc chuyển hình, đúng engine/preset nữ miền Bắc, tài nguyên có nguồn và duration 90 giây. Kiểm tra dấu tiếng Việt, từng cảnh, nhịp đọc và frame cuối. Nội dung tin tức được dựng theo kịch bản người dùng, không xác minh lại thông tin. Xem [ASSETS.md](ASSETS.md) và `CREDITS.txt`.

## Các bản để so sánh

Bản hiện tại dùng Ngọc Huyền và nhạc mới. `out/1311-ngoc-huyen.mp4` và `out/1311-ngoc-huyen-mix.mp3` là bản xem/nghe. Bản Mai Anh trước đó được giữ ở `out/1311-mai-anh.mp4`, `out/1311-mai-anh.mp3`, `out/1311-mai-anh-source.zip`.

Sau khi tạo lại giọng và căn lời, chạy `python scripts/calibrate-mix.py --target-db -22` trong môi trường có NumPy để cân lại nhạc (kèm 6 dB dự phòng cho cách trộn mono/stereo). Đổi `audio.musicVolume`/`audio.musicDuck` trong props sẽ thay mức phối khi render. Nguồn nhạc và bằng chứng tạo mới được ghi trong `MUSIC_NOTES.md`.
