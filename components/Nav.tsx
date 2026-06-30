"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { profile, sections } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-hairline/80 bg-surface/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-layout items-center justify-between px-5 sm:px-8">
        <a
          href="#overview"
          className="group flex items-center gap-2 font-mono text-sm text-content"
        >
          <Terminal className="h-4 w-4 text-muted transition-colors group-hover:text-content" />
          <span className="text-faint">~/</span>
          <span className="font-medium">{profile.handle}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {sections.map(({ id, index, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-1.5 font-mono text-xs tracking-wide transition-colors ${
                  active === id
                    ? "text-content"
                    : "text-faint hover:text-muted"
                }`}
              >
                <span className="text-[10px] text-faint">{index}</span>
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/about"
              className="flex items-center gap-1.5 font-mono text-xs tracking-wide text-faint transition-colors hover:text-muted"
            >
              <span className="text-[10px] text-faint">00</span>
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="font-mono text-xs text-muted transition-colors hover:text-content md:hidden"
          >
            About
          </Link>
          <ThemeToggle />
          <a
            href="https://github.com/chaoticfame"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-hairline px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-hairline-strong hover:text-content"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
