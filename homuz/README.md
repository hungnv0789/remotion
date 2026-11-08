# Hormuz — Năng lượng và địa chính trị

Dự án Remotion TypeScript độc lập trong thư mục `homuz`, sử dụng toàn bộ bản thu **`amthanh.mp3`**, video dọc **1080 × 1920 / 30 fps**.

## Chạy dự án

Yêu cầu Node.js 22 trở lên.

```bash
cd homuz
npm ci
npm run dev
```

Chọn composition `HormuzGlobalImpact` trong Remotion Studio.

```bash
npm run typecheck
npm test
npm run still
npm run render
```

Video xuất tại `out/homuz.mp4`, ảnh thử tại `out/preview.png`. Remotion có thể tải Chrome Headless Shell ở lần render đầu; Linux cần các [thư viện hệ thống](https://www.remotion.dev/docs/miscellaneous/linux-dependencies).

## Nội dung và hình ảnh

Video làm nổi bật bốn nội dung yêu cầu qua 7 chương:

1. Giả định mở đầu và liên hệ Mỹ–Iran–Việt Nam.
2. Vai trò của Hormuz, rủi ro nguồn cung và kịch bản giá dầu.
3. Truyền dẫn tới nhiên liệu, vận tải, giá cả tại Việt Nam.
4. Nhận định về sức ép kinh tế và thời điểm của Iran.
5. Áp lực trong nước, khu vực và quan hệ đối ngoại.
6. Ba góc nhìn về lợi ích chiến lược của Mỹ trong bản thu.
7. Câu hỏi kết và CTA bình luận.

Ảnh được tìm từ Wikimedia Commons/NASA/U.S. Navy và các tác giả có giấy phép CC BY. Dùng 6 ảnh tư liệu: Hormuz, tàu sân bay, Tehran, cảng và trạm xăng ở Việt Nam. Tất cả đã lưu cục bộ; không tải ảnh từ Internet khi render. Tên nguồn, năm và giấy phép xuất hiện cạnh ảnh. Bản đồ SVG dùng dữ liệu Natural Earth public domain, đường nối chỉ minh họa quan hệ.

Xem [ASSETS.md](ASSETS.md) để tra nguồn/giấy phép đầy đủ. `CREDITS.txt` có phần ghi công có thể dùng kèm mô tả khi chia sẻ video. Ảnh có cắt khung/zoom và đặt chữ; giữ các thông tin ghi công khi thay đổi hoặc tái sử dụng.

## Đồng bộ bản thu

Giữ tốc độ audio gốc, mở hình trước 0,5 giây và giữ kết thêm 1,5 giây. Thời lượng mặc định khoảng **152,93 giây / 4.588 frame**. `calculateMetadata()` đọc độ dài thực tế để tính tổng frame.

`src/data/voiceover.json` lưu lời đã đối chiếu, timestamp nhận dạng cục bộ và SHA-256 nguồn audio. Các cảnh và phụ đề dùng chung timestamp; sửa lỗi nhận dạng chính tả/tên riêng, không thêm lời mới vào bản thu. Có thể tinh chỉnh `start`/`end` theo giây nếu muốn căn ở mức phòng thu.

Nếu đổi audio, cần cập nhật dữ liệu căn lời. Kiểm tra thời lượng chỉ phát hiện một số thay đổi; bản thu khác nhưng cùng độ dài vẫn phải căn lại. `audio.playbackRate` thay đổi đồng thời âm thanh, các mốc cảnh và phụ đề. Bản mặc định chỉ dùng giọng đọc được cung cấp, không thêm nhạc ngoài.

## Tùy chỉnh

Sửa `defaultProps` ở `src/config.ts` để đổi thương hiệu, chữ, màu sắc, ảnh, tốc độ đọc hoặc các khoảng đầu/cuối. Có thể chỉnh props trong Studio hoặc truyền JSON qua CLI `--props`.

Toàn bộ animation dùng frame (`useCurrentFrame()`, `interpolate()`, `spring()`), không dùng timer/CSS transition. Mỗi chương có các phase theo cụm lời để tránh giữ một hình suốt đoạn dài. Đồ họa bản đồ, thẻ chỉ số và sơ đồ truyền dẫn dùng SVG/CSS. Font Be Vietnam Pro đóng gói cục bộ, hỗ trợ tiếng Việt.

## Cấu trúc

- `src/Root.tsx`: đăng ký composition, đọc metadata audio.
- `src/MainVideo.tsx`: Sequence, logo, phụ đề và giọng đọc.
- `src/config.ts`: nội dung và props.
- `src/timing.ts`: timestamp → frame, marker và chia phụ đề.
- `src/scenes/`: 7 component phân cảnh.
- `src/components/`: UI, ảnh có credit, bản đồ và phụ đề.
- `src/data/`: căn lời, danh mục ảnh và hình học bản đồ.
- `public/audio/`: bản sao nguyên vẹn của giọng đọc.
- `public/images/`: ảnh tư liệu đã tải.
- `public/assets-manifest.json`: nguồn, giấy phép và SHA-256 từng ảnh.
- `tests/`: kiểm tra audio, ảnh, bản đồ, phụ đề và timeline bằng Node.js test runner qua `tsx`.

## Cách trình bày số liệu và nhận định

Bản thu là phân tích kịch bản, không có ngày xuất bản được cung cấp. Dự án giữ lời đọc, gắn nhãn giả định/nhận định trên các phần tương ứng và ghi rõ ảnh tư liệu. Ví dụ `100K → 1 lít`, `120–130 USD/thùng`, `18.000 → >30.000 đồng/lít` không được trình bày như bảng giá hiện hành hoặc dự báo đã được xác nhận. Số 20% của Hormuz có nhãn tham chiếu 2024/EIA.

Xem [SOURCES.md](SOURCES.md) để phân biệt nguồn kiểm chứng, dữ liệu có thời điểm và các nhận định chưa được xác nhận trong bản thu. Các từ “hiện tại”, “năm ngoái” trong audio không tự biến thành cập nhật tại ngày dựng video.
