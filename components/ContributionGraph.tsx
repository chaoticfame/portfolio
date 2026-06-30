"use client";

import { motion } from "framer-motion";

const WEEKS = 12;
const DAYS = 7;

const LEVELS = [
  "bg-neutral-900",
  "bg-emerald-900/60",
  "bg-emerald-700/70",
  "bg-emerald-500/80",
  "bg-emerald-400",
];

/**
 * Deterministic pseudo-random intensity so server and client render
 * identical markup (no hydration mismatch) while still looking organic.
 */
function intensity(week: number, day: number): number {
  const seed = (week * 7 + day) * 2654435761;
  const v = (seed % 100) / 100;
  if (v < 0.32) return 0;
  if (v < 0.55) return 1;
  if (v < 0.78) return 2;
  if (v < 0.93) return 3;
  return 4;
}

export function ContributionGraph() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-[3px] overflow-x-auto scrollbar-thin">
        {Array.from({ length: WEEKS }).map((_, week) => (
          <div key={week} className="flex flex-col gap-[3px]">
            {Array.from({ length: DAYS }).map((__, day) => {
              const level = intensity(week, day);
              return (
                <motion.span
                  key={day}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: (week * DAYS + day) * 0.004,
                  }}
                  className={`h-3 w-3 rounded-[3px] ${LEVELS[level]}`}
                  title={`${level} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1.5 font-mono text-[10px] text-neutral-600">
        <span>less</span>
        {LEVELS.map((cls, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${cls}`} />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
