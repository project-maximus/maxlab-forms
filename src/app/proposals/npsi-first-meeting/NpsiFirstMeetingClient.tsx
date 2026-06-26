'use client';

import { useEffect, useLayoutEffect } from 'react';

// ── Ported verbatim from MAXXLAB_NPSI_First_Meeting.html ───────────────────────
// Styling and behavior are intentionally untouched — only mojibake from the
// source file's encoding was repaired, the "Powered by AI" tagline was
// removed, and the Maxxlab mark was added to the topbar logo lockup.

const STYLE = `
:root{
  --red:#ED1C24;--red2:#EF3940;--ink:#141414;--ink2:#2a2a2a;
  --paper:#fff;--panel:#f6f6f7;--panel2:#efeff1;--line:#e4e4e7;
  --muted:#6b6b72;--gold:#c8a24a;--ok:#1f9d55;
  --maxw:1080px;--r:16px;--sans:'Helvetica Neue',Arial,'Segoe UI',Roboto,system-ui,sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:var(--sans);color:var(--ink);background:var(--panel);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{line-height:1.13;margin:0 0 .5em;letter-spacing:-.02em}
h1{font-size:clamp(1.9rem,4.4vw,3rem);font-weight:800;text-transform:uppercase}
h2{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;text-transform:uppercase}
h3{font-size:1.18rem;font-weight:800}
h4{font-size:.95rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em}
p{margin:0 0 1em}
a{color:var(--red);text-decoration:none}

/* top bar */
.topbar{position:sticky;top:0;z-index:50;background:var(--ink);color:#fff;border-bottom:3px solid var(--red)}
.tin{max-width:var(--maxw);margin:0 auto;display:flex;align-items:center;gap:14px;padding:12px 22px;flex-wrap:wrap}
.logo{display:flex;align-items:center;gap:10px}
.logo .brandname{font-weight:700;font-size:.95rem;color:#fff;line-height:1.2}
.logo .tag{font-size:.62rem;letter-spacing:.1em;color:#9a9aa0;font-weight:600;text-transform:uppercase;line-height:1.4}
.vsbadge{margin-left:auto;font-size:.7rem;color:#cfcfd2;text-transform:uppercase;letter-spacing:.1em}
.vsbadge b{color:#fff}

/* step rail */
.rail{background:#1d1d1d;border-bottom:1px solid #2a2a2a}
.rail-in{max-width:var(--maxw);margin:0 auto;display:flex;gap:4px;padding:9px 16px;overflow-x:auto}
.rail button{background:transparent;border:0;color:#9a9aa0;font-family:var(--sans);font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:6px 10px;border-radius:20px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px}
.rail button .d{width:18px;height:18px;border-radius:50%;background:#33333a;color:#bbb;display:flex;align-items:center;justify-content:center;font-size:.66rem}
.rail button:hover{color:#fff}
.rail button.active{color:#fff}
.rail button.active .d{background:var(--red);color:#fff}
.rail button.done .d{background:var(--ok);color:#fff}

/* stage */
.stage{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.step{display:none;padding:40px 0 30px;animation:fade .3s ease}
.step.show{display:block}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.eyebrow{color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.14em;font-size:.76rem;margin-bottom:8px}
.lead{font-size:1.12rem;color:var(--ink2);max-width:760px}

/* hero */
.hero{background:linear-gradient(135deg,#141414 0%,#1d1d1d 55%,#2a0a0c 100%);color:#fff;border-radius:var(--r);padding:50px 44px;position:relative;overflow:hidden}
.hero::after{content:"XX";position:absolute;right:-6px;top:-34px;font-size:13rem;font-weight:800;color:rgba(237,28,36,.13);letter-spacing:-.05em}
.hero .kick{display:inline-block;background:var(--red);color:#fff;font-size:.68rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:6px 13px;border-radius:30px;margin-bottom:18px}
.hero .sub{font-size:1.12rem;color:#d9d9dc;max-width:620px}
.hero .who{margin-top:24px;display:flex;gap:30px;flex-wrap:wrap;font-size:.8rem;color:#b8b8bc}
.hero .who b{color:#fff;display:block;font-size:.98rem}

.card{background:var(--paper);border:1px solid var(--line);border-radius:var(--r);padding:24px 26px;margin:16px 0;box-shadow:0 1px 2px rgba(0,0,0,.03)}
.grid{display:grid;gap:15px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
@media(max-width:820px){.g2,.g3{grid-template-columns:1fr}.hero{padding:36px 24px}}

.issue{display:flex;gap:14px;align-items:flex-start;padding:16px 18px;border:1px solid var(--line);border-left:5px solid var(--red);border-radius:12px;background:#fff;margin:10px 0}
.issue .ic{flex:0 0 auto;width:40px;height:40px;border-radius:10px;background:#fdeaeb;color:var(--red);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem}
.issue h4{margin:0 0 3px;text-transform:none;letter-spacing:0;font-size:1.02rem}
.issue p{margin:0;font-size:.92rem;color:var(--muted)}
.sev{font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;padding:3px 8px;border-radius:20px;color:#fff;margin-left:auto;white-space:nowrap}
.sev.crit{background:#b3161c}.sev.high{background:var(--red)}.sev.med{background:#d98a00}

.qa{border:1px solid var(--line);border-radius:12px;background:#fff;margin:10px 0;overflow:hidden}
.qa .q{display:flex;gap:12px;align-items:center;padding:15px 18px;font-weight:700;cursor:pointer}
.qa .q .n{flex:0 0 auto;width:30px;height:30px;border-radius:8px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.85rem}
.qa .q .chev{margin-left:auto;color:var(--red);font-weight:800;transition:.2s}
.qa.open .q .chev{transform:rotate(90deg)}
.qa .a{display:none;padding:0 18px 16px 60px;color:var(--muted);font-size:.92rem;font-style:italic}
.qa.open .a{display:block}

/* timeline 12 day */
.days{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:820px){.days{grid-template-columns:repeat(2,1fr)}}
.day{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px;border-top:4px solid var(--red)}
.day .dn{font-size:.66rem;font-weight:800;color:var(--red);text-transform:uppercase;letter-spacing:.08em}
.day h4{margin:5px 0 4px;font-size:.92rem;text-transform:none;letter-spacing:0}
.day p{margin:0;font-size:.82rem;color:var(--muted)}

ul.del{list-style:none;padding:0;margin:0}
ul.del li{padding:8px 0 8px 30px;position:relative;font-size:.95rem;border-bottom:1px solid var(--panel2)}
ul.del li::before{content:"✓";position:absolute;left:0;top:7px;width:20px;height:20px;background:var(--red);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:800}

/* AI upsell */
.ai{background:linear-gradient(135deg,#1d1d1d,#2a0a0c);color:#fff;border-radius:var(--r);padding:30px 32px;position:relative;overflow:hidden}
.ai .tagup{display:inline-block;background:var(--gold);color:#141414;font-size:.64rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:4px 11px;border-radius:20px;margin-bottom:14px}
.ai ul{margin:0;padding:0;list-style:none}
.ai li{padding:7px 0 7px 28px;position:relative;color:#e3e3e6;font-size:.95rem}
.ai li::before{content:"✓";position:absolute;left:0;color:var(--red2)}

/* pricing */
.plans{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:820px){.plans{grid-template-columns:1fr}}
.plan{background:#fff;border:2px solid var(--line);border-radius:var(--r);padding:26px;position:relative;cursor:pointer;transition:.18s}
.plan:hover{border-color:var(--red);transform:translateY(-3px)}
.plan.sel{border-color:var(--red);box-shadow:0 10px 30px rgba(237,28,36,.16)}
.plan.feat{border-color:var(--ink)}
.plan .badge{position:absolute;top:-12px;right:20px;background:var(--ink);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px}
.plan .pname{font-size:.74rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--red)}
.plan .setup{font-size:2.4rem;font-weight:800;margin:8px 0 0}
.plan .setup small{font-size:.8rem;color:var(--muted);font-weight:600}
.plan .ret{font-size:1.05rem;font-weight:700;color:var(--ink2);margin:2px 0 14px;padding-bottom:14px;border-bottom:1px dashed var(--line)}
.plan .ret b{color:var(--red)}
.plan h4.sec{margin:14px 0 6px;color:var(--ink2);font-size:.72rem;letter-spacing:.06em}
.plan ul{list-style:none;padding:0;margin:0 0 6px}
.plan li{padding:5px 0 5px 24px;position:relative;font-size:.88rem}
.plan li::before{content:"✓";position:absolute;left:0;color:var(--red);font-weight:800}
.plan .pick{margin-top:14px;width:100%;background:var(--panel2);color:var(--ink);border:0;padding:11px;border-radius:10px;font-weight:800;font-size:.85rem;cursor:pointer;font-family:var(--sans)}
.plan.sel .pick{background:var(--red);color:#fff}
.plan.sel .pick::after{content:"  ✓ Selected"}

.miniflag{font-size:.7rem;color:var(--muted);text-align:center;margin-top:12px}

/* nav buttons */
.navbtns{max-width:var(--maxw);margin:0 auto;display:flex;align-items:center;gap:12px;padding:18px 22px 50px}
.btn{background:var(--red);color:#fff;border:0;padding:13px 26px;border-radius:10px;font-weight:800;font-size:.92rem;cursor:pointer;font-family:var(--sans);letter-spacing:.02em}
.btn:hover{opacity:.92}
.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}
.btn:disabled{opacity:.4;cursor:not-allowed}
.stepind{margin-left:auto;font-size:.78rem;color:var(--muted);font-weight:600}

.callout{border-radius:12px;padding:16px 18px;margin:14px 0;border-left:5px solid var(--red);background:#fdeaeb;font-size:.95rem}
.callout.dark{background:var(--panel);border-left-color:var(--ink)}
.bignum{font-size:2rem;font-weight:800;color:var(--red2)}
.statrow{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:820px){.statrow{grid-template-columns:1fr}}
.stat{background:var(--ink);color:#fff;border-radius:12px;padding:18px}
.stat .l{font-size:.74rem;color:#c9c9cd;text-transform:uppercase;letter-spacing:.05em}
.footer{background:var(--ink);color:#bdbdbd;text-align:center;padding:24px;font-size:.8rem;border-top:3px solid var(--red)}
.footer b{color:#fff}
.summary{background:var(--ink);color:#fff;border-radius:var(--r);padding:28px 30px}
.summary .row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #2e2e2e;font-size:.95rem}
.summary .row b{color:#fff}
.summary .tot{font-size:1.3rem;font-weight:800;color:var(--red2)}

/* ---- interactive audit stats ---- */
.mtiles{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:820px){.mtiles{grid-template-columns:repeat(2,1fr)}}
.mtile{background:#fff;border:1px solid var(--line);border-top:4px solid var(--red);border-radius:12px;padding:16px 12px;cursor:pointer;text-align:center;transition:.15s}
.mtile:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.07)}
.mtile.active{box-shadow:0 6px 18px rgba(237,28,36,.18)}
.mtile .v{font-size:1.9rem;font-weight:800;line-height:1}
.mtile .v small{font-size:.7rem;color:var(--muted);font-weight:600}
.mtile .k{font-size:.66rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);margin-top:5px}
.mtile.good .v{color:var(--ok)}.mtile.warn .v{color:#d98a00}.mtile.bad .v{color:var(--red)}.mtile.neu .v{color:var(--ink)}
.tiledetail{background:var(--ink);color:#fff;border-radius:12px;padding:14px 18px;margin:12px 0;font-size:.9rem;min-height:20px}
.tiledetail b{color:var(--red2)}
.bar{height:9px;background:var(--panel2);border-radius:20px;overflow:hidden;margin:5px 0 0}
.bar>i{display:block;height:100%;background:var(--red);border-radius:20px}
.scorerow{display:flex;justify-content:space-between;font-size:.86rem;font-weight:700;margin-top:12px}
.scorerow span:last-child{color:var(--ink)}
.chip{display:inline-flex;align-items:center;gap:6px;background:#fdeaeb;border:1px solid #f6c9cb;color:#b3161c;font-size:.76rem;font-weight:700;padding:5px 11px;border-radius:20px;margin:3px}
.chip .dot{width:7px;height:7px;border-radius:50%;background:var(--red)}
.crawlbar{display:flex;height:34px;border-radius:8px;overflow:hidden;font-size:.64rem;font-weight:800;color:#fff;margin-top:6px}
.crawlbar span{display:flex;align-items:center;justify-content:center;min-width:0}
.warnlist{list-style:none;padding:0;margin:0}
.warnlist li{display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--panel2);font-size:.9rem}
.warnlist .ct{margin-left:auto;background:var(--ink);color:#fff;font-size:.7rem;font-weight:800;padding:2px 9px;border-radius:20px}
.warnlist .ct.aiflag{background:var(--gold);color:#141414}
table.findings{width:100%;border-collapse:collapse;font-size:.85rem;margin-top:6px}
table.findings th,table.findings td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
table.findings th{background:var(--ink);color:#fff;font-size:.64rem;text-transform:uppercase;letter-spacing:.04em}
table.findings tr:nth-child(even) td{background:var(--panel)}
.srcnote{font-size:.74rem;color:var(--muted);margin-top:8px}
.srcnote b{color:var(--ink2)}
.aihi{background:#faf5e8;border:1px solid #ecdcae;border-left:4px solid var(--gold);border-radius:10px;padding:10px 12px;margin:8px 0}
.aihi h4.sec{color:#9a7b1e !important;margin:0 0 5px}
.aihi li::before{color:var(--gold) !important}
.logo svg{flex:0 0 auto;margin-right:8px;display:block}
`;

