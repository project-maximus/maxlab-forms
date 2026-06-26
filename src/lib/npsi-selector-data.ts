// ── NPSI Website Direction Selector — content & decision logic ────────────────
// Pure data + pure functions. No JSX here — consumed by the live selector UI,
// the view/[id] summary page, and the admin email builder.

export interface CompassQuestion {
  id: 'reason' | 'audience' | 'feeling' | 'differentiator';
  question: string;
  hint?: string;
  options: string[];
}

export const COMPASS_QUESTIONS: CompassQuestion[] = [
  {
    id: 'reason',
    question: "What's the #1 reason a patient chooses NPSI over a hospital or competitor?",
    options: ['Safety & Accreditation', 'Physician Expertise', 'Comfort & Privacy', 'Convenience', 'Cost'],
  },
  {
    id: 'audience',
    question: 'Which audience are you most trying to impress on the website?',
    options: ['Anxious patients', 'Active / younger patients', 'Affluent patients', 'Referring physicians', 'All equally'],
  },
  {
    id: 'feeling',
    question: 'Which word should describe how a patient feels after seeing your homepage?',
    options: ['Reassured', 'Impressed', 'Comfortable', 'Inspired', 'Confident'],
  },
  {
    id: 'differentiator',
    question: "What is NPSI's strongest differentiator that competitors can't easily claim?",
    hint: 'This becomes the headline of your trust strategy, not a footnote.',
    options: ['AAAHC Accreditation', 'Physician Excellence', 'Patient Privacy & Comfort', 'Minimally Invasive Specialization', 'Convenience & Location'],
  },
];

export const ANXIETY_LEVELS = ['Low', 'Medium', 'High', 'Very High'] as const;

export const SPECIALTY_LINES = ['Spine', 'Pain Management', 'Orthopedics', 'Bariatrics', 'Mind & Body', 'Podiatry'];

export const PHYSICIAN_INVOLVEMENT = ['Yes', 'No', 'Not sure yet'];
export const PHYSICIAN_INVOLVEMENT_NOTE =
  "We'll suggest including a physician representative in this session — their preferences on credential display and photography meaningfully affect revision cycles.";

// ── Compass answers shape ──────────────────────────────────────────────────────

export interface CompassAnswers {
  reason?: string;
  audience?: string;
  feeling?: string;
  differentiator?: string;
  anxiety_level?: string;
  specialty_priority?: string;
}

// ── Visual directions ──────────────────────────────────────────────────────────

export interface Palette {
  bg: string;
  ink: string;
  accent: string;
  secondary: string;
  buttonText: string;
}

export interface Typography {
  headingClass: string;
  labelClass: string;
  sample: string;
}

export interface RevisionRisk {
  level: 'Low' | 'Medium' | 'Higher';
  reason: string;
}

export interface ReferenceBrand {
  name: string;
  url?: string;
}

export interface DirectionMatches {
  reason?: string[];
  audience?: string[];
  feeling?: string[];
  differentiator?: string[];
  specialty?: string[];
  anxietyBoost?: Record<string, number>;
}

export interface Direction {
  id: string;
  name: string;
  tagline: string;
  description: string;
  personality: string;
  characteristics: string[];
  palette: Palette;
  typography: Typography;
  photographyNote: string;
  referenceBrands: ReferenceBrand[];
  revisionRisk: RevisionRisk;
  bestMatch: string[];
  businessBenefit: string;
  drawback: string;
  journeyFrames: string[];
  matches: DirectionMatches;
}

export const JOURNEY_STAGES = ['Landing', 'Building Trust', 'Exploring Services', 'Meeting the Team', 'Ready to Act'];

