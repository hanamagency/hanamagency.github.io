# Lịch sử thay đổi web HÀ NAM AGENCY

Ghi mới nhất ở trên cùng. Mỗi lần sửa web thêm một mục gồm: ngày, file đã sửa, nội dung trước và sau (tóm tắt), lý do, kết quả kiểm thử, trạng thái và việc còn lại. Chỉ ghi "đã xong" khi đã kiểm thử. Thư mục `docs` không xuất bản lên web (khai báo trong `_config.yml`), nhưng vẫn đọc được trên GitHub vì repo công khai. Trước ngày 13/10/2026 file này nằm ở `_ghi_chu/LICH_SU.md`.

Phiên bản CSS và JS hiện tại: `site.css?v=8`, `site.js?v=8` (biến `asset_v` trong `_config.yml` dùng cho mục Kiến thức).

## 2026-10-16 (trưa): Gửi Lead từ máy chủ (CAPI), TikTok Pixel B2FG

Nhánh `claude/capi-tiktok-2026-10-16`, PR số 5. Nam giao Claude tự quyết lúc 08:21. Bước gộp vào `main` bị chặn bởi kiểm tra an toàn của Claude (gộp khi chưa có người duyệt), chờ Nam trả lời "duyệt".

- `assets/site.js`: form gửi kèm `oppref` (tham số `oppref` trên link quảng cáo ChatGPT, cookie `__oppref` của pixel OpenAI, hoặc bản web tự nhớ 30 ngày khi pixel bị chặn), `obref` (cookie `__obref`), `ttp` (cookie `_ttp` của TikTok Pixel), `user_agent`. Chỉ gửi trường có giá trị. Lý do: Apps Script 2.6 cần các mã này để gửi Lead từ máy chủ cho ChatGPT Ads, Meta, TikTok, nền tảng gộp với bản trình duyệt nhờ `event_id`.
- 5 form (trang chủ, Facebook 2 form, Shopee 2 form): thêm dòng nhỏ dưới nút gửi "Email và số Zalo được mã hóa một chiều trước khi gửi cho Meta, TikTok, OpenAI để đo hiệu quả quảng cáo. Xem chi tiết." Không đổi câu chữ ô đồng ý, không đổi `consent_version`.
- `chinh-sach.html`: thêm TikTok Pixel, mã `_ttp`, `__obref`, `oppref`, thông tin trình duyệt; mục Chia sẻ dữ liệu (`#chia-se-du-lieu`) giải thích thông báo đăng ký gửi từ máy chủ gồm gì, không gồm gì; cách tắt quảng cáo cá nhân hóa của TikTok.
- `?v=8`, `asset_v: 8`.
- Kiểm thử (Chromium thật, Apps Script giả): 4 ca mới (oppref từ link, từ cookie, nhớ qua trang khác; không có cookie thì không gửi trường rỗng) và 7 ca cũ đều đạt; không tràn ngang ở 360, 1280px. Không dựng được Jekyll trên máy chủ của Claude (bị chặn tải gói); `index.html` chỉ thêm một dòng HTML, không có mã Liquid.
- Ngoài repo, đã chuẩn bị: Apps Script 2.6 (đã lưu trong trình soạn, chưa triển khai), GTM không gian làm việc "Đo lường v7 - thêm TikTok B2FG" (chưa xuất bản). Xem `IMPLEMENTATION_STATUS.md`, `TRACKING_PLAN.md`.

## 2026-10-16 (sáng): Apps Script 2.5 đã chạy, kiểm đo lường trên web thật

Không sửa trang web, chỉ ghi trạng thái.

