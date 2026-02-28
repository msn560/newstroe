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
    if (type === 'fiyat-artan') arr.sort(function (a, b) { return price(a) - price(b); });
    else if (type === 'fiyat-azalan') arr.sort(function (a, b) { return price(b) - price(a); });
    else if (type === 'yeni') arr.sort(function (a, b) { return (b.id || 0) - (a.id || 0); });
    return arr;
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
  window.sortProducts = sortProducts;
  window.initInfiniteScroll = initInfiniteScroll;
})();
