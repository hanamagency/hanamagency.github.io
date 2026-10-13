# Lịch sử thay đổi web HÀ NAM AGENCY

Ghi mới nhất ở trên cùng. Mỗi lần sửa web thêm một mục gồm: ngày, file đã sửa, nội dung trước và sau (tóm tắt), lý do, kết quả kiểm thử, trạng thái và việc còn lại. Chỉ ghi "đã xong" khi đã kiểm thử. Thư mục `docs` không xuất bản lên web (khai báo trong `_config.yml`), nhưng vẫn đọc được trên GitHub vì repo công khai. Trước ngày 13/10/2026 file này nằm ở `_ghi_chu/LICH_SU.md`.

Phiên bản CSS và JS hiện tại: `site.css?v=6`, `site.js?v=6` (biến `asset_v` trong `_config.yml` dùng cho mục Kiến thức).

## 2026-10-13 (lượt 3): Mục Kiến thức, mục người sáng lập, menu Dịch vụ, bộ tài liệu docs

Cùng nhánh `claude/facebook-business-verify-address-00wvp2` và PR số 3. Trạng thái: đã kiểm thử trên máy chủ thử, chưa xuất bản, chờ Nam "duyệt".

Mục người sáng lập (trang Facebook, Shopee):
- Trước: dòng nhỏ "Người trực tiếp làm việc với bạn", tiêu đề "Nam, phụ trách HÀ NAM AGENCY", câu dẫn "Bạn trao đổi trực tiếp với người lên chiến dịch, soát nội dung và viết báo cáo, không qua khâu trung gian."
- Sau: dòng nhỏ "Người trực tiếp đồng hành cùng bạn" (khớp khẩu hiệu "Đồng hành tăng trưởng"), tiêu đề "Nam, người sáng lập HÀ NAM AGENCY", câu dẫn "Từ buổi trao đổi đầu tiên đến báo cáo mỗi thứ Hai, Nam trực tiếp lên kế hoạch, triển khai chiến dịch và giải thích số liệu cho bạn. Có việc cần hỏi, bạn liên hệ thẳng người đang theo sát tài khoản của mình."
- Lý do: Nam muốn ghi đúng vai trò người sáng lập nhưng không phô trương; "phụ trách" làm vai trò nhỏ đi; câu dẫn cũ dùng cách nói phủ định.
- Ảnh `assets/nam.jpg` thay bằng ảnh chân dung mới (áo sơ mi, nền trơn), cắt vuông 480px. Trang chủ thêm `founder` vào schema.org.

Câu chữ theo brief giai đoạn 2:
- Shopee: câu trích "Ngày sale, ngân sách quảng cáo tăng mạnh nhưng số đơn không tăng như kỳ vọng."; "tiền quảng cáo đi nhanh" thành "ngân sách quảng cáo tiêu nhanh".
- Tài khoản agency (trang Facebook): bỏ cách nói "thường được xử lý nhanh hơn" chung chung, thay bằng "phối hợp xử lý qua kênh hỗ trợ riêng, thường kịp thời hơn, tùy từng trường hợp"; thêm ý kênh hỗ trợ làm việc theo chính sách nền tảng và tài khoản agency dùng cho sản phẩm, nội dung đáp ứng chính sách quảng cáo của Meta.
- Thanh toán cách 2: thêm "Tiền quảng cáo và phí dịch vụ ghi tách riêng, kèm số liệu chi tiêu xuất từ trình quản lý quảng cáo". Điều khoản: tiền chuyển trước chỉ dùng để thanh toán cho nền tảng, phí dịch vụ ghi tách khỏi tiền quảng cáo.
- Câu "Facebook phải dò lại người xem từ đầu" (trang Facebook, Checklist) thành "dễ đưa nhóm quảng cáo quay lại giai đoạn máy học", vì câu cũ khẳng định quá mức.

Menu và đo lường:
- Nút menu "Nền tảng" đổi tên thành "Dịch vụ" ở 5 trang; nhãn nhóm trên điện thoại "Dịch vụ theo nền tảng". Thêm mục "Kiến thức" trong menu và chân trang.
- `site.js`: bấm mục trong menu Dịch vụ đẩy `select_content` với `content_type: service_menu`, `content_id` lấy từ thuộc tính `data-menu`. Mục TikTok, Google dẫn sang Zalo không đẩy thêm (đã có `contact`).

