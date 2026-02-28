/**
 * Ürün detay sayfası — URL ?id= ile ürün yükleme, sekmeler, benzer ürünler
 * Veri: window.GIYIM_PRODUCTS (giyim-data.js)
 */
(function () {
  'use strict';

  var PLACEHOLDER_IMG = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect fill="#f0f0f0" width="600" height="600"/><text x="50%" y="50%" fill="#888" font-size="24" text-anchor="middle" dy=".3em">Ürün</text></svg>');
  var CARD_TEMPLATE_URL = '../../components/product-card.html';

  function getProductId() {
    var m = /[?&]id=(\d+)/.exec(window.location.search);
    return m ? parseInt(m[1], 10) : null;
  }

  function getProduct() {
    var id = getProductId();
    var list = window.GIYIM_PRODUCTS || [];
    return id ? list.find(function (p) { return p.id === id; }) : null;
  }

  function getSimilar(currentId, limit) {
    limit = limit || 4;
    var list = window.GIYIM_PRODUCTS || [];
    return list.filter(function (p) { return p.id !== currentId; }).slice(0, limit);
  }

  function renderStars(rating) {
    var full = Math.floor(rating);
    var half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
  }

  function fillProduct(p) {
    document.getElementById('breadcrumb-title').textContent = p.title;
    document.getElementById('product-title').textContent = p.title;
    document.getElementById('product-brand').textContent = p.brand || '';
    document.getElementById('product-brand').href = 'index.html?marka=' + encodeURIComponent(p.brand || '');
    document.getElementById('product-rating').textContent = renderStars(p.rating || 0);
    document.getElementById('product-review-count').textContent = '(' + (p.reviewCount || 0) + ' değerlendirme)';
    document.getElementById('product-price').textContent = (window.formatPrice ? formatPrice(p.price) : p.price + ' TL');
    var oldEl = document.getElementById('product-price-old');
    if (p.priceOld) { oldEl.textContent = (window.formatPrice ? formatPrice(p.priceOld) : p.priceOld + ' TL'); oldEl.style.display = ''; }
    else oldEl.style.display = 'none';
    var badge = document.getElementById('product-badge');
    if (p.discount) { badge.textContent = '%' + p.discount; badge.style.display = ''; }
    else badge.style.display = 'none';
    var stock = p.stock != null ? p.stock : 10;
    document.getElementById('product-stock').textContent = stock > 5 ? 'Stokta' : (stock > 0 ? 'Son ' + stock + ' ürün' : 'Tükendi');
    if (p.specs && p.specs.Beden) document.getElementById('product-beden').textContent = p.specs.Beden;
    document.getElementById('main-img').src = p.img || PLACEHOLDER_IMG;
    document.getElementById('main-img').alt = p.title;
    document.getElementById('tab-aciklama').textContent = p.description || p.title + ' ürün açıklaması.';
    var tbl = document.getElementById('tab-ozellikler');
    if (p.specs && Object.keys(p.specs).length) {
      tbl.innerHTML = Object.keys(p.specs).map(function (k) {
        return '<tr><th>' + k + '</th><td>' + p.specs[k] + '</td></tr>';
      }).join('');
    } else tbl.innerHTML = '<tr><td>Özellik bilgisi yok.</td></tr>';

    document.getElementById('btn-add-cart').addEventListener('click', function () {
      var qty = parseInt(document.getElementById('product-qty').value, 10) || 1;
      if (window.addToCart) addToCart(p.id, qty, {}, { price: p.price, title: p.title });
    });

    var qtyInput = document.getElementById('product-qty');
    document.getElementById('qty-minus').addEventListener('click', function () {
      var v = parseInt(qtyInput.value, 10) || 1;
      if (v > 1) qtyInput.value = v - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', function () {
      var v = parseInt(qtyInput.value, 10) || 1;
      if (v < 99) qtyInput.value = v + 1;
    });
  }

  function initTabs() {
    var nav = document.querySelectorAll('.tabs__nav-btn');
    var panels = document.querySelectorAll('.tabs__panel');
    nav.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.getAttribute('data-tab');
        nav.forEach(function (b) { b.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var panel = document.getElementById('panel-' + tab);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var p = getProduct();
    if (!p) {
      document.getElementById('product-detail').innerHTML = '<p class="vitrin-placeholder">Ürün bulunamadı.</p>';
      return;
    }
    document.title = p.title + ' — Mağaza';
    fillProduct(p);
    initTabs();

    var similar = getSimilar(p.id);
    if (similar.length && window.renderProductCards) {
      renderProductCards('similar-products', similar, CARD_TEMPLATE_URL);
    } else {
      document.getElementById('similar-products').innerHTML = '<p class="vitrin-placeholder">Benzer ürün yok.</p>';
    }
  });
})();
