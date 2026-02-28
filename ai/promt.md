# 🛒 E-Ticaret Tema Geliştirme — AI Emir & Kural Listesi

> **Amaç:** HTML + CSS + JS ile modern, modüler ve responsive e-ticaret teması geliştirmek.  
> **Referans Platformlar:** Amazon · Trendyol · Hepsiburada  
> **Mimari:** Atomic CSS · Modüler JS · Ortak Component Sistemi

---

## 📋 İÇİNDEKİLER

1. [Proje Klasör Yapısı](#1-proje-klasör-yapısı)
2. [Root.css — Ortak Tasarım Sistemi](#2-rootcss--ortak-tasarım-sistemi)
3. [Ortak CSS Dosyaları](#3-ortak-css-dosyaları)
4. [Header & Footer](#4-header--footer)
5. [Ana Sayfa](#5-ana-sayfa)
6. [Kategori Sayfaları](#6-kategori-sayfaları)
7. [Ürün Detay Sayfası](#7-ürün-detay-sayfası)
8. [Sepet & Sipariş](#8-sepet--sipariş)
9. [Kullanıcı Paneli — /user/](#9-kullanıcı-paneli--user)
10. [Admin Paneli — /admin/](#10-admin-paneli--admin)
11. [Ürün Türleri Mimari](#11-ürün-türleri-mimari)
12. [JavaScript Dosyaları](#12-javascript-dosyaları)
13. [Responsive Kurallar](#13-responsive-kurallar)
14. [İleri Seviye Özellikler](#14-i̇leri-seviye-özellikler)
15. [Performans Emirleri](#15-performans-emirleri)
16. [AI Kodlama Kuralları](#16-ai-kodlama-kuralları)
17. [Öncelik Sırası](#17-öncelik-sırası)

---

## 1. Proje Klasör Yapısı

```
/proje/
│
├── index.html                  ← Ana sayfa
├── root.css                    ← Tüm CSS değişkenleri (tek merkezden yönetim)
├── common.js                   ← Ortak JS fonksiyonları
│
├── assets/
│   ├── css/
│   │   ├── layout.css          ← Header, footer, grid, container
│   │   ├── components.css      ← Buton, kart, input, modal, badge
│   │   └── responsive.css      ← Mobil / tablet / desktop kurallar
│   ├── js/
│   │   ├── slider.js
│   │   ├── modal.js
│   │   ├── cart.js
│   │   ├── search.js
│   │   └── filter.js
│   └── img/
│
├── components/                 ← Yeniden kullanılabilir parçalar
│   ├── header.html
│   ├── footer.html
│   └── product-card.html
│
├── pages/
│   ├── giyim/
│   │   ├── index.html
│   │   ├── giyim.css
│   │   └── giyim.js
│   ├── market/
│   ├── esya/
│   ├── ikinci_el/
│   ├── hesap/
│   ├── kupon/
│   ├── altin/
│   └── maden/
│
├── user/
│   ├── index.html              ← Dashboard
│   ├── profil.html
│   ├── siparisler.html
│   ├── favoriler.html
│   ├── adresler.html
│   ├── kuponlar.html
│   └── hesaplarim.html
│
└── admin/
    ├── index.html              ← Dashboard
    ├── urunler.html
    ├── stok.html
    ├── siparisler.html
    ├── kullanicilar.html
    └── finans.html
```

### ✅ Mimari Kurallar

- Her sayfa **kendi `.css` ve `.js` dosyasına** sahip olmalı
- Ortak stiller sadece `root.css` ve `assets/css/` içinde tanımlanmalı
- `components/` klasöründeki HTML parçaları `fetch()` veya `include` ile sayfaya eklenmeli
- `root.css` hiçbir zaman sayfa özel kural içermemeli

---

## 2. Root.css — Ortak Tasarım Sistemi

> **Kural:** Tüm renkler, fontlar, boşluklar ve efektler buradan yönetilir. Hiçbir sayfada sabit renk/boyut değeri yazılmaz.

```css
:root {
  /* ─── RENKLER ─── */
  --ana-renk:        #ff6000;   /* Turuncu — marka rengi */
  --ana-hover:       #e55500;
  --arka:            #f5f5f5;   /* Sayfa arka planı */
  --yazi:            #222222;
  --yazi-acik:       #666666;
  --beyaz:           #ffffff;
  --gri:             #888888;
  --gri-acik:        #f0f0f0;
  --border:          #dddddd;
  --hata:            #e53935;
  --basari:          #43a047;
  --uyari:           #fb8c00;

  /* ─── DARK MODE ─── */
  --dk-arka:         #0f0f0f;
  --dk-surface:      #1a1a1a;
  --dk-yazi:         #e8e8e8;
  --dk-border:       #2a2a2a;

  /* ─── FONTlar ─── */
  --font:            'Nunito', Arial, sans-serif;
  --font-mono:       'Courier New', monospace;
  --font-size-xs:    11px;
  --font-size-sm:    13px;
  --font-size-base:  15px;
  --font-size-lg:    18px;
  --font-size-xl:    24px;
  --font-size-2xl:   32px;

  /* ─── BOŞLUKLAR ─── */
  --padding-xs:      4px;
  --padding-sm:      8px;
  --padding:         12px;
  --padding-md:      16px;
  --padding-lg:      24px;
  --padding-xl:      40px;

  --margin-xs:       4px;
  --margin-sm:       8px;
  --margin:          12px;
  --margin-md:       16px;
  --margin-lg:       24px;
  --margin-xl:       40px;

  /* ─── BORDER & RADIUS ─── */
  --radius-sm:       4px;
  --radius:          8px;
  --radius-lg:       12px;
  --radius-xl:       20px;
  --radius-full:     9999px;

  /* ─── SHADOW ─── */
  --shadow-sm:       0 1px 4px rgba(0,0,0,0.08);
  --shadow:          0 2px 10px rgba(0,0,0,0.12);
  --shadow-lg:       0 8px 30px rgba(0,0,0,0.18);
  --shadow-hover:    0 4px 20px rgba(255,96,0,0.2);

  /* ─── TRANSITION ─── */
  --transition:      all 0.2s ease;
  --transition-fast: all 0.12s ease;

  /* ─── LAYOUT ─── */
  --container-max:   1280px;
  --header-height:   64px;
  --sidebar-width:   240px;
}
```

---

## 3. Ortak CSS Dosyaları

### 3.1 `assets/css/layout.css`

```
[ ] .container        → max-width: var(--container-max), margin: 0 auto, padding: 0 16px
[ ] .header           → position sticky, height var(--header-height), z-index 100
[ ] .footer           → background koyu, padding büyük
[ ] .main-grid        → display grid, template: sidebar + içerik
[ ] .page-wrapper     → min-height 100vh, display flex, flex-direction column
[ ] .section          → padding dikey: var(--padding-xl)
[ ] .grid-4           → grid-template-columns: repeat(4, 1fr)
[ ] .grid-3           → grid-template-columns: repeat(3, 1fr)
[ ] .grid-2           → grid-template-columns: repeat(2, 1fr)
```

### 3.2 `assets/css/components.css`

```
[ ] .btn              → temel buton stili
[ ] .btn-primary      → var(--ana-renk) arka plan
[ ] .btn-outline      → border var(--ana-renk), şeffaf arka plan
[ ] .btn-sm / .btn-lg → boyut varyantları
[ ] .card             → border, radius, shadow, arka beyaz
[ ] .card:hover       → shadow-lg, transform translateY(-2px)
[ ] .input            → border, radius, padding, focus state
[ ] .badge            → küçük etiket (indirim, yeni, stok son)
[ ] .modal            → overlay + içerik kutusu
[ ] .modal-overlay    → fixed, full screen, rgba arka
[ ] .product-card     → resim + bilgi alanı + sepete ekle
[ ] .skeleton         → loading animasyonu (shimmer effect)
[ ] .breadcrumb       → > ayraçlı navigasyon
[ ] .pagination       → sayfa numaraları
[ ] .rating           → yıldız değerlendirme
[ ] .tag              → kategori etiketi
[ ] .tooltip          → hover açıklama
[ ] .alert            → bilgi / hata / uyarı kutusu
```

### 3.3 `assets/css/responsive.css`

```css
/* Mobil — tek kolon */
@media (max-width: 576px) {
  .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .header-menu { display: none; }
  .hamburger { display: flex; }
}

/* Tablet — iki kolon */
@media (min-width: 577px) and (max-width: 992px) {
  .grid-4, .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop — dört kolon */
@media (min-width: 993px) {
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 4. Header & Footer

### 4.1 Header — `components/header.html`

```
Üst çubuk (isteğe bağlı):
  [ ] Kargo bilgisi / kampanya mesajı (ince şerit, renkli)

Ana header — sticky, sayfada kalır:
  [ ] Logo (sol)
  [ ] Kategori seçimli arama kutusu (Amazon tarzı, ortalanmış)
      → <select>Kategori</select> + <input> + <button>🔍</button>
  [ ] Sağ grup:
      [ ] Favorilerim (ikon + sayı badge)
      [ ] Sepetim (ikon + ürün sayısı badge)
      [ ] Giriş Yap / Üye Ol

Alt menü — kategori navı:
  [ ] Giyim | Market | Eşya | İkinci El | Hesap | Kupon | Altın | Maden
  [ ] Hover'da dropdown açılmalı
```

### 4.2 Footer — `components/footer.html`

```
[ ] 4 kolonlu grid:
    KOL 1 → Logo + kısa açıklama + sosyal medya ikonları
    KOL 2 → Kurumsal: Hakkımızda, İletişim, Kariyer, Basın
    KOL 3 → Yardım: SSS, Kargo, İade, Gizlilik
    KOL 4 → Ödeme yöntemleri logoları + güven mühürleri
[ ] Alt şerit → telif hakkı metni
[ ] Mobilde tek kolon, accordion açılır
```

---

## 5. Ana Sayfa

### `index.html` İçerik Sırası

```
1. [ ] HERO SLIDER
       → Otomatik geçiş (3-5 sn), ok butonları, nokta indikatörler
       → Tam genişlik, yükseklik ~420px
       → slider.js ile kontrol

2. [ ] KATEGORİ BLOKU
       → 7-8 ikon + isim kutucuğu, yatay scroll (mobil)
       → Giyim / Market / Eşya / İkinci El / Hesap / Kupon / Altın / Maden

3. [ ] KAMPANYA BANERLARI
       → 2'li veya 3'lü yan yana büyük banner görseller

4. [ ] VİTRİN — En Çok Satanlar
       → Ürün kartı grid (4 kolon), başlık + "Tümünü Gör" linki

5. [ ] FLASH İNDİRİM (opsiyonel)
       → Geri sayım sayacı + indirimli ürünler

6. [ ] YENİ GELENLER
       → Ürün kartı grid (4 kolon)

7. [ ] ORTA BANNER
       → Tek büyük kampanya görseli

8. [ ] ÖNERİLEN KATEGORİLER
       → Her kategori için 4'lü mini vitrin

9. [ ] FOOTER
```

---

## 6. Kategori Sayfaları

### Her Kategori İçin Dosyalar

```
pages/{kategori}/
  ├── index.html      ← Ürün listesi
  ├── {kategori}.css  ← Sayfaya özel stiller
  ├── {kategori}.js   ← Sayfaya özel JS (filtre, sıralama)
  └── urun-detay.html ← Ürün detay sayfası
```

### Sayfa Yapısı

```
[ ] BREADCRUMB: Ana Sayfa > Giyim > Erkek > Ayakkabı

[ ] SOL PANEL — Filtre (sidebar)
    [ ] Fiyat aralığı (range input)
    [ ] Marka checkboxları (arama destekli)
    [ ] Kategori alt dalları
    [ ] Renk seçici (renkli kutucuklar)
    [ ] Beden seçici (giyim için)
    [ ] Durum filtresi (ikinci el için)
    [ ] Puan filtresi (yıldız)
    [ ] "Filtreleri Temizle" butonu
    [ ] Mobilde filtre → overlay/drawer olarak açılır

[ ] SAĞ ALAN — Ürün Listesi
    [ ] Üst bar: "X ürün bulundu" + sıralama dropdown
        Sıralama: Önerilen | Fiyat ↑ | Fiyat ↓ | En Yeni | En Çok Satan | Puana Göre
    [ ] Grid: 4 kolon (desktop) / 2 (tablet) / 1 (mobil)
    [ ] Her ürün kartı:
        → Ürün resmi (hover'da 2. görsel)
        → İndirim badge (kırmızı, % ile)
        → Favori ikon (sağ üst)
        → Ürün adı (2 satır max, ellipsis)
        → Marka adı
        → Orijinal fiyat (üstü çizgili) + indirimli fiyat
        → Puan (yıldız) + kaç değerlendirme
        → Kargo bilgisi (ücretsiz badge)
        → "Sepete Ekle" butonu
    [ ] Sayfalama (pagination) veya infinite scroll
```

---

## 7. Ürün Detay Sayfası

### `pages/{kategori}/urun-detay.html`

```
[ ] BREADCRUMB

[ ] ANA İÇERİK — 2 kolon:

    SOL KOLON:
    [ ] Ana ürün görseli (büyük)
    [ ] Zoom özelliği (hover'da mercek efekti)
    [ ] Thumbnail galeri (küçük resimler altta)
    [ ] Resim geçiş animasyonu

    SAĞ KOLON:
    [ ] Marka adı (tıklanabilir link)
    [ ] Ürün adı (h1, büyük)
    [ ] Puan + değerlendirme sayısı
    [ ] ─────────────────────────
    [ ] Fiyat alanı:
        → Eski fiyat (üstü çizgili, gri)
        → Yeni fiyat (büyük, kırmızı/turuncu)
        → İndirim yüzdesi (badge)
    [ ] ─────────────────────────
    [ ] Stok durumu (Stokta / Son X ürün / Tükendi)
    [ ] Varyant seçimi (Beden / Renk / Kapasite — kategoriye göre)
    [ ] Adet seçici (- / sayı / +)
    [ ] "Sepete Ekle" butonu (büyük, ana renk)
    [ ] "Hemen Satın Al" butonu (ikincil)
    [ ] "❤ Favorilere Ekle" linki
    [ ] ─────────────────────────
    [ ] Kargo bilgisi (tahmini teslimat tarihi)
    [ ] İade garantisi
    [ ] Satıcı bilgisi

[ ] ALT SEKME PANELİ:
    [ ] Açıklama
    [ ] Teknik Özellikler (tablo formatı)
    [ ] Yorumlar & Değerlendirmeler
        → Ortalama puan + dağılım grafik
        → Yorum listesi (sayfalı)
        → Yorum yazma formu (giriş zorunlu)

[ ] BENZER ÜRÜNLER (carousel / grid)
```

---

## 8. Sepet & Sipariş

### `cart.html`

```
[ ] 2 KOLON DÜZENİ:

    SOL — Ürün Listesi:
    [ ] Her satır:
        → Ürün resmi (küçük)
        → Ürün adı + varyant bilgisi
        → Birim fiyat
        → Adet değiştir (- / n / +)
        → Satır toplamı
        → Sil butonu (×)
    [ ] "Alışverişe Devam Et" linki
    [ ] Kupon kodu giriş alanı

    SAĞ — Sipariş Özeti:
    [ ] Ürünlerin toplamı: X TL
    [ ] İndirim: -Y TL
    [ ] Kargo: Ücretsiz / Z TL
    [ ] ─────────────────────
    [ ] TOPLAM: (büyük, belirgin)
    [ ] "Siparişi Tamamla" butonu (büyük, ana renk)

[ ] BOŞKEN: "Sepetiniz boş" görseli + "Alışverişe Başla" butonu
```

### `checkout.html` — Sipariş Tamamlama

```
[ ] ADIM GÖSTERGE (1 → 2 → 3):
    Adres → Ödeme → Onay

[ ] ADIM 1 — Adres Seç:
    [ ] Kayıtlı adresler listesi (radio)
    [ ] "Yeni Adres Ekle" formu
    [ ] İl / İlçe / Adres / Posta Kodu alanları

[ ] ADIM 2 — Ödeme:
    [ ] Kredi/banka kartı (kart numarası, CVV, son kullanma)
    [ ] Kapıda ödeme seçeneği
    [ ] Havale/EFT seçeneği

[ ] ADIM 3 — Onay:
    [ ] Sipariş özeti
    [ ] "Siparişi Onayla" butonu
    [ ] Onay sonrası teşekkür sayfası
```

---

## 9. Kullanıcı Paneli — `/user/`

### Sayfa Listesi

```
user/
  ├── index.html        ← Dashboard
  ├── profil.html       ← Bilgi düzenleme
  ├── siparisler.html   ← Sipariş geçmişi
  ├── favoriler.html    ← Favori ürünler
  ├── adresler.html     ← Adres yönetimi
  ├── kuponlar.html     ← Kupon cüzdanı
  └── hesaplarim.html   ← Bakiye / ödeme yöntemleri
```

### Dashboard — `user/index.html`

```
[ ] SOL SIDEBAR (sabit menü):
    [ ] Profil fotoğrafı + isim
    [ ] Menü linkleri (aktif sayfa vurgulu)

[ ] SAĞ ALAN:
    [ ] Üst kartlar:
        → Toplam sipariş sayısı
        → Bekleyen sipariş
        → Favori sayısı
        → Bakiye

    [ ] Son 5 Sipariş tablosu:
        → Sipariş No | Tarih | Ürün | Tutar | Durum
        → Durum: badge renkleriyle (Hazırlanıyor, Kargoda, Teslim Edildi)

    [ ] Bildirimler listesi
```

### `user/siparisler.html`

```
[ ] Durum filtresi: Tümü | Bekliyor | Kargoda | Teslim | İptal
[ ] Her sipariş kartı:
    → Sipariş no + tarih
    → Ürün(ler) listesi (resim + ad)
    → Toplam tutar
    → Durum badge
    → "Detay Görüntüle" + "Tekrar Sipariş Ver" butonları
    → Kargo takip numarası (varsa)
```

---

## 10. Admin Paneli — `/admin/`

### Sayfa Listesi

```
admin/
  ├── index.html          ← Dashboard
  ├── urunler.html        ← Ürün listesi + ekle/düzenle/sil
  ├── urun-ekle.html      ← Yeni ürün formu
  ├── stok.html           ← Stok yönetimi
  ├── siparisler.html     ← Sipariş yönetimi
  ├── kullanicilar.html   ← Kullanıcı listesi
  └── finans.html         ← Gelir/gider raporları
```

### Dashboard — `admin/index.html`

```
[ ] Üst istatistik kartları:
    → Günlük Gelir | Toplam Sipariş | Yeni Üye | Stok Uyarıları

[ ] Satış grafiği (haftalık/aylık, çizgi grafik)

[ ] Son Siparişler tablosu (özet, 10 kayıt)

[ ] Düşük Stok Uyarıları listesi

[ ] Hızlı Erişim butonları:
    → Ürün Ekle | Sipariş Görüntüle | Kullanıcılar
```

### Ürün Yönetimi — `admin/urunler.html`

```
[ ] Arama + kategori filtresi
[ ] Tablo: ID | Resim | Ad | Kategori | Fiyat | Stok | Durum | İşlemler
[ ] İşlemler: Düzenle (✏) | Sil (🗑) | Pasif Yap
[ ] "Yeni Ürün Ekle" butonu (sayfanın üstü)
[ ] Toplu seçim + toplu işlem
```

### Ürün Ekleme — `admin/urun-ekle.html`

```
[ ] FORM ALANLARI:
    [ ] Ürün adı (text)
    [ ] Kategori seçimi (select — kategoriye göre ek alanlar dinamik açılır)
    [ ] Açıklama (textarea, zengin metin editörü)
    [ ] Ana fiyat + indirimli fiyat
    [ ] Stok adedi
    [ ] Resim yükleme (çoklu, sürükle-bırak)
    [ ] Etiketler

    KATEGORİYE ÖZEL ALANLAR (dinamik göster):
    Giyim    → Beden seçici | Renk | Marka
    Market   → Son kullanma tarihi | Ağırlık (gr/kg)
    İkinci El→ Durum (Sıfır/İyi/Orta/Kötü) | Hasar açıklaması
    Hesap    → Platform | Level | Rank | Ekran görüntüsü
    Kupon    → Geçerlilik tarihi | Kupon kodu | Kullanım limiti
    Altın    → Gram | Ayar (14/18/22)
    Maden    → Tür | Miktar | Birim

[ ] "Kaydet" + "Taslak Olarak Kaydet" butonları
```

### Stok Yönetimi — `admin/stok.html`

```
[ ] Stok listesi tablosu (tüm ürünler)
[ ] Düşük stok filtresi (5 altı / 10 altı)
[ ] Stok güncelleme modal:
    → Ürün seç | Miktar gir | Ekle/Çıkar
[ ] Stok hareket geçmişi log tablosu
```

### Sipariş Yönetimi — `admin/siparisler.html`

```
[ ] Durum filtreleri: Tümü | Bekliyor | Hazırlanıyor | Kargoda | Teslim | İptal
[ ] Arama: sipariş no veya müşteri adı
[ ] Her sipariş satırı:
    → Sipariş No | Müşteri | Tarih | Tutar | Durum | İşlemler
[ ] Durum güncelleme dropdown (tek tıkla)
[ ] Sipariş detay modal:
    → Ürün listesi, adres, ödeme bilgisi, kargo takip no girişi
```

### Finans — `admin/finans.html`

```
[ ] Tarih aralığı seçici
[ ] Özet kartlar: Toplam Gelir | Toplam Sipariş | Ortalama Sepet | İptal Oranı
[ ] Gelir grafiği (günlük/haftalık/aylık toggle)
[ ] Kategori bazlı gelir (pasta grafik)
[ ] Dışa aktar: Excel / CSV butonu
```

---

## 11. Ürün Türleri Mimari

Her kategorinin kendine özgü veri alanları vardır. Ürün formu kategoriye göre dinamik alan göstermelidir.

| Kategori    | Özel Alanlar |
|-------------|--------------|
| **Giyim**   | Beden (XS–3XL), Renk, Marka, Cinsiyet, Materyal |
| **Market**  | Son Kullanma Tarihi, Ağırlık (g/kg/L), Barkod |
| **Eşya**    | Boyut (cm), Materyal, Renk, Durum |
| **İkinci El** | Durum (Sıfır/İyi/Orta/Hasarlı), Hasar Açıklaması, Yaş |
| **Hesap**   | Platform, Level, Rank, Sunucu, Ekran Görüntüsü |
| **Kupon**   | Kupon Kodu, Geçerlilik Tarihi, Kullanım Limiti, İndirim Tipi |
| **Altın**   | Gram, Ayar (14/18/22/24), Tür (Bilezik/Küpe/Kolye) |
| **Maden**   | Tür, Miktar, Birim, Saflık Oranı |

---

## 12. JavaScript Dosyaları

### `common.js` — Her Sayfada Yüklenir

```javascript
// ─── MENÜ ───
toggleMenu()         // Hamburger menü aç/kapat
closeMenuOnOutside() // Dışa tıklamada menü kapat
initDropdowns()      // Kategori dropdown hover

// ─── MODAL ───
openModal(id)        // Modal aç
closeModal(id)       // Modal kapat
closeOnOverlay()     // Overlay tıklamasında kapat

// ─── BİLDİRİM ───
showToast(msg, type) // "Sepete eklendi!" gibi bildirim (success/error/warning)

// ─── YARDIMCI ───
formatPrice(n)       // 1000 → "1.000 TL"
formatDate(d)        // Tarih formatlama
debounce(fn, ms)     // Arama için debounce
```

### `assets/js/cart.js`

```javascript
addToCart(productId, qty, variant)   // Sepete ürün ekle
removeFromCart(productId)            // Ürünü sil
updateQty(productId, qty)            // Adedi güncelle
getCart()                            // Sepet verisi döndür
renderCartBadge()                    // Header'daki sepet sayısını güncelle
saveCart()                           // localStorage'a kaydet
loadCart()                           // localStorage'dan yükle
calcTotal()                          // Toplam hesapla
applyCoupon(code)                    // Kupon uygula
```

### `assets/js/slider.js`

```javascript
initSlider(selector, options)  // options: autoplay, interval, dots, arrows
nextSlide()
prevSlide()
goToSlide(index)
```

### `assets/js/filter.js`

```javascript
initFilter()          // Filtre panel başlat
applyFilters()        // Seçimleri URL parametresine yaz
resetFilters()        // Tümünü temizle
filterProducts(data)  // Client-side anlık filtre (AJAX olmadan)
sortProducts(type)    // fiyat / yeni / popüler
```

### `assets/js/search.js`

```javascript
initSearch()              // Arama kutusunu başlat
liveSearch(query)         // Yazarken öneri göster (debounce ile)
renderSuggestions(data)   // Dropdown öneri listesi
clearSearch()
```

### `pages/{kategori}/{kategori}.js`

```javascript
// Sayfaya özel: filtrelerin kategori alanlarını başlat
// Örnek: giyim.js → beden filtresi, renk filtresi
initCategoryFilters()
```

### `user/user.js`

```javascript
updateProfile(data)       // Profil kaydet
loadOrders()              // Siparişleri çek
toggleFavorite(productId) // Favori ekle/çıkar
loadFavorites()
```

### `admin/admin.js`

```javascript
addProduct(data)          // Ürün ekle (form submit)
deleteProduct(id)         // Ürün sil (onay dialog ile)
updateProduct(id, data)   // Ürün güncelle
updateStock(id, qty, op)  // Stok artır/azalt (op: 'add'|'sub')
updateOrderStatus(id, s)  // Sipariş durumu güncelle
renderChart(type, data)   // Grafik render (Chart.js ile)
exportCSV(data)           // Veri dışa aktar
```

---

## 13. Responsive Kurallar

### Kırılma Noktaları

| Cihaz   | Genişlik       | Kolon Sayısı | Sidebar       |
|---------|----------------|--------------|---------------|
| Mobil   | < 576px        | 1 kolon      | Gizli (drawer)|
| Tablet  | 577px – 992px  | 2 kolon      | Gizli (drawer)|
| Desktop | 993px – 1280px | 4 kolon      | Sabit sol     |
| Geniş   | > 1280px       | 4–5 kolon    | Sabit sol     |

### Mobil Özel Kurallar

```
[ ] Header: Logo ortalanır, menü hamburger ikonuna dönüşür
[ ] Arama kutusu tam genişliğe yayılır (ayrı satır veya açılır)
[ ] Kategori navigasyonu yatay kaydırılabilir scroll'a dönüşür
[ ] Filtre paneli → alt drawer (bottom sheet) olarak açılır
[ ] Ürün kartları tek kolon, tam genişlik
[ ] Ürün detay: resim üstte, bilgi altta (dikey düzen)
[ ] Sepet: özetin altında "Devam Et" sticky butonu
[ ] Footer: accordion (tıklanabilir alanlar açılır/kapanır)
[ ] Touch-friendly: buton min-height 44px
```

---

## 14. İleri Seviye Özellikler

### 14.1 Dark Mode

```css
/* root.css'e ekle */
[data-theme="dark"] {
  --arka:   var(--dk-arka);
  --beyaz:  var(--dk-surface);
  --yazi:   var(--dk-yazi);
  --border: var(--dk-border);
}
```

```javascript
// common.js
function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
// Sayfa yüklendiğinde kayıtlı temayı uygula
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

### 14.2 Skeleton Loading

```html
<!-- product-card.html içinde -->
<div class="skeleton-card">
  <div class="skeleton skeleton-img"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text short"></div>
  <div class="skeleton skeleton-btn"></div>
</div>
```

```css
/* components.css */
.skeleton {
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius);
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
```

### 14.3 Lazy Load (Resimler)

```html
<img src="placeholder.webp" data-src="urun.webp" class="lazy" alt="Ürün">
```

```javascript
// common.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.src = e.target.dataset.src;
      observer.unobserve(e.target);
    }
  });
});
document.querySelectorAll('img.lazy').forEach(img => observer.observe(img));
```

### 14.4 Infinite Scroll

```javascript
// filter.js
const scrollObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !isLoading) {
    loadMoreProducts();
  }
});
scrollObserver.observe(document.getElementById('scroll-sentinel'));
```

### 14.5 Ajax Filtre

```javascript
// filter.js
async function applyFilters() {
  const params = new URLSearchParams(getActiveFilters());
  history.pushState(null, '', '?' + params); // URL güncelle
  showSkeletons();
  const data = await fetch(`/api/products?${params}`).then(r => r.json());
  renderProducts(data);
}
```

---

## 15. Performans Emirleri

### Resim Optimizasyonu

```
[ ] Tüm görseller WebP formatında olmalı
[ ] Ürün küçük resimleri: 300×300px (liste görünümü)
[ ] Ürün büyük resimleri: 800×800px (detay sayfası)
[ ] Banner görseller: 1280×420px
[ ] srcset ile farklı ekran yoğunlukları için varyant
[ ] <img loading="lazy"> tüm liste görsellerinde
[ ] Alt özelliği her görselde dolu olmalı (SEO)
```

### CSS / JS Optimizasyonu

```
[ ] Yayın ortamında: style.min.css, common.min.js kullan
[ ] Kritik CSS (above-the-fold) → <style> içine inline al
[ ] Tüm JS dosyaları <script defer> ile yüklenmeli
[ ] CSS @import kullanma → <link> ile yükle
[ ] Kullanılmayan CSS kurallarını kaldır (PurgeCSS)
[ ] Büyük JS kütüphanelerini CDN'den yükle (cache avantajı)
```

### Genel Performans

```
[ ] Google PageSpeed Insights: hedef 85+ puan
[ ] Cache-Control header: statik dosyalar için uzun süre
[ ] Gzip / Brotli sıkıştırma sunucuda aktif
[ ] HTML içinde fazla whitespace kaldır (üretimde)
[ ] Font yükleme: font-display: swap ekle
```

---

## 16. AI Kodlama Kuralları

> Bu kurallar yapay zekaya kod yazdırırken verilecek emirlerde uyulması gereken standartlardır.

### 🔴 Zorunlu Kurallar

```
1. root.css ÖNCE oluşturulacak — hiçbir sayfada sabit renk/px değeri yazılmayacak
2. Her sayfa kendi .css ve .js dosyasına sahip olacak
3. Ortak componentler (header, footer, ürün kartı) tek dosyada tanımlanacak
4. Tüm buton, kart, input stilleri components.css'ten gelecek
5. JavaScript DOM manipülasyonu querySelector ile yapılacak (id > class tercih)
6. Fonksiyon isimleri Türkçe anlam taşıyan İngilizce olacak (addToCart, showModal)
7. Her JS fonksiyonu tek bir iş yapacak (Single Responsibility)
8. Sepet verisi localStorage'da tutulacak: key = "eticaret_cart"
9. Form validasyonu her zaman hem frontend (anlık) hem de mantıksal kontrol içerecek
10. Mobil-first yaklaşım: önce mobil tasarla, sonra büyük ekran için genişlet
```

### 🟡 Kalite Kuralları

```
11. Sayfa ilk yüklendiğinde skeleton loading gösterilecek
12. Sepete ekleme / silme işlemlerinde toast bildirimi çıkacak
13. Resimler data-src ile lazy load edilecek
14. Filtre ve sıralama değişikliklerinde URL parametresi güncellenecek
15. Dark mode toggle her sayfada çalışacak, tercih localStorage'a kaydedilecek
16. Tüm tıklanabilir elementler min 44px yükseklikte olacak (mobil uyum)
17. Focus outline kaldırılmayacak (erişilebilirlik)
18. Önemli elementlere aria-label eklenecek
19. Sayfa <title> ve <meta description> dolu olacak (SEO)
20. Konsolda hata olmamalı — her fetch işlemi try/catch içinde
```

### 🟢 AI'ya Emir Yazma Şablonu

```
KURAL: Her kod isteği şu formatta verilecek:

"[DOSYA ADI] dosyasını oluştur.
Bağımlılıklar: root.css, layout.css, components.css
Görev: [Ne yapacağı]
İçermeli: [Liste]
İçermemeli: [Yasak şeyler]
Stil: Modern, temiz, var() kullan, sabit değer yazma"
```

**Örnek Emir:**

```
"pages/giyim/index.html dosyasını oluştur.
Bağımlılıklar: ../../root.css, ../../assets/css/layout.css,
               ../../assets/css/components.css, ../../assets/css/responsive.css,
               giyim.css
Görev: Giyim kategori sayfası — filtreli ürün listesi
İçermeli:
  - Breadcrumb (Ana Sayfa > Giyim)
  - Sol filtre paneli (fiyat, marka, beden, renk)
  - 4 kolonlu ürün grid (data-src ile lazy load resimler)
  - Sıralama dropdown
  - Sayfa altında pagination
İçermemeli:
  - Sabit renk değerleri (#xxx)
  - Inline style
  - Sayfa özel CSS (giyim.css'e gidecek)
Stil: root.css değişkenlerini kullan, mobil-first responsive"
```

---  