/**
 * ============================================================================
 *  DIGITAL CANVAS — KONFIGURASI LOMBA (satu-satunya sumber konten situs)
 * ============================================================================
 *
 *  Semua teks, tanggal, tautan Google Form, guidebook, dan kontak dibaca dari
 *  file ini. Komponen tidak menyimpan informasi lomba sendiri.
 *
 *  ATURAN PENGISIAN
 *  - Nilai `null` = informasi BELUM DIBERIKAN panitia. Situs menampilkan
 *    "Segera diumumkan" atau menyembunyikan elemen terkait; tidak ada data
 *    yang dikarang.
 *  - Setiap `null` ditandai komentar `TODO(panitia)`. `npm run build` juga
 *    mencetak daftar yang masih kosong di terminal.
 *  - Tanggal ditulis ISO `YYYY-MM-DD` (WIB). Status timeline dihitung otomatis.
 *  - Tautan pendaftaran hanya dirender bila berupa URL Google Forms yang sah
 *    (https://docs.google.com/forms/... atau https://forms.gle/...).
 *  - Guidebook tiap lomba disimpan di `public/guidebook/`.
 *
 *  Sumber: sampul Guide Book Digital Canvas, guidebook keempat cabang lomba,
 *  tabel timeline panitia, dan keterangan panitia (batas akhir 3 Desember,
 *  tanpa biaya, peserta SMK se-Lampung).
 * ============================================================================
 */

/* ---------------------------------- Tipe ---------------------------------- */

/** Tanggal ISO `YYYY-MM-DD`, atau null bila belum diumumkan. */
export type ISODate = `${number}-${number}-${number}` | null;

export type TimelineStatus = 'upcoming' | 'ongoing' | 'completed';

export interface TimelineItem {
  /** Nama tahap. */
  title: string;
  /** Deskripsi singkat tahap (1–2 kalimat). */
  description: string;
  /** Tanggal mulai. */
  start: ISODate;
  /** Tanggal selesai; kosongkan (null) bila tahap hanya satu hari. */
  end: ISODate;
  /**
   * Tahap tanpa tanggal selesai yang berlangsung terus (mis. pendaftaran dibuka).
   * Tampil "Mulai <tanggal>" dan berstatus "Berlangsung" sampai tahap berikutnya dimulai.
   */
  openEnded?: boolean;
  /** Jam pelaksanaan, mis. "08.00–16.00 WIB". */
  time: string | null;
  /** Paksa status secara manual; biarkan undefined agar dihitung dari tanggal. */
  status?: TimelineStatus;
}

/** Satu cabang lomba. */
export interface Competition {
  /** Kunci unik, dipakai sebagai id anchor (#lomba-<id>). */
  id: string;
  name: string;
  /** Ringkasan karya yang dibuat (1 kalimat). */
  summary: string;
  /** Format peserta, mis. "Tim 3 orang" atau "Perorangan". */
  team: string;
  /** Alur babak lomba. */
  rounds: string;
  /** Path PDF guidebook di folder public, mis. "/guidebook/guidebook-uiux.pdf". */
  guidebook: string;
}

export interface FaqItem {
  question: string;
  /** null = jawaban belum dikonfirmasi; pertanyaan disembunyikan dari situs. */
  answer: string | null;
  /** Tampilkan hanya selama formulir pendaftaran belum dibuka. */
  onlyWhileFormClosed?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Organizer {
  institution: string;
  department: string;
  studyProgram: string;
  /** Unit/media pendukung yang tercantum di sampul. */
  partner: string | null;
}

export interface Contact {
  /** Nama narahubung. */
  name: string | null;
  /** Nomor WhatsApp, format internasional tanpa "+", mis. "6281234567890". */
  whatsapp: string | null;
  email: string | null;
}

export interface EventConfig {
  name: string;
  tagline: string;
  /** Identitas acara di bawah nama. */
  identity: string;
  /** Nama rangkaian acara induk. */
  series: string;
  /** Deskripsi singkat untuk hero dan meta description. */
  description: string;
  /** Tanggal babak final / hari acara (mulai–selesai). */
  dateStart: ISODate;
  dateEnd: ISODate;
  /** Tempat babak final. */
  venue: string | null;
  city: string | null;
  /** Format pelaksanaan, mis. "Daring + final luring". */
  mode: string | null;
  /** Siapa yang boleh ikut (satu frasa pendek). */
  eligibility: string;

