'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { FormConfig, FormField, FieldOption, FileValue } from '@/lib/types';
import Logo from './Logo';
import clsx from 'clsx';

// ── Value helpers ─────────────────────────────────────────────────────────────
type FormValues = Record<string, string | string[] | FileValue[]>;
const str = (v: FormValues, id: string) => (typeof v[id] === 'string' ? (v[id] as string) : '');
const arr = (v: FormValues, id: string) => (Array.isArray(v[id]) ? (v[id] as string[]).filter(x => typeof x === 'string') : []);
const files = (v: FormValues, id: string): FileValue[] => {
  const val = v[id];
  return Array.isArray(val) && val.length > 0 && typeof val[0] === 'object' ? (val as FileValue[]) : [];
};
const toggle = (a: string[], val: string, on: boolean) =>
  on ? [...a, val] : a.filter(x => x !== val);
const fmtSize = (b: number) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`);

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ text, variant }: { text: string; variant?: FieldOption['badgeVariant'] }) {
  const cls = {
    red:   'bg-red-50 text-red-600 border-red-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    blue:  'bg-blue-50 text-blue-600 border-blue-200',
  }[variant ?? 'blue'] ?? 'bg-blue-50 text-blue-600 border-blue-200';
  return (
    <span className={clsx('inline-block font-mono text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border mb-1', cls)}>
      {text}
    </span>
  );
}

// ── Custom radio indicator ────────────────────────────────────────────────────
function RadioDot({ active }: { active: boolean }) {
  return (
    <span className={clsx(
      'flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-150 mt-0.5',
      active ? 'border-brand-red bg-brand-red' : 'border-brand-line-2 group-hover:border-brand-red/60'
    )}>
      {active && <span className="w-[7px] h-[7px] rounded-full bg-white block" />}
    </span>
  );
}

// ── Custom checkbox indicator ─────────────────────────────────────────────────
function CheckDot({ active }: { active: boolean }) {
  return (
    <span className={clsx(
      'flex-shrink-0 w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-150 mt-0.5',
      active ? 'border-brand-red bg-brand-red' : 'border-brand-line-2 group-hover:border-brand-red/60'
    )}>
      {active && (
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
  );
}

// ── Field renderers ───────────────────────────────────────────────────────────
interface FP {
  field: FormField;
  values: FormValues;
  onChange: (id: string, v: string | string[] | FileValue[]) => void;
  showToast?: (msg: string, error?: boolean) => void;
}

function TextField({ field, values, onChange }: FP) {
  const type = field.type === 'phone' ? 'tel' : field.type === 'url' ? 'url' : field.type;
  return (
    <input
      type={type}
      value={str(values, field.id)}
      onChange={e => onChange(field.id, e.target.value)}
      placeholder={field.placeholder ?? ''}
      required={field.required}
      className="field-line"
    />
  );
}

function TextareaField({ field, values, onChange }: FP) {
  return (
    <textarea
      value={str(values, field.id)}
      onChange={e => onChange(field.id, e.target.value)}
      placeholder={field.placeholder ?? ''}
      rows={field.rows ?? 3}
      required={field.required}
      className="field-line field-line-area"
    />
  );
}

function DateField({ field, values, onChange }: FP) {
  return (
    <input
      type="date"
      value={str(values, field.id)}
      onChange={e => onChange(field.id, e.target.value)}
      required={field.required}
      className="field-line max-w-[220px]"
    />
  );
}

function SelectField({ field, values, onChange }: FP) {
  return (
    <div className="relative">
      <select
        value={str(values, field.id)}
        onChange={e => onChange(field.id, e.target.value)}
        required={field.required}
        className="field-line appearance-none pr-8 cursor-pointer"
      >
        <option value="">Select…</option>
        {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-0 bottom-3.5 w-4 h-4 text-brand-ink-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function RadioField({ field, values, onChange }: FP) {
  const selected = str(values, field.id);
  const layout = field.layout ?? 'list';

  // Pills layout
  if (layout === 'pills') {
    return (
      <div className="flex flex-wrap gap-2.5 pt-1">
        {field.options?.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(field.id, opt.value)}
            className={clsx(
              'px-5 py-2.5 rounded-xl text-sm font-medium border-2 transition-all duration-150 select-none',
              selected === opt.value
                ? 'bg-brand-ink text-white border-brand-ink shadow-sm'
                : 'bg-white text-brand-ink-2 border-brand-line hover:border-brand-red hover:text-brand-red hover:bg-red-50/30'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  // Grid layout (hosting cards)
  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
        {field.options?.map(opt => (
          <label
            key={opt.value}
            className={clsx(
              'group flex items-start gap-2.5 p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-150',
              selected === opt.value
                ? 'border-brand-red bg-red-50/40 shadow-sm'
                : 'border-brand-line bg-white hover:border-brand-red/40 hover:bg-red-50/10'
            )}
          >
            <input type="radio" name={field.id} value={opt.value} checked={selected === opt.value}
              onChange={() => onChange(field.id, opt.value)} className="sr-only" />
            <RadioDot active={selected === opt.value} />
            <div className="flex-1 min-w-0">
              {opt.badge && <Badge text={opt.badge} variant={opt.badgeVariant} />}
              <div className="text-sm font-semibold text-brand-ink leading-tight">{opt.label}</div>
              {opt.description && <div className="text-[11px] text-brand-ink-3 mt-0.5 leading-snug">{opt.description}</div>}
            </div>
          </label>
        ))}
      </div>
    );
  }

  // List layout (default)
  return (
    <div className="flex flex-col gap-2 pt-1">
      {field.options?.map(opt => (
        <label
          key={opt.value}
          className={clsx(
            'group flex items-start gap-3.5 px-4 py-3.5 border-2 rounded-xl cursor-pointer transition-all duration-150',
            selected === opt.value
              ? 'border-brand-red bg-red-50/40'
              : 'border-brand-line bg-white hover:border-brand-red/30 hover:bg-red-50/10'
          )}
        >
          <input type="radio" name={field.id} value={opt.value} checked={selected === opt.value}
            onChange={() => onChange(field.id, opt.value)} className="sr-only" />
          <RadioDot active={selected === opt.value} />
          <div className="flex-1">
            <div className="text-[15px] font-medium text-brand-ink leading-snug">{opt.label}</div>
            {opt.description && <div className="text-[13px] text-brand-ink-3 mt-0.5">{opt.description}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroupField({ field, values, onChange, showToast }: FP) {
  const selected = arr(values, field.id);
  const max = field.maxSelect;
  return (
    <div className="flex flex-col gap-2 pt-1">
      {field.options?.map(opt => {
        const checked = selected.includes(opt.value);
        return (
          <label
            key={opt.value}
            className={clsx(
              'group flex items-start gap-3.5 px-4 py-3.5 border-2 rounded-xl cursor-pointer transition-all duration-150',
              checked
                ? 'border-brand-red bg-red-50/40'
                : 'border-brand-line bg-white hover:border-brand-red/30 hover:bg-red-50/10'
            )}
          >
            <input type="checkbox" value={opt.value} checked={checked}
              onChange={e => {
                if (e.target.checked && max && selected.length >= max) {
                  showToast?.(`You can pick up to ${max}.`, true);
                  return;
                }
                onChange(field.id, toggle(selected, opt.value, e.target.checked));
              }}
              className="sr-only" />
            <CheckDot active={checked} />
            <div className="flex-1">
              <div className="text-[15px] font-medium text-brand-ink leading-snug">{opt.label}</div>
              {opt.description && <div className="text-[13px] text-brand-ink-3 mt-0.5">{opt.description}</div>}
            </div>
          </label>
        );
      })}
      {max && <div className="text-[12px] text-brand-ink-4 mt-0.5">{selected.length} / {max} selected</div>}
    </div>
  );
}

// ── Slider field (e.g. Formal ↔ Casual) ────────────────────────────────────────
function SliderField({ field, values, onChange }: FP) {
  const val = str(values, field.id) || field.defaultValue || '50';
  const left = field.options?.[0]?.label ?? 'Low';
  const right = field.options?.[1]?.label ?? 'High';
  return (
    <div>
      <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider text-brand-ink-3 mb-2.5">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <input
        type="range" min={0} max={100} value={val}
        onChange={e => onChange(field.id, e.target.value)}
        className="w-full accent-brand-red"
      />
    </div>
  );
}

// ── File upload field ───────────────────────────────────────────────────────────
const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024; // serverless body limit headroom

function FileField({ field, values, onChange, showToast }: FP) {
  const list = files(values, field.id);
  const [uploading, setUploading] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const incoming = [...fileList];
    for (const f of incoming) {
      if (f.size > MAX_UPLOAD_BYTES) {
        showToast?.(`"${f.name}" is too large (max ${fmtSize(MAX_UPLOAD_BYTES)}). List it in the notes instead.`, true);
        continue;
      }
      setUploading(n => n + 1);
      try {
        const fd = new FormData();
        fd.append('file', f);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? 'Upload failed');
        onChange(field.id, [...files(values, field.id), { name: f.name, url: json.url, size: f.size }]);
      } catch (err) {
        showToast?.(err instanceof Error ? err.message : `Failed to upload "${f.name}".`, true);
      } finally {
        setUploading(n => n - 1);
      }
    }
  }

  function removeFile(i: number) {
    const next = [...files(values, field.id)];
    next.splice(i, 1);
    onChange(field.id, next);
  }

  return (
    <div>
      <label
        className="flex flex-col items-center justify-center gap-1 text-center px-4 py-6 border-2 border-dashed border-brand-line rounded-xl cursor-pointer transition-all duration-150 hover:border-brand-red hover:bg-red-50/10"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <span className="text-sm font-medium text-brand-ink">
          {uploading > 0 ? 'Uploading…' : 'Drop files or click to choose'}
        </span>
        <span className="text-[12px] text-brand-ink-4">
          {field.accept ? field.accept.split(',').map(s => s.replace('image/*', 'Images')).join(' · ') : 'Any file type'}
          {field.multiple !== false ? ' · multiple OK' : ''}
        </span>
        <input
          ref={inputRef} type="file" className="sr-only"
          accept={field.accept} multiple={field.multiple !== false}
          onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </label>
      {list.length > 0 && (
        <div className="mt-2.5 flex flex-col gap-1.5">
          {list.map((f, i) => (
            <div key={`${f.url}-${i}`} className="flex items-center gap-2.5 px-3 py-2 border border-brand-line rounded-lg bg-white text-[13px]">
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 truncate text-brand-ink hover:text-brand-red transition-colors">
                {f.name}
              </a>
              <span className="font-mono text-[11px] text-brand-ink-4 flex-shrink-0">{fmtSize(f.size)}</span>
              <button type="button" onClick={() => removeFile(i)}
                className="flex-shrink-0 text-brand-ink-4 hover:text-red-600 transition-colors text-base leading-none px-1">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FieldRenderer(props: FP) {
  switch (props.field.type) {
    case 'textarea':      return <TextareaField {...props} />;
    case 'date':          return <DateField {...props} />;
    case 'select':        return <SelectField {...props} />;
    case 'radio':         return <RadioField {...props} />;
    case 'checkboxgroup': return <CheckboxGroupField {...props} />;
    case 'slider':        return <SliderField {...props} />;
    case 'file':          return <FileField {...props} />;
    default:              return <TextField {...props} />;
  }
}

function FieldWrapper({ field, values, onChange, showToast }: FP) {
  return (
    <div>
      {field.label && (
        <div className="flex items-center gap-1.5 mb-1">
          <label className="text-[13px] font-medium text-brand-ink-3 uppercase tracking-wide">
            {field.label}
          </label>
          {field.required && <span className="text-brand-red text-base leading-none font-bold">·</span>}
        </div>
      )}
      {field.hint && <p className="text-[12px] text-brand-ink-4 italic mb-2 leading-relaxed">{field.hint}</p>}
      <FieldRenderer field={field} values={values} onChange={onChange} showToast={showToast} />
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, error }: { msg: string; error?: boolean }) {
  return (
    <div className={clsx(
      'fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-xl animate-slide-up pointer-events-none max-w-[90vw] text-center',
      error ? 'bg-red-600' : 'bg-[#0f172a]'
    )}>
      {msg}
    </div>
  );
}

// ── Submit modal ──────────────────────────────────────────────────────────────
interface ModalProps {
  onClose: () => void;
  onSubmit: (name: string, email: string, note: string) => void;
  defaultName?: string;
  defaultEmail?: string;
  loading: boolean;
}

function SubmitModal({ onClose, onSubmit, defaultName, defaultEmail, loading }: ModalProps) {
  const [name, setName] = useState(defaultName ?? '');
  const [email, setEmail] = useState(defaultEmail ?? '');
  const [note, setNote] = useState('');

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up overflow-hidden">
        {/* Modal header */}
        <div className="bg-[#0f172a] px-7 py-6">
          <div className="flex items-center gap-3 mb-3">
            <Logo size={32} white />
            <div>
              <div className="text-white font-semibold text-sm">Maxxlab</div>
              <div className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Form Submission</div>
            </div>
          </div>
          <h2 className="font-serif text-2xl text-white font-normal">Ready to submit?</h2>
          <p className="text-slate-400 text-[13px] mt-1 leading-relaxed">
            We'll email you a copy with a secure link to view your full submission.
          </p>
        </div>

        <div className="px-7 py-6 space-y-5">
          <div>
            <label className="block text-[11px] font-medium text-brand-ink-3 uppercase tracking-wide mb-1.5">
              Your name <span className="text-brand-red">·</span>
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Full name" autoComplete="name" className="field-line" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-brand-ink-3 uppercase tracking-wide mb-1.5">
              Your email <span className="text-brand-red">·</span>
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@company.com" autoComplete="email" className="field-line" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-brand-ink-3 uppercase tracking-wide mb-1.5">
              Additional note
            </label>
            <textarea value={note} onChange={e => setNote(e.target.value)}
              placeholder="Anything you'd like to add before we meet…" rows={3}
              className="field-line field-line-area" />
          </div>
        </div>

        <div className="px-7 pb-7 flex gap-3">
          <button type="button" onClick={onClose} disabled={loading}
            className="flex-1 py-3 text-sm font-medium border-2 border-brand-line rounded-xl hover:border-brand-ink-3 transition-colors">
            Cancel
          </button>
          <button type="button" disabled={loading} onClick={() => onSubmit(name, email, note)}
            className="flex-1 py-3 text-sm font-semibold bg-brand-red text-white rounded-xl hover:bg-brand-red-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
              : 'Submit form →'
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Scroll progress hook ──────────────────────────────────────────────────────
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setP(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

// ── Main FormClient ───────────────────────────────────────────────────────────
export default function FormClient({ form }: { form: FormConfig }) {
  const STORAGE_KEY = `maxxlab-form-${form.slug}`;
  const [values, setValues] = useState<FormValues>(() => {
    const defaults: FormValues = {};
    form.sections.forEach(s => s.fields.forEach(f => {
      if (f.defaultValue) defaults[f.id] = f.defaultValue;
    }));
    return defaults;
  });
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progress = useScrollProgress();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) { setValues(prev => ({ ...prev, ...JSON.parse(raw) })); setLastSaved('restored'); }
    } catch { /* ignore */ }
  }, [STORAGE_KEY]);

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleChange = useCallback((id: string, value: string | string[] | FileValue[]) => {
    setValues(prev => {
      const next = { ...prev, [id]: value };
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(() => {
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setLastSaved(new Date().toLocaleTimeString()); } catch { /* ignore */ }
      }, 600);
      return next;
    });
  }, [STORAGE_KEY]);

  function handleExport() {
    const blob = new Blob([JSON.stringify({ form: form.title, exported_at: new Date().toISOString(), data: values }, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${form.slug}.json` });
    a.click(); URL.revokeObjectURL(a.href);
    showToast('Exported successfully');
  }

  function handleClear() {
    if (!confirm('Clear all answers?')) return;
    setValues({}); try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    showToast('Form cleared');
  }

  async function handleSubmit(senderName: string, senderEmail: string, senderNote: string) {
    if (!senderName.trim()) { showToast('Please enter your name.', true); return; }
    if (!senderEmail.includes('@')) { showToast('Please enter a valid email.', true); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formSlug: form.slug, senderName: senderName.trim(), senderEmail: senderEmail.trim(), senderNote: senderNote.trim(), data: values }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      setModalOpen(false);
      showToast('Submitted! Check your inbox for confirmation.');
      window.open(`/view/${json.id}`, '_blank');
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Submission failed. Please try again.', true);
    } finally {
      setSubmitting(false);
    }
  }

  const totalFields = form.sections.reduce((a, s) => a + s.fields.length, 0);
  const answered = Object.values(values).filter(v => (Array.isArray(v) ? v.length > 0 : v !== '')).length;
  const pctAnswered = totalFields > 0 ? Math.round((answered / totalFields) * 100) : 0;

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-brand-line/40 no-print">
        <div
          className="h-full bg-brand-red transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-brand-line/60 no-print" style={{ top: '3px' }}>
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-ink rounded-lg flex items-center justify-center overflow-hidden">
              <Logo size={22} white />
            </div>
            <span className="font-semibold text-sm text-brand-ink hidden sm:block">Maxxlab</span>
            <span className="text-brand-line hidden sm:block">·</span>
            <span className="font-mono text-[10px] text-brand-ink-3 uppercase tracking-wider hidden sm:block truncate max-w-[200px]">
              {form.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-brand-ink-3 font-mono">
              <span className="text-brand-red font-semibold">{pctAnswered}%</span>
              <span>filled</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-brand-line" />
            <button onClick={handleExport}
              className="hidden sm:block text-[12px] text-brand-ink-3 hover:text-brand-ink transition-colors px-2 py-1">
              Export
            </button>
            <button onClick={() => setModalOpen(true)}
              className="px-4 py-1.5 text-[12px] font-semibold bg-brand-red text-white rounded-full hover:bg-brand-red-dark transition-colors">
              Submit →
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[#0f172a] no-print" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(254,48,48,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 40%)'
      }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '44px 44px'
        }} />

        <div className="relative max-w-2xl mx-auto px-6 py-16 sm:py-20 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <Logo size={80} white />
          </div>

          {/* Eyebrow */}
          {form.eyebrow && (
            <div className="inline-flex items-center gap-2 border border-brand-red/30 bg-brand-red/10 text-brand-red rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
              <span className="font-mono text-[11px] uppercase tracking-widest">{form.eyebrow}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-normal leading-[1.05] mb-5">
            {form.heroAccent ? (
              <>
                {form.title.split('·')[0].trim().split(form.heroAccent)[0]}
                <em className="italic text-brand-red">{form.heroAccent}</em>
              </>
            ) : form.title}
          </h1>

          {/* Description */}
          {form.description && (
            <p className="text-slate-400 text-[15px] leading-relaxed max-w-sm mx-auto mb-7">
              {form.description}
            </p>
          )}

          {/* Autosave + stats row */}
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              Auto-saving{lastSaved && lastSaved !== 'restored' ? ` · ${lastSaved}` : ''}
            </div>
            <span className="text-slate-700">·</span>
            <span>{form.sections.length} sections · {totalFields} questions</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f8fafc] to-transparent" />
      </div>

      {/* ── Sections ── */}
      <main className="bg-[#f8fafc] pb-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-3">
          {form.sections.map((section, si) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl overflow-hidden print-break-avoid"
              style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)', border: '1px solid #f0f4f8' }}
            >
              {/* Section header */}
              <div className="px-7 pt-7 pb-5">
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-red text-white font-mono text-[10px] font-bold flex-shrink-0">
                    {section.num}
                  </span>
                  <div className="h-px flex-1 bg-brand-line/60" />
                  <span className="text-[11px] font-mono text-brand-ink-4 uppercase tracking-wider">
                    {si + 1} of {form.sections.length}
                  </span>
                </div>
                <h2 className="font-serif text-[28px] font-normal text-brand-ink mt-3 leading-tight">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-[14px] text-brand-ink-3 mt-1.5 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px mx-7 bg-brand-line/40" />

              {/* Fields */}
              <div className="px-7 py-7 space-y-8">
                {(() => {
                  const rows: (FormField | [FormField, FormField])[] = [];
                  let i = 0;
                  while (i < section.fields.length) {
                    const cur = section.fields[i], nxt = section.fields[i + 1];
                    if (cur.halfWidth && nxt?.halfWidth) { rows.push([cur, nxt]); i += 2; }
                    else { rows.push(cur); i++; }
                  }
                  return rows.map((row, ri) =>
                    Array.isArray(row) ? (
                      <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {row.map(f => <FieldWrapper key={f.id} field={f} values={values} onChange={handleChange} showToast={showToast} />)}
                      </div>
                    ) : (
                      <FieldWrapper key={row.id} field={row} values={values} onChange={handleChange} showToast={showToast} />
                    )
                  );
                })()}
              </div>
            </div>
          ))}

          {/* End note */}
          <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-200/80">
            <span className="text-amber-400 text-xl leading-none mt-0.5 flex-shrink-0">✦</span>
            <p className="text-[13px] text-amber-800 leading-relaxed">
              Nothing here is required — we'll cover any blanks together in our discovery call.
            </p>
          </div>
        </div>
      </main>

      {/* ── Action bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 no-print"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid #f0f4f8', boxShadow: '0 -4px 24px rgba(15,23,42,0.08)' }}>
        <div className="max-w-2xl mx-auto px-6 py-3.5 flex items-center justify-between gap-3">

          {/* Left: progress */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-24 h-1.5 bg-brand-line rounded-full overflow-hidden">
              <div className="h-full bg-brand-red rounded-full transition-all duration-500" style={{ width: `${pctAnswered}%` }} />
            </div>
            <span className="font-mono text-[11px] text-brand-ink-3">
              <span className="text-brand-ink font-semibold">{pctAnswered}%</span> filled
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={handleClear}
              className="px-4 py-2 text-[12px] font-medium text-brand-ink-3 hover:text-red-600 transition-colors">
              Clear
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()}
                className="hidden sm:block px-4 py-2 text-[12px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
                Print
              </button>
              <button onClick={handleExport}
                className="px-4 py-2 text-[12px] font-medium border border-brand-line rounded-xl hover:border-brand-ink transition-colors">
                Export JSON
              </button>
              <button onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 text-[13px] font-semibold bg-brand-red text-white rounded-xl hover:bg-brand-red-dark transition-colors flex items-center gap-1.5">
                Send to Maxxlab
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SubmitModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          defaultName={str(values, 'lead_name') || str(values, 'contact_name')}
          defaultEmail={str(values, 'lead_email') || str(values, 'contact_email')}
          loading={submitting}
        />
      )}

      {toast && <Toast msg={toast.msg} error={toast.error} />}
    </>
  );
}
