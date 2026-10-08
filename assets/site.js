/* HÀ NAM AGENCY, mã chạy chung cho mọi trang
   Sửa phần CẤU HÌNH bên dưới, phần còn lại không cần đụng. */
(function () {
  'use strict';

  // ===== CẤU HÌNH =====
  var CONFIG = {
    // Dán URL web app Apps Script (kết thúc bằng /exec). Để trống = chế độ xem thử, form không gửi đi đâu.
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbz7BI9N59VKI98j3Dpnk7LWaQLkyEPmgwrRzpMzzzOBCSdMoileak4UwC_SoKhTAbWvUA/exec',
    // Mã Meta Pixel và GA4. Để trống thì không tải.
    META_PIXEL_ID: '939933335396008',
    GA4_ID: 'G-BTZNP2S6D1',
    ZALO_URL: 'https://zalo.me/0986219360',
    THANK_YOU_PAGE: 'cam-on.html',
    // Đổi số phiên bản mỗi khi sửa câu chữ ô đồng ý, để nhật ký đồng ý khớp văn bản
    CONSENT_VERSION: 'v2-2026-10'
  };

  // ===== Tiện ích lưu tạm trong trình duyệt (có thể bị chặn, nên luôn bọc try) =====
  function sGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function sSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  function lGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  // ===== Đo lường: chỉ tải khi đã điền mã =====
  function loadTracking() {
    if (CONFIG.META_PIXEL_ID && !window.fbq) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = true; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
    if (CONFIG.GA4_ID && !window.gtag) {
      var g = document.createElement('script');
      g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.GA4_ID);
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.GA4_ID);
    }
  }

  // ===== Ghi nhớ nguồn quảng cáo (UTM, fbclid) trong phiên =====
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid'];
  function captureUtm() {
    var q;
    try { q = new URLSearchParams(window.location.search); } catch (e) { return; }
    var found = {};
    UTM_KEYS.forEach(function (k) { var v = q.get(k); if (v) found[k] = v.slice(0, 200); });
    if (Object.keys(found).length) sSet('hn_utm', JSON.stringify(found));
  }
  function readUtm() {
    try { return JSON.parse(sGet('hn_utm') || '{}'); } catch (e) { return {}; }
  }

  // ===== Kiểm tra dữ liệu =====
  function normalizePhone(raw) {
    var p = String(raw || '').replace(/[\s.\-()]/g, '');
    if (p.indexOf('+84') === 0) p = '0' + p.slice(3);
    else if (p.indexOf('84') === 0 && p.length === 11) p = '0' + p.slice(2);
    return p;
  }
  function isPhone(p) { return /^0[35789]\d{8}$/.test(p); }
  function isEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
  function makeEventId() {
    return 'hn-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function setError(form, name, msg) {
    var field = form.querySelector('[data-field="' + name + '"]');
    if (!field) return;
    var box = field.querySelector('.error');
    if (msg) { field.setAttribute('data-invalid', ''); if (box) box.textContent = msg; }
    else { field.removeAttribute('data-invalid'); if (box) box.textContent = ''; }
  }

  function validate(form, data) {
    var errors = {};
    if (!data.name || data.name.length < 2) errors.name = 'Bạn cho HÀ\u00A0NAM\u00A0AGENCY biết tên để tiện xưng hô nhé.';
    if (!isPhone(data.zalo)) errors.zalo = 'Số Zalo chưa đúng. Ví dụ: 0912 345 678.';
    if (data.email && !isEmail(data.email)) errors.email = 'Email chưa đúng định dạng. Bỏ trống nếu không cần.';
    if (data.page && data.page.indexOf('.') === -1) errors.page = 'Dán đường dẫn đầy đủ, ví dụ facebook.com/tenshopcuaban. Bỏ trống nếu chưa có.';
    if (!data.consent_contact) errors.consent_contact = 'Cần tick ô này để HÀ\u00A0NAM\u00A0AGENCY được liên hệ lại với bạn.';
    ['name', 'zalo', 'email', 'page', 'consent_contact'].forEach(function (k) { setError(form, k, errors[k] || ''); });
    return errors;
  }

  function collect(form) {
    var fd = new FormData(form);
    function v(k) { var x = fd.get(k); return x == null ? '' : String(x).trim(); }
    return {
      name: v('name').slice(0, 80),
      zalo: normalizePhone(v('zalo')),
      email: v('email').slice(0, 120),
      page: v('page').slice(0, 300),
      budget: v('budget'),
      need: v('need'),
      platform: v('platform'),
      heard_from: v('heard_from'),
      consent_contact: fd.get('consent_contact') ? 'yes' : '',
      consent_marketing: fd.get('consent_marketing') ? 'yes' : '',
      website: v('website') // ô bẫy, người thật không thấy
    };
  }

  function track(source, eventId) {
    try { if (window.fbq) window.fbq('track', 'Lead', { content_name: source }, { eventID: eventId }); } catch (e) {}
    try { if (window.gtag) window.gtag('event', 'generate_lead', { form_source: source }); } catch (e) {}
  }

  function goThanks(data) {
    sSet('hn_lead_name', data.name.split(' ').slice(-1)[0] || '');
    sSet('hn_lead_email', data.email ? '1' : '');
    sSet('hn_lead_need', data.need || '');
    window.location.href = CONFIG.THANK_YOU_PAGE;
  }

  function initForm(form) {
    var started = Date.now();
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var source = form.getAttribute('data-lead-form') || 'web';

    function showStatus(kind, msg) {
      if (!status) return;
      status.hidden = !msg;
      status.setAttribute('data-kind', kind);
      status.textContent = msg || '';
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = collect(form);
      var errors = validate(form, data);
      var keys = Object.keys(errors);
      if (keys.length) {
        showStatus('error', 'Còn ' + keys.length + ' mục cần sửa trước khi gửi.');
        var first = form.querySelector('[data-field="' + keys[0] + '"] input, [data-field="' + keys[0] + '"] select');
        if (first) first.focus();
        return;
      }
      if (data.website) { goThanks(data); return; } // bot điền ô bẫy: giả vờ thành công

      var eventId = makeEventId();
      var utm = readUtm();
      var payload = new URLSearchParams();
      Object.keys(data).forEach(function (k) { payload.append(k, data[k]); });
      Object.keys(utm).forEach(function (k) { payload.append(k, utm[k]); });
      payload.append('source', source);
      payload.append('page_url', window.location.pathname);
      payload.append('event_id', eventId);
      payload.append('consent_version', CONFIG.CONSENT_VERSION);
      payload.append('elapsed_ms', String(Date.now() - started));

      button.disabled = true;
      var oldLabel = button.textContent;
      button.textContent = 'Đang gửi…';
      showStatus('info', '');

      if (!CONFIG.ENDPOINT) {
        // Chế độ xem thử: không gửi dữ liệu đi đâu, chỉ chuyển sang trang cảm ơn
        track(source, eventId);
        setTimeout(function () { goThanks(data); }, 400);
        return;
      }

      fetch(CONFIG.ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload })
        .then(function () { track(source, eventId); goThanks(data); })
        .catch(function () {
          button.disabled = false;
          button.textContent = oldLabel;
          showStatus('error', 'Chưa gửi được do lỗi mạng. Bạn thử lại, hoặc nhắn Zalo 0986 219 360 để HÀ\u00A0NAM\u00A0AGENCY hỗ trợ ngay.');
        });
    });

    // Xóa báo lỗi khi người dùng sửa
    form.addEventListener('input', function (ev) {
      var field = ev.target.closest('[data-field]');
      if (field && field.hasAttribute('data-invalid')) setError(form, field.getAttribute('data-field'), '');
    });
  }

  // ===== Máy tính phí dịch vụ (trang Facebook Ads) =====
  function vnd(n) { return Math.round(n).toLocaleString('vi-VN') + 'đ'; }
  function feeFor(budget) {
    // Giữ khớp với bảng giá trên trang facebook-ads.html. Phí luôn từ 10% ngân sách trở lên
    // và không giảm khi ngân sách tăng.
    if (budget <= 30000000) return { plan: 'Khởi đầu', fee: 3000000 };
    if (budget <= 100000000) return { plan: 'Tăng trưởng', fee: budget * 0.12 };
    return { plan: 'Mở rộng', fee: Math.max(12000000, budget * 0.10) };
  }
  function pct(x) {
    var r = Math.round(x * 10) / 10;
    return (r % 1 === 0 ? String(r) : r.toFixed(1).replace('.', ',')) + '%';
  }
  function initCalc(root) {
    var input = root.querySelector('input[type="range"]');
    var out = {
      budget: root.querySelector('[data-out="budget"]'),
      plan: root.querySelector('[data-out="plan"]'),
      fee: root.querySelector('[data-out="fee"]'),
      share: root.querySelector('[data-out="share"]'),
      total: root.querySelector('[data-out="total"]'),
      daily: root.querySelector('[data-out="daily"]')
    };
    function render() {
      var b = Number(input.value) * 1000000;
      var r = feeFor(b);
      out.budget.textContent = vnd(b) + '/tháng';
      out.daily.textContent = 'khoảng ' + vnd(b / 30) + ' mỗi ngày';
      out.plan.textContent = r.plan;
      out.fee.textContent = vnd(r.fee);
      out.share.textContent = pct(r.fee / b * 100);
      out.total.textContent = vnd(b + r.fee);
      input.setAttribute('aria-valuetext', vnd(b));
    }
    input.addEventListener('input', render);
    render();
  }

  // ===== Nút dẫn tới form, chọn sẵn nhu cầu (data-need) =====
  function initNeedLinks() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('[data-need]');
      if (!a) return;
      var need = a.getAttribute('data-need');
      Array.prototype.forEach.call(document.querySelectorAll('form[data-lead-form] input[name="need"]'), function (r) {
        if (r.value === need) r.checked = true;
      });
    });
  }

  // ===== Tự kiểm tra đo lường 5 câu (trang Facebook Ads) =====
  function initQuiz(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-q]'));
    var scoreEl = root.querySelector('[data-quiz-score]');
    var meter = root.querySelector('[data-quiz-meter]');
    var text = root.querySelector('[data-quiz-text]');
    var unsureEl = root.querySelector('[data-quiz-unsure]');
    function render() {
      var answered = 0, yes = 0, unsure = 0;
      items.forEach(function (q) {
        var c = q.querySelector('input:checked');
        q.setAttribute('data-answer', c ? c.value : '');
        if (!c) return;
        answered++;
        if (c.value === 'yes') yes++;
        if (c.value === 'unsure') unsure++;
      });
      var total = items.length, missing = total - yes;
      scoreEl.textContent = yes;
      meter.style.width = Math.round(yes / total * 100) + '%';
      if (answered < total) {
        text.textContent = 'Đã trả lời ' + answered + '/' + total + ' câu. Trả lời đủ để xem kết quả.';
      } else if (yes === total) {
        text.textContent = 'Phần đo đã đủ. Bước tiếp theo là đọc số liệu đúng cách để tăng ngân sách mà vẫn giữ được lãi.';
      } else if (yes >= 3) {
        text.textContent = 'Còn thiếu ' + missing + ' mục. Facebook đang tìm khách với thông tin chưa đủ, nên bổ sung trước khi tăng ngân sách.';
      } else {
        text.textContent = 'Còn thiếu ' + missing + ' mục. Facebook chưa biết ai là người mua, nên tiền quảng cáo dễ chạy theo lượt bấm hơn là theo đơn hàng.';
      }
      unsureEl.hidden = !unsure;
      unsureEl.textContent = unsure ? 'Có ' + unsure + ' câu bạn chưa rõ. Buổi kiểm tra 20 phút sẽ trả lời giúp bạn.' : '';
    }
    root.addEventListener('change', render);
    render();
  }

  // ===== Checklist 30 điểm (trang quà tặng) =====
  function initChecklist(root) {
    var boxes = Array.prototype.slice.call(root.querySelectorAll('input[type="checkbox"]'));
    var bar = document.querySelector('[data-progress-bar]');
    var label = document.querySelector('[data-progress-label]');
    var verdict = document.querySelector('[data-progress-verdict]');
    var saved = {};
    try { saved = JSON.parse(lGet('hn_checklist') || '{}'); } catch (e) { saved = {}; }
    boxes.forEach(function (b) { if (saved[b.id]) b.checked = true; });
    function render() {
      var done = boxes.filter(function (b) { return b.checked; }).length;
      var pct = boxes.length ? Math.round(done / boxes.length * 100) : 0;
      if (bar) bar.style.width = pct + '%';
      if (label) label.textContent = done + '/' + boxes.length + ' mục đã sẵn sàng';
      if (verdict) {
        verdict.textContent = done >= 26 ? 'Tài khoản khá sẵn sàng' :
          done >= 18 ? 'Còn vài lỗ hổng cần vá' : 'Nên sửa trước khi tăng ngân sách';
      }
      var state = {};
      boxes.forEach(function (b) { if (b.checked) state[b.id] = 1; });
      lSet('hn_checklist', JSON.stringify(state));
    }
    root.addEventListener('change', render);
    render();
  }

  // ===== Trang cảm ơn =====
  function initThanks(root) {
    var name = sGet('hn_lead_name');
    var hello = root.querySelector('[data-hello]');
    if (hello && name) hello.textContent = 'Cảm ơn ' + name + ', HÀ\u00A0NAM\u00A0AGENCY đã nhận thông tin của bạn';
    var mail = root.querySelector('[data-email-note]');
    if (mail) mail.hidden = sGet('hn_lead_email') !== '1';
    var audit = root.querySelector('[data-audit-note]');
    var need = sGet('hn_lead_need');
    if (audit) audit.hidden = need !== 'kiem-tra-tai-khoan' && need !== 'tang-ngan-sach';
  }

  // ===== Khởi động =====
  function start() {
    loadTracking();
    captureUtm();
    Array.prototype.forEach.call(document.querySelectorAll('form[data-lead-form]'), initForm);
    Array.prototype.forEach.call(document.querySelectorAll('[data-calc]'), initCalc);
    Array.prototype.forEach.call(document.querySelectorAll('[data-quiz]'), initQuiz);
    initNeedLinks();
    Array.prototype.forEach.call(document.querySelectorAll('[data-checklist]'), initChecklist);
    Array.prototype.forEach.call(document.querySelectorAll('[data-thanks]'), initThanks);
    Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) { el.textContent = new Date().getFullYear(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  // Cho phép kiểm thử bằng Node
  if (typeof module !== 'undefined') module.exports = { normalizePhone: normalizePhone, isPhone: isPhone, feeFor: feeFor, pct: pct };
})();
