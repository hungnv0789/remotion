# Nguồn tài nguyên

Hình ảnh được vẽ riêng bằng SVG/React trong `src/components/IPOGraphics.tsx`: counter IPO, thẻ tên doanh nghiệp, biểu đồ thanh định giá/quy mô, cổ phiếu bổ sung, dòng vốn riêng và hai kịch bản ANT. Không dùng ảnh/video stock hoặc ảnh sự kiện giả.

Anthropic, SpaceX, Google, Nvidia, Nasdaq, Claude và ANT hiển thị bằng chữ thông thường/wordmark chữ của dự án; không đóng gói hay tự nhận là logo chính thức. Đồ thị phiên đầu là minh họa có nhãn rõ ràng, không phải dữ liệu giao dịch.

Giọng đọc: Ngọc Huyền từ preset VieNeu-TTS v3 Turbo, model `pnnbao-ump/VieNeu-TTS-v3-Turbo` (Apache-2.0 theo metadata model), SDK 3.8.4, ONNX CPU fp32. Audio gốc dự án được tổng hợp riêng, thông số và hash nằm trong `public/audio/production-manifest.json`.

Nhạc và hiệu ứng bổ sung được tổng hợp từ oscillator, không dùng sample/bản ghi bên thứ ba. Font Be Vietnam Pro qua Fontsource, SIL Open Font License. Mọi tài nguyên render cần thiết đều có sẵn cục bộ sau npm ci.
