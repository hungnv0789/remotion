# Video tài chính với Remotion

Video dọc **1080 × 1920**, **30 fps**, **1.800 frame / 60 giây**, dựa trên nguyên bản [remotion.md](remotion.md).

## Cài đặt và chạy

Yêu cầu Node.js 22 trở lên và npm.

```bash
npm install
npm run dev
```

Mở địa chỉ Remotion Studio được in trong terminal, chọn composition `FinancialLiquidity`.

```bash
npm run typecheck  # Kiểm tra TypeScript
npm run still      # Xuất out/preview.png tại giây thứ 7
npm run render     # Xuất out/financial-liquidity.mp4, H.264
```

Lần render đầu tiên Remotion có thể tải Chrome Headless Shell. Linux cần các thư viện hệ thống theo https://www.remotion.dev/docs/miscellaneous/linux-dependencies.

## Cấu trúc

- `src/Root.tsx`: đăng ký composition.
- `src/MainVideo.tsx`: timeline, nền, âm thanh và phụ đề.
- `src/config.ts`: kích thước, FPS, timeline, types và `defaultProps`.
- `src/scenes/`: Hook (0–5s), Situation (5–20s), Analysis (20–40s), Solution (40–55s), CTA (55–60s).
- `src/components/`: animation dùng chung, SVG và phụ đề.
- `public/audio/`: vị trí đặt nhạc và giọng đọc của bạn.

## Tùy chỉnh

Chỉnh nội dung, màu sắc, thương hiệu, phụ đề và đường dẫn âm thanh trong `defaultProps` ở `src/config.ts`. Có thể truyền props JSON qua CLI hoặc chỉnh props trong Studio. Đường dẫn âm thanh tương đối được tính từ `public/`; URL HTTPS cũng được hỗ trợ.

Ví dụ sau khi thêm hai tệp âm thanh:

```ts
audio: {
  voiceover: 'audio/voiceover.mp3',
  music: 'audio/music.mp3',
  musicVolume: 0.1,
},
```

Mặc định video không có âm thanh, không cần ảnh ngoài. Font Be Vietnam Pro được đóng gói từ dependency `@fontsource/be-vietnam-pro`, hỗ trợ đầy đủ tiếng Việt; không tải font từ Google khi render.

Lời dẫn nguyên văn được giữ trong `copy.narration`, còn chữ lớn trên màn hình được biên tập ngắn để dễ đọc. Phụ đề chia tự động theo số từ trong từng phân cảnh; chưa căn theo bản thu. Hook và CTA chứa nhiều lời cho 5 giây, nên khi thu âm cần biên tập lời hoặc thay timeline/thời lượng nếu muốn nhịp đọc chậm hơn. Không có TTS hay bản thu được tạo sẵn.

Animation hoàn toàn dựa trên frame, không dùng timer hoặc CSS transition. Các cảnh fade qua nền chung trong 8 frame và giữ nguyên mốc kịch bản. Layout thiết kế trên canvas 1080 × 1920, tự scale theo composition, chừa khoảng trống bên phải và phía dưới cho giao diện TikTok.
