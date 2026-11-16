import React, {useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from 'lucide-react';
import {portfolioData} from '../data/portfolio';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a subject (at least 3 characters).';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      const data = (await response.json()) as {ok?: boolean; message?: string; error?: string};

      if (!response.ok || !data.ok) {
        setSubmitResult({
          type: 'error',
          message:
            data.error ||
            'Unable to send message right now. Please try emailing directly.',
        });
        return;
      }

      setSubmitResult({
        type: 'success',
        message:
          data.message || 'Thank you for reaching out. Your inquiry has been received.',
      });
      setForm({name: '', email: '', subject: '', message: ''});
      setErrors({});
    } catch {
      setSubmitResult({
        type: 'error',
        message:
          'Network error while sending your message. Please check your connection or email directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#111111] py-20 sm:py-28 border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
          className="mb-12"
        >
          <p className="font-mono-label text-xs tracking-wider text-[#FF5722] mb-2">
            07 · GET IN TOUCH
          </p>
          <h2
            className="font-heading font-semibold tracking-tight text-white"
            style={{fontSize: 'clamp(2rem, 4.2vw, 3.25rem)'}}
          >
            Let&apos;s Build Something Great.
          </h2>
          <p className="mt-3 max-w-xl text-base text-[#A3A3A3]">
            Have an interesting opportunity, project, or collaboration in mind? Let&apos;s connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Channels */}
          <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#171717] p-6 sm:p-8"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Direct Channels
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
                  Open to software engineering internships, backend developer roles, full-stack
                  collaborations, and technical discussions.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/[0.08] pt-6">
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#111111] px-4 py-3.5 transition-colors hover:border-[#FF5722]/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 shrink-0 text-[#FF5722]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-mono-label text-[11px] text-[#A3A3A3]">Email</p>
                      <p className="truncate text-sm font-medium text-white">
                        {portfolioData.contact.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#A3A3A3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5722]"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={portfolioData.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#111111] px-4 py-3.5 transition-colors hover:border-[#FF5722]/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Linkedin className="h-4 w-4 shrink-0 text-[#FF5722]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-mono-label text-[11px] text-[#A3A3A3]">LinkedIn</p>
                      <p className="truncate text-sm font-medium text-white">
                        Connect on LinkedIn
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#A3A3A3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5722]"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={portfolioData.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/[0.1] bg-[#111111] px-4 py-3.5 transition-colors hover:border-[#FF5722]/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Github className="h-4 w-4 shrink-0 text-[#FF5722]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-mono-label text-[11px] text-[#A3A3A3]">GitHub</p>
                      <p className="truncate text-sm font-medium text-white">
                        View Repositories
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#A3A3A3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF5722]"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <p className="font-mono-label text-[11px] text-[#A3A3A3]">
                {portfolioData.contact.secondaryPlatformLabel}
              </p>
              <p className="mt-1 text-xs text-[#A3A3A3]/85">
                {portfolioData.contact.secondaryPlatformNote}
              </p>
            </div>
          </motion.div>

          {/* Validated Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={prefersReducedMotion ? false : {opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7 rounded-2xl border border-white/[0.12] bg-[#171717] p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono-label text-xs text-white/90 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({...prev, name: e.target.value}))}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="w-full rounded-xl border border-white/[0.14] bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/60 transition-colors focus:border-[#FF5722] focus:outline-none"
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-[#FF7043]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono-label text-xs text-white/90 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({...prev, email: e.target.value}))}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="w-full rounded-xl border border-white/[0.14] bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/60 transition-colors focus:border-[#FF5722] focus:outline-none"
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-[#FF7043]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-subject"
                className="block font-mono-label text-xs text-white/90 mb-2"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm((prev) => ({...prev, subject: e.target.value}))}
                placeholder="Role inquiry, project collaboration, or technical discussion"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className="w-full rounded-xl border border-white/[0.14] bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/60 transition-colors focus:border-[#FF5722] focus:outline-none"
              />
              {errors.subject && (
                <p id="contact-subject-error" className="mt-1.5 text-xs text-[#FF7043]">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="block font-mono-label text-xs text-white/90 mb-2"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((prev) => ({...prev, message: e.target.value}))}
                placeholder="Share details about the opportunity, project scope, or timeline..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="w-full resize-y rounded-xl border border-white/[0.14] bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-[#A3A3A3]/60 transition-colors focus:border-[#FF5722] focus:outline-none"
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-[#FF7043]">
                  {errors.message}
                </p>
              )}
            </div>

            {submitResult && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-xs leading-relaxed ${
                  submitResult.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                    : 'border-[#FF5722]/50 bg-[#C62828]/15 text-red-200'
                }`}
              >
                {submitResult.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#FF5722] mt-0.5" aria-hidden="true" />
                )}
                <span>{submitResult.message}</span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-label text-[11px] text-[#A3A3A3]">
                Server-validated via <span className="text-white/80">/api/contact</span>
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5722] to-[#C62828] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#FF5722]/20 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer min-h-[44px]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
