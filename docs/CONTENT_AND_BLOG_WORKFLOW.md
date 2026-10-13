# Quy trình nội dung và mục Kiến thức

Cập nhật: 13/10/2026.

## Vì sao chọn cách này

Đã so sánh 3 cách trước khi làm:

| Cách | Chi phí | Độ khó khi đăng bài | Ghi chú |
|---|---|---|---|
| HTML tĩnh, mỗi bài một file viết tay | 0đ | Cao: mỗi bài phải chép đầu trang, chân trang, sửa sơ đồ trang bằng tay | Dễ sai, khó duy trì khi có nhiều bài |
| Markdown và Jekyll có sẵn của GitHub Pages | 0đ | Thấp: mỗi bài là 1 file chữ trong `_posts/` | **Đang dùng.** Không cần máy chủ, không thêm dịch vụ |
| Trang quản trị nội dung (CMS) như Decap CMS | Thường 0đ, nhưng phải dựng thêm dịch vụ đăng nhập với GitHub | Thấp khi dựng xong, nhưng dựng và bảo trì phức tạp | Chỉ cân nhắc khi có người khác cùng đăng bài |

Forum (người dùng tự đăng, bình luận) không làm: web tĩnh không chạy được, cần máy chủ, kiểm duyệt spam, bảo mật tài khoản người dùng, và có thể phải làm thủ tục với mạng xã hội theo quy định hiện hành. Nếu cần cộng đồng, dùng nhóm Facebook hoặc cộng đồng Zalo.

## Cấu trúc file

- `_posts/NĂM-THÁNG-NGÀY-ten-bai-khong-dau.md`: mỗi bài một file. Phần sau ngày là đường dẫn bài, ví dụ `_posts/2026-10-13-quyen-chi-xem-tai-khoan-quang-cao.md` thành `/kien-thuc/quyen-chi-xem-tai-khoan-quang-cao/`. Đã đăng thì không đổi tên file, vì đổi tên là đổi đường dẫn.
- `_layouts/bai-viet.html`: khuôn bài viết (đường dẫn, tác giả, thời gian đọc, khối Bước tiếp theo theo nền tảng, bài viết khác).
- `_layouts/trang.html`: khuôn chung (thẻ meta, Open Graph, schema.org BlogPosting và BreadcrumbList, GTM).
- `_includes/dau-trang.html`, `_includes/chan-trang.html`: đầu trang, chân trang. Menu Dịch vụ ở đây phải giống menu trong 5 trang .html.
- `kien-thuc/index.html`: trang danh sách. `kien-thuc/feed.xml`: nguồn tin Atom.
- `sitemap.xml`: tự thêm bài mới. Các trang .html cố định vẫn ghi tay ngày cập nhật.
- `index.html` (trang chủ): khối "Bài viết mới" tự lấy 3 bài mới nhất.

## Thêm một bài mới

1. Tạo file mới trong `_posts/`, tên theo mẫu ở trên.
2. Dán phần khai báo đầu bài rồi viết nội dung bằng Markdown bên dưới:

```yaml
---
title: Tiêu đề bài, nên dưới 65 ký tự
description: Mô tả 120 đến 160 ký tự, dùng cho Google, mạng xã hội và câu dẫn đầu bài
date: 2026-10-20 08:00:00 +0700
chu_de: Facebook Ads
nen_tang: facebook
tags: [từ khóa 1, từ khóa 2]
image: /assets/og-facebook-ads.jpg
image_alt: Mô tả ảnh chia sẻ
---
```

- `chu_de`: Facebook Ads, Shopee Ads, TikTok Ads, Google Ads, Đo lường, Bảo mật tài khoản, Kinh nghiệm chủ shop.
- `nen_tang`: `facebook`, `shopee` hoặc `chung`. Quyết định khối "Bước tiếp theo" cuối bài dẫn tới đâu.
- `image`: ảnh chia sẻ 1200x630. Chưa có ảnh riêng thì dùng ảnh của trang dịch vụ.
- Sửa nội dung bài đã đăng thì thêm `updated: 2026-11-01`.

