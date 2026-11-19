# Financial News Cinematic · 106 BPM

`finance-news.wav` là nhạc tổng hợp riêng gồm bass, pad, arpeggio và percussion nhẹ, nâng năng lượng vừa phải cuối video. `news-sting.wav` mở màn; `rising-whoosh.wav` phát khi lời đọc chuyển tới điều kiện bán hết phần cổ phiếu bổ sung, có sweep và bass hit.

Mã tạo nằm ở `scripts/sound_design.py` và `scripts/align-audio.py`, không dùng loop hay sample từ bên thứ ba, không sao chép giai điệu bài hát. Mã nguồn và hash giúp truy xuất phần nhạc bổ sung; không bảo đảm mọi hệ thống nhận diện tự động sẽ không gắn nhầm.

Nhạc được cân thấp hơn giọng theo RMS phần có lời, có duck/fade và 6 dB dự phòng cho mono/stereo. `mix-calibration.json` lưu thông số; `verify-media.py` kiểm tra lại trên MP4 thực tế. Có thể giảm `audio.musicVolume`, `stingVolume`, `riseVolume` trong props.
