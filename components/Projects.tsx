import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Badge } from "./ui/Badge";
import { Reveal } from "./ui/Reveal";
import { RichText } from "./ui/RichText";
import { SectionHeading } from "./ui/SectionHeading";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-b border-hairline/70 py-24 md:py-32"
    >
      <div className="mx-auto max-w-layout px-5 sm:px-8">
        <SectionHeading
          index="02"
          title="Production Projects"
          description="Core builds documented with measurable engineering outcomes — what was achieved, how it was measured, and the implementation that delivered it."
        />

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <Reveal as="article" key={project.id} delay={i * 0.05}>
              <div className="group grid grid-cols-1 gap-8 rounded-xl border border-hairline bg-panel/20 p-6 transition-colors duration-300 hover:border-hairline-strong hover:bg-panel/40 md:grid-cols-[1fr_1.5fr] md:p-8">
                {/* Left: identity */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between font-mono text-xs text-faint">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-content">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-faint">
                    {project.category}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-content"
                    >
                      View repository
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : null}
                </div>

                {/* Right: metric-driven highlights */}
                <ul className="flex flex-col gap-4 border-hairline md:border-l md:pl-8">
                  {project.highlights.map((highlight, h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-hairline-strong" />
                      <p className="text-[15px] leading-relaxed text-muted">
                        <RichText text={highlight} />
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
