<p align="center">
  <img src="https://img.shields.io/badge/Global%20Game%20Jam-2026-ff6b6b?style=for-the-badge&logo=gamepad&logoColor=white" alt="GGJ 2026"/>
  <img src="https://img.shields.io/badge/Made%20with-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron"/>
</p>

<h1 align="center">🎭 Masquerade</h1>

<p align="center">
  <strong>✨ Maskeli Balo Maske Giydirme Oyunu ✨</strong>
</p>

<p align="center">
  <em>Global Game Jam 2026 için geliştirilmiş, pixel-art tarzında eğlenceli bir maske giydirme deneyimi!</em>
</p>

---

## 🌟 Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🦋 **6 Benzersiz Maske** | Kelebek, Venedik, Tüylü, Altın, Gümüş ve Mistik maskeler |
| 🎵 **Özel Ses Efektleri** | Her maske için Web Audio API ile sentezlenmiş benzersiz sesler |
| 🖱️ **Sürükle-Bırak** | Maskeleri karaktere sürükleyerek takabilirsiniz |
| ⌨️ **Klavye Kısayolları** | 1-6 tuşları ile hızlı maske seçimi |
| 👁️ **Canlı Karakterler** | Gözler fare imlecini takip eder |
| 📱 **Dokunmatik Destek** | Mobil cihazlarda da çalışır |
| ✨ **Animasyonlar** | Maske takma/çıkarma efektleri |

---

## 🎮 Oynanış

<div align="center">

```
┌─────────────────────────────────────────┐
│                                         │
│           ✨ Maskeli Balo ✨            │
│                                         │
│            ┌─────────────┐              │
│            │  👤 + 🎭    │              │
│            │  Karakter   │              │
│            └─────────────┘              │
│                                         │
│   🦋  🎭  🪶  ✨  ⭐  🌙               │
│  Kelebek Venedik Tüylü Altın Gümüş Mistik│
│                                         │
└─────────────────────────────────────────┘
```

</div>

### 🕹️ Kontroller

| Kontrol | Eylem |
|---------|-------|
| `Tıklama` | Maske seç ve tak |
| `Sürükle-Bırak` | Maskeyi karaktere sürükle |
| `1-6` Tuşları | Hızlı maske seçimi |
| `ESC / Delete` | Maskeyi çıkar |

---

## 🚀 Kurulum

### Ön Gereksinimler

- [Node.js](https://nodejs.org/) (v16 veya üzeri)
- npm veya yarn

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/KULLANICI_ADI/masquerade-game.git

# 2. Proje klasörüne gidin
cd masquerade-game

# 3. Bağımlılıkları yükleyin
npm install

# 4. Tarayıcıda çalıştırın
npm run dev

# VEYA Electron uygulaması olarak çalıştırın
npm run electron
```

---

## 📦 Build Etme

### macOS için (.dmg)
```bash
npm run build:mac
```

### Windows için (.exe)
```bash
npm run build:win
```

> 📁 Build dosyaları `dist/` klasöründe oluşturulur.

---

## 📋 Tüm Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm install` | 📦 Bağımlılıkları yükle (ilk kurulumda gerekli) |
| `npm run dev` | 🌐 Tarayıcıda çalıştır (http://localhost:3000) |
| `npm run electron` | 🖥️ Electron masaüstü uygulaması olarak çalıştır |
| `npm run build:mac` | 🍎 macOS için .dmg dosyası oluştur |
| `npm run build:win` | 🪟 Windows için .exe dosyası oluştur |

> 💡 **İpucu:** Sunucuyu durdurmak için terminalde `Ctrl + C` tuşlarına basın.

---

## 🎨 Maske Koleksiyonu

<table>
  <tr>
    <td align="center">🦋<br><strong>Kelebek</strong><br><em>Hafif, uçuşan sesler</em></td>
    <td align="center">🎭<br><strong>Venedik</strong><br><em>Zarif akor sesleri</em></td>
    <td align="center">🪶<br><strong>Tüylü</strong><br><em>Yumuşak hışırtı</em></td>
  </tr>
  <tr>
    <td align="center">✨<br><strong>Altın</strong><br><em>Metalik çınlama</em></td>
    <td align="center">⭐<br><strong>Gümüş</strong><br><em>Kristal sesler</em></td>
    <td align="center">🌙<br><strong>Mistik</strong><br><em>Büyülü, eteryal tonlar</em></td>
  </tr>
</table>

---

## 🛠️ Teknolojiler

```
├── HTML5          → Yapı
├── CSS3           → Pixel-art tasarım & animasyonlar
├── JavaScript     → Oyun mantığı
├── Web Audio API  → Sentezlenmiş ses efektleri
└── Electron       → Desktop uygulama
```

---

## 🎮 Global Game Jam 2026

<div align="center">

Bu proje **Global Game Jam 2026** için geliştirilmiştir.

<img src="https://img.shields.io/badge/🎮_GGJ_2026-Katılımcı-ff6b6b?style=flat-square" alt="GGJ 2026"/>

**Tema:** *[Jam Teması]*

</div>

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! 

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. Pull Request açın

---

<div align="center">

**Made with ❤️ for Global Game Jam 2026**

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐

</div>
