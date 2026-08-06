"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { profile, projects, sections, socialLinks, techGroups } from "@/lib/data";

export const OPEN_TERMINAL_EVENT = "open-terminal";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const PROMPT = `${profile.handle}@portfolio:~$`;

const BANNER: string[] = [
  `${profile.name} — ${profile.role}`,
  `Interactive shell. Type "help" to see available commands.`,
];

export function Terminal() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const print = useCallback((text: string, kind: Line["kind"] = "out") => {
    setLines((prev) => [...prev, { kind, text }]);
  }, []);

  const printMany = useCallback((texts: string[], kind: Line["kind"] = "out") => {
    setLines((prev) => [...prev, ...texts.map((text) => ({ kind, text }))]);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const setTheme = useCallback((next: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  }, []);

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      setLines((prev) => [...prev, { kind: "cmd", text: trimmed }]);
      if (!trimmed) return;

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");

      switch (cmd.toLowerCase()) {
        case "help":
          printMany([
            "Available commands:",
            "  help              show this list",
            "  whoami            who is this",
            "  about             open the about page",
            "  projects          list production projects",
            "  open <project>    open a project repo (e.g. open kiroku)",
            "  stack             list engineering competencies",
            "  socials           list contact links",
            "  github            open GitHub profile",
            "  email             copy email to clipboard",
            "  goto <section>    scroll to a section (overview/projects/stack/activity)",
            "  theme <mode>      switch theme (dark/light) or toggle",
            "  ls                list site sections",
            "  echo <text>       print text",
            "  date              current date/time",
            "  clear             clear the screen",
            "  exit              close the terminal",
          ]);
          break;

        case "whoami":
          printMany([
            profile.name,
            profile.role,
            `@${profile.handle}`,
          ]);
          break;

        case "about":
          print("Opening about page…");
          router.push("/about");
          setTimeout(close, 250);
          break;

        case "projects":
          printMany([
            "Production projects:",
            ...projects.map((p) => `  • ${p.name} — ${p.category} [${p.stack.join(", ")}]`),
            'Tip: run "open <project>" to visit a repo.',
          ]);
          break;

        case "open": {
          if (!arg) {
            print("usage: open <project>", "err");
            break;
          }
          const match = projects.find(
            (p) =>
              p.id === arg.toLowerCase() ||
              p.name.toLowerCase() === arg.toLowerCase()
          );
          if (match?.repo) {
            print(`Opening ${match.name}…`);
            window.open(match.repo, "_blank");
          } else {
            print(`project not found: ${arg}`, "err");
          }
          break;
        }

        case "stack":
        case "skills":
          printMany([
            "Engineering competencies:",
            ...techGroups.map((g) => `  ${g.title}: ${g.items.join(", ")}`),
          ]);
          break;

        case "socials":
        case "contact":
          printMany([
            "Find me here:",
            ...socialLinks.map((l) => `  ${l.label.padEnd(9)} ${l.handle}`),
          ]);
          break;

        case "github":
          print("Opening GitHub…");
          window.open(`https://github.com/${profile.handle}`, "_blank");
          break;

        case "email":
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(profile.email)
              .then(() => print(`Copied ${profile.email} to clipboard.`))
              .catch(() => print(profile.email));
          } else {
            print(profile.email);
          }
          break;

        case "goto": {
          const target = sections.find(
            (s) => s.id === arg.toLowerCase() || s.label.toLowerCase() === arg.toLowerCase()
          );
          if (!target) {
            print(`usage: goto <${sections.map((s) => s.id).join("|")}>`, "err");
            break;
          }
          const el = document.getElementById(target.id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            router.push(`/#${target.id}`);
          }
          print(`Navigating to ${target.label}…`);
          setTimeout(close, 250);
          break;
        }

        case "theme": {
          const mode = arg.toLowerCase();
          if (mode === "light" || mode === "dark") {
            setTheme(mode);
            print(`Theme set to ${mode}.`);
          } else {
            const next = document.documentElement.classList.contains("light")
              ? "dark"
              : "light";
            setTheme(next);
            print(`Theme toggled to ${next}.`);
          }
          break;
        }

        case "ls":
          printMany(sections.map((s) => `${s.index}  ${s.label.toLowerCase().replace(/\s+/g, "-")}/`));
          break;

        case "echo":
          print(arg);
          break;

        case "date":
          print(new Date().toString());
          break;

        case "sudo":
          print("nice try. permission denied.", "err");
          break;

        case "clear":
          setLines([]);
          break;

        case "exit":
        case "quit":
          close();
          break;

        default:
          print(`command not found: ${cmd}. Type "help".`, "err");
      }
    },
    [print, printMany, router, close, setTheme]
  );

  // Open via custom event.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_TERMINAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TERMINAL_EVENT, onOpen);
  }, []);

  // Seed the banner the first time it opens; lock scroll + focus.
  useEffect(() => {
    if (!open) return;
    setLines((prev) => (prev.length === 0 ? BANNER.map((t) => ({ kind: "out" as const, text: t })) : prev));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open]);

  // Auto-scroll to the newest line.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input;
      run(value);
      if (value.trim()) {
        setHistory((h) => [...h, value]);
      }
      setHistIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistory((h) => {
        if (h.length === 0) return h;
        const idx = histIndex === -1 ? h.length - 1 : Math.max(0, histIndex - 1);
        setHistIndex(idx);
        setInput(h[idx]);
        return h;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistory((h) => {
        if (h.length === 0 || histIndex === -1) return h;
        const idx = histIndex + 1;
        if (idx >= h.length) {
          setHistIndex(-1);
          setInput("");
        } else {
          setHistIndex(idx);
          setInput(h[idx]);
        }
        return h;
      });
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[101] flex items-start justify-center px-4 pt-[10vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            className="relative flex h-[70vh] max-h-[560px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-hairline bg-panel/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="ml-2 font-mono text-xs text-faint">
                {PROMPT.replace("$", "")} — bash
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close terminal"
                className="ml-auto text-faint transition-colors hover:text-content"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Output */}
            <div
              ref={bodyRef}
              className="scrollbar-thin flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((line, i) => {
                if (line.kind === "cmd") {
                  return (
                    <div key={i} className="flex gap-2">
                      <span className="shrink-0 text-emerald-500/90">{PROMPT}</span>
                      <span className="text-content">{line.text}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.kind === "err" ? "text-red-400/90" : "text-muted"
                    }`}
                  >
                    {line.text}
                  </div>
                );
              })}

              {/* Active input line */}
              <div className="flex gap-2">
                <span className="shrink-0 text-emerald-500/90">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent text-content caret-emerald-400 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