export const DIRECTIONS: Direction[] = [
  {
    id: 'precision-authority',
    name: 'Precision & Authority',
    tagline: 'Refined, minimal, world-class — clinical excellence with total confidence.',
    description:
      'Near-white space, restrained typography, nothing decorative. The site looks like it belongs alongside Cleveland Clinic and Houston Methodist.',
    personality: 'Exacting. Confident. Quietly elite.',
    characteristics: [
      'Near-white backgrounds, charcoal and steel type',
      'One accent color carrying the entire palette',
      'Large editorial-weight headlines on a strict grid',
      'Facility-first photography — corridors, equipment, precise OR shots',
    ],
    palette: { bg: '#F7F9FA', ink: '#16222E', accent: '#0E5C56', secondary: '#3A4F63', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-serif text-2xl font-normal tracking-tight',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.18em] font-medium',
      sample: 'Precision, by design.',
    },
    photographyNote: 'Facility-first — clean corridors, equipment, precise OR detail.',
    referenceBrands: [
      { name: 'Cleveland Clinic', url: 'https://clevelandclinic.org' },
      { name: 'Houston Methodist', url: 'https://houstonmethodist.org' },
      { name: 'Stripe', url: 'https://stripe.com' },
    ],
    revisionRisk: {
      level: 'Medium',
      reason: 'Requires genuinely excellent facility photography to land — underwhelming photography reads as cold rather than elite.',
    },
    bestMatch: ['Referral partners', 'High-value clients', 'Enterprise buyers'],
    businessBenefit: 'Positions NPSI at the premium end of the Dallas ASC market and builds high-trust credibility fast.',
    drawback: 'Can feel cold or intimidating to anxious patients without strong photography to soften it.',
    journeyFrames: [
      'A clean, confident homepage with no clutter.',
      'Credentials and proof stated plainly, not sold.',
      'A precise breakdown of what you offer, minimal jargon.',
      'A team bio led with credentials, not personality.',
      'A clear, single next step — no friction.',
    ],
    matches: {
      reason: ['Physician Expertise', 'Safety & Accreditation'],
      audience: ['Referring physicians', 'Active / younger patients'],
      feeling: ['Confident', 'Impressed'],
      differentiator: ['Physician Excellence', 'AAAHC Accreditation'],
      specialty: ['Spine', 'Orthopedics'],
      anxietyBoost: { Low: 2, Medium: 0, High: -2, 'Very High': -3 },
    },
  },
  {
    id: 'warm-trusted',
    name: 'Warm & Trusted',
    tagline: 'Approachable, human, and safe — clients feel welcomed, not processed.',
    description:
      'Warm neutrals and natural photography. Your people are prominent. Everything looks inviting, not intimidating, and language stays warm and direct.',
    personality: 'Caring. Personalized. Safe.',
    characteristics: [
      'Warm off-whites and soft creams, warm-gray ink',
      'Rounded elements and soft shadows',
      'Staff portraits and patient-facing moments, not just the building',
      'Slightly larger body type for older-patient readability',
    ],
    palette: { bg: '#FBF6EF', ink: '#3D362C', accent: '#7C9473', secondary: '#C99A55', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-sans text-2xl font-medium tracking-normal',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.1em] font-medium',
      sample: 'You’re in good hands here.',
    },
    photographyNote: 'Staff and patient-facing moments — consultation, recovery, walking out the door.',
    referenceBrands: [{ name: 'Banner Health', url: 'https://bannerhealth.com' }, { name: 'Airbnb', url: 'https://airbnb.com' }],
    revisionRisk: {
      level: 'Low',
      reason: 'A forgiving direction — warmth reads through even with modest photography and copy.',
    },
    bestMatch: ['First-time buyers', 'Cautious decision-makers', 'Family-run businesses'],
    businessBenefit: 'Highest emotional conversion for direct patient audiences; reduces pre-procedure anxiety.',
    drawback: 'Risks feeling generic if photography is not strong, and projects "world-class" less forcefully.',
    journeyFrames: [
      'A warm welcome that immediately feels human.',
      'Real faces and reassuring language, not just logos.',
      'Plain-language explanations of what to expect.',
      'A team member introduced like a person, not a resume.',
      'An easy, low-pressure way to take the next step.',
    ],
    matches: {
      reason: ['Comfort & Privacy', 'Convenience'],
      audience: ['Anxious patients'],
      feeling: ['Reassured', 'Comfortable'],
      differentiator: ['Patient Privacy & Comfort'],
      specialty: ['Bariatrics', 'Mind & Body', 'Pain Management'],
      anxietyBoost: { Low: -1, Medium: 1, High: 3, 'Very High': 4 },
    },
  },
  {
    id: 'premium-boutique',
    name: 'Premium Boutique',
    tagline: 'Where expertise meets luxury hospitality — discreet, intimate, special.',
    description:
      'Matte charcoals and warm neutrals with champagne accents. Serif headlines, generous white space, hotel-quality photography. Navigation feels like a boutique brand.',
    personality: 'Exclusive. Refined. Discreet.',
    characteristics: [
      'Matte charcoal/black paired with warm neutrals and gold accents',
      'Editorial-weight serif headlines',
      'Hotel-quality photography — lounge-like waiting areas, premium amenities',
      'Thin borders and subtle, restrained animation',
    ],
    palette: { bg: '#181512', ink: '#F1E9DA', accent: '#C6A052', secondary: '#3A322A', buttonText: '#181512' },
    typography: {
      headingClass: 'font-serif text-2xl italic font-normal tracking-wide',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.22em] font-medium',
      sample: 'An experience, not a transaction.',
    },
    photographyNote: 'Hotel-quality — lounge-like waiting areas, premium amenities, staff in crisp uniforms.',
    referenceBrands: [{ name: 'Aman Resorts', url: 'https://aman.com' }, { name: 'Net-a-Porter', url: 'https://net-a-porter.com' }],
    revisionRisk: {
      level: 'Higher',
      reason: 'Photography and copy must hit a luxury bar consistently — the budget and lead time for a real shoot is the most common cause of late revisions.',
    },
    bestMatch: ['Affluent clients', 'High-end service lines', 'Discretion-seeking clients'],
    businessBenefit: 'Enables premium positioning and differentiates strongly from hospital systems.',
    drawback: 'May underplay insurance/accreditation trust, and can feel out of reach to price-sensitive patients.',
    journeyFrames: [
      'A hushed, editorial first impression.',
      'Discretion and comfort signaled before anything transactional.',
      'Services framed as a considered, personal decision.',
      'A specialist presented as a trusted advisor, by appointment.',
      'A private, low-friction way to inquire.',
    ],
    matches: {
      reason: ['Comfort & Privacy'],
      audience: ['Affluent patients'],
      feeling: ['Impressed'],
      differentiator: ['Patient Privacy & Comfort', 'Convenience & Location'],
      specialty: ['Bariatrics', 'Mind & Body'],
      anxietyBoost: { Low: 0, Medium: 1, High: 0, 'Very High': -1 },
    },
  },
  {
    id: 'modern-active',
    name: 'Modern & Active',
    tagline: 'Clean, energetic, forward-looking — built for people getting back to their lives.',
    description:
      'Bright whites, strong greens and blues, high-contrast photography. Bold display type and action-oriented imagery of people returning to sport, work, and life.',
    personality: 'Optimistic. Active. Outcome-focused.',
    characteristics: [
      'Bright whites with strong green/blue accents',
      'Bold display headlines, mobile-first composition',
      'Action-oriented photography — outcomes, not procedures',
      'Strong, clear CTA hierarchy throughout',
    ],
    palette: { bg: '#FFFFFF', ink: '#0E1B26', accent: '#16A864', secondary: '#1768D8', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-sans text-2xl font-bold uppercase tracking-wide',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.14em] font-semibold',
      sample: 'Get back to your life.',
    },
    photographyNote: 'Action-oriented — people walking, returning to sport, working. Outcomes, not procedures.',
    referenceBrands: [{ name: 'DISC Surgery Center', url: 'https://discsurgery.com' }, { name: 'Nike', url: 'https://nike.com' }],
    revisionRisk: {
      level: 'Medium',
      reason: 'Outcome-focused photography and copy can overpromise if not carefully worded — clinical review usually adds a revision pass.',
    },
    bestMatch: ['Younger, active customers', 'Lifestyle-motivated buyers', 'Research-heavy shoppers'],
    businessBenefit: 'Strong digital performance with a younger demographic and high click-through on procedure pages.',
    drawback: 'Less gravitas for older or highly anxious patients; can feel overpromising if outcomes copy is loose.',
    journeyFrames: [
      'An energetic homepage built around outcomes.',
      'Trust signaled through results, not just credentials.',
      'A service framed around the outcome it delivers.',
      'A specialist shown as part of a high-performing team.',
      'A direct, energetic call to act now.',
    ],
    matches: {
      reason: ['Convenience', 'Physician Expertise'],
      audience: ['Active / younger patients'],
      feeling: ['Inspired'],
      differentiator: ['Minimally Invasive Specialization'],
      specialty: ['Spine', 'Orthopedics', 'Bariatrics'],
      anxietyBoost: { Low: 2, Medium: 1, High: -1, 'Very High': -2 },
    },
  },
  {
    id: 'heritage-excellence',
    name: 'Heritage & Excellence',
    tagline: 'Established, authoritative, credentialed — the weight of accumulated expertise.',
    description:
      'Deep navy or forest green with white and gold. Credential badges and accreditation are primary design elements, shown near the top fold, not buried in a footer.',
    personality: 'Established. Credentialed. Deeply trustworthy.',
    characteristics: [
      'Deep navy/forest green with white and gold accents',
      'Serif-weighted headlines, structured grid layouts',
      'Credential badges and accreditation shown prominently, not in the footer',
      'Formal but warm photography — team, OR views, facility exterior',
    ],
    palette: { bg: '#FFFFFF', ink: '#1B2A20', accent: '#9C7A33', secondary: '#1F3D2E', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-serif text-2xl font-normal tracking-normal',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.16em] font-semibold',
      sample: 'Three decades of trusted excellence.',
    },
    photographyNote: 'Formal but warm — team photography, OR views, facility exterior.',
    referenceBrands: [{ name: 'Mayo Clinic', url: 'https://mayoclinic.org' }, { name: 'Harvard University', url: 'https://harvard.edu' }],
    revisionRisk: {
      level: 'Low',
      reason: 'Credential-led content is straightforward to gather and rarely controversial once accreditation assets are in hand.',
    },
    bestMatch: ['Established, risk-averse clients', 'Complex, high-stakes engagements', 'Compliance-focused buyers'],
    businessBenefit: 'Maximum trust signal for medically cautious audiences and strong for physician recruitment.',
    drawback: 'Can read as dated if execution is imprecise, or feel rigid and over-formal.',
    journeyFrames: [
      'An institutional homepage that signals longevity.',
      'Accreditation and certifications stated near the top, not the footer.',
      'A thorough, formal explanation of what you offer.',
      'A specialist introduced with full credentials and tenure.',
      'A confident, unambiguous call to act.',
    ],
    matches: {
      reason: ['Safety & Accreditation'],
      audience: ['Referring physicians', 'All equally'],
      feeling: ['Confident', 'Reassured'],
      differentiator: ['AAAHC Accreditation'],
      specialty: ['Spine', 'Orthopedics', 'Bariatrics', 'Pain Management'],
      anxietyBoost: { Low: 0, Medium: 1, High: 1, 'Very High': 1 },
    },
  },
  {
    id: 'glass-motion',
    name: 'Glass & Motion',
    tagline: 'Frosted layers, soft gradients — modern and quietly advanced.',
    description:
      'Translucent glass panels float over soft color gradients. Rounded, blurred, and gently animated — the visual language of a modern tech product, not a static brochure.',
    personality: 'Modern. Layered. Quietly advanced.',
    characteristics: [
      'Frosted, semi-transparent panels over gradient backgrounds',
      'Soft blues and teals with gentle blur and glow',
      'Rounded-2xl everything, no hard edges',
      'Motion-forward — subtle hover lift and fade transitions',
    ],
    palette: { bg: '#EAF3FB', ink: '#15263A', accent: '#3B82C4', secondary: '#7FD9C4', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-sans text-2xl font-semibold tracking-tight',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.16em] font-semibold',
      sample: 'Clarity, made visible.',
    },
    photographyNote: 'Abstract and ambient — soft gradient backdrops behind clean UI; minimal literal photography needed.',
    referenceBrands: [{ name: 'Linear', url: 'https://linear.app' }, { name: 'Framer', url: 'https://framer.com' }],
    revisionRisk: {
      level: 'Medium',
      reason: 'Glass effects need careful contrast tuning — done poorly, blur hurts legibility for older patients.',
    },
    bestMatch: ['Digitally fluent customers', 'Tech-forward partners', 'Online-first researchers'],
    businessBenefit: 'Signals technological sophistication and feels distinct from typical medical-brochure sites.',
    drawback: 'Can read as more "startup" than "surgical institute" if not balanced with strong trust content.',
    journeyFrames: [
      'A soft, layered homepage that feels current, not static.',
      'Trust shown as a clean glass card, not a stamped logo.',
      'Services explained in light, breathable panels.',
      'A team card that floats above a gentle gradient.',
      'A frictionless, modern call to act.',
    ],
    matches: {
      reason: ['Convenience'],
      audience: ['Active / younger patients'],
      feeling: ['Impressed', 'Inspired'],
      differentiator: ['Minimally Invasive Specialization'],
      specialty: ['Bariatrics', 'Mind & Body'],
      anxietyBoost: { Low: 1, Medium: 1, High: -1, 'Very High': -2 },
    },
  },
  {
    id: 'clean-functional',
    name: 'Clean & Functional',
    tagline: 'Black, white, and exactly what you need — nothing else.',
    description:
      'No photography, no gradients, almost no color. Information is organized like a well-built tool: clear hierarchy, thin rules, generous whitespace. It trusts the content to do the work — the Notion / Linear register.',
    personality: 'Plain-spoken. Efficient. Unpretentious.',
    characteristics: [
      'Pure white background, near-black text, one neutral accent',
      'Thin 1px rules instead of cards or shadows',
      'Monospace labels and numbered sections, like a product doc',
      'Zero decorative imagery — content carries the page',
    ],
    palette: { bg: '#FFFFFF', ink: '#111111', accent: '#111111', secondary: '#9CA3AF', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-sans text-2xl font-semibold tracking-tight',
      labelClass: 'font-mono text-[10px] uppercase tracking-[0.14em] font-medium',
      sample: 'Everything, explained plainly.',
    },
    photographyNote: 'Minimal to none — a single small facility photo if absolutely needed, never decorative.',
    referenceBrands: [{ name: 'Notion', url: 'https://notion.so' }, { name: 'Basecamp', url: 'https://basecamp.com' }],
    revisionRisk: {
      level: 'Higher',
      reason: 'The least forgiving direction for a healthcare brand — without exceptional copy it can read as cold or under-built rather than confident.',
    },
    bestMatch: ['Efficiency-minded buyers', 'Customers who research before they read marketing', 'Procurement / operations teams'],
    businessBenefit: 'Loads fast, ages well, and never looks dated — content can change constantly without breaking the design.',
    drawback: 'Provides the least emotional reassurance of any direction — a real risk for an anxious patient audience.',
    journeyFrames: [
      'A stark, text-first homepage — no imagery competing for attention.',
      'Credentials listed as a fact, not a feature.',
      'A service explained like clear documentation.',
      'A team bio as a short, factual record.',
      'One plain, obvious way to get in touch.',
    ],
    matches: {
      reason: ['Convenience', 'Cost'],
      audience: ['Referring physicians'],
      feeling: ['Confident'],
      differentiator: ['Convenience & Location'],
      specialty: ['Podiatry', 'Pain Management'],
      anxietyBoost: { Low: 2, Medium: 0, High: -3, 'Very High': -4 },
    },
  },
  {
    id: 'editorial-archive',
    name: 'Editorial Archive',
    tagline: 'Broadsheet structure, ink and paper — a story told with authority.',
    description:
      'Numbered sections, ruled lines, and serif headlines borrowed from print journalism. It reads like a respected publication profiling the business, not a sales page.',
    personality: 'Literary. Deliberate. Substantial.',
    characteristics: [
      'Cream paper-like background, dense ink-black serif text',
      'Horizontal rule lines dividing every section',
      'Numbered, byline-style section headers',
      'Pull-quotes set in large italic serif',
    ],
    palette: { bg: '#F7F3EA', ink: '#231F1A', accent: '#8A1F1F', secondary: '#5C5648', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-serif text-3xl font-normal tracking-tight',
      labelClass: 'font-mono text-[10px] uppercase tracking-[0.2em] font-semibold',
      sample: 'A record of careful work.',
    },
    photographyNote: 'Documentary, black-and-white leaning — facility and staff shot like editorial photography, not stock.',
    referenceBrands: [{ name: 'The New York Times', url: 'https://nytimes.com' }, { name: 'The Atlantic', url: 'https://theatlantic.com' }],
    revisionRisk: {
      level: 'Medium',
      reason: 'Demands real, well-edited long-form copy — thin content breaks the illusion fast.',
    },
    bestMatch: ['Buyers who research deeply before deciding', 'Academic or institutional partners', 'Clients with complex, multi-step engagements'],
    businessBenefit: 'Builds unusually deep trust through depth of explanation rather than visual polish alone.',
    drawback: 'Slower to scan — a poor fit for mobile-first, in-a-hurry visitors.',
    journeyFrames: [
      'A homepage that reads like a feature story, not a flyer.',
      "Credentials woven into the business's history, not a badge.",
      'A service explained at the depth of a real article.',
      'A team member profiled, not just listed.',
      'A deliberate, considered final call to act.',
    ],
    matches: {
      reason: ['Safety & Accreditation', 'Physician Expertise'],
      audience: ['All equally'],
      feeling: ['Confident'],
      differentiator: ['AAAHC Accreditation', 'Physician Excellence'],
      specialty: ['Orthopedics', 'Spine'],
      anxietyBoost: { Low: 1, Medium: 1, High: 0, 'Very High': -1 },
    },
  },
  {
    id: 'after-hours',
    name: 'After Hours',
    tagline: 'Deep, focused, precise — technology you can trust at any hour.',
    description:
      'A confident dark interface with a single cool accent. Closer to the control room of an advanced operation than a nightclub — built to make data, credentials, and outcomes glow with quiet precision.',
    personality: 'Focused. Exact. Quietly futuristic.',
    characteristics: [
      'Deep charcoal background, near-white text',
      'One cool accent (ice blue / cyan) used sparingly but precisely',
      'Sharp geometric sans-serif, generous letter-spacing on labels',
      'Subtle glow on key numbers and credentials, like instrumentation',
    ],
    palette: { bg: '#0B1220', ink: '#E7ECF3', accent: '#2DD4E0', secondary: '#3A5068', buttonText: '#0B1220' },
    typography: {
      headingClass: 'font-sans text-2xl font-semibold tracking-tight',
      labelClass: 'font-mono text-[10px] uppercase tracking-[0.18em] font-semibold',
      sample: 'Precision after hours.',
    },
    photographyNote: 'Low-key, high-contrast facility and equipment photography — technical, not warm.',
    referenceBrands: [{ name: 'Vercel', url: 'https://vercel.com' }],
    revisionRisk: {
      level: 'Higher',
      reason: 'The least proven register for an ASC audience — strong candidate for revision if anxious-patient feedback comes back cold during testing.',
    },
    bestMatch: ['Younger, digitally fluent customers', 'Technical buyers evaluating the product', 'Customers motivated by precision / outcomes data'],
    businessBenefit: 'Differentiates sharply from every competitor in a category that defaults to white and blue.',
    drawback: 'Carries real risk of feeling cold for anxious or older patients — dark/moody registers are generally flagged as risky for this category.',
    journeyFrames: [
      'A dark, focused homepage that feels engineered, not decorated.',
      'Credentials rendered like an instrument reading — exact and glowing.',
      'A service explained with technical precision.',
      'A team bio framed by credentials and outcomes data.',
      'A sharp, single, glowing call to act.',
    ],
    matches: {
      reason: ['Physician Expertise'],
      audience: ['Active / younger patients'],
      feeling: ['Impressed', 'Inspired'],
      differentiator: ['Minimally Invasive Specialization'],
      specialty: ['Spine', 'Orthopedics'],
      anxietyBoost: { Low: 2, Medium: -1, High: -3, 'Very High': -4 },
    },
  },
  {
    id: 'neon-pulse',
    name: 'Neon Pulse',
    tagline: 'Electric precision — bold glow against deep dark.',
    description:
      'Saturated neon-cyan and magenta accents glow against near-black panels. The most futuristic, highest-energy register available — built for visibility, not subtlety.',
    personality: 'Electric. Futuristic. Unmistakable.',
    characteristics: [
      'Near-black background with glowing neon-cyan and magenta accents',
      'High-contrast borders that appear to glow at the edges',
      'Bold geometric sans, wide tracking on numbers and labels',
      'Animated accents implied through glow and gradient, not flat color',
    ],
    palette: { bg: '#070A12', ink: '#F2F6FF', accent: '#36F0D0', secondary: '#E83DD0', buttonText: '#070A12' },
    typography: {
      headingClass: 'font-sans text-2xl font-bold tracking-tight',
      labelClass: 'font-mono text-[10px] uppercase tracking-[0.2em] font-bold',
      sample: 'Everything, reimagined.',
    },
    photographyNote: 'Minimal literal photography — equipment and outcomes data rendered with glow effects instead.',
    referenceBrands: [{ name: 'Discord', url: 'https://discord.com' }, { name: 'Razer', url: 'https://razer.com' }],
    revisionRisk: {
      level: 'Higher',
      reason: 'Flagged as generally too experimental for a medical facility — included for comparison, but expect strong reactions either way.',
    },
    bestMatch: ['Clients explicitly chasing a disruptive feel', 'Younger, lifestyle-driven audiences'],
    businessBenefit: 'Maximizes differentiation and stands out instantly in a category that defaults to white and blue.',
    drawback: 'Highest risk of feeling untrustworthy for a surgical facility — most anxious patients will read this as the opposite of reassuring.',
    journeyFrames: [
      'A bold, glowing homepage unlike any competitor.',
      'Credentials rendered as a glowing badge of proof.',
      'A service explained with high-contrast, futuristic visuals.',
      'A team bio framed like a feature release.',
      'A bright, unmissable call to act.',
    ],
    matches: {
      reason: [],
      audience: [],
      feeling: ['Inspired'],
      differentiator: ['Minimally Invasive Specialization'],
      specialty: [],
      anxietyBoost: { Low: 1, Medium: -2, High: -4, 'Very High': -5 },
    },
  },
  {
    id: 'the-grove',
    name: 'The Grove',
    tagline: 'Soft, organic, alive — progress framed as growth.',
    description:
      'Rounded blob shapes, botanical accents, and a calm sage-and-terracotta palette. The feeling of a calming retreat, not a sterile office — soft shapes replace hard edges everywhere.',
    personality: 'Calming. Natural. Restorative.',
    characteristics: [
      'Sage green and warm terracotta over a soft cream base',
      'Organic blob shapes and rounded claymorphic cards',
      'Botanical line-art accents used sparingly',
      'Generous, breathable spacing — nothing feels clinical',
    ],
    palette: { bg: '#F4F1E8', ink: '#3A3528', accent: '#7E9B6E', secondary: '#C97B4A', buttonText: '#FFFFFF' },
    typography: {
      headingClass: 'font-serif text-2xl font-normal tracking-normal',
      labelClass: 'font-sans text-[10px] uppercase tracking-[0.12em] font-medium',
      sample: 'Growth, naturally.',
    },
    photographyNote: 'Soft, natural light photography — greenery, calm interiors, never sterile white.',
    referenceBrands: [{ name: 'Calm', url: 'https://calm.com' }, { name: 'Aesop', url: 'https://aesop.com' }],
    revisionRisk: {
      level: 'Medium',
      reason: 'Decorative organic shapes need a steady hand — overdone, they read as twee rather than calming for a surgical audience.',
    },
    bestMatch: ['Wellness-focused service lines', 'Clients seeking a calm, restorative feel'],
    businessBenefit: 'Differentiates NPSI from every clinical-white competitor and supports a "healing environment" narrative.',
    drawback: 'Risks undercutting the surgical/clinical authority needed for higher-acuity procedures.',
    journeyFrames: [
      'A calm, organic homepage that feels more retreat than office.',
      'Trust shown gently, woven into the page rather than stamped on it.',
      'A service framed around growth and renewal.',
      'A team member introduced warmly, softly lit.',
      'An unhurried, gentle invitation to reach out.',
    ],
    matches: {
      reason: ['Comfort & Privacy'],
      audience: ['Anxious patients'],
      feeling: ['Comfortable'],
      differentiator: ['Patient Privacy & Comfort'],
      specialty: ['Mind & Body'],
      anxietyBoost: { Low: -1, Medium: 1, High: 2, 'Very High': 2 },
    },
  },
];

