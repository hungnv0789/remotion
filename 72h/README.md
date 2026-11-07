# 72 giờ — Chủ động chuẩn bị

Dự án Remotion TypeScript độc lập, video TikTok **1080 × 1920, 30 fps**, dựng theo **bản thu `asset/72h.mp3`** và tinh thần hình ảnh trong `Kichban.md`.

## Chạy dự án

Yêu cầu Node.js 22 trở lên.

```bash
cd 72h
npm ci
npm run dev
```

Chọn composition `Emergency72Hours` trong Remotion Studio.

```bash
npm run typecheck
npm test
npm run still
npm run render
```

Video xuất tại `out/72h.mp4`. Lần đầu render, Remotion có thể tải Chrome Headless Shell. Linux cần [các thư viện hệ thống](https://www.remotion.dev/docs/miscellaneous/linux-dependencies).

## Lựa chọn nội dung đã thống nhất

Lời trong file MP3 khác phần Voice-over của `Kichban.md`. Theo lựa chọn của người dùng, **bản thu là chuẩn cho nội dung và thời gian**. Phụ đề theo lời đọc thực tế, gồm phần nói về EU/Canada và nhấn mạnh chuẩn bị không có nghĩa thảm họa sắp xảy ra. `Kichban.md` và các tài nguyên gốc được giữ nguyên.

CTA chia sẻ/theo dõi của kịch bản chỉ hiển thị bằng chữ ở cuối; không chèn lời giả hoặc dùng TTS để bổ sung vào bản thu. Các hình về sơ cứu, đèn pin và pin dự phòng minh họa danh mục chuẩn bị của kịch bản, không được thêm vào phụ đề nếu bản thu không đọc.

## Thời lượng và đồng bộ

File MP3 dài khoảng **38,43 giây**. Mặc định mở hình 0,6 giây trước giọng đọc và giữ kết thêm 1 giây sau khi file phát xong, thành khoảng **40 giây / 1.200 frame**. Trình duyệt đọc phần phát thực tế khoảng 38,38 giây do thông tin padding của MP3; phần dài file được kiểm tra bằng ffprobe khoảng 38,43 giây. Giữ tốc độ audio gốc để lời đọc rõ; có thể chỉnh `audio.playbackRate` nếu cần, timeline và phụ đề sẽ điều chỉnh cùng tỷ lệ.

`src/data/voiceover.json` chứa timestamp từ nhận dạng cục bộ, đã đối chiếu và sửa chính tả tiếng Việt. Mốc cảnh nằm giữa các cụm lời; phụ đề dùng cùng nguồn timestamp. Có thể tinh chỉnh `start`/`end` theo giây trong JSON nếu muốn căn ở mức phòng thu. JSON còn lưu SHA-256 để kiểm tra file MP3 phục vụ đúng với bản thu gốc.

`calculateMetadata()` đọc độ dài file thật, tự tính tổng frame; nếu thay file có độ dài khác hoặc đổi đường dẫn, dự án yêu cầu cập nhật dữ liệu căn lời để tránh dùng nhầm timestamp. Thay bản thu cùng độ dài vẫn cần căn lại; phép kiểm tra độ dài không thay thế việc đối chiếu nội dung.

## Cấu trúc

- `src/Root.tsx`: composition và metadata theo audio.
- `src/MainVideo.tsx`: timeline, giọng đọc, nhạc, font, phụ đề và logo cố định.
- `src/config.ts`: toàn bộ nội dung chữ, màu sắc, hình, âm thanh và props.
- `src/timing.ts`: đổi timestamp thành frame, chia cảnh và phụ đề.
- `src/scenes/`: Hook, Context, Supplies, Message, Closing.
- `src/components/`: ảnh, montage, icon và phụ đề.
- `src/data/voiceover.json`: lời đọc đã căn thời gian.
- `asset/`: tài nguyên gốc do người dùng cung cấp.
- `public/images/`: 8 ảnh minh họa được chọn, đặt tên ngắn và giữ nguyên dữ liệu JPEG.
- `public/audio/72h.mp3`: bản sao nguyên vẹn của file gốc để dùng với `staticFile()`.
- `public/audio/news-bed.wav`: nhạc nền nhẹ tự tổng hợp, không dùng còi hoặc âm báo động.
- `public/assets-manifest.json`: liên kết từng ảnh phục vụ với file nguồn.
- `scripts/prepare-assets.py`: tái tạo tài nguyên phục vụ và nhạc nền, chỉ dùng Python chuẩn.
- `tests/`: kiểm tra audio, ảnh, phụ đề, các mốc cảnh và thay đổi tốc độ đọc.

## Tùy chỉnh

Sửa `defaultProps` trong `src/config.ts`, chỉnh props trong Studio hoặc truyền JSON qua `--props`. Logo chữ `72H` và tên kênh nằm cố định ở góc trên bên phải. Font Be Vietnam Pro đóng gói cục bộ, hỗ trợ tiếng Việt. Mọi animation tính theo frame, không dùng timer hoặc CSS transition.

Nhạc nền mặc định đặt ở mức **12%**, fade đầu/cuối; giọng đọc giữ nổi bật với chút headroom khi trộn âm. Có thể đặt `audio.music: ''` để tắt nhạc hoặc trỏ sang file có sẵn trong `public/`. Không dùng ảnh thiên tai gây hoảng loạn; ảnh minh họa tập trung vào thực phẩm, đồ khẩn cấp và chuẩn bị tại nhà.

Để tái tạo các bản sao tài nguyên và nhạc nền sau khi đổi file nguồn:

```bash
python3 scripts/prepare-assets.py
```

Thao tác này không tự nhận dạng bản thu mới; cần cập nhật `voiceover.json` riêng. Nguồn thông tin công khai được đối chiếu tại [SOURCES.md](SOURCES.md).
