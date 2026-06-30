# chaoticfame — Developer Portfolio

An ultra-minimalist, number-driven developer portfolio for a **Full-Stack Developer & Software Engineer** with core interests in **Backend Logic, Database Architectures, Cybersecurity, and AI/ML**.

Built with a deep focus on shipping functional applications, clean git workflows, and production-grade delivery.

## Stack

- **Framework:** Next.js 14 (App Router) · React · TypeScript
- **Styling:** Tailwind CSS (monospace typography for code elements)
- **Animations:** Framer Motion (subtle, GPU-friendly, scroll-triggered once)
- **Icons:** Lucide React

## Sections

| Index | Section | Purpose |
| ----- | ------- | ------- |
| `01` | Overview | Hero headline, metric grid, direct links |
| `02` | Production Projects | Metric-driven project cards (Kiroku, JoJo's Bizarre Coffee, Hello Sage) |
| `03` | Engineering Competencies | Modular tech-stack blocks |
| `04` | Open Source Activity | Mock GitHub activity board, contribution heatmap, commit feed |

## Getting Started

> Requires **Node.js 18.18+** (Node 20 LTS or newer recommended).

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm run start
```

## Customizing Content

All content is centralized in a single typed data file — no need to touch component markup:

```
lib/data.ts
```

Edit the typed objects/arrays to update:

- `profile` — name, role, headline, narrative, email
- `socialLinks` — GitHub / LinkedIn / Email
- `metrics` — hero highlight counters
- `projects` — project cards (stack badges + metric highlights; use `**bold**` for emphasis)
- `techGroups` — engineering competency blocks
- `repoCards` / `recentCommits` / `contributionStats` — GitHub footprint section

## Project Structure

```
app/
  layout.tsx          # Fonts, metadata, theme
  page.tsx            # Section composition
  globals.css         # Tailwind layers + backdrop utilities
components/
  Nav.tsx             # Sticky nav with active-section tracking
  Hero.tsx            # 01 — Overview
  Projects.tsx        # 02 — Production Projects
  TechStack.tsx       # 03 — Engineering Competencies
  GitHubFootprint.tsx # 04 — Open Source Activity
  ContributionGraph.tsx
  Footer.tsx
  ui/                 # Reusable primitives (Reveal, Badge, RichText, SectionHeading)
lib/
  data.ts             # All typed content
```

## Notes

- The GitHub footprint section is a **custom mock UI** (deterministic, no API calls) so it renders instantly and never hydrates inconsistently. Swap in the GitHub REST/GraphQL API in `GitHubFootprint.tsx` if you want live data.
- Fully responsive across mobile, laptop, and ultra-wide displays.