export function directionByName(name: string | undefined): Direction | undefined {
  return DIRECTIONS.find(d => d.name === name);
}

export const DEFAULT_PALETTE: Palette = { bg: '#F8FAFC', ink: '#334155', accent: '#64748B', secondary: '#94A3B8', buttonText: '#FFFFFF' };

// ── Brand color presets ─────────────────────────────────────────────────────────
// Curated starting points for the Brand Colors step — the client can also pick
// a fully custom color. Every direction below is then re-rendered in whichever
// color the client lands on, rather than a fixed per-direction palette.

export interface BrandColorPreset {
  id: string;
  label: string;
  hex: string;
}

export const BRAND_COLOR_PRESETS: BrandColorPreset[] = [
  { id: 'trusted-navy', label: 'Trusted Navy', hex: '#1E3A5F' },
  { id: 'clinical-teal', label: 'Clinical Teal', hex: '#0E7C7B' },
  { id: 'forest', label: 'Forest', hex: '#1F3D2E' },
  { id: 'warm-gold', label: 'Warm Gold', hex: '#B8862E' },
  { id: 'modern-slate', label: 'Modern Slate', hex: '#334155' },
  { id: 'deep-burgundy', label: 'Deep Burgundy', hex: '#7A2334' },
  { id: 'sky-blue', label: 'Sky Blue', hex: '#2E6FB8' },
  { id: 'sage', label: 'Sage', hex: '#6B8F71' },
];

