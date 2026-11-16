import React, {useEffect, useState} from 'react';
import {Download, Menu, X} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'projects', label: 'Projects'},
  {id: 'skills', label: 'Skills'},
  {id: 'experience', label: 'Experience'},
  {id: 'achievements', label: 'Achievements'},
  {id: 'contact', label: 'Contact'},
];

export const Navbar: React.FC<NavbarProps> = ({onOpenResume}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#080808]/88 backdrop-blur-md border-b border-white/[0.12]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        {/* Left Brand Mark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display flex items-center gap-2 text-sm font-semibold tracking-tight text-white whitespace-nowrap shrink-0 sm:text-base"
        >
          <span className="text-white">{portfolioData.owner.monogram}</span>
          <span className="text-white/30" aria-hidden="true">
            /
          </span>
          <span className="font-mono-label text-[11px] font-normal tracking-wider text-[#A3A3A3] hidden sm:inline">
            {portfolioData.owner.brandLabel}
          </span>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              data-active={activeSection === item.id ? 'true' : 'false'}
              className={`nav-link-underline text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeSection === item.id
                  ? 'text-white'
                  : 'text-[#A3A3A3] hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-[#111111]/80 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:border-[#FF5722] hover:bg-[#FF5722]/10 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <Download className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
            <span>Download CV</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-[#111111] text-white transition-colors hover:border-white/30 lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="border-t border-white/[0.12] bg-[#080808]/96 backdrop-blur-lg px-6 py-5 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#171717] text-white'
                      : 'text-[#A3A3A3] hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="font-mono-label text-xs text-[#FF5722]">Active</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
