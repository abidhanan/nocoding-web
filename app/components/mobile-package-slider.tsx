"use client";

import { useRef, useState } from "react";
import { LocalizedText } from "./i18n";

type PackageItem = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export default function MobilePackageSlider({ packages }: { packages: PackageItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveSlide = () => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const slides = Array.from(viewport.querySelectorAll<HTMLElement>("[data-package-slide]"));
    const closestIndex = slides.reduce((closest, slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const currentDistance = Math.abs(slideCenter - viewportCenter);
      const closestDistance = Math.abs(
        slides[closest].offsetLeft + slides[closest].clientWidth / 2 - viewportCenter,
      );

      return currentDistance < closestDistance ? index : closest;
    }, 0);

    setActiveIndex(closestIndex);
  };

  const goToSlide = (index: number) => {
    const viewport = viewportRef.current;
    const slide = viewport?.querySelectorAll<HTMLElement>("[data-package-slide]")[index];

    if (!viewport || !slide) {
      return;
    }

    viewport.scrollTo({
      left: slide.offsetLeft - (viewport.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-[21.5rem] lg:hidden">
      <div
        ref={viewportRef}
        className="package-slider__viewport flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        onScroll={syncActiveSlide}
      >
        {packages.map((item, packageIndex) => (
          <article
            key={item.name}
            data-package-slide
            className={`min-h-full w-full shrink-0 snap-center rounded-lg border p-6 ${
              item.featured
                ? "border-brand-lime bg-brand-lime text-brand-dark"
                : "border-white/10 bg-brand-dark text-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={`text-xl font-black ${item.featured ? "text-brand-dark" : "text-white"}`}>{item.name}</h3>
                <p className={`mt-2 text-sm ${item.featured ? "text-brand-dark/75" : "text-slate-400"}`}>
                  <LocalizedText id={`packages.${packageIndex}.description`}>{item.description}</LocalizedText>
                </p>
              </div>
              {item.featured ? (
                <span className="bg-brand-dark px-2 py-1 text-xs font-black text-white">
                  <LocalizedText id="packages.1.badge">Populer</LocalizedText>
                </span>
              ) : null}
            </div>

            <p className={`mt-8 text-3xl font-black ${item.featured ? "text-brand-dark" : "text-white"}`}>
              <LocalizedText id={`packages.${packageIndex}.price`}>{item.price}</LocalizedText>
            </p>

            <ul className="mt-8 space-y-3">
              {item.features.map((feature, featureIndex) => (
                <li key={feature} className="flex gap-3 text-sm font-medium">
                  <svg
                    aria-hidden="true"
                    className={`mt-0.5 h-4 w-4 shrink-0 ${item.featured ? "text-brand-dark" : "text-brand-lime"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                  <span>
                    <LocalizedText id={`packages.${packageIndex}.feature.${featureIndex}`}>{feature}</LocalizedText>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2" aria-label="Indikator paket">
        {packages.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Lihat paket ${item.name}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition ${
              activeIndex === index
                ? "w-7 bg-brand-cyan shadow-[0_0_16px_rgba(34,211,238,0.55)]"
                : "w-2.5 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
