import React from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowDown, ArrowRight, Download, Github, Linkedin, MapPin} from 'lucide-react';
import {portfolioData, ProjectItem} from '../data/portfolio';
import {EditorialStarburst, ProjectArtwork} from './ProjectArtwork';

interface HeroProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({onSelectProject, onOpenResume}) => {
  const prefersReducedMotion = useReducedMotion();
  const heroProjects = portfolioData.projects.filter((p) => p.featuredInHero).slice(0, 4);

  const handleScrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({behavior: 'smooth'});
  };

  const renderTiltedCard = (project: ProjectItem, idx: number) => {
    const tilt = project.heroTiltDeg ?? 0;
    const verticalOffset =
      idx === 0
        ? 'lg:translate-y-8'
        : idx === 1
          ? 'lg:translate-y-4'
          : idx === 2
            ? 'lg:-translate-y-5'
            : 'lg:-translate-y-2';

    return (
      <motion.button
        key={project.id}
        type="button"
        onClick={() => onSelectProject(project)}
        initial={prefersReducedMotion ? false : {opacity: 0, y: 26, rotate: tilt}}
        animate={prefersReducedMotion ? {opacity: 1} : {opacity: 1, y: 0, rotate: tilt}}
        transition={{
          duration: 0.65,
          delay: 0.2 + idx * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {y: -10, rotate: 0, scale: 1.03, transition: {duration: 0.22}}
        }
        className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#171717] text-left shadow-2xl transition-colors hover:border-[#FF5722]/60 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FF5722] ${verticalOffset}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
              <ProjectArtwork artworkId={project.artworkId} />
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono-label text-white/80">
            <span>{project.index}</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#A3A3A3]">{project.categoryLabel}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-2 p-4">
          <h3 className="font-heading text-sm font-semibold leading-snug text-white group-hover:text-[#FF5722] transition-colors">
            {project.title}
          </h3>
          <p className="font-mono-label text-[11px] text-[#A3A3A3] truncate">
            {project.technologies.slice(0, 3).join(' · ')}
          </p>
        </div>
      </motion.button>
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#080808] pt-24 pb-10 sm:pt-28 lg:pt-32"
    >
      {/* Architectural vertical lines and subtle radial illumination */}
      <div
        className="pointer-events-none absolute inset-0 editorial-grid-lines opacity-90"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 hero-corner-glow" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-orange-glow"
        animate={
          prefersReducedMotion
            ? undefined
            : {opacity: [0.85, 1, 0.85], scale: [1, 1.03, 1]}
        }
        transition={{duration: 8, repeat: Infinity, ease: 'easeInOut'}}
      />

      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col px-5 sm:px-8 lg:px-10">
        {/* Top editorial metadata strip */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 text-xs text-[#A3A3A3]"
        >
          <div className="flex flex-wrap items-center gap-3 font-mono-label tracking-wider">
            <span className="text-white">
              {portfolioData.owner.brandLabel} / {portfolioData.owner.year}
            </span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
              {portfolioData.owner.location}
            </span>
            <span aria-hidden="true" className="text-white/30 hidden sm:inline">
              ·
            </span>
            <span className="hidden sm:inline">{portfolioData.owner.role}</span>
          </div>

          {portfolioData.owner.availability.enabled && (
            <div className="font-mono-label text-xs text-white/90">
              <span className="text-[#FF5722] mr-1.5" aria-hidden="true">
                *
              </span>
              {portfolioData.owner.availability.label}
            </div>
          )}
        </motion.div>

        {/* Staggered Editorial Headline + Intro Lockup (matching reference image composition) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <h1
              className="font-display font-normal tracking-tight text-white leading-[0.98]"
              style={{
                fontSize: 'clamp(2.75rem, 6.2vw, 5.5rem)',
                textWrap: 'balance',
              }}
            >
              <span className="block bg-gradient-to-r from-white via-white to-white/75 bg-clip-text text-transparent">
                {portfolioData.owner.headlineTop}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 lg:pt-3"
          >
            <p className="max-w-md text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
              {portfolioData.owner.heroIntro}
            </p>
          </motion.div>
        </div>

        {/* Staggered Second Headline + Orange-Red Starburst */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 22}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1]}}
          className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6 lg:ml-[18%]"
        >
          <div
            className="font-display font-normal tracking-tight text-white leading-[0.98]"
            style={{fontSize: 'clamp(2.75rem, 6.2vw, 5.5rem)'}}
          >
            {portfolioData.owner.headlineBottom}
          </div>
          <motion.div
            animate={prefersReducedMotion ? undefined : {rotate: [0, 90]}}
            transition={{duration: 24, repeat: Infinity, ease: 'linear'}}
            className="shrink-0"
          >
            <EditorialStarburst className="h-11 w-11 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1]}}
          className="mt-4 flex flex-wrap items-center gap-4 lg:ml-[18%]"
        >
          <p className="font-heading text-lg font-medium tracking-tight text-white/85 sm:text-xl">
            {portfolioData.owner.subHeadline}
          </p>
        </motion.div>

        {/* Asymmetrical Floating Visual Cards (4 cards sweeping across the vertical grid) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {heroProjects.map((project, idx) => renderTiltedCard(project, idx))}
        </div>

        {/* Action Strip & Editorial Gallery Link */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1]}}
          className="mt-14 flex flex-col justify-between gap-6 border-t border-white/[0.12] pt-8 sm:flex-row sm:items-center lg:mt-16"
        >
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleScrollTo('projects')}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF5722] to-[#C62828] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#FF5722]/20 transition-all duration-200 hover:brightness-110 cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <span>Explore My Work</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-[#111111] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#FF5722] hover:bg-[#171717] cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <Download className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={portfolioData.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#A3A3A3] transition-colors hover:text-white min-h-[40px]"
            >
              <Linkedin className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href={portfolioData.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#A3A3A3] transition-colors hover:text-white min-h-[40px]"
            >
              <Github className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <button
              type="button"
              onClick={() => handleScrollTo('about')}
              className="inline-flex items-center gap-1.5 font-mono-label text-xs text-white/80 transition-colors hover:text-[#FF5722] cursor-pointer min-h-[40px]"
            >
              <span>Explore To Learn More</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
