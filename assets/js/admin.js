/**
 * Admin paneli — ürün ekleme, stok, sipariş durumu.
 * Admin sayfalarında common.js sonrası yüklenir.
 */
(function () {
  'use strict';

  var STORAGE_PRODUCTS_KEY = 'eticaret_admin_products';

  function getStoredProducts() {
    try {
      var raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setStoredProducts(list) {
    try {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  /**
   * Yeni ürün ekle (form verisi veya obje).
   * @param {Object} data - { name, category, description, price, salePrice, stock, ... }
   * @returns {Object} eklenen ürün (id ile)
   */
  function addProduct(data) {
    var list = getStoredProducts();
    var id = list.length ? Math.max.apply(null, list.map(function (p) { return p.id || 0; })) + 1 : 1;
    var product = {
      id: id,
      name: data.name || '',
      category: data.category || '',
      description: data.description || '',
      price: parseFloat(data.price) || 0,
      salePrice: data.salePrice != null && data.salePrice !== '' ? parseFloat(data.salePrice) : null,
      stock: parseInt(data.stock, 10) || 0,
      status: data.status || 'active',
      createdAt: new Date().toISOString()
    };
    list.push(product);
    setStoredProducts(list);
    return product;
  }

  /**
   * Ürün sil (id ile).
   */
  function deleteProduct(id) {
    var list = getStoredProducts().filter(function (p) { return String(p.id) !== String(id); });
    setStoredProducts(list);
  }

  /**
   * Ürün güncelle.
   */
  function updateProduct(id, data) {
    var list = getStoredProducts();
    var idx = list.findIndex(function (p) { return String(p.id) === String(id); });
    if (idx === -1) return null;
    var p = list[idx];
    if (data.name != null) p.name = data.name;
    if (data.category != null) p.category = data.category;
    if (data.description != null) p.description = data.description;
    if (data.price != null) p.price = parseFloat(data.price);
    if (data.salePrice != null) p.salePrice = data.salePrice === '' ? null : parseFloat(data.salePrice);
    if (data.stock != null) p.stock = parseInt(data.stock, 10);
    if (data.status != null) p.status = data.status;
    setStoredProducts(list);
    return p;
  }

  /**
   * Stok artır/azalt.
   * @param {string|number} id - Ürün id
   * @param {number} qty - Miktar
   * @param {string} op - 'add' | 'sub'
   */
  function updateStock(id, qty, op) {
    var list = getStoredProducts();
    var p = list.find(function (x) { return String(x.id) === String(id); });
    if (!p) return false;
    qty = parseInt(qty, 10) || 0;
    if (op === 'add') p.stock += qty;
    else if (op === 'sub') p.stock = Math.max(0, p.stock - qty);
    setStoredProducts(list);
    return true;
  }

  /**
   * Sipariş durumu güncelle (gerçek API'de kullanılır).
   */
  function updateOrderStatus(orderId, status) {
    // Placeholder: sipariş verisi başka kaynaktan (localStorage/API) yönetilebilir
    if (window.showToast) showToast('Sipariş durumu: ' + status, 'success');
    return true;
  }

  /**
   * Ürün ekle formunu başlat (form id veya form element).
   */
  function initProductForm(formSelector) {
    var form = typeof formSelector === 'string' ? document.querySelector(formSelector) : formSelector;
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"], #admin-product-name, input[placeholder*="Ürün adı"]') || {}).value;
      var category = (form.querySelector('[name="category"], #admin-kategori') || {}).value;
      var description = (form.querySelector('[name="description"], textarea[placeholder*="Açıklama"]') || {}).value;
      var price = (form.querySelector('[name="price"], input[placeholder="Fiyat"]') || {}).value;
      var salePrice = (form.querySelector('[name="salePrice"], input[placeholder*="İndirimli"]') || {}).value;
      var stock = (form.querySelector('[name="stock"], input[placeholder*="Stok"]') || {}).value;

      if (!name || !category) {
        if (window.showToast) showToast('Ürün adı ve kategori zorunludur.', 'error');
        return;
      }

      var product = addProduct({
        name: name,
        category: category,
        description: description,
        price: price,
        salePrice: salePrice,
        stock: stock
      });
      if (window.showToast) showToast('Ürün eklendi. (ID: ' + product.id + ')', 'success');
      form.reset();
    });
  }

  window.getStoredProducts = getStoredProducts;
  window.addProduct = addProduct;
  window.deleteProduct = deleteProduct;
  window.updateProduct = updateProduct;
  window.updateStock = updateStock;
  window.updateOrderStatus = updateOrderStatus;
  window.initProductForm = initProductForm;
})();
