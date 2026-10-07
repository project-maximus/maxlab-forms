import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFormBySlug } from '@/forms';
import { brandById } from '@/lib/brands';
import { listSubmissionsForForm, countByField } from '@/lib/storage';
import { optionLabel } from '@/lib/form-logic';
import type { FormField, SubmissionIndexEntry } from '@/lib/types';

// Submissions for one form, paged. Deliberately separate from the dashboard on
// '/': a form that collects thousands of applications needs filtering, paging
// and an export, and should not be mixed into a list of every other client.

export const dynamic = 'force-dynamic';

const PER_PAGE = 50;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; q?: string; role?: string }>;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

/** The field a form branches on, if it has one. Drives the role column. */
function roleField(fields: FormField[]): FormField | undefined {
  return fields.find(f => f.id === 'role' && f.options);
}

export default async function AdminFormPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const form = getFormBySlug(slug);
  if (!form) notFound();

  const brand = brandById(form.brand);
  const page = Math.max(parseInt(sp.page ?? '1', 10) || 1, 1);
  const q = (sp.q ?? '').trim();
  const role = (sp.role ?? '').trim();

  const roleFld = roleField(form.sections.flatMap(s => s.fields));

  // A database that is briefly unreachable should say so, not throw a 500 at
  // whoever is trying to read the applications.
  let rows: SubmissionIndexEntry[] = [];
  let total = 0;
  let roleCounts: Record<string, number> = {};
  let dbError: string | null = null;
  try {
    const [page1, counts] = await Promise.all([
      listSubmissionsForForm(slug, { limit: PER_PAGE, offset: (page - 1) * PER_PAGE, search: q, role }),
      roleFld ? countByField(slug, roleFld.id) : Promise.resolve({} as Record<string, number>),
    ]);
    rows = page1.rows;
    total = page1.total;
    roleCounts = counts;
  } catch (err) {
    console.error('[admin] Query failed:', err);
    dbError = err instanceof Error ? err.message : 'Could not reach the database.';
  }

  const pages = Math.max(Math.ceil(total / PER_PAGE), 1);
  const qs = (over: Record<string, string>) => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (role) p.set('role', role);
    for (const [k, v] of Object.entries(over)) { if (v) p.set(k, v); else p.delete(k); }
    const str = p.toString();
    return str ? `?${str}` : '';
  };
  const grandTotal = Object.values(roleCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-brand-bg">
      <header className="bg-white border-b border-brand-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ink-4">
                {brand.name} · Submissions
              </div>
              <h1 className="mt-2 text-[26px] leading-tight tracking-[-0.02em] font-medium text-brand-ink">
                {form.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`/api/admin/export?slug=${encodeURIComponent(slug)}${role ? `&role=${encodeURIComponent(role)}` : ''}`}
                className="px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors bg-white"
              >
                Download CSV
              </a>
              <Link
                href="/"
                className="px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors bg-white"
              >
                All forms
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 space-y-6">

        {dbError && (
          <div className="bg-white border border-brand-red rounded-lg px-5 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-red">
              Could not load submissions
            </div>
            <p className="mt-2 text-[13px] text-brand-ink-2">{dbError}</p>
            <p className="mt-1 text-[13px] text-brand-ink-4">
              Nothing has been lost. Submissions are stored on write; this page only reads them. Reload to try again.
            </p>
          </div>
        )}

        {/* Counts, which double as the role filter */}
        {roleFld && (
          <div className="flex flex-wrap gap-2">
            <Link
              href={qs({ role: '', page: '' })}
              className={`px-3 py-2 rounded-md border text-[12px] transition-colors ${
                role === '' ? 'border-brand-ink bg-white text-brand-ink' : 'border-brand-line bg-white text-brand-ink-3 hover:border-brand-line-2'
              }`}
            >
              All <span className="font-mono tabular-nums ml-1">{grandTotal}</span>
            </Link>
            {(roleFld.options ?? []).map(opt => (
              <Link
                key={opt.value}
                href={qs({ role: opt.value, page: '' })}
                className={`px-3 py-2 rounded-md border text-[12px] transition-colors ${
                  role === opt.value ? 'border-brand-ink bg-white text-brand-ink' : 'border-brand-line bg-white text-brand-ink-3 hover:border-brand-line-2'
                }`}
              >
                {opt.label} <span className="font-mono tabular-nums ml-1">{roleCounts[opt.value] ?? 0}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Search */}
        <form method="GET" className="flex gap-2">
          {role && <input type="hidden" name="role" value={role} />}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name or email"
            className="field-line max-w-xs"
          />
          <button type="submit" className="px-4 py-2 text-[12px] font-medium bg-brand-ink text-white rounded-md hover:bg-brand-ink-2 transition-colors">
            Search
          </button>
          {(q || role) && (
            <Link href="" className="px-4 py-2 text-[12px] font-medium text-brand-ink-3 hover:text-brand-ink transition-colors self-center">
              Clear
            </Link>
          )}
        </form>

        {/* Results */}
        <div className="bg-white border border-brand-line rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-brand-line flex items-center justify-between">
            <span className="font-mono text-[11px] text-brand-ink-3 tabular-nums">
              {total} submission{total === 1 ? '' : 's'}
              {(q || role) && ' matching'}
            </span>
            <span className="font-mono text-[11px] text-brand-ink-4 tabular-nums">
              Page {page} of {pages}
            </span>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-16 text-center text-[13px] text-brand-ink-4">
              Nothing here yet.
            </div>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ink-4">
                  <th className="px-5 py-2.5 font-normal">Name</th>
                  <th className="px-5 py-2.5 font-normal">Email</th>
                  {roleFld && <th className="px-5 py-2.5 font-normal">Role</th>}
                  <th className="px-5 py-2.5 font-normal">Submitted</th>
                  <th className="px-5 py-2.5 font-normal" />
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-t border-brand-line/70 hover:bg-brand-bg/60">
                    <td className="px-5 py-3 text-brand-ink font-medium">{r.senderName}</td>
                    <td className="px-5 py-3 text-brand-ink-3">
                      <a href={`mailto:${r.senderEmail}`} className="hover:text-brand-ink">{r.senderEmail}</a>
                    </td>
                    {roleFld && (
                      <td className="px-5 py-3 text-brand-ink-3">
                        {optionLabel(roleFld, (r.data?.[roleFld.id] as string) ?? '') || '-'}
                      </td>
                    )}
                    <td className="px-5 py-3 text-brand-ink-4 font-mono text-[11px] tabular-nums whitespace-nowrap">
                      {fmt(r.submittedAt)}
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <Link href={`/view/${r.id}`} className="text-brand-red hover:text-brand-red-dark font-medium">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Paging */}
        {pages > 1 && (
          <div className="flex items-center justify-between">
            {page > 1 ? (
              <Link href={qs({ page: String(page - 1) })} className="text-[13px] font-medium text-brand-ink-2 hover:text-brand-ink">
                ← Previous
              </Link>
            ) : <span />}
            {page < pages ? (
              <Link href={qs({ page: String(page + 1) })} className="text-[13px] font-medium text-brand-ink-2 hover:text-brand-ink">
                Next →
              </Link>
            ) : <span />}
          </div>
        )}
      </div>
    </div>
  );
}
