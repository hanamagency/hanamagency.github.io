# Ghi chú cho Claude: web HÀ NAM AGENCY

File này giúp mọi phiên Claude (trên web claude.ai/code hay trên máy của Nam) nắm ngay bối cảnh. Đọc hết file này và `_ghi_chu/LICH_SU.md` trước khi sửa web.

Repo này công khai trên GitHub. Không ghi vào đây hay bất kỳ file nào trong repo: thông tin thuế, doanh thu, chiến lược kinh doanh riêng, mật khẩu, mã bí mật, email cá nhân của Nam.

## Web là gì

- Địa chỉ: https://hanamagency.github.io/ (GitHub Pages, repo `hanamagency/hanamagency.github.io`, nhánh `main` là bản đang chạy).
- Web tĩnh, HTML viết tay, không có bước build. Jekyll mặc định của GitHub Pages chỉ chép file ra. `_config.yml` chỉ dùng để không xuất bản file ghi chú.
- Chủ web: Nam, nhà sáng lập HÀ NAM AGENCY. Đăng ký kinh doanh: HỘ KINH DOANH HÀ NAM, mã số hộ kinh doanh 8130617574-001 (ghi ở chân trang), mã số thuế 045088006768 (ghi trong schema.org `taxID`), địa chỉ đăng ký 84/11/3 Lê Duẩn, khu Bàu Cá, xã An Phước, huyện Long Thành, tỉnh Đồng Nai.
- Văn phòng: Block E, Khu ID Town, đường N3, Khu đô thị iD Junction, đường Phạm Văn Đồng, phường Long Thành, thành phố Đồng Nai.
- Liên hệ trên web: Zalo và điện thoại 0986 219 360, email hanamagency@gmail.com, Fanpage facebook.com/HaNamAgency. Giờ làm việc 8:00 đến 17:00. Không dùng email cá nhân của Nam ở bất kỳ đâu.
- Mục đích ban đầu: để Meta xác minh doanh nghiệp. Hiện tại: web giới thiệu dịch vụ quảng cáo Facebook, Shopee, TikTok, Google cho chủ shop và doanh nghiệp nhỏ.

## Các trang

| File | Nội dung |
|---|---|
| `index.html` | Trang chủ: 4 nền tảng, quy trình, cách làm việc, hỏi đáp, form liên hệ nhanh |
| `facebook-ads.html` | Dịch vụ Facebook & Instagram: nỗi lo, phạm vi, tài khoản và thanh toán, bảng giá, tính thử phí, form đăng ký |
| `shopee-ads.html` | Dịch vụ quảng cáo Shopee, cấu trúc giống trang Facebook |
| `qua-tang.html` | Checklist 30 mục miễn phí, có tab Facebook và Shopee (`#shopee` mở tab Shopee, do site.js xử lý) |
| `cam-on.html` | Trang cảm ơn sau khi gửi form, không cho Google lập chỉ mục. Bước tiếp theo hiện theo lựa chọn "Bạn cần gì?" |
| `chinh-sach.html` | Chính sách bảo mật và điều khoản |
| `404.html` | Trang lỗi. Mọi link và file phải viết từ gốc (`/assets/...`, `/facebook-ads.html`) vì trang này hiện ở mọi đường dẫn sai |
| `assets/site.css`, `assets/site.js` | Giao diện và mã chạy chung cho mọi trang |
| `sitemap.xml`, `robots.txt` | Cập nhật `lastmod` khi sửa nội dung trang |

TikTok và Google chưa có trang riêng, menu đang dẫn qua Zalo.

## Quy trình làm việc với Nam (bắt buộc)

1. Đề xuất trước, chờ Nam đồng ý hướng làm.
2. Làm trên một nhánh riêng, mở PR nháp vào `main`, gửi ảnh xem trước.
3. Chỉ gộp vào `main` (tức là xuất bản) khi Nam trả lời đúng chữ "duyệt".

Trước khi sửa luôn chạy `git fetch` và xem nhánh mới nhất, vì có hơn một phiên Claude cùng commit vào repo này. Không ghi đè việc của phiên khác.

Cách trả lời Nam: tiếng Việt, không dùng ký tự markdown (dấu sao, dấu thăng, gạch ngang đôi), dùng icon thay gạch đầu dòng, xuống dòng đơn, không để dòng trống giữa các mục. Trả lời đủ mọi ý Nam hỏi trong một lượt.

## Quy ước câu chữ

