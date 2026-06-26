import Link from 'next/link';
import Logo from '@/components/Logo';
import CopyButton from '@/components/CopyButton';
import { getAllForms } from '@/forms';
import { listSubmissions } from '@/lib/storage';
import type { SubmissionIndexEntry } from '@/lib/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default async function HomePage() {
  const forms = getAllForms();
  let submissions: SubmissionIndexEntry[] = [];
  try { submissions = await listSubmissions(20); } catch { /* db may not be ready yet */ }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-white border-b border-brand-line sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-ink rounded-lg flex items-center justify-center overflow-hidden">
              <Logo size={22} />
            </div>
            <div>
              <div className="font-semibold text-sm">Maxxlab</div>
              <div className="font-mono text-[10px] text-brand-ink-3 uppercase tracking-[0.06em]">
                Form Builder
              </div>
            </div>
          </div>
          <a
            href="https://maxxlab.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-ink-3 hover:text-brand-red transition-colors"
          >
            maxxlab.tech ↗
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-10 space-y-10">

        {/* Hero */}
        <div>
          <div className="font-mono text-[11px] text-brand-ink-4 uppercase tracking-[0.08em] mb-2">
            Maxxlab · Internal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-3">
            Client <em className="italic text-brand-red">intake</em> forms
          </h1>
          <p className="text-brand-ink-2 text-base max-w-lg">
            Professional branded discovery forms. Fill, submit, and review — all in one place.
          </p>
        </div>

        {/* Forms grid */}
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-ink-3 mb-4">
            Active Forms
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {forms.map(form => (
              <div
                key={form.slug}
                className="bg-white border border-brand-line rounded-2xl shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-mono text-[10px] text-brand-ink-4 uppercase tracking-[0.06em] mb-1">
                        {form.client}
                      </div>
                      <h3 className="font-semibold text-brand-ink text-base leading-snug">
                        {form.title}
                      </h3>
                    </div>
                    <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                      ACTIVE
                    </span>
                  </div>
                  {form.description && (
                    <p className="text-xs text-brand-ink-3 mb-4 line-clamp-2">{form.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/forms/${form.slug}`}
                      className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-brand-ink text-white rounded-full hover:bg-brand-red transition-colors"
                    >
                      Open form →
                    </Link>
                    <CopyButton path={`/forms/${form.slug}`} />
                  </div>
                </div>
                <div className="px-5 py-3 bg-brand-bg border-t border-brand-line/60 flex items-center gap-4 text-xs text-brand-ink-3">
                  <span>{form.sections.length} sections</span>
                  <span>·</span>
                  <span>
                    {form.sections.reduce((acc, s) => acc + s.fields.length, 0)} fields
                  </span>
                  {form.eyebrow && (
                    <>
                      <span>·</span>
                      <span className="font-mono">{form.eyebrow.split('·')[0].trim()}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client presentations */}
        <section>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-ink-3 mb-4">
            Client Presentations
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-brand-line rounded-2xl shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-mono text-[10px] text-brand-ink-4 uppercase tracking-[0.06em] mb-1">
                      North PKWY Surgical Institute
                    </div>
                    <h3 className="font-semibold text-brand-ink text-base leading-snug">
                      Website Transformation — First Meeting
                    </h3>
                  </div>
                  <span className="inline-block bg-green-50 text-green-700 border border-green-200 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-brand-ink-3 mb-4 line-clamp-2">
                  Step-by-step proposal deck — audit findings, the 12-day plan, deliverables, and pricing.
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/proposals/npsi-first-meeting"
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-brand-ink text-white rounded-full hover:bg-brand-red transition-colors"
                  >
                    Open presentation →
                  </Link>
                  <CopyButton path="/proposals/npsi-first-meeting" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submissions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.06em] text-brand-ink-3">
              Recent Submissions
            </h2>
            <span className="font-mono text-[11px] text-brand-ink-4">
              {submissions.length} total
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="bg-white border border-brand-line rounded-2xl p-10 text-center">
              <div className="text-3xl mb-3">📭</div>
              <p className="text-brand-ink-3 text-sm">No submissions yet.</p>
              <p className="text-brand-ink-4 text-xs mt-1">
                When clients fill out forms, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-brand-line rounded-2xl overflow-hidden shadow-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-line bg-brand-bg">
                    <th className="text-left px-5 py-3 text-xs font-mono text-brand-ink-3 uppercase tracking-[0.05em]">Client</th>
                    <th className="text-left px-5 py-3 text-xs font-mono text-brand-ink-3 uppercase tracking-[0.05em]">Form</th>
                    <th className="text-left px-5 py-3 text-xs font-mono text-brand-ink-3 uppercase tracking-[0.05em] hidden md:table-cell">Submitted</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr key={s.id} className={clsx('border-b border-brand-line/50 hover:bg-brand-bg/50 transition-colors', i === submissions.length - 1 && 'border-b-0')}>
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-brand-ink">{s.senderName}</div>
                        <div className="text-xs text-brand-ink-3">{s.senderEmail}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-mono bg-brand-bg px-2 py-1 rounded border border-brand-line text-brand-ink-2">
                          {s.formSlug}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-brand-ink-3 hidden md:table-cell">
                        {formatDate(s.submittedAt)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/view/${s.id}`}
                          className="text-xs font-medium text-brand-red hover:text-brand-red-dark transition-colors"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

// clsx inline import for server component
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}
