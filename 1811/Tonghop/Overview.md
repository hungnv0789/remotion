# Tổng hợp dự án 1811 — Hưng Yên: lộ trình đô thị và hạ tầng

## 1. Kết quả cuối cùng

Đã dựng một dự án Remotion độc lập trong thư mục `1811`, chuyển thể nội dung file `1811.mp3` hiện tại thành video TikTok về Hưng Yên. Video sử dụng âm thanh người dùng cung cấp, phụ đề tiếng Việt và motion graphics; không tạo giọng TTS mới.

| Hạng mục | Kết quả |
| --- | --- |
| Composition | `HungYenUrban1811` |
| Kích thước | 1080 × 1920, dọc 9:16 |
| Tốc độ | 30 fps |
| Số frame | 2.523 |
| Thời lượng hình | 84,1 giây |
| Định dạng | H.264, yuv420p; âm thanh AAC |
| Phong cách | Financial News / Motion Graphics, faceless |
| Màu sắc | Nền tím nhạt, điểm nhấn `#8229e3` |
| Nội dung | 8 cảnh, 28 đoạn phụ đề |
| Giọng đọc | Dùng trực tiếp `1811.mp3`, playback rate 1 |
| Nhạc bổ sung | Electronic finance, 110 BPM, tổng hợp bằng mã |

Thời lượng AAC/container khoảng 84,117 giây do phần đệm mã hóa; thời lượng hình chính xác là 84,1 giây. Video gồm 0,2 giây mở đầu, âm thanh giải mã dài 83,0795625 giây và khoảng giữ hình kết 0,8 giây, làm tròn lên frame nguyên.

## 2. Phạm vi và các quyết định đã thống nhất

- Phiên bản cuối là **Hưng Yên trong thư mục `1811`**. Trước đó có một phiên bản dùng âm thanh khác về ACB trong `1711`; video đó không phải kết quả của dự án độc lập này.
- Khi nhận thấy `1811.mp3` được cập nhật, đã nhận dạng lại toàn bộ lời dẫn và dựng lại cảnh, thay vì dùng video/phụ đề ACB cũ.
- Phần nhận dạng nghe mốc năm là **2018**; người dùng xác nhận **“Dùng 2028”**. Vì vậy, phụ đề và đồ họa dùng **2028**, còn âm thanh gốc vẫn giữ nguyên. Quyết định được ghi tại `src/data/transcription.json`, trường `editorialOverride`.
- Đô thị loại I là mục tiêu/phấn đấu; thành phố trực thuộc Trung ương là định hướng xa hơn. Không gắn hai nội dung thành cùng một cam kết hoàn thành năm 2028.
- Các chỉ tiêu 2030 được trình bày là mục tiêu, không phải kết quả đã đạt. Sơ đồ đô thị/hạ tầng không phải bản đồ quy hoạch chính thức hoặc danh mục dự án đã phê duyệt.
- Không xác minh lại thông tin thời sự theo yêu cầu. Các kiểm tra thực hiện tập trung vào lời đọc, phụ đề, hình ảnh, mã nguồn và bản xuất.

## 3. Những công việc đã thực hiện

### Chuẩn bị nội dung và căn lời

1. Đọc thông số MP3, kiểm tra hash và nhận biết file âm thanh đã đổi.
2. Dùng `faster-whisper medium` trên CPU int8 để nhận dạng tiếng Việt với timestamp từng từ. Đối chiếu đoạn mốc năm bằng các mô hình small, medium và large-v3-turbo; rà đoạn cuối bằng nhận dạng có VAD.
3. Chuẩn hóa chính tả, tên Hưng Yên và thuật ngữ: phường, đô thị loại I/II, ga đường sắt đô thị, nút giao cao tốc, cảng cạn ICD.
4. Loại bỏ câu quảng bá tự sinh ở cuối kết quả ASR sau khi rà đoạn 77–83 giây: câu đó không được đưa vào lời thoại hay phụ đề. Dữ liệu loại bỏ vẫn được lưu riêng để đối chiếu.
5. Chia nội dung thành 8 cảnh, căn 339 từ và xuất 28 cue SRT. Độ khớp chuỗi từ khi căn lời khoảng **94,69%**.
6. Ngắt phụ đề theo độ dài và khoảng nghỉ, tránh để một từ ngắn đứng riêng ở cuối đoạn; giữ dấu tiếng Việt và nhấn từ đang đọc.

### Dựng hình và chuyển động