// ── Generic preview content ────────────────────────────────────────────────────
// Industry-agnostic placeholder content for the full-direction asset previews —
// this is what makes the selector reusable for any client, not just one
// industry. Swap DEFAULT_BRAND_NAME and these arrays per engagement if needed.

export const DEFAULT_BRAND_NAME = 'Brightline';

export const GENERIC_NAV_ITEMS = ['Features', 'About', 'Pricing', 'Contact'];

export const GENERIC_TEAM = [
  { name: 'Amara Patel', specialty: 'Operations Lead' },
  { name: 'James Whitfield', specialty: 'Client Success' },
  { name: 'Lauren Cho', specialty: 'Strategy' },
];

export const GENERIC_TESTIMONIALS = [
  {
    quote: 'From the first call, I felt like they actually understood what we needed. Every step was explained before it happened — no surprises.',
    attribution: 'Client · Year One',
  },
  {
    quote: "I'd had a bad experience with a vendor before. This was the opposite — calm, unhurried, and every question got a real answer.",
    attribution: 'Client · Repeat Customer',
  },
  {
    quote: 'A colleague referred us and I understood why within five minutes of our first meeting. The team coordinated everything before we even asked.',
    attribution: 'Client · Referral',
  },
];

export const GENERIC_JOURNEY = [
  { step: 'Discovery', detail: 'Meet your team and review the plan.' },
  { step: 'Onboarding', detail: 'Setup, access, what to expect.' },
  { step: 'Delivery', detail: 'The work happens, with regular check-ins.' },
  { step: 'Follow-Up', detail: 'Review results and plan what is next.' },
];

