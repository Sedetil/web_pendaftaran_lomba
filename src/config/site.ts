/**
 * Konfigurasi situs: metadata SEO dan navigasi.
 * Konten acara ada di `src/data/event.ts`.
 */
import { event } from '../data/event';

export const site = {
  lang: 'id',
  locale: 'id_ID',
  title: `${event.name}: Lomba UI/UX, Web, Poster & Short Reels | ${event.series}`,
  description:
    'Daftar lomba Digital Canvas EXPO TRPL 2026 untuk siswa SMK se-Lampung: UI/UX Design, Web Design, Poster Design, dan Short Reels. Gratis, pendaftaran 16 November–3 Desember 2026.',
  /** Warna bilah browser (Deep Teal). */
  themeColor: '#126878',
  /** Gambar pratinjau share (1200×630) di folder public/. */
  ogImage: '/images/og-digital-canvas.jpg',
  ogImageAlt: 'Digital Canvas, Software Engineering Competition, EXPO TRPL 2026',
} as const;

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export const nav: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Lomba', href: '#lomba' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Registration', href: '#registration' },
  { label: 'FAQ', href: '#faq' },
];

/** Label tombol aksi utama: sama persis di nav, hero, dan penutup. */
export const primaryCta = 'Daftar Sekarang';
