# Tiền gửi: lãi suất, thanh khoản và an tâm — 1211

Dự án Remotion độc lập bằng React/TypeScript, sử dụng nguyên bản `1211.mp3`. Video **1080 × 1920, 30 fps**, nền tím nhạt, màu nhấn **#8229e3**. Thời lượng mặc định **2.892 frame / 96,4 giây**, gồm khoảng 95,386 giây audio được giải mã và 1 giây giữ hình cuối. Không ép thời lượng về 60 giây.

## Chạy dự án

Cần Node.js 22 trở lên. Trong thư mục `1211`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Trong Studio chọn composition `Story1211`. MP4 H.264/AAC nằm ở `out/1211.mp4`, phụ đề ở `out/1211.srt`, báo cáo cảnh ở `out/timing-report.json`. Lần chạy đầu Remotion có thể tải Chrome Headless Shell. Không cần khóa API hoặc dịch vụ trả phí; audio, font và minh họa được dùng cục bộ sau khi cài dependencies.

## Cấu trúc

- `src/Root.tsx`: composition, metadata và thời lượng đọc từ audio thực tế.
- `src/MainVideo.tsx`: bố cục, font tiếng Việt, Sequence, phụ đề và audio.
- `src/scenes/`: 7 cảnh riêng; mỗi cảnh dài có các pha đổi hình theo lời đọc.
- `src/components/`: thẻ so sánh, ngân hàng, két, bảo vệ tiền gửi, lịch và sơ đồ chia kỳ hạn bằng SVG.
- `src/config.ts`: toàn bộ chữ đồ họa, màu, đường dẫn, props âm thanh và các thông số tiền gửi.
- `src/finance.ts`: tính lãi đơn theo số tiền, lãi suất năm và kỳ hạn; định dạng số tiếng Việt.
- `src/data/voiceover.json`: lời dẫn, timestamp từng từ và SHA-256 bản thu.
- `src/timing.ts`: đổi timestamp thành frame, chia cảnh và nhóm phụ đề.
- `Kichban.md`: bản chép lời có thể biên tập.
- `public/audio/1211.mp3`: bản sao nguyên byte của tệp đầu vào.

## Chỉnh sửa

Sửa giao diện tại `defaultProps` trong `src/config.ts`. Phần `finance` điều khiển số tiền, lãi suất, kỳ hạn và hạn mức xuất hiện trên hình; chênh lệch tiền lãi được tính tự động. Thay các giá trị này không thay nội dung giọng đọc: cần cập nhật audio/phụ đề và những tiêu đề có con số tương ứng nếu đổi kịch bản.

`audio.playbackRate` và `timing.voiceoverStartSeconds` dịch đồng bộ cảnh/phụ đề. Khi thay MP3, phải cập nhật timestamp, thời lượng và hash trong `voiceover.json`. Khi sửa chữ phụ đề phải sửa cả `text` và các mục `words`, sau đó chạy lại `npm run captions`.

Nội dung được dựng từ audio cung cấp, bỏ qua xác minh thông tin theo yêu cầu. Không thêm nhãn nguồn lên video. Phụ đề được nhận dạng cục bộ và chỉnh chính tả; không cắt giọng đọc, thêm nhạc hoặc đổi tốc độ mặc định. Xem [ASSETS.md](ASSETS.md).

## Kiểm tra

`npm test` kiểm tra audio nguyên vẹn, timeline liền mạch, không mất/trùng từ phụ đề, dịch mốc khi đổi tốc độ, dữ liệu không hợp lệ, cụm từ kích hoạt đổi hình và phép tính lãi suất. Kiểm tra các cảnh, chữ tiếng Việt, mốc chuyển và frame cuối trước khi phát hành.
