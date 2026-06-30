import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

/**
 * Numeric-indexed section header — the structural backbone of the layout.
 * Renders as:  01 — Overview
 */
export function SectionHeading({
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-faint">
        <span className="text-muted">{index}</span>
        <span className="h-px w-8 bg-hairline-strong" />
        <span>{title}</span>
      </div>
      {description ? (
        <p className="mt-4 max-w-2xl text-balance text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