- Viết các cảnh React/TypeScript riêng, khai báo composition đầy đủ trong `Root.tsx`.
- Dùng `Sequence`, `useCurrentFrame()`, `useVideoConfig()`, `interpolate()` và `spring()` để animation xác định theo frame.
- Tạo SVG riêng cho đường chân trời đô thị, checklist, lịch 2028, đơn vị hành chính, mạng lưới nhiều cực tăng trưởng, các chỉ tiêu 2030, ga đô thị, nút giao cao tốc và cảng cạn.
- Dùng zoom, flash, blur và nhịp chuyển động khoảng 3 giây; các điểm đổi nội dung chính bám cụm lời dẫn.
- Dùng Be Vietnam Pro với bộ ký tự tiếng Việt; bố trí tiêu đề, hình, số liệu, phụ đề và footer trong khung dọc.
- Render các frame đại diện, cảnh giáp ranh, contact sheet và frame cuối để kiểm tra trực quan.

### Âm thanh và hậu kỳ

- Giữ nguyên từng byte của file MP3 nguồn trong `public/audio/1811/1811.mp3`; không thay tốc độ hay tạo lại giọng.
- Tạo nhạc nền và whoosh từ oscillator bằng Python/NumPy, không dùng sample/bản ghi bên thứ ba cho phần bổ sung.
- Phối lời ở gain `0.82`, nhạc `0.030072`; khi có phụ đề, nhạc nhân thêm hệ số duck `0.65`. Có fade đầu/cuối.
- Render MP4, trích MP3 bản phối, kiểm tra định dạng, đồng bộ âm thanh, mức nhạc và clipping trên file xuất thực tế.

## 4. Timeline 8 cảnh

Frame kết thúc trong bảng là mốc loại trừ: cảnh sau bắt đầu ngay tại mốc đó.

| Cảnh | Khoảng frame | Khoảng giây | Nội dung chính |
| --- | --- | --- | --- |
| `hook` | 0–255 | 0–8,50 | Hưng Yên đặt mục tiêu mới; đô thị loại I, định hướng xa hơn |
| `preparation` | 255–589 | 8,50–19,63 | Chuẩn bị hành chính, phường và quy hoạch |
| `goal` | 589–771 | 19,63–25,70 | Mốc 2028 và tiêu chí đô thị loại I |
| `administration` | 771–1132 | 25,70–37,73 | Sắp xếp cấp xã, hồ sơ phường, đề án thành phố |
| `network` | 1132–1537 | 37,73–51,23 | Đa cực, đa trung tâm và kết nối liên vùng |
| `targets` | 1537–1796 | 51,23–59,87 | Mục tiêu 2030: đô thị hóa ≥55%, một nửa số phường |
| `infrastructure` | 1796–2046 | 59,87–68,20 | Ít nhất hai công trình đầu mối giao thông |
| `closing` | 2046–2523 | 68,20–84,10 | Nâng cấp diện mạo đô thị, điều kiện hoàn thành lộ trình |

Nguồn dữ liệu: [timing-report-1811.json](../out/timing-report-1811.json).

## 5. Cấu trúc mã nguồn

| Vị trí | Vai trò |
| --- | --- |
| `src/index.ts`, `src/Root.tsx` | Đăng ký composition và metadata |
| `src/MainVideo.tsx` | Điều phối cảnh, caption, font và audio |
| `src/config.ts` | Copy hiển thị, màu sắc, đường dẫn, timing và mốc đổi hình |
| `src/timing.ts` | Quy đổi timestamp thành frame, chia cue phụ đề |
| `src/scenes/` | 8 component phân cảnh |
| `src/components/UrbanGraphics.tsx` | SVG đô thị và hạ tầng |
| `src/data/script.json` | Lời dẫn đã chuẩn hóa và dùng mốc 2028 |
| `src/data/transcription.json` | ASR, đoạn bị loại và quyết định năm đã duyệt |
| `src/data/voiceover.json` | Timestamp từng từ phục vụ render |
| `public/audio/1811/` | Audio, nhạc, hiệu ứng, manifest và cấu hình phối |
| `tests/timeline.test.ts` | 9 kiểm tra về nguồn, timeline, phụ đề và nội dung đã duyệt |
| `scripts/` | Pipeline gốc của dự án |
| `Tonghop/scripts/` | Bản script bàn giao đã chỉnh đường dẫn, công cụ tổng hợp và launcher nền |

