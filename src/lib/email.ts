import type { FormSubmission, FileValue } from './types';
import { getFormBySlug } from '@/forms';

const FROM       = process.env.RESEND_FROM        ?? 'Maxxlab Forms <admin@maxxlab.tech>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL        ?? 'admin@maxxlab.tech';
const BASE_URL   = process.env.NEXT_PUBLIC_BASE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

// ── Shared logo img tag (SVG hosted in /public) ───────────────────────────────
const logoImg = (size = 44) =>
  `<img src="${BASE_URL}/logo.svg" width="${size}" height="${size}" alt="Maxxlab" style="display:block;border:0;" />`;

// ── Email shell ───────────────────────────────────────────────────────────────
function emailShell(preheader: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Maxxlab</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</span>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2f5;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

      <!-- Top brand bar -->
      <tr><td style="padding:0 0 20px 4px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:44px;height:44px;background:#0f172a;border-radius:12px;text-align:center;vertical-align:middle;">
              ${logoImg(28)}
            </td>
            <td style="padding-left:12px;vertical-align:middle;">
              <div style="font-size:15px;font-weight:700;color:#0f172a;line-height:1.2;">Maxxlab</div>
              <div style="font-size:10px;color:#94a3b8;letter-spacing:0.08em;text-transform:uppercase;margin-top:1px;">Custom Agents &amp; Digital Solutions</div>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- Body card -->
      <tr><td style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(15,23,42,0.07);">
        ${body}
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 4px 0;text-align:center;">
        <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">
          &copy; Maxxlab &nbsp;&middot;&nbsp;
          <a href="https://maxxlab.tech" style="color:#fe3030;text-decoration:none;">maxxlab.tech</a>
        </p>
        <p style="margin:0;font-size:11px;color:#cbd5e1;">This is an automated message from the Maxxlab Forms system.</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Section row helper ────────────────────────────────────────────────────────
function row(label: string, value: string) {
  const display = value?.trim()
    ? `<span style="color:#0f172a;">${value}</span>`
    : `<span style="color:#94a3b8;font-style:italic;">Not specified</span>`;
  return `
  <tr>
    <td style="padding:9px 20px;font-size:12px;color:#64748b;font-weight:500;white-space:nowrap;width:185px;vertical-align:top;border-bottom:1px solid #f8fafc;">${label}</td>
    <td style="padding:9px 20px;font-size:13px;border-bottom:1px solid #f8fafc;word-break:break-word;line-height:1.5;">${display}</td>
  </tr>`;
}

function isFileValueArray(val: unknown): val is FileValue[] {
  return Array.isArray(val) && val.length > 0 && typeof val[0] === 'object' && val[0] !== null && 'url' in (val[0] as object);
}

function fileRow(label: string, fileList: FileValue[]) {
  const display = fileList.length
    ? fileList.map(f => `<a href="${f.url}" style="color:#2563eb;text-decoration:none;">${f.name}</a>`).join('<br/>')
    : `<span style="color:#94a3b8;font-style:italic;">No files attached</span>`;
  return `
  <tr>
    <td style="padding:9px 20px;font-size:12px;color:#64748b;font-weight:500;white-space:nowrap;width:185px;vertical-align:top;border-bottom:1px solid #f8fafc;">${label}</td>
    <td style="padding:9px 20px;font-size:13px;border-bottom:1px solid #f8fafc;word-break:break-word;line-height:1.6;">${display}</td>
  </tr>`;
}

function emailSection(title: string, rows: string) {
  return `
  <div style="margin:0 24px 16px;border:1px solid #f0f4f8;border-radius:12px;overflow:hidden;">
    <div style="background:#f8fafc;padding:10px 16px;border-bottom:1px solid #f0f4f8;">
      <span style="font-size:12px;font-weight:600;color:#334155;">${title}</span>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
  </div>`;
}

function buildSections(submission: FormSubmission): string {
  const d = submission.data;
  const v = (k: string) => {
    const val = d[k];
    if (!val) return '';
    return Array.isArray(val) ? val.join(', ') : val;
  };
  const form = getFormBySlug(submission.formSlug);
  if (!form) {
    return emailSection('Submission Data',
      Object.entries(d).map(([k, val]) =>
        row(k, Array.isArray(val) ? val.join(', ') : val)
      ).join('')
    );
  }
  return form.sections.map(s =>
    emailSection(`${s.num} — ${s.title}`,
      s.fields.map(f => {
        const val = d[f.id];
        if (f.type === 'file') return fileRow(f.label ?? f.id, isFileValueArray(val) ? val : []);
        return row(f.label ?? f.id, v(f.id));
      }).join('')
    )
  ).join('');
}

// ── Client confirmation email ─────────────────────────────────────────────────
function buildClientEmail(submission: FormSubmission, viewUrl: string): string {
  const firstName = submission.senderName.split(' ')[0];
  const body = `
    <!-- Green status bar -->
    <div style="background:#0f172a;padding:28px 32px 24px;">
      <div style="display:inline-block;background:#fe3030;border-radius:100px;padding:4px 14px;margin-bottom:14px;">
        <span style="font-size:10px;font-weight:700;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;">Received</span>
      </div>
      <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;line-height:1.2;">
        Got it, ${firstName}.
      </h1>
      <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6;">
        Your <strong style="color:#e2e8f0;">${submission.formTitle}</strong> has been received.<br/>
        The Maxxlab team will review it before your discovery call.
      </p>
      ${submission.senderNote ? `<div style="margin-top:16px;background:rgba(245,158,11,0.15);border-left:3px solid #f59e0b;padding:10px 14px;border-radius:0 8px 8px 0;font-size:13px;color:#fde68a;line-height:1.5;"><strong>Your note:</strong> ${submission.senderNote}</div>` : ''}
    </div>

    <!-- View submission CTA -->
    <div style="padding:28px 32px;text-align:center;border-bottom:1px solid #f0f4f8;">
      <p style="margin:0 0 6px;font-size:13px;color:#64748b;">View or share your full submission at any time:</p>
      <p style="margin:0 0 20px;font-size:11px;color:#94a3b8;font-family:monospace;word-break:break-all;">${viewUrl}</p>
      <a href="${viewUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-size:14px;font-weight:600;letter-spacing:0.02em;">
        View My Submission &rarr;
      </a>
    </div>

    <!-- What happens next -->
    <div style="padding:24px 32px 28px;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#0f172a;">What happens next</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${[
          ['Review', 'The Maxxlab team reviews your answers before the meeting.'],
          ['Prepare', "We'll tailor the discovery call agenda based on your responses."],
          ['Meet', 'Anything you skipped gets covered together in the session.'],
        ].map(([title, desc], i) => `
          <tr>
            <td width="32" style="vertical-align:top;padding-bottom:12px;">
              <div style="width:24px;height:24px;background:#fef2f2;border:1.5px solid #fecaca;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;color:#fe3030;">${i + 1}</div>
            </td>
            <td style="padding-bottom:12px;padding-left:8px;vertical-align:top;">
              <div style="font-size:13px;font-weight:600;color:#0f172a;">${title}</div>
              <div style="font-size:12px;color:#64748b;margin-top:2px;line-height:1.5;">${desc}</div>
            </td>
          </tr>`).join('')}
      </table>
    </div>
  `;
  return emailShell(`We received your ${submission.formTitle} — Maxxlab`, body);
}

// ── Admin notification email ──────────────────────────────────────────────────
function buildAdminEmail(submission: FormSubmission, viewUrl: string): string {
  const submittedAt = new Date(submission.submittedAt).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const body = `
    <!-- Dark header -->
    <div style="background:#0f172a;padding:28px 32px 24px;border-radius:20px 20px 0 0;">
      <div style="display:inline-block;background:#fe3030;border-radius:100px;padding:4px 14px;margin-bottom:16px;">
        <span style="font-size:10px;font-weight:700;color:#ffffff;letter-spacing:0.08em;text-transform:uppercase;">New Submission</span>
      </div>
      <h1 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#ffffff;line-height:1.2;">${submission.formTitle}</h1>

      <!-- Sender info card -->
      <div style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;padding-bottom:4px;">Submitted by</td>
          </tr>
          <tr>
            <td style="font-size:16px;font-weight:700;color:#ffffff;">${submission.senderName}</td>
          </tr>
          <tr>
            <td style="font-size:12px;color:#94a3b8;padding-top:2px;">${submission.senderEmail}</td>
          </tr>
          <tr>
            <td style="font-size:11px;color:#475569;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);margin-top:8px;">${submittedAt}</td>
          </tr>
        </table>
      </div>
      ${submission.senderNote ? `<div style="margin-top:14px;background:rgba(245,158,11,0.12);border-left:3px solid #f59e0b;padding:10px 14px;border-radius:0 8px 8px 0;font-size:13px;color:#fde68a;line-height:1.5;"><strong>Note:</strong> ${submission.senderNote}</div>` : ''}
    </div>

    <!-- CTA -->
    <div style="padding:24px 32px;text-align:center;border-bottom:1px solid #f0f4f8;">
      <a href="${viewUrl}" style="display:inline-block;background:#fe3030;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:100px;font-size:14px;font-weight:600;letter-spacing:0.02em;">
        View Full Submission &rarr;
      </a>
      <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;font-family:monospace;word-break:break-all;">${viewUrl}</p>
    </div>

    <!-- Submission data -->
    <div style="padding:20px 0 8px;">
      ${buildSections(submission)}
    </div>

    <!-- Submission ID footer -->
    <div style="padding:12px 32px 24px;text-align:center;border-top:1px solid #f0f4f8;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">
        Submission ID: <span style="font-family:monospace;color:#64748b;">${submission.id}</span>
      </p>
    </div>
  `;
  return emailShell(`New submission: ${submission.formTitle} from ${submission.senderName}`, body);
}

// ── Send ──────────────────────────────────────────────────────────────────────
export interface SendResult { ok: boolean; error?: string; }

export async function sendSubmissionEmails(submission: FormSubmission): Promise<SendResult> {
  const viewUrl     = `${BASE_URL}/view/${submission.id}`;
  const clientHtml  = buildClientEmail(submission, viewUrl);
  const adminHtml   = buildAdminEmail(submission, viewUrl);
  const apiKey      = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('\n📧 [DEV] No RESEND_API_KEY — emails logged only');
    console.log(`  → Client → ${submission.senderEmail}`);
    console.log(`  → Admin  → ${ADMIN_EMAIL}`);
    console.log(`  → View   → ${viewUrl}\n`);
    return { ok: true };
  }

  const testOverride = process.env.TEST_EMAIL_OVERRIDE;
  if (testOverride) console.log(`[email] TEST_EMAIL_OVERRIDE → ${testOverride}`);

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const [clientRes, adminRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: testOverride ?? submission.senderEmail,
        subject: `We received your ${submission.formTitle}`,
        html: clientHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: testOverride ?? ADMIN_EMAIL,
        replyTo: submission.senderEmail,
        subject: `New submission: ${submission.formTitle} from ${submission.senderName}`,
        html: adminHtml,
      }),
    ]);

    if (clientRes.error || adminRes.error) {
      const err = clientRes.error?.message ?? adminRes.error?.message ?? 'Unknown error';
      console.error('[email] Resend error:', err);
      return { ok: false, error: err };
    }

    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Email send failed';
    console.error('[email] Exception:', msg);
    return { ok: false, error: msg };
  }
}
