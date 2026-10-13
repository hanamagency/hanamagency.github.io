# Hướng dẫn các việc Nam tự làm

Cập nhật: 13/10/2026. Làm theo thứ tự từ trên xuống. Đánh dấu xong ở `IMPLEMENTATION_STATUS.md` sau mỗi việc.

## 1. Duyệt và xuất bản web

1. Xem ảnh chụp Claude gửi, hoặc mở PR số 3: https://github.com/hanamagency/hanamagency.github.io/pull/3
2. Trả lời Claude đúng chữ "duyệt". Claude gộp PR vào nhánh `main`.
3. Khoảng 1 đến 2 phút sau, mở https://hanamagency.github.io/ và nhấn Ctrl+F5 để tải bản mới.
4. Kiểm nhanh: menu Dịch vụ, trang Kiến thức (`/kien-thuc/`), mục người sáng lập ở trang Facebook Ads, số điện thoại ở chân trang.
5. Web không đổi sau 10 phút: vào repo trên GitHub, tab Actions, xem lần dựng gần nhất có báo lỗi đỏ không, chụp màn hình gửi Claude.

Trên máy tính: sau khi gộp, mở thư mục web và chạy `git pull` để có bản mới nhất. Chưa có thư mục thì chạy `git clone https://github.com/hanamagency/hanamagency.github.io`.

## 2. Cài Apps Script bản 2.4

Mã nằm trong gói tải về (`apps-script/Code-2.4.gs`), không có trong repo.

1. Mở Google Sheet nhận đăng ký, chọn Tiện ích mở rộng, Apps Script.
2. Mở `Code.gs`, xóa hết, dán toàn bộ nội dung `Code-2.4.gs`, bấm Lưu.
3. Chọn Triển khai, Quản lý các tùy chọn triển khai, chọn lần triển khai có ID bắt đầu `AKfycbz7BI9N59`.
4. Bấm hình bút chì, ở mục Phiên bản chọn Phiên bản mới, bấm Triển khai. Không bấm "Triển khai mới" vì sẽ ra link khác, form trên web sẽ gửi sai chỗ.
5. Mở link `/exec` (link nằm ở `ENDPOINT` trong `assets/site.js`), thấy `"version":"2.4"` là xong.
6. Thử: gửi form trên web với email dạng `ten+test@gmail.com`, chọn "Báo giá chạy quảng cáo". Hộp thư nhận email tiêu đề "HÀ NAM AGENCY đã nhận yêu cầu báo giá".
7. Xong thì trong Google Sheet chọn menu HÀ NAM, Xóa các dòng thử.
8. Có lỗi: dán lại bản `Code-2.3-ban-cu-de-quay-lai.gs` và triển khai phiên bản mới như bước 3, 4.

## 3. Kiểm đo lường bằng chế độ Xem trước của GTM

1. Mở https://tagmanager.google.com, chọn container `GTM-KGTWH2R4`, bấm Xem trước (Preview).
2. Nhập https://hanamagency.github.io/facebook-ads.html, bấm Connect. Trang web mở trong tab mới.
3. Trên trang lần lượt: bấm "Nhắn tin tư vấn", bấm "Mở Zalo" trong khung; bấm một mục trong menu Dịch vụ; bấm số điện thoại ở chân trang.
4. Quay lại tab Tag Assistant: mỗi thao tác phải có đúng một sự kiện (`contact_panel_open`, `contact`, `select_content`) và các thẻ GA4, Meta chạy một lần.
5. Trong GA4: Quản trị, Định nghĩa tùy chỉnh, tạo thứ nguyên tùy chỉnh cho `click_location`, `method`, `content_type`, `content_id` nếu chưa có.
6. Chụp màn hình chỗ nào không chạy, gửi Claude.

## 4. Khai báo Google Search Console

Làm sau khi web đã xuất bản (việc 1).

