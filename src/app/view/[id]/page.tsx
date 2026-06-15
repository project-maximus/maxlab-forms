import { notFound } from 'next/navigation';
import { getSubmission } from '@/lib/storage';
import { getFormBySlug } from '@/forms';
import Logo from '@/components/Logo';
import PrintButton from '@/components/PrintButton';
import type { Metadata } from 'next';
import type { FormSubmission, FormField, FileValue } from '@/lib/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sub = await getSubmission(id);
  if (!sub) return {};
  return {
    title: `${sub.formTitle} — ${sub.senderName} · Maxxlab`,
    description: `Submitted on ${new Date(sub.submittedAt).toLocaleDateString()}`,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function isFileValueArray(value: unknown): value is FileValue[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && 'url' in (value[0] as object);
}

function AnswerValue({ value }: { value: string | string[] | FileValue[] | undefined }) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <span className="text-brand-ink-4 italic text-sm">Not specified</span>;
  }
  if (isFileValueArray(value)) {
    return (
      <div className="flex flex-col gap-1">
        {value.map((f, i) => (
          <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
            className="text-sm text-brand-red hover:text-brand-red-dark underline break-all">
            {f.name}
          </a>
        ))}
      </div>
    );
  }
  const display = Array.isArray(value) ? value.join(', ') : value;
  return <span className="text-sm text-brand-ink break-words whitespace-pre-wrap">{display}</span>;
}

function SectionBlock({
  num, title, fields, data,
}: {
  num: string;
  title: string;
  fields: FormField[];
  data: FormSubmission['data'];
}) {
  return (
    <div className="bg-white border border-brand-line rounded-2xl overflow-hidden shadow-card print-break-avoid">
      <div className="px-5 py-3.5 bg-brand-bg border-b border-brand-line">
        <span className="font-mono text-[10px] text-brand-ink-4 uppercase tracking-[0.06em]">
          Section {num}
        </span>
        <h3 className="font-semibold text-brand-ink text-sm mt-0.5">{title}</h3>
      </div>
      <div className="divide-y divide-brand-line/50">
        {fields.map(field => (
          <div key={field.id} className="flex gap-4 px-5 py-3 flex-col sm:flex-row">
            <dt className="text-xs text-brand-ink-3 font-medium w-full sm:w-44 flex-shrink-0 pt-0.5">
              {field.label ?? field.id}
            </dt>
            <dd className="flex-1 min-w-0">
              <AnswerValue value={data[field.id]} />
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ViewPage({ params }: Props) {
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission) notFound();

  const form = getFormBySlug(submission.formSlug);
  const submittedAt = formatDate(submission.submittedAt);

  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Print-only header */}
      <div className="hidden print:block mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Logo size={32} />
          <div>
            <div className="font-bold text-sm">Maxxlab</div>
            <div className="text-xs text-brand-ink-3 font-mono uppercase tracking-wider">Form Submission</div>
          </div>
        </div>
        <hr />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-white border-b border-brand-line no-print">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-ink rounded-lg flex items-center justify-center overflow-hidden">
              <Logo size={22} />
            </div>
            <div>
              <div className="font-semibold text-sm">Maxxlab</div>
              <div className="font-mono text-[10px] text-brand-ink-3 uppercase tracking-[0.06em]">
                Submission Viewer
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PrintButton />
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-8 space-y-4">

        {/* Summary card */}
        <div className="bg-white border border-brand-line rounded-2xl overflow-hidden shadow-card">
          <div className="px-6 pt-6 pb-5 border-b border-brand-line">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-[11px] font-mono font-semibold px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Submitted Successfully
            </div>
            <h1 className="font-serif text-3xl font-normal mb-1">{submission.formTitle}</h1>
            <p className="text-sm text-brand-ink-3">Submitted {submittedAt}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-brand-line/50">
            <div className="px-6 py-4">
              <div className="font-mono text-[10px] text-brand-ink-4 uppercase tracking-[0.06em] mb-1.5">
                Submitted By
              </div>
              <div className="font-semibold text-brand-ink">{submission.senderName}</div>
              <div className="text-sm text-brand-ink-3">{submission.senderEmail}</div>
            </div>
            <div className="px-6 py-4">
              <div className="font-mono text-[10px] text-brand-ink-4 uppercase tracking-[0.06em] mb-1.5">
                Submission ID
              </div>
              <div className="font-mono text-xs text-brand-ink-2 break-all">{submission.id}</div>
            </div>
          </div>

          {submission.senderNote && (
            <div className="mx-6 mb-5 mt-1 p-3.5 bg-amber-50 border-l-[3px] border-amber-400 rounded-r-xl text-sm text-amber-900">
              <strong>Note:</strong> {submission.senderNote}
            </div>
          )}
        </div>

        {/* Form sections */}
        {form ? (
          form.sections.map(section => (
            <SectionBlock
              key={section.id}
              num={section.num}
              title={section.title}
              fields={section.fields}
              data={submission.data}
            />
          ))
        ) : (
          // Fallback: dump all data if form config not found
          <div className="bg-white border border-brand-line rounded-2xl overflow-hidden shadow-card">
            <div className="px-5 py-3.5 bg-brand-bg border-b border-brand-line">
              <h3 className="font-semibold text-brand-ink text-sm">Submission Data</h3>
            </div>
            <div className="divide-y divide-brand-line/50">
              {Object.entries(submission.data).map(([k, v]) => (
                <div key={k} className="flex gap-4 px-5 py-3">
                  <dt className="text-xs text-brand-ink-3 font-mono w-44 flex-shrink-0 pt-0.5">{k}</dt>
                  <dd className="flex-1 text-sm text-brand-ink">
                    {Array.isArray(v) ? v.join(', ') : v || '—'}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <p className="text-xs text-brand-ink-4">
            Maxxlab ·{' '}
            <a href="https://maxxlab.tech" className="text-brand-red hover:underline">
              maxxlab.tech
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