export const GENERIC_TRUST_SIGNALS = ['Certified & Compliant', 'Trusted by 500+ Clients', '15+ Years in Business'];

export const GENERIC_FEATURES = [
  { title: 'Core Service', description: 'The primary offering most clients start with.' },
  { title: 'Fast Turnaround', description: 'Clear timelines, communicated up front.' },
  { title: 'Dedicated Support', description: 'A real person, not a ticket queue.' },
  { title: 'Flexible Plans', description: 'Scales from a single project to ongoing work.' },
  { title: 'Proven Process', description: 'The same playbook behind every engagement.' },
  { title: 'Transparent Pricing', description: 'No surprise line items at the end.' },
];

export interface GenericPricingTier {
  label: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const GENERIC_PRICING_TIERS: GenericPricingTier[] = [
  { label: 'Starter', desc: 'Get going on your own', features: ['Self-serve setup', 'Email support', 'Core features'], cta: 'Start here', highlight: false },
  { label: 'Growth', desc: 'Most popular path', features: ['Guided onboarding', 'Priority support', 'Everything in Starter'], cta: 'Get started', highlight: true },
  { label: 'Enterprise', desc: 'For larger teams', features: ['Dedicated manager', 'Custom contract', 'Everything in Growth'], cta: 'Talk to us', highlight: false },
];

// ── Recommendation engine ──────────────────────────────────────────────────────

export interface DirectionScore {
  direction: Direction;
  score: number;
  reason: string;
}

export function scoreDirections(answers: CompassAnswers): DirectionScore[] {
  return DIRECTIONS.map(direction => {
    let score = 0;
    const matchedReasons: string[] = [];

    (['reason', 'audience', 'feeling', 'differentiator'] as const).forEach(key => {
      const answer = answers[key];
      if (answer && direction.matches[key]?.includes(answer)) {
        score += 2;
        matchedReasons.push(answer);
      }
    });

    if (answers.specialty_priority && direction.matches.specialty?.includes(answers.specialty_priority)) {
      score += 1;
    }
    if (answers.anxiety_level && direction.matches.anxietyBoost?.[answers.anxiety_level] !== undefined) {
      score += direction.matches.anxietyBoost[answers.anxiety_level];
    }

    const reason = matchedReasons.length
      ? `Matches because it leads with ${matchedReasons.slice(0, 2).join(' and ')}.`
      : direction.tagline;

    return { direction, score, reason };
  }).sort((a, b) => b.score - a.score);
}

// ── Trust, photography, navigation, homepage, CTA options ─────────────────────

export interface TrustStyle {
  id: string;
  label: string;
  description: string;
  badgePosition: 'hero' | 'band' | 'section' | 'footer';
  recommended?: boolean;
  caution?: string;
}

export const TRUST_STYLES: TrustStyle[] = [
  {
    id: 'hero',
    label: 'Embedded in the hero',
    description: '"AAAHC Accredited" appears as a design element inside the header/hero area — the first thing a visitor sees.',
    badgePosition: 'hero',
    recommended: true,
  },
  {
    id: 'band',
    label: 'Dedicated trust band below the hero',
    description: 'A logo-strip band directly under the hero — AAAHC plus board certifications, shown before any other content.',
    badgePosition: 'band',
    recommended: true,
  },
  {
    id: 'section',
    label: 'Integrated into physician bios',
    description: "Credentials and accreditation appear alongside each physician's bio, reinforcing trust at the point of introduction.",
    badgePosition: 'section',
  },
  {
    id: 'footer',
    label: 'Subtle footer only',
    description: 'Accreditation is mentioned only in the footer — the current approach.',
    badgePosition: 'footer',
    caution: 'Not recommended for a trust-led category like ASCs — shown for comparison only.',
  },
];

export interface PhotographyStyle {
  id: string;
  label: string;
  description: string;
  swatch: string;
}

export const PHOTOGRAPHY_STYLES: PhotographyStyle[] = [
  { id: 'facility', label: 'Real facility photography', description: 'OR suites, recovery rooms, the lobby — clean, architectural, specific to NPSI.', swatch: '#94A3B8' },
  { id: 'staff', label: 'Staff & physician photography', description: 'Portraits and team shots that put the people — not just the building — in front of the patient.', swatch: '#C99A55' },
  { id: 'lifestyle', label: 'Patient outcome lifestyle', description: 'Real people, post-recovery, back to the activities the procedure restores.', swatch: '#16A864' },
  { id: 'mixed', label: 'Mixed approach', description: 'A deliberate blend of facility, staff, and outcome photography across the site.', swatch: '#0E5C56' },
];

export interface NavStyle {
  id: string;
  label: string;
  description: string;
  items: string[];
}

export const NAV_STYLES: NavStyle[] = [
  { id: 'specialty-first', label: 'Specialty-first', description: 'Spine, Pain, Ortho, Bariatrics as top-level items — built for visitors who already know their procedure.', items: ['Spine', 'Pain', 'Ortho', 'Bariatrics', 'More', 'Contact'] },
  { id: 'patient-journey', label: 'Patient-journey', description: 'For Patients / For Physicians / About Us — organized by who the visitor is, not what they need.', items: ['For Patients', 'For Physicians', 'About', 'Contact'] },
  { id: 'hybrid', label: 'Service + patient hybrid', description: 'Services and Patient Resources sit side by side as equal top-level priorities.', items: ['Services', 'Patient Resources', 'About', 'Contact'] },
  { id: 'minimal', label: 'Ultra-minimal', description: 'Logo, a phone number, and a single contact link. Nothing else competes for attention.', items: ['Logo', 'Call Now', 'Contact'] },
];

export interface HomepageStructure {
  id: string;
  label: string;
  sections: string[];
}

export const HOMEPAGE_STRUCTURES: HomepageStructure[] = [
  { id: 'trust-led', label: 'Trust-led', sections: ['Hero', 'Trust band', 'Specialties', 'Physician bios', 'Testimonials', 'Patient info', 'CTA'] },
  { id: 'story-led', label: 'Story-led', sections: ['Hero', 'Specialties', 'Why NPSI', 'Testimonials', 'Accreditation', 'Contact'] },
  { id: 'physician-led', label: 'Physician-led', sections: ['Hero', 'Physician-led intro', 'Specialties', 'CTA', 'Trust footer'] },
];

export interface CtaStyle {
  id: string;
  label: string;
  description: string;
}

export const CTA_STYLES: CtaStyle[] = [
  { id: 'phone', label: 'Call us now', description: 'Phone-forward. The number is the largest, most repeated element on the page.' },
  { id: 'consultation', label: 'Request a consultation', description: 'Form-forward. A short intake form is the primary path to action.' },
  { id: 'find-procedure', label: 'Find a procedure', description: 'Navigation-forward. The CTA routes visitors to the specialty page that matches their need first.' },
  { id: 'referral', label: 'Ask your doctor to refer you here', description: "Referral-directed. Built for the patient who hasn't been referred yet but is researching on their own." },
];

// ── Component refinement (optional step) ───────────────────────────────────────

export interface ComponentOption {
  id: string;
  label: string;
  description: string;
}

export interface ComponentCategory {
  fieldId: string;
  label: string;
  options: ComponentOption[];
}

export interface ComponentGroup {
  id: string;
  moment: string;
  description: string;
  categories: ComponentCategory[];
}

export const COMPONENT_GROUPS: ComponentGroup[] = [
  {
    id: 'impression',
    moment: 'First impression',
    description: 'The hero — the first thing a visitor sees.',
    categories: [
      {
        fieldId: 'hero_component',
        label: 'Hero type',
        options: [
          { id: 'full-bleed', label: 'Full-bleed photography hero', description: 'Headline and CTA overlaid on a full-width facility photograph.' },
          { id: 'split', label: 'Split: text left, photography right', description: 'Headline and copy on one side, facility photography on the other.' },
          { id: 'physician-led', label: 'Physician-led hero', description: 'A large surgeon portrait with credentials and CTA front and center.' },
        ],
      },
    ],
  },
  {
    id: 'trust',
    moment: 'Trust establishment',
    description: 'Accreditation and physician credibility.',
    categories: [
      {
        fieldId: 'trust_component',
        label: 'Trust / accreditation band',
        options: [
          { id: 'logo-strip', label: 'Logo strip below hero', description: 'AAAHC and board certifications as a row of logos.' },
          { id: 'hero-integrated', label: 'Integrated into the hero', description: 'Accreditation shown as part of the hero design itself.' },
          { id: 'dedicated', label: 'Dedicated "Why Trust Us" section', description: 'A standalone section with copy explaining what the credentials mean.' },
        ],
      },
      {
        fieldId: 'physicians_component',
        label: 'Physician / surgeon section',
        options: [
          { id: 'grid', label: 'Grid of portrait cards', description: 'Name, title, and credentials per physician, browsable at a glance.' },
          { id: 'spotlight', label: 'Featured surgeon spotlight', description: 'One surgeon highlighted per specialty page.' },
          { id: 'team-photo', label: 'Team photography', description: 'A group shot with individual callouts.' },
        ],
      },
    ],
  },
  {
    id: 'discovery',
    moment: 'Service discovery',
    description: 'Specialties and procedures.',
    categories: [
      {
        fieldId: 'specialties_component',
        label: 'Specialties section',
        options: [
          { id: 'icon-grid', label: 'Icon grid', description: 'Six service cards, each with a simple icon.' },
          { id: 'photo-cards', label: 'Photography cards', description: 'One image per specialty, with hover detail.' },
          { id: 'text-list', label: 'Text list with expandable detail', description: 'Compact list that expands into a fuller description on click.' },
        ],
      },
    ],
  },
  {
    id: 'proof',
    moment: 'Social proof',
    description: 'Testimonials and outcomes.',
    categories: [
      {
        fieldId: 'proof_component',
        label: 'Patient testimonials',
        options: [
          { id: 'pull-quote', label: 'Pull-quote', description: 'Patient name and procedure alongside a short quote.' },
          { id: 'video', label: 'Video testimonial thumbnails', description: 'Short video clips, playable inline.' },
          { id: 'ratings', label: 'Star ratings with written reviews', description: 'Aggregate rating plus a scrollable list of reviews.' },
        ],
      },
    ],
  },
  {
    id: 'action',
    moment: 'Action',
    description: 'Patient info, contact, and location.',
    categories: [
      {
        fieldId: 'patient_info_component',
        label: 'Patient information',
        options: [
          { id: 'faq', label: 'FAQ accordion', description: 'Common questions, collapsed by default.' },
          { id: 'timeline', label: '"What to expect" timeline', description: 'A step-by-step walkthrough of surgery day.' },
          { id: 'downloads', label: 'Downloadable prep forms', description: 'A list of printable / downloadable preparation documents.' },
        ],
      },
      {
        fieldId: 'contact_component',
        label: 'Contact / scheduling',
        options: [
          { id: 'phone-forward', label: 'Phone-forward', description: 'A large, clickable phone number leads the section.' },
          { id: 'form-phone', label: 'Form + phone', description: 'A short contact form, with the phone number alongside.' },
          { id: 'referral', label: 'Request a referral', description: 'A physician-to-facility referral form.' },
        ],
      },
      {
        fieldId: 'location_component',
        label: 'Location / facility',
        options: [
          { id: 'map', label: 'Map embed with address & hours', description: 'A simple embedded map with practical details.' },
          { id: 'gallery-map', label: 'Photo gallery + map', description: 'A short facility photo gallery alongside the map.' },
        ],
      },
    ],
  },
];

// ── Alignment statement ─────────────────────────────────────────────────────────

export function buildAlignmentStatement(values: Record<string, unknown>): string {
  const get = (k: string) => (typeof values[k] === 'string' ? (values[k] as string) : '');
  const audience = get('audience');
  const feeling = get('feeling');
  const direction = directionByName(get('primary_direction'));
  const trust = get('trust_style');
  const cta = get('cta_style');

  const parts: string[] = [];
  parts.push(
    `You're building for ${audience ? audience.toLowerCase() : 'your patients'} who should feel ${feeling ? feeling.toLowerCase() : 'confident'} within seconds of landing.`
  );
  if (direction) {
    parts.push(`The ${direction.name} direction best supports this — ${direction.tagline.toLowerCase()}`);
  }
  if (trust) {
    parts.push(`Your trust approach is "${trust}."`);
  }
  if (cta) {
    parts.push(`Your homepage will guide visitors toward "${cta}."`);
  }
  return parts.join(' ');
}
