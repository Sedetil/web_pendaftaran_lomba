# Digital Canvas — Website Pendaftaran Lomba

Situs statis untuk pendaftaran lomba **Digital Canvas, EXPO TRPL 2026**: UI/UX Design, Web Design, Poster Design, dan Short Reels untuk siswa SMK se-Lampung. Penyelenggara: Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL), Jurusan Teknologi Informasi, Politeknik Negeri Lampung. Pendaftaran lewat satu Google Form. Situs ini tidak punya backend, database, atau login.

## Stack

| Teknologi | Versi | Peran |
|---|---|---|
| Astro | 7.3.8 | Framework, static site generation |
| Tailwind CSS (`@tailwindcss/vite`) | 4.3.5 | Styling dan design tokens (`@theme`) |
| TypeScript | 6.0.3 | Tipe data konfigurasi acara |
| Vanilla JS/TS | — | Menu seluler, status timeline, smooth scroll |
| `@lucide/astro` | 1.73 | Ikon SVG |
| Fontsource | 5.3 | Oswald Variable (display) dan Manrope Variable (body), self-hosted |
| `@astrojs/sitemap` | 3.7.5 | Sitemap, aktif bila `SITE_URL` diisi |

Butuh Node.js **22.12 atau lebih baru**.

## Menjalankan

```bash
npm install          # pasang dependensi
npm run dev          # server pengembangan → http://localhost:4321
npm run build        # cek tipe + build statis ke folder dist/
npm run preview      # pratinjau hasil build
```

Saat `dev` dan `build`, terminal mencetak **daftar informasi acara yang belum diisi**.

## Mengisi data acara

Semua konten ada di **`src/data/event.ts`**. Komponen tidak menyimpan teks acara sendiri.

- Nilai `null` berarti informasi belum diberikan panitia. Situs menampilkan "Segera diumumkan" atau menyembunyikan elemen terkait.
- Cari `TODO(panitia)` untuk melihat semua yang harus diisi.
- Tanggal ditulis dengan format ISO `YYYY-MM-DD`. Status timeline (Akan datang / Berlangsung / Selesai) dihitung otomatis dalam WIB.
- **Link Google Form** diisi di `registration.formUrl` (satu formulir untuk semua cabang lomba). Hanya URL `https://docs.google.com/forms/...` atau `https://forms.gle/...` yang diterima. Sebelum diisi, tombolnya tampil sebagai "Formulir belum dibuka". Setelah diisi, semua tombol "Daftar Sekarang" langsung membuka formulir di tab baru.
- **Cabang lomba** ada di `competitions`. PDF guidebook tiap lomba disimpan di `public/guidebook/` dan dibuka lewat tombol "Lihat guidebook". Untuk mengganti guidebook, timpa file PDF dengan nama yang sama.
- Pertanyaan FAQ yang `answer`-nya `null` tidak ditampilkan. Pertanyaan dengan `onlyWhileFormClosed` hilang otomatis setelah formulir dibuka.
- Structured data `EducationEvent` (schema.org) baru dibuat setelah `dateStart` terisi.

Metadata SEO dan navigasi ada di `src/config/site.ts`.

### Informasi yang masih harus diberikan panitia

- **URL Google Form pendaftaran lomba**
- Tanggal babak final (Short Reels: 10 Desember 2026 menurut guidebook)
- Narahubung: nama, WhatsApp, email
- Konfirmasi akun Instagram `instagram.com/astech.polinela` (diambil dari teks di sampul)
- Domain produksi untuk canonical URL dan sitemap

## Deploy

**Vercel:** impor repo, pilih framework preset *Astro* (build `npm run build`, output `dist`). Tambahkan environment variable `SITE_URL=https://domain-anda`.

**Netlify:** build command `npm run build`, publish directory `dist`. Tambahkan `SITE_URL` di *Site settings → Environment variables*.

Tanpa `SITE_URL`, situs tetap berjalan, tetapi canonical URL, `og:url`, dan sitemap tidak dibuat.

## Struktur

```text
public/
  assets/moments/        moment "word-highlight" dari kit Taste Skill (file asli, jangan diubah)
  images/og-digital-canvas.jpg   gambar pratinjau share 1200×630
  guidebook/             PDF guidebook tiap cabang lomba
  favicon.svg
src/
  assets/guidebook-cover.jpeg    sampul Guide Book (dioptimasi otomatis ke AVIF/WebP)
  components/            Navbar, Hero, About, Competitions, Timeline, Registration, FAQ, Footer, Logo
  config/site.ts         metadata SEO dan navigasi
  data/event.ts          SEMUA konten lomba
  layouts/MainLayout.astro   head, SEO, Open Graph, JSON-LD
  pages/index.astro      halaman utama
  pages/robots.txt.ts    robots.txt (baris Sitemap otomatis bila SITE_URL ada)
  scripts/main.ts        menu seluler, status timeline, smooth scroll
  styles/global.css      design tokens dan komponen CSS
  utils/event-helpers.ts format tanggal, validasi URL Google Form, status timeline
```

## Sistem desain

Diturunkan dari sampul Guide Book Digital Canvas:

- **Warna:** Primary Teal `#168D96`, Deep Teal `#126878`, Dark Ocean `#0D5666`, Soft Peach `#F0BCA5`, Warm Off-White `#F8F4EC`, Muted Teal `#89B6BC`, ink `#0D3F4A`. Peach hanya dipakai untuk teks besar dan tombol di atas teal, supaya kontras tetap AA.
- **Tipografi:** Oswald (judul condensed kapital) dan Manrope (teks).
- **Layout:** satu container 1280px, grid 12 kolom; setiap section setinggi 1 atau 2 layar.
- **Motion:** hero masuk sekali saat dimuat, moment *word-highlight* di About, dan hover kecil. Semuanya diam pada `prefers-reduced-motion`.
