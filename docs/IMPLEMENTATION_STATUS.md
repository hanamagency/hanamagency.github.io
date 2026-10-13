# Trạng thái triển khai

Cập nhật: 13/10/2026, sau lượt 3 của PR số 3 (nhánh `claude/facebook-business-verify-address-00wvp2`).

Ý nghĩa trạng thái: Đã kiểm tra (đã đọc mã, đối chiếu), Đã sửa (đã đổi mã), Đã kiểm thử (đã chạy thử và đạt), Chờ xác nhận (chờ Nam quyết), Chờ quyền truy cập (cần tài khoản Nam), Chưa triển khai.

"Đã kiểm thử" ở đây là kiểm trên máy chủ thử. Web thật chỉ đổi sau khi PR được gộp vào `main`.

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Câu chữ: Trao đổi, Bốn trường hợp, giai đoạn 2, ngày sale | Đã kiểm thử | Chờ Nam "duyệt" để xuất bản |
| Địa chỉ văn phòng iD Junction | Đã kiểm thử | |
| Tài khoản agency, kênh hỗ trợ riêng có giới hạn thực tế | Đã kiểm thử | |
| Thanh toán 2 lựa chọn, phí dịch vụ tách riêng | Đã kiểm thử | Quy trình thật, hợp đồng, chứng từ: Chờ xác nhận (Nam và kế toán) |
| Chạy trên tài khoản quảng cáo của khách | Đã kiểm thử | |
| Mục người sáng lập và ảnh chân dung | Đã kiểm thử | |
| Trang cảm ơn hiện bước theo lựa chọn | Đã kiểm thử | 10 trường hợp |
| Email gửi khách theo lựa chọn (Apps Script 2.4) | Đã kiểm thử bằng Sheet giả | Chưa triển khai: Nam dán mã vào Google Sheet và triển khai phiên bản mới |
| Menu Dịch vụ (máy tính, điện thoại) | Đã kiểm thử | |
| Nút liên hệ nổi | Đã kiểm thử | |
| Đo lượt bấm menu (`select_content` service_menu) | Đã kiểm thử trên máy chủ thử | Chờ quyền truy cập: kiểm bằng GTM Preview |
| Cấu hình GTM, GA4, Meta (thẻ, trình kích hoạt, chuyển đổi) | Chờ quyền truy cập | Xem `TRACKING_PLAN.md` |
| `self_check_start` | Chưa triển khai | Cần thêm trình kích hoạt trong GTM |
| Mục Kiến thức và 3 bài đầu | Đã kiểm thử | Jekyll 3.10 dựng không lỗi, JSON-LD và XML hợp lệ |
| Trang 404, ảnh chia sẻ riêng | Đã kiểm thử | |
| Câu "5 suất mỗi tuần" | Chờ xác nhận | Có giới hạn thật thì giữ, không thì bỏ |
| Trang TikTok Ads, Google Ads | Chưa triển khai | Chờ Nam gửi gói, giá, phạm vi việc |
| Google Search Console | Chưa triển khai | Nam làm theo hướng dẫn sau khi xuất bản |
| Hồ sơ Google Business | Chưa triển khai | Cần văn phòng có biển hiệu và người làm việc trong giờ khai báo |
| Tên miền riêng | Chưa triển khai | |
| Đầu trang dùng chung cho cả 5 trang .html | Chưa triển khai | Đề xuất: chuyển 5 trang sang khuôn Jekyll để sửa menu một chỗ |
| Form đọc được kết quả từ Apps Script | Chưa triển khai | Đề xuất: bỏ `no-cors`, đọc phản hồi JSON; cần thử với Apps Script thật trước |
