'use client';

import { useState } from 'react';
import Logo from './Logo';

interface ModalProps {
  onClose: () => void;
  onSubmit: (name: string, email: string, note: string) => void;
  defaultName?: string;
  defaultEmail?: string;
  loading: boolean;
}

export default function SubmitModal({ onClose, onSubmit, defaultName, defaultEmail, loading }: ModalProps) {
  const [name, setName] = useState(defaultName ?? '');
  const [email, setEmail] = useState(defaultEmail ?? '');
  const [note, setNote] = useState('');

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-xl sm:rounded-lg border border-brand-line shadow-xl animate-slide-up overflow-hidden">
        {/* Modal header */}
        <div className="px-7 pt-7 pb-6 border-b border-brand-line">
          <div className="flex items-center gap-3 mb-3">
            <Logo size={26} />
            <div>
              <div className="text-brand-ink font-medium text-sm">Maxxlab</div>
              <div className="text-brand-ink-4 text-[10px] font-mono uppercase tracking-[0.16em]">Form Submission</div>
            </div>
          </div>
          <h2 className="text-[20px] font-medium tracking-[-0.02em] text-brand-ink">Ready to submit?</h2>
          <p className="text-brand-ink-3 text-[13px] mt-1.5 leading-relaxed">
            We'll email you a copy with a secure link to view your full submission.
          </p>
        </div>

        <div className="px-7 py-6 space-y-5">
          <div>
            <label className="block font-mono text-[10px] font-medium text-brand-ink-3 uppercase tracking-[0.13em] mb-1.5">
              Your name <span className="text-brand-red">·</span>
            </label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Full name" autoComplete="name" className="field-line" />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-medium text-brand-ink-3 uppercase tracking-[0.13em] mb-1.5">
              Your email <span className="text-brand-red">·</span>
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@company.com" autoComplete="email" className="field-line" />
          </div>
          <div>
            <label className="block font-mono text-[10px] font-medium text-brand-ink-3 uppercase tracking-[0.13em] mb-1.5">
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