3. Ảnh trong bài: đặt ở `assets/kien-thuc/`, rộng tối đa 1200px, dạng .jpg hoặc .webp, dưới 200KB, luôn có mô tả: `![Mô tả ảnh](/assets/kien-thuc/ten-anh.jpg)`. Chỉ dùng ảnh tự chụp, tự làm hoặc có quyền dùng.
4. Link nội bộ: mỗi bài dẫn tới ít nhất 1 trang dịch vụ hoặc Checklist và 1 bài liên quan, viết dạng `/facebook-ads.html`, `/kien-thuc/ten-bai/`.

## Soát trước khi đăng (bắt buộc)

- Lớp 1, từ cấm: cam kết, đảm bảo, bảo đảm, 100%, tốt nhất, số 1, hàng đầu, duy nhất, tuyệt đối, chắc chắn, ngay lập tức, cấp tốc... Danh sách đầy đủ trong `tu_cam.json` trên máy của Nam.
- Lớp 2, chính sách Meta: không nhắc đặc điểm cá nhân người đọc (tài chính, sức khỏe...), không hứa kết quả, không khan hiếm giả, không kêu gọi bấm thích, chia sẻ.
- Lớp 3, quy định quảng cáo theo ngành: bài nhắc tới mỹ phẩm, thực phẩm bảo vệ sức khỏe, thiết bị y tế thì kiểm theo Nghị định 342/2025. Không chắc thì ghi "Không chắc" và hỏi Nam.
- Số liệu: chỉ dùng số có nguồn (tài liệu chính thức của Meta, Shopee) hoặc ghi "Ví dụ minh họa". Không dùng số liệu khách khi chưa được khách cho phép. Case study chỉ đăng khi khách đồng ý bằng văn bản.
- Thông tin về giao diện nền tảng (tên nút, tên mục) thay đổi thường xuyên: ghi "tên có thể khác đôi chút tùy phiên bản".

## Xem trước và xuất bản

1. Làm trên nhánh riêng, không sửa thẳng `main`.
2. Dựng thử: `jekyll build --safe` (bản 3.10, cùng bản GitHub Pages), rồi chạy máy chủ thử trong thư mục `_site` (ví dụ `python -m http.server 8000`) và mở `http://localhost:8000/kien-thuc/`.
3. Kiểm: tiêu đề, mô tả, ảnh chia sẻ, bảng trên điện thoại 360px, link nội bộ không hỏng.
4. Gửi Nam ảnh chụp. Link raw.githack chỉ xem được các trang .html cố định, không xem được mục Kiến thức vì mục này cần Jekyll dựng.
5. Nam trả lời "duyệt" thì gộp vào `main`. GitHub Pages dựng lại sau 1 đến 2 phút. Kiểm tab Actions trên GitHub nếu web không cập nhật (lỗi dựng không làm sập web, chỉ giữ bản cũ).
6. Ghi vào `docs/CHANGELOG.md`.

## Chủ đề

Đã đăng (13/10/2026): tăng ngân sách Facebook; chia ngân sách Shopee ngày sale; quyền chỉ xem tài khoản quảng cáo.

Gợi ý tiếp theo (chưa duyệt):
- Pixel và gửi đơn thẳng cho Facebook (CAPI): chủ shop có cần không
- Đọc báo cáo quảng cáo Shopee: ROAS, tỷ lệ chuyển đổi, chi phí mỗi đơn
- Chọn mục tiêu chiến dịch Facebook: tin nhắn, đơn hàng hay lượt truy cập
- Viết nội dung quảng cáo mỹ phẩm, thực phẩm bảo vệ sức khỏe đúng quy định
- Đối soát tiền quảng cáo hằng tuần: cần những cột nào
