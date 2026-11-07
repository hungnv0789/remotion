# Nguồn và tài nguyên

## Nội dung chuẩn

- Bản thu `asset/72h.mp3` do người dùng cung cấp là chuẩn cho lời dẫn và phụ đề, theo lựa chọn được xác nhận trong phiên làm việc.
- `Kichban.md` là hướng dẫn về phong cách bản tin, hình ảnh minh họa và CTA. Giữ nguyên file nguồn; không thêm các câu CTA chưa được đọc vào phụ đề của bản thu.

## Đối chiếu thông tin công khai

Kiểm tra ngày 07/11/2026:

- [European Commission — EU preparedness union strategy](https://commission.europa.eu/topics/preparedness_en): chiến lược công bố ngày 26/03/2025 có nội dung hướng tới khả năng tự đáp ứng nhu cầu tối thiểu 72 giờ của người dân.
- [European Commission — thông cáo giới thiệu chiến lược](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_25_856/IP_25_856_EN.pdf): nêu việc khuyến khích các biện pháp thiết thực, gồm duy trì nhu yếu phẩm cho ít nhất 72 giờ khi khẩn cấp.
- [Canada.ca — Emergency kit checklist](https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/emergency-kits/get-kit.html): hướng dẫn chuẩn bị vật dụng cần thiết cho ít nhất 3 ngày/72 giờ khi sơ tán hoặc trú tại chỗ.

Các nguồn xác nhận bối cảnh chuẩn bị dự phòng; không phải thông báo về một thảm họa cụ thể sắp xảy ra. Video không thêm định mức nước, thuốc hoặc hướng dẫn điều trị ngoài nội dung được cung cấp.

## Hình và âm thanh

- 8 ảnh được chọn từ hai thư mục `asset/Đồ dùng khẩn cấp` và `asset/Thực phẩm dự trữ` do người dùng cung cấp. Xem `public/assets-manifest.json` để tra từng file gốc. Hình được dùng với nhãn “Ảnh minh họa”.
- File giọng đọc trong `public/audio/` là bản sao byte-for-byte của `asset/72h.mp3`.
- Nhạc nền được tự tổng hợp bằng `scripts/prepare-assets.py`, gồm pad, pulse và tiết tấu nhẹ; không sao chép bản nhạc bên ngoài.
- Font Be Vietnam Pro từ gói `@fontsource/be-vietnam-pro`, giấy phép OFL kèm trong dependency.
