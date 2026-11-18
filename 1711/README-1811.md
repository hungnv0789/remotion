# 1811 · Nhà đầu tư Mỹ thoái toàn bộ cổ phiếu ACB

Video mới được thêm vào dự án `1711` theo thư mục yêu cầu. Composition `ACBInvestorExit1811` dùng trực tiếp `1811.mp3`. Composition SCB `SCBZeroRate1711`, nguồn âm thanh và các đầu ra cũ được giữ lại.

## Chạy và render

Node.js ≥ 22:

```bash
cd 1711
npm ci
npm run dev
npm run typecheck
npm test
npm run previews:1811
npm run render:1811
```

Video: `out/1811.mp4`, H.264/yuv420p, 1080 × 1920, 30 fps. Phụ đề: `out/1811.srt`. Báo cáo thời lượng/cảnh: `out/timing-report-1811.json`. `npm run render` và `npm run captions` tiếp tục phục vụ video SCB; các lệnh có hậu tố `:1811` dành cho video mới. Có thể đặt `REMOTION_BROWSER_EXECUTABLE` nếu muốn chọn Chrome.

## Tổ chức nội dung

- `src/Root.tsx` đăng ký cả hai composition; `src/SCBComposition.tsx` giữ cấu hình composition SCB.
- `src/video1811/Composition.tsx` khai báo composition mới và đọc thời lượng audio thực tế.
- `src/video1811/MainVideo.tsx` phối hợp cảnh, phụ đề, font và âm thanh.
- `src/video1811/config.ts` chứa copy, màu sắc, đường dẫn và mốc chuyển hình theo lời dẫn.
- `src/video1811/scenes/` gồm 6 cảnh: hook, thoái vốn, nhà đầu tư, quy mô sở hữu, định giá và kết.
- `src/video1811/data/` lưu lời thoại chuẩn hóa và timestamp; `EquityGraphics.tsx` vẽ cổ phiếu, thông tin tổ chức, lịch công bố và phép tính định giá.
- `public/audio/1811/` chứa bản MP3 giữ nguyên byte, nhạc gốc và manifest. Playback rate luôn bằng 1.

Số 0 cổ phiếu chỉ thể hiện phần sở hữu của tổ chức, không phải giá cổ phiếu hay tài sản của ngân hàng. Các mức 51 triệu, 51,47 triệu, hơn 1%, 20.450 đồng và khoảng 1.053 tỷ được đặt đúng ngữ cảnh lời đọc. Không thêm biểu đồ giá hoặc suy diễn nguyên nhân thoái vốn. Sơ đồ chỉ minh họa; tên doanh nghiệp dùng chữ thông thường, không giả văn bản công bố chính thức.

## Tái tạo và kiểm tra

Các file audio và transcript đã kèm, nên render lại không cần ASR hoặc TTS. Đổi nguồn cần cập nhật nhận dạng tiếng nói, rà chính tả/tên riêng và căn lại lời; `prepare-audio.py` từ chối transcript có hash khác nguồn.

```bash
pip install -r scripts/requirements-align.txt
python scripts/1811/transcribe.py --model medium
# Rà nhận dạng và cập nhật src/video1811/data/script.json khi đổi nguồn.
python scripts/1811/prepare-audio.py
python scripts/1811/calibrate-mix.py --target-db -24 --headroom-db 6
npm run captions:1811
python scripts/1811/verify-media.py
python scripts/1811/package-source.py
```

Script kiểm tra đo đồng bộ lời đọc, đỉnh âm và mức nhạc trên MP4 thực tế, xuất thêm `out/1811-mix.mp3`. Source ZIP `out/1811-source.zip` chứa toàn bộ dự án chạy được với cả hai composition và tài nguyên, bỏ qua video, cache và node_modules.

Nhạc bổ sung 110 BPM và whoosh được tổng hợp riêng bằng mã, không dùng sample/bản ghi bên thứ ba; phối nhỏ hơn âm thanh chính, có duck và fade. Quyền đối với file MP3 nguồn thuộc nguồn người dùng cung cấp. Font Be Vietnam Pro qua Fontsource, SIL OFL. Không dùng ảnh/video stock.
