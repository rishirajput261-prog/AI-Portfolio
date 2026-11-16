import React, {useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Briefcase, ChevronDown, ChevronUp} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

export const Experience: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string>(portfolioData.experience[0]?.id ?? '');

  return (
    <section
      id="experience"
      className="relative bg-[#080808] py-20 sm:py-28 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="font-mono-label text-xs tracking-wider text-[#FF5722] mb-2">
              04 · EXPERIENCE &amp; INTERNSHIPS
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              Professional Journey.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A3A3A3]">
            Industry apprenticeships and engineering internships. All editable fields can be refined
            in <span className="font-mono-label text-white/85">src/data/portfolio.ts</span>.
          </p>
        </motion.div>

        {/* Vertical Interactive Timeline */}
        <div className="relative mx-auto max-w-4xl pl-7 sm:pl-10">
          {/* Thin vertical timeline line */}
          <div
            className="absolute top-2 bottom-2 left-2.5 w-px bg-white/[0.14] sm:left-3.5"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {portfolioData.experience.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              return (
                <motion.article
                  key={item.id}
                  initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1]}}
                  className="relative"
                >
                  {/* Orange timeline marker */}
                  <div
                    className={`absolute -left-7 top-7 flex h-5 w-5 items-center justify-center rounded-full border sm:-left-10 ${
                      isExpanded
                        ? 'border-[#FF5722] bg-[#FF5722]/25'
                        : 'border-[#FF5722]/60 bg-[#080808]'
                    }`}
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#FF5722]" />
                  </div>

                  <div className="rounded-2xl border border-white/[0.12] bg-[#171717] transition-colors hover:border-white/[0.24]">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] bg-[#111111] font-mono-label text-xs font-semibold text-[#FF5722]">
                          {item.logoUrl ? (
                            <img
                              src={item.logoUrl}
                              alt={`${item.organization} logo`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full rounded-xl object-contain p-1.5"
                            />
                          ) : (
                            item.organizationMonogram
                          )}
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-[#A3A3A3]">
                            {item.organization}
                            {item.department ? ` · ${item.department}` : ''}
                          </p>
                          <p className="mt-1.5 font-mono-label text-xs text-white/75">
                            {item.duration} · {item.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center text-xs font-mono-label text-[#A3A3A3]">
                        <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-white/[0.1] px-6 pb-6 pt-5 space-y-5">
                        <div>
                          <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2.5 flex items-center gap-2">
                            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Responsibilities</span>
                          </h4>
                          <ul className="space-y-2 text-sm text-[#A3A3A3]">
                            {item.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 border-t border-white/[0.08] pt-5">
                          <div>
                            <h4 className="font-mono-label text-xs uppercase tracking-wider text-white/80 mb-2">
                              Skills Gained
                            </h4>
                            <p className="font-mono-label text-xs leading-relaxed text-[#A3A3A3]">
                              {item.skillsGained.join(' · ')}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-mono-label text-xs uppercase tracking-wider text-white/80 mb-2">
                              Major Contributions
                            </h4>
                            <ul className="space-y-1.5 text-sm text-[#A3A3A3]">
                              {item.contributions.map((contrib, cIdx) => (
                                <li key={cIdx}>{contrib}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