- Nam triển khai Apps Script 2.5 (lần triển khai `AKfycbz7BI9N59`), `/exec` trả `"version":"2.5"`.
- Thử thật 06:43 trên web đang chạy (không dùng Xem trước): form trả `ok: true, saved: true`, sang trang cảm ơn. Meta Thử nghiệm sự kiện nhận Lead có ID sự kiện bằng `event_id`, Contact, PageView. GA4 nhận `contact_panel_open`, `contact`, `generate_lead`. ChatGPT Ads nhận `lead_created`, `contact`.
- GA4: thêm phương diện tùy chỉnh `content_type`, `content_id` (tổng 11). `generate_lead` là sự kiện chính.
- Việc còn lại: Nam xóa các dòng thử trong Google Sheet; hành động chuyển đổi Google Ads và thẻ GTM bản 7; Search Console.

## 2026-10-16: Form xác nhận lưu thật, sửa nội dung theo 2 bản rà soát, GTM bản v6 có ChatGPT Ads

Nhánh `claude/xac-nhan-lead-va-noi-dung-2026-10-16`. Nam giao toàn quyền trong phiên này (tự kiểm thử, tự xuất bản).

- `assets/site.js`: bỏ `mode: 'no-cors'`, đọc trả lời JSON của Apps Script. Chỉ khi `ok: true` mới đẩy `generate_lead` và sang trang cảm ơn. `ok: false` kèm `errors` thì báo lỗi đúng ô; `ok: false` không kèm `errors`, mất mạng, trả lời không phải JSON hoặc quá 25 giây thì không đẩy `generate_lead`, giữ nguyên dữ liệu, nút đổi thành "Gửi lại", mời nhắn Zalo. Phần bổ sung ở trang cảm ơn cũng chỉ báo `lead_details_submit` khi lưu được. `GA4_ID` đổi thành `G-3RYL845LXP` (chỉ dùng khi tự tải thẻ). Lý do: trước đây Apps Script lỗi thì GA4, Meta vẫn đếm lead.
- Đã thử thật từ hanamagency.github.io: Apps Script 2.3 trả JSON đọc được (CORS), khoảng 1,7 giây. Không cần đổi Apps Script để form chạy đúng.
- Checklist (`qua-tang.html`): sửa 3 mục (xác minh tên miền không ngăn người khác dùng link; mốc khoảng 50 sự kiện tối ưu trong 7 ngày, không phải lúc nào cũng là đơn; "Hạn chế sửa liên tục khi chưa đủ dữ liệu" là kinh nghiệm, không phải quy định). Tiêu đề trang có cả Shopee.
- Bài tăng ngân sách Facebook: viết theo sự kiện tối ưu, "có thể được tính là sửa lớn", thêm trường hợp chốt qua tin nhắn, điện thoại, điều kiện nên tăng, nguồn tham khảo của Meta, dòng cập nhật.
- Bài ngân sách Shopee ngày sale: liệt kê đủ các khoản cần trừ khi tính ROAS hòa vốn (giá vốn, phí sàn, phí thanh toán, voucher, vận chuyển shop chịu, hoàn hàng, hoa hồng affiliate), khung giờ theo lịch sử từng shop.
- Ô tính phí Facebook, Shopee: ghi quy tắc gói, ví dụ sát ngưỡng (30 triệu phí 3 triệu, 31 triệu phí 3,72 triệu; Shopee 20 triệu phí 2 triệu, 21 triệu phí 2,52 triệu), phí chưa gồm thuế, thanh toán trước khi bắt đầu, thanh kéo theo bước 1 triệu. Không đổi giá.
- Trang Facebook: thêm câu Fanpage và tài khoản doanh nghiệp vẫn đứng tên khách, gỡ quyền được bất cứ lúc nào.
- Địa chỉ đăng ký ghi theo đơn vị hành chính mới ở chân trang, trang chủ, schema.org; trang chính sách ghi thêm cách ghi trên giấy chứng nhận. Bỏ `taxID` khỏi schema.org. Bỏ số mã số thuế khỏi mục 2026-09-24 bên dưới.
- `robots.txt`: bỏ dòng chặn `/cam-on.html` để Google đọc được `noindex` trong trang.
- Chính sách: nêu Google Ads, mã đo lường ChatGPT Ads (OpenAI), cách tắt quảng cáo cá nhân hóa của Google, Meta.
- `site.css`, `site.js` lên `?v=7`.
- GTM (ngoài repo): file `GTM-HANAM-do-luong-v6.json` nhập vào không gian làm việc mới "Đo lường v6 - tên theo nền tảng + ChatGPT" (Ghi đè). Xem `TRACKING_PLAN.md`.
- Kiểm thử: 7 ca form với Apps Script giả (lưu được, sai ô, lỗi lưu, mất mạng, trả lời lạ, trả lời chậm 4 giây, quá 27 giây) đều đạt, không lỗi JavaScript; 4 khu vực sửa không tràn ngang ở 360 và 1280px. Không dựng được Jekyll trên máy chủ của Claude (bị chặn tải gói), các file Jekyll chỉ đổi chữ, không thêm mã Liquid.

