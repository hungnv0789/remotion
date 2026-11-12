# NHNN mua USD: tín hiệu thanh khoản — 1211-4

Dự án Remotion/React/TypeScript tạo video Financial News, faceless **1080 × 1920, 30 fps**, nền tím nhạt và màu nhấn **#8229e3**. Sáu chương gồm Hook, News, Swap/Giao ngay, Money Flow, Opportunity, Conclusion/CTA. Thời lượng **3.874 frame / 129,133 giây**; giữ đầy đủ lời thoại, không ép vào 60 giây.

## Chạy và xuất

Cần Node.js 22 trở lên. Trong `1211-4`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Chọn composition `MonetaryFlow1211`. Kết quả ở `out/1211-4.mp4`, `out/1211-4.srt` và `out/timing-report.json`. Audio và ảnh đã đóng gói cục bộ; render không cần TTS/API. Remotion có thể tải Chrome Headless Shell ở lần chạy đầu.

## Âm thanh và nhịp dựng

- `1211-4.mp3` là file voice-over hoàn chỉnh, giống nguyên byte với `public/audio/voiceover.mp3`.
- `female_north` là alias cấu hình của dự án. Bộ tổng hợp thực tế: **gTTS / Google Translate, `lang=vi`**, dùng một giọng nữ tiếng Việt mặc định xuyên suốt. Đây không phải ID giọng riêng của VNPT/FPT; gTTS không có tham số chọn miền/giọng riêng. Cấu hình, engine và mốc căn lời ghi tại `public/audio/production-manifest.json`.
- Chữ viết tắt và số được chuẩn hóa cách đọc trong `voiceover-tts.txt`; nội dung hiển thị vẫn giữ USD, VND, NHNN, 25.500 và 182.
- Nhịp giọng được tăng 1,12 lần bằng `atempo`, giữ cao độ. Sáu phần giọng cùng engine được ghép thành một file, có khoảng nghỉ ngắn giữa chương.
- Nhạc nền là bản electronic news **120 BPM** tạo mới bằng tổng hợp âm, có news sting, giảm âm dưới lời đọc và fade đầu/cuối.
- Intro có flash một lần, USD/VND vào từ hai phía, headline zoom và VND lan tỏa trong 7 giây đầu. Chương Hook tiếp tục theo hết lời đọc. Các lớp đồ họa còn lại thay nhịp mặc định 3,2 giây, kết hợp các mốc câu thực tế.

## Tổ chức và chỉnh sửa

`src/Root.tsx` đọc duration audio thực tế qua `calculateMetadata`. `src/MainVideo.tsx` xếp các Sequence, font, phụ đề và ba lớp âm thanh. Các chương nằm riêng trong `src/scenes/`; đồ họa tái sử dụng tại `src/components/`.

Sửa chữ, màu, đường dẫn, âm lượng, giả định tỷ giá và nhịp dựng tại `src/config.ts`. `scenario` chỉ tính quy đổi giả định, không biểu thị lượng USD thực sự đã mua. `src/finance.ts` tính 1 tỷ USD × 25.500 = 25.500 tỷ VND. Sơ đồ có nhãn giả định, ghi rõ cơ chế minh họa và không mô tả phân bổ thực tế. Không đưa mã cổ phiếu riêng lẻ hoặc coi bơm tiền là bảo đảm thị trường tăng.

`src/data/script.json` giữ đầy đủ lời thoại và bản phát âm. `src/data/voiceover.json` giữ timestamp từng từ; `src/timing.ts` tính frame và chia phụ đề. Thay chữ đồ họa không làm thay đổi giọng đọc. Khi thay audio phải tạo lại timestamp và hash; `voiceoverStartSeconds` và `playbackRate` dịch đồng bộ cảnh/phụ đề.

## Tạo lại TTS và nhạc (tùy chọn)

Không cần bước này để render bản hiện tại. Dùng Python 3.10+:

```bash
python3 -m venv .venv-audio
.venv-audio/bin/pip install -r scripts/requirements-audio.txt
.venv-audio/bin/python scripts/generate-audio.py --model small
npm run captions
```

Lần đầu faster-whisper có thể tải model `small`; có thể truyền `--model /duong/dan/model` để dùng model cục bộ. gTTS cần Internet khi tạo giọng. Cache ở `out/tts-cache/`; xóa các đoạn cache đã sửa nội dung trước khi tạo lại. `FFMPEG_BINARY` cho phép chỉ định ffmpeg riêng. Mặc định dùng ffmpeg Linux đi kèm Remotion. Không đặt khóa API vào source.

## Kiểm tra và nguồn

`npm test` kiểm tra bảo toàn audio, đủ lời thoại, timestamp/caption, mốc scene, phép quy đổi giả định và tài nguyên có giấy phép. Kiểm tra cảnh, phụ đề tiếng Việt, âm lượng, nhịp cắt và frame cuối. Nội dung chính sách sử dụng theo kịch bản được cung cấp, không xác minh lại thông tin. Ảnh và âm thanh được ghi nguồn trong [ASSETS.md](ASSETS.md).
