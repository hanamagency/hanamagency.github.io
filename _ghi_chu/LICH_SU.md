# Lịch sử thay đổi web HÀ NAM AGENCY

Ghi mới nhất ở trên cùng. Mỗi lần sửa web thêm một mục: ngày, việc đã làm, việc còn chờ. Thư mục `_ghi_chu` không được xuất bản lên web (Jekyll bỏ qua thư mục bắt đầu bằng dấu gạch dưới), nhưng vẫn đọc được trên GitHub vì repo công khai.

Phiên bản CSS và JS hiện tại: `site.css?v=6`, `site.js?v=6`.

## 2026-10-13 (lượt 2): Tiêu đề khiêm tốn hơn, ảnh chân dung, tài khoản của khách, email theo lựa chọn

Cùng nhánh và PR với lượt 1. Nam đã xem và đồng ý các mục của lượt 1, chờ Nam "duyệt" lần cuối.

- Mục người phụ trách: "Nam, nhà sáng lập HÀ NAM AGENCY" đổi thành "Nam, phụ trách HÀ NAM AGENCY" (Nam thấy chữ "nhà sáng lập" phóng đại khi agency mới bắt đầu).
- Thay chữ "N" bằng ảnh `assets/nam.jpg` ở trang Facebook và Shopee. Ảnh tạm, cắt từ ảnh Nam gửi, chỉ lấy mặt Nam.
- Tài khoản quảng cáo: thêm lựa chọn chạy trên tài khoản đứng tên khách (thẻ cách 1, lời dẫn mục tài khoản, hỏi đáp trang Facebook, hỏi đáp trang chủ, điều khoản).
- Nam xác nhận BM đã được Meta xác minh, giữ câu "đã được Facebook xác minh".
- Apps Script 2.4 (gửi Nam để dán vào Google Sheet, không nằm trong repo): email gửi khách đổi theo lựa chọn "Bạn cần gì?", trước đây chọn gì cũng nhận email Checklist. Đây là nguyên nhân chính của lỗi "chọn gì cũng chỉ gửi Checklist".
- Quyết định về blog: chưa mở mục Kiến thức khi chưa có bài (xem CLAUDE.md).
- Hướng dẫn Nam tự làm: Google Search Console, hồ sơ Google Business cho văn phòng Long Thành.

Còn chờ Nam:
- "Duyệt" để xuất bản.
- Dán Apps Script 2.4 và triển khai phiên bản mới (giữ nguyên link /exec).
- Thông tin trang TikTok và Google. Ảnh chân dung chuyên nghiệp khi có.

## 2026-10-13: Câu chữ chuyên nghiệp hơn, văn phòng mới, 2 cách thanh toán, menu Nền tảng, nút liên hệ nổi

Nhánh `claude/facebook-business-verify-address-00wvp2`, PR số 3. Chờ Nam "duyệt" rồi mới gộp.

Câu chữ:
- "Nói chuyện với HÀ NAM AGENCY" đổi thành "Trao đổi với HÀ NAM AGENCY". Dò cả web, bỏ các từ "chuyện", "hở", "lỗ hổng", "đội lên", "nhảy lên", "gánh", "nhờ người khác xem giúp".
- "Bốn chuyện hay gặp" đổi thành "Bốn trường hợp hay gặp" (trang Facebook và Shopee).
- Giai đoạn 2 trang Facebook: "Chạy 10 đến 30 triệu mỗi tháng thấy có lãi, nhưng cứ tăng lên là chi phí tăng đột biến không như kỳ vọng."
- Ngày sale trang Shopee: "...mà đơn không tăng theo đúng kỳ vọng."
- Mục người phụ trách: "Người trực tiếp làm việc với bạn", "Nam, nhà sáng lập HÀ NAM AGENCY" (lượt 2 đổi thành "phụ trách"), lead "Bạn trao đổi trực tiếp với người lên chiến dịch, soát nội dung và viết báo cáo, không qua khâu trung gian." Các ý bên dưới viết lại trang trọng hơn.
- Checklist: "Còn vài lỗ hổng cần vá" đổi thành "Còn vài mục cần hoàn thiện".