## 2026-10-13: Xuất bản PR số 3

- Nam trả lời "duyệt". PR số 3 (lượt 1 đến lượt 4 bên dưới) được gộp vào `main`, GitHub Pages dựng lại web.
- Chế độ repo: Nam quyết định giữ công khai cả `hanamagency.github.io` và `quang-cao-co-lai`, chấp nhận người khác có thể fork. Lý do: ở gói GitHub Free, repo riêng tư thì GitHub Pages ngừng xuất bản web.

## 2026-10-13 (lượt 4): Họ tên Lê Nam, đầu trang Checklist đủ mục, chốt các câu hỏi còn mở

Cùng nhánh và PR số 3. Trạng thái: đã xuất bản cùng PR số 3.

- Họ tên: tiêu đề mục người sáng lập (trang Facebook, Shopee) thành "Lê Nam, người sáng lập HÀ NAM AGENCY"; tên tác giả bài viết, mô tả ảnh, schema.org (`founder`, `author`) và nguồn tin dùng "Lê Nam". Câu văn bên trong vẫn gọi ngắn là "Nam".
- Đầu trang Checklist (`qua-tang.html`): trước chỉ có nút "Dịch vụ", nay thêm "Kiến thức", "Cách làm việc", "Hỏi đáp" như trang chủ. Lý do: Nam thấy thanh trên cùng bị thu gọn, khó thao tác. Sửa luôn khoảng trống thừa trong nút "Đăng ký kiểm tra".
- Nam xác nhận: giữ câu "5 suất mỗi tuần"; tạm coi 3 bài viết là ổn, sẽ sửa sau nếu cần.
- Thêm số điện thoại 0356 256 128 (giữ cả số 0986 219 360): khối liên hệ trang chủ, khối liên hệ cạnh form trang Facebook và Shopee, chân trang (trang chủ, Facebook, Shopee, mục Kiến thức), chính sách, schema.org (`contactPoint`). Nút Zalo, mã QR và khung liên hệ vẫn dùng số 0986. Apps Script 2.4 thêm số mới vào chữ ký email. Kế hoạch chuyển số chính ở `HA_NAM_AGENCY_CONTEXT.md`.
- 8 việc ngoài web (duyệt, Apps Script, GTM, Search Console, kế toán, trang TikTok và Google, khuôn dùng chung, Google Business và tên miền) chưa làm. Hướng dẫn ở `docs/HUONG_DAN_VIEC_CAN_LAM.md`.
- Kiểm thử: dựng Jekyll 3.10 không lỗi; đầu trang Checklist không tràn ở 900, 1024, 1280, 1730px; 7 trang không tràn ở 320 đến 768px; menu và nút nổi chạy đúng.

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
- Câu "5 suất mỗi tuần": lượt 4 Nam xác nhận giữ.

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

- Làm web cho HỘ KINH DOANH HÀ NAM để Meta xác minh doanh nghiệp, có mã số thuế (không ghi số ở đây vì repo công khai). Nội dung hiện đủ khi không chạy JavaScript để bot của Meta đọc được.