Mục Kiến thức (mới, dựng bằng Jekyll của GitHub Pages):
- File mới: `_layouts/trang.html`, `_layouts/bai-viet.html`, `_includes/dau-trang.html`, `_includes/chan-trang.html`, `kien-thuc/index.html`, `kien-thuc/feed.xml`, 3 bài trong `_posts/`.
- `sitemap.xml` chuyển sang dạng tự thêm bài viết. `index.html` có phần khai báo đầu file để hiện 3 bài mới (mục `#kien-thuc` trước phần Hỏi đáp; Hỏi đáp và Liên hệ đổi nền xen kẽ cho đúng thứ tự).
- 3 bài đầu Nam đã duyệt chủ đề: tăng ngân sách Facebook, ngân sách Shopee ngày sale, quyền chỉ xem tài khoản quảng cáo. Link nội bộ từ trang Facebook, Shopee, trang chủ, trang cảm ơn tới bài liên quan.
- `site.css`: thêm kiểu cho bài viết, danh sách bài, bảng trong bài.

Tài liệu:
- `_ghi_chu/LICH_SU.md` chuyển thành `docs/CHANGELOG.md`. Thêm `docs/HA_NAM_AGENCY_CONTEXT.md`, `docs/TRACKING_PLAN.md`, `docs/CONTENT_AND_BLOG_WORKFLOW.md`, `docs/IMPLEMENTATION_STATUS.md`. `CLAUDE.md` rút gọn, trỏ tới các file này.

Kiểm thử:
- `jekyll build --safe` bản 3.10.0 (cùng bản GitHub Pages dùng): không lỗi. 8 trang .html cũ ra đúng từng byte như file gốc.
- Sơ đồ trang và nguồn tin là XML hợp lệ (9 địa chỉ, 3 bài). Dữ liệu cấu trúc JSON-LD hợp lệ ở trang chủ, trang danh sách và 3 bài.
- 5 trang Kiến thức và trang chủ ở 1366px và 360px: không tràn ngang, không lỗi JavaScript, ảnh đủ mô tả, 20 link nội bộ không hỏng.
- Bấm menu Dịch vụ: `select_content:service_menu:shopee`; bấm TikTok mở khung liên hệ, không đẩy `select_content`.
- Các bài kiểm tra cũ (tràn ngang 7 trang, form 10 trường hợp, menu, 404): xem mục kiểm thử trong PR.

Còn lại:
- Nam "duyệt" để xuất bản. Sau khi xuất bản: khai báo Search Console, gửi sitemap.
- Nam dán Apps Script 2.4.
- Câu "5 suất mỗi tuần" ở trang chủ và trang Facebook: chờ Nam xác nhận có giới hạn thật, nếu không thì bỏ.

## 2026-10-13 (lượt 2): Tiêu đề khiêm tốn hơn, ảnh chân dung, tài khoản của khách, email theo lựa chọn

Cùng nhánh và PR với lượt 1. Nam đã xem và đồng ý các mục của lượt 1, chờ Nam "duyệt" lần cuối.

- Mục người phụ trách: "Nam, nhà sáng lập HÀ NAM AGENCY" đổi thành "Nam, phụ trách HÀ NAM AGENCY" (Nam thấy chữ "nhà sáng lập" phóng đại khi agency mới bắt đầu).
- Thay chữ "N" bằng ảnh `assets/nam.jpg` ở trang Facebook và Shopee. Ảnh tạm, cắt từ ảnh Nam gửi, chỉ lấy mặt Nam.
- Tài khoản quảng cáo: thêm lựa chọn chạy trên tài khoản đứng tên khách (thẻ cách 1, lời dẫn mục tài khoản, hỏi đáp trang Facebook, hỏi đáp trang chủ, điều khoản).
- Nam xác nhận BM đã được Meta xác minh, giữ câu "đã được Facebook xác minh".
- Apps Script 2.4 (gửi Nam để dán vào Google Sheet, không nằm trong repo): email gửi khách đổi theo lựa chọn "Bạn cần gì?", trước đây chọn gì cũng nhận email Checklist. Đây là nguyên nhân chính của lỗi "chọn gì cũng chỉ gửi Checklist".
- Quyết định về blog lúc đó: chưa mở mục Kiến thức khi chưa có bài. Lượt 3 đã mở sau khi Nam duyệt 3 chủ đề.
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
- Thêm `CLAUDE.md`, `_ghi_chu/LICH_SU.md` (nay là `docs/CHANGELOG.md`), `_config.yml`.

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
