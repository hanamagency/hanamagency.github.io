# Kế hoạch đo lường (tracking)

Cập nhật: 16/10/2026. Không ghi mật khẩu, token, khóa API vào file này.

## Mã đang dùng (đã đối chiếu trong mã nguồn và GTM ngày 16/10/2026)

| Hệ thống | Mã | Mã 4 ký tự dùng trong tên GTM | Cách cài |
|---|---|---|---|
| Google Tag Manager | `GTM-KGTWH2R4` | | Đoạn mã GTM trong `<head>` và `<noscript>` đầu `<body>` của mọi trang, kể cả khuôn trang `_layouts/trang.html` |
| GA4 | `G-3RYL845LXP` (tài sản "Hà Nam Agency", từ 11/10/2026; tài sản cũ `G-BTZNP2S6D1` ngừng nhận) | 5LXP | Tải qua GTM. Web không tự tải GA4 (`LOAD_TAGS_DIRECT: false` trong `assets/site.js`) |
| Meta Pixel | `939933335396008` | 6008 | Tải qua GTM, gửi `trackSingle` chỉ vào pixel này |
| Google Ads | tài khoản 518-400-9025 (đã liên kết GA4) | 9025 | GTM có thẻ liên kết chuyển đổi; thẻ chuyển đổi thêm khi có Mã và Nhãn |
| ChatGPT Ads (OpenAI) | pixel `6KVVaRY4BpLzCftuXGWRwY` | wRwY | Tải qua GTM bằng mẫu chính thức của OpenAI |
| TikTok Pixel | `DB8NL0JC77UB6E0EB2FG` (tạo 16/10/2026, Trung tâm doanh nghiệp Hà Nam Agency) | B2FG | Tải qua GTM từ bản 7 (HTML tùy chỉnh, mã cơ sở nguyên văn của TikTok) |

Không cài trực tiếp các mã này vào HTML khi chúng đang chạy qua GTM, để tránh đếm hai lần.

## Cách đặt tên trong GTM (từ bản v6, học theo bộ đo lường Lucky)

- Thẻ: `[Nền tảng] [mã 4 ký tự] - [Loại] - [Chi tiết]`, ví dụ `GA4 5LXP - Sự kiện - generate_lead`, `Meta 6008 - Lead`, `OpenAI wRwY - Lead (gửi form)`, `GG Ads 9025 - Trình liên kết CĐ`.
- Biến hằng: `C - [Nền tảng] [mã] ID`, ví dụ `C - Meta 6008 ID`. Biến dữ liệu giữ trùng tên dữ liệu: `DLV - form_id`.
- Điều kiện kích hoạt sự kiện web: `CE - [tên sự kiện]`.
- Thư mục: `0. Dùng chung`, `1. GA4 5LXP`, `2. Meta 6008`, `3. GG Ads 9025`, `4. ChatGPT Ads wRwY`, `5. TikTok B2FG` (bản 7).
- Tên sự kiện và tham số gửi đi giữ đúng chuẩn Google, Meta, OpenAI, không đổi theo cách đặt tên thẻ.

## Thẻ trong GTM bản v6

| Thẻ | Khi chạy | Gửi gì |
|---|---|---|
| GA4 5LXP - Thẻ Google | Mọi trang | page_view kèm content_group, page_type |
| GA4 5LXP - Sự kiện - generate_lead, contact, select_content, công cụ trên web | Theo sự kiện web | Như bảng sự kiện bên dưới |
| Meta 6008 - Pixel gốc | Mọi trang, 1 lần mỗi trang | PageView (giữ `fbq.disablePushState = true`) |
| Meta 6008 - Lead | `generate_lead` | Lead, `eventID` = `event_id` |
| Meta 6008 - Contact | `contact` | Contact |
| GG Ads 9025 - Trình liên kết CĐ | Mọi trang | Lưu mã lượt bấm quảng cáo Google |
| OpenAI wRwY - Page Viewed | Mọi trang | `page_viewed`, nội dung là đường dẫn trang |
| OpenAI wRwY - Lead (gửi form) | `generate_lead` | `lead_created`, Event ID = `event_id` (OpenAI bỏ trùng theo mã này) |
| OpenAI wRwY - Contact (bấm liên hệ) | `contact` | sự kiện tùy chỉnh `contact` |

