'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type Mode = 'draw' | 'type';

interface Props {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
}

/**
 * Signature capture. Draw with a mouse, finger or stylus, or type a name and
 * have it set in the serif face. Either way the result is a transparent PNG
 * data URL, so the contract preview, the export and the email all render the
 * same mark.
 */
export default function SignaturePad({ label, value, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);
  const [mode, setMode] = useState<Mode>('draw');
  const [typed, setTyped] = useState('');

  // The canvas is sized in device pixels so the line stays crisp on retina and
  // the exported PNG is not a blurry upscale of a CSS-sized bitmap.
  const setupCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return null;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    if (c.width !== Math.round(rect.width * ratio)) {
      c.width = Math.round(rect.width * ratio);
      c.height = Math.round(rect.height * ratio);
    }
    const ctx = c.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';
    return ctx;
  }, []);

  useEffect(() => { setupCanvas(); }, [setupCanvas]);

  const pos = (e: PointerEvent | React.PointerEvent) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = setupCanvas();
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    dirty.current = true;
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (dirty.current) commit();
  }
  function commit() {
    const c = canvasRef.current;
    if (!c) return;
    onChange(c.toDataURL('image/png'));
  }
  function clear() {
    const ctx = setupCanvas();
    const c = canvasRef.current;
    if (ctx && c) ctx.clearRect(0, 0, c.width, c.height);
    dirty.current = false;
    setTyped('');
    onChange('');
  }

  /** Render a typed name into the same PNG shape as a drawn one. */
  function commitTyped(text: string) {
    setTyped(text);
    if (!text.trim()) { onChange(''); return; }
    const ratio = 2;
    const w = 420, h = 110;
    const c = document.createElement('canvas');
    c.width = w * ratio; c.height = h * ratio;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic 44px "Instrument Serif", Georgia, serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.trim(), 6, h / 2);
    onChange(c.toDataURL('image/png'));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[13.5px] text-brand-ink-2">{label}</span>
        <div className="flex items-center gap-1">
          {(['draw', 'type'] as Mode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); clear(); }}
              className={clsx(
                'px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors',
                mode === m ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-line text-brand-ink-3 hover:border-brand-ink-4'
              )}
            >
              {m === 'draw' ? 'Draw' : 'Type'}
            </button>
          ))}
        </div>
      </div>

      {mode === 'draw' ? (
        <div className="relative">
          <canvas
            ref={canvasRef}
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
            className="w-full h-[120px] rounded-md border border-dashed border-brand-line-2 bg-white touch-none cursor-crosshair"
            aria-label={`${label}: draw your signature`}
          />
          {!value && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[12.5px] text-brand-ink-4">
              Sign here
            </span>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={typed}
          onChange={e => commitTyped(e.target.value)}
          placeholder="Type your full name"
          className="field-line"
          style={{ fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic', fontSize: '22px' }}
          aria-label={`${label}: type your signature`}
        />
      )}

      <div className="flex items-center justify-between mt-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand-ink-4">
          {value ? 'Signed' : 'Not signed'}
        </span>
        <button type="button" onClick={clear} className="text-[12px] text-brand-ink-4 hover:text-brand-ink transition-colors">
          Clear
        </button>
      </div>
    </div>
  );
}
