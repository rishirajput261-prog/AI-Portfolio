import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {BookOpen, GraduationCap} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

export const Education: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative bg-[#080808] py-20 sm:py-28 border-t border-white/[0.08]"
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
              06 · ACADEMICS
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              Academic Foundation.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A3A3A3]">
            Update your exact degree, institution, university, and graduation year in{' '}
            <span className="font-mono-label text-white/85">src/data/portfolio.ts</span>.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl pl-7 sm:pl-10">
          <div
            className="absolute top-2 bottom-2 left-2.5 w-px bg-white/[0.14] sm:left-3.5"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {portfolioData.education.map((edu, idx) => (
              <motion.article
                key={edu.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1]}}
                className="relative rounded-2xl border border-white/[0.12] bg-[#171717] p-6 sm:p-8"
              >
                <div
                  className="absolute -left-7 top-7 flex h-5 w-5 items-center justify-center rounded-full border border-[#FF5722] bg-[#080808] sm:-left-10"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-[#FF5722]" />
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FF5722]/30 bg-[#FF5722]/10">
                      <GraduationCap className="h-6 w-6 text-[#FF5722]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                        {edu.degree}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/85">{edu.institution}</p>
                      <p className="mt-0.5 text-sm text-[#A3A3A3]">{edu.university}</p>
                    </div>
                  </div>

                  <span className="font-mono-label text-xs text-[#FF5722] shrink-0">
                    {edu.academicYear}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 border-t border-white/[0.08] pt-5 sm:grid-cols-12">
                  <div className="sm:col-span-5">
                    <p className="font-mono-label text-xs uppercase tracking-wider text-white/75">
                      Specialization
                    </p>
                    <p className="mt-1.5 text-sm text-[#A3A3A3]">{edu.specialization}</p>
                  </div>

                  <div className="sm:col-span-7">
                    <p className="font-mono-label text-xs uppercase tracking-wider text-white/75 flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
                      <span>Relevant Coursework</span>
                    </p>
                    <p className="mt-1.5 font-mono-label text-xs leading-relaxed text-[#A3A3A3]">
                      {edu.coursework.join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
