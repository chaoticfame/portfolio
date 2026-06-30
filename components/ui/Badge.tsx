type BadgeProps = {
  children: React.ReactNode;
};

/** Monospace tech badge used across project cards and stack lists. */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-hairline bg-panel/40 px-2.5 py-1 font-mono text-[11px] leading-none text-muted transition-colors duration-200 hover:border-hairline-strong hover:text-content">
      {children}
    </span>
  );
}
