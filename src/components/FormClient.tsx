'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { FormConfig, FormField, FieldOption, FileValue } from '@/lib/types';
import { noteKey, matrixKey } from '@/lib/types';
import { visibleSections, inputFields, progressFor, missingRequired, stripClosedAnswers } from '@/lib/form-logic';
import FaceIcon, { isFaceName } from './FaceIcon';
import Logo from './Logo';
import SubmitModal from './SubmitModal';
import Toast from './Toast';
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
// `variant` is accepted but deliberately unused — the palette is monochrome and
// the badge text already says what it means.
function Badge({ text }: { text: string; variant?: FieldOption['badgeVariant'] }) {
  return (
    <span className="inline-block font-mono text-[9px] font-medium tracking-[0.14em] uppercase px-1.5 py-[3px] border border-brand-line text-brand-ink-3">
      {text}
    </span>
  );
}

// ── Custom radio indicator ────────────────────────────────────────────────────
function RadioDot({ active }: { active: boolean }) {
  return (
    <span className={clsx(
      'flex-shrink-0 w-[16px] h-[16px] rounded-full border flex items-center justify-center transition-colors duration-150 mt-[3px]',
      active ? 'border-brand-ink bg-brand-ink' : 'border-brand-line-2 group-hover:border-brand-ink-3'
    )}>
      {active && <span className="w-[6px] h-[6px] rounded-full bg-white block" />}
    </span>
  );
}

