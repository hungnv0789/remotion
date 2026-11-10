# Dòng vốn, bất động sản và hạ tầng — 1011

Dự án Remotion độc lập bằng React/TypeScript, sử dụng nguyên bản `1011.mp3`. Video **1080 × 1920, 30 fps**, nền tím nhạt, màu nhấn **#8229e3**. Thời lượng mặc định **4.318 frame / 143,933 giây**, gồm khoảng 142,917 giây audio được giải mã và 1 giây giữ hình cuối. Không giới hạn ở 60 giây.

## Chạy và xuất video

Cần Node.js 22 trở lên. Từ thư mục `1011`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run captions
npm run still
npm run render
```

Trong Studio chọn composition `Story1011`. Video H.264/AAC ở `out/1011.mp4`, phụ đề ở `out/1011.srt`, báo cáo thời gian ở `out/timing-report.json`. Lần chạy đầu, Remotion có thể tải Chrome Headless Shell. Font được đóng gói cục bộ sau khi cài dependencies, không cần khóa API hoặc tài khoản dịch vụ.

## Tổ chức mã nguồn

- `src/Root.tsx`: composition và `calculateMetadata` lấy thời lượng bản thu thực tế.
- `src/MainVideo.tsx`: bố cục, font tiếng Việt, 10 Sequence, audio và phụ đề.
- `src/scenes/`: 10 cảnh riêng theo nội dung bản thu; các cảnh dài có nhiều pha đổi hình.
- `src/components/`: SVG đô thị, tiền tệ, đường sắt, cảng, sơ đồ dòng vốn và giao diện dùng chung.
- `src/config.ts`: toàn bộ chữ đồ họa, màu sắc, đường dẫn audio và props thời gian.
- `src/data/voiceover.json`: lời dẫn, timestamp từng từ và SHA-256 bản thu.
- `src/timing.ts`: tính thời lượng, chia cảnh theo khoảng giữa lời đọc, chia phụ đề theo câu và độ dài.
- `Kichban.md`: bản chép lời thuận tiện để đọc và biên tập.
- `public/audio/1011.mp3`: bản sao nguyên byte phục vụ render.

## Chỉnh sửa

Sửa giao diện và nội dung nhấn mạnh tại `defaultProps` trong `src/config.ts`. `audio.playbackRate`, `timing.voiceoverStartSeconds` và `timing.endingHoldSeconds` tự cập nhật mốc cảnh/phụ đề. Thay bản thu cần tạo lại timestamp, thời lượng và hash trong `voiceover.json`; không chỉ thay file MP3 rồi dùng timestamp cũ. Sửa lời phụ đề phải cập nhật cả `text` và các mục `words` tương ứng.

Phụ đề được nhận dạng cục bộ, chỉnh chính tả và căn theo từng từ. Giữ nguyên giọng đọc, tốc độ gốc và nhạc có sẵn. Nội dung theo bản thu, **bỏ qua xác minh thông tin theo yêu cầu**; không bổ sung nguồn tin bên ngoài. Đồ thị chỉ minh họa xu hướng, không có trục số liệu giả định. Màn hình kết sử dụng phần âm thanh sau lời đọc và giữ hình đến hết video.

## Kiểm tra

`npm test` kiểm tra bản sao audio, timeline liên tục, từ phụ đề không mất/trùng, đồng bộ khi đổi tốc độ, dữ liệu sai và các cụm từ kích hoạt đổi hình. Trước khi phát hành nên nghe duyệt bản xuất, kiểm tra chữ tiếng Việt, phụ đề, từng mốc cảnh và frame cuối.
