import Image from "next/image";
import { LocalizedText } from "./localized-text";
import { testimonials, type Testimonial } from "./testimonials-data";

/**
 * Server component. Renders nothing until real reviews are added to
 * `testimonials-data.ts`, so no placeholder content ever reaches visitors.
 */
export default function TestimonialsSection() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimoni" aria-labelledby="testimonials-title" className="border-b border-white/10 px-6 py-8 sm:py-10">
      <header className="mx-auto w-full max-w-[21.5rem] text-center sm:max-w-3xl">
        <h2 id="testimonials-title" className="text-sm font-bold uppercase text-brand-cyan">
          <LocalizedText id="testimonials.eyebrow">Testimoni</LocalizedText>
        </h2>
        <p className="mt-4 leading-8 text-slate-400">
          <LocalizedText id="testimonials.description">
            Cerita langsung dari klien yang websitenya sudah kami kerjakan.
          </LocalizedText>
        </p>
      </header>

      <div className="mx-auto mt-10 grid w-full max-w-[21.5rem] gap-4 sm:max-w-7xl md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <TestimonialCard key={`${item.name}-${item.project}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const rating = item.rating;

  return (
    <figure className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6">
      {rating ? (
        <div role="img" aria-label={`Bintang ${rating} dari 5`} className="mb-4 flex gap-1 text-brand-amber">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= rating} />
          ))}
        </div>
      ) : null}

      <blockquote className="grow leading-7 text-slate-200">
        <LocalizedText id={`testimonial.${index}.review`}>{item.review}</LocalizedText>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg ${
            item.logo
              ? `${item.logoOnDark ? "bg-brand-night" : "bg-white"} p-1.5`
              : "border border-brand-cyan/30 bg-brand-cyan/10 text-base font-black text-brand-cyan"
          }`}
        >
          {item.logo ? (
            <Image src={item.logo} alt="" width={44} height={44} unoptimized className="h-full w-full object-contain" />
          ) : (
            item.project.charAt(0)
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-bold text-white">{item.name}</span>
          <span className="block text-sm text-slate-400">
            {item.role ? `${item.role} · ` : ""}
            {item.project}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg aria-hidden="true" className={`h-5 w-5 ${filled ? "" : "opacity-25"}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z" />
    </svg>
  );
}
