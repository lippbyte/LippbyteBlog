# DevLog CMS — Panduan Setup

Blog statis dengan admin panel berbasis GitHub API.
Tulis konten di browser → otomatis tersimpan ke GitHub → tampil di blog.

---

## 📁 Struktur File Baru

```
devlog/
├── index.html                  ← Halaman utama (sudah ada)
├── admin/
│   └── index.html              ← ✨ Panel admin (BARU)
├── data/
│   ├── topics.json             ← ✨ Daftar semua topik blog
│   └── laravel/
│       └── parts.json          ← ✨ Konten semua part Laravel
├── blog/
│   └── laravel/
│       └── index.html          ← ✨ Halaman blog (fetch otomatis dari JSON)
└── assets/
    ├── css/style.css
    └── js/main.js
```

---

## 🚀 Cara Setup (5 langkah)

### Langkah 1 — Upload semua file ke GitHub repo

Pastikan struktur folder di atas sudah ada di repo lo.
Commit dan push semua file termasuk `data/laravel/parts.json`.

### Langkah 2 — Buat Personal Access Token

1. Buka: https://github.com/settings/tokens/new
2. Beri nama: `devlog-admin`
3. Centang scope: **repo** (full control)
4. Klik "Generate token"
5. **Copy token-nya sekarang** — tidak bisa dilihat lagi setelah halaman ditutup

### Langkah 3 — Setup Admin Panel

1. Buka `admin/index.html` di browser
   - Local: buka file langsung (`file:///...`)
   - Online: `https://username.github.io/devlog/admin/`
2. Isi form setup:
   - **Username**: username GitHub lo
   - **Repository**: nama repo (misal: `devlog`)
   - **Branch**: `main`
   - **Token**: paste token dari langkah 2
3. Klik "Simpan & Lanjutkan"

### Langkah 4 — Update rawBase di blog reader

Buka `blog/laravel/index.html`, cari bagian `CONFIG`:

```javascript
const CONFIG = {
  topicId: ...,
  rawBase: '', // ← GANTI INI
};
```

Ganti `rawBase` dengan:
```javascript
rawBase: 'https://raw.githubusercontent.com/USERNAME/REPO/main/',
```

Ganti `USERNAME` dan `REPO` sesuai milik lo.

### Langkah 5 — Deploy ke GitHub Pages

1. Buka Settings repo → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Klik Save
5. Tunggu beberapa menit, akses di `https://username.github.io/devlog/`

---

## ✍️ Cara Nulis Blog

1. Buka `admin/index.html`
2. Pilih topik di sidebar kiri
3. Klik "**+ Tambah**" untuk part baru, atau klik part yang sudah ada
4. Tulis konten dalam **Markdown** di editor kiri
5. Preview langsung tampil di kanan
6. Isi metadata di panel kanan: judul, label, tipe, tujuan pembelajaran, refleksi, referensi, tags
7. Klik **"Publish ke GitHub"**
8. Selesai! Blog otomatis update dalam ~1 menit

---

## 📝 Format Markdown yang Didukung

```markdown
## Heading 2       ← jadi H2 di blog
### Heading 3      ← jadi H3

**bold text**
*italic text*
`inline code`

- bullet list
1. numbered list

```php
// code block dengan syntax highlight
echo 'Hello Laravel!';
```

> blockquote / catatan penting

| Kolom 1 | Kolom 2 |
|---------|---------|
| Data    | Data    |
```

---

## ➕ Cara Tambah Topik Blog Baru (misal: Python)

1. Buat folder: `data/python/`
2. Buat file: `data/python/parts.json` dengan struktur:
```json
{
  "topic": "python",
  "title": "Dokumentasi Belajar Python",
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "parts": []
}
```
3. Buat folder: `blog/python/`
4. Copy `blog/laravel/index.html` ke `blog/python/index.html`
5. Di file baru, ubah `topicId` di CONFIG:
```javascript
topicId: new URLSearchParams(location.search).get('topic') || 'python',
```
6. Tambah entry di `data/topics.json`
7. Tambah card di `index.html` root
8. Commit & push

---

## 🔒 Keamanan Token

- Token **hanya disimpan di localStorage browser lo** — tidak dikirim ke server manapun selain api.github.com
- Jangan buka `admin/index.html` di komputer orang lain tanpa logout (hapus localStorage)
- Kalau mau lebih aman, set expiration pada token saat dibuat di GitHub
- **Jangan pernah hardcode token di dalam kode** yang di-push ke repo

---

*DevLog CMS — GitHub API Edition*
