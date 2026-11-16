import React, {useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Code2, Cpu, Database, Layout, Server, Wrench} from 'lucide-react';
import {portfolioData, SkillCategory} from '../data/portfolio';

const CATEGORY_ICONS: Record<SkillCategory['iconName'], React.ReactNode> = {
  code: <Code2 className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  layout: <Layout className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  server: <Server className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  database: <Database className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  wrench: <Wrench className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  cpu: <Cpu className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
};

export const Skills: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const matchingProjects = selectedSkill
    ? portfolioData.projects.filter((proj) =>
        proj.technologies.some(
          (tech) =>
            tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
            selectedSkill.toLowerCase().includes(tech.toLowerCase()),
        ),
      )
    : [];

  return (
    <section
      id="skills"
      className="relative bg-[#111111] py-20 sm:py-28 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono-label text-xs tracking-wider text-[#FF5722] mb-2">
              03 · CAPABILITIES
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              My Technical Arsenal.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A3A3A3]">
            Select any skill below to cross-reference related portfolio work across languages,
            backend systems, databases, and applied AI.
          </p>
        </motion.div>

        {selectedSkill && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#FF5722]/35 bg-[#171717] px-5 py-4 text-sm">
            <div>
              <span className="font-mono-label text-xs text-[#FF5722]">SELECTED SKILL · </span>
              <span className="font-medium text-white">{selectedSkill}</span>
              <span className="mx-2 text-white/30" aria-hidden="true">
                —
              </span>
              <span className="text-[#A3A3A3]">
                {matchingProjects.length > 0
                  ? `Applied in ${matchingProjects.map((p) => p.title).join(', ')}`
                  : 'Core foundational capability in software & systems development.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="font-mono-label text-xs text-white/80 hover:text-[#FF5722] cursor-pointer"
            >
              Clear selection
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.skillCategories.map((category, idx) => (
            <motion.article
              key={category.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1]}}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#171717] p-6 transition-colors hover:border-white/[0.24]"
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5">
                    {CATEGORY_ICONS[category.iconName]}
                    <h3 className="font-heading text-base font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono-label text-xs text-[#A3A3A3]">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          setSelectedSkill((prev) => (prev === skill ? null : skill))
                        }
                        aria-pressed={isSelected}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer min-h-[34px] ${
                          isSelected
                            ? 'border-[#FF5722] bg-[#FF5722]/15 text-white'
                            : 'border-white/[0.12] bg-[#111111] text-[#A3A3A3] hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
