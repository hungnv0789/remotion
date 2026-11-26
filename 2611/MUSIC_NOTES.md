# Âm thanh và nhạc nền

Giọng đọc phát ở tốc độ 1×, gain 0,82; giữ cả phần kết của MP3 gốc. Không tạo TTS hoặc sửa nội dung âm thanh.

Nhạc news tension/electronic được tổng hợp bằng oscillator bass, pad, arpeggio, kick và hi-hat. Không dùng giai điệu, sample hoặc bản ghi nhạc có sẵn của bên thứ ba.

`calibrate-mix.py` đo RMS lời đang nói, hạ nhạc theo cue phụ đề và chừa khoảng dự phòng cho khác biệt mono/stereo. Nhạc có fade mở/kết. `verify-media.py` đối chiếu nguồn với âm thanh MP4 tại mỗi cảnh và đo đỉnh tín hiệu; kết quả lưu tại `out/audio-verification-2611.json`.
