/** Market kategori — filtre, sıralama, ürün listesi */
(function () {
  'use strict';
  var PRODUCT_LIST_ID = 'product-list';
  var CARD_TEMPLATE_URL = '../../components/product-card.html';
  var products = [];
  function renderProducts(list) {
    list = list || products;
    var el = document.getElementById('product-count');
    if (el) el.textContent = list.length + ' ürün bulundu';
    if (window.renderProductCards) renderProductCards(PRODUCT_LIST_ID, list, CARD_TEMPLATE_URL);
    else document.getElementById(PRODUCT_LIST_ID).innerHTML = '<p class="vitrin-placeholder">Ürün bulunamadı.</p>';
  }
  function applyFiltersAndSort() {
    var form = document.getElementById('filter-form');
    var filters = form && window.getActiveFilters ? getActiveFilters(form) : {};
    var list = products.filter(function (p) {
      if (filters.min_fiyat && (p.price || 0) < parseFloat(filters.min_fiyat)) return false;
      if (filters.max_fiyat && (p.price || 0) > parseFloat(filters.max_fiyat)) return false;
      return true;
    });
    var sortVal = document.getElementById('sort-select') && document.getElementById('sort-select').value;
    if (sortVal && window.sortProducts) list = sortProducts(sortVal, list);
    renderProducts(list);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var panel = document.getElementById('filter-panel');
    if (panel && window.initFilter) initFilter(panel, applyFiltersAndSort);
    document.getElementById('sort-select') && document.getElementById('sort-select').addEventListener('change', applyFiltersAndSort);
    var t = document.getElementById('filter-toggle'), b = document.getElementById('filter-backdrop');
    if (t && b) { t.addEventListener('click', function () { panel.classList.toggle('is-open'); b.classList.toggle('is-open'); }); b.addEventListener('click', function () { panel.classList.remove('is-open'); b.classList.remove('is-open'); }); }
    applyFiltersAndSort();
  });
})();
