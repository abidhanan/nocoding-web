export type Testimonial = {
  /** Reviewer's name, as they agreed to be shown. */
  name: string;
  /** Optional role, e.g. "Pemilik" or "Kepala Sekolah". */
  role?: string;
  /** Name of the project / website the review is about. */
  project: string;
  /** Logo of the client's website, e.g. "/projects/logos/alengka.webp". */
  logo?: string;
  /** Set when the logo is light and needs a dark tile behind it. */
  logoOnDark?: boolean;
  /** The review text in Indonesian, quoted from the client. */
  review: string;
  /** English translation of the review. */
  reviewEn: string;
  /** Stars out of 5. Leave it out to show the review without stars. */
  rating?: 1 | 2 | 3 | 4 | 5;
};

/**
 * Add REAL client reviews here, with the client's permission. While this list is
 * empty the Testimoni section and its menu link are not rendered at all.
 *
 * Example entry:
 * {
 *   name: "Nama Klien",
 *   role: "Pemilik",
 *   project: "Nama Project",
 *   logo: "/projects/logos/nama-project.webp",
 *   review: "Isi review dari klien, sesuai aslinya.",
 *   reviewEn: "English translation of the review.",
 *   rating: 5, // optional: omit to hide the stars
 * },
 */
export const testimonials: Testimonial[] = [];
