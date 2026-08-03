"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Command as CommandIcon,
  CornerDownRight,
  Copy,
  Github,
  Home,
  Linkedin,
  Mail,
  SunMoon,
  User,
  type LucideIcon,
} from "lucide-react";
import { profile, sections, socialLinks } from "@/lib/data";

export const OPEN_EVENT = "open-command-palette";

type CommandItem = {
  id: string;
  label: string;
  group: "Navigation" | "Links" | "Actions";
  icon: LucideIcon;
  keywords?: string;
  hint?: string;
  perform: () => void;
};

const linkIcon: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export function CommandPalette() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const goSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${id}`);
      }
    },
    [router]
  );

  const flashToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    flashToast(`Switched to ${next} theme`);
  }, [flashToast]);

  const commands = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      {
        id: "home",
        label: "Go to Home",
        group: "Navigation",
        icon: Home,
        keywords: "top overview start",
        perform: () => goSection("overview"),
      },
      ...sections.map((s) => ({
        id: `nav-${s.id}`,
        label: `${s.index} — ${s.label}`,
        group: "Navigation" as const,
        icon: CornerDownRight,
        keywords: s.label,
        perform: () => goSection(s.id),
      })),
      {
        id: "about",
        label: "About me",
        group: "Navigation",
        icon: User,
        keywords: "bio profile who",
        perform: () => router.push("/about"),
      },
    ];

    const links: CommandItem[] = socialLinks.map((l) => ({
      id: `link-${l.label}`,
      label: l.label,
      group: "Links",
      icon: linkIcon[l.label] ?? ArrowRight,
      keywords: `${l.handle} open external`,
      hint: "↗",
      perform: () => window.open(l.href, l.href.startsWith("http") ? "_blank" : "_self"),
    }));

    const actions: CommandItem[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        keywords: `${profile.email} clipboard`,
        perform: () => {
          navigator.clipboard
            ?.writeText(profile.email)
            .then(() => flashToast("Email copied to clipboard"))
            .catch(() => flashToast("Couldn't copy email"));
        },
      },
      {
        id: "toggle-theme",
        label: "Toggle light / dark theme",
        group: "Actions",
        icon: SunMoon,
        keywords: "color mode dark light appearance",
        perform: toggleTheme,
      },
    ];

    return [...nav, ...links, ...actions];
  }, [goSection, router, flashToast, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Reset active index when the result set changes.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Global open shortcut (⌘K / Ctrl+K) + custom open event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // Lock scroll + focus input while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open]);

  const run = useCallback(
    (cmd?: CommandItem) => {
      if (!cmd) return;
      close();
      // Defer so the palette unmounts before navigation/scroll.
      window.setTimeout(() => cmd.perform(), 0);
    },
    [close]
  );

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // Keep the active item scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const groups = ["Navigation", "Links", "Actions"] as const;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-xl overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl shadow-black/40"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onListKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-hairline px-4">
                <CommandIcon className="h-4 w-4 shrink-0 text-faint" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  className="h-12 w-full bg-transparent font-mono text-sm text-content placeholder:text-faint focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="scrollbar-thin max-h-[50vh] overflow-y-auto p-2"
              >
                {filtered.length === 0 ? (
                  <p className="px-3 py-6 text-center font-mono text-sm text-faint">
                    No results for &quot;{query}&quot;
                  </p>
                ) : (
                  groups.map((group) => {
                    const items = filtered.filter((c) => c.group === group);
                    if (items.length === 0) return null;
                    return (
                      <div key={group} className="mb-1 last:mb-0">
                        <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                          {group}
                        </div>
                        {items.map((cmd) => {
                          const index = filtered.indexOf(cmd);
                          const isActive = index === active;
                          const Icon = cmd.icon;
                          return (
                            <button
                              key={cmd.id}
                              data-index={index}
                              type="button"
                              onMouseMove={() => setActive(index)}
                              onClick={() => run(cmd)}
                              aria-current={isActive ? "true" : undefined}
                              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-sm transition-colors ${
                                isActive
                                  ? "bg-panel text-content"
                                  : "text-muted"
                              }`}
                            >
                              <Icon className="h-4 w-4 shrink-0 text-faint" />
                              <span className="flex-1 truncate">{cmd.label}</span>
                              {cmd.hint ? (
                                <span className="text-xs text-faint">
                                  {cmd.hint}
                                </span>
                              ) : null}
                              {isActive ? (
                                <ArrowRight className="h-3.5 w-3.5 text-faint" />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between border-t border-hairline px-4 py-2 font-mono text-[10px] text-faint">
                <span className="flex items-center gap-2">
                  <kbd className="rounded border border-hairline px-1 py-0.5">↑</kbd>
                  <kbd className="rounded border border-hairline px-1 py-0.5">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="rounded border border-hairline px-1 py-0.5">↵</kbd>
                  select
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transient toast for copy / theme feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-lg border border-hairline bg-surface px-4 py-2 font-mono text-xs text-content shadow-lg shadow-black/30"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
