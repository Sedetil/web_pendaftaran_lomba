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

export interface CompetitionContact {
  name: string;
  phone: string;
  whatsapp: string;
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
  /** Biaya pendaftaran cabang lomba. */
  fee: string;
  /** Alur babak lomba. */
  rounds: string;
  /** Path PDF guidebook di folder public, mis. "/guidebook/guidebook-uiux.pdf". */
  guidebook: string;
  /** Narahubung cabang lomba dari guidebook. */
  contact: CompetitionContact;
  /** URL formulir pendaftaran dari guidebook. */
  formUrl: string;
  /** URL pengumpulan karya (bila terpisah dari pendaftaran). */
  submissionUrl?: string;
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
    'Lomba UI/UX Design, Web Design, Poster Design, dan Short Reels untuk siswa SMK se-Lampung dalam rangkaian EXPO TRPL 2026. Pendaftaran & pengumpulan karya dibuka 19 November – 3 Desember 2026.',

  dateStart: '2026-12-10', // Babak final di SMK Negeri 8 Bandar Lampung
  dateEnd: '2026-12-10',
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
      fee: 'Rp50.000 / tim',
      rounds: 'Penyisihan daring (proposal PDF + tautan Figma), final luring 5 tim',
      guidebook: '/guidebook/guidebook-uiux.pdf',
      contact: {
        name: 'Zidan',
        phone: '0838-7032-1697',
        whatsapp: 'https://wa.me/6283870321697',
      },
      formUrl: 'https://forms.gle/djkh6WE8E64StRPK7',
    },
    {
      id: 'web',
      name: 'Web Design',
      summary:
        'Bangun landing page yang responsif, interaktif, dan sudah online untuk masalah nyata yang berkaitan dengan Lampung.',
      team: 'Tim 3 orang',
      fee: 'Rp50.000 / tim',
      rounds: 'Penyisihan daring (tautan website, repositori, proposal), final luring',
      guidebook: '/guidebook/guidebook-web-design.pdf',
      contact: {
        name: 'Abi Bakri',
        phone: '0857-8889-2750',
        whatsapp: 'https://wa.me/6285788892750',
      },
      formUrl: 'https://forms.gle/y4BSb96stmLQEWUa7',
    },
    {
      id: 'poster',
      name: 'Poster Design',
      summary:
        'Buat poster kampanye digital ukuran A3 bertema Visualizing Change Through Creative Ideas, lengkap dengan deskripsi konsep.',
      team: 'Perorangan',
      fee: 'Rp20.000 / orang',
      rounds: 'Penyisihan daring (poster + deskripsi), final luring 5 finalis',
      guidebook: '/guidebook/guidebook-poster-design.pdf',
      contact: {
        name: 'Kayla',
        phone: '0897-9076-918',
        whatsapp: 'https://wa.me/628979076918',
      },
      formUrl: 'https://forms.gle/M4aUQdznPRGxFoDD7',
      submissionUrl: 'https://forms.gle/vEso6USf8JwV8wFt7',
    },
    {
      id: 'reels',
      name: 'Short Reels',
      summary:
        'Rekam dan sunting video potret maksimal 1 menit 30 detik tentang kegiatan EXPO TRPL 2026, dikerjakan 3 jam di lokasi.',
      team: 'Perorangan',
      fee: 'Rp20.000 / orang',
      rounds: 'Langsung di lokasi, 10 Desember 2026',
      guidebook: '/guidebook/guidebook-short-reels.pdf',
      contact: {
        name: 'Aldefina',
        phone: '0896-9192-3252',
        whatsapp: 'https://wa.me/6289691923252',
      },
      formUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSefmTot_xw6nEUq5hSxqWE6A8cgM-5FZaCbBT-B9rfPkOpMBQ/viewform',
      submissionUrl: 'https://forms.gle/iqou5F7XtJWAiPTa7',
    },
  ],

  registration: {
    open: '2026-11-19',
    close: '2026-12-03',
    fee: '50k (Tim) · 20k (Individu)',
    requirements: [
      'Siswa/i aktif SMK se-Lampung (kartu pelajar atau surat aktif sekolah).',
      'Format peserta: Tim 3 orang (UI/UX & Web) atau Perorangan (Poster & Reels).',
      'Setiap peserta hanya boleh terdaftar di 1 cabang lomba.',
      'Melampirkan Surat Pernyataan Keaslian Karya yang telah diisi dan ditandatangani.',
      'Setiap sekolah bebas mengirimkan peserta tanpa batas kuota.',
    ],
    steps: [
      'Pilih cabang lomba dan unduh guidebook di bagian Cabang Lomba.',
      'Siapkan berkas: kartu pelajar dan Surat Pernyataan Keaslian Karya.',
      'Buka link pendaftaran di guidebook dan kirim karya sebelum 3 Desember 2026.',
    ],
    formUrl: null, // Note: Link pendaftaran & pengumpulan tertera di guidebook masing-masing cabang lomba.
  },

  // Timeline resmi dari panitia & guidebook kompetisi Digital Canvas.
  timeline: [
    {
      title: 'Pendaftaran & Pengumpulan',
      description: 'Pendaftaran peserta dan pengumpulan karya daring via link di guidebook tiap cabang.',
      start: '2026-11-19',
      end: '2026-12-03',
      time: null,
    },
    {
      title: 'Penjurian Penyisihan',
      description: 'Penilaian karya babak penyisihan secara daring oleh dewan juri.',
      start: '2026-12-04',
      end: null,
      time: null,
    },
    {
      title: 'Pengumuman Finalis',
      description: 'Panitia mengumumkan finalis yang lolos ke babak final tatap muka.',
      start: '2026-12-07',
      end: null,
      time: null,
    },
    {
      title: 'Technical Meeting',
      description: 'Pertemuan teknis antara panitia dan finalis menjelang hari pelaksanaan.',
      start: '2026-12-09',
      end: null,
      time: null,
    },
    {
      title: 'Babak Final & Pameran',
      description: 'Presentasi karya dan pelaksanaan lomba tatap muka di SMK Negeri 8 Bandar Lampung.',
      start: '2026-12-10',
      end: null,
      time: null,
    },
  ],

  faq: [
    {
      question: 'Siapa yang boleh ikut?',
      answer: 'Siswa/i aktif SMK se-Lampung, dibuktikan dengan kartu pelajar atau surat keterangan siswa aktif.',
    },
    {
      question: 'Berapa biaya pendaftarannya?',
      answer:
        'UI/UX Design dan Web Design sebesar Rp50.000 per tim. Untuk Poster Design dan Short Reels sebesar Rp20.000 per orang.',
    },
    {
      question: 'Boleh ikut lebih dari satu cabang lomba?',
      answer: 'Tidak. Setiap peserta hanya boleh terdaftar di 1 tim dan 1 cabang lomba.',
    },
    {
      question: 'Di mana aturan teknis dan link pendaftaran lomba?',
      answer:
        'Ketentuan teknis, format karya, serta tautan formulir pendaftaran dan pengumpulan tertera lengkap di dalam guidebook masing-masing cabang lomba.',
    },
    {
      question: 'Di mana mengunduh format Surat Pernyataan Keaslian Karya?',
      answer:
        'Format Surat Pernyataan Keaslian Karya (.docx) dapat diunduh langsung lewat tombol unduh di bagian Pendaftaran Peserta.',
    },
  ],

  organizer: {
    institution: 'Politeknik Negeri Lampung',
    department: 'Jurusan Teknologi Informasi',
    studyProgram: 'Teknologi Rekayasa Perangkat Lunak',
    partner: 'MASTECH Media & Informasi',
  },

  contact: {
    name: 'Panitia Digital Canvas',
    whatsapp: null, // WhatsApp Panitia (Zidan)
    email: null,
  },

  socials: [
    // Dari tautan yang tercetak di sampul Guide Book. TODO(panitia): konfirmasi akun ini.
    { label: 'Instagram', url: 'https://www.instagram.com/astech.polinela/' },
  ],
};
