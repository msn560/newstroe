/**
 * Ortak JS — menü, modal, toast, yardımcı fonksiyonlar.
 * Her sayfada yüklenir. Bağımlılık: yok (cart.js ayrı yüklenir).
 */
(function () {
  'use strict';

  // ─── Menü ───
  function toggleMenu() {
    var menu = document.getElementById('header-menu');
    if (!menu) return;
    menu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', menu.classList.contains('is-open'));
  }

  function closeMenuOnOutside(e) {
    var menu = document.getElementById('header-menu');
    var btn = document.getElementById('hamburger-btn');
    if (!menu || !menu.classList.contains('is-open')) return;
    if (btn && btn.contains(e.target)) return;
    if (menu.contains(e.target)) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  function initDropdowns() {
    // Kategori dropdown hover — gerekirse sayfa özel JS ile genişletilir
  }

  // ─── Modal ───
  function openModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('is-open');
  }

  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('is-open');
  }

  function closeOnOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('is-open');
    }
  }

  // ─── Toast bildirim (SweetAlert2 varsa kullan) ───
  function showToast(msg, type) {
    type = type || 'success';
    if (typeof Swal !== 'undefined') {
      var iconMap = { success: 'success', error: 'error', warning: 'warning' };
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: iconMap[type] || 'success',
        title: msg,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: { popup: 'swal-toast' }
      });
      return;
    }
    var toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.className = 'toast toast-' + type;
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:var(--padding-lg);left:50%;transform:translateX(-50%);padding:var(--padding) var(--padding-lg);border-radius:var(--radius);color:var(--beyaz);font-weight:500;z-index:9999;animation:fadeIn 0.2s ease;';
    if (type === 'success') toast.style.background = 'var(--basari)';
    else if (type === 'error') toast.style.background = 'var(--hata)';
    else toast.style.background = 'var(--uyari)';
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3000);
  }

  // ─── SweetAlert2 onay modal ───
  function showConfirm(options, onConfirm, onCancel) {
    var opts = Object.assign({
      title: options.title || 'Emin misiniz?',
      text: options.text || '',
      icon: options.icon || 'question',
      confirmButtonText: options.confirmText || 'Evet',
      cancelButtonText: options.cancelText || 'İptal',
      confirmButtonColor: '#ea580c',
      showCancelButton: true
    }, options);
    if (typeof Swal !== 'undefined') {
      return Swal.fire(opts).then(function (result) {
        if (result.isConfirmed && onConfirm) onConfirm();
        else if (result.isDismissed && onCancel) onCancel();
        return result;
      });
    }
    if (window.confirm(opts.title + (opts.text ? '\n' + opts.text : ''))) {
      if (onConfirm) onConfirm();
    } else if (onCancel) onCancel();
  }

  // ─── Yardımcı ───
  function formatPrice(n) {
    if (typeof n !== 'number') n = parseFloat(n) || 0;
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 2 }).format(n);
  }

  function formatDate(d) {
    if (!d) return '';
    var date = d instanceof Date ? d : new Date(d);
    return new Intl.DateTimeFormat('tr-TR').format(date);
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(null, args); }, ms);
    };
  }

  // ─── Header sepet/favori badge (localStorage'dan sayı) ───
  function updateHeaderBadges() {
    try {
      var cartStr = localStorage.getItem('eticaret_cart');
      var count = 0;
      if (cartStr) {
        var cart = JSON.parse(cartStr);
        if (Array.isArray(cart)) count = cart.length;
        else if (cart.items) count = cart.items.length;
      }
      var badge = document.getElementById('header-cart-count');
      if (badge) badge.textContent = count;
    } catch (e) {}
  }

  // ─── Dark mode ───
  function toggleDarkMode() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateThemeToggleLabel();
  }

  function initTheme() {
    try {
      var saved = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', saved);
      updateThemeToggleLabel();
    } catch (e) {}
  }

  function updateThemeToggleLabel() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Açık mod' : 'Koyu mod');
  }

  // ─── Lazy load resimler ───
  function initLazyImages() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var img = e.target;
        var src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    document.querySelectorAll('img.lazy[data-src]').forEach(function (img) { observer.observe(img); });
  }

  // ─── Ürün kartı render (ortak — vitrin ve kategori sayfaları) ───
  function renderStars(rating) {
    rating = parseFloat(rating) || 0;
    var full = Math.floor(rating);
    var half = rating % 1 >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function renderProductCard(product, templateHtml) {
    var wrap = document.createElement('div');
    wrap.innerHTML = templateHtml;
    var card = wrap.firstElementChild;
    if (!card) return null;
    card.setAttribute('data-product-id', product.id);
    var titleLink = card.querySelector('[data-title]');
    if (titleLink) {
      titleLink.textContent = product.title || '';
      titleLink.href = product.link || '#';
    }
    var brandEl = card.querySelector('[data-brand]');
    if (brandEl) brandEl.textContent = product.brand || '';
    var priceEl = card.querySelector('[data-price]');
    if (priceEl) priceEl.textContent = (window.formatPrice ? formatPrice(product.price) : (product.price + ' TL'));
    var oldEl = card.querySelector('[data-price-old]');
    if (oldEl) {
      if (product.priceOld) {
        oldEl.textContent = (window.formatPrice ? formatPrice(product.priceOld) : product.priceOld + ' TL');
        oldEl.style.display = '';
      } else oldEl.style.display = 'none';
    }
    var badge = card.querySelector('[data-badge]');
    if (badge) {
      if (product.discount) { badge.textContent = '%' + product.discount; badge.style.display = ''; }
      else badge.style.display = 'none';
    }
    var starsEl = card.querySelector('.rating__stars');
    if (starsEl) starsEl.textContent = renderStars(product.rating);
    var countEl = card.querySelector('[data-review-count]');
    if (countEl) countEl.textContent = '(' + (product.reviewCount || 0) + ')';
    var img = card.querySelector('.product-card__img');
    if (img) {
      img.alt = product.title || '';
      if (product.img) { img.dataset.src = product.img; img.removeAttribute('src'); }
      else img.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect fill="#f0f0f0" width="300" height="300"/><text x="50%" y="50%" fill="#888" font-size="14" text-anchor="middle" dy=".3em">Ürün</text></svg>');
    }
    var addBtn = card.querySelector('[data-add-cart]');
    if (addBtn && window.addToCart) {
      addBtn.addEventListener('click', function () { addToCart(product.id, 1, {}, { price: product.price, title: product.title }); });
    }
    return card;
  }

  function renderProductCards(containerId, products, templateUrl) {
    var container = document.getElementById(containerId);
    if (!container) return;
    if (!products || !products.length) {
      container.innerHTML = '<p class="vitrin-placeholder">Ürün bulunamadı.</p>';
      return;
    }
    var cache = window._productCardTemplates || (window._productCardTemplates = {});
    var template = cache[templateUrl];
    if (template) {
      container.innerHTML = '';
      products.forEach(function (p) {
        var node = renderProductCard(p, template);
        if (node) container.appendChild(node);
      });
      if (window.initLazyImages) initLazyImages();
      return;
    }
    container.innerHTML = '<p class="vitrin-placeholder">Yükleniyor…</p>';
    fetch(templateUrl)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        cache[templateUrl] = html;
        container.innerHTML = '';
        products.forEach(function (p) {
          var node = renderProductCard(p, html);
          if (node) container.appendChild(node);
        });
        if (window.initLazyImages) initLazyImages();
      })
      .catch(function () {
        container.innerHTML = '<p class="vitrin-placeholder">Ürün kartı yüklenemedi.</p>';
      });
  }

  // ─── Header linklerini sayfa base path'e göre düzelt (alt sayfalarda çalışması için) ───
  function fixHeaderLinks(base) {
    base = base || '';
    var header = document.querySelector('.header');
    if (!header) return;
    header.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h && !h.match(/^(https?:|#|mailto:)/)) a.setAttribute('href', (base + h).replace(/\/+/g, '/'));
    });
    var form = header.querySelector('form.header-search');
    if (form && form.getAttribute('action')) {
      form.setAttribute('action', (base + form.getAttribute('action')).replace(/\/+/g, '/'));
    }
    initAuthHeader(base);
  }

  // ─── Giriş yapılmışsa header'da Hesabım göster ───
  function initAuthHeader(base) {
    base = base || '';
    var user = null;
    try { user = JSON.parse(localStorage.getItem('eticaret_user')); } catch (e) {}
    if (!user) return;
    var loginLink = document.querySelector('.header-actions a[href*="login"]');
    var registerLink = document.querySelector('.header-actions a[href*="register"]');
    if (loginLink) {
      loginLink.textContent = 'Hesabım';
      loginLink.href = (base + 'user/index.html').replace(/\/+/g, '/');
    }
    if (registerLink) registerLink.style.display = 'none';
  }

  function fixFooterLinks(base) {
    base = base || '';
    var footer = document.querySelector('.footer');
    if (!footer) return;
    footer.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h && !h.match(/^(https?:|#|mailto:)/)) a.setAttribute('href', (base + h).replace(/\/+/g, '/'));
    });
  }

  // ─── Footer mobil accordion (doküman: mobilde tıklanabilir alanlar açılır) ───
  function initFooterAccordion() {
    var cols = document.querySelectorAll('.footer-col');
    cols.forEach(function (col) {
      var strong = col.querySelector('strong');
      if (!strong || !col.querySelector('ul, .footer-desc, .footer-social')) return;
      strong.setAttribute('role', 'button');
      strong.setAttribute('aria-expanded', 'false');
      strong.classList.add('footer-col__toggle');
      strong.addEventListener('click', function () {
        var open = col.classList.toggle('is-open');
        strong.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  // ─── Component yükleme (header, footer) ───
  function loadComponent(selector, url) {
    var el = document.querySelector(selector);
    if (!el || !url) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.innerHTML = html;
        updateHeaderBadges();
        updateThemeToggleLabel();
        initLazyImages();
        var hamburger = document.getElementById('hamburger-btn');
        if (hamburger) hamburger.addEventListener('click', toggleMenu);
      })
      .catch(function () {});
  }

  // Global API
  window.toggleMenu = toggleMenu;
  window.closeMenuOnOutside = closeMenuOnOutside;
  window.initDropdowns = initDropdowns;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.closeOnOverlay = closeOnOverlay;
  window.showToast = showToast;
  window.showConfirm = showConfirm;
  window.formatPrice = formatPrice;
  window.formatDate = formatDate;
  window.debounce = debounce;
  window.updateHeaderBadges = updateHeaderBadges;
  window.toggleDarkMode = toggleDarkMode;
  window.updateThemeToggleLabel = updateThemeToggleLabel;
  window.initTheme = initTheme;
  window.initLazyImages = initLazyImages;
  window.loadComponent = loadComponent;
  window.renderStars = renderStars;
  window.renderProductCard = renderProductCard;
  window.renderProductCards = renderProductCards;
  window.initFooterAccordion = initFooterAccordion;
  window.fixHeaderLinks = fixHeaderLinks;
  window.fixFooterLinks = fixFooterLinks;

  // Sayfa yüklendiğinde
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    updateHeaderBadges();
    initLazyImages();
    document.addEventListener('click', closeMenuOnOutside);
    document.querySelectorAll('.modal-overlay').forEach(function (ov) {
      ov.addEventListener('click', closeOnOverlay);
    });

    var hamburger = document.getElementById('hamburger-btn');
    if (hamburger) hamburger.addEventListener('click', toggleMenu);

    document.body.addEventListener('click', function (e) {
      var themeBtn = e.target.closest && e.target.closest('#theme-toggle');
      if (themeBtn) { e.preventDefault(); toggleDarkMode(); }
    });

    // Header/footer: sayfa kendi fetch ile yükler (#header-placeholder, #footer-placeholder)
  });
})();
