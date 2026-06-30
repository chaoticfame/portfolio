import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Terminal } from "lucide-react";
import { about, profile, socialLinks } from "@/lib/data";
import { HalftonePortrait } from "@/components/HalftonePortrait";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `About — ${profile.name}`,
  description: about.paragraphs[0],
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-vignette" />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex h-16 max-w-layout items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm text-neutral-400 transition-colors hover:text-neutral-100"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          back
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-neutral-200"
        >
          <Terminal className="h-4 w-4 text-neutral-400" />
          <span className="text-neutral-500">~/</span>
          <span className="font-medium">{profile.handle}</span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex max-w-layout flex-col px-5 pb-24 pt-16 sm:px-8 md:pt-24">
        <Reveal className="mb-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
          <span className="text-neutral-300">00</span>
          <span className="h-px w-8 bg-neutral-700" />
          <span>About</span>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          {/* Portrait */}
          <Reveal className="flex justify-center md:justify-start">
            <HalftonePortrait
              src={about.portrait}
              alt={about.displayName}
              initials={about.initials}
            />
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.1} className="flex flex-col">
            <h1 className="font-mono text-5xl font-bold tracking-tight text-neutral-100 sm:text-6xl">
              {about.displayName}
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-neutral-500">
              {profile.role}
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-neutral-400">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Inline link row — github ↗  linkedin ↗  email */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm text-neutral-500">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group inline-flex items-center gap-1 lowercase transition-colors hover:text-neutral-100"
                >
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-300" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
