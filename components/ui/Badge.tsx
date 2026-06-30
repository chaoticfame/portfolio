type BadgeProps = {
  children: React.ReactNode;
};

/** Monospace tech badge used across project cards and stack lists. */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-900/40 px-2.5 py-1 font-mono text-[11px] leading-none text-neutral-400 transition-colors duration-200 hover:border-neutral-600 hover:text-neutral-200">
      {children}
    </span>
  );
}
