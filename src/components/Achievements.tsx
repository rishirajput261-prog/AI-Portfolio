import React, {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Award, Eye, X} from 'lucide-react';
import {AchievementItem, portfolioData} from '../data/portfolio';

export const Achievements: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeAchievement, setActiveAchievement] = useState<AchievementItem | null>(null);

  useEffect(() => {
    if (!activeAchievement) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveAchievement(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeAchievement]);

  return (
    <section
      id="achievements"
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
              05 · CREDENTIALS &amp; HONORS
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              Milestones &amp; Recognition.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A3A3A3]">
            Selected awards, leadership certifications, and technical milestones. Click any card to
            open its certificate preview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioData.achievements.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1]}}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#171717] p-6 transition-colors hover:border-[#FF5722]/50"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono-label text-xs text-[#FF5722]">
                    {item.category}
                  </span>
                  <span className="font-mono-label text-xs text-[#A3A3A3]">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold leading-snug text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">{item.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="font-mono-label text-[11px] text-[#A3A3A3] truncate max-w-[65%]">
                  {item.certificateImageUrl ? 'Verified scan attached' : 'Certificate slot'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveAchievement(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white transition-colors hover:text-[#FF5722] cursor-pointer min-h-[36px] whitespace-nowrap"
                >
                  <Eye className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
                  <span>Preview</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expandable Certificate Preview Modal */}
      {activeAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
          onClick={() => setActiveAchievement(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.16] bg-[#111111] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.12] bg-[#171717] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
                <span className="font-mono-label text-xs text-white/90">
                  {activeAchievement.category} · {activeAchievement.year}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveAchievement(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-[#111111] text-[#A3A3A3] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.12] bg-[#171717]">
                {activeAchievement.certificateImageUrl ? (
                  <img
                    src={activeAchievement.certificateImageUrl}
                    alt={`${activeAchievement.title} certificate`}
                    referrerPolicy="no-referrer"
                    className="w-full object-contain max-h-[340px]"
                  />
                ) : (
                  <div className="relative flex flex-col items-center justify-center px-6 py-12 text-center">
                    <div
                      className="pointer-events-none absolute inset-0 card-accent-glow"
                      aria-hidden="true"
                    />
                    <Award className="relative h-10 w-10 text-[#FF5722] mb-3" aria-hidden="true" />
                    <p className="relative font-heading text-base font-semibold text-white">
                      {activeAchievement.title}
                    </p>
                    <p className="relative mt-2 max-w-sm text-xs leading-relaxed text-[#A3A3A3]">
                      {activeAchievement.issuingNote}
                    </p>
                  </div>
                )}
              </div>

              <h3
                id="achievement-modal-title"
                className="font-heading text-xl font-semibold text-white"
              >
                {activeAchievement.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                {activeAchievement.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