  about: {
    /** Pernyataan besar di section About (efek sorot kata). */
    statement: string;
    what: string;
    why: string | null;
    who: string | null;
    gains: string[];
  };

  /** Sub-tema yang dipakai lomba UI/UX, Web Design, dan Poster. */
  subthemes: string[];
  competitions: Competition[];

  registration: {
    open: ISODate;
    close: ISODate;
    /** Biaya pendaftaran, mis. "Gratis" atau "Rp50.000 per tim". */
    fee: string | null;
    /** Persyaratan umum untuk semua peserta. */
    requirements: string[];
    /** Langkah mendaftar. */
    steps: string[];
    /** URL Google Form pendaftaran lomba (satu formulir untuk semua cabang). */
    formUrl: string | null;
  };

  timeline: TimelineItem[];
  faq: FaqItem[];
  organizer: Organizer;
  contact: Contact;
  socials: SocialLink[];
}

/* ------------------------------- Konten lomba ------------------------------ */

export const event: EventConfig = {
  name: 'Digital Canvas',
  tagline: 'Build Skills, Challenge Ideas, Present Solutions & Collaboration',
  identity: 'Software Engineering Competition',
  series: 'EXPO TRPL 2026',
  description:
    'Lomba UI/UX Design, Web Design, Poster Design, dan Short Reels untuk siswa SMK se-Lampung dalam rangkaian EXPO TRPL 2026. Pendaftaran gratis, dibuka sampai 3 Desember 2026.',

  dateStart: null, // TODO(panitia): tanggal babak final (Short Reels dijadwalkan 10 Desember 2026)
  dateEnd: null,
  venue: 'SMK Negeri 8 Bandar Lampung', // lokasi babak final (guidebook)
  city: 'Bandar Lampung',
  mode: 'Penyisihan daring, final luring',
  eligibility: 'Siswa/i SMK se-Lampung',

  about: {
    statement:
      'Empat cabang lomba dalam satu tema: UI/UX design, web design, poster design, dan short reels untuk siswa SMK se-Lampung.',
    what:
      'Digital Canvas adalah rangkaian lomba EXPO TRPL 2026 yang diselenggarakan Program Studi Teknologi Rekayasa Perangkat Lunak, Jurusan Teknologi Informasi, Politeknik Negeri Lampung.',
    why: 'Mengajak pelajar mengasah kreativitas, keterampilan desain, dan teknologi untuk membuat solusi digital yang bermanfaat bagi masyarakat, khususnya di Lampung.',
    who: 'Siswa/i aktif SMK se-Lampung, dibuktikan dengan kartu pelajar atau surat keterangan siswa aktif.',
    gains: [
      'Juara 1, 2, dan 3 di setiap cabang lomba.',
      'Babak final dan pameran karya di SMK Negeri 8 Bandar Lampung.',
    ],
  },

  subthemes: ['Pertanian', 'Pariwisata', 'Budaya Lampung', 'Pendidikan'],

  competitions: [
    {
      id: 'uiux',
      name: 'UI/UX Design',
      summary:
        'Rancang aplikasi atau platform digital untuk masalah nyata di masyarakat dalam bentuk high-fidelity interactive prototype di Figma.',
      team: 'Tim 3 orang',
      rounds: 'Penyisihan daring (proposal PDF + tautan Figma), final luring 5 tim',
      guidebook: '/guidebook/guidebook-uiux.pdf',
    },
    {
      id: 'web',
      name: 'Web Design',
      summary:
        'Bangun landing page yang responsif, interaktif, dan sudah online untuk masalah nyata yang berkaitan dengan Lampung.',
      team: 'Tim 3 orang',
      rounds: 'Penyisihan daring (tautan website, repositori, proposal), final luring',
      guidebook: '/guidebook/guidebook-web-design.pdf',
    },
    {
      id: 'poster',
      name: 'Poster Design',
      summary:
        'Buat poster kampanye digital ukuran A3 bertema Visualizing Change Through Creative Ideas, lengkap dengan deskripsi konsep.',
      team: 'Perorangan',
      rounds: 'Penyisihan daring (poster + deskripsi), final luring 5 finalis',
      guidebook: '/guidebook/guidebook-poster-design.pdf',
    },
    {
      id: 'reels',
      name: 'Short Reels',
      summary:
        'Rekam dan sunting video potret maksimal 1 menit 30 detik tentang kegiatan EXPO TRPL 2026, dikerjakan 3 jam di lokasi.',
      team: 'Perorangan',
      rounds: 'Langsung di lokasi, 10 Desember 2026',
      guidebook: '/guidebook/guidebook-short-reels.pdf',
    },
  ],

  registration: {
    open: '2026-11-16',
    close: '2026-12-03',
    fee: 'Gratis',
    requirements: [
      'Siswa/i aktif SMK se-Lampung, dibuktikan dengan kartu pelajar atau surat keterangan siswa aktif.',
      'Setiap peserta hanya boleh terdaftar di 1 tim dan 1 cabang lomba.',
      'UI/UX Design dan Web Design: tim 3 orang dari sekolah yang sama, dengan 1 ketua tim.',
      'Poster Design dan Short Reels: perorangan.',
      'Setiap sekolah boleh mengirim peserta tanpa batas jumlah.',
    ],
    steps: [
      'Pilih cabang lomba dan baca guidebook-nya.',
      'Siapkan kartu pelajar atau surat keterangan siswa aktif.',
      'Isi Google Form pendaftaran lomba dan kirim sebelum 3 Desember 2026.',
    ],
    formUrl: null, // TODO(panitia): URL Google Form pendaftaran lomba (competition)
  },

  // Sumber: tabel "Timeline Bootcamp dan Lomba" dari panitia.
  timeline: [
    {
      title: 'Pendaftaran',
      description: 'Peserta mendaftar lewat Google Form pendaftaran lomba.',
      start: '2026-11-16',
      end: '2026-12-03',
      time: null,
    },
    {
      title: 'Pengumpulan karya',
      description: 'Batas pengumpulan karya UI/UX Design, Web Design, dan Poster Design.',
      start: '2026-12-03',
      end: null,
      time: null,
    },
    {
      title: 'Penyisihan',
      description: 'Juri menilai karya peserta pada babak penyisihan.',
      start: '2026-12-04',
      end: null,
      time: null,
    },
    {
      title: 'Pengumuman finalis',
      description: 'Panitia mengumumkan peserta yang lolos ke babak final.',
      start: '2026-12-07',
      end: null,
      time: null,
    },
    {
      title: 'Technical meeting',
      description: 'Pertemuan teknis antara panitia dan peserta.',
      start: '2026-12-09',
      end: null,
      time: null,
    },
  ],

  faq: [
    {
      question: 'Siapa yang boleh ikut?',
      answer: 'Siswa/i aktif SMK se-Lampung, dibuktikan dengan kartu pelajar atau surat keterangan siswa aktif.',
    },
    { question: 'Apakah pendaftaran dipungut biaya?', answer: 'Tidak. Pendaftaran semua cabang lomba gratis.' },
    {
      question: 'Lomba diikuti perorangan atau tim?',
      answer: 'UI/UX Design dan Web Design diikuti tim 3 orang dari sekolah yang sama. Poster Design dan Short Reels diikuti perorangan.',
    },
    {
      question: 'Boleh ikut lebih dari satu cabang lomba?',
      answer: 'Tidak. Setiap peserta hanya boleh terdaftar di 1 tim dan 1 cabang lomba.',
    },
    {
      question: 'Di mana aturan lengkap tiap lomba?',
      answer: 'Di guidebook masing-masing cabang lomba. Buka lewat tombol Lihat guidebook di bagian Lomba.',
    },
    {
      question: 'Tombol pendaftaran belum bisa ditekan. Kenapa?',
      answer:
        'Formulir belum dibuka. Tombol aktif otomatis saat panitia membuka pendaftaran; pengumumannya juga dibagikan lewat Instagram panitia.',
      onlyWhileFormClosed: true,
    },
  ],

  organizer: {
    institution: 'Politeknik Negeri Lampung',
    department: 'Jurusan Teknologi Informasi',
    studyProgram: 'Teknologi Rekayasa Perangkat Lunak',
    partner: 'MASTECH Media & Informasi',
  },

  contact: {
    name: null, // TODO(panitia): nama narahubung
    whatsapp: null, // TODO(panitia): nomor WhatsApp narahubung, mis. '6281234567890'
    email: null, // TODO(panitia): email panitia
  },

  socials: [
    // Dari tautan yang tercetak di sampul Guide Book. TODO(panitia): konfirmasi akun ini.
    { label: 'Instagram', url: 'https://www.instagram.com/astech.polinela/' },
  ],
};
