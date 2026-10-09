/* HÀ NAM AGENCY, mã chạy chung cho mọi trang
   Sửa phần CẤU HÌNH bên dưới, phần còn lại không cần đụng.

   Đo lường: web không tự tải GA4 và Meta Pixel. Web chỉ đẩy sự kiện vào dataLayer, Google Tag Manager
   (GTM-KGTWH2R4) nhận rồi gửi sang GA4 và Meta. Tên sự kiện và tham số theo chuẩn của Google và Meta:
     generate_lead   gửi form thành công (Meta: Lead). Tham số: form_id, lead_source, lead_need, lead_budget,
                     lead_platform, currency, event_id
     contact         bấm Zalo, chép số Zalo, Messenger, gọi điện (Meta: Contact). Tham số: method, click_location, link_url
     select_content  bấm chọn gói giá. Tham số: content_type, content_id
     contact_panel_open, self_check_complete, fee_calculator_use, checklist_progress, lead_details_submit:
                     sự kiện riêng của web, chỉ gửi GA4
   Thông tin trang (content_group, page_type) khai báo trong thẻ <head> của từng trang, trước mã GTM. */
(function () {
  'use strict';

  // ===== CẤU HÌNH =====
  var CONFIG = {
    // Dán URL web app Apps Script (kết thúc bằng /exec). Để trống = chế độ xem thử, form không gửi đi đâu.
    ENDPOINT: 'https://script.google.com/macros/s/AKfycbz7BI9N59VKI98j3Dpnk7LWaQLkyEPmgwrRzpMzzzOBCSdMoileak4UwC_SoKhTAbWvUA/exec',
    // false = GA4 và Pixel do Google Tag Manager tải. true = web tự tải như bản cũ (khi đó tạm dừng thẻ GA4, Pixel trong GTM).
    LOAD_TAGS_DIRECT: false,
    META_PIXEL_ID: '939933335396008',
    GA4_ID: 'G-BTZNP2S6D1',
    CURRENCY: 'VND',
    ZALO_PHONE: '0986219360',
    ZALO_DISPLAY: '0986 219 360',
    PHONE_TEL: '+84986219360',
    MESSENGER_URL: 'https://m.me/HaNamAgency',
    ZALO_QR: 'assets/zalo-qr.svg',
    THANK_YOU_PAGE: 'cam-on.html',
    // Số ngày nhớ nguồn khách trong trình duyệt
    ATTRIBUTION_DAYS: 90,
    // Đổi số phiên bản mỗi khi sửa câu chữ ô đồng ý, để nhật ký đồng ý khớp văn bản
    CONSENT_VERSION: 'v2-2026-10'
  };

  // ===== Tiện ích lưu tạm trong trình duyệt (có thể bị chặn, nên luôn bọc try) =====
  function sGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function sSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  function lGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function jGet(getter, k) { try { return JSON.parse(getter(k) || 'null'); } catch (e) { return null; } }
  function each(sel, fn, root) { Array.prototype.forEach.call((root || document).querySelectorAll(sel), fn); }

  // ===== dataLayer cho Google Tag Manager =====
  function dl(obj) {
    try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(obj); } catch (e) {}
  }

  // Chế độ cũ: web tự tải GA4 và Pixel (chỉ khi LOAD_TAGS_DIRECT = true)
  function loadTagsDirect() {
    if (!CONFIG.LOAD_TAGS_DIRECT) return;
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
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.GA4_ID);
    }
  }

  // ===== Nguồn khách: lần đầu và lần cuối (tên tham số chuẩn của Google, Meta, TikTok) =====
  var CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ttclid'];
  function nowIso() { return new Date().toISOString(); }
  function fresh(t) { return t && t.ts && (Date.now() - Date.parse(t.ts)) < CONFIG.ATTRIBUTION_DAYS * 864e5; }
  // Trang công cụ (thử GTM, Apps Script, đăng nhập Google...) không phải nguồn khách: bỏ qua
  var IGNORE_REFERRER = /(^|\.)(tagassistant\.google\.com|tagmanager\.google\.com|analytics\.google\.com|script\.google\.com|script\.googleusercontent\.com|accounts\.google\.com|business\.facebook\.com|adsmanager\.facebook\.com)$/i;
  function ignoredSource(s) { return IGNORE_REFERRER.test(String(s || '')); }
  // Gom tên miền web dẫn tới về tên nguồn dễ đọc (cách gom gần giống nhóm kênh mặc định của GA4)
  var REFERRER_RULES = [
    [/(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$/, 'facebook', 'social'],
    [/(^|\.)instagram\.com$/, 'instagram', 'social'],
    [/(^|\.)threads\.(net|com)$/, 'threads', 'social'],
    [/(^|\.)(zalo\.me|zaloapp\.com|zalo\.vn)$/, 'zalo', 'social'],
    [/(^|\.)tiktok\.com$/, 'tiktok', 'social'],
    [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube', 'social'],
    [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'linkedin', 'social'],
    [/^mail\.google\.com$/, 'gmail', 'email'],
    [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, 'chatgpt', 'referral'],
    [/^gemini\.google\.com$/, 'gemini', 'referral'],
    [/(^|\.)perplexity\.ai$/, 'perplexity', 'referral'],
    [/(^|\.)claude\.ai$/, 'claude', 'referral'],
    [/(^|\.)google\.[a-z.]+$/, 'google', 'organic'],
    [/(^|\.)bing\.com$/, 'bing', 'organic'],
    [/(^|\.)coccoc\.com$/, 'coccoc', 'organic']
  ];
  function referralTouch(host) {
    var h = String(host || '').toLowerCase().replace(/^www\./, '');
    for (var i = 0; i < REFERRER_RULES.length; i++) {
      if (REFERRER_RULES[i][0].test(h)) return { utm_source: REFERRER_RULES[i][1], utm_medium: REFERRER_RULES[i][2] };
    }
    return { utm_source: h, utm_medium: 'referral' };
  }
  function externalReferrer() {
    try {
      if (!document.referrer) return '';
      var u = new URL(document.referrer);
      if (!u.hostname || u.hostname === window.location.hostname || ignoredSource(u.hostname)) return '';
      return u.hostname;
    } catch (e) { return ''; }
  }
  function captureAttribution() {
    var q, params = {}, has = false;
    try { q = new URLSearchParams(window.location.search); } catch (e) { q = null; }
    if (q) CAMPAIGN_KEYS.forEach(function (k) { var v = q.get(k); if (v) { params[k] = v.slice(0, 300); has = true; } });
    var ref = externalReferrer();
    var path = window.location.pathname;
    var touch = null;
    if (has) {
      touch = params;
    } else if (ref) {
      touch = referralTouch(ref);
    }
    if (touch) { touch.landing = path; touch.ref = ref; touch.ts = nowIso(); }

    var first = jGet(lGet, 'hn_ft');
    if (first && (ignoredSource(first.utm_source) || ignoredSource(first.ref))) first = null; // dọn nguồn công cụ đã lưu từ trước
    if (!fresh(first)) {
      first = touch || { utm_source: '(direct)', utm_medium: '(none)', landing: path, ref: '', ts: nowIso() };
      lSet('hn_ft', JSON.stringify(first));
    }
    if (touch) lSet('hn_lt', JSON.stringify(touch));
    if (!sGet('hn_landing')) { sSet('hn_landing', path); sSet('hn_ref', ref); }
  }
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function parseGaClientId(v) {
    var m = String(v || '').match(/^GA\d\.\d+\.(\d+\.\d+)$/);
    return m ? m[1] : '';
  }
  function detectInApp(ua) {
    ua = ua || navigator.userAgent || '';
    if (/Instagram/i.test(ua)) return 'instagram';
    if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A|Messenger/i.test(ua)) return 'facebook';
    if (/Zalo/i.test(ua)) return 'zalo';
    if (/musical_ly|TikTok|BytedanceWebview|trill/i.test(ua)) return 'tiktok';
    return '';
  }
  function detectDevice(ua) {
    ua = ua || navigator.userAgent || '';
    if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
    if (/Mobi|iPhone|Android/i.test(ua)) return 'mobile';
    return 'desktop';
  }
  function isTouchPhone() { return detectDevice() !== 'desktop' || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 900); }
  function attributionFields() {
    var out = {};
    var last = jGet(lGet, 'hn_lt');
    if (fresh(last) && !ignoredSource(last.utm_source)) CAMPAIGN_KEYS.forEach(function (k) { if (last[k]) out[k] = last[k]; });
    var first = jGet(lGet, 'hn_ft');
    if (first) {
      out.first_source = first.utm_source || (first.fbclid ? 'facebook' : first.gclid ? 'google' : first.ttclid ? 'tiktok' : '');
      out.first_medium = first.utm_medium || '';
      out.first_campaign = first.utm_campaign || '';
      out.first_landing_page = first.landing || '';
      out.first_seen = first.ts || '';
    }
    out.landing_page = sGet('hn_landing') || window.location.pathname;
    out.referrer = sGet('hn_ref') || '';
    out.device = detectDevice();
    out.in_app = detectInApp();
    out.fbp = getCookie('_fbp');
    var fbc = getCookie('_fbc');
    if (!fbc && out.fbclid) fbc = 'fb.1.' + Date.parse((last && last.ts) || nowIso()) + '.' + out.fbclid;
    out.fbc = fbc;
    out.ga_client_id = parseGaClientId(getCookie('_ga'));
    return out;
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

  function validate(form, data, partial) {
    var errors = {};
    if (!partial) {
      if (!data.name || data.name.length < 2) errors.name = 'Bạn cho HÀ NAM AGENCY biết tên để tiện xưng hô nhé.';
      if (!isPhone(data.zalo)) errors.zalo = 'Số Zalo chưa đúng. Ví dụ: 0986 219 360.';
      if (!data.consent_contact) errors.consent_contact = 'Cần tick ô này để HÀ NAM AGENCY được liên hệ lại với bạn.';
    }
    if (data.email && !isEmail(data.email)) errors.email = 'Email chưa đúng định dạng. Bỏ trống nếu không cần.';
    if (data.page && data.page.indexOf('.') === -1) errors.page = 'Dán đường dẫn đầy đủ, ví dụ facebook.com/HaNamAgency. Bỏ trống nếu chưa có.';
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
      lead_source: v('lead_source'),
      consent_contact: fd.get('consent_contact') ? 'yes' : '',
      consent_marketing: fd.get('consent_marketing') ? 'yes' : '',
      website: v('website') // ô bẫy, người thật không thấy
    };
  }

  // Báo gửi form thành công. Đẩy generate_lead vào dataLayer; done() chạy khi GTM bắn xong thẻ
  // hoặc sau tối đa 1,5 giây (phòng GTM bị chặn), rồi mới chuyển trang.
  function trackLead(formId, eventId, data, done) {
    var called = false;
    function finish() { if (!called) { called = true; if (done) done(); } }
    setTimeout(finish, 1500);
    if (CONFIG.LOAD_TAGS_DIRECT) {
      try { if (window.fbq) window.fbq('track', 'Lead', { content_name: formId, content_category: data.need || '', currency: CONFIG.CURRENCY }, { eventID: eventId }); } catch (e) {}
      try { if (window.gtag) window.gtag('event', 'generate_lead', { form_id: formId, lead_source: data.lead_source || '', currency: CONFIG.CURRENCY }); } catch (e) {}
    }
    dl({
      event: 'generate_lead',
      form_id: formId,
      lead_source: data.lead_source || '',
      lead_need: data.need || '',
      lead_budget: data.budget || '',
      lead_platform: data.platform || '',
      currency: CONFIG.CURRENCY,
      event_id: eventId,
      eventCallback: finish,
      eventTimeout: 1500
    });
  }

  function goThanks(data, formId, eventId, isShort) {
    sSet('hn_lead_name', data.name.split(' ').slice(-1)[0] || '');
    sSet('hn_lead_email', data.email ? '1' : '');
    sSet('hn_lead_need', data.need || '');
    sSet('hn_event_id', eventId || '');
    sSet('hn_form_id', formId || '');
    sSet('hn_lead_short', isShort ? '1' : '');
    sSet('hn_lead_platform', data.platform || '');
    window.location.href = CONFIG.THANK_YOU_PAGE;
  }

  function post(payload) {
    if (!CONFIG.ENDPOINT) return Promise.resolve(); // chế độ xem thử
    return fetch(CONFIG.ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload });
  }

  function initForm(form) {
    var started = Date.now();
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var formId = form.getAttribute('data-lead-form') || 'web';
    var isShort = form.hasAttribute('data-short');

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
      var eventId = makeEventId();
      if (data.website) { goThanks(data, formId, eventId, isShort); return; } // bot điền ô bẫy: giả vờ thành công

      var payload = new URLSearchParams();
      Object.keys(data).forEach(function (k) { payload.append(k, data[k]); });
      var attr = attributionFields();
      Object.keys(attr).forEach(function (k) { if (attr[k]) payload.append(k, attr[k]); });
      payload.append('form_id', formId);
      payload.append('page_url', window.location.pathname);
      payload.append('event_id', eventId);
      payload.append('consent_version', CONFIG.CONSENT_VERSION);
      payload.append('elapsed_ms', String(Date.now() - started));

      button.disabled = true;
      var oldLabel = button.textContent;
      button.textContent = 'Đang gửi…';
      showStatus('info', '');

      post(payload)
        .then(function () { trackLead(formId, eventId, data, function () { goThanks(data, formId, eventId, isShort); }); })
        .catch(function () {
          button.disabled = false;
          button.textContent = oldLabel;
          showStatus('error', 'Chưa gửi được do lỗi mạng. Bạn thử lại, hoặc nhắn Zalo ' + CONFIG.ZALO_DISPLAY + ' để HÀ NAM AGENCY hỗ trợ ngay.');
        });
    });

    // Xóa báo lỗi khi người dùng sửa
    form.addEventListener('input', function (ev) {
      var field = ev.target.closest('[data-field]');
      if (field && field.hasAttribute('data-invalid')) setError(form, field.getAttribute('data-field'), '');
    });
  }

  // ===== Bước 2 ở trang cảm ơn: khách đăng ký nhanh bổ sung thông tin (không bắt buộc) =====
  function initDetails(form) {
    var box = form.closest('[data-details-box]') || form;
    var eventId = sGet('hn_event_id');
    if (sGet('hn_lead_short') !== '1' || !eventId) return; // chỉ hiện sau form nhanh
    box.hidden = false;
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var data = collect(form);
      var errors = validate(form, data, true);
      if (Object.keys(errors).length) return;
      if (!data.budget && !data.need && !data.page && !data.email && !data.lead_source) {
        if (status) { status.hidden = false; status.setAttribute('data-kind', 'error'); status.textContent = 'Bạn chọn hoặc điền ít nhất một mục nhé.'; }
        return;
      }
      var payload = new URLSearchParams();
      payload.append('action', 'update');
      payload.append('event_id', eventId);
      ['budget', 'need', 'page', 'email', 'lead_source'].forEach(function (k) { if (data[k]) payload.append(k, data[k]); });
      button.disabled = true;
      button.textContent = 'Đang gửi…';
      post(payload).then(function () {
        dl({ event: 'lead_details_submit', form_id: sGet('hn_form_id') || '', lead_need: data.need || '', lead_budget: data.budget || '', lead_source: data.lead_source || '' });
        sSet('hn_lead_short', '');
        if (data.email) { sSet('hn_lead_email', '1'); var mail = document.querySelector('[data-email-note]'); if (mail) mail.hidden = false; }
        form.innerHTML = '<p class="form-done">Đã nhận thêm thông tin. Cảm ơn bạn, buổi trao đổi sẽ nhanh hơn.</p>';
      }).catch(function () {
        button.disabled = false;
        button.textContent = 'Gửi thêm thông tin';
        if (status) { status.hidden = false; status.setAttribute('data-kind', 'error'); status.textContent = 'Chưa gửi được do lỗi mạng, bạn thử lại nhé.'; }
      });
    });
  }

  // ===== Khung liên hệ Zalo: mã QR trên máy tính; mở Zalo, chép số, Messenger, gọi trên điện thoại =====
  var sheet, sheetOpener, sheetLoc = '';
  var ICON = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 10h8"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h8"/></svg>',
    call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3C7 3 3 6.6 3 11c0 2.4 1.2 4.6 3.2 6V21l3.2-1.8c.8.2 1.7.3 2.6.3 5 0 9-3.6 9-8s-4-8.5-9-8.5z"/><path d="M7.5 13l3-3 2.5 2 3.5-3"/></svg>'
  };
  function buildSheet() {
    var phone = isTouchPhone();
    var inApp = detectInApp();
    var zaloUrl = 'https://zalo.me/' + CONFIG.ZALO_PHONE;
    var order = !phone ? ['zalo', 'copy', 'messenger'] :
      (inApp === 'facebook' || inApp === 'instagram') ? ['messenger', 'copy', 'zalo', 'phone'] : ['zalo', 'copy', 'phone', 'messenger'];
    // Nút đầu tiên tô đậm, các nút sau nhạt để không có hai nút xanh giống nhau đứng cạnh
    var zaloCls = order[0] === 'zalo' ? 'btn btn-zalo solid' : 'btn btn-zalo';
    var msgCls = order[0] === 'messenger' ? 'btn btn-fb' : 'btn btn-ghost';
    var acts = {
      zalo: '<a class="' + zaloCls + '" data-contact="zalo" href="' + zaloUrl + '"' + (phone ? '' : ' target="_blank" rel="noopener"') + '>' + ICON.chat + (phone ? 'Mở Zalo nhắn tin' : 'Mở Zalo trên máy tính') + '</a>',
      copy: '<button class="btn btn-ghost" type="button" data-contact="zalo_copy">' + ICON.copy + 'Chép số Zalo ' + CONFIG.ZALO_DISPLAY + '</button>',
      messenger: '<a class="' + msgCls + '" data-contact="messenger" href="' + CONFIG.MESSENGER_URL + '"' + (phone ? '' : ' target="_blank" rel="noopener"') + '>' + ICON.msg + 'Nhắn qua Messenger</a>',
      phone: '<a class="btn btn-call" data-contact="phone" href="tel:' + CONFIG.PHONE_TEL + '">' + ICON.call + 'Gọi ' + CONFIG.ZALO_DISPLAY + '</a>'
    };
    var el = document.createElement('div');
    el.className = 'contact-sheet';
    el.hidden = true;
    el.innerHTML =
      '<div class="cs-backdrop" data-cs-close></div>' +
      '<div class="cs-panel" role="dialog" aria-modal="true" aria-labelledby="cs-title">' +
        '<div class="cs-head"><h2 id="cs-title">Nhắn tin cho HÀ NAM AGENCY</h2>' +
        '<button class="cs-x" type="button" data-cs-close aria-label="Đóng">×</button></div>' +
        (phone ? '' : '<div class="cs-qr"><img src="' + CONFIG.ZALO_QR + '" width="176" height="176" alt="Mã QR Zalo ' + CONFIG.ZALO_DISPLAY + '"><p>Mở Zalo trên điện thoại, bấm biểu tượng quét mã rồi quét mã này để nhắn ngay.</p></div>') +
        '<div class="cs-actions">' + order.map(function (k) { return acts[k]; }).join('') + '</div>' +
        (phone ? '<p class="cs-note">Nếu Zalo chỉ hiện mã QR, bạn bấm <b>Chép số Zalo</b>, mở Zalo rồi dán số vào ô tìm kiếm.</p>' : '') +
        '<p class="cs-toast" role="status" hidden></p>' +
      '</div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-cs-close]')) { closeSheet(); return; }
      var b = ev.target.closest('[data-contact]');
      if (!b) return;
      var method = b.getAttribute('data-contact');
      dl({ event: 'contact', method: method, click_location: sheetLoc, link_url: b.getAttribute('href') || '' });
      if (method === 'zalo_copy') { ev.preventDefault(); copyNumber(el.querySelector('.cs-toast')); }
    });
    el.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeSheet(); });
    return el;
  }
  function copyNumber(toast) {
    var text = CONFIG.ZALO_PHONE;
    function done(ok) {
      if (!toast) return;
      toast.hidden = false;
      toast.textContent = ok ? 'Đã chép số ' + CONFIG.ZALO_DISPLAY + '. Mở Zalo, dán vào ô tìm kiếm để nhắn.' : 'Số Zalo: ' + CONFIG.ZALO_DISPLAY;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallback()); }); return; }
    } catch (e) {}
    done(fallback());
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
  }
  function locationOf(el) {
    if (el.closest('.mobile-bar')) return 'mobile_bar';
    if (el.closest('.site-header')) return 'header';
    if (el.closest('.site-footer')) return 'footer';
    if (el.closest('.hero')) return 'hero';
    var sec = el.closest('section[id]');
    return sec ? sec.id : 'page';
  }
  function openSheet(opener) {
    sheet = sheet || buildSheet();
    sheetOpener = opener;
    sheetLoc = locationOf(opener);
    var toast = sheet.querySelector('.cs-toast');
    if (toast) toast.hidden = true;
    sheet.hidden = false;
    document.documentElement.classList.add('cs-open');
    var first = sheet.querySelector('.cs-actions .btn');
    if (first) first.focus();
    dl({ event: 'contact_panel_open', click_location: sheetLoc });
  }
  function closeSheet() {
    if (!sheet) return;
    sheet.hidden = true;
    document.documentElement.classList.remove('cs-open');
    if (sheetOpener && sheetOpener.focus) sheetOpener.focus();
  }
  function initContactLinks() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('a[href]');
      if (!a || a.closest('.contact-sheet')) return;
      var href = a.getAttribute('href') || '';
      if (/^https?:\/\/(www\.)?zalo\.me\//i.test(href)) { ev.preventDefault(); openSheet(a); return; }
      if (/^tel:/i.test(href)) dl({ event: 'contact', method: 'phone', click_location: locationOf(a), link_url: href });
      else if (/^mailto:/i.test(href)) dl({ event: 'contact', method: 'email', click_location: locationOf(a), link_url: href });
      else if (/^https?:\/\/(m\.me|www\.messenger\.com)\//i.test(href)) dl({ event: 'contact', method: 'messenger', click_location: locationOf(a), link_url: href });
    });
  }

  // ===== Tính thử phí dịch vụ (dùng chung các trang nền tảng) =====
  function groupDigits(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function vnd(n) { return groupDigits(n) + 'đ'; }
  // Bảng phí theo nền tảng. Giữ khớp với bảng giá trên từng trang. Phí luôn từ 10% ngân sách trở lên
  // và không giảm khi ngân sách tăng.
  function feeFor(budget, platform) {
    if (platform === 'shopee') {
      if (budget <= 20000000) return { plan: 'Khởi đầu', fee: 2000000 };
      if (budget <= 80000000) return { plan: 'Tăng trưởng', fee: budget * 0.12 };
      return { plan: 'Mở rộng', fee: Math.max(9600000, budget * 0.10) };
    }
    if (budget <= 30000000) return { plan: 'Khởi đầu', fee: 3000000 };
    if (budget <= 100000000) return { plan: 'Tăng trưởng', fee: budget * 0.12 };
    return { plan: 'Mở rộng', fee: Math.max(12000000, budget * 0.10) };
  }
  function pct(x) {
    var r = Math.round(x * 10) / 10;
    return (r % 1 === 0 ? String(r) : r.toFixed(1).replace('.', ',')) + '%';
  }
  // Ô nhập số tiền: chỉ giữ chữ số, bỏ số 0 ở đầu, tối đa 12 chữ số
  function onlyDigits(s) { return String(s || '').replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 12); }
  function initCalc(root) {
    var range = root.querySelector('input[type="range"]');
    var amount = root.querySelector('[data-calc-amount]');
    var platform = root.getAttribute('data-calc') || document.body.getAttribute('data-platform') || 'facebook';
    var min = Number(range.min), max = Number(range.max);
    var exact = Number(range.value) * 1000000;
    var out = {};
    ['plan', 'fee', 'share', 'total', 'daily', 'note'].forEach(function (k) { out[k] = root.querySelector('[data-out="' + k + '"]'); });
    function set(k, text) { if (out[k]) out[k].textContent = text; }
    var used = false;
    function track() {
      if (used || exact < 1000000) return;
      used = true;
      dl({ event: 'fee_calculator_use', budget_million: Math.round(exact / 10000) / 100 });
    }
    function render() {
      var b = exact;
      if (b < 1000000) {
        ['plan', 'fee', 'share', 'total'].forEach(function (k) { set(k, '—'); });
        set('daily', 'Nhập số tiền quảng cáo mỗi tháng để tính');
        if (out.note) out.note.hidden = true;
        return;
      }
      var r = feeFor(b, platform);
      set('daily', 'khoảng ' + vnd(b / 30) + ' mỗi ngày');
      set('plan', r.plan);
      set('fee', vnd(r.fee));
      set('share', pct(r.fee / b * 100));
      set('total', vnd(b + r.fee));
      range.setAttribute('aria-valuetext', vnd(b));
      if (out.note) {
        var note = b < min * 1000000 ? root.getAttribute('data-note-min') : b > max * 1000000 ? root.getAttribute('data-note-max') : '';
        out.note.hidden = !note;
        out.note.textContent = note || '';
      }
    }
    function syncRange() { range.value = String(Math.min(max, Math.max(min, Math.round(exact / 1000000)))); }
    // Gõ tới đâu thêm dấu chấm tới đó, giữ con trỏ đúng sau chữ số vừa gõ
    function reformat() {
      var pos = amount.selectionStart == null ? amount.value.length : amount.selectionStart;
      var before = onlyDigits(amount.value.slice(0, pos)).length;
      var d = onlyDigits(amount.value);
      amount.value = d ? groupDigits(Number(d)) : '';
      var i = 0, seen = 0;
      while (i < amount.value.length && seen < before) { if (/\d/.test(amount.value.charAt(i))) seen++; i++; }
      try { if (document.activeElement === amount) amount.setSelectionRange(i, i); } catch (e) {}
      return d;
    }
    range.addEventListener('input', function () {
      exact = Number(range.value) * 1000000;
      if (amount) amount.value = groupDigits(exact);
      render();
    });
    range.addEventListener('change', track);
    if (amount) {
      amount.value = groupDigits(exact);
      amount.addEventListener('input', function () {
        var d = reformat();
        exact = d ? Number(d) : 0;
        if (exact >= 1000000) syncRange();
        render();
      });
      amount.addEventListener('change', track);
      amount.addEventListener('blur', function () {
        if (exact >= 1000000) return;
        exact = Number(range.value) * 1000000; // bỏ trống hoặc quá nhỏ: quay về số trên thanh kéo
        amount.value = groupDigits(exact);
        render();
      });
    }
    render();
  }

  // ===== Nút dẫn tới form: chọn sẵn nhu cầu (data-need), khoảng ngân sách (data-budget), ghi gói đã chọn (data-plan) =====
  function initPrefillLinks() {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest && ev.target.closest('[data-need], [data-budget], [data-plan]');
      if (!a) return;
      var need = a.getAttribute('data-need');
      var budget = a.getAttribute('data-budget');
      var plan = a.getAttribute('data-plan');
      if (need) each('form[data-lead-form] input[name="need"]', function (r) { if (r.value === need) r.checked = true; });
      if (budget) each('form[data-lead-form] select[name="budget"]', function (s) { s.value = budget; });
      if (plan) dl({ event: 'select_content', content_type: 'pricing_plan', content_id: plan });
    });
  }

  // ===== Tự kiểm tra đo lường 5 câu (trang Facebook Ads) =====
  function initQuiz(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-q]'));
    var scoreEl = root.querySelector('[data-quiz-score]');
    var meter = root.querySelector('[data-quiz-meter]');
    var text = root.querySelector('[data-quiz-text]');
    var unsureEl = root.querySelector('[data-quiz-unsure]');
    var reported = false;
    // Lời nhận xét lấy từ thuộc tính của khung tự kiểm tra, {n} là số mục còn thiếu. Không có thì dùng lời trang Facebook
    function say(key, fallback, missing) { return (root.getAttribute('data-text-' + key) || fallback).replace('{n}', missing); }
    function render(fromUser) {
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
        text.textContent = say('full', 'Phần đo đã đủ. Bước tiếp theo là đọc số liệu đúng cách để tăng ngân sách mà vẫn giữ được lãi.', missing);
      } else if (yes >= 3) {
        text.textContent = say('mid', 'Còn thiếu {n} mục. Facebook đang tìm khách với thông tin chưa đủ, nên bổ sung trước khi tăng ngân sách.', missing);
      } else {
        text.textContent = say('low', 'Còn thiếu {n} mục. Facebook chưa biết ai là người mua, nên tiền quảng cáo dễ chạy theo lượt bấm hơn là theo đơn hàng.', missing);
      }
      unsureEl.hidden = !unsure;
      unsureEl.textContent = unsure ? 'Có ' + unsure + ' câu bạn chưa rõ. Buổi kiểm tra 20 phút sẽ trả lời giúp bạn.' : '';
      if (fromUser && answered === total && !reported) {
        reported = true;
        dl({ event: 'self_check_complete', score: yes, unsure_count: unsure });
      }
    }
    root.addEventListener('change', function () { render(true); });
    render(false);
  }

  // ===== Checklist 30 mục (trang quà tặng): mỗi nền tảng một tab, link #facebook, #shopee mở thẳng tab =====
  // Mỗi tab lưu dấu tick riêng trong trình duyệt. Tab Facebook giữ khóa cũ hn_checklist để không mất tick đã có.
  function initChecklist(root) {
    var platform = root.getAttribute('data-checklist') || 'facebook';
    var key = platform === 'facebook' ? 'hn_checklist' : 'hn_checklist_' + platform;
    var boxes = Array.prototype.slice.call(root.querySelectorAll('input[type="checkbox"]'));
    var bar = document.querySelector('[data-progress-bar]');
    var label = document.querySelector('[data-progress-label]');
    var verdict = document.querySelector('[data-progress-verdict]');
    var saved = jGet(lGet, key) || {};
    boxes.forEach(function (b) { if (saved[b.id]) b.checked = true; });
    var reached = {};
    function render(fromUser) {
      var done = boxes.filter(function (b) { return b.checked; }).length;
      [10, 20, 30].forEach(function (m) {
        if (done >= m && !reached[m]) { reached[m] = true; if (fromUser) dl({ event: 'checklist_progress', checked_count: m, checklist_platform: platform }); }
      });
      var state = {};
      boxes.forEach(function (b) { if (b.checked) state[b.id] = 1; });
      if (fromUser) lSet(key, JSON.stringify(state));
      if (root.hidden) return; // thanh tiến độ chỉ theo tab đang mở
      var p = boxes.length ? Math.round(done / boxes.length * 100) : 0;
      if (bar) bar.style.width = p + '%';
      if (label) label.textContent = done + '/' + boxes.length + ' mục đã sẵn sàng';
      if (verdict) {
        verdict.textContent = done >= 26 ? (root.getAttribute('data-verdict-high') || 'Tài khoản khá sẵn sàng') :
          done >= 18 ? (root.getAttribute('data-verdict-mid') || 'Còn vài lỗ hổng cần vá') :
          (root.getAttribute('data-verdict-low') || 'Nên sửa trước khi tăng ngân sách');
      }
    }
    root.addEventListener('change', function () { render(true); });
    render(false);
    return { platform: platform, root: root, render: render };
  }
  function initChecklists() {
    var lists = {}, order = [];
    each('[data-checklist]', function (root) { var c = initChecklist(root); lists[c.platform] = c; order.push(c.platform); });
    if (!order.length) return;
    var title = document.querySelector('[data-ck-title]');
    function show(p) {
      if (!lists[p]) p = order[0];
      order.forEach(function (k) { lists[k].root.hidden = k !== p; });
      each('[data-ck-tab]', function (t) {
        var on = t.getAttribute('data-ck-tab') === p;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      var r = lists[p].root;
      if (title && r.getAttribute('data-title')) title.textContent = r.getAttribute('data-title');
      if (r.getAttribute('data-doc-title')) document.title = r.getAttribute('data-doc-title');
      // Nút đăng ký ở đầu trang và màu nút theo nền tảng của tab đang mở
      if (r.getAttribute('data-signup')) each('[data-ck-signup]', function (a) { a.setAttribute('href', r.getAttribute('data-signup')); });
      document.body.setAttribute('data-platform', p);
      lists[p].render(false);
    }
    // Bấm tab chỉ đổi nội dung, không đổi địa chỉ trang, để GA4 và Pixel không tính thêm lượt xem trang
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest && ev.target.closest('[data-ck-tab]');
      if (t) show(t.getAttribute('data-ck-tab'));
    });
    window.addEventListener('hashchange', function () {
      var h = window.location.hash.slice(1);
      if (lists[h]) { show(h); window.scrollTo(0, 0); }
    });
    show(window.location.hash.slice(1));
  }

  // ===== Thu gọn phần dài trên điện thoại (data-more="nhãn nút") =====
  function initMore() {
    if (!window.matchMedia || !window.matchMedia('(max-width: 899px)').matches) return;
    each('[data-more]', function (el) {
      var label = el.getAttribute('data-more') || 'Xem thêm';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'more-toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = label;
      if (el.hasAttribute('data-more-items')) {
        // Danh sách: chỉ hiện N mục đầu
        var keep = Number(el.getAttribute('data-more-items')) || 6;
        var extra = Array.prototype.slice.call(el.children, keep);
        if (!extra.length) return;
        extra.forEach(function (c) { c.hidden = true; });
        btn.addEventListener('click', function () {
          extra.forEach(function (c) { c.hidden = false; });
          btn.remove();
        });
      } else {
        el.classList.add('is-collapsed');
        btn.addEventListener('click', function () {
          var open = el.classList.toggle('is-collapsed') === false;
          btn.setAttribute('aria-expanded', String(open));
          btn.textContent = open ? 'Thu gọn' : label;
        });
      }
      el.parentNode.insertBefore(btn, el.nextSibling);
    });
  }

  // ===== Trang cảm ơn =====
  function initThanks(root) {
    var name = sGet('hn_lead_name');
    var hello = root.querySelector('[data-hello]');
    if (hello && name) hello.textContent = 'Cảm ơn ' + name + ', HÀ NAM AGENCY đã nhận thông tin của bạn';
    var mail = root.querySelector('[data-email-note]');
    if (mail) mail.hidden = sGet('hn_lead_email') !== '1';
    // Phần chỉ dành cho một nền tảng (data-only="shopee"): ẩn và khóa ô nhập của nền tảng khác.
    // Không rõ nền tảng (khách từ trang chủ) thì dùng phần Facebook như trước.
    var platform = sGet('hn_lead_platform') === 'shopee' ? 'shopee' : 'facebook';
    function matches(el) { var o = el.getAttribute('data-only'); return !o || o.split(' ').indexOf(platform) > -1; }
    each('[data-only]', function (el) {
      var on = matches(el);
      el.hidden = !on;
      each('input, select, textarea', function (i) { i.disabled = !on; }, el);
    }, root);
    if (platform === 'shopee') each('[data-placeholder-shopee]', function (i) { i.placeholder = i.getAttribute('data-placeholder-shopee'); }, root);
    var need = sGet('hn_lead_need');
    each('[data-audit-note]', function (a) {
      a.hidden = !matches(a) || (need !== 'kiem-tra-tai-khoan' && need !== 'tang-ngan-sach');
    }, root);
  }

  // ===== Khởi động =====
  function start() {
    loadTagsDirect();
    captureAttribution();
    each('form[data-lead-form]', initForm);
    each('form[data-lead-details]', initDetails);
    each('[data-calc]', initCalc);
    each('[data-quiz]', initQuiz);
    initPrefillLinks();
    initContactLinks();
    initMore();
    initChecklists();
    each('[data-thanks]', initThanks);
    each('[data-year]', function (el) { el.textContent = new Date().getFullYear(); });
  }
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  }

  // Cho phép kiểm thử bằng Node
  if (typeof module !== 'undefined') module.exports = { referralTouch: referralTouch, ignoredSource: ignoredSource, normalizePhone: normalizePhone, isPhone: isPhone, feeFor: feeFor, pct: pct, onlyDigits: onlyDigits, groupDigits: groupDigits, parseGaClientId: parseGaClientId, detectInApp: detectInApp, detectDevice: detectDevice };
})();
