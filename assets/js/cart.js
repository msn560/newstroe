/**
 * Sepet işlemleri. Key: eticaret_cart (localStorage).
 * Bağımlılık: common.js (showToast, formatPrice, updateHeaderBadges)
 */
(function () {
  'use strict';

  var CART_KEY = 'eticaret_cart';

  function getCart() {
    try {
      var data = localStorage.getItem(CART_KEY);
      if (!data) return { items: [] };
      var parsed = JSON.parse(data);
      return Array.isArray(parsed) ? { items: parsed } : (parsed.items ? parsed : { items: [] });
    } catch (e) {
      return { items: [] };
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      if (window.updateHeaderBadges) updateHeaderBadges();
    } catch (e) {}
  }

  function addToCart(productId, qty, variant, options) {
    qty = parseInt(qty, 10) || 1;
    variant = variant || {};
    options = options || {};
    var cart = getCart();
    var found = cart.items.find(function (i) {
      return i.id === productId && JSON.stringify(i.variant) === JSON.stringify(variant);
    });
    if (found) {
      found.qty += qty;
      if (options.price != null) found.price = options.price;
      if (options.title) found.title = options.title;
    } else {
      cart.items.push({
        id: productId,
        qty: qty,
        variant: variant,
        price: options.price,
        title: options.title
      });
    }
    saveCart(cart);
    if (window.showToast) showToast('Sepete eklendi!', 'success');
    return cart;
  }

  function removeFromCart(productId) {
    var cart = getCart();
    cart.items = cart.items.filter(function (i) { return i.id !== productId; });
    saveCart(cart);
    if (window.showToast) showToast('Ürün sepetten kaldırıldı.', 'success');
    return cart;
  }

  function updateQty(productId, qty) {
    qty = parseInt(qty, 10) || 0;
    var cart = getCart();
    var item = cart.items.find(function (i) { return i.id === productId; });
    if (!item) return cart;
    if (qty <= 0) {
      cart.items = cart.items.filter(function (i) { return i.id !== productId; });
    } else {
      item.qty = qty;
    }
    saveCart(cart);
    return cart;
  }

  function calcTotal(items, priceMap) {
    priceMap = priceMap || {};
    return (items || []).reduce(function (sum, i) {
      return sum + (priceMap[i.id] || 0) * (i.qty || 1);
    }, 0);
  }

  function applyCoupon(code) {
    var cart = getCart();
    cart.coupon = code;
    saveCart(cart);
    return cart;
  }

  function renderCartBadge() {
    if (window.updateHeaderBadges) updateHeaderBadges();
  }

  function loadCart() {
    return getCart();
  }

  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQty = updateQty;
  window.getCart = getCart;
  window.renderCartBadge = renderCartBadge;
  window.saveCart = saveCart;
  window.loadCart = loadCart;
  window.calcTotal = calcTotal;
  window.applyCoupon = applyCoupon;
})();
