# 1911 · Anthropic IPO

Faceless Financial News / Motion Graphics, 1080 × 1920, 30 fps. Giọng Ngọc Huyền, nữ miền Bắc của VieNeu-TTS v3 Turbo. Hook nền tối có wordmark chữ, counter $83 và đối chiếu SpaceX; các cảnh sau nền tím nhạt với điểm nhấn `#8229e3`.

## Chạy và render

Node.js ≥22:

```bash
cd 1911
npm ci
npm run dev
npm run typecheck
npm test
npm run previews
npm run render
```

Composition `AnthropicIPO1911`. Video `out/1911.mp4`, H.264/yuv420p. `npm run captions` xuất `out/1911.srt` và `out/timing-report.json`. Có thể đặt `REMOTION_BROWSER_EXECUTABLE`; Remotion tự tải Chrome nếu máy chưa có.

Thời lượng theo bản TTS thực tế, không cố định các mốc 00:00–01:28 trong phần phác thảo. Lời đọc ưu tiên bản voice-over liền mạch người dùng cung cấp, gồm điều kiện chào bán bổ sung, đầu tư riêng và CTA đầy đủ. Video khoảng 118,6 giây với 7 cảnh và 42 cue phụ đề.

## Cấu trúc và chỉnh sửa

- `src/Root.tsx`: composition, kích thước, fps và metadata thời lượng audio.
- `src/MainVideo.tsx`: scene, caption, nền hook, âm thanh và whoosh theo câu điều kiện.
- `src/config.ts`: toàn bộ copy, dữ liệu số, màu, asset và mốc đổi hình theo cụm lời.
- `src/scenes/`: Hook, Demand, Valuation, Size, Option, Private, Closing.
- `src/components/IPOGraphics.tsx`: counter, các thanh so sánh, cổ phiếu bổ sung, hai dòng vốn và hai kịch bản ANT.
- `src/data/script.json`: `text` cho phụ đề; `speech` viết lại tên tiếng Anh và số để TTS phát âm rõ.
- `src/data/voiceover.json`: timestamp căn từ theo audio đã tạo.
- `public/audio/`: voice-over, nhạc 106 BPM, news sting, rising whoosh và manifest.

Các khoản không được nhập nhằng: định giá Anthropic khoảng 1.500 tỷ USD tính cả cổ phiếu thưởng/quyền mua, SpaceX 1.770 tỷ; IPO cơ sở 81,34 tỷ so với SpaceX bán đầu 75 tỷ và tổng 86,25 tỷ; 93,54 tỷ chỉ khi bán hết 147 triệu cổ phiếu bổ sung; 26 tỷ là kế hoạch huy động riêng, không cộng thành quy mô IPO. Hai đường giá ANT được gắn nhãn minh họa, không hiển thị giá thực tế hoặc mức tăng/giảm giả.

## Tái tạo audio

Bản WAV/MP3 và timestamp đã kèm dự án, không cần TTS để chỉ đổi hình hoặc render lại. Để tạo lại giọng, cài SDK VieNeu-TTS 3.8.4 và backend ONNX trong môi trường Python cho TTS; ASR dùng môi trường riêng:

```bash
python scripts/generate-speech.py --voice 'Ngọc Huyền' --tempo 1.12 --threads 3
pip install -r scripts/requirements-align.txt
python scripts/align-audio.py --model small
python scripts/calibrate-mix.py --target-db -22 --headroom-db 6
npm run captions
```

TTS chuẩn hóa các cách đọc: Anthropic, SpaceX, Claude, IPO, ANT, Nasdaq, Google/Nvidia và các số tiền. Chữ trên màn hình vẫn giữ tên và số gốc. Cache raw/processed audio từng cảnh và plan ở `out/tts-cache/`; nếu tạo lại giọng phải căn lại phụ đề, giữ playback rate Remotion bằng 1. Có thể đặt `FFMPEG_BINARY` và `FFPROBE_BINARY` cho các script hỗ trợ.

## Kiểm tra và đóng gói

`python scripts/verify-media.py` đo đồng bộ giọng, mức nhạc và đỉnh tín hiệu trên MP4, chọn cửa sổ có lời theo timeline từng cảnh; đồng thời xuất `out/1911-mix.mp3`. `python scripts/package-source.py` tạo `out/1911-source.zip` chứa source và tài nguyên, bỏ qua node_modules, video và cache. Test gồm kiểm tra toàn bộ lời dẫn, timestamp, audio hash, phép tính chênh lệch và các nhãn điều kiện.

Nội dung dựng theo kịch bản người dùng cung cấp, không bổ sung thông tin thời sự ngoài kịch bản. Xem `ASSETS.md` và `MUSIC_NOTES.md` để biết nguồn tài nguyên.
