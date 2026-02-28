/**
 * Arama kutusu — initSearch, liveSearch (debounce), renderSuggestions, clearSearch
 * Bağımlılık: common.js (debounce)
 */
(function () {
  'use strict';

  var searchInput = null;
  var suggestionsWrap = null;
  var debouncedSearch = null;

  function renderSuggestions(data) {
    if (!suggestionsWrap) return;
    if (!data || !data.length) {
      suggestionsWrap.innerHTML = '';
      suggestionsWrap.classList.remove('is-open');
      return;
    }
    suggestionsWrap.innerHTML = data.map(function (item) {
      var url = item.url || item.link || '#';
      var title = item.title || item.name || '';
      return '<a href="' + url + '" class="search-suggestion__item">' + title + '</a>';
    }).join('');
    suggestionsWrap.classList.add('is-open');
  }

  function clearSearch() {
    if (searchInput) searchInput.value = '';
    renderSuggestions([]);
  }

  function liveSearch(query) {
    if (!query || !query.trim()) {
      renderSuggestions([]);
      return;
    }
    // Örnek: API veya statik veri — sayfa kendi veri kaynağını bağlayabilir
    if (window.searchSuggestions) {
      window.searchSuggestions(query.trim(), renderSuggestions);
      return;
    }
    renderSuggestions([]);
  }

  function initSearch(options) {
    options = options || {};
    var selector = options.selector || '.header-search__input';
    var containerSelector = options.container || '.header-search';
    searchInput = document.querySelector(selector);
    if (!searchInput) return;
    var container = searchInput.closest(containerSelector);
    if (!container) container = searchInput.parentElement;
    if (!suggestionsWrap && container) {
      suggestionsWrap = document.createElement('div');
      suggestionsWrap.className = 'search-suggestions';
      suggestionsWrap.setAttribute('role', 'listbox');
      container.style.position = 'relative';
      container.appendChild(suggestionsWrap);
    }
    debouncedSearch = window.debounce ? debounce(function (q) { liveSearch(q); }, options.debounceMs || 300) : function (q) { liveSearch(q); };
    searchInput.addEventListener('input', function () { debouncedSearch(this.value); });
    searchInput.addEventListener('focus', function () { if (suggestionsWrap && suggestionsWrap.innerHTML) suggestionsWrap.classList.add('is-open'); });
    searchInput.addEventListener('blur', function () {
      setTimeout(function () { if (suggestionsWrap) suggestionsWrap.classList.remove('is-open'); }, 200);
    });
  }

  window.initSearch = initSearch;
  window.liveSearch = liveSearch;
  window.renderSuggestions = renderSuggestions;
  window.clearSearch = clearSearch;
})();
