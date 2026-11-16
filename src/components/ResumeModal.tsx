import React, {useEffect} from 'react';
import {Download, Printer, X} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({isOpen, onClose}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadHtmlResume = () => {
    const htmlContent = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${portfolioData.owner.fullName} — Resume</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111; max-width: 820px; margin: 40px auto; padding: 0 24px; line-height: 1.55; }
  h1 { margin: 0 0 4px; font-size: 28px; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 24px; }
  .meta { color: #555; font-size: 13px; margin-bottom: 16px; }
  ul { padding-left: 18px; margin: 6px 0; }
  li { margin-bottom: 4px; font-size: 14px; }
</style>
</head>
<body>
  <h1>${portfolioData.owner.fullName}</h1>
  <div class="meta">${portfolioData.owner.role} · ${portfolioData.owner.location} · ${portfolioData.contact.email}</div>
  <p>${portfolioData.about.paragraphs[0]}</p>

  <h2>Education</h2>
  ${portfolioData.education
    .map(
      (ed) =>
        `<p><strong>${ed.degree}</strong> — ${ed.institution}, ${ed.university} (${ed.academicYear})<br/>Specialization: ${ed.specialization}</p>`,
    )
    .join('')}

  <h2>Experience &amp; Internships</h2>
  ${portfolioData.experience
    .map(
      (exp) =>
        `<p><strong>${exp.role}</strong> — ${exp.organization}${exp.department ? ` (${exp.department})` : ''} · ${exp.duration}</p>`,
    )
    .join('')}

  <h2>Selected Projects</h2>
  <ul>
    ${portfolioData.projects
      .map(
        (proj) =>
          `<li><strong>${proj.title}</strong> (${proj.technologies.join(', ')}): ${proj.description}</li>`,
      )
      .join('')}
  </ul>

  <h2>Technical Skills</h2>
  <ul>
    ${portfolioData.skillCategories
      .map((cat) => `<li><strong>${cat.title}:</strong> ${cat.skills.join(', ')}</li>`)
      .join('')}
  </ul>

  <h2>Achievements &amp; Certifications</h2>
  <ul>
    ${portfolioData.achievements.map((ach) => `<li><strong>${ach.title}</strong> (${ach.year})</li>`).join('')}
  </ul>
</body>
</html>`;

    const blob = new Blob([htmlContent], {type: 'text/html;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rishi_Rajput_Resume.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#111111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.12] bg-[#171717] px-6 py-4">
          <div>
            <h2 id="resume-modal-title" className="font-heading text-lg font-semibold text-white">
              Curriculum Vitae — {portfolioData.owner.fullName}
            </h2>
            <p className="font-mono-label text-xs text-[#A3A3A3]">
              Structured summary ready for download or print-to-PDF
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.16] bg-[#111111] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:border-white/35 cursor-pointer min-h-[40px]"
            >
              <Printer className="h-3.5 w-3.5 text-[#FF5722]" aria-hidden="true" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadHtmlResume}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF5722] to-[#C62828] px-3.5 py-2 text-xs font-medium text-white transition-all hover:brightness-110 cursor-pointer min-h-[40px]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download CV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.12] bg-[#111111] text-[#A3A3A3] transition-colors hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-[#A3A3A3]">
          <div className="border-b border-white/[0.1] pb-5">
            <h3 className="font-display text-2xl font-semibold text-white">
              {portfolioData.owner.fullName}
            </h3>
            <p className="mt-1 text-white/85">{portfolioData.owner.role}</p>
            <p className="mt-1 font-mono-label text-xs text-[#A3A3A3]">
              {portfolioData.owner.location} · {portfolioData.contact.email}
            </p>
          </div>

          <div>
            <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2">
              Professional Summary
            </h4>
            <p className="leading-relaxed">{portfolioData.about.paragraphs[0]}</p>
          </div>

          <div>
            <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2">
              Experience &amp; Internships
            </h4>
            <div className="space-y-3">
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="rounded-xl border border-white/[0.08] bg-[#171717] p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-white">{exp.role}</p>
                    <span className="font-mono-label text-xs text-[#A3A3A3]">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] mt-0.5">
                    {exp.organization}
                    {exp.department ? ` — ${exp.department}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2">
              Selected Projects
            </h4>
            <ul className="space-y-2.5">
              {portfolioData.projects.map((p) => (
                <li key={p.id} className="rounded-xl border border-white/[0.08] bg-[#171717] p-3.5">
                  <p className="font-medium text-white">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed">{p.description}</p>
                  <p className="mt-1.5 font-mono-label text-[11px] text-[#FF5722]/90">
                    {p.technologies.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2">
              Technical Arsenal
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {portfolioData.skillCategories.map((cat) => (
                <div key={cat.id} className="rounded-xl border border-white/[0.08] bg-[#171717] p-3.5">
                  <p className="text-xs font-medium text-white">{cat.title}</p>
                  <p className="mt-1 text-xs text-[#A3A3A3]">{cat.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono-label text-xs uppercase tracking-wider text-[#FF5722] mb-2">
              Achievements &amp; Certifications
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {portfolioData.achievements.map((ach) => (
                <li key={ach.id}>
                  <span className="text-white">{ach.title}</span> ({ach.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