const BODY_HTML = `
<div class="topbar"><div class="tin">
  <div class="logo"><svg width="26" height="26" viewBox="580 598 360 308" aria-label="Maxxlab logo"><path fill="#ffffff" d="M689 608h38c9.148 18.297 9.148 18.297 13.375 27.563l3.094 6.738 1.691 3.69c3.559 7.759 7.138 15.508 10.715 23.259l1.156 2.506A9314 9314 0 0 0 779 719c7.425-7.347 14.184-15.164 20.75-23.281 2.895-3.498 5.946-6.837 9.004-10.192 2.308-2.597 4.502-5.261 6.683-7.965 3.861-4.773 7.937-9.296 12.094-13.812 2.413-2.687 4.702-5.44 6.969-8.25 3.837-4.756 7.894-9.255 12.031-13.75 3.195-3.56 6.179-7.27 9.18-10.992 3.11-3.747 6.405-7.307 9.734-10.86 2.5-2.683 2.5-2.683 3.966-5.119 4.168-6.302 4.168-6.302 7.952-7.572 2.762-.247 5.394-.222 8.164-.086l2.997.039c3.14.05 6.275.163 9.414.278q3.203.067 6.408.123c5.22.098 10.436.249 15.654.439-2.659 4.058-5.364 7.65-8.687 11.188-5.797 6.277-11.565 12.69-16.313 19.812l2.117-1.75 2.758-2.25 2.742-2.25C905 631 905 631 907 631l8 40c-18.144 13.608-18.144 13.608-24.812 18.375A1714 1714 0 0 0 871.5 703a2044 2044 0 0 1-20.73 15.105c-6.244 4.5-12.442 9.063-18.63 13.64-4.06 3-8.133 5.978-12.234 8.923l-2.494 1.791q-2.354 1.687-4.715 3.367l-2.135 1.53-1.87 1.332c-1.71 1.326-3.198 2.75-4.692 4.312l2.329 1.278c13.357 7.337 26.704 14.685 39.916 22.282 6.724 3.863 13.484 7.66 20.255 11.44a2506 2506 0 0 1 25.55 14.463 1583 1583 0 0 0 17.202 9.7c4.206 2.343 8.404 4.703 12.6 7.067q3.18 1.787 6.367 3.56a1057 1057 0 0 1 9.218 5.21l2.836 1.562 2.598 1.5 2.28 1.286c4.399 3.93 4.705 11.405 5.794 16.988l.53 2.665q.83 4.185 1.65 8.374l1.129 5.7q1.379 6.96 2.746 13.925c-3.89-.591-6.737-1.76-10.148-3.703l-3.01-1.702-3.217-1.845-3.36-1.906a3280 3280 0 0 1-6.904-3.927 2977 2977 0 0 0-12.166-6.888c-5.68-3.205-11.354-6.42-17.029-9.633l-11.396-6.449a5196 5196 0 0 0-21.395-12.01 3227 3227 0 0 1-31.054-17.606q-5.314-3.045-10.634-6.081L821 805c0 4.086 1.769 7.09 3.516 10.691l1.112 2.33q1.185 2.48 2.379 4.96c2.088 4.338 4.158 8.685 6.231 13.03l1.25 2.618c4.803 10.055 9.464 20.173 14.103 30.304 1.52 3.31 3.052 6.614 4.585 9.919l3.074 6.648 1.45 3.117c.435.94.869 1.882 1.316 2.852l1.165 2.513C862 896 862 896 862 898h-38c-8.32-17.536-16.633-35.063-24.625-52.75a2746 2746 0 0 0-16.296-35.408A967 967 0 0 0 770 783c-6.148 6.608-12.093 13.252-17.754 20.285-2.334 2.822-4.766 5.52-7.246 8.215a223 223 0 0 0-9.5 11c-3.837 4.756-7.894 9.255-12.031 13.75-2.413 2.687-4.702 5.44-6.969 8.25-3.837 4.756-7.894 9.255-12.031 13.75-2.413 2.687-4.702 5.44-6.969 8.25-3.83 4.747-7.877 9.238-12.008 13.723-3.301 3.679-6.4 7.504-9.484 11.367L674 894l-1.5 2.126c-3.913 2.933-7.757 2.369-12.516 2.265l-2.942-.018a993 993 0 0 1-9.292-.123q-3.153-.03-6.305-.055c-5.149-.044-10.297-.113-15.445-.195 2.659-4.058 5.364-7.65 8.688-11.187 5.01-5.424 9.679-11.067 14.312-16.813a1143 1143 0 0 1 5-6c-4.37 2.884-8.72 5.77-12.937 8.875C638 875 638 875 636 875q-1.505-7.338-2.99-14.679-.507-2.496-1.02-4.99-.734-3.592-1.459-7.186l-.464-2.242c-1.47-7.35-1.47-7.35-1.067-10.903a41 41 0 0 1 5.625-4.687l1.783-1.308c1.852-1.352 3.72-2.68 5.592-4.005q1.657-1.188 3.313-2.379 2.515-1.805 5.04-3.595c5.012-3.55 9.959-7.186 14.897-10.838a1743 1743 0 0 1 18.938-13.813c6.31-4.539 12.552-9.159 18.756-13.843 5.863-4.414 11.804-8.716 17.767-12.993A719 719 0 0 0 735 757c-3.036-2.393-6.172-4.292-9.559-6.152-1.097-.606-2.194-1.21-3.324-1.835l-1.755-.963c-3.069-1.684-6.131-3.379-9.194-5.073l-1.864-1.031a1146 1146 0 0 1-15.929-9.009 2329 2329 0 0 0-22.625-12.812l-3.17-1.774a9580 9580 0 0 0-15.88-8.859c-11.564-6.445-23.066-12.978-34.472-19.699l-2.783-1.637-2.702-1.61c-2.754-1.597-2.754-1.597-5.775-2.968-8.34-3.985-8.34-3.985-9.925-8.336A109 109 0 0 1 595 670q-.424-1.977-.86-3.952a549 549 0 0 1-2.357-11.516q-.713-3.635-1.441-7.266l-.916-4.633-.436-2.188c-.557-2.87-.99-5.513-.99-8.445 3.152.652 5.648 1.754 8.465 3.3.87.477 1.742.953 2.639 1.443l2.833 1.57c.982.54 1.963 1.08 2.975 1.635 9.113 5.03 18.152 10.185 27.174 15.376q8.265 4.753 16.539 9.489l1.784 1.02c9.932 5.684 19.92 11.26 29.933 16.8a1695 1695 0 0 1 22.766 12.856 2391 2391 0 0 0 21.58 12.198l3.316 1.858c4.957 2.805 4.957 2.805 9.996 5.455l-1.278-2.708c-7.993-16.94-15.954-33.892-23.78-50.91a3103 3103 0 0 0-6.29-13.577c-9.928-21.31-9.928-21.31-14.465-31.492l-1.004-2.25C689 609.127 689 609.127 689 608"/><path fill="#fe3030" d="M689 608h38c9.148 18.297 9.148 18.297 13.375 27.563l3.094 6.738 1.691 3.69c3.559 7.759 7.138 15.508 10.715 23.259l1.156 2.506A9314 9314 0 0 0 779 719c7.425-7.347 14.184-15.164 20.75-23.281 2.895-3.498 5.946-6.837 9.004-10.192 2.308-2.597 4.502-5.261 6.683-7.965 3.861-4.773 7.937-9.296 12.094-13.812 2.413-2.687 4.702-5.44 6.969-8.25 3.837-4.756 7.894-9.255 12.031-13.75 3.195-3.56 6.179-7.27 9.18-10.992 3.11-3.747 6.405-7.307 9.734-10.86 2.5-2.683 2.5-2.683 3.966-5.119 4.168-6.302 4.168-6.302 7.952-7.572 2.762-.247 5.394-.222 8.164-.086l2.997.039c3.14.05 6.275.163 9.414.278q3.203.067 6.408.123c5.22.098 10.436.249 15.654.439-2.659 4.058-5.364 7.65-8.687 11.188-3.46 3.744-6.79 7.54-10 11.5l-2.258 2.765a200 200 0 0 0-3.61 4.594C889.571 645.413 881.581 650.542 874 656l-4.375 3.168a3107 3107 0 0 1-6.7 4.835A1570 1570 0 0 0 846.5 676a1828 1828 0 0 1-18.5 13.5c-8.574 6.173-17.082 12.433-25.578 18.712A5240 5240 0 0 1 795 713.68l-2.486 1.83a2742 2742 0 0 1-4.85 3.558c-3.494 2.564-6.961 5.142-10.348 7.846l-1.658 1.307a413 413 0 0 0-4.213 3.4c-3.112 1.755-4.06 1.322-7.445.379-4.076-1.765-7.924-3.922-11.812-6.062l-3.198-1.604c-9.014-5.016-12.209-11.076-16.08-20.216-1.164-2.709-2.438-5.355-3.722-8.008-1.612-3.336-3.177-6.693-4.75-10.048l-1.027-2.183c-5.77-12.28-11.422-24.61-17.013-36.973a2441 2441 0 0 0-9.003-19.718l-.864-1.865q-2.01-4.337-4.028-8.67l-1.405-3.028-1.234-2.648C689 609 689 609 689 608"/><path fill="#fd3030" d="M771 776c3.885 1.156 7.334 3.198 10.867 5.16l3.413 1.89a1791 1791 0 0 1 7.27 4.085l1.832 1.034 3.62 2.047c3.83 2.159 7.693 4.2 11.665 6.084 6.303 3.548 9.338 6.509 12.29 13.024l1.015 2.134A525 525 0 0 1 826 818l1.784 3.848a995 995 0 0 1 4.317 9.522c6.349 14.16 12.894 28.222 19.532 42.249a2294 2294 0 0 1 9.533 20.329C862 896 862 896 862 898h-38c-8.32-17.536-16.633-35.063-24.625-52.75a2746 2746 0 0 0-16.296-35.408A967 967 0 0 0 770 783c-6.148 6.608-12.093 13.252-17.754 20.285-2.334 2.822-4.766 5.52-7.246 8.215a223 223 0 0 0-9.5 11c-3.837 4.756-7.894 9.255-12.031 13.75-2.413 2.687-4.702 5.44-6.969 8.25-3.837 4.756-7.894 9.255-12.031 13.75-2.413 2.687-4.702 5.44-6.969 8.25-3.83 4.747-7.877 9.238-12.008 13.723-3.301 3.679-6.4 7.504-9.484 11.367L674 894l-1.5 2.126c-3.913 2.933-7.757 2.369-12.516 2.265l-2.942-.018a993 993 0 0 1-9.292-.123q-3.153-.03-6.305-.055c-5.149-.044-10.297-.113-15.445-.195 2.659-4.058 5.364-7.65 8.688-11.187 3.325-3.597 6.509-7.234 9.562-11.063 10.344-12.673 20.882-22.861 34.393-32.114 3.994-2.772 7.89-5.676 11.794-8.573l7.172-5.297c4.751-3.51 9.508-7.01 14.264-10.514q5.959-4.389 11.912-8.787c8.53-6.3 17.07-12.583 25.698-18.749 3.655-2.617 7.261-5.274 10.802-8.044l2.06-1.587a199 199 0 0 0 3.799-3.012c1.72-1.32 1.72-1.32 4.856-3.073"/></svg><div><div class="brandname">Maxxlab</div><div class="tag">Built for Healthcare</div></div></div>
  <div class="vsbadge"><b>MAXXLAB</b> &nbsp;×&nbsp; North PKWY Surgical Institute</div>
</div></div>

<div class="rail"><div class="rail-in" id="rail"></div></div>

<div class="stage">

<!-- 0 WELCOME -->
<section class="step show" id="s0">
  <div class="hero">
    <span class="kick">Website Transformation Proposal</span>
    <h1>Let's turn your website into<br>your best referral source.</h1>
    <p class="sub">A focused plan to consolidate North PKWY Surgical Institute into one fast, modern, patient-converting website — delivered in <b>12 days</b>.</p>
    <div class="who">
      <div><b>Prepared for</b>North PKWY Surgical Institute</div>
      <div><b>By</b>MAXXLAB · Rayyan Adeel</div>
      <div><b>Delivery target</b>12 days from kickoff</div>
    </div>
  </div>
  <div class="statrow" style="margin-top:16px">
    <div class="stat"><div class="bignum">12</div><div class="l">Days to launch</div></div>
    <div class="stat"><div class="bignum">1</div><div class="l">Unified brand &amp; site</div></div>
    <div class="stat"><div class="bignum">24/7</div><div class="l">Lead capture (vs phone-only today)</div></div>
  </div>
  <div class="callout dark">Use the steps above to walk through what we found, how we'll fix it, the timeline, and your investment options. It takes about 10 minutes.</div>
</section>

<!-- 1 AUDIT -->
<section class="step" id="s1">
  <div class="eyebrow">Step 1 · What we found</div>
  <h2>We ran a full audit of your site. Here are the numbers.</h2>
  <p class="lead">Run through MAXXLAB's own site-audit engine on 26 June 2026, then reviewed by hand. Tap any tile to see what it means for North PKWY.</p>

  <div class="card">
    <h3 style="margin-bottom:4px">Audit at a glance</h3>
    <div class="srcnote"><b>MAXXLAB Site Audit</b> · northpkwysurgicalinstitute.com · 9 pages crawled</div>
    <div class="mtiles" style="margin-top:12px">
      <div class="mtile bad active" onclick="tile(this)" data-info="<b>Site Health 52%</b> — well below where it needs to be. Missing meta descriptions and H1s, thin content and redirect issues are dragging it down. The upside: these are fast, clear-cut fixes in the rebuild.">
        <div class="v">52%</div><div class="k">Site Health</div></div>
      <div class="mtile bad" onclick="tile(this)" data-info="<b>AI Search Health 43%</b> — poor. AI crawlers are blocked, llms.txt is missing and your content isn't structured for AI. Right now ChatGPT &amp; Google AI can barely read you — a major missed opportunity we close.">
        <div class="v">43%</div><div class="k">AI Search Health</div></div>
      <div class="mtile good" onclick="tile(this)" data-info="<b>0 Errors</b> — no broken pages or 5xx/4xx server errors found on the hub. A clean base to build the new site on.">
        <div class="v">0</div><div class="k">Errors</div></div>
      <div class="mtile warn" onclick="tile(this)" data-info="<b>13 Warnings</b> — missing meta descriptions, missing H1s, over-long titles, low text-to-HTML ratio and more. Individually small; together they pull your score down and hold back visibility. Full list below.">
        <div class="v">13</div><div class="k">Warnings</div></div>
    </div>
    <div class="tiledetail" id="tileDetail"><b>Site Health 52%</b> — well below where it needs to be. Missing meta descriptions and H1s, thin content and redirect issues are dragging it down. The upside: these are fast, clear-cut fixes in the rebuild.</div>
  </div>

  <div class="grid g2">
    <div class="card">
      <h4>Crawled pages — 9 total</h4>
      <div class="crawlbar">
        <span style="width:22.2%;background:#1f9d55">Healthy 2</span>
        <span style="width:33.3%;background:#d98a00">Issues 3</span>
        <span style="width:22.2%;background:#5a5a62">Redirects 2</span>
        <span style="width:11.1%;background:var(--red)">Broken 1</span>
        <span style="width:11.1%;background:#141414">Blocked 1</span>
      </div>
      <p class="srcnote" style="margin-top:10px">Only <b>9 pages</b> exist on the hub — and 3 of them carry issues, 2 are redirects (incl. a duplicate <i>/orthopedics-1</i>), 1 is blocked. A thin, fragmented footprint.</p>
    </div>
    <div class="card">
      <h4>Technical scores</h4>
      <div class="scorerow"><span>HTTPS security</span><span>72%</span></div><div class="bar"><i style="width:72%"></i></div>
      <div class="scorerow"><span>Site performance</span><span>68%</span></div><div class="bar"><i style="width:68%"></i></div>
      <div class="scorerow"><span>Markup (no errors)</span><span>64%</span></div><div class="bar"><i style="width:64%"></i></div>
      <div class="scorerow"><span>Internal linking</span><span>80%</span></div><div class="bar"><i style="width:80%"></i></div>
      <div class="scorerow"><span>Crawlability</span><span>52%</span></div><div class="bar"><i style="width:52%"></i></div>
      <p class="srcnote" style="margin-top:10px">Core Web Vitals &amp; International SEO: <b>not implemented</b> — to be validated during build.</p>
    </div>
  </div>

  <div class="card" style="border-left:5px solid var(--gold)">
    <h4 style="color:#9a7b1e">⚠️ Your site is blocking AI search engines</h4>
    <p style="font-size:.93rem;margin-bottom:8px">Our audit found these AI &amp; search bots blocked from crawling pages — meaning ChatGPT, Google AI, Perplexity and Claude can't fully read or recommend you:</p>
    <div>
      <span class="chip"><span class="dot"></span>ChatGPT-User</span>
      <span class="chip"><span class="dot"></span>OAI-SearchBot</span>
      <span class="chip"><span class="dot"></span>Googlebot</span>
      <span class="chip"><span class="dot"></span>Google-Extended</span>
      <span class="chip"><span class="dot"></span>PerplexityBot</span>
      <span class="chip"><span class="dot"></span>Perplexity-User</span>
      <span class="chip"><span class="dot"></span>Claude-User</span>
      <span class="chip"><span class="dot"></span>Claude-SearchBot</span>
    </div>
    <p class="srcnote" style="margin-top:10px">Plus <b>llms.txt not found</b> — the file AI engines look for. This is exactly the gap MAXXLAB closes.</p>
  </div>

  <div class="card">
    <h4>The 13 warnings, in plain English</h4>
    <ul class="warnlist">
      <li>Pages missing a meta description <span class="ct">2 pages</span></li>
      <li>Titles too long (cut off in search) <span class="ct">2 pages</span></li>
      <li>Pages missing an H1 heading <span class="ct">2 pages</span></li>
      <li>Low text-to-HTML ratio (thin content) <span class="ct">3 pages</span></li>
      <li>Low word count <span class="ct">1 page</span></li>
      <li>Temporary (302) redirects instead of permanent <span class="ct">3 pages</span></li>
      <li>Links with non-descriptive anchor text <span class="ct aiflag">AI · 1</span></li>
      <li>llms.txt not found <span class="ct aiflag">AI · 1</span></li>
      <li>Page blocked from crawling <span class="ct">1 page</span></li>
    </ul>
  </div>

  <div class="callout dark"><b>Important context:</b> this tool only crawled your <i>hub</i> — one of your <b>five</b> websites. It can't even see the biggest problem: your services are split across four other domains. That's why the strategic review below matters more than the score.</div>

  <h3 style="margin-top:26px">The four that matter most</h3>
  <div class="issue"><div class="ic">1</div><div><h4>Your services live on four different websites</h4><p>Spine, bariatrics, pain and podiatry each sit on separate domains. That splits your Google authority, your tracking and your brand — patients (and search engines) get a fragmented story.</p></div><span class="sev crit">Critical</span></div>
  <div class="issue"><div class="ic">2</div><div><h4>No way to book or enquire online</h4><p>The only way to reach you is a phone call during office hours. Every after-hours visitor leaves with no way to act — and you never know they were there.</p></div><span class="sev crit">Critical</span></div>
  <div class="issue"><div class="ic">3</div><div><h4>Inconsistent contact details</h4><p>Two different phone numbers appear across the site and the contact email is on a different brand. This quietly hurts local search rankings and patient trust.</p></div><span class="sev high">High</span></div>
  <div class="issue"><div class="ic">4</div><div><h4>Blocked from AI &amp; weak for search</h4><p>AI engines are blocked, llms.txt is missing, and key pages lack descriptions and headings — so Google and assistants like ChatGPT can't properly read or recommend you.</p></div><span class="sev high">High</span></div>

  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">+</span>See all 11 findings from our full review<span class="chev">›</span></div>
    <div class="a" style="font-style:normal;padding-left:18px">
      <table class="findings">
        <tr><th>#</th><th>Finding</th><th>Severity</th><th>Area</th></tr>
        <tr><td>1</td><td><b>Domain &amp; brand fragmentation</b> — service lines on 4+ external domains (dfwspineinstitute, dallasweightloss, dallasmindbody, podiatristdfw); NPSI is a thin hub.</td><td><span class="sev crit">Critical</span></td><td>Strategy/SEO</td></tr>
        <tr><td>2</td><td><b>Inconsistent NAP</b> — 469-213-8310 vs (972) 884-4400, contact email on a different brand (info@dfwbi.com).</td><td><span class="sev crit">Critical</span></td><td>Local SEO/Trust</td></tr>
        <tr><td>3</td><td><b>No online conversion path</b> — phone-only; no form, scheduling, pre-qualification or chat. After-hours demand lost.</td><td><span class="sev crit">Critical</span></td><td>CRO</td></tr>
        <tr><td>4</td><td><b>Thin / missing metadata</b> — 2 pages no meta description, 2 missing H1, 2 titles too long (audit-confirmed).</td><td><span class="sev high">High</span></td><td>SEO/AEO</td></tr>
        <tr><td>5</td><td><b>Accessibility risk</b> — relies on an accessiBe overlay; not a substitute for native accessibility. Heightened ADA / Section 1557 exposure for healthcare.</td><td><span class="sev high">High</span></td><td>A11y/Legal</td></tr>
        <tr><td>6</td><td><b>Content trapped in images</b> — nav/service tiles are JPGs with empty alt; ~972KB JS/CSS per page. Invisible to crawlers &amp; LLMs.</td><td><span class="sev high">High</span></td><td>SEO/A11y</td></tr>
        <tr><td>7</td><td><b>Blocked from AI search</b> — ChatGPT, Google, Perplexity &amp; Claude bots blocked; llms.txt missing (audit-confirmed).</td><td><span class="sev high">High</span></td><td>GEO/AEO</td></tr>
        <tr><td>8</td><td><b>Duplicate / confused IA</b> — both /orthopedics and /orthopedics-1 (a 302 redirect) in the menu; diluted signals.</td><td><span class="sev med">Medium</span></td><td>IA/SEO</td></tr>
        <tr><td>9</td><td><b>Shallow structured data</b> — has basic LocalBusiness/Open Graph but no Physician, MedicalProcedure or FAQ schema for rich results.</td><td><span class="sev med">Medium</span></td><td>Schema</td></tr>
        <tr><td>10</td><td><b>Thin content</b> — 3 pages low text-to-HTML ratio, 1 low word count; little for patients or AI to read.</td><td><span class="sev med">Medium</span></td><td>Content</td></tr>
        <tr><td>11</td><td><b>Weak trust &amp; value messaging</b> — "world-class surgeons" unnamed; no reviews/outcomes; cash-pay differentiator buried.</td><td><span class="sev med">Medium</span></td><td>Trust/Brand</td></tr>
      </table>
    </div>
  </div>

  <div class="callout">The good news: every one of these is fixable — and most are quick. In 12 days we lift your health and AI scores and rebuild around what actually moves the needle: consolidation, conversion and AI-readiness.</div>
</section>

<!-- 2 OPPORTUNITY -->
<section class="step" id="s2">
  <div class="eyebrow">Step 2 · The opportunity</div>
  <h2>One site. Every service. Built to convert.</h2>
  <p class="lead">Here's what changes when we consolidate and modernize North PKWY into a single authoritative website.</p>
  <div class="grid g2">
    <div class="card"><h3>Today</h3><ul class="del" style="opacity:.85">
      <li style="--x:1">Four scattered domains</li><li>Phone-only enquiries</li><li>Lost after-hours patients</li><li>Weak Google &amp; AI visibility</li><li>Mixed branding &amp; contact info</li></ul>
      <p style="margin-top:10px;font-size:.85rem;color:var(--muted)">A website that informs, but doesn't grow the practice.</p>
    </div>
    <div class="card" style="border-color:var(--red)"><h3 style="color:var(--red)">After transformation</h3><ul class="del">
      <li>One unified, branded destination</li><li>Online appointment requests, 24/7</li><li>Every enquiry captured &amp; tracked</li><li>SEO + AI-search ready</li><li>Consistent, trustworthy brand</li></ul>
      <p style="margin-top:10px;font-size:.85rem;color:var(--muted)">A website that works as your hardest-working front-desk.</p>
    </div>
  </div>
</section>

<!-- 3 QUESTIONS -->
<section class="step" id="s3">
  <div class="eyebrow">Step 3 · A few questions for you</div>
  <h2>Six quick things we'd love your view on.</h2>
  <p class="lead">No long forms. Just the handful of answers that let us build exactly the right site. Tap each to discuss.</p>

  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">1</span>Do you want one unified brand, or to keep the separate service sites?<span class="chev">›</span></div><div class="a">This single decision shapes the whole project — consolidation gives the biggest growth, and we'll handle redirects so no rankings are lost.</div></div>
  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">2</span>Which service line do you most want to grow this year?<span class="chev">›</span></div><div class="a">We'll design the site to push your highest-value procedures front and centre.</div></div>
  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">3</span>What happens today when a patient enquires after hours?<span class="chev">›</span></div><div class="a">Tells us how much demand is currently slipping away — and what online booking should capture.</div></div>
  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">4</span>Who owns the four domains, hosting and Google profile?<span class="chev">›</span></div><div class="a">We need access to consolidate cleanly and protect your search rankings.</div></div>
  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">5</span>Do you have logos, photography and surgeon bios ready to use?<span class="chev">›</span></div><div class="a">Helps us hit the 12-day target — we can source or polish whatever's missing.</div></div>
  <div class="qa"><div class="q" onclick="this.parentElement.classList.toggle('open')"><span class="n">6</span>Should cash-pay &amp; financing be front-and-centre, or kept quiet?<span class="chev">›</span></div><div class="a">Your payment model is a differentiator — we'll position it to attract the right patients.</div></div>
</section>

<!-- 4 TIMELINE -->
<section class="step" id="s4">
  <div class="eyebrow">Step 4 · Your 12-day plan</div>
  <h2>From kickoff to launch in 12 days.</h2>
  <p class="lead">A focused sprint. We do the heavy lifting; you approve at three checkpoints. We're deliberately leaving advanced extras for later so we hit launch fast.</p>
  <div class="days">
    <div class="day"><div class="dn">Day 1–2</div><h4>Kickoff &amp; Strategy</h4><p>Access, brand, content gathered. Consolidation plan locked.</p></div>
    <div class="day"><div class="dn">Day 2–3</div><h4>Structure &amp; SEO map</h4><p>New sitemap + redirect plan so rankings carry over. → Approval 1</p></div>
    <div class="day"><div class="dn">Day 3–6</div><h4>Design</h4><p>Unified, modern, mobile-first design of all pages. → Approval 2</p></div>
    <div class="day"><div class="dn">Day 5–10</div><h4>Build</h4><p>Development, content, schema, lead forms &amp; analytics.</p></div>
    <div class="day"><div class="dn">Day 10–11</div><h4>Review &amp; QA</h4><p>Speed, mobile, accessibility, links &amp; tracking checked. → Approval 3</p></div>
    <div class="day"><div class="dn">Day 12</div><h4>Launch 🚀</h4><p>Go live, redirects switched, handover &amp; training.</p></div>
    <div class="day" style="border-top-color:var(--gold)"><div class="dn" style="color:var(--gold)">Then</div><h4>We maintain &amp; grow</h4><p>Your monthly retainer keeps it fast, fresh &amp; ranking.</p></div>
    <div class="day" style="border-top-color:var(--ink)"><div class="dn" style="color:var(--ink)">Optional</div><h4>AI layer (Phase 2)</h4><p>Add a 24/7 AI assistant when you're ready — see next step.</p></div>
  </div>
</section>

<!-- 5 DELIVERABLES -->
<section class="step" id="s5">
  <div class="eyebrow">Step 5 · What you get</div>
  <h2>Your website transformation includes</h2>
  <div class="grid g2">
    <ul class="del">
      <li>One unified, single-brand website</li>
      <li>Modern, mobile-first responsive design</li>
      <li>Speed &amp; Core Web Vitals optimization</li>
      <li>Consolidation of your service domains</li>
      <li>301 redirect map — keep your rankings</li>
      <li>Corrected, consistent contact details (NAP)</li>
    </ul>
    <ul class="del">
      <li>On-page SEO + page titles &amp; descriptions</li>
      <li>Medical &amp; FAQ structured data (schema)</li>
      <li>Online appointment-request form</li>
      <li>Click-to-call &amp; enquiry tracking</li>
      <li>Google Analytics 4 + conversion tracking</li>
      <li>Accessibility improvements &amp; launch training</li>
    </ul>
  </div>
  <div class="callout">Everything above is designed to do one job: turn the visitors you already get into booked patients — and to be found by the patients you don't.</div>
</section>

<!-- 6 AI UPSELL -->
<section class="step" id="s6">
  <div class="eyebrow">Step 6 · Optional · The AI layer</div>
  <h2>When you're ready to pull ahead of every competitor.</h2>
  <p class="lead">This is where MAXXLAB is different. Once your new site is live, we can add an AI layer that works around the clock. Optional — and easy to add to either plan.</p>
  <div class="ai">
    <span class="tagup">Optional add-on · Phase 2</span>
    <div class="grid g2" style="gap:6px">
      <ul>
        <li><b>24/7 AI patient assistant</b> — answers insurance, procedure &amp; prep questions instantly and books the visit</li>
        <li><b>AI lead qualification</b> — hands your team warm, pre-screened patients</li>
      </ul>
      <ul>
        <li><b>Voice AI receptionist</b> — no call goes unanswered, even after hours</li>
        <li><b>AI search visibility</b> — get recommended when patients ask ChatGPT &amp; Google AI</li>
      </ul>
    </div>
    <p style="margin:14px 0 0;color:#c9c9cd;font-size:.88rem">The <b style="color:#fff">AI Chat Agent is included in the Growth plan</b>. Voice AI and AI lead-qualification are available as further add-ons once your site is live.</p>
  </div>
</section>

<!-- 7 PRICING -->
<section class="step" id="s7">
  <div class="eyebrow">Step 7 · Your investment</div>
  <h2>Two simple plans. Pick what fits.</h2>
  <p class="lead">A one-time setup for the transformation, plus a low monthly retainer that keeps your site secure, fresh and growing. Tap a plan to select it.</p>
  <div class="plans">

    <div class="plan" id="planA" onclick="pick('A')">
      <div class="pname">Essential Transformation</div>
      <div class="setup">$1,999 <small>USD · one-time setup</small></div>
      <div class="ret">+ <b>$219 USD</b> / month retainer</div>
      <h4 class="sec">Setup includes</h4>
      <ul>
        <li>Full website transformation in 12 days</li>
        <li>Up to 8 core pages, one unified brand</li>
        <li>Domain consolidation + redirect map</li>
        <li>Mobile-first, speed-optimized build</li>
        <li>On-page SEO, metadata &amp; core schema</li>
        <li>Appointment form + call/lead tracking</li>
        <li>GA4 analytics + 1 round of revisions</li>
      </ul>
      <h4 class="sec">$219/mo retainer includes</h4>
      <ul>
        <li>Hosting, SSL, security &amp; backups</li>
        <li>Software updates &amp; maintenance</li>
        <li>Up to 2 hrs of content/edits monthly</li>
        <li>1 SEO blog post per month</li>
        <li>Monthly performance &amp; analytics report</li>
        <li>Uptime monitoring + email support</li>
      </ul>
      <p class="srcnote" style="margin-top:6px">🤖 AI Chat Agent available as an add-on.</p>
      <button class="pick">Select Essential</button>
    </div>

    <div class="plan feat" id="planB" onclick="pick('B')">
      <div class="badge">🤖 AI-Powered · Most popular</div>
      <div class="pname">Growth Transformation</div>
      <div class="setup">$2,559 <small>USD · one-time setup</small></div>
      <div class="ret">+ <b>$299 USD</b> / month retainer</div>

      <div class="aihi">
        <h4 class="sec">🤖 Includes the AI layer</h4>
        <ul>
          <li><b>AI Chat Agent</b> — 24/7 patient assistant trained on your services, insurance &amp; procedures</li>
          <li><b>AI-search (GEO/AEO)</b> optimization — get recommended by ChatGPT &amp; Google AI</li>
          <li>llms.txt + AI crawler access fixed</li>
        </ul>
      </div>

      <h4 class="sec">Everything in Essential, plus</h4>
      <ul>
        <li>Up to 14 pages + blog/resources section</li>
        <li>Professional copywriting for service pages</li>
        <li>Reviews &amp; testimonials + trust elements</li>
        <li>Online booking/scheduling integration</li>
        <li>2 rounds of revisions · priority delivery</li>
      </ul>
      <h4 class="sec">$299/mo retainer includes</h4>
      <ul>
        <li>Everything in the $219 retainer, plus:</li>
        <li><b>AI Chat Agent</b> monitoring, training &amp; updates</li>
        <li>Up to 4 hrs of content/edits monthly</li>
        <li>2 SEO blog posts per month</li>
        <li>Ongoing SEO &amp; keyword monitoring</li>
        <li>Quarterly UX/conversion recommendations + priority support</li>
      </ul>
      <button class="pick">Select Growth</button>
    </div>

  </div>
  <p class="miniflag">All prices in USD. Both plans deliver in 12 days. <b>Growth</b> includes the AI Chat Agent; advanced AI modules (Voice AI, lead qualification — Step 6) are available as further add-ons.</p>
</section>

<!-- 8 CLOSE -->
<section class="step" id="s8">
  <div class="eyebrow">Step 8 · Let's begin</div>
  <h2>Ready to start your 12-day countdown?</h2>
  <p class="lead">Here's your selection. To kick off, we secure the setup fee and book your kickoff call — the 12 days start from there.</p>
  <div class="summary" id="summary">
    <div class="row"><span>Selected plan</span><b id="sumName">— please pick a plan in Step 7 —</b></div>
    <div class="row"><span>One-time setup</span><b id="sumSetup">—</b></div>
    <div class="row"><span>Monthly retainer</span><b id="sumRet">—</b></div>
    <div class="row"><span>Delivery</span><b>12 days from kickoff</b></div>
    <div class="row" style="border:0;padding-top:16px"><span class="tot">Due to start</span><b class="tot" id="sumDue">—</b></div>
  </div>
  <div class="grid g3" style="margin-top:18px">
    <div class="card" style="text-align:center"><div class="bignum">1</div><h4 style="text-transform:none">Approve a plan</h4><p style="font-size:.85rem;color:var(--muted);margin:0">Confirm Essential or Growth.</p></div>
    <div class="card" style="text-align:center"><div class="bignum">2</div><h4 style="text-transform:none">Secure setup &amp; kickoff</h4><p style="font-size:.85rem;color:var(--muted);margin:0">Setup fee + book the call.</p></div>
    <div class="card" style="text-align:center"><div class="bignum">3</div><h4 style="text-transform:none">12-day build begins</h4><p style="font-size:.85rem;color:var(--muted);margin:0">We launch your new site.</p></div>
  </div>
  <div class="callout" style="text-align:center;margin-top:18px"><b>MAXXLAB</b> — Built for Healthcare. &nbsp;·&nbsp; Let's give North PKWY the website its surgeons deserve.</div>
</section>

</div>

<div class="navbtns">
  <button class="btn ghost" id="back" onclick="move(-1)">‹ Back</button>
  <button class="btn" id="nextb" onclick="move(1)">Next ›</button>
  <span class="stepind" id="ind"></span>
</div>

<div class="footer"><b>MAXXLAB</b> × North PKWY Surgical Institute &nbsp;·&nbsp; Website Transformation Proposal &nbsp;·&nbsp; © 2026 MAXXLAB</div>
`;

