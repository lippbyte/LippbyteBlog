# Lippbyte-blog — Panduan Penggunaan Template Blog

Struktur project web jurnal/blog personal untuk mendokumentasikan perjalanan belajar.

---

## 📁 Struktur Folder

```text
Lippbyte-blog/
├── README.md                 ← File panduan ini
├── home/
│   ├── index.html            ← Halaman utama (profil + daftar blog)
│   └── assets/
│       ├── css/
│       │   └── style.css     ← CSS global untuk halaman utama (Mendukung Dark Mode)
│       ├── js/
│       │   └── main.js       ← JS global (tema dark mode, filter, dll)
│       └── img/
│           └── about.jpeg, profile.jpeg ← Foto profil kamu
│
└── blog/
    ├── template/
    │   ├── index.html        ← Template kosong — duplikasi ini untuk pembuatan dokumentasi blog baru
    │   ├── css/style.css     ← CSS khusus halaman dokumentasi blog
    │   └── js/main.js        ← JS khusus dokumentasi (progress bar, dsb)
    │
    └── laravel-blog/
        ├── index.html        ← Blog Dokumentasi Laravel (sudah lengkap sebagai contoh)
        ├── css/              ← CSS khusus halaman Laravel
        ├── js/               ← JS khusus halaman Laravel
        └── img/              ← Gambar khusus blog Laravel
```

---

## 🚀 Cara Menambah Blog Baru

### 1. Duplikasi folder template
```text
Salin seluruh folder:  blog/template/
Rename menjadi:        blog/python/   (atau nama topik lainnya)
```

### 2. Edit blog/python/index.html
Cari dan ganti semua placeholder:
- Judul topik, bagian-bagian dokumentasi, dll.
- Sesuaikan link navigasi 'Kembali ke Beranda' jika perlu.

### 3. Tambah card di home/index.html
Buka `home/index.html` dan cari bagian `.blog-grid`. Duplikasi salah satu `.blog-card` dan tautkan ke `../blog/python/index.html`.

### 4. Simpan gambar konten
- Simpan screenshot, diagram, atau foto untuk konten blog ke folder `img/` di dalam folder blog baru.
- Panggil di HTML dengan: `<img src="img/nama-file.png" alt="...">`

---

## ✏️ Cara Mengisi Konten

### Menambah Part baru
Di dalam `<main class="main-content">`, duplikasi salah satu `<section class="part-section">` dan:
1. Ganti `id="partX"` dengan nomor / id yang sesuai
2. Tambah item navigasi baru di sidebar (`<li>` di `#partNav`) beserta sub-menunya.
3. Isi konten dokumentasi secara runut.

### Elemen yang tersedia
| Elemen | Class / Deskripsi |
|--------|-------------------|
| Tujuan belajar | `.objectives-box` (Kotak info di atas konten) |
| Code block | `.code-block` (Dilengkapi highlight ala macOS style) |
| Catatan | `.callout.callout-note` (Biru) |
| Peringatan | `.callout.callout-warn` (Kuning) |
| Tips | `.callout.callout-tip` (Hijau) |
| Refleksi | `.reflection-box` (Review materi di akhir part) |
| Referensi | `.references-box` (Tabel daftar sumber belajar) |
| Tags | `.tag-row > .tag` (Badge kategori/topik) |
| Mode Gelap | Fitur aktif! Tombol ganti tema tersedia di bagian navigasi atas |

---

## 🖼️ Mengganti Avatar Profil di Beranda

1. Simpan foto profil baru kamu ke `home/assets/img/`.
2. Di `home/index.html`, cari selector `hero-avatar` dan sesuaikan atribut `src` untuk menunjuk pada file gambar profil kamu.

---

## 🌐 Deploy ke GitHub Pages

1. Buat repository GitHub: `username.github.io` atau dengan nama spesifik.
2. Upload semua isi file/folder `Lippbyte-blog` ke branch utama (ex: `main`).
3. Enable GitHub Pages di Settings → Pages → Deploy dari branch.
4. Akses situs di URL yang disediakan GitHub Pages.

---

## 🎨 Kustomisasi Warna Aksen (Warna Tema)

Untuk mengubah warna aksen dasar (merah-oren default):
Buka file CSS yang sesuai (misal `home/assets/css/style.css` dan `blog/template/css/style.css`), lalu cari blok `:root` dan ubah variabel berikut:
```css
--accent:       #e8441a;  /* Warna utama */
--accent-hover: #c73a14;  /* Warna saat disorot / hover */
--accent-soft:  #fff1ee;  /* Background elemen secara halus */
--accent-mid:   #ffd4c8;  /* Border / pemisah */
```

*(Perhatikan juga bahwa file mendukung kelas darkmode `.dark { ... }` jika Anda ingin mengkustomisasi khusus mode gelap!)*

---

*Dibuat menggunakan antusiasme — Dokumentasi personal*
