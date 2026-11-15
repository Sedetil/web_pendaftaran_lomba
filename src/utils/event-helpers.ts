import type { EventConfig, ISODate, TimelineItem, TimelineStatus } from '../data/event';

/** Teks yang tampil di situs untuk informasi yang belum diumumkan panitia. */
export const TBA = 'Segera diumumkan';

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function parts(iso: string): [number, number, number] | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return [y, mo, d];
}

/** "2026-12-01" → "1 Desember 2026". Tanggal tidak sah → null. */
export function formatDate(iso: ISODate): string | null {
  if (!iso) return null;
  const p = parts(iso);
  if (!p) return null;
  return `${p[2]} ${MONTHS[p[1] - 1]} ${p[0]}`;
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

/** Rentang dengan bulan disingkat: "16 Nov – 3 Des 2026". */
export function formatRangeShort(start: ISODate, end: ISODate): string | null {
  const a = start ? parts(start) : null;
  const b = end ? parts(end) : null;
  if (!a) return null;
  if (!b) return `${a[2]} ${MONTHS_SHORT[a[1] - 1]} ${a[0]}`;
  const left = a[0] === b[0] ? `${a[2]} ${MONTHS_SHORT[a[1] - 1]}` : `${a[2]} ${MONTHS_SHORT[a[1] - 1]} ${a[0]}`;
  return `${left} – ${b[2]} ${MONTHS_SHORT[b[1] - 1]} ${b[0]}`;
}

/** Rentang tanggal ringkas: "1–3 Desember 2026", "28 November – 2 Desember 2026". */
export function formatRange(start: ISODate, end: ISODate): string | null {
  const a = start ? parts(start) : null;
  const b = end ? parts(end) : null;
  if (!a) return null;
  if (!b || (a[0] === b[0] && a[1] === b[1] && a[2] === b[2])) return formatDate(start);
  if (a[0] === b[0] && a[1] === b[1]) return `${a[2]}–${b[2]} ${MONTHS[a[1] - 1]} ${a[0]}`;
  if (a[0] === b[0]) return `${a[2]} ${MONTHS[a[1] - 1]} – ${b[2]} ${MONTHS[b[1] - 1]} ${a[0]}`;
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/**
 * Validasi URL Google Forms. Hanya https://docs.google.com/forms/... dan
 * https://forms.gle/... yang diterima; selain itu tombol tidak dirender.
 */
export function isValidFormUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    if (u.hostname === 'forms.gle') return u.pathname.length > 1;
    if (u.hostname === 'docs.google.com') return u.pathname.startsWith('/forms/');
    return false;
  } catch {
    return false;
  }
}

/** Validasi URL https umum (media sosial, guidebook). */
export function isValidHttpsUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

/** "2026-12-03" → "2026-12-02" (sehari sebelumnya). */
function dayBefore(iso: string): ISODate {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10) as ISODate;
}

/**
 * Tanggal akhir efektif tiap tahap untuk menghitung status:
 * - `end` bila diisi;
 * - tahap `openEnded` tanpa `end`: sehari sebelum tahap berikutnya dimulai;
 * - selain itu: sama dengan `start` (acara satu hari).
 */
export function effectiveEnds(items: TimelineItem[]): ISODate[] {
  return items.map((t, i) => {
    if (!t.start) return null;
    if (t.end) return t.end;
    if (t.openEnded) {
      const next = items.slice(i + 1).find((n) => n.start)?.start;
      return next ? dayBefore(next) : null; // null = berlangsung tanpa batas
    }
    return t.start;
  });
}

/** Tanggal hari ini di zona WIB sebagai "YYYY-MM-DD". */
export function jakartaDay(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(d);
}

/** Status tahap timeline saat build. Dihitung ulang di browser oleh main.ts. */
export function timelineStatus(item: TimelineItem, today = new Date()): TimelineStatus | null {
  if (item.status) return item.status;
  if (!item.start) return null;
  const t = jakartaDay(today);
  const end = item.end ?? (item.openEnded ? null : item.start);
  if (t < item.start) return 'upcoming';
  if (end && t > end) return 'completed';
  return 'ongoing';
}

export const STATUS_LABEL: Record<TimelineStatus, string> = {
  upcoming: 'Akan datang',
  ongoing: 'Berlangsung',
  completed: 'Selesai',
};

/**
 * Tujuan tombol "Daftar Sekarang": langsung ke Google Form pendaftaran lomba
 * bila URL-nya sah; selain itu ke section Registration.
 */
export function primaryTarget(e: EventConfig): { href: string; external: boolean } {
  const url = e.registration.formUrl;
  if (isValidFormUrl(url)) return { href: url, external: true };
  return { href: '#registration', external: false };
}

/** Daftar informasi yang masih kosong. Dicetak saat build dan dipakai di README. */
export function missingFields(e: EventConfig): string[] {
  const miss: string[] = [];
  const need = (cond: unknown, label: string) => {
    if (cond === null || cond === undefined || (Array.isArray(cond) && cond.length === 0)) miss.push(label);
  };
  if (!isValidFormUrl(e.registration.formUrl)) miss.push('URL Google Form pendaftaran lomba (registration.formUrl)');
  need(e.dateStart, 'Tanggal babak final (dateStart)');
  need(e.registration.open, 'Tanggal pendaftaran dibuka (registration.open)');
  need(e.registration.close, 'Batas akhir pendaftaran (registration.close)');
  need(e.registration.fee, 'Biaya pendaftaran (registration.fee)');
  need(e.registration.requirements, 'Persyaratan peserta (registration.requirements)');
  e.timeline.forEach((t) => {
    if (!t.start) miss.push(`Tanggal tahap "${t.title}" (timeline)`);
  });
  e.faq.forEach((f) => {
    if (!f.answer) miss.push(`Jawaban FAQ "${f.question}"`);
  });
  need(e.contact.name, 'Nama narahubung (contact.name)');
  need(e.contact.whatsapp, 'WhatsApp narahubung (contact.whatsapp)');
  need(e.contact.email, 'Email panitia (contact.email)');
  return miss;
}
