# Phố Wall, bầu cử và AI — 1111

Dự án Remotion độc lập bằng React/TypeScript, dựng theo `1111.mp3`. Video **1080 × 1920, 30 fps**, nền tím nhạt với màu nhấn **#8229e3**. Thời lượng mặc định **4.079 frame / 135,967 giây**, gồm khoảng 134,953 giây bản thu được giải mã và 1 giây giữ hình cuối. Không giới hạn 60 giây.

## Chạy và render

Cần Node.js 22 trở lên. Trong thư mục `1111`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Chọn composition `Story1111` trong Studio. Video ở `out/1111.mp4`, phụ đề ở `out/1111.srt`, mốc cảnh ở `out/timing-report.json`. Lần đầu Remotion có thể tải Chrome Headless Shell. Không cần dịch vụ trả phí hoặc khóa API; font, audio và minh họa đều nằm trong dự án sau khi cài dependencies.

## Cấu trúc

- `src/Root.tsx`: khai báo composition; `calculateMetadata` đọc thời lượng audio thực tế.
- `src/MainVideo.tsx`: bố cục TikTok, font tiếng Việt, các Sequence, phụ đề và bản thu.
- `src/scenes/`: 9 cảnh: mở đầu, Quốc hội, JPMorgan, hồ sơ, chuyển sang công nghệ, AI và điện, tác động chính sách, điểm chung, kết luận. Cảnh dài có nhiều pha đổi hình.
- `src/components/`: các khối giao diện, biểu đồ, Quốc hội, hồ sơ, trung tâm dữ liệu viết bằng React/SVG.
- `src/config.ts`: toàn bộ chữ đồ họa, màu sắc, đường dẫn và props âm thanh/thời gian.
- `src/data/voiceover.json`: lời dẫn, timestamp từng từ và hash bản thu.
- `src/timing.ts`: tính frame theo audio, chia cảnh và nhóm phụ đề.
- `Kichban.md`: bản chép lời để đọc và biên tập.
- `public/audio/1111.mp3`: bản sao nguyên byte của âm thanh đầu vào.

## Chỉnh sửa

Sửa chữ và màu tại `defaultProps` trong `src/config.ts`. `audio.playbackRate` và `timing.voiceoverStartSeconds` đồng bộ cả cảnh lẫn phụ đề; `endingHoldSeconds` điều chỉnh thời gian giữ hình cuối. Khi thay MP3 cần cập nhật lại timestamp, thời lượng và SHA-256 trong `voiceover.json`. Khi sửa phụ đề phải sửa cả `text` và các mục `words` tương ứng, sau đó xuất lại SRT.

Phụ đề được nhận dạng cục bộ và chỉnh chính tả/tên riêng theo bản thu. Âm thanh giữ nguyên tốc độ, giọng đọc và phần nhạc có sẵn. Nội dung theo bản thu; **bỏ qua xác minh thông tin theo yêu cầu**, không dùng nguồn tin bên ngoài. Biểu đồ chỉ minh họa diễn biến, không phải dữ liệu giá thực tế. Xem [ASSETS.md](ASSETS.md).

## Kiểm tra

`npm test` kiểm tra audio nguyên vẹn, timeline không hở, không mất/trùng từ, dịch thời gian khi đổi tốc độ, dữ liệu sai và các cụm kích hoạt đổi hình. `npm run typecheck` kiểm tra TypeScript. Kiểm tra khung hình đại diện, phụ đề tiếng Việt, vùng an toàn TikTok và frame cuối trước khi phát hành.