- Không dùng: cam kết, đảm bảo, 100%, tốt nhất, số 1, hàng đầu, duy nhất, tuyệt đối, và các từ hứa hẹn kết quả tương tự (vi phạm chính sách quảng cáo và Luật Quảng cáo).
- Không bịa con số, lời khen của khách, logo khách. Web không đăng số liệu của khách. Bảng số mẫu phải gắn nhãn "VÍ DỤ MINH HỌA".
- Giọng văn chuyên nghiệp, rõ ràng. Tránh từ suồng sã như "nói chuyện", "chuyện", "hở", "nhảy lên", "đội lên", "gánh". Dùng "trao đổi", "trường hợp", "còn thiếu sót", "tăng đột biến", "không như kỳ vọng".
- Thương hiệu viết `HÀ&nbsp;NAM&nbsp;AGENCY` trong HTML để không bị ngắt dòng.
- Thanh toán tiền quảng cáo luôn trình bày 2 lựa chọn ngang nhau: dùng thẻ của khách, hoặc dùng thẻ của HÀ NAM AGENCY. Không tự bỏ hay đổi thứ tự 2 lựa chọn này khi chưa hỏi Nam.
- Tài khoản agency có kênh hỗ trợ riêng của nền tảng, khi có sự cố thường được xử lý nhanh hơn tài khoản cá nhân. Không hứa thời gian xử lý cụ thể.

## Đo lường (đừng đổi tên sự kiện khi chưa hỏi Nam)

- Google Tag Manager `GTM-KGTWH2R4` tải GA4 `G-BTZNP2S6D1` và Meta Pixel `939933335396008`. Web chỉ đẩy sự kiện vào `dataLayer`, phần mô tả đầy đủ nằm ở đầu `assets/site.js`.
- Sự kiện chính: `generate_lead` (Meta: Lead), `contact` (Meta: Contact, có `method` và `click_location`), `select_content`. Sự kiện riêng: `contact_panel_open`, `self_check_complete`, `fee_calculator_use`, `checklist_progress`, `lead_details_submit`.
- `click_location` lấy từ hàm `locationOf()` trong site.js, gồm `floating_button`, `mobile_bar`, `header`, `footer`, `hero`, hoặc `id` của mục chứa nút. Khung liên hệ giữ vị trí của nút đã mở nó. Thêm nút liên hệ mới thì thêm vị trí vào hàm này.
- Mỗi trang khai báo `content_group` và `page_type` trong `<head>` trước mã GTM.

## Form

- Form gửi tới Google Apps Script (`CONFIG.ENDPOINT` trong site.js), chế độ `no-cors`, nên web không đọc được phản hồi.
- Mã Apps Script (ghi Google Sheet, gửi email báo) không nằm trong repo. Muốn sửa email báo thì xin Nam dán mã.
- Trường gửi đi gồm `need` (kiem-tra-tai-khoan, tang-ngan-sach, bao-gia, chi-checklist, hoặc trống) và `platform` (facebook, shopee...). Trang cảm ơn đọc `sessionStorage` `hn_lead_need`, `hn_lead_platform` để hiện bước tiếp theo đúng lựa chọn.
- Đổi câu chữ ô đồng ý thì tăng `CONSENT_VERSION`.

## Giao diện

- Màu và cỡ chữ là biến CSS ở đầu `site.css` (`--brand`, `--fb`, `--shopee`, `--tiktok`, `--google`, `--zalo`...). Có chế độ tối.
- Lưu ý: `[hidden] { display: none !important; }` áp cho toàn web. Muốn phần tử có `hidden` vẫn hiện ở một kích cỡ màn hình thì phải dùng `!important` trong media query (xem menu Nền tảng trên điện thoại).
- Đầu trang: menu xổ xuống "Nền tảng" (`.nav-drop`) và nút menu điện thoại (`.menu-toggle`). Menu này đang chép tay ở 5 trang: index, facebook-ads, shopee-ads, qua-tang, chinh-sach. Sửa menu thì sửa đủ 5 trang.
- Nút liên hệ nổi (`.float-contact`) do site.js tự tạo, mở khung liên hệ Zalo, Messenger, gọi điện. Trên điện thoại nó ẩn ở trang đã có thanh liên hệ dưới đáy. Thêm `data-no-float` vào `<body>` để tắt ở một trang.
- Sau mỗi lần sửa `site.css` hoặc `site.js`, tăng số phiên bản `?v=` ở mọi trang (kể cả 404.html) để trình duyệt tải bản mới. Bản hiện tại: xem `_ghi_chu/LICH_SU.md`.

## Kiểm tra trước khi gửi Nam

- Chạy thử bằng `python3 -m http.server` rồi mở trên trình duyệt, xem ở bề rộng 360, 390, 900, 1280 và 1440px.
- Không có trang nào bị tràn ngang, không lỗi JavaScript, mọi ảnh có `alt`.
- Gửi thử form với từng lựa chọn "Bạn cần gì?" và xem trang cảm ơn.
- Soát lại từ cấm ở trên.
- Thêm dòng vào `_ghi_chu/LICH_SU.md` cho mỗi lần thay đổi.
