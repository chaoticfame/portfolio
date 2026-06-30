"use client";

import { useState } from "react";

type HalftonePortraitProps = {
  src: string;
  alt: string;
  initials: string;
};

/**
 * Monochrome, dithered/halftone portrait inspired by classic editorial
 * print treatments. Falls back to a styled initials block if the photo
 * file is missing, so the layout never breaks.
 */
export function HalftonePortrait({ src, alt, initials }: HalftonePortraitProps) {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="relative w-full max-w-[20rem]">
      <div className="halftone-dots halftone-scan relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-hairline bg-panel">
        {loaded ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setLoaded(false)}
            className="halftone-img h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-hairline to-surface">
            <span className="font-mono text-6xl font-semibold tracking-tight text-faint">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* corner registration marks for the editorial print feel */}
      <span className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-hairline-strong" />
      <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-hairline-strong" />
    </div>
  );
}
