// ── Research brief that sits behind the Noorani contract builder ─────────────
// Every figure keeps its source so the proposal can be defended line by line.

export const RESEARCH_STATS = [
  { n: '$700M', label: 'Pakistan medical devices market in 2025, growing about 12 to 15% a year', src: 'https://www.trade.gov/country-commercial-guides/pakistan-healthcare-and-medical-equipment' },
  { n: '~98%', label: 'Share of devices imported (medical community estimate). A local manufacturer has an edge', src: 'https://tribune.com.pk/story/2516471/produce-local-medical-devices' },
  { n: '117M', label: 'Internet users in Pakistan (45.6% of the population)', src: 'https://datareportal.com/reports/digital-2026-pakistan' },
  { n: '88%', label: 'Retail payments made digitally in FY25, up from 78% in FY23', src: 'https://profit.pakistantoday.com.pk/2025/11/03/sbp-releases-annual-payment-systems-review-for-fy25/' },
  { n: '21.7%', label: 'Pakistan WhatsApp accounts that are Business accounts', src: 'https://www.techjuice.pk/pakistan-dominates-whatsapp-business-account-usage-among-top-10-nations/' },
  { n: '31.4%', label: 'Adult diabetes rate, the highest in the world', src: 'https://www.thenews.com.pk/print/1299445-pakistan-ranks-first-globally-in-diabetes-prevalence' },
  { n: '1,696', label: 'Hospitals in Pakistan with 167,947 beds, plus thousands of dispensaries and BHUs', src: 'https://tribune.com.pk/story/2550010/pakistans-health-spending-below-1-of-gdp-reveals-economic-survey-202425' },
  { n: '67%', label: 'B2B buyers who prefer buying without a sales rep (global, Gartner 2026)', src: 'https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience' },
];

export const RESEARCH_FINDINGS = [
  { finding: 'Homepage asks buyers to call before ordering because prices keep changing', sev: 'High', why: 'Every sale needs a phone call' },
  { finding: 'Phone is the only visible contact method on the homepage', sev: 'High', why: 'Buyers expect WhatsApp and quote forms' },
  { finding: 'Government and armed-forces approvals are only on the About page', sev: 'High', why: 'The strongest proof is hidden' },
  { finding: '"75 years" on the homepage, "65+" on About; founded 1949 (77 years)', sev: 'Medium', why: 'Inconsistent heritage message' },
  { finding: 'About page cites ISO 9001:2008, which was replaced by the 2015 version', sev: 'Medium', why: 'Tender buyers check certificates' },
  { finding: 'Two separate Facebook pages', sev: 'Medium', why: 'Followers and reviews are split' },
  { finding: 'Several pages timed out for our research tools', sev: 'To test', why: 'Confirm with a speed test at kickoff' },
];

export const RESEARCH_COMPETITORS = [
  { name: 'Thankful Surgical (Lahore, 1969)', does: 'Hospital client logos, Get a Quote, after-sales service, custom manufacturing', url: 'https://thankfulsurgical.com/' },
  { name: 'Surgicals.pk', does: 'Prices, 6-month warranty per product, reviews, 24-hour dispatch', url: 'https://surgicals.pk/' },
  { name: 'Meg Medius (Karachi)', does: 'Tiered bulk pricing, dealer programme, 30-day returns', url: 'https://megmedius.com/products/hospital-line/' },
  { name: 'MedicalOnline.pk (Rawalpindi)', does: 'Prices plus Call for Price where needed, WhatsApp, order tracking, YouTube', url: 'https://medicalonline.pk/' },
  { name: 'Swantia (Sialkot)', does: 'GST-exclusive pricing, specialty catalogue, active blog, export site', url: 'https://swantia.pk/' },
  { name: 'HealthServices.pk', does: 'Rent or buy beds and oxygen, with setup and pickup, plus home nursing', url: 'http://healthservices.pk/' },
  { name: 'Daraz', does: 'COD, cards, JazzCash and instalments in the hospital bed category', url: 'https://www.daraz.pk/wheel-chairs-hospital-beds/' },
];

export const RESEARCH_STREAMS = [
  { stream: 'Institutional quotes and tenders', feature: 'Institutional quote portal · Tender watch alerts' },
  { stream: 'Clinic accounts and bulk pricing', feature: 'Institutional quote portal and clinic accounts' },
  { stream: 'Home-care equipment rental', feature: 'Equipment rental module' },
  { stream: 'Service and maintenance contracts', feature: 'Service and maintenance contracts (AMC)' },
  { stream: 'Dealer network', feature: 'Dealer and reseller portal' },
  { stream: 'Custom hospital furniture', feature: 'Custom furniture enquiry form or configurator' },
  { stream: 'Marketplace channel', feature: 'Daraz storefront and stock sync' },
];
