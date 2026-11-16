import React from 'react';
import {ArrowUp} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

const QUICK_LINKS = [
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'projects', label: 'Projects'},
  {id: 'skills', label: 'Skills'},
  {id: 'contact', label: 'Contact'},
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: 'smooth'});
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className="bg-[#080808] border-t border-white/[0.12] py-12">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <div className="font-display flex items-center gap-2 text-base font-semibold tracking-tight text-white">
              <span>{portfolioData.owner.monogram}</span>
              <span className="text-[#FF5722]" aria-hidden="true">
                /
              </span>
              <span className="uppercase tracking-wider text-sm">
                {portfolioData.owner.fullName}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#A3A3A3]">
              {portfolioData.owner.footerTagline}
            </p>
          </div>

          <nav aria-label="Footer quick links" className="flex flex-wrap items-center gap-6">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="text-sm text-[#A3A3A3] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={portfolioData.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#A3A3A3] transition-colors hover:text-[#FF5722]"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#A3A3A3] transition-colors hover:text-[#FF5722]"
            >
              GitHub
            </a>
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="text-sm text-[#A3A3A3] transition-colors hover:text-[#FF5722]"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.1] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono-label text-xs text-[#A3A3A3]">
            &copy; {currentYear} {portfolioData.owner.fullName}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#111111] px-4 py-2 font-mono-label text-xs text-white transition-colors hover:border-[#FF5722] hover:text-[#FF5722] cursor-pointer min-h-[38px]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
