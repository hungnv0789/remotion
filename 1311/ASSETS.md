# Tài nguyên và ghi nguồn

## Ảnh

1. `public/images/jensen-huang.jpg`: **Jensen Huang 20231109 (cropped2)**, tác giả **總統府 / Office of the President, Taiwan**, chụp **09/11/2023**, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). [Trang gốc](https://commons.wikimedia.org/wiki/File:Jensen_Huang_20231109_(cropped2).jpg).
2. `public/images/nyse.jpg`: **New York Stock Exchange Facade 2015**, tác giả **Jeffrey Zeldman**, chụp **15/11/2015**, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). [Trang gốc](https://commons.wikimedia.org/wiki/File:New_York_Stock_Exchange_Facade_2015.jpg).

Ảnh được crop theo khung, có tên tác giả, giấy phép và năm ngay dưới ảnh. Đây là ảnh tư liệu/chân dung; không phải ảnh ghi lại sự kiện từ chức hoặc phiên giao dịch trong câu chuyện. Không tạo ảnh giả về bê bối, điều tra hay phát biểu. Dữ liệu nguồn đầy đủ tại `src/data/assets.json`.

## VieNeu-TTS

- SDK: [pnnbao97/VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS), phiên bản **3.8.4**, commit `22dd2ef2a89bba24a77da6dbc84c75f7f4fda05b`.
- Model: [pnnbao-ump/VieNeu-TTS-v3-Turbo](https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo), metadata giấy phép **Apache-2.0** tại thời điểm tạo.
- Voice: preset **Ngọc Huyền — Nữ · Bắc · Giọng đọc tự nhiên**, gender `female`, dùng trực tiếp preset có sẵn; alias dự án `female_north`.
- Codec do SDK tự tải: `OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX`. Model/codec không đóng gói lại trong source ZIP.
- File hoàn chỉnh: `1311.mp3` và `public/audio/voiceover.mp3`. WAV gốc 48 kHz và manifest nằm cùng thư mục audio. Giọng tạo cục bộ, không có dịch vụ TTS thay thế.

## Nhạc và đồ họa

Nhạc soft electronic finance 116 BPM `finance-news.wav` và sting được tổng hợp mới, không sử dụng bản ghi hay sample bên thứ ba, bằng `scripts/sound_design.py`/`align-audio.py`. Chip, chart, mạng lưới AI và UI do React/SVG dựng trực tiếp, không dùng footage stock. Đồ thị chỉ minh họa xu hướng, không phải dữ liệu giao dịch thực tế. Không tái tạo ảnh sự kiện hoặc chân dung nhân vật bằng AI.

Font **Be Vietnam Pro**, `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm. Nội dung và các số liệu tin tức lấy từ kịch bản được cung cấp, không xác minh lại theo yêu cầu.
