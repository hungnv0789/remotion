# Cổ phiếu: lợi nhuận đến từ đâu? — 1211-1

Dự án Remotion độc lập bằng React/TypeScript, sử dụng nguyên bản `1211-1.mp3`. Video **1080 × 1920, 30 fps**, nền tím nhạt và màu nhấn **#8229e3**. Thời lượng mặc định **2.338 frame / 77,933 giây**, gồm khoảng 76,926 giây audio giải mã và 1 giây giữ hình cuối. Không ép thời lượng 60 giây.

## Chạy và xuất video

Cần Node.js 22 trở lên. Trong thư mục `1211-1`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Trong Studio chọn composition `StockReturns1211`. MP4 H.264/AAC nằm ở `out/1211-1.mp4`, phụ đề ở `out/1211-1.srt`, báo cáo mốc cảnh ở `out/timing-report.json`. Remotion có thể tải Chrome Headless Shell khi chạy lần đầu. Không cần khóa API hoặc dịch vụ trả phí. Font, audio và SVG được dùng cục bộ sau khi cài dependencies.

## Cấu trúc

- `src/Root.tsx`: composition và `calculateMetadata` đọc thời lượng audio thực tế.
- `src/MainVideo.tsx`: bố cục, font tiếng Việt, Sequence, audio và phụ đề.
- `src/scenes/`: 6 cảnh: mở đầu, chênh lệch giá, cổ tức, hai nguồn lợi nhuận, rủi ro, kết luận. Cảnh dài đổi hình theo từng ý.
- `src/components/`: biểu đồ, doanh nghiệp, tiền mặt, cổ phiếu và cảnh báo rủi ro bằng React/SVG.
- `src/config.ts`: toàn bộ chữ đồ họa, màu sắc, đường dẫn, thông số audio và ví dụ giao dịch.
- `src/finance.ts`: tính vốn, tiền thu về và lãi/lỗ trước thuế, phí.
- `src/data/voiceover.json`: lời dẫn, timestamp từng từ và hash bản thu.
- `src/timing.ts`: tính thời lượng, mốc cảnh và nhóm phụ đề.
- `Kichban.md`: bản chép lời để biên tập.
- `public/audio/1211-1.mp3`: bản sao nguyên byte của âm thanh đầu vào.

## Tùy chỉnh

Sửa đồ họa tại `defaultProps` trong `src/config.ts`. `example.shares`, `buyPrice` và `sellPrice` điều khiển số cổ phiếu, giá mua, giá bán; các phép tính trên hình cập nhật tự động. Đổi các giá trị này không thay nội dung giọng đọc: cần chỉnh cả audio, phụ đề và chữ tương ứng nếu thay kịch bản.

`audio.playbackRate` và `timing.voiceoverStartSeconds` dịch đồng bộ cả cảnh lẫn phụ đề. Khi thay MP3 cần tạo lại timestamp, thời lượng và SHA-256. Khi sửa lời phụ đề phải sửa cả `text` và các mục `words`, rồi xuất lại SRT.

Âm thanh được giữ nguyên tốc độ, giọng đọc và phần nhạc có sẵn. Phụ đề nhận dạng cục bộ, chỉnh chính tả/tên gọi và căn theo từng từ. Nội dung từ audio cung cấp, bỏ qua xác minh thông tin theo yêu cầu. Không thêm nhãn nguồn lên video; vẫn giữ phần rủi ro và lưu ý thuế/phí đã có trong lời đọc.

## Kiểm tra

`npm test` kiểm tra audio nguyên vẹn, timeline liên tục, không mất/trùng từ, đồng bộ khi đổi tốc độ, dữ liệu không hợp lệ, mốc đổi hình và phép tính cả lãi/lỗ. `npm run typecheck` kiểm tra TypeScript. Kiểm tra chữ tiếng Việt, vùng an toàn TikTok, từng cảnh và frame cuối. Xem [ASSETS.md](ASSETS.md).
