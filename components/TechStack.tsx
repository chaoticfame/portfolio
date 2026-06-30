import { techGroups } from "@/lib/data";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function TechStack() {
  return (
    <section
      id="stack"
      className="scroll-mt-24 border-b border-neutral-800/70 py-24 md:py-32"
    >
      <div className="mx-auto max-w-layout px-5 sm:px-8">
        <SectionHeading
          index="03"
          title="Engineering Competencies"
          description="The stack, organized into strict engineering blocks — from raw languages to applied focus areas in security and AI/ML infrastructure."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {techGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/20 p-6 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/40">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-neutral-100">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-neutral-600">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-5 h-px w-full bg-neutral-800" />

                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-mono text-sm text-neutral-400"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                      {item}
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