Phiên bản đã sử dụng: Node.js 22.23.4; React 19.2.0; Remotion/CLI/Bundler/Renderer/Media Utils cùng phiên bản 4.0.541; TypeScript 5.9.3; Be Vietnam Pro 5.2.8. Python ASR dùng NumPy, faster-whisper 1.2.1 và PyAV 16.0.1; công cụ contact sheet cần Pillow.

## 6. Kết quả kiểm tra

- `npm ci` thành công cho dự án độc lập; TypeScript không có lỗi.
- **9/9 bài kiểm tra đạt**: hash MP3, tốc độ phát, phủ hết timeline, timestamp hợp lệ, phụ đề đủ từ/không chồng lấn, mốc đổi cảnh, dữ liệu audio thay đổi, tài nguyên, phối nhạc, mốc 2028 và loại câu quảng bá thừa.
- MP4 xác nhận H.264, 1080 × 1920, 30 fps, **2.523 frame**.
- Nhạc thấp hơn lời khoảng **21,25–25,26 dB** tại sáu đoạn đo. Đây là mức đo trên MP4, khác với giá trị mục tiêu của bộ cân nhạc.
- Tương quan lời đọc với nguồn khoảng **0,9963–0,9985** ở các đoạn kiểm tra.
- Đỉnh tín hiệu đo được `0.46936`; số mẫu chạm giới hạn số: **0**.
- Đã kiểm tra trực quan các frame đại diện và frame cuối; kiểm tra ZIP không hỏng và nội dung trùng file dự án.

Bằng chứng: [audio-verification-1811.json](../out/audio-verification-1811.json), [contact-sheet.jpg](../out/contact-sheet.jpg), [final-frame.png](../out/final-frame.png), [production-manifest.json](../public/audio/1811/production-manifest.json).

SHA-256 MP3 nguồn:

```text
264ad0c40ecfddbce0b2c35cea83ca1bc9b2109be0b1a27681669c42c3797dcb
```

## 7. File bàn giao

- [Video MP4](../out/1811.mp4)
- [Phụ đề SRT](../out/1811.srt)
- [MP3 bản phối](../out/1811-mix.mp3)
- [Mã nguồn độc lập dạng ZIP](../out/1811-source.zip)
- [Kịch bản](../Kichban.md), [lời dẫn](../voiceover.txt), [hướng dẫn dự án](../README.md)
- [Nguồn tài nguyên](../ASSETS.md), [ghi chú nhạc](../MUSIC_NOTES.md), [credits](../CREDITS.txt)

Gói nguồn được cập nhật để kèm thư mục `Tonghop`; không đóng gói video, node_modules, log hoặc trọng số mô hình ASR.

## 8. Script Python trong Tonghop/scripts

Các bản Python từ pipeline gốc đã được sao chép và sửa `ROOT` để chạy đúng từ `Tonghop/scripts`, không phụ thuộc thư mục làm việc hiện tại.

| Script | Mục đích |
| --- | --- |
| [transcribe.py](scripts/transcribe.py) | Nhận dạng file nguồn và ghi timestamp; cần rà lại kết quả trước bước chuẩn bị |
| [alignment_utils.py](scripts/alignment_utils.py) | Chuẩn hóa và căn từ theo timestamp nhận dạng |
| [prepare-audio.py](scripts/prepare-audio.py) | Kiểm tra hash, sao chép MP3, căn lời, tạo nhạc và whoosh |
| [sound_design.py](scripts/sound_design.py) | Bộ tổng hợp nhạc, dùng như module |
| [calibrate-mix.py](scripts/calibrate-mix.py) | Cân nhạc theo RMS phần có lời |
| [verify-media.py](scripts/verify-media.py) | Đo lại audio/video trên MP4, xuất MP3 bản phối |
| [package-source.py](scripts/package-source.py) | Tạo manifest và đóng gói source ZIP |
| [review_audio.py](scripts/review_audio.py) | Trích một đoạn âm thanh tạm và rà bằng ASR, không sửa nguồn/caption |
| [create_contact_sheet.py](scripts/create_contact_sheet.py) | Ghép các frame preview có sẵn thành contact sheet |
| [audit_artifacts.py](scripts/audit_artifacts.py) | Kiểm tra chỉ đọc: hash, mốc 2028, video, SRT, báo cáo QA và ZIP |

Ví dụ chạy trực tiếp từ thư mục `1811`:

```bash
python3 Tonghop/scripts/review_audio.py --start 19 --duration 8 --model medium
python3 Tonghop/scripts/review_audio.py --start 77 --duration 6.2 --model small --vad
python3 Tonghop/scripts/create_contact_sheet.py
python3 Tonghop/scripts/package-source.py
python3 Tonghop/scripts/audit_artifacts.py
```