const SCRIPT_SRC = `
(function(){
const STEPS=[['s0','Welcome'],['s1','Findings'],['s2','Opportunity'],['s3','Questions'],['s4','12-Day Plan'],['s5','What You Get'],['s6','AI Layer'],['s7','Pricing'],['s8','Get Started']];
let cur=0, plan=null;
const PLANS={A:{name:'Essential Transformation',setup:'$1,999 USD one-time',ret:'$219 USD / month',due:'$1,999 setup + $219/mo (USD)'},
            B:{name:'Growth Transformation (AI)',setup:'$2,559 USD one-time',ret:'$299 USD / month',due:'$2,559 setup + $299/mo (USD)'}};
const rail=document.getElementById('rail');
rail.innerHTML='';
STEPS.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML='<span class="d">'+(i+1)+'</span>'+s[1];b.onclick=()=>goto(i);rail.appendChild(b);});
function render(){
  document.querySelectorAll('.step').forEach((s,i)=>s.classList.toggle('show',i===cur));
  document.querySelectorAll('#rail button').forEach((b,i)=>{b.classList.toggle('active',i===cur);b.classList.toggle('done',i<cur);});
  document.getElementById('back').disabled=cur===0;
  const nb=document.getElementById('nextb');
  nb.textContent=cur===STEPS.length-1?'Finish':'Next ›';
  document.getElementById('ind').textContent='Step '+(cur+1)+' of '+STEPS.length;
  window.scrollTo({top:0,behavior:'smooth'});
}
function move(d){cur=Math.max(0,Math.min(STEPS.length-1,cur+d));render();}
function goto(i){cur=i;render();}
function tile(el){document.querySelectorAll('.mtile').forEach(t=>t.classList.remove('active'));el.classList.add('active');document.getElementById('tileDetail').innerHTML=el.dataset.info;}
function pick(p){
  plan=p;
  document.getElementById('planA').classList.toggle('sel',p==='A');
  document.getElementById('planB').classList.toggle('sel',p==='B');
  const P=PLANS[p];
  document.getElementById('sumName').textContent=P.name;
  document.getElementById('sumSetup').textContent=P.setup;
  document.getElementById('sumRet').textContent=P.ret;
  document.getElementById('sumDue').textContent=P.due;
}
window.move=move;
window.goto=goto;
window.tile=tile;
window.pick=pick;
render();
})();
`;

export default function NpsiFirstMeetingClient() {
  // The rest of the app's root layout puts utility classes on <body> (Tailwind
  // background/text/font). This page brings its own complete stylesheet, so
  // those classes are removed for as long as this page is mounted and
  // restored on the way out.
  useLayoutEffect(() => {
    const body = document.body;
    const original = body.className;
    body.className = '';
    return () => {
      body.className = original;
    };
  }, []);

  useEffect(() => {
    const w = window as typeof window & { __npsiFirstMeetingLoaded?: boolean };
    if (w.__npsiFirstMeetingLoaded) return;
    w.__npsiFirstMeetingLoaded = true;
    const script = document.createElement('script');
    script.textContent = SCRIPT_SRC;
    document.body.appendChild(script);
    return () => {
      script.remove();
      w.__npsiFirstMeetingLoaded = false;
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
