# 🛒 E-Ticaret Tema Geliştirme — AI Emir & Kural Listesi

> **Amaç:** HTML + CSS + JS ile modern, modüler ve responsive e-ticaret teması geliştirmek.  
> **Referans Platformlar:** Amazon · Trendyol · Hepsiburada  
> **Mimari:** Atomic CSS · Modüler JS · Ortak Component Sistemi

## Proje Klasör Yapısı

```
/proje/
├── index.html
├── assets/css/root.css
├── assets/js/common.js
├── assets/css/{layout,components,responsive}.css
├── components/{header,footer,product-card}.html
├── pages/{giyim,market,esya,...}/
├── user/
├── admin/
└── auth/
```

## Öncelik Sırası

1. root.css — Tüm değişkenler
2. Ortak CSS (layout, components, responsive)
3. Header & Footer
4. Ana sayfa bölümleri
5. Kategori sayfaları (filtre, sıralama)
6. Ürün detay (varyant, sekmeler)
7. Sepet & Checkout
8. Kullanıcı & Admin paneli

## AI Kodlama Kuralları

- root.css ÖNCE — sabit renk/px yazma
- Her sayfa kendi .css ve .js
- Ortak componentler tek dosyada
- Sepet: localStorage key = "eticaret_cart"
- Mobil-first, min 44px tıklanabilir alan
