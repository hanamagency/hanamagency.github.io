# Ghi chú cho Claude: web HÀ NAM AGENCY

Đọc file này trước khi làm việc với repo. Sau đó đọc:
- `docs/IMPLEMENTATION_STATUS.md`: hạng mục nào đã xong, đang chờ gì
- `docs/HA_NAM_AGENCY_CONTEXT.md`: định vị, khách hàng, các quyết định đã thống nhất, cách diễn đạt
- `docs/CHANGELOG.md`: lịch sử thay đổi (mới nhất ở trên)
- `docs/TRACKING_PLAN.md`: GTM, GA4, Meta Pixel, Google Ads, ChatGPT Ads, cách đặt tên trong GTM và các sự kiện, khi đụng tới đo lường, form, nút liên hệ
- `docs/CONTENT_AND_BLOG_WORKFLOW.md`: khi viết bài cho mục Kiến thức
- `docs/HUONG_DAN_VIEC_CAN_LAM.md`: các việc Nam tự làm ngoài web (Apps Script, GTM, Search Console, Google Business)

Repo công khai trên GitHub, Nam quyết định giữ công khai (13/10/2026). Không chuyển repo sang riêng tư khi tài khoản còn ở gói Free, vì GitHub Pages sẽ ngừng xuất bản web. Không ghi vào bất kỳ file nào trong repo: thông tin thuế, doanh thu, chiến lược kinh doanh riêng, mật khẩu, token, email cá nhân của Nam.

## Web và triển khai

- https://hanamagency.github.io/ chạy GitHub Pages từ nhánh `main` của repo `hanamagency/hanamagency.github.io`. Gộp vào `main` là xuất bản.
- Trang .html viết tay, không có phần khai báo đầu file nên Jekyll chép nguyên trạng: `facebook-ads.html`, `shopee-ads.html`, `qua-tang.html` (Checklist), `cam-on.html`, `chinh-sach.html`, `404.html`.
- Jekyll dựng: `index.html` (có phần khai báo đầu file để chèn 3 bài mới), `sitemap.xml`, mục Kiến thức (`_posts/`, `_layouts/`, `_includes/`, `kien-thuc/`). Trong mọi trang không được có dấu ngoặc nhọn đôi hay `{%` ngoài mã Liquid cố ý.
- `_config.yml` loại `CLAUDE.md`, `docs/` khỏi web. `asset_v` trong đó phải bằng số `?v=` ở các trang .html.
- `404.html` dùng đường dẫn từ gốc (`/assets/...`). Khuôn mục Kiến thức cũng dùng đường dẫn từ gốc.
- Mã Apps Script nhận form nằm trong Google Sheet của Nam, không có trong repo (bản đang triển khai 2.5; bản 2.6 gửi Lead từ máy chủ cho ChatGPT Ads, Meta, TikTok đã lưu trong trình soạn, chờ triển khai). Bản sao Nam lưu trên máy, ngoài repo. Mã truy cập CAPI chỉ nằm trong Thuộc tính tập lệnh của Apps Script, không bao giờ ghi vào repo.

## Quy trình làm việc với Nam (bắt buộc)

1. Đọc mã thật trước khi kết luận. Không mặc định bản trên máy giống bản trên web.
2. Đề xuất trước với thay đổi lớn (kiến trúc, CMS, thiết kế lại, quy trình thanh toán thật).
3. Làm trên nhánh riêng, mở PR nháp vào `main`, gửi ảnh chụp các phần đã sửa.
4. Chỉ gộp vào `main` khi Nam trả lời đúng chữ "duyệt" (ngoại lệ: phiên ngày 16/10/2026 Nam giao toàn quyền tự kiểm thử và xuất bản; phiên khác vẫn hỏi).
5. Cập nhật `docs/CHANGELOG.md` và `docs/IMPLEMENTATION_STATUS.md` sau mỗi đợt sửa.

Trước khi sửa luôn `git fetch` và xem nhánh mới nhất, vì có hơn một phiên Claude cùng làm trên repo này. Không ghi đè việc của phiên khác.

