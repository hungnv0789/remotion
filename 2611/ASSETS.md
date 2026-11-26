# Assets và nguồn sử dụng

- `2611.mp3`: file người dùng cung cấp; được sao chép nguyên byte thành `public/audio/2611/2611.mp3`, SHA-256 trong production manifest.
- `src/components/NewsGraphics.tsx`: minh họa nhẫn vàng, bảng giá, sơ đồ và biểu đồ tự dựng bằng SVG/React. Tên PNJ, SJC, DOJI và Mi Hồng là văn bản trong bảng so sánh; không sử dụng logo hoặc ảnh cửa hàng.
- `public/audio/2611/finance-news.wav`: nhạc electronic/news tension tự tổng hợp, 108 BPM; không sample hay bản ghi của bên thứ ba. Mã tạo nhạc tại `scripts/sound_design.py`.
- `public/audio/2611/news-sting.wav`: hiệu ứng mở đầu tự tổng hợp bằng bộ dao động.
- Be Vietnam Pro: gói `@fontsource/be-vietnam-pro`, giấy phép SIL Open Font License được giữ trong gói npm.

Không sử dụng ảnh/video stock. Nhẫn vàng là minh họa sản phẩm, không phải ảnh nhận diện mẫu nhẫn của một thương hiệu. Đồ thị đường có nhãn minh họa, không phải dữ liệu giao dịch. `assets-manifest.json` lưu kích thước và SHA-256 tài nguyên.
