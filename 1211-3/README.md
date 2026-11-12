# Vinpearl và Vincom Retail: du lịch, bán lẻ và dòng khách — 1211-3

Dự án Remotion độc lập bằng React/TypeScript, sử dụng nguyên bản `1211-3.mp3`. Video **1080 × 1920, 30 fps**, nền tím nhạt, màu nhấn **#8229e3**. Thời lượng mặc định **2,607 frame / 86.900 giây**, gồm khoảng 85.878 giây audio và 1 giây giữ hình cuối. Không ép thời lượng 60 giây.

## Chạy và xuất video

Cần Node.js 22 trở lên. Trong thư mục `1211-3`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Chọn composition `Story1211Three` trong Studio. Video H.264/AAC ở `out/1211-3.mp4`, phụ đề ở `out/1211-3.srt`, mốc cảnh ở `out/timing-report.json`. Lần đầu Remotion có thể tải Chrome Headless Shell. Không cần dịch vụ trả phí hoặc khóa API. Audio, font và đồ họa được dùng cục bộ sau khi cài dependencies.

## Cấu trúc mã nguồn

- `src/Root.tsx`: composition và metadata lấy thời lượng thực tế từ audio.
- `src/MainVideo.tsx`: bố cục TikTok, font tiếng Việt, các Sequence, phụ đề và audio.
- `src/scenes/`: 6 cảnh riêng: mở đầu, Vinpearl, Vincom Retail, dòng khách, hai lĩnh vực kinh doanh và câu hỏi kết. Cảnh dài đổi hình theo từng ý trong lời đọc.
- `src/components/BusinessIllustrations.tsx`: minh họa React/SVG, không phụ thuộc ảnh bên ngoài.
- `src/config.ts`: toàn bộ chữ đồ họa, màu sắc, đường dẫn và props âm thanh/thời gian.
- `src/data/voiceover.json`: lời dẫn, timestamp từng từ và SHA-256 tệp đầu vào.
- `src/timing.ts`: tính frame, chia cảnh theo khoảng giữa lời đọc và nhóm phụ đề.
- `Kichban.md`: bản chép lời để biên tập.
- `public/audio/1211-3.mp3`: bản sao nguyên byte của tệp đầu vào.

## Chỉnh sửa

Sửa chữ và màu tại `defaultProps` trong `src/config.ts`. Chữ đồ họa không làm thay đổi lời đọc. `audio.playbackRate` và `timing.voiceoverStartSeconds` dịch đồng bộ cả cảnh lẫn phụ đề; `endingHoldSeconds` điều chỉnh thời gian giữ hình cuối.

Khi thay MP3 cần tạo lại timestamp, cập nhật thời lượng và hash. Khi sửa phụ đề phải sửa cả `text` và các mục `words` tương ứng rồi chạy lại `npm run captions`. Phụ đề được nhận dạng cục bộ và chỉnh chính tả, tên riêng. Giá trị thời lượng mặc định được đo lại bằng cùng bộ giải mã trình duyệt dùng khi render để khớp metadata.

Giữ nguyên tốc độ, giọng đọc và phần nhạc có sẵn. Nội dung dựng từ audio cung cấp; bỏ qua xác minh thông tin theo yêu cầu và không thêm nhãn nguồn lên video. Xem [ASSETS.md](ASSETS.md).

## Kiểm tra

`npm test` kiểm tra audio nguyên vẹn, timeline liền mạch, từ phụ đề không mất/trùng, đồng bộ khi đổi tốc độ, dữ liệu không hợp lệ và các cụm kích hoạt đổi hình. Kiểm tra từng cảnh, dấu tiếng Việt, vùng an toàn TikTok và frame cuối trước khi phát hành.
