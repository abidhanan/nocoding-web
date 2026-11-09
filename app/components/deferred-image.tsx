import Image, { type ImageProps } from "next/image";

/**
 * A responsive image that stays server-rendered and lets the browser schedule its
 * lazy request. Use inside a positioned wrapper because the image fills it.
 */
export default function DeferredImage({ alt, ...props }: Omit<ImageProps, "fill" | "loading">) {
  return (
    <div className="absolute inset-0">
      <Image {...props} alt={alt} fill loading="lazy" />
    </div>
  );
}