// ── Custom checkbox indicator ─────────────────────────────────────────────────
function CheckDot({ active }: { active: boolean }) {
  return (
    <span className={clsx(
      'flex-shrink-0 w-[16px] h-[16px] rounded-[3px] border flex items-center justify-center transition-colors duration-150 mt-[3px]',
      active ? 'border-brand-ink bg-brand-ink' : 'border-brand-line-2 group-hover:border-brand-ink-3'
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
      className="field-line max-w-[240px]"
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
        className="field-line appearance-none"
      >
        <option value="">Select…</option>
        {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            disabled={opt.disabled}
            onClick={() => { if (!opt.disabled) onChange(field.id, opt.value); }}
            className={clsx(
              'px-4 py-2 rounded-md text-[13px] font-medium border transition-colors duration-150 select-none',
              selected === opt.value
                ? 'bg-brand-ink text-white border-brand-ink'
                : 'bg-white text-brand-ink-2 border-brand-line hover:border-brand-ink-3 hover:text-brand-ink'
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
              'group flex items-start gap-3 p-4 border rounded-md cursor-pointer transition-colors duration-150',
              selected === opt.value
                ? 'border-brand-ink bg-brand-bg'
                : 'border-brand-line bg-white hover:border-brand-ink-4'
            )}
          >
            <input type="radio" name={field.id} value={opt.value} checked={selected === opt.value}
              disabled={opt.disabled}
              onChange={() => { if (!opt.disabled) onChange(field.id, opt.value); }} className="sr-only" />
            <RadioDot active={selected === opt.value} />
            <div className="flex-1 min-w-0">
              {opt.badge && <div className="mb-2"><Badge text={opt.badge} variant={opt.badgeVariant} /></div>}
              <div className="text-sm font-medium text-brand-ink leading-tight">{opt.label}</div>
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
      {field.options?.map(opt => {
        // A closed option renders as plain markup with no input at all, so it
        // cannot be clicked, tabbed to, or submitted.
        if (opt.disabled) {
          return (
            <div
              key={opt.value}
              aria-disabled="true"
              className="flex items-start gap-3 px-4 py-3 border border-brand-line rounded-md bg-brand-bg cursor-not-allowed select-none"
            >
              <span className="flex-shrink-0 w-[16px] h-[16px] rounded-full border border-brand-line-2 bg-white mt-[3px]" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1">
                  <span className="text-[14px] font-medium text-brand-ink-4 leading-snug line-through decoration-brand-line-2">
                    {opt.label}
                  </span>
                  {opt.badge && <Badge text={opt.badge} variant={opt.badgeVariant} />}
                </div>
                {opt.disabledNote && (
                  <div className="font-mono text-[11px] tracking-[0.06em] text-brand-ink-3 mt-1.5 tabular-nums">
                    {opt.disabledNote}
                  </div>
                )}
                {opt.description && (
                  <div className="text-[13px] text-brand-ink-4 mt-1 leading-relaxed">{opt.description}</div>
                )}
              </div>
            </div>
          );
        }
        return (
        <label
          key={opt.value}
          className={clsx(
            'group flex items-start gap-3 px-4 py-3 border rounded-md cursor-pointer transition-colors duration-150',
            selected === opt.value
              ? 'border-brand-ink bg-brand-bg'
              : 'border-brand-line bg-white hover:border-brand-ink-4'
          )}
        >
          <input type="radio" name={field.id} value={opt.value} checked={selected === opt.value}
            onChange={() => onChange(field.id, opt.value)} className="sr-only" />
          <RadioDot active={selected === opt.value} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1">
              <span className="text-[14px] font-medium text-brand-ink leading-snug">{opt.label}</span>
              {opt.badge && <Badge text={opt.badge} variant={opt.badgeVariant} />}
            </div>
            {opt.description && <div className="text-[13px] text-brand-ink-3 mt-1 leading-relaxed">{opt.description}</div>}
          </div>
        </label>
        );
      })}
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
              'group flex items-start gap-3 px-4 py-3 border rounded-md cursor-pointer transition-colors duration-150',
              checked
                ? 'border-brand-ink bg-brand-bg'
                : 'border-brand-line bg-white hover:border-brand-ink-4'
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
              <div className="text-[14px] font-medium text-brand-ink leading-snug">{opt.label}</div>
              {opt.description && <div className="text-[13px] text-brand-ink-3 mt-1 leading-relaxed">{opt.description}</div>}
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

// ── Emoji scale (1-5 satisfaction rating) ─────────────────────────────────────
// Feedback questions score much better as faces than as five bare radio dots.
// Unselected faces sit back in a lighter ink so the picked one reads instantly,
// and an option with no `face` (i.e. "N/A") falls back to a text chip on the
// end of the row. `layout: 'compact'` is the tighter variant used when a whole
// group of these stacks up as a rating matrix.
function EmojiScaleField({ field, values, onChange }: FP) {
  const selected = str(values, field.id);
  const options = field.options ?? [];
  const compact = field.layout === 'compact';
  const active = options.find(o => o.value === selected);

  const size = compact ? 'w-[42px] h-[42px]' : 'w-[54px] h-[54px]';
  const glyph = compact ? 'w-[24px] h-[24px]' : 'w-[30px] h-[30px]';

  return (
    <div className="inline-flex flex-col items-stretch max-w-full">
      <div
        role="radiogroup"
        aria-label={field.label ?? field.id}
        className={clsx('flex flex-wrap items-start', compact ? 'gap-1.5' : 'gap-2 sm:gap-2.5', 'pt-1')}
      >
        {options.map(opt => {
          const on = selected === opt.value;
          // Clicking the current answer clears it — these questions are
          // optional and a radio with no keyboard escape is a trap otherwise.
          const pick = () => onChange(field.id, on ? '' : opt.value);

          if (!isFaceName(opt.face)) {
            return (
              <button
                key={opt.value} type="button" role="radio" aria-checked={on} onClick={pick}
                className={clsx(
                  'flex items-center justify-center px-3 rounded-full border text-[12px] font-medium transition-all duration-150 select-none',
                  compact ? 'h-[42px]' : 'h-[54px]',
                  on
                    ? 'border-brand-ink bg-brand-ink text-white'
                    : 'border-brand-line bg-white text-brand-ink-4 hover:border-brand-ink-4 hover:text-brand-ink-2'
                )}
              >
                {opt.label}
              </button>
            );
          }

          return (
            <button
              key={opt.value} type="button" role="radio" aria-checked={on} onClick={pick}
              title={opt.label}
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <span
                className={clsx(
                  'flex items-center justify-center rounded-full border select-none',
                  'transition-all duration-150 will-change-transform',
                  size,
                  on
                    ? 'border-brand-ink bg-white text-brand-ink -translate-y-0.5 shadow-[0_0_0_3px_rgba(15,23,42,0.07)]'
                    : 'border-brand-line bg-white text-brand-ink-4 hover:border-brand-ink-4 hover:text-brand-ink-2 hover:-translate-y-0.5'
                )}
              >
                <FaceIcon name={opt.face} className={glyph} />
              </span>
              {!compact && (
                <span className={clsx(
                  'font-mono text-[10px] leading-none tabular-nums transition-colors',
                  on ? 'text-brand-ink' : 'text-brand-ink-4'
                )}>
                  {opt.value}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {field.scaleLabels && !compact && (
        <div className="mt-2.5 flex items-center justify-between gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ink-4">{field.scaleLabels.low}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-ink-4">{field.scaleLabels.high}</span>
        </div>
      )}

      {/* Reserve the caption line so picking an answer never nudges the page. */}
      <div className={clsx('text-[13px] leading-none', compact ? 'mt-2 h-[13px]' : 'mt-3 h-[13px]')}>
        {active && <span className="text-brand-ink font-medium">{active.label}</span>}
      </div>
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
    // Accumulate locally: `values` is captured at call time, so reading it back
    // inside the loop would drop every file but the last of a multi-file pick.
    let acc = files(values, field.id);
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
        acc = [...acc, { name: f.name, url: json.url, size: f.size }];
        onChange(field.id, acc);
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
        className="flex flex-col items-center justify-center gap-1 text-center px-4 py-6 border border-dashed border-brand-line-2 rounded-md cursor-pointer transition-colors duration-150 hover:border-brand-ink-3 hover:bg-brand-bg"
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
            <div key={`${f.url}-${i}`} className="flex items-center gap-2.5 px-3 py-2 border border-brand-line rounded-md bg-white text-[13px]">
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 truncate text-brand-ink underline decoration-brand-line-2 underline-offset-2 hover:decoration-brand-ink transition-colors">
                {f.name}
              </a>
              <span className="font-mono text-[11px] text-brand-ink-4 flex-shrink-0">{fmtSize(f.size)}</span>
              <button type="button" onClick={() => removeFile(i)}
                className="flex-shrink-0 text-brand-ink-4 hover:text-brand-red transition-colors text-base leading-none px-1">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Note: read-only copy (role briefs, callouts) ──────────────────────────────
function NoteField({ field }: FP) {
  const blocks = field.body ?? [];
  const callout = field.variant === 'callout';
  return (
    <div className={clsx(
      'text-[14px] leading-relaxed',
      callout
        ? 'rounded-md bg-brand-bg px-5 py-4 text-brand-ink-2'
        : 'text-brand-ink-2'
    )}>
      {blocks.map((block, i) =>
        block.startsWith('- ') ? (
          <div key={i} className="flex gap-2.5 mt-1.5">
            <span className="mt-[9px] w-[3px] h-[3px] rounded-full bg-brand-ink-4 flex-shrink-0" />
            <span className="flex-1">{block.slice(2)}</span>
          </div>
        ) : (
          <p key={i} className={i === 0 ? '' : 'mt-3'}>{block}</p>
        )
      )}
    </div>
  );
}

function FieldRenderer(props: FP) {
  switch (props.field.type) {
    case 'note':          return <NoteField {...props} />;
    case 'matrix':        return <MatrixField {...props} />;
    case 'textarea':      return <TextareaField {...props} />;
    case 'date':          return <DateField {...props} />;
    case 'select':        return <SelectField {...props} />;
    case 'radio':         return <RadioField {...props} />;
    case 'checkboxgroup': return <CheckboxGroupField {...props} />;
    case 'slider':        return <SliderField {...props} />;
    case 'emojiscale':    return <EmojiScaleField {...props} />;
    case 'file':          return <FileField {...props} />;
    default:              return <TextField {...props} />;
  }
}

// ── Matrix: rows scored against shared columns ───────────────────────────────
// Rendered with the same dots, hairlines and tokens as every other field, so it
// reads as part of the form rather than a table dropped into it. Each row is a
// separate stored answer, which keeps autosave and the payload unremarkable.
function MatrixField({ field, values, onChange }: FP) {
  const cols = field.options ?? [];
  const rows = field.matrixRows ?? [];
  const multi = !!field.multiColumn;

  const pick = (rowId: string, col: string) => {
    const key = matrixKey(field.id, rowId);
    if (!multi) {
      onChange(key, str(values, key) === col ? '' : col);
      return;
    }
    const cur = arr(values, key);
    onChange(key, cur.includes(col) ? cur.filter(c => c !== col) : [...cur, col]);
  };
  const on = (rowId: string, col: string) => {
    const key = matrixKey(field.id, rowId);
    return multi ? arr(values, key).includes(col) : str(values, key) === col;
  };

  return (
    <div className="border border-brand-line rounded-md overflow-hidden">
      {/* Column headings, hidden on narrow screens where each row stacks */}
      <div className="hidden sm:flex items-end gap-3 px-4 pt-3 pb-2 bg-brand-bg border-b border-brand-line">
        <div className="flex-1" />
        {cols.map(c => (
          <div key={c.value} className="w-[74px] text-center font-mono text-[9.5px] uppercase tracking-[0.12em] text-brand-ink-4 leading-tight">
            {c.label}
          </div>
        ))}
      </div>

      {rows.map((row, i) => (
        <div
          key={row.id}
          className={clsx(
            'px-4 py-3 sm:flex sm:items-center sm:gap-3',
            i > 0 && 'border-t border-brand-line'
          )}
        >
          <div className="flex-1 min-w-0">
            <div className={clsx('text-[13.5px] leading-snug', row.freeform ? 'italic text-brand-ink-3' : 'text-brand-ink')}>
              {row.label}
            </div>
            {row.description && (
              <div className="text-[12px] text-brand-ink-4 mt-0.5 leading-snug">{row.description}</div>
            )}
          </div>

          <div className="flex gap-3 mt-2 sm:mt-0 flex-shrink-0">
            {cols.map(c => {
              const active = on(row.id, c.value);
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => pick(row.id, c.value)}
                  aria-pressed={active}
                  aria-label={`${row.label}: ${c.label}`}
                  className="w-[74px] flex sm:justify-center items-center gap-2 group"
                >
                  {multi ? <CheckDot active={active} /> : <RadioDot active={active} />}
                  {/* the column name repeats on mobile, where the header is hidden */}
                  <span className="sm:hidden text-[12px] text-brand-ink-3">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// A free-text companion under a choice question. Collapsed until asked for, and
// forced open once it holds text or the answer hits `openWhen` (e.g. "Other").
function NoteCompanion({ field, values, onChange }: FP) {
  const key = noteKey(field.id);
  const value = str(values, key);
  const forced = !!field.note?.openWhen && str(values, field.id) === field.note.openWhen;
  const [open, setOpen] = useState(false);
  const shown = open || !!value || forced;
  return (
    <div className="mt-2">
      {!shown ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[12px] font-medium text-brand-ink-4 hover:text-brand-ink transition-colors"
        >
          + note
        </button>
      ) : (
        <input
          type="text"
          className="field-line max-w-xl"
          autoFocus={open && !value}
          value={value}
          placeholder={field.note?.placeholder ?? (forced ? 'Which one?' : 'In their own words, whatever the options miss')}
          onChange={e => onChange(key, e.target.value)}
        />
      )}
    </div>
  );
}

function FieldWrapper({ field, values, onChange, showToast }: FP) {
  if (field.type === 'note') {
    return (
      <div>
        {field.label && (
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand-ink-3 mb-2.5 pb-2 border-b border-brand-line">
            {field.label}
          </div>
        )}
        <FieldRenderer field={field} values={values} onChange={onChange} showToast={showToast} />
      </div>
    );
  }
  return (
    <div className="field-cell">
      <div>
        {field.label && (
          <div className="flex items-start gap-1.5">
            <label className="text-[13.5px] font-normal text-brand-ink-2 leading-snug">
              {field.label}
            </label>
            {field.required && <span className="mt-[6px] w-1 h-1 rounded-full bg-brand-red flex-shrink-0" aria-hidden />}
          </div>
        )}
      </div>
      <div>
        {field.hint && <p className="text-[12.5px] text-brand-ink-4 mt-1 leading-relaxed max-w-xl">{field.hint}</p>}
      </div>
      <div className="mt-1.5">
        <FieldRenderer field={field} values={values} onChange={onChange} showToast={showToast} />
        {field.note && <NoteCompanion field={field} values={values} onChange={onChange} />}
      </div>
    </div>
  );
}

// ── Main FormClient ───────────────────────────────────────────────────────────
export default function FormClient({ form }: { form: FormConfig }) {
  // 'steps' walks one section at a time with prev/next; 'stacked' shows them all.
  // Either way a section is laid out as copy on the left, fields on the right.
  const isStepped = form.layout === 'steps';
  const STORAGE_KEY = `maxxlab-form-${form.slug}`;
  const [values, setValues] = useState<FormValues>(() => {
    const defaults: FormValues = {};
    form.sections.forEach(s => s.fields.forEach(f => {
      if (f.defaultValue) defaults[f.id] = f.defaultValue;
    }));
    return defaults;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);
  const [step, setStep] = useState(0);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** false until the applicant actually edits a field (a draft restore doesn't count) */
  const userPicked = useRef(false);
  const stepTopRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Drafts persist in localStorage rather than per-tab storage — long intake
  // forms (the NGHI program content form runs 11 sections deep) get filled
  // across several sittings, and closing the tab shouldn't wipe the answers.
  // Cleared on submit and on Clear.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
      if (raw) { setValues(prev => ({ ...prev, ...stripClosedAnswers(form, JSON.parse(raw)) })); }
    } catch { /* ignore */ }
  }, [STORAGE_KEY]);

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Branching changes how many sections exist, so the step index is always
  // clamped against the *current* visible list rather than trusted on its own.
  const sections = visibleSections(form, values);
  const stepIndex = Math.min(step, Math.max(0, sections.length - 1));

  const scrollToStepTop = useCallback(() => {
    requestAnimationFrame(() => {
      stepTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const goToStep = useCallback((i: number, sectionCount: number) => {
    setStep(Math.max(0, Math.min(i, sectionCount - 1)));
    scrollToStepTop();
  }, [scrollToStepTop]);

  // Used by required-field validation and by branch auto-advance: land on
  // whichever step owns a given section, in both stepped and stacked layouts.
  const goToSectionId = useCallback((id: string) => {
    const list = visibleSections(form, values);
    const i = list.findIndex(sec => sec.id === id);
    if (i < 0) return;
    if (isStepped) { goToStep(i, list.length); return; }
    requestAnimationFrame(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [form, values, isStepped, goToStep]);

  const handleChange = useCallback((id: string, value: string | string[] | FileValue[]) => {
    userPicked.current = true;
    setValues(prev => {
      const next = { ...prev, [id]: value };
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      }, 600);
      return next;
    });
  }, [STORAGE_KEY]);

  // Picking the branch field (e.g. which role you're applying for) should carry
  // you straight into that role's questions rather than leaving you on the picker.
  const branchField = form.sections.find(s => s.showIf)?.showIf?.field;
  const branchValue = branchField ? str(values, branchField) : '';
  const lastBranch = useRef(branchValue);
  useEffect(() => {
    if (!branchField || lastBranch.current === branchValue) return;
    lastBranch.current = branchValue;
    // Restoring a saved draft also populates this field, but that isn't the
    // applicant choosing anything — without this guard a returning visitor
    // gets dropped into the role brief instead of the opening question.
    if (!userPicked.current) return;
    if (!branchValue) return;
    const vis = visibleSections(form, values);
    const at = vis.findIndex(sec => sec.fields.some(f => f.id === branchField));
    const next = vis[at + 1];
    if (next) goToSectionId(next.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchValue]);

  // Every route to the submit modal goes through here. Required answers are
  // checked *before* the modal opens, so nobody fills in their name and email
  // only to be told the form isn't finished.
  const blockers = missingRequired(form, values);

  function requestSubmit() {
    if (blockers.length === 0) { setModalOpen(true); return; }
    const first = blockers[0];
    const owner = sections.find(sec => sec.fields.some(f => f.id === first.id));
    if (owner) goToSectionId(owner.id);
    showToast(
      blockers.length === 1
        ? `"${first.label ?? first.id}" is required before you can submit.`
        : `${blockers.length} required questions still need an answer — starting with "${first.label ?? first.id}".`,
      true,
    );
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify({ form: form.title, exported_at: new Date().toISOString(), data: values }, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${form.slug}.json` });
    a.click(); URL.revokeObjectURL(a.href);
    showToast('Exported successfully');
  }

  function handleClear() {
    if (!confirm('Clear all answers?')) return;
    setValues({}); try { localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    showToast('Form cleared');
  }

  async function handleSubmit(senderName: string, senderEmail: string, senderNote: string) {
    if (!senderName.trim()) { showToast('Please enter your name.', true); return; }
    if (!senderEmail.includes('@')) { showToast('Please enter a valid email.', true); return; }

    // The submit button posts with fetch, so the inputs' `required` attribute
    // never gets a chance to fire — check it here and send them to the gap.
    const missing = missingRequired(form, values);
    if (missing.length > 0) {
      const first = missing[0];
      const owner = visibleSections(form, values).find(sec => sec.fields.some(f => f.id === first.id));
      setModalOpen(false);
      if (owner) goToSectionId(owner.id);
      showToast(
        missing.length === 1
          ? `"${first.label ?? first.id}" is required.`
          : `${missing.length} required questions still need an answer — starting with "${first.label ?? first.id}".`,
        true,
      );
      return;
    }
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
      try { localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Submission failed. Please try again.', true);
    } finally {
      setSubmitting(false);
    }
  }

  const { total: totalFields, pct: pctAnswered } = progressFor(form, values);

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-white no-print">
        {/* Same container and gutter as the section grid below, so the hero copy
            and the sections' left column share one left edge. */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="pt-16 pb-2 max-w-2xl">
          <Logo size={34} />

          {form.eyebrow && (
            <div className="mt-9 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-ink-4">
              {form.eyebrow}
            </div>
          )}

          {/* Accent is carried by weight and tone, not by an italic serif */}
          <h1 className="mt-3.5 text-[38px] sm:text-[46px] leading-[1.06] tracking-[-0.032em] font-medium text-brand-ink">
            {form.heroAccent ? (
              <>
                {form.title.split('·')[0].trim().split(form.heroAccent)[0]}
                <span className="text-brand-ink-4">{form.heroAccent}</span>
              </>
            ) : form.title}
          </h1>

          {form.description && (
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-brand-ink-3">
              {form.description}
            </p>
          )}

        </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <main className="bg-white pb-32">
        <div ref={stepTopRef} className="scroll-mt-24" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10">
          {(isStepped ? [sections[stepIndex]].filter(Boolean) : sections).map(section => {
            const questions = inputFields(section);
            const notes = section.fields.filter(f => f.type === 'note');
            const position = sections.findIndex(sec => sec.id === section.id);

            // A copy-only step (a role brief) has nothing to put in the right
            // column, so it reads as one measured column instead of a lopsided split.
            const split = questions.length > 0;

            const copy = (
              <div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-brand-ink-4 tabular-nums">
                  {section.num} / {String(sections.length).padStart(2, '0')}
                </div>
                <h2 className="mt-4 text-[28px] sm:text-[32px] font-medium tracking-[-0.028em] leading-[1.12] text-brand-ink">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="mt-4 text-[15px] leading-[1.65] text-brand-ink-3">
                    {section.description}
                  </p>
                )}
                {notes.length > 0 && (
                  <div className="mt-7 space-y-6">
                    {notes.map(f => (
                      <FieldWrapper key={f.id} field={f} values={values} onChange={handleChange} showToast={showToast} />
                    ))}
                  </div>
                )}
              </div>
            );

            const fields = (
              <div className="space-y-6">
                {(() => {
                  const rows: (FormField | [FormField, FormField])[] = [];
                  let i = 0;
                  while (i < questions.length) {
                    const cur = questions[i], nxt = questions[i + 1];
                    if (cur.halfWidth && nxt?.halfWidth) { rows.push([cur, nxt]); i += 2; }
                    else { rows.push(cur); i++; }
                  }
                  return rows.map((row, ri) =>
                    Array.isArray(row) ? (
                      <div key={ri} className="field-pair">
                        {row.map(f => <FieldWrapper key={f.id} field={f} values={values} onChange={handleChange} showToast={showToast} />)}
                      </div>
                    ) : (
                      <FieldWrapper key={row.id} field={row} values={values} onChange={handleChange} showToast={showToast} />
                    )
                  );
                })()}
              </div>
            );

            return (
              <section
                key={section.id}
                ref={el => { sectionRefs.current[section.id] = el as HTMLDivElement | null; }}
                className={clsx('print-break-avoid scroll-mt-24', !isStepped && position > 0 && 'mt-20 pt-20 border-t border-brand-line')}
              >
                {split ? (
                  <div className="grid gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                    {copy}
                    {fields}
                  </div>
                ) : (
                  <div className="max-w-2xl">{copy}</div>
                )}
              </section>
            );
          })}

          {/* ── Step navigation ── */}
          {isStepped && (
            <div className="mt-16 pt-6 border-t border-brand-line flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => goToStep(stepIndex - 1, sections.length)}
                disabled={stepIndex === 0}
                className="group flex items-center gap-2 text-[13px] font-medium text-brand-ink-3 hover:text-brand-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="flex items-center gap-1.5" aria-hidden>
                {sections.map((sec, i) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => goToStep(i, sections.length)}
                    title={sec.title}
                    className={clsx(
                      'h-1 rounded-full transition-all duration-200',
                      i === stepIndex ? 'w-6 bg-brand-ink' : 'w-1.5 bg-brand-line-2 hover:bg-brand-ink-4'
                    )}
                  />
                ))}
              </div>

              {stepIndex < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => goToStep(stepIndex + 1, sections.length)}
                  className="group flex items-center gap-2 text-[13px] font-medium text-brand-ink hover:text-brand-red transition-colors"
                >
                  Next
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={requestSubmit}
                  className="group flex items-center gap-2 text-[13px] font-medium text-brand-red hover:text-brand-red-dark transition-colors"
                >
                  Review &amp; submit
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* End note — an email address is turned into a mailto link */}
          {(() => { const note = form.footerNote ?? "Nothing here is required. We'll cover any blanks together in our discovery call."; return (
            <div className="mt-14 max-w-2xl">
              <p className="text-[13px] text-brand-ink-3 leading-relaxed">
                {note.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) =>
                  /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part) ? (
                    <a key={i} href={`mailto:${part}`}
                      className="font-medium text-brand-ink underline decoration-brand-line-2 underline-offset-[3px] hover:decoration-brand-ink transition-colors">
                      {part}
                    </a>
                  ) : part
                )}
              </p>
            </div>
          ); })()}
        </div>
      </main>

      {/* ── Action bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 no-print"
        style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="max-w-2xl mx-auto px-6 py-3.5 flex items-center justify-between gap-3">

          {/* Left: progress */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-24 h-[3px] bg-brand-line overflow-hidden">
              <div className="h-full bg-brand-ink transition-all duration-500" style={{ width: `${pctAnswered}%` }} />
            </div>
            <span className="font-mono text-[11px] text-brand-ink-3">
              {blockers.length > 0 ? (
                <><span className="text-brand-ink font-medium tabular-nums">{blockers.length}</span> required left</>
              ) : (
                <><span className="text-brand-ink font-medium tabular-nums">{pctAnswered}%</span> filled</>
              )}
            </span>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={handleClear}
              className="px-3 py-2 text-[12px] font-medium text-brand-ink-4 hover:text-brand-ink transition-colors">
              Clear
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => window.print()}
                className="hidden sm:block px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">
                Print
              </button>
              <button onClick={handleExport}
                className="px-3.5 py-2 text-[12px] font-medium text-brand-ink-2 border border-brand-line rounded-md hover:border-brand-ink transition-colors">
                Export JSON
              </button>
              <button onClick={requestSubmit}
                className={clsx(
                  'px-5 py-2.5 text-[13px] font-medium rounded-md transition-colors flex items-center gap-2',
                  blockers.length > 0
                    ? 'bg-brand-line-2 text-white hover:bg-brand-ink-4'
                    : 'bg-brand-red text-white hover:bg-brand-red-dark'
                )}
                title={blockers.length > 0 ? `${blockers.length} required question${blockers.length === 1 ? '' : 's'} still need an answer` : undefined}>
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
          defaultName={str(values, 'full_name') || str(values, 'lead_name') || str(values, 'contact_name')}
          defaultEmail={str(values, 'email') || str(values, 'lead_email') || str(values, 'contact_email')}
          loading={submitting}
        />
      )}

      {toast && <Toast msg={toast.msg} error={toast.error} />}
    </>
  );
}
