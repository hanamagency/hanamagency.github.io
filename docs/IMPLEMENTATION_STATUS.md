# Trạng thái triển khai

Cập nhật: 16/10/2026. Đợt 16/10 (nhánh `claude/xac-nhan-lead-va-noi-dung-2026-10-16`) Nam giao toàn quyền, Claude tự kiểm thử và xuất bản. PR số 3 đã gộp ngày 13/10/2026.

Ý nghĩa trạng thái: Đã kiểm tra (đã đọc mã, đối chiếu), Đã sửa (đã đổi mã), Đã kiểm thử (đã chạy thử và đạt), Chờ xác nhận (chờ Nam quyết), Chờ quyền truy cập (cần tài khoản Nam), Chưa triển khai.

"Đã kiểm thử" ở đây là kiểm trên máy chủ thử trước khi gộp. Các hạng mục trong bảng "Trên web" đã lên web thật cùng PR số 3.

## Trên web (đã xuất bản cùng PR số 3)

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
| Xuất bản (gộp PR số 3 vào `main`) | Đã xuất bản | Nam duyệt ngày 13/10/2026 |
| Chế độ repo | Đã kiểm tra | Giữ công khai cả 2 repo, Nam quyết định 13/10/2026 |

## Ngoài web (Nam làm, hướng dẫn ở `HUONG_DAN_VIEC_CAN_LAM.md`, bỏ qua việc 1 vì đã xuất bản)

| Việc | Trạng thái | Ghi chú |
|---|---|---|
| Cài Apps Script (email theo lựa chọn, từ 2.4) | Đã triển khai | Đang chạy 2.6 từ 16/10/2026 (gồm 2.4, 2.5). Mã không có trong repo |
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
| Form đọc được kết quả từ Apps Script | Đã kiểm thử | 16/10/2026. Đã thử thật với Apps Script 2.3 và 2.5 (đọc được JSON). 7 ca kiểm thử đạt |

## Đợt 16/10/2026 (trưa): gửi Lead từ máy chủ (CAPI), TikTok Pixel

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Web gửi kèm `oppref`, `obref`, `ttp`, `user_agent` (`?v=8`) | Đã xuất bản | PR số 5, Nam duyệt 09:50 16/10/2026, gộp vào `main` (a21216f). Kiểm web thật: 7 trang đều `site.js?v=8` |
| Dòng báo mã hóa dưới nút gửi, chính sách nêu TikTok và gửi từ máy chủ | Đã xuất bản | Cùng PR số 5 |
| TikTok Pixel B2FG (`DB8NL0JC77UB6E0EB2FG`) | Đã tạo | Nam tạo 16/10/2026 01:14 trong Trung tâm doanh nghiệp Hà Nam Agency. So khớp nâng cao tự động: tắt (để nguyên, Apps Script gửi email, SĐT đã mã hóa). Cookie bên thứ nhất: bật |
| GTM bản 7 (v6 + TikTok Pixel gốc, Lead, Contact) | Đã xuất bản | Phiên bản 7 "Đo lường v7 - 16/10/2026 - thêm TikTok B2FG", 10:03 16/10/2026. `gtm.js` trên web có pixel B2FG, trình duyệt có cookie `_ttp` |
| Apps Script 2.6 (CAPI ChatGPT Ads, Meta, TikTok) | Đã triển khai | Lần triển khai `AKfycbz7BI9N59` lên Phiên bản 8 "HÀ NAM Leads v2.6" lúc 09:31 16/10/2026 (mã trong trình soạn khớp mã băm 9990b0c7). `capNhatV2` chạy 09:59: Sheet có đủ 49 cột. `/exec` trả `"version":"2.6"`, `capi` on cả 3 |
| Mã truy cập CAPI (OpenAI API key, Meta, TikTok) | Đã có | Nam tạo và dán vào Thuộc tính tập lệnh 16/10/2026, kèm `META_TEST_CODE`, `TIKTOK_TEST_CODE`. Claude không tạo, không nhập mã |
| Thử thật CAPI trên web | Đã kiểm thử | 10:06 16/10/2026, form Facebook đầy đủ, email `+test`, lead HN-261016-1006-X7SZ, `event_id` hn-mvadzhio-9tcqik. Sheet: `capi_openai` CHỈ KIỂM OK 200, `capi_meta` THỬ OK 200 nhận 1, `capi_tiktok` THỬ OK 200; có `fbp`, `obref`, `ttp`, `user_agent`. Meta Thử nghiệm sự kiện: Lead trình duyệt và máy chủ cùng mã, "Đã bỏ trùng lặp". TikTok Sự kiện thử nghiệm: "Gửi biểu mẫu" trình duyệt và máy chủ cùng `event_id`. Từ lúc bấm gửi tới khi sang trang cảm ơn khoảng 8,6 giây |

## Đợt 16/10/2026

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Form chỉ báo lead khi Apps Script xác nhận lưu | Đã kiểm thử | Xem CHANGELOG |
| Checklist 3 mục, tiêu đề có Shopee | Đã sửa | |
| Bài tăng ngân sách Facebook, bài Shopee ngày sale | Đã sửa | Có nguồn tham khảo, dòng cập nhật |
| Ô tính phí: quy tắc gói, ví dụ sát ngưỡng, chưa gồm thuế, trả trước | Đã kiểm thử | 360, 1280px không tràn |
| Địa chỉ theo đơn vị hành chính mới, bỏ taxID | Đã sửa | |
| robots.txt bỏ chặn trang cảm ơn | Đã sửa | Trang vẫn có `noindex` |
| Chính sách nêu Google Ads, ChatGPT Ads | Đã sửa | |
| GTM bản v6 (tên theo nền tảng, ChatGPT Ads) | Đã xuất bản | Phiên bản 6, 00:54 16/10/2026. Xem trước trên web thật đạt (page_view, contact, select_content, generate_lead; Meta Lead, Contact; ChatGPT lead_created) |
| Sự kiện chuyển đổi ChatGPT Ads | Đã tạo | HN wRwY - Gui form (lead_created), HN wRwY - Lien he (contact), HN wRwY - Xem trang (page_viewed) |
| Apps Script 2.5 (2.4 + giữ ok: true khi Telegram, email lỗi) | Đã triển khai | Nam triển khai sáng 16/10/2026, `/exec` trả `"version":"2.5"`. Mã ngoài repo. Thử thật 06:43: trả `ok: true, saved: true`, sang trang cảm ơn |
| Meta 6008 kiểm bằng Thử nghiệm sự kiện | Đã kiểm thử | 16/10/2026 06:43: Lead có ID sự kiện bằng `event_id` của web, Contact, PageView. `SubscribedButtonClick` là sự kiện Meta tự ghi, không phải chuyển đổi |
| GA4 5LXP: phương diện tùy chỉnh, sự kiện chính | Đã kiểm thử | 11 phương diện (thêm `content_type`, `content_id` ngày 16/10); `generate_lead` là sự kiện chính, đang nhận dữ liệu |
| Google Ads 9025: hành động chuyển đổi "Gửi form" | Chưa triển khai | Cần tạo trong Google Ads rồi thêm thẻ GTM bản 8 |
| Search Console, sitemap | Chưa triển khai | |
| Báo cáo phễu hằng tuần trong Google Sheet | Chưa triển khai | Đợt sau |
| Nút tự nguyện gửi kết quả Checklist | Chưa triển khai | Đợt sau |
