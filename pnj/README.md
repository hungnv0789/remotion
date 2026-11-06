# PNJ — Đọc sau những con số

Dự án Remotion TypeScript độc lập, video TikTok **1080 × 1920 / 30 fps**, gồm 6 phân cảnh theo kịch bản PNJ. Thiết kế nền lavender sáng, màu chủ đạo **`#8229e3`**.

## Chạy dự án

Yêu cầu Node.js 22 trở lên.

```bash
cd pnj
npm ci
npm run dev
```

Chọn composition `PNJFinancialStory` trong Remotion Studio.

```bash
npm run typecheck
npm test
npm run still
npm run render
```

Video xuất tại `out/pnj.mp4`; ảnh thử tại `out/preview.png`. Lần render đầu có thể tải Chrome Headless Shell. Linux cần các thư viện theo [hướng dẫn Remotion](https://www.remotion.dev/docs/miscellaneous/linux-dependencies).

## Mã nguồn

- `src/index.ts`: đăng ký root.
- `src/Root.tsx`: khai báo composition và `calculateMetadata()`.
- `src/MainVideo.tsx`: Sequence, nền, font, phụ đề, nhạc và giọng đọc.
- `src/config.ts`: toàn bộ lời dẫn, chữ trên màn hình, màu sắc, props âm thanh và tốc độ đọc.
- `src/timing.ts`: timeline theo từng cụm lời, số tiếng đọc của các số tài chính, khoảng nghỉ và phụ đề.
- `src/components/`: UI dùng chung, SVG và captions.
- `src/scenes/`: `HookScene`, `QuestionScene`, `ProvisionScene`, `AccountingScene`, `CoreBusinessScene`, `ConclusionScene`.
- `public/audio/`: nơi thêm tài nguyên âm thanh.
- `tests/timing.test.ts`: kiểm tra bằng Node.js test runner qua `tsx`.

## Thời lượng theo lời dẫn

Không giới hạn 60 giây. Mỗi câu được chia thành segment có ID ngữ nghĩa như `revenue`, `loss`, `obligation`, `cash`, `cta`. Cảnh, phụ đề và hiệu ứng lấy thời gian từ cùng một timeline. Sửa lời hoặc `timing.syllablesPerSecond` sẽ tự cập nhật tổng frame trong Studio và khi render.

Tốc độ mặc định là **4,2 tiếng/giây**, có nhịp nghỉ theo dấu câu. Các số như `39.000`, `3.400`, `2026` có trọng số riêng theo số tiếng cần đọc. Segment `hook/loss` có `pauseAfterSeconds: 1`, giữ hình và phụ đề thêm đúng 30 frame sau cụm “lỗ hơn 6.000 tỷ đồng”.

Chữ lớn được biên tập gọn; lời dẫn và CTA đầy đủ nằm trong `defaultProps.script`. Mọi animation dùng `useCurrentFrame()`, `interpolate()` hoặc `spring()`; không dùng timer hoặc CSS transition. Các phân cảnh fade qua nền chung trong 8 frame; cảnh cuối giữ CTA và thông điệp đến hết video. Cảnh kết lần lượt trình bày checklist, hai góc nhìn đối chiếu, thông điệp và CTA.

## Tùy chỉnh và âm thanh

Chỉnh `defaultProps` trong `src/config.ts`, trong Studio hoặc truyền JSON qua `--props`. `theme.primary` là màu thương hiệu; các màu còn lại giúp chữ và thẻ có độ tương phản trên nền sáng. Font Be Vietnam Pro đóng gói cục bộ, hỗ trợ tiếng Việt. Đồ họa là SVG/CSS; không cần tải ảnh ngoài.

**Mặc định chưa có giọng đọc hoặc nhạc nền.** Không sử dụng bản thu của video tài chính cũ. Thời gian hiện là ước lượng, chưa phải timestamp nhận dạng âm thanh.

Để thêm giọng đọc, đặt 6 file trong `public/audio/` và cấu hình:

```ts
audio: {
  sceneVoiceovers: [
    'audio/01-hook.mp3',
    'audio/02-question.mp3',
    'audio/03-provision.mp3',
    'audio/04-accounting.mp3',
    'audio/05-core.mp3',
    'audio/06-conclusion.mp3',
  ],
  music: 'audio/music.mp3',
  musicVolume: 0.1,
},
```

Có thể để `music: ''` để không có nhạc. Đường dẫn tương đối tính từ `public/`; URL HTTPS cũng được hỗ trợ. Khi có đủ 6 file, `calculateMetadata()` đọc thời lượng thực tế của từng file; tổng frame và mốc cảnh tự cập nhật. Các mốc lời bên trong co giãn theo ước lượng, **chưa tự nhận dạng hoặc căn từng từ**. Bản thu Hook cần có sẵn khoảng dừng 1 giây theo kịch bản; hệ thống không tự chèn im lặng vào giữa một file audio liền mạch.

Nếu chỉ muốn nhập thời gian cảnh thủ công, dùng `timing.sceneDurationsSeconds` với đủ 6 số. Nhạc nền lặp và fade theo tổng thời lượng. Khi thay audio, kiểm tra lại đồng bộ nội cảnh và các nhịp nghỉ.

## Nội dung và nguồn

Video trình bày **kế hoạch dự kiến năm 2026**, sử dụng số làm tròn trong kịch bản; không thể hiện đây là kết quả kinh doanh năm đã chốt. Nguồn đối chiếu và cách phân biệt số liệu/nhận định được ghi trong [SOURCES.md](SOURCES.md).
