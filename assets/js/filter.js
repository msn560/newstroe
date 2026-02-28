/**
 * Filtre paneli — initFilter, applyFilters, resetFilters, URL parametreleri
 */
(function () {
  'use strict';

  function getFilterForm(container) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    return el && el.querySelector ? el : document.querySelector('.filter-panel form') || document.querySelector('#filter-form');
  }

  function getActiveFilters(form) {
    form = form || getFilterForm();
    if (!form) return {};
    var data = {};
    var inputs = form.querySelectorAll('input, select');
    inputs.forEach(function (inp) {
      if (inp.name && inp.type === 'checkbox') {
        if (inp.checked) data[inp.name] = (data[inp.name] || []).concat(inp.value);
      } else if (inp.name && (inp.type !== 'checkbox' && inp.type !== 'radio' || inp.checked)) {
        if (inp.value) data[inp.name] = inp.value;
      }
    });
    return data;
  }

  function applyFilters(container) {
    var form = getFilterForm(container);
    if (!form) return;
    var params = new URLSearchParams();
    var data = getActiveFilters(form);
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (Array.isArray(v)) v.forEach(function (x) { params.append(k, x); });
      else params.set(k, v);
    });
    if (typeof history.pushState === 'function') {
      history.pushState(null, '', (params.toString() ? '?' + params.toString() : window.location.pathname));
    }
  }

  function resetFilters(container) {
    var form = getFilterForm(container);
    if (!form) return;
    form.reset();
    applyFilters(container);
    if (window.filterProducts) filterProducts();
  }

  function initFilter(container, onApply) {
    var form = getFilterForm(container);
    if (!form) return;
    form.addEventListener('change', function () {
      applyFilters(container);
      if (onApply && typeof onApply === 'function') onApply(getActiveFilters(form));
    });
    var resetBtn = form.querySelector('[type="reset"], .filter-reset');
    if (resetBtn) resetBtn.addEventListener('click', function () { resetFilters(container); });
  }

  function sortProducts(type, list) {
    if (!Array.isArray(list)) return list;
    var arr = list.slice();
    var price = function (p) { return p.price != null ? p.price : (p.fiyat != null ? p.fiyat : 0); };
    var rating = function (p) { return parseFloat(p.rating) || 0; };
    if (type === 'fiyat-artan') arr.sort(function (a, b) { return price(a) - price(b); });
    else if (type === 'fiyat-azalan') arr.sort(function (a, b) { return price(b) - price(a); });
    else if (type === 'yeni') arr.sort(function (a, b) { return (b.id || 0) - (a.id || 0); });
    else if (type === 'cok-satan') arr.sort(function (a, b) { return (b.salesCount || b.reviewCount || 0) - (a.salesCount || a.reviewCount || 0); });
    else if (type === 'puana') arr.sort(function (a, b) { return rating(b) - rating(a); });
    return arr;
  }

  /**
   * Client-side filtre — getActiveFilters ile alınan filtreleri uygular
   * @param {Array} data - Ürün listesi
   * @param {Object} filters - getActiveFilters() çıktısı
   * @returns {Array} Filtrelenmiş liste
   */
  function filterProducts(data, filters) {
    if (!Array.isArray(data)) return [];
    filters = filters || getActiveFilters();
    var list = data.slice();
    if (filters.min_fiyat) {
      var min = parseFloat(filters.min_fiyat) || 0;
      list = list.filter(function (p) { return (p.price != null ? p.price : p.fiyat || 0) >= min; });
    }
    if (filters.max_fiyat) {
      var max = parseFloat(filters.max_fiyat) || Infinity;
      list = list.filter(function (p) { return (p.price != null ? p.price : p.fiyat || 0) <= max; });
    }
    if (filters.marka && Array.isArray(filters.marka)) {
      list = list.filter(function (p) { return filters.marka.indexOf(p.brand || p.marka || '') >= 0; });
    }
    if (filters.beden && Array.isArray(filters.beden)) {
      list = list.filter(function (p) {
        var beds = p.beden || p.sizes || [];
        if (typeof beds === 'string') beds = beds.split(',');
        return filters.beden.some(function (b) { return beds.indexOf(b) >= 0; });
      });
    }
    if (filters.renk && Array.isArray(filters.renk)) {
      list = list.filter(function (p) {
        var renks = p.renk || p.colors || [];
        if (typeof renks === 'string') renks = renks.split(',');
        return filters.renk.some(function (r) { return renks.indexOf(r) >= 0; });
      });
    }
    return list;
  }

  /**
   * Infinite scroll: sentinel görünür olduğunda onLoadMore çağrılır.
   * @param {string|Element} sentinel - #scroll-sentinel veya element
   * @param {function} onLoadMore - daha fazla yükle callback
   * @param {{ getIsLoading?: function }} options - getIsLoading() true ise çağrı yapılmaz
   */
  function initInfiniteScroll(sentinel, onLoadMore, options) {
    var el = typeof sentinel === 'string' ? document.querySelector(sentinel) : sentinel;
    if (!el || typeof onLoadMore !== 'function') return;
    var getIsLoading = (options && options.getIsLoading) ? options.getIsLoading : function () { return false; };
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || getIsLoading()) return;
      onLoadMore();
    }, { rootMargin: '100px', threshold: 0 });
    observer.observe(el);
  }

  window.initFilter = initFilter;
  window.applyFilters = applyFilters;
  window.resetFilters = resetFilters;
  window.getActiveFilters = getActiveFilters;
  window.filterProducts = filterProducts;
  window.sortProducts = sortProducts;
  window.initInfiniteScroll = initInfiniteScroll;
})();