Xem trước: link `https://raw.githack.com/hanamagency/hanamagency.github.io/<mã commit>/facebook-ads.html` xem được các trang .html cố định. Trang chủ và mục Kiến thức cần Jekyll dựng nên chỉ xem được bằng ảnh chụp hoặc máy chủ thử. Dặn Nam không bấm gửi form trên link xem trước.

Cách trả lời Nam: tiếng Việt, không dùng ký tự markdown (dấu sao, dấu thăng, gạch ngang đôi), dùng icon thay gạch đầu dòng, xuống dòng đơn, không để dòng trống giữa các mục. Trả lời đủ mọi ý Nam hỏi trong một lượt. Tách rõ phần đã làm và phần mới là đề xuất.

## Quy ước nội dung

- Không dùng: cam kết, đảm bảo, bảo đảm, 100%, tốt nhất, số 1, hàng đầu, duy nhất, tuyệt đối, chắc chắn, ngay lập tức và các lời hứa kết quả tương tự.
- Không bịa con số, lời chứng thực, logo khách. Số liệu mẫu ghi "Ví dụ minh họa".
- Tránh từ suồng sã ("nói chuyện", "chuyện", "hở", "đội lên", "gánh"). Dùng "trao đổi", "trường hợp", "tăng đột biến", "không như kỳ vọng".
- Người sáng lập: "Lê Nam, người sáng lập HÀ NAM AGENCY", dòng nhỏ "Người trực tiếp đồng hành cùng bạn". Câu văn gọi ngắn là "Nam". Không dùng "CEO", "founder", "giám đốc", "nhà sáng lập".
- Trang nào cũng giữ đủ mục điều hướng ở đầu trang (Nam không muốn thanh trên cùng bị thu gọn).
- Số điện thoại: 0986 219 360 (Zalo, số chính hiện tại) và 0356 256 128. Nam sẽ chuyển dần sang số 0356. Các bước đổi số chính ở `docs/HA_NAM_AGENCY_CONTEXT.md`.
- Thanh toán tiền quảng cáo luôn có 2 lựa chọn ngang nhau (thẻ của khách, hoặc thẻ của HÀ NAM AGENCY), phí dịch vụ ghi tách riêng. Không tự đổi khi chưa hỏi Nam.
- Tài khoản agency: có kênh hỗ trợ riêng của nền tảng, xử lý tùy trường hợp và chính sách nền tảng. Không hứa thời gian xử lý.
- Thương hiệu viết `HÀ&nbsp;NAM&nbsp;AGENCY` trong HTML.

## Giao diện và mã

- Biến màu ở đầu `assets/site.css`, có chế độ tối. `[hidden] { display: none !important; }` áp toàn web: muốn phần tử có `hidden` vẫn hiện ở một cỡ màn hình thì dùng `!important` trong media query.
- Menu "Dịch vụ" (`.nav-drop`, mỗi mục có `data-menu`) chép tay ở 5 trang .html và ở `_includes/dau-trang.html`. Sửa menu thì sửa đủ 6 chỗ.
- Nút liên hệ nổi do `site.js` tạo. Thêm `data-no-float` vào `<body>` để tắt ở một trang.
- Sửa `site.css` hoặc `site.js` thì tăng `?v=` ở mọi trang .html và `asset_v` trong `_config.yml`, trừ khi số hiện tại chưa từng được xuất bản.
- Không đổi tên sự kiện đo lường khi chưa hỏi Nam.

## Kiểm tra trước khi gửi Nam

- `jekyll build --safe` bằng Jekyll 3.10 (cùng bản GitHub Pages), không lỗi.
- Chạy máy chủ thử trong `_site`, xem ở 360, 390, 900, 1280, 1440px: không tràn ngang, không lỗi JavaScript, ảnh có `alt`, link nội bộ không hỏng.
- Gửi thử form với từng lựa chọn "Bạn cần gì?" và xem trang cảm ơn.
- Soát từ cấm.
