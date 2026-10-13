# Trạng thái triển khai

Cập nhật: 13/10/2026, sau lượt 4 của PR số 3 (nhánh `claude/facebook-business-verify-address-00wvp2`).

Ý nghĩa trạng thái: Đã kiểm tra (đã đọc mã, đối chiếu), Đã sửa (đã đổi mã), Đã kiểm thử (đã chạy thử và đạt), Chờ xác nhận (chờ Nam quyết), Chờ quyền truy cập (cần tài khoản Nam), Chưa triển khai.

"Đã kiểm thử" ở đây là kiểm trên máy chủ thử. Web thật chỉ đổi sau khi Nam trả lời "duyệt" và PR được gộp vào `main`.

## Trên web (trong PR số 3)

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Câu chữ: Trao đổi, Bốn trường hợp, giai đoạn 2, ngày sale | Đã kiểm thử | |
| Địa chỉ văn phòng iD Junction | Đã kiểm thử | |
| Tài khoản agency, kênh hỗ trợ riêng có giới hạn thực tế | Đã kiểm thử | |
| Thanh toán 2 lựa chọn, phí dịch vụ tách riêng | Đã kiểm thử | Quy trình thật, hợp đồng, chứng từ: Chờ xác nhận (Nam và kế toán) |
| Chạy trên tài khoản quảng cáo của khách | Đã kiểm thử | |
| Mục người sáng lập "Lê Nam", ảnh chân dung | Đã kiểm thử | |
| Trang cảm ơn hiện bước theo lựa chọn | Đã kiểm thử | 10 trường hợp |
| Menu Dịch vụ (máy tính, điện thoại) | Đã kiểm thử | |
| Đầu trang Checklist đủ mục | Đã kiểm thử | Lượt 4 |
| Thêm số điện thoại 0356 256 128 | Đã kiểm thử | Nút Zalo, mã QR vẫn dùng số 0986 cho tới khi Nam chuyển |
| Nút liên hệ nổi | Đã kiểm thử | |
| Đo lượt bấm menu (`select_content` service_menu) | Đã kiểm thử trên máy chủ thử | Chờ quyền truy cập: kiểm bằng GTM Preview |
| Mục Kiến thức và 3 bài đầu | Đã kiểm thử | Nam tạm coi nội dung là ổn, sửa sau nếu cần |
| Trang 404, ảnh chia sẻ riêng | Đã kiểm thử | |
| Câu "5 suất mỗi tuần" | Đã kiểm tra | Nam xác nhận giữ |
| Xuất bản (gộp PR vào `main`) | Chờ xác nhận | Nam trả lời "duyệt" |

## Ngoài web (Nam làm, hướng dẫn ở `HUONG_DAN_VIEC_CAN_LAM.md`)

| Việc | Trạng thái | Ghi chú |
|---|---|---|
| Cài Apps Script 2.4 (email theo lựa chọn) | Chưa triển khai | Mã đã kiểm thử bằng Sheet giả, nằm trong gói tải về, không có trong repo |
| Kiểm sự kiện bằng GTM Preview, khai báo tham số trong GA4 | Chờ quyền truy cập | Xem `TRACKING_PLAN.md` |
| Google Search Console và gửi sitemap | Chưa triển khai | Làm sau khi xuất bản |
| Hỏi kế toán về thanh toán cách 2 | Chưa triển khai | Nội dung câu hỏi không lưu trong repo |
| Hồ sơ Google Business | Chưa triển khai | Cần văn phòng có biển hiệu, có người làm việc trong giờ khai báo |
| Tên miền riêng | Chưa triển khai | |

## Chưa làm trên web (đề xuất)

| Việc | Trạng thái | Ghi chú |
|---|---|---|
| Trang TikTok Ads, Google Ads | Chưa triển khai | Chờ Nam gửi gói, giá, phạm vi việc |
| Đầu trang dùng chung cho 5 trang .html | Chưa triển khai | Chuyển 5 trang sang khuôn Jekyll để sửa menu một chỗ |
| `self_check_start` | Chưa triển khai | Cần thêm trình kích hoạt trong GTM |
| Form đọc được kết quả từ Apps Script | Chưa triển khai | Bỏ `no-cors`, đọc phản hồi JSON; cần thử với Apps Script thật trước |