Bản 7 (không gian làm việc "Đo lường v7 - thêm TikTok B2FG", dựng bằng `make_gtm_v7.py`, chưa xuất bản tới khi PR số 5 lên web) thêm:

| Thẻ | Khi chạy | Gửi gì |
|---|---|---|
| TikTok B2FG - Pixel gốc | Mọi trang, 1 lần mỗi trang | Mã cơ sở TikTok, `ttq.page()` (lượt xem trang) |
| TikTok B2FG - Lead | `generate_lead` | Sự kiện chuẩn `Lead` (tên mới của SubmitForm), `event_id` = `event_id` của web, gửi bằng `ttq.instance(<pixel>)` |
| TikTok B2FG - Contact | `contact` | Sự kiện chuẩn `Contact` |

## Gửi Lead từ máy chủ (CAPI), Apps Script 2.6

Sau khi Google Sheet lưu xong, Apps Script gửi thêm sự kiện Lead cho ChatGPT Ads, Meta, TikTok cùng lúc. Cùng `event_id` với pixel trên web nên nền tảng gộp, không đếm 2 lần. Chỉ áp dụng cho Lead; bấm liên hệ, xem trang vẫn đo bằng pixel.

| Nền tảng | Địa chỉ gửi | Tên sự kiện | Gộp với pixel theo | Dữ liệu người dùng |
|---|---|---|---|---|
| ChatGPT Ads | `https://bzr.openai.com/v1/events?pid=<pixel>` | `lead_created`, `data.type: customer_action` | Pixel ID, tên sự kiện, `id` = `event_id` | `emails_sha256`, `phone_numbers_sha256` (84xxxxxxxxx), `external_ids_sha256`, `obref`, `user_agent`, `countries: VN`, `oppref` |
| Meta 6008 | `https://graph.facebook.com/v25.0/939933335396008/events` | `Lead`, `action_source: website` | `event_name` + `event_id` | `em`, `ph` (84xxxxxxxxx), `external_id`, `country` (đã mã hóa), `fbp`, `fbc`, `client_user_agent` |
| TikTok B2FG | `https://business-api.tiktok.com/open_api/v1.3/event/track/` | `Lead` | `event_source_id` + `event` + `event_id` (48 giờ) | `email`, `phone` (+84xxxxxxxxx), `external_id`, `ttp`, `ttclid`, `user_agent`, `country: vn` |

- `external_id`: SHA-256 của mã lead lần đầu cùng số Zalo (khách quay lại vẫn cùng mã).
- Không gửi họ tên, Fanpage, ngân sách. Apps Script không đọc được IP của khách nên không gửi IP.
- Mã truy cập nằm trong Thuộc tính tập lệnh: `OPENAI_API_KEY`, `META_CAPI_TOKEN`, `TIKTOK_TOKEN`. Chưa có mã thì cột ghi `CHƯA CÓ MÃ`, không gửi.
- Dòng thử (email có `+test`): ChatGPT Ads gửi `validate_only`, Meta và TikTok chỉ gửi khi có `META_TEST_CODE`, `TIKTOK_TEST_CODE` và gửi kèm mã thử. Không vào số liệu thật.
- Kết quả ghi ở cột `capi_openai`, `capi_meta`, `capi_tiktok`. Lỗi mạng, 429, 5xx gửi lại tự động (10 phút một lần, tối đa 3 lần trong 24 giờ). Web chưa có `user_agent` (bản cũ trong bộ nhớ đệm) thì Meta bỏ qua vì Meta bắt buộc trường này.
- Tài liệu chính thức đọc ngày 16/10/2026: OpenAI Conversions API và Supported Events, Meta Conversions API, TikTok Events API 2.0 (Parameters, Supported events, Event Deduplication).

