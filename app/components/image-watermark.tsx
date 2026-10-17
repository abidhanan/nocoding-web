import Image from "next/image";

const sizes = {
  xs: { box: "right-1.5 top-1.5 gap-0.5", logo: 9, text: "text-[6px]" },
  sm: { box: "right-2.5 top-2.5 gap-1", logo: 13, text: "text-[9px]" },
  md: { box: "right-3.5 top-3.5 gap-1.5", logo: 16, text: "text-[11px]" },
} as const;

/**
 * Small "nocoding_" logo and wordmark in the top-right corner of an article photo. Put it inside a
 * `relative` wrapper around the image. It is an overlay (not baked into the file), so uploaded
 * photos get it automatically.
 */
export default function ImageWatermark({ size = "sm" }: { size?: keyof typeof sizes }) {
  const style = sizes[size];

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 inline-flex items-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)] ${style.box}`}
    >
      <Image src="/nocoding-logo.webp" alt="" width={style.logo} height={style.logo} sizes="96px" className="object-contain" />
      <span className={`font-extrabold leading-none text-white ${style.text}`}>
        nocoding<span className="text-brand-cyan">_</span>
      </span>
    </span>
  );
}
