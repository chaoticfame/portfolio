import { profile, socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-layout px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="max-w-md text-balance text-xl font-medium leading-snug tracking-tight text-content">
              Let&apos;s build something with technical gravity.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block font-mono text-sm text-muted underline-offset-4 transition-colors hover:text-content hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2.5 font-mono text-sm text-faint transition-colors hover:text-content"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-hairline pt-6 font-mono text-xs text-faint sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name} · @{profile.handle}
          </span>
          <span>Built with Next.js · TypeScript · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
