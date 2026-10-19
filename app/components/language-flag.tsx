import { flagOf } from "../../lib/languages";

/** Flag of the country most associated with a language, or a globe where no flag fits. */
export default function LanguageFlag({ code, className = "h-4 w-5" }: { code: string; className?: string }) {
  const country = flagOf(code);

  if (!country) {
    return (
      <svg
        aria-hidden="true"
        className={`${className} shrink-0 rounded-[2px] text-slate-400`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
      </svg>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static flag, no optimisation needed
    <img
      src={`/flags/${country}.png`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      decoding="async"
      className={`${className} shrink-0 rounded-[2px] object-cover ring-1 ring-white/20`}
    />
  );
}
