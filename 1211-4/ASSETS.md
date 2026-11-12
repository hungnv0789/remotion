# Tài nguyên và ghi nguồn

## Ảnh NHNN

`public/images/nhnn-hanoi.jpg`: **Banco Estatal de Vietnam, Hanoi, Vietnam (36733497852)**, tác giả **Edgardo W. Olivera**, ngày chụp **09/06/2017**, giấy phép [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).

[Trang ảnh và thông tin gốc trên Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Banco_Estatal_de_Vietnam,_Hanoi,_Vietnam_(36733497852).jpg).

Ảnh được crop theo khung và đặt cùng đồ họa, không coi là ảnh ghi lại hoạt động mua USD hiện tại. Tên tác giả, giấy phép và năm được ghi ngay dưới ảnh trong video. Dữ liệu gốc ở `src/data/assets.json`.

## Voice-over

Giọng được tạo cho kịch bản này qua **gTTS / Google Translate TTS**, tiếng Việt (`vi`), alias cấu hình `female_north`. [Tài liệu gTTS](https://gtts.readthedocs.io/en/latest/module.html). Một giọng xuyên suốt, tốc độ xử lý 1,12 lần, không giả danh cá nhân thật. Các đoạn gốc, WAV căn lời ở cache `out/tts-cache/`; file MP3 hoàn chỉnh tại `1211-4.mp3` và `public/audio/voiceover.mp3`.

## Nhạc, sting và đồ họa

- `public/audio/finance-news.wav`: nhạc electronic news tạo mới bằng NumPy, 120 BPM, không lấy từ thư viện stock.
- `public/audio/news-sting.wav`: hiệu ứng intro tổng hợp mới.
- USD/VND là tờ tiền đồ họa khái niệm, không phải ảnh tái tạo tiền thật. Ngân hàng, chart, bất động sản, nhà máy và dòng tiền đều là React/SVG trong `src/components/FinanceGraphics.tsx`.
- Không dùng video/ảnh từ Global X, Storyblocks hoặc các ví dụ tham khảo được nêu trong brief.
- Font **Be Vietnam Pro**, `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License 1.1 đi kèm gói npm.

## Nội dung

Giữ kịch bản được cung cấp, không xác minh lại chính sách hoặc số liệu tin tức. Chú thích giả định của cảnh tiền tệ và điều kiện hưởng lợi là một phần nội dung hiển thị, không phải khuyến nghị mua mã cổ phiếu cụ thể.