Địa chỉ:
- Thêm văn phòng Block E, Khu ID Town, đường N3, Khu đô thị iD Junction, đường Phạm Văn Đồng, phường Long Thành, thành phố Đồng Nai: khối liên hệ trang chủ, form trang Facebook và Shopee, chân trang, chính sách, schema.org (`location`).
- Giữ địa chỉ đăng ký kinh doanh 84/11/3 Lê Duẩn ở dòng pháp lý.

Tài khoản và thanh toán:
- Tài khoản agency: thêm ý có kênh hỗ trợ riêng của nền tảng, sự cố thường được xử lý nhanh hơn tài khoản cá nhân.
- Thanh toán tiền quảng cáo thành 2 lựa chọn: "Dùng thẻ của bạn" (Facebook trừ thẳng vào thẻ của khách, HÀ NAM AGENCY chỉ thu phí dịch vụ) hoặc "Dùng thẻ của HÀ NAM AGENCY" (chuyển trước theo tuần hoặc tháng, đối soát, hoàn phần chưa chạy). Sửa ở trang Facebook (chip đầu trang, nỗi lo, phạm vi, mục tài khoản, bảng giá, hỏi đáp), trang chủ, chính sách.

Form:
- Web vẫn gửi đúng `need` và `platform`. Lỗi "chọn gì cũng ra Checklist" là do trang cảm ơn giống nhau cho mọi lựa chọn. Đã sửa `cam-on.html` và `site.js` (`initThanks`) để hiện bước tiếp theo theo lựa chọn: kiểm tra tài khoản, kế hoạch tăng ngân sách (Shopee: ngân sách ngày sale), báo giá, Checklist, hoặc đề xuất hướng làm.
- Email báo do Apps Script gửi chưa sửa (mã không nằm trong repo).

Giao diện:
- Menu xổ xuống "Nền tảng" ở đầu trang (Facebook, Shopee, TikTok, Google, Checklist, Xem tất cả dịch vụ), đặt trước "Tự kiểm tra". Máy tính: rê chuột hoặc bấm để mở. Điện thoại: nút 3 gạch mở menu dọc.
- Trang Checklist có thêm thanh menu. Nút đầu trang thu gọn thành "Đăng ký" trên điện thoại nhỏ để không tràn ngang.
- Nút liên hệ nổi góc dưới bên phải, mở khung Zalo, Messenger, gọi điện. Điện thoại: chỉ hiện ở trang không có thanh liên hệ dưới đáy. Sự kiện đo: `contact_panel_open` và `contact` với `click_location: floating_button`.
- Chân trang chừa khoảng trống phía dưới để nút nổi không che chữ.
- Trang 404 riêng, ảnh chia sẻ riêng cho trang Facebook, Shopee, Checklist.
- Thêm `CLAUDE.md`, `_ghi_chu/LICH_SU.md`, `_config.yml`.

Còn chờ Nam:
- Trả lời "duyệt" để xuất bản.
- Thông tin để làm trang TikTok và trang Google.

## 2026-10-09: Trang Shopee, tính thử phí, Checklist 2 tab

- Thêm `shopee-ads.html`. Ô tính thử phí có ô nhập số. Checklist có tab Facebook và Shopee.
- Đổi "Checklist 30 điểm" thành "Checklist 30 mục". Thêm số phiên bản `?v=` vào link CSS và JS.

## 2026-10-08: Web v3 và v4

- Web mới: trang chủ, Facebook Ads, Checklist, trang cảm ơn, chính sách.
- Gắn form Apps Script, Google Tag Manager (GA4 và Meta Pixel chạy qua GTM). Tên sự kiện theo chuẩn Google và Meta, form nhanh 2 bước, khung liên hệ Zalo.

## 2026-09-29: Đổi địa chỉ web và email

- Chuyển sang repo `hanamagency/hanamagency.github.io`, địa chỉ https://hanamagency.github.io/.
- Email liên hệ trên web: hanamagency@gmail.com.

## 2026-09-28: Thiết kế lại theo bộ nhận diện V2

- Web giới thiệu dịch vụ theo bộ nhận diện HÀ NAM AGENCY V2. Giờ làm việc 8:00 đến 17:00.

## 2026-09-24: Web xác minh doanh nghiệp Meta

- Làm web cho HỘ KINH DOANH HÀ NAM để Meta xác minh doanh nghiệp, có MST 045088006768. Nội dung hiện đủ khi không chạy JavaScript để bot của Meta đọc được.
