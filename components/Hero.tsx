"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { metrics, profile, socialLinks } from "@/lib/data";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section
      id="overview"
      className="relative scroll-mt-24 overflow-hidden border-b border-hairline/70"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-vignette" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-layout flex-col px-5 pb-20 pt-36 sm:px-8 md:pt-44"
      >
        <motion.div
          variants={item}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-faint"
        >
          <span className="text-muted">01</span>
          <span className="h-px w-8 bg-hairline-strong" />
          <span>Overview</span>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-panel/40 px-3 py-1 font-mono text-xs text-muted"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {profile.role}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-content sm:text-5xl md:text-6xl"
        >
          {profile.headline}{" "}
          <span className="text-faint">{profile.focus}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted"
        >
          {profile.narrative}
        </motion.p>

        {/* Direct links */}
        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          {socialLinks.map(({ label, handle, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2.5 rounded-lg border border-hairline bg-panel/30 px-4 py-2.5 transition-colors hover:border-hairline-strong hover:bg-panel/60"
            >
              <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-content" />
              <span className="text-sm text-muted transition-colors group-hover:text-content">
                {label}
              </span>
              <span className="font-mono text-xs text-faint">{handle}</span>
            </a>
          ))}
        </motion.div>

        {/* Metric grid */}
        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline/60 md:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1 bg-surface px-5 py-6 transition-colors hover:bg-panel/40"
            >
              <dt className="order-2 font-mono text-[11px] uppercase tracking-wider text-faint">
                {metric.label}
              </dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight text-content md:text-3xl">
                {metric.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.a
          variants={item}
          href="#projects"
          className="mt-12 inline-flex w-fit items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-muted"
        >
          Scroll to production projects
          <ArrowDownRight className="h-3.5 w-3.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