Để tái tạo các lượt rà mốc năm đã dùng trong phiên làm việc, có thể truyền `--model /tmp/remotion-whisper-small`, `/tmp/remotion-whisper-medium` hoặc `/tmp/remotion-whisper-turbo` nếu cache còn tồn tại. Các đường dẫn `/tmp` là môi trường tạm của phiên làm việc, không phải tài nguyên bắt buộc kèm dự án. Nếu chạy lại nhận dạng, cần giữ quyết định mốc 2028 và rà phần cuối trước khi căn lại lời.

## 9. Lệnh chạy background trong Tonghop/scripts/*.sh

- [env.sh](scripts/env.sh): xác định thư mục dự án, chọn Node.js ≥22 và Python; hỗ trợ biến môi trường.
- [background.sh](scripts/background.sh): chạy job qua `nohup` và `setsid` khi có, chờ xác nhận khởi động ngắn rồi trả PID và đường dẫn log.
- [worker.sh](scripts/worker.sh): thực thi các lệnh theo job, ghi mã thoát khi kết thúc.

Đây là các lệnh đóng gói lại để tái sử dụng. Trong quá trình dựng ban đầu, các lệnh nặng đã được chạy dưới phiên tiến trình nền của công cụ shell và được theo dõi đến khi hoàn tất; không phải một dịch vụ chạy lịch thường trực.

```bash
cd /home/hungnv/codex/remotion/1811

# Chỉ kiểm tra tính toàn vẹn của các file hiện có, không render lại.
bash Tonghop/scripts/background.sh audit

# Kiểm tra TypeScript và 9 test.
bash Tonghop/scripts/background.sh checks

# Xuất preview và ghép contact sheet.
bash Tonghop/scripts/background.sh previews

# Render MP4 và kiểm tra audio/video sau khi render xong.
bash Tonghop/scripts/background.sh render

# Các tác vụ riêng khác, chọn từng job khi cần.
bash Tonghop/scripts/background.sh verify
bash Tonghop/scripts/background.sh package
bash Tonghop/scripts/background.sh review-year
bash Tonghop/scripts/background.sh review-tail
```

Launcher in chính xác đường dẫn `.log`, `.pid` và `.exit` trong `out/tonghop/`; file `.started` xác nhận worker đã khởi động. Dùng `tail -f <duong-dan-log>` để theo dõi. File `.exit` chứa `0` nghĩa là thành công; khác `0` là lỗi. Chưa có `.exit` chỉ có nghĩa là chưa ghi nhận hoàn tất, không tự khẳng định tiến trình còn chạy. Các lệnh trên là ví dụ riêng; chạy lần lượt những job cùng ghi tài nguyên để tránh xung đột.

Chỉ khi thay âm thanh hoặc nội dung:

```bash
bash Tonghop/scripts/background.sh transcribe
# Chờ hoàn tất, rà transcription.json và cập nhật script.json/đồ họa.
bash Tonghop/scripts/background.sh prepare
# Chờ chuẩn bị xong rồi mới chạy previews/render.
```

Có thể chọn môi trường khác:

```bash
NODE_BIN_DIR=/duong/dan/node22/bin \
PYTHON_BIN=/duong/dan/venv/bin/python3 \
TRANSCRIBE_MODEL=/duong/dan/whisper-medium \
bash Tonghop/scripts/background.sh render
```

Launcher ưu tiên môi trường được truyền vào; nếu không có Node phù hợp hoặc Python chỉ định, nó có thể dùng bản đang có tại `/tmp/remotion-node/node-v22.23.4-linux-x64/bin` và `/tmp/remotion-asr/bin/python3`. Đặt thêm `REMOTION_BROWSER_EXECUTABLE`, `FFMPEG_BINARY`, `FFPROBE_BINARY` khi cần đổi trình duyệt/binary. Cần `npm ci` trước lần chạy đầu; môi trường Python phải có các thư viện tương ứng với job. Render lại từ tài nguyên hiện có không cần chạy ASR.

## 10. Xác nhận phần tổng hợp

Đã kiểm tra cú pháp toàn bộ Python, kiểm tra `bash -n` cho các shell script, kiểm tra trang trợ giúp và thử launcher nền với job `audit` chỉ đọc. Không tạo lại video hay thay đổi MP3 trong bước tổng hợp. Source ZIP đã được cập nhật để chứa tài liệu và các script này.