1. Vào https://search.google.com/search-console, đăng nhập tài khoản Google đang quản lý GTM.
2. Thêm thuộc tính, chọn ô bên phải "Tiền tố URL", dán `https://hanamagency.github.io/`.
3. Cách xác minh: chọn "Google Tag Manager", bấm Xác minh (cần quyền Xuất bản trong GTM). Báo lỗi thì chọn "Thẻ HTML", chép đoạn mã gửi Claude để gắn vào trang chủ.
4. Mục Sơ đồ trang web: gõ `sitemap.xml`, bấm Gửi.
5. Mục Kiểm tra URL: dán lần lượt trang chủ, `/facebook-ads.html`, `/shopee-ads.html`, `/qua-tang.html`, `/kien-thuc/`, mỗi link bấm Yêu cầu lập chỉ mục.
6. Trong GA4: Quản trị, Liên kết sản phẩm, Search Console, liên kết với thuộc tính vừa tạo.

## 5. Hỏi kế toán về thanh toán tiền quảng cáo cách 2

Danh sách câu hỏi nằm trong gói tải về (file riêng), không lưu trong repo vì repo công khai. Có câu trả lời thì báo Claude để chỉnh câu chữ thanh toán trên web và mẫu hợp đồng nếu cần.

## 6. Trang TikTok Ads và Google Ads

Gửi Claude cho từng nền tảng:
- Gói dịch vụ và giá từ bao nhiêu
- Việc HÀ NAM AGENCY làm (lên chiến dịch, nội dung, đo lường, báo cáo...)
- Ngành hàng phù hợp, ngân sách tối thiểu nên có
- Cách thanh toán tiền quảng cáo trên nền tảng đó
Claude dựng trang theo khuôn trang Facebook Ads, gửi ảnh xem trước, Nam duyệt rồi mới đăng. Khi có trang, menu Dịch vụ đổi từ link Zalo sang trang mới.

## 7. Đầu trang dùng chung cho các trang

Việc kỹ thuật, Claude làm khi Nam đồng ý: chuyển 5 trang .html sang khuôn Jekyll để menu, chân trang chỉ sửa một chỗ. Không đổi giao diện và đường dẫn. Nên làm trước khi thêm trang TikTok, Google.

## 8. Hồ sơ Google Business và tên miền riêng

Google Business:
1. Điều kiện: văn phòng có biển hiệu, có người làm việc trong giờ khai báo, khách đến được. Không đủ thì chọn dạng phục vụ tận nơi và ẩn địa chỉ.
2. Vào https://business.google.com, đăng nhập hanamagency@gmail.com, thêm doanh nghiệp.
3. Tên: HÀ NAM AGENCY (không thêm từ khóa). Danh mục chính: Dịch vụ tiếp thị qua Internet; phụ: Công ty quảng cáo.
4. Địa chỉ văn phòng iD Junction (kéo ghim đúng Block E) hoặc khu vực phục vụ Đồng Nai, TP.HCM.
5. Điện thoại 0986 219 360 (đổi sang 0356 256 128 khi chuyển số chính), web https://hanamagency.github.io/, giờ Thứ 2 đến Thứ 7, 8:00 đến 17:00.
6. Xác minh thường bằng quay video liền mạch: biển hiệu, lối vào, bên trong văn phòng, giấy tờ hoặc chìa khóa chứng minh quản lý nơi đó.
7. Đánh giá chỉ mời khách thật, không mua, không tặng quà đổi đánh giá.

Tên miền riêng: mua tên miền (ví dụ dạng hanamagency.vn hoặc .com nếu còn), báo Claude để cấu hình GitHub Pages, cập nhật `url` trong `_config.yml`, link tuyệt đối, Search Console và thông tin trên Meta.

## Khi chuyển số chính sang 0356 256 128

Báo Claude khi số mới đã có Zalo tên HÀ NAM AGENCY, kèm ảnh mã QR Zalo của số mới. Các bước Claude làm nằm ở `HA_NAM_AGENCY_CONTEXT.md`, mục "Kế hoạch chuyển sang số 0356 256 128".
