# Kế hoạch đo lường (tracking)

Cập nhật: 13/10/2026. Không ghi mật khẩu, token, khóa API vào file này.

## Mã đang dùng (đã đối chiếu trong mã nguồn)

| Hệ thống | Mã | Cách cài |
|---|---|---|
| Google Tag Manager | `GTM-KGTWH2R4` | Đoạn mã GTM trong `<head>` và `<noscript>` đầu `<body>` của mọi trang, kể cả khuôn trang `_layouts/trang.html` |
| GA4 | `G-BTZNP2S6D1` | Tải qua GTM. Web không tự tải GA4 (`LOAD_TAGS_DIRECT: false` trong `assets/site.js`) |
| Meta Pixel | `939933335396008` | Tải qua GTM, như GA4 |

Không cài trực tiếp GA4 hay Pixel vào HTML khi chúng đang chạy qua GTM, để tránh đếm hai lần.

## Thông tin trang

Mỗi trang đẩy `content_group` và `page_type` vào `dataLayer` trước mã GTM. Ví dụ: `trang-chu`, `facebook-ads`, `shopee-ads`, `qua-tang`, `cam-on`, `chinh-sach`, `404`, `kien-thuc` (bài viết: `page_type: article`, trang danh sách: `blog_index`).

## Sự kiện web đẩy vào dataLayer

| Sự kiện | Khi nào | Tham số | Nơi trong mã | Gửi tới |
|---|---|---|---|---|
| `generate_lead` | Form gửi đi thành công về mặt mạng (fetch không báo lỗi), ngay trước khi chuyển sang trang cảm ơn | `form_id`, `lead_source`, `lead_need`, `lead_budget`, `lead_platform`, `currency`, `event_id` | `trackLead()` | GA4; Meta: Lead (qua GTM) |
| `lead_details_submit` | Khách bổ sung thông tin ở trang cảm ơn | `form_id`, `lead_need`, `lead_budget`, `lead_source` | `initDetails()` | GA4 |
| `contact` | Bấm Zalo, chép số Zalo, Messenger, gọi điện, email | `method` (`zalo`, `zalo_copy`, `messenger`, `phone`, `email`), `click_location`, `link_url` | khung liên hệ `buildSheet()`, `initContactLinks()` | GA4; Meta: Contact (qua GTM) |
| `contact_panel_open` | Mở khung liên hệ (bấm link Zalo bất kỳ hoặc nút nổi) | `click_location` | `openSheet()` | GA4 |
| `select_content` | Bấm chọn gói giá; bấm một mục trong menu Dịch vụ | `content_type` (`pricing_plan` hoặc `service_menu`), `content_id` | `initPrefillLinks()`, `initNav()` | GA4 |
| `self_check_complete` | Hoàn thành tự kiểm tra 5 câu (trang Facebook) | `score`, `unsure_count` | `initQuiz()` | GA4 |
| `fee_calculator_use` | Dùng ô tính thử phí | `budget_million` | `initCalc()` | GA4 |
| `checklist_progress` | Checklist đạt mốc số mục đã tick | `checked_count`, `checklist_platform` | `initChecklists()` | GA4 |

`click_location` gồm: `floating_button`, `mobile_bar`, `header`, `footer`, `hero` hoặc `id` của mục chứa nút.

Không có dữ liệu cá nhân (tên, số điện thoại, email, nội dung tin nhắn) trong tham số sự kiện. `link_url` chỉ chứa số Zalo, Messenger của HÀ NAM AGENCY.

## Đối chiếu với danh sách sự kiện trong brief

| Brief đề xuất | Hiện trạng | Ghi chú |
|---|---|---|
| `contact_click`, `phone_click`, `zalo_click`, `messenger_click` | Gộp trong `contact` với tham số `method` | Theo cách đặt tên khuyến nghị của GA4 (một sự kiện, phân biệt bằng tham số). Không đổi tên vì GTM và chuyển đổi đang dùng tên `contact` |
| `generate_lead` | Có | Chỉ đẩy khi gửi form thành công về mặt mạng |
| `self_check_start` | Chưa có | Muốn thêm thì cần tạo trình kích hoạt trong GTM. Đề xuất, chưa làm |
| `self_check_complete` | Có | |
| `checklist_download` | Không áp dụng | Checklist không có nút tải. Đang đo `checklist_progress` |
| `platform_nav_click` | Dùng `select_content` với `content_type: service_menu` | Dùng lại sự kiện đã có thẻ GA4 trong GTM, không cần thẻ mới |

## Giới hạn đã biết

- Form gửi tới Apps Script ở chế độ `no-cors`. Web biết lỗi mạng (hiện thông báo lỗi, giữ dữ liệu trong form, cho gửi lại) nhưng không đọc được kết quả Apps Script. Nếu Apps Script lỗi, `generate_lead` vẫn được đẩy. Đối chiếu: số lead trong tab Leads của Google Sheet và tin Telegram so với số `generate_lead` trong GA4 mỗi tuần.
- Nút gửi bị khóa trong lúc gửi, tránh gửi hai lần. Apps Script lọc trùng theo số Zalo trong 24 giờ.
- Chưa xem được cấu hình bên trong GTM (thẻ, trình kích hoạt, sự kiện chuyển đổi trong GA4 và Meta). Phần "Gửi tới" ở bảng trên lấy theo ghi chú trong `site.js`, cần Nam xác nhận bằng GTM Preview.

## Cách kiểm thử

1. Mở tagmanager.google.com, container `GTM-KGTWH2R4`, bấm Xem trước (Preview), nhập địa chỉ trang.
2. Trên trang, làm từng thao tác: bấm nút "Nhắn tin tư vấn", bấm Zalo trong khung, bấm gọi, bấm một mục trong menu Dịch vụ, gửi form với email dạng `ten+test@gmail.com`.
3. Trong Tag Assistant xem mỗi thao tác có đúng một sự kiện và thẻ GA4, Meta tương ứng chạy một lần.
4. Trong GA4: Quản trị, DebugView, xem sự kiện và tham số. Lần đầu dùng `click_location`, `content_type` trong báo cáo thì khai báo ở Quản trị, Định nghĩa tùy chỉnh.
5. Xóa dòng thử trong Google Sheet bằng menu HÀ NAM, Xóa các dòng thử.

## Trạng thái kiểm thử

| Sự kiện | Kiểm bằng trình duyệt tự động trên máy chủ thử | Kiểm trong GTM, GA4 thật |
|---|---|---|
| `generate_lead` và `need`, `platform` gửi đi | Đạt (10 trường hợp, 13/10/2026) | Chưa, cần Nam |
| `contact`, `contact_panel_open` từ nút nổi | Đạt | Chưa, cần Nam |
| `select_content` menu Dịch vụ | Đạt (Shopee đẩy 1 lần; TikTok mở khung liên hệ, không đẩy `select_content`) | Chưa, cần Nam |
| Các sự kiện còn lại | Không đổi trong đợt này | Chưa, cần Nam |
