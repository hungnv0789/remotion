# Metro Hà Nội — Vingroup × Alstom

Dự án Remotion độc lập, TypeScript/React, video dọc **1080 × 1920, 30 fps**. Dựng theo nguyên bản `0911.mp3`; không ép thời lượng 60 giây. Bản thu được giải mã dài khoảng 58,234 giây; thêm 0,5 giây giữ hình cuối, tổng mặc định **1.763 frame / 58,767 giây**.

## Chạy dự án

Cần Node.js 22 trở lên. Từ thư mục `0911`:

```bash
npm ci
npm run dev
npm run typecheck
npm test
npm run still
npm run render
```

Studio: chọn composition `HanoiMetro`. Kết quả render ở `out/0911.mp4`. Lần chạy đầu Remotion có thể tải Chrome Headless Shell. Không cần dịch vụ trả phí hoặc khóa API. Ảnh, font và âm thanh đều được đóng gói cục bộ.

## Cấu trúc

- `src/Root.tsx`: khai báo composition, lấy thời lượng audio thực tế qua `calculateMetadata`.
- `src/MainVideo.tsx`: bố cục, font tiếng Việt, các Sequence, phụ đề và audio.
- `src/scenes/`: sáu cảnh riêng: mở đầu, hợp đồng, chuyển giao, công nghệ, quy hoạch, tự chủ và màn hình kết.
- `src/components/`: đồ họa tàu 5 toa, thẻ số liệu, ảnh và phụ đề.
- `src/config.ts`: màu tím `#8229E3`, nền sáng, nội dung, đường dẫn và props thời gian.
- `src/data/voiceover.json`: lời dẫn và timestamp từng từ theo bản thu, kèm SHA-256.
- `src/timing.ts`: quy đổi timestamp sang frame, chia cảnh theo khoảng giữa hai lời dẫn, nhóm phụ đề.
- `public/audio/`, `public/images/`: tài nguyên dùng khi render.

## Sửa nội dung và đồng bộ

Sửa chữ đồ họa tại `defaultProps` trong `src/config.ts`; sửa lời phụ đề cùng timestamp tại `src/data/voiceover.json`. `audio.playbackRate` và `timing.voiceoverStartSeconds` tự dịch cả cảnh lẫn phụ đề. Khi thay bản thu, phải tạo lại timestamp và `sourceSha256`; chương trình từ chối audio khác đường dẫn hoặc thời lượng để tránh dùng nhầm dữ liệu cũ. Timestamp nhận dạng tự động đã được chỉnh chính tả/tên riêng; nên nghe duyệt bản xuất trước khi phát hành.

Giữ nguyên tốc độ và nội dung audio. Lời đọc hết khoảng giây 51,4, sau đó dùng phần nhạc còn lại cho hình kết. Phụ đề phản ánh lời đọc; đồ họa phân biệt rõ quy hoạch 18 tuyến/979 km với hiện trạng và phạm vi đơn hàng. Các nhận định trong lời đọc như “phủ kín” hay “lần đầu tiên” không được bổ sung thành khẳng định độc lập trên đồ họa. Xem [SOURCES.md](SOURCES.md).

## Kiểm tra

`npm test` kiểm tra bảo toàn MP3, khung hình liên tục, không mất/trùng từ phụ đề, đồng bộ khi đổi tốc độ, dữ liệu không hợp lệ và tài nguyên cục bộ. Kiểm tra hình từng cảnh, dấu tiếng Việt, an toàn mép TikTok và cuối video. Quyền hình ảnh và nguồn được ghi trong [ASSETS.md](ASSETS.md).
