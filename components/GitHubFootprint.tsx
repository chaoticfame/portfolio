import {
  GitBranch,
  GitCommitHorizontal,
  GitFork,
  Star,
} from "lucide-react";
import {
  contributionStats,
  profile,
  recentCommits,
  repoCards,
} from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { ContributionGraph } from "./ContributionGraph";

export function GitHubFootprint() {
  return (
    <section
      id="activity"
      className="scroll-mt-24 border-b border-hairline/70 py-24 md:py-32"
    >
      <div className="mx-auto max-w-layout px-5 sm:px-8">
        <SectionHeading
          index="04"
          title="Open Source Activity"
          description="A live-style readout of version-control dedication — semantic commits, disciplined branch tracking, and consistent contribution cadence."
        />

        {/* Contribution stat row */}
        <Reveal className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline/60 md:grid-cols-4">
          {contributionStats.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-5">
              <div className="text-xl font-semibold text-content">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-faint">
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          {/* Contribution heatmap + commit feed */}
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-xl border border-hairline bg-panel/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-sm text-muted">
                  <span className="text-faint">@</span>
                  {profile.handle}
                </div>
                <span className="font-mono text-xs text-faint">
                  contributions · last 12 weeks
                </span>
              </div>
              <div className="mt-6">
                <ContributionGraph />
              </div>
            </div>

            {/* Commit terminal */}
            <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
              <div className="flex items-center gap-2 border-b border-hairline bg-panel/40 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                <span className="ml-2 font-mono text-xs text-faint">
                  git log --oneline
                </span>
              </div>
              <div className="scrollbar-thin max-h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
                {recentCommits.map((commit) => (
                  <div
                    key={commit.hash}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 py-1.5"
                  >
                    <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0 text-faint" />
                    <span className="text-amber-500/90">{commit.hash}</span>
                    <span className="flex items-center gap-1 text-faint">
                      <GitBranch className="h-3 w-3" />
                      {commit.branch}
                    </span>
                    <span className="text-muted">{commit.message}</span>
                    <span className="ml-auto text-faint">{commit.time}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 text-faint">
                  <span className="text-emerald-500/90">$</span>
                  <span className="inline-block h-3.5 w-2 animate-blink bg-faint align-middle" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pinned repositories */}
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            {repoCards.map((repo) => (
              <a
                key={repo.name}
                href={`https://github.com/${profile.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-hairline bg-panel/20 p-5 transition-colors duration-300 hover:border-hairline-strong hover:bg-panel/40"
              >
                <div className="flex items-center gap-2 font-mono text-sm text-content">
                  <GitBranch className="h-3.5 w-3.5 text-faint" />
                  <span className="transition-colors group-hover:text-content">
                    {repo.name}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {repo.description}
                </p>
                <div className="mt-4 flex items-center gap-4 font-mono text-xs text-faint">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks}
                  </span>
                  <span className="ml-auto">{repo.updated}</span>
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