## Thông tin trang

Mỗi trang đẩy `content_group` và `page_type` vào `dataLayer` trước mã GTM. Ví dụ: `trang-chu`, `facebook-ads`, `shopee-ads`, `qua-tang`, `cam-on`, `chinh-sach`, `404`, `kien-thuc` (bài viết: `page_type: article`, trang danh sách: `blog_index`).

## Sự kiện web đẩy vào dataLayer

| Sự kiện | Khi nào | Tham số | Nơi trong mã | Gửi tới |
|---|---|---|---|---|
| `generate_lead` | Apps Script trả `ok: true` (đã lưu vào Google Sheet), ngay trước khi chuyển sang trang cảm ơn | `form_id`, `lead_source`, `lead_need`, `lead_budget`, `lead_platform`, `currency`, `event_id` | `trackLead()` | GA4; Meta: Lead; ChatGPT Ads: lead_created (qua GTM) |
| `lead_details_submit` | Khách bổ sung thông tin ở trang cảm ơn và Apps Script báo đã lưu | `form_id`, `lead_need`, `lead_budget`, `lead_source` | `initDetails()` | GA4 |
| `contact` | Bấm Zalo, chép số Zalo, Messenger, gọi điện, email | `method` (`zalo`, `zalo_copy`, `messenger`, `phone`, `email`), `click_location`, `link_url` | khung liên hệ `buildSheet()`, `initContactLinks()` | GA4; Meta: Contact; ChatGPT Ads: contact (qua GTM) |
| `contact_panel_open` | Mở khung liên hệ (bấm link Zalo bất kỳ hoặc nút nổi) | `click_location` | `openSheet()` | GA4 |
| `select_content` | Bấm chọn gói giá; bấm một mục trong menu Dịch vụ | `content_type` (`pricing_plan` hoặc `service_menu`), `content_id` | `initPrefillLinks()`, `initNav()` | GA4 |
| `self_check_complete` | Hoàn thành tự kiểm tra 5 câu (trang Facebook) | `score`, `unsure_count` | `initQuiz()` | GA4 |
| `fee_calculator_use` | Dùng ô tính thử phí | `budget_million` | `initCalc()` | GA4 |
| `checklist_progress` | Checklist đạt mốc số mục đã tick | `checked_count`, `checklist_platform` | `initChecklists()` | GA4 |

`click_location` gồm: `floating_button`, `mobile_bar`, `header`, `footer`, `hero` hoặc `id` của mục chứa nút.

Không có dữ liệu cá nhân (tên, số điện thoại, email, nội dung tin nhắn) trong tham số sự kiện. `link_url` chỉ chứa số Zalo, số điện thoại (0986 219 360 hoặc 0356 256 128), Messenger của HÀ NAM AGENCY. Phân biệt lượt gọi 2 số bằng `link_url`.

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

- Từ 16/10/2026 form đọc trả lời của Apps Script (JSON, CORS). `generate_lead` chỉ đẩy khi Apps Script báo `ok: true`. Mất mạng, quá 25 giây hoặc trả lời lạ thì không đẩy, khách được mời gửi lại hoặc nhắn Zalo. Trường hợp hiếm: Sheet đã lưu nhưng trả lời bị mất trên đường về, khách gửi lại thì Apps Script đánh dấu trùng theo số Zalo trong 24 giờ.
- Apps Script gửi Telegram và email xong mới trả lời, thường 2 đến 5 giây. Nút gửi bị khóa và hiện "Đang gửi…" trong lúc chờ.
- Đối chiếu mỗi tuần: số lead trong tab Leads (bỏ dòng thử, dòng trùng) so với số `generate_lead` trong GA4, chênh lệch mục tiêu gần 0.

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
