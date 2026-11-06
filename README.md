# Video tài chính với Remotion

Video dọc **1080 × 1920**, **30 fps**, tông tím chủ đạo **`#8229e3`**, dựa trên [remotion.md](remotion.md).

## Cài đặt và chạy

Yêu cầu Node.js 22 trở lên và npm.

```bash
npm ci
npm run dev
```

Mở địa chỉ Remotion Studio được in trong terminal và chọn `FinancialLiquidity`.

```bash
npm run typecheck # Kiểm tra TypeScript
npm test          # Kiểm tra timestamp, phụ đề, marker và tính toàn vẹn bản thu
npm run still     # Xuất out/preview.png tại giây thứ 7
npm run render    # Xuất out/financial-liquidity.mp4, H.264 có giọng đọc
```

Lần render đầu tiên Remotion có thể tải Chrome Headless Shell. Linux cần [các thư viện hệ thống](https://www.remotion.dev/docs/miscellaneous/linux-dependencies).

## Cấu trúc

- `src/Root.tsx`: composition; `calculateMetadata()` đọc độ dài audio thực tế để tính tổng frame.
- `src/MainVideo.tsx`: timeline, nền, âm thanh và phụ đề.
- `src/config.ts`: props chỉnh thương hiệu, màu sắc, lời dẫn, âm thanh và marker animation.
- `src/timing.ts`: chuyển timestamp lời đọc thành frame cho các cảnh và hiệu ứng.
- `src/data/1106-alignment.json`: lời dẫn đã đối chiếu kịch bản, timestamp từ bản thu và SHA-256 của nguồn âm thanh.
- `src/scenes/`: Hook, Situation, Analysis, Solution và CTA.
- `src/components/`: animation dùng chung, SVG và phụ đề.
- `tests/`: kiểm tra bằng Node.js test runner, thực thi TypeScript qua `tsx`.
- `public/audio/1106.MP3`: bản sao nguyên vẹn của `src/1106.MP3`, phục vụ qua `staticFile()`.
- `out/`: video và ảnh kiểm tra được tạo ra; không đưa vào Git.

## Bản thu và đồng bộ

Bản thu `src/1106.MP3` dài khoảng **87,09 giây**. Video làm tròn lên frame gần nhất để không cắt mất phần cuối audio; khoảng **87,1 giây / 2.613 frame**, tùy metadata của trình giải mã. Giữ tốc độ bản thu gốc; không kéo giãn hoặc cắt xuống 60 giây.

Mốc từng tiếng được nhận dạng cục bộ bằng Faster Whisper, sau đó đối chiếu lại chữ với kịch bản để sửa lỗi nhận dạng. Chuyển cảnh nằm trong khoảng nghỉ giữa các phần. Phụ đề và hiệu ứng lấy cùng timestamp, ví dụ nhấn ba giải pháp khi đọc “Một”, “Hai”, “Ba”. Timestamp nhận dạng có thể cần tinh chỉnh nhỏ nếu muốn căn lời ở mức phòng thu; chỉnh `start`/`end` trong dữ liệu alignment, đơn vị giây tính từ đầu bản thu.

Màu nền và panel dùng tím đậm. `theme.accent` là `#8229e3`, `theme.highlight` là lavender sáng cho chữ, `theme.onAccent` là màu chữ trên nút tím. Font Be Vietnam Pro đóng gói cục bộ, hỗ trợ tiếng Việt.

## Tùy chỉnh âm thanh và lời dẫn

Âm thanh mặc định được cấu hình trong `src/config.ts`:

```ts
audio: {
  voiceover: 'audio/1106.MP3',
  music: '',
  musicVolume: 0.1,
},
```

Đường dẫn tương đối tính từ `public/`; URL HTTPS cũng được hỗ trợ. Có thể thêm nhạc nền vào `public/audio/` và đặt `audio.music`; nhạc sẽ lặp và fade đầu/cuối theo thời lượng video.

Khi thay bản thu, sao chép file mới vào `public/audio/` và cập nhật dữ liệu alignment. Dữ liệu hiện tại chỉ dành cho `1106.MP3`; kiểm tra sẽ báo lỗi nếu thời lượng hoặc lời dẫn không còn khớp, tránh dùng nhầm timestamp.

Nếu chưa có alignment cho bản thu mới, đặt `timing.recording = null`: tổng thời lượng vẫn theo audio, nhưng vị trí lời bên trong chỉ ước lượng. Khi không có audio, timeline tự tính theo `syllablesPerSecond` và khoảng nghỉ theo dấu câu. Thay nội dung trong `copy.narration` cần căn lại bản thu hoặc chuyển sang chế độ ước lượng này.

Toàn bộ animation dựa trên frame; không dùng timer hay CSS transition. Layout chừa khoảng trống cho giao diện TikTok và tự scale theo kích thước composition.
