import React, {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowUpRight, ExternalLink, FolderGit2, X} from 'lucide-react';
import {portfolioData, ProjectCategory, ProjectItem} from '../data/portfolio';
import {ProjectArtwork} from './ProjectArtwork';

interface ProjectsProps {
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
}

const FILTER_TABS: {id: ProjectCategory; label: string}[] = [
  {id: 'all', label: 'All Works'},
  {id: 'fullstack', label: 'Full-Stack & Web'},
  {id: 'ai', label: 'AI Platforms'},
  {id: 'hardware', label: 'Embedded & Hardware'},
];

export const Projects: React.FC<ProjectsProps> = ({selectedProject, onSelectProject}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [linkNotice, setLinkNotice] = useState<string | null>(null);

  const filteredProjects =
    activeFilter === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectProject(null);
        setLinkNotice(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, onSelectProject]);

  const handleRepoOrDemoClick = (
    e: React.MouseEvent,
    project: ProjectItem,
    type: 'github' | 'live',
  ) => {
    e.stopPropagation();
    const url = type === 'github' ? project.githubUrl : project.liveUrl;
    if (url && url !== '#' && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    onSelectProject(project);
    setLinkNotice(
      type === 'github'
        ? `Repository link for "${project.title}" is an editable placeholder. Add the verified GitHub URL in src/data/portfolio.ts.`
        : `Live demo URL for "${project.title}" has not been linked yet. Add liveUrl in src/data/portfolio.ts when deployed.`,
    );
  };

  return (
    <section
      id="projects"
      className="relative bg-[#080808] py-20 sm:py-28 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        {/* Section Header + Interactive Filter Controls */}
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="font-mono-label text-xs tracking-wider text-[#FF5722] mb-2">
              02 · PORTFOLIO ARCHIVE
            </p>
            <h2
              className="font-heading font-semibold tracking-tight text-white"
              style={{fontSize: 'clamp(2rem, 4vw, 3rem)'}}
            >
              Selected Works.
            </h2>
            <p className="mt-2 max-w-xl text-base text-[#A3A3A3]">
              Things I&apos;ve built, ideas I&apos;ve explored, and solutions I&apos;ve developed.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.12] bg-[#111111] p-1.5"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-[#FF5722] to-[#C62828] text-white'
                    : 'text-[#A3A3A3] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetrical Editorial Gallery */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical 12-column editorial rhythm when viewing all 5 projects
            let colSpanClass = 'lg:col-span-6';
            if (activeFilter === 'all') {
              if (idx === 0) colSpanClass = 'lg:col-span-7';
              else if (idx === 1) colSpanClass = 'lg:col-span-5';
              else if (idx === 2) colSpanClass = 'lg:col-span-5';
              else if (idx === 3) colSpanClass = 'lg:col-span-7';
              else colSpanClass = 'lg:col-span-12';
            }

            const isWideHeroRow = activeFilter === 'all' && idx === 4;

            return (
              <motion.article
                key={project.id}
                initial={prefersReducedMotion ? false : {opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.15}}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#171717] transition-colors hover:border-[#FF5722]/50 ${colSpanClass} ${
                  isWideHeroRow ? 'lg:flex-row' : ''
                }`}
              >
                {/* Subtle orange-red radial glow behind card */}
                <div
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 card-accent-glow"
                  aria-hidden="true"
                />

                {/* Visual Frame */}
                <div
                  onClick={() => {
                    setLinkNotice(null);
                    onSelectProject(project);
                  }}
                  className={`relative overflow-hidden bg-[#111111] cursor-pointer ${
                    isWideHeroRow
                      ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2'
                      : 'aspect-[16/10] w-full'
                  }`}
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                      <ProjectArtwork artworkId={project.artworkId} />
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent opacity-80"
                    aria-hidden="true"
                  />
                </div>

                {/* Card Content */}
                <div
                  className={`relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-7 ${
                    isWideHeroRow ? 'lg:w-1/2 lg:p-9' : ''
                  }`}
                >
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-mono-label text-xs text-[#A3A3A3]">
                      <span className="text-[#FF5722]">PROJECT {project.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categoryLabel}</span>
                    </div>

                    <h3 className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3] sm:text-[15px]">
                      {project.description}
                    </p>

                    {/* Clean unboxed technology stack metadata */}
                    <p className="mt-4 font-mono-label text-xs leading-relaxed text-white/75">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>

                  {/* Interactive Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.1] pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setLinkNotice(null);
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#080808] transition-colors hover:bg-[#FF5722] hover:text-white cursor-pointer min-h-[40px] whitespace-nowrap"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleRepoOrDemoClick(e, project, 'github')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.16] bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#FF5722] cursor-pointer min-h-[40px] whitespace-nowrap"
                    >
                      <FolderGit2 className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
                      <span>GitHub Repository</span>
                    </button>

                    {project.liveUrl && (
                      <button
                        type="button"
                        onClick={(e) => handleRepoOrDemoClick(e, project, 'live')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.16] bg-[#111111] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/40 cursor-pointer min-h-[40px] whitespace-nowrap"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => {
            onSelectProject(null);
            setLinkNotice(null);
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.16] bg-[#111111] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171717]">
              {selectedProject.imageUrl ? (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProjectArtwork artworkId={selectedProject.artworkId} />
              )}
              <button
                type="button"
                onClick={() => {
                  onSelectProject(null);
                  setLinkNotice(null);
                }}
                aria-label="Close project details"
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#080808]/85 text-white transition-colors hover:border-[#FF5722] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono-label text-xs text-[#FF5722]">
                PROJECT {selectedProject.index} · {selectedProject.categoryLabel}
              </p>
              <h3
                id="project-modal-title"
                className="mt-2 font-heading text-2xl font-semibold text-white"
              >
                {selectedProject.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
                {selectedProject.description}
              </p>

              <div className="mt-6 border-t border-white/[0.1] pt-5">
                <h4 className="font-mono-label text-xs uppercase tracking-wider text-white/80 mb-3">
                  Architecture &amp; Scope
                </h4>
                <ul className="space-y-2 text-sm text-[#A3A3A3]">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5722]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-white/[0.1] pt-5">
                <h4 className="font-mono-label text-xs uppercase tracking-wider text-white/80 mb-2">
                  Technology Stack
                </h4>
                <p className="font-mono-label text-xs text-white/90">
                  {selectedProject.technologies.join(' · ')}
                </p>
              </div>

              {linkNotice && (
                <div className="mt-5 rounded-xl border border-[#FF5722]/40 bg-[#FF5722]/10 p-4 text-xs leading-relaxed text-white/90">
                  {linkNotice}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.1] pt-5">
                <button
                  type="button"
                  onClick={(e) => handleRepoOrDemoClick(e, selectedProject, 'github')}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF5722] to-[#C62828] px-4 py-2.5 text-xs font-medium text-white transition-all hover:brightness-110 cursor-pointer min-h-[40px]"
                >
                  <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {selectedProject.githubUrl
                      ? 'Open GitHub Repository'
                      : 'GitHub Repository (Editable Slot)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleRepoOrDemoClick(e, selectedProject, 'live')}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.16] bg-[#171717] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-white/35 cursor-pointer min-h-[40px]"
                >
                  <ExternalLink className="h-4 w-4 text-[#FF5722]" aria-hidden="true" />
                  <span>{selectedProject.liveUrl ? 'Open Live Demo' : 'Live Demo (Editable Slot)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
