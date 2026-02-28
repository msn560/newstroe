/**
 * Giyim kategori sayfası — filtre, sıralama, infinite scroll. Kart render: common.js renderProductCards
 */
(function () {
  'use strict';

  var PRODUCT_LIST_ID = 'product-list';
  var CARD_TEMPLATE_URL = '../../components/product-card.html';
  var PAGE_SIZE = 4;

  var sampleProducts = window.GIYIM_PRODUCTS || [];
  var currentFiltered = [];
  var currentPage = 1;
  var loading = false;
  var hasMore = true;

  function renderProducts(products) {
    var countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = (products.length) + ' ürün bulundu';
    if (window.renderProductCards) renderProductCards(PRODUCT_LIST_ID, products, CARD_TEMPLATE_URL);
  }

  function renderSlice() {
    var toShow = currentFiltered.slice(0, currentPage * PAGE_SIZE);
    hasMore = toShow.length < currentFiltered.length;
    var countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = currentFiltered.length + ' ürün bulundu';
    if (window.renderProductCards) renderProductCards(PRODUCT_LIST_ID, toShow, CARD_TEMPLATE_URL);
  }

  function loadMoreProducts() {
    if (loading || !hasMore) return;
    loading = true;
    currentPage += 1;
    renderSlice();
    loading = false;
  }

  function applyFiltersAndSort() {
    var form = document.getElementById('filter-form');
    var filters = form && window.getActiveFilters ? getActiveFilters(form) : {};
    currentFiltered = sampleProducts.filter(function (p) {
      if (filters.min_fiyat && p.price < parseFloat(filters.min_fiyat)) return false;
      if (filters.max_fiyat && p.price > parseFloat(filters.max_fiyat)) return false;
      var m = filters.marka;
      if (m && (Array.isArray(m) ? m.length : m)) {
        var arr = Array.isArray(m) ? m : [m];
        if (arr.indexOf(p.brand) === -1) return false;
      }
      return true;
    });
    var sortVal = document.getElementById('sort-select') && document.getElementById('sort-select').value;
    if (sortVal && window.sortProducts) currentFiltered = sortProducts(sortVal, currentFiltered);
    currentPage = 1;
    hasMore = currentFiltered.length > PAGE_SIZE;
    renderSlice();
  }

  function initCategoryFilters() {
    var panel = document.getElementById('filter-panel');
    if (!panel || !window.initFilter) return;
    initFilter(panel, applyFiltersAndSort);
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.filterProducts = applyFiltersAndSort;
    initCategoryFilters();
    applyFiltersAndSort();

    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.addEventListener('change', applyFiltersAndSort);

    var filterToggle = document.getElementById('filter-toggle');
    var filterBackdrop = document.getElementById('filter-backdrop');
    if (filterToggle && filterBackdrop) {
      filterToggle.addEventListener('click', function () {
        var panel = document.getElementById('filter-panel');
        if (panel) panel.classList.toggle('is-open');
        filterBackdrop.classList.toggle('is-open');
      });
      filterBackdrop.addEventListener('click', function () {
        document.getElementById('filter-panel').classList.remove('is-open');
        filterBackdrop.classList.remove('is-open');
      });
    }

    if (window.initInfiniteScroll) {
      initInfiniteScroll('#scroll-sentinel', loadMoreProducts, {
        getIsLoading: function () { return loading || !hasMore; }
      });
    }
  });
})();
