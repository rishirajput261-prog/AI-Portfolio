import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {Compass, GraduationCap, Layers, Target, User} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

const CARD_ICONS: Record<string, React.ReactNode> = {
  education: <GraduationCap className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  interests: <Layers className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  philosophy: <Compass className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
  goals: <Target className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />,
};

export const About: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative bg-[#080808] py-20 sm:py-28 border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.25}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-mono-label text-xs tracking-wider text-[#FF5722] mb-2">
              01 · INTRODUCTION
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              {portfolioData.about.title}
            </h2>
          </div>
          <p className="font-mono-label text-xs text-[#A3A3A3]">
            {portfolioData.owner.fullName} · {portfolioData.owner.location}
          </p>
        </motion.div>

        {/* Main 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Portrait Frame + Editable Academic Snapshot */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111111]"
          >
            <div className="relative aspect-[4/4.4] w-full overflow-hidden bg-[#141414]">
              {portfolioData.owner.profileImageUrl ? (
                <img
                  src={portfolioData.owner.profileImageUrl}
                  alt={`${portfolioData.owner.fullName} portrait`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 42%, rgba(255,87,34,0.22), rgba(198,40,40,0.08) 45%, transparent 72%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.16] bg-[#171717]">
                    <User className="h-12 w-12 text-[#FF5722]/85" aria-hidden="true" />
                  </div>
                  <p className="relative mt-5 font-display text-2xl font-medium tracking-tight text-white">
                    {portfolioData.owner.fullName}
                  </p>
                  <p className="relative mt-1.5 text-sm text-[#A3A3A3]">
                    {portfolioData.owner.role}
                  </p>
                  <p className="relative mt-4 font-mono-label text-[11px] text-[#A3A3A3]/80">
                    Portrait slot · Configure profileImageUrl in src/data/portfolio.ts
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.1] bg-[#171717]/60 p-6">
              <div className="flex items-center justify-between gap-4 text-xs text-[#A3A3A3] font-mono-label">
                <span>Role</span>
                <span className="text-white text-right">Software &amp; Backend Engineering</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-3 text-xs text-[#A3A3A3] font-mono-label">
                <span>Location</span>
                <span className="text-white">{portfolioData.owner.location}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-3 text-xs text-[#A3A3A3] font-mono-label">
                <span>Status</span>
                <span className="text-[#FF5722] text-right">
                  {portfolioData.owner.availability.enabled
                    ? portfolioData.owner.availability.label
                    : 'Currently Engaged'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio + 4 Structured Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <motion.div
              initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
              className="space-y-4 text-base leading-relaxed text-[#A3A3A3] sm:text-[17px]"
            >
              {portfolioData.about.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-white/95 font-normal text-lg' : ''}>
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* 4 Information Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {portfolioData.about.cards.map((card, idx) => (
                <motion.article
                  key={card.id}
                  initial={prefersReducedMotion ? false : {opacity: 0, y: 16}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#171717] p-6 transition-colors hover:border-white/[0.24]"
                >
                  <div>
                    <div className="mb-3 flex items-center gap-2.5">
                      {CARD_ICONS[card.id]}
                      <h3 className="font-heading text-base font-semibold text-white">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#A3A3A3]">{card.summary}</p>
                  </div>
                  <p className="mt-4 pt-3 border-t border-white/[0.08] font-mono-label text-[11px] text-[#A3A3A3]/90">
                    {card.meta}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
