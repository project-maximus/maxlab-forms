# NORTH PKWY SURGICAL INSTITUTE
## Design Direction Selector — Strategic Blueprint
### Produced for Maxxlab · June 2026

---

# PHASE 1 — NUTRIPATH SELECTOR AUDIT

## Why It Was Created
The NutriPath selector was built to solve a classic creative direction problem: a client needs to choose a website visual direction before build begins, but lacks the vocabulary or visual references to articulate preferences. The tool externalizes the decision by presenting pre-built style concepts, letting the client react rather than describe.

## What Problem It Solves
It collapses a typically multi-week direction-setting process (moodboards, reference rounds, style tiles) into a single sitting. It reduces revision cycles by anchoring early agreement on visual language rather than discovering misalignment mid-build.

## What Information It Collects
1. **Primary visual direction** — one of 11 style "volumes" (Soft & Friendly, Glass & Motion, Bold & Tactile, Atelier, Archive, Colourway, EdTech, Neon Lab, The Garden, Premium AIDA, Sleek Dark)
2. **Font pairing** — 4 options (Nunito+Lexend, Fraunces+Lexend, Geist, Instrument Serif+Geist)
3. **Component preferences** — cherry-picked sections from across volumes: heroes, "how it works" layouts, feature blocks, proof/testimonial styles, signature pieces, pricing/CTA styles

## What Decisions It Helps Make
- Which visual world the website will live in
- Which typeface personality carries the brand
- Which section layouts to build or draw from

## What Works Well
- **Embedded previews** — full-page volume previews load inline via base64 blob, no broken links
- **Coverage matrix** — transparently showing which sections exist per volume is genuinely useful and builds client trust
- **Component mixing** — the "cherry-pick" section correctly surfaces that styles can be combined, reducing the "but I liked that one thing" problem
- **Selection summary drawer** — live count and collapsible review panel reinforces that choices are captured
- **Email delivery** — sends client and agency copies simultaneously; JSON export is a smart backstop
- **Visual mini-previews** — thumbnail mocks per card are accurate enough to convey the real feel

## What Feels Confusing
- **Volume naming** — "Director's Cut · Atelier," "Director's Cut · Archive," "Director's Cut · Colourway" are opaque to a non-design-savvy client. The distinction between them is not intuitive.
- **11 options is too many** — cognitive overload; research suggests 5–7 maximum for meaningful choice
- **No decision context** — the selector jumps straight to style without asking WHO the client is, WHAT they want to feel, or WHO their patients are. Design direction is presented in isolation from strategy.
- **Font section is underexplained** — most clients don't understand what a "font pairing" decision means for their brand perception
- **No elimination tool** — no way for client to flag directions they strongly dislike before exploring what they like

## What Feels Repetitive
- Many volumes share similar heroes (card floating left, headline right) — the visual differentiation between V1/V7/V10 is subtle at thumbnail scale
- Multiple "Director's Cut" volumes feel like the same decision being revisited

## Sections of Most Value
1. Vibe/direction grid (primary choice)
2. Coverage matrix (trust-building, expectation-setting)
3. Component cherry-pick (refinement tool)
4. Summary drawer + email delivery

## Sections of Least Value
1. Font pairing as a standalone section (should be embedded into direction cards or handled separately post-direction)
2. The "Send to Maxxlab" modal (functional but jarring — feels like a form after a gallery experience)

---

# PHASE 2 — SELECTOR IMPROVEMENT ROADMAP

## HIGH IMPACT IMPROVEMENTS

**H1 — Add a strategic intake layer before design directions**
The selector currently shows design before asking strategy. A surgical center client needs to answer: Who are your primary patients? What is the emotional tone of care you provide? What do you want a patient to feel within 3 seconds of landing? This context shapes which direction is correct.

**H2 — Reduce directions to 5–6 maximum, purpose-built for this client**
11 directions with healthcare-irrelevant options (Neon Lab, Garden) adds confusion and dilutes trust in the system. Curate to directions that are actually viable for an ASC.

**H3 — Rename directions using client-language, not designer-language**
"Premium AIDA Flow" and "Director's Cut · Archive" mean nothing to a surgeon or administrator. Names should describe the patient/brand experience: "Precision & Trust," "Warm & Approachable," "World-Class & Minimal."

**H4 — Add a brand personality quiz before the gallery**
5 forced-choice questions (e.g., "Which word best describes your practice: Pioneering / Trusted / Welcoming / Clinical?") that pre-filter or visually rank directions based on answers.

**H5 — Integrate trust and accreditation signals into direction choices**
ASC clients always struggle with how to show AAAHC accreditation, physician credentials, and safety records. Each direction should show a mock accreditation badge/credential block, so clients can see how trust is expressed in each style.

**H6 — Add a photography/imagery style selector**
Healthcare websites live or die on photography. A section asking: facility photography vs. lifestyle photography vs. illustration vs. abstract/minimal — with visual examples — is critical for this industry.

## MEDIUM IMPACT IMPROVEMENTS

**M1 — Add a "navigation style" choice**
Sticky header vs. sidebar vs. minimal top bar — this dramatically affects first impression and mobile experience. Clients don't think to ask but care deeply when they see it.

**M2 — Show mobile previews alongside desktop**
ASC patients booking consultations are often on mobile. A side-by-side mobile/desktop view increases realism and decision confidence.

**M3 — Add an "eliminate first" interaction**
Before selecting favorites, let clients mark directions they dislike and hide them. This is psychologically easier than choosing from 11 options.

**M4 — Add a conversion/CTA style selection**
"Book Now" button style, consultation form appearance, and urgency framing vary enormously by direction. Show these explicitly.

**M5 — Replace the font section with a "brand voice" selector**
Fonts are a means to an end. Ask: "Which phrase feels most like your practice?" with examples rendered in the actual font pairings. The answer maps to a font without requiring the client to know typography.

## LOW IMPACT IMPROVEMENTS

**L1 — Add hover-to-expand on mini thumbnails**
**L2 — Add a "most popular for healthcare" indicator**
**L3 — Add a progress indicator (e.g., Step 1 of 4)**
**L4 — Allow clients to leave notes per direction before submitting**

---

# PHASE 3 — CLIENT WEBSITE ANALYSIS

## Business Model
North PKWY Surgical Institute (NPSI) is a multi-specialty **ambulatory surgery center (ASC)** in Dallas, TX. It operates as an outpatient facility serving multiple physician practices across: Spine, Pain Management, Orthopedics, Bariatrics, Mind & Body, and Podiatry. Revenue is driven by surgical volume — physicians bring patients, NPSI provides the facility and staff.

## Target Audience
**Primary:** Patients (and their families) who have been referred by a physician for an outpatient surgical or interventional procedure. Ages 35–75. Often anxious. Coming for spine, joint, weight loss, or pain procedures.

**Secondary:** Referring physicians and physician practices who decide which ASC to use for their cases. This audience cares about: OR quality, scheduling ease, staff competence, accreditation.

**Tertiary:** Insurance coordinators and case managers who need facility information to authorize procedures.

## Customer Journey (Patient)
1. Referred by physician → Googles NPSI to vet the facility
2. Lands on homepage → Needs immediate trust signals (accreditation, expertise, staff quality)
3. Explores specialty pages → Wants to understand what procedure they're having and how it works here vs. a hospital
4. Looks for patient information → Pre-op instructions, what to bring, parking, who to call
5. May call directly → Phone number must be prominent
6. Day of procedure → Confirmation/directions become homepage behavior

## Customer Journey (Physician/Referrer)
1. Evaluates OR capabilities, scheduling access, accreditation
2. May check staff quality and facility photos
3. Needs contact/scheduling info immediately

## Trust Requirements (CRITICAL for this client)
This is a medical facility. Trust is the entire value proposition. The website must communicate:
- AAAHC accreditation (currently shown only in the footer — severely underplayed)
- World-class surgeons and staff
- State-of-the-art technology
- Patient safety and privacy
- Intimate, non-hospital environment

## Industry Expectations
- Clean, clinical but not cold
- Professional photography of facility and staff
- Specialty-specific content
- Easy access to phone/booking
- Patient resources section
- Physician partner references

## Brand Perception (Current)
The current site is functional but generic. It uses a Squarespace template with minimal customization. The hero text ("Break Through Procedures, World Class Surgeons") has strong positioning language that the design doesn't support. The site undersells the quality of the facility and the expertise of the physicians.

## Emotional Requirements
Patients are **anxious**. The design must reduce anxiety before it builds confidence. The emotional arc should be:
1. "This place looks professional and trustworthy" (within 3 seconds)
2. "They specialize in exactly what I need" (within 10 seconds)
3. "I can imagine being comfortable here" (scrolling the hero/facility section)
4. "I know what to do next" (CTA/contact)

## Conversion Goals
- Phone calls: primary
- Form submissions for patient inquiries: secondary
- Patient information page visits: tertiary

---

# PHASE 4 — INDUSTRY RESEARCH

## ASC Website Best Practices (2025–2026)

**What performs best:**
- Hospitality-inspired aesthetics (spa/boutique hotel feel over clinical sterility)
- Warm, professional photography of actual facility spaces — not stock
- Distinct service line pages with clear procedure descriptions
- Patient journey content ("What to expect on surgery day")
- Prominent accreditation logos (AAAHC especially)
- Physician bios with photos and credentials
- Accessible design (ADA compliance is now expected)
- Mobile-optimized with large tap targets for older patients

**What is becoming outdated:**
- Pure clinical white/blue/grey palettes that feel cold
- Generic stock photography of surgeons with masked patients
- Horizontal navigation bars with 8+ top-level items (especially complex dropdown structures)
- Static hero images with no movement or depth
- Hiding contact information below the fold

**What should NOT be included for this client:**
- Dark/moody aesthetics (Neon Lab equivalent) — too experimental for a medical facility
- Overly bold/brutalist typography — signals aggression, wrong for anxious patients
- Abstract or highly stylized illustration — patients need to see the real facility
- EdTech-style gamified UI — wrong industry register
- Extremely minimalist "less than less" approaches — insufficient trust-building capacity

**Emerging strong performers for ASCs:**
- Premium/warm-minimal (think Mayo Clinic meets boutique hotel)
- Strong photography paired with clean white space
- Video backgrounds showing facility and staff (short, muted, non-intrusive)
- Credential and accreditation blocks positioned prominently, not hidden in footers
- Patient testimonial video clips

---

# PHASE 5 — DESIGN DIRECTION FRAMEWORK

## Recommended: 5 Directions (NOT 11)

Optimal number for this client: **5 directions**. Enough variety to represent genuinely different strategic choices; few enough to not overwhelm. Each direction should be distinctly different in feel and patient-perception outcome.

---

### DIRECTION 1: PRECISION & AUTHORITY
**Name:** Precision & Authority
**Description:** Refined, minimal, world-class. Clean architecture, restrained typography, maximum white space. The website looks like it belongs alongside Cleveland Clinic and Houston Methodist. Nothing is decorative — everything communicates clinical excellence and total confidence.
**Personality:** Exacting. Confident. Quietly elite.
**Visual Characteristics:** Near-white backgrounds. Charcoal and steel type. One accent color (deep navy or dark teal). Large editorial-weight headlines. Grid-based layouts. Photography is facility-first — clean corridors, equipment, precise OR shots.
**Target Audience:** Patients seeking top-tier surgical care; physicians vetting facility quality; insurance/case management audiences.
**Business Benefits:** Positions NPSI at the premium end of the Dallas ASC market. Strong for physician recruitment. Builds high-trust credibility fast.
**Possible Drawbacks:** Can feel cold or intimidating to anxious patients. Requires genuinely excellent facility photography to work. Less warm and approachable.
**Reference Brands:** Cleveland Clinic, Houston Methodist, UCSF Health
**Reference Websites:** clevelandclinic.org, houstonmethodist.org
**Why Include:** This is the direction that will perform best with physician-referrer and high-acuity patient audiences. It signals that NPSI is not a lower-tier outpatient mill.
**Why Clients Choose It:** They want to be taken seriously. They want to compete with hospital systems.

---

### DIRECTION 2: WARM & TRUSTED
**Name:** Warm & Trusted
**Description:** Approachable, human, and safe. Warm neutrals and natural photography. Patients feel welcomed, not processed. Staff photography is prominent. The facility looks inviting, not intimidating. Language is warm and direct.
**Personality:** Caring. Personalized. Safe.
**Visual Characteristics:** Warm off-whites, soft creams, warm grays. Accent in warm green or muted gold. Rounded elements, soft shadows. Photography prioritizes staff portraits and patient-facing moments (consultation, recovery, walking out the door). Slightly larger body type for older patient readability.
**Target Audience:** Patients (especially first-timers, anxious patients, elderly patients). Family members. People who've had bad hospital experiences.
**Business Benefits:** Highest emotional conversion for direct patient audiences. Reduces pre-procedure anxiety. Strong for bariatric and mind/body specialties.
**Possible Drawbacks:** Risk of feeling generic if photography is not strong. May not project the "world-class" positioning as forcefully.
**Reference Brands:** Banner Health, Tenet Healthcare, boutique medical spas
**Reference Websites:** bannerhealth.com, thoughtful regional ASC sites
**Why Include:** The majority of NPSI's patients are anxious adults being referred for their first outpatient procedure. Warmth converts this audience better than precision.
**Why Clients Choose It:** They want patients to feel comfortable the moment they land on the site.

---

### DIRECTION 3: PREMIUM BOUTIQUE
**Name:** Premium Boutique
**Description:** Where medicine meets luxury hospitality. The site evokes a high-end private clinic or luxury wellness center — beautiful, intimate, discreet. Dallas-market appropriate. Patients feel they are choosing something special, not just convenient.
**Personality:** Exclusive. Refined. Discreet.
**Visual Characteristics:** Matte blacks or deep charcoals paired with warm neutrals and gold or champagne accents. Serif headlines (editorial weight). Generous white space. Hotel-quality photography: lounge-like waiting areas, premium amenities, staff in crisp uniforms. Thin borders, subtle animations. Navigation feels like a boutique brand, not a healthcare provider.
**Target Audience:** Affluent Dallas patients seeking discretion and comfort. Bariatric and plastic surgery patients especially. Physician partners who want to refer to a premium facility.
**Business Benefits:** Enables premium positioning and potentially higher procedure pricing. Differentiates strongly from hospital systems. Excellent for bariatric and elective specialty lines.
**Possible Drawbacks:** May not communicate insurance/accreditation trust as directly. Could feel too exclusive and turn off patients who assume it is out of reach.
**Reference Brands:** The Biltmore Medical, private London surgical clinics, Jolie Health
**Reference Websites:** Premium aesthetic medicine sites, concierge medicine practices
**Why Include:** Dallas is a highly competitive market with affluent patients who make active facility choices. This direction captures that audience decisively.
**Why Clients Choose It:** They believe their facility genuinely offers a premium experience and want the website to match.

---

### DIRECTION 4: MODERN & ACTIVE
**Name:** Modern & Active
**Description:** Clean, energetic, forward-looking. Not clinical — more like a modern wellness brand. Bold typography, dynamic photography of active patients (pre- and post-recovery). Feels like a facility built for people who want to get back to their lives.
**Personality:** Optimistic. Active. Outcome-focused.
**Visual Characteristics:** Bright whites, strong greens or blues, high-contrast photography. Bold display fonts (not serif). Action-oriented photography: people walking, returning to sports, working — outcomes, not procedures. Clear sectioning with strong CTA hierarchy. Mobile-first feel.
**Target Audience:** Younger orthopedic and spine patients (40–60). Bariatric patients motivated by lifestyle change. People who research extensively before deciding.
**Business Benefits:** Strong digital performance with younger demographic. High click-through on procedure-specific pages. Good for SEO with outcome-oriented content.
**Possible Drawbacks:** Less gravitas for older or more anxious patients. Can feel overpromising if outcomes content is not carefully worded.
**Reference Brands:** Modern orthopedic practices, sports medicine clinics, DISC Surgery Center
**Reference Websites:** discsurgery.com, modernmedical clinic sites
**Why Include:** The spine and orthopedic lines at NPSI serve active patients who are motivated by returning to function. This direction speaks directly to that aspiration.
**Why Clients Choose It:** They want to emphasize outcomes and life-return, not the surgery itself.

---

### DIRECTION 5: HERITAGE & EXCELLENCE
**Name:** Heritage & Excellence
**Description:** Established, authoritative, credentialed. The design language of a long-trusted institution — not stuffy, but carrying the weight of accumulated expertise. Accreditation and credentials are showcased as primary design elements, not afterthoughts. Editorial in structure, institutional in confidence.
**Personality:** Established. Credentialed. Deeply trustworthy.
**Visual Characteristics:** Deep navy or forest green paired with white and gold. Serif-weighted headlines. Credential badges, physician board certifications, AAAHC logo displayed prominently in the hero or near the top fold. Structured grid layouts. Photography is formal but warm: team photographs, OR views, facility exterior.
**Target Audience:** Older patients (55+). Patients with complex cases (spine, bariatric, orthopedic). Patients specifically researching accreditation. Insurance and referring physician audiences.
**Business Benefits:** Maximum trust signal for medically cautious audiences. Strong for physician recruitment. Differentiates from newer, less-established ASCs.
**Possible Drawbacks:** Can read as dated if execution is not precise. Risk of feeling rigid or over-formal.
**Reference Brands:** Mayo Clinic, long-established surgical groups, academic medical centers
**Reference Websites:** mayoclinic.org, established regional surgical practices
**Why Include:** NPSI is AAAHC accredited — a credential most competing ASCs don't have or don't display. This direction makes that the headline, not the footnote.
**Why Clients Choose It:** They know their accreditation and physician credentials are a genuine differentiator and want the design to lead with it.

---

# PHASE 6 — DECISION FRAMEWORK

## Choices That Matter Most (Include)

### 1. STRATEGIC INTENT (New — must precede all design)
Before seeing any visual direction, the client should answer:
- What is the primary reason a patient chooses NPSI over a hospital or competitor? (Options: Safety/Accreditation / Physician Expertise / Comfort & Privacy / Convenience / Cost)
- Who is your most important audience to convert on the website? (Options: Anxious patients / Active/younger patients / Affluent patients / Referring physicians / All equally)
- One word that should describe how a patient feels after seeing your homepage? (Options: Reassured / Impressed / Comfortable / Inspired / Confident)

These answers create a visible "brand compass" that helps clients understand why a direction fits or doesn't fit their answers.

### 2. VISUAL DIRECTION (5 Directions)
The primary aesthetic and emotional register of the website.

### 3. TRUST STYLE (New — critical for this industry)
How credentials and accreditations are displayed:
- Embedded in hero ("AAAHC Accredited" as a design element in the header area)
- Dedicated trust band below the hero (logo strip format)
- Integrated into physician bios section
- Subtle footer only (not recommended — but the client should see why)

### 4. PHOTOGRAPHY STYLE (New — critical for healthcare)
- Real facility photography (OR, recovery rooms, lobby)
- Staff/physician photography (portraits, team shots)
- Patient outcome lifestyle photography (people active post-recovery)
- Clinical procedure illustration (for complex spine/surgical explainers)
- Mixed approach

### 5. NAVIGATION STRUCTURE
- Specialty-first navigation (Spine, Pain, Ortho, Bariatrics as top items)
- Patient-journey navigation (For Patients / For Physicians / About Us)
- Service + Patient hybrid
- Ultra-minimal (logo + call us + contact)

### 6. HOMEPAGE STRUCTURE PREFERENCE
Show three homepage wireframe structures (not styled — wireframe only):
- Hero → Trust band → Specialties → Physician bios → Testimonials → Patient info → CTA
- Hero → Specialties → "Why NPSI" → Testimonials → Accreditation → Contact
- Hero → Physician-led (lead with surgeon faces) → Specialties → CTA → Trust footer

### 7. CALL-TO-ACTION STYLE
- "Call us now" (phone-forward)
- "Request a consultation" (form)
- "Find a procedure" (navigation-forward)
- "Ask your doctor to refer you here" (referring physician directed)

## Choices to Remove (Don't include)
- Font pairing as a primary standalone section (move to post-direction refinement)
- Any visual direction that is not viable for healthcare (dark/neon/brutalist)
- "Cherry-pick individual components" at this stage — too granular for direction-setting

## Choices to Add (New)
- Photography style
- Trust/credential display preference
- Navigation structure preference
- Homepage wireframe structure preference
- Brand intent questions

---

# PHASE 7 — SELECTOR STRUCTURE

## Section Order and Rationale

### SECTION 0: COVER / INTRODUCTION
**Why:** Sets professional tone. Explains what the selector is and how long it takes (15 minutes). Names what will happen with the output. Reduces anxiety about the process before it begins.

### SECTION 1: STRATEGIC COMPASS (3–5 Questions)
**Why this comes first:** The selector must understand the client's strategic intent before presenting design options. Without this, design direction becomes arbitrary preference rather than strategic choice. This section takes 2 minutes and produces a visible "compass" that stays visible throughout the rest of the selector.

Questions:
1. "What's the #1 reason a patient chooses NPSI over a hospital?" (single select)
2. "Which audience are you most trying to impress on the website?" (single select)
3. "Which word best describes the feeling your website should create?" (single select)
4. "What is NPSI's strongest differentiator that competitors can't easily claim?" (single select: AAAHC Accreditation / Physician Excellence / Patient Privacy & Comfort / Minimally Invasive Specialization / Convenience & Location)

Output: A "compass card" that says "Based on your answers, your strongest directions are likely [X] and [Y]. Here's why." This is shown before the gallery.

### SECTION 2: VISUAL DIRECTION (5 Directions)
**Why here:** Strategic context has been set. The client now sees directions through the lens of their stated goals. Each direction card includes: preview image/mock, direction name, one-sentence patient experience description, and a tag showing "Best match for: [Anxious patients / Physician audiences / Affluent patients]."

### SECTION 3: TRUST & CREDENTIAL STYLE (4 Options)
**Why this is separate:** Accreditation display is a distinct decision that can be layered onto any visual direction. This section ensures the client commits to how prominently to feature their AAAHC status and physician credentials — a decision most ASC website projects handle inconsistently.

### SECTION 4: PHOTOGRAPHY APPROACH (4 Options)
**Why here:** Photography is often left to the build phase, which is too late. Facility photo shoots, physician headshots, and lifestyle photography have different budgets and lead times. Locking this decision in the direction phase prevents scope surprises.

### SECTION 5: NAVIGATION & HOMEPAGE STRUCTURE (Wireframes Only)
**Why wireframes:** Strip away all styling. The client should choose navigation and page structure based on information hierarchy, not visual preference. Three wireframe structures, unlabeled by style, each mapped to a different audience priority.

### SECTION 6: CALL-TO-ACTION COMMITMENT
**Why:** The primary conversion action must be decided before design begins. A phone-forward CTA requires different homepage composition than a form-forward CTA. This question takes 10 seconds but resolves a persistent revision source.

### SECTION 7: SUMMARY & DELIVERY
**Why last:** Summarizes all selections. Shows a visual alignment statement: "You're building for [audience] who feel [emotion]. The [Direction Name] direction best supports this because [reason]. Your trust approach leads with [credential display]. Your homepage will guide visitors toward [CTA type]." Client reviews, adds notes, and submits.

---

# PHASE 8 — COMPONENT SYSTEM

## Component Categories for This Client

### INCLUDE AS SELECTABLE COMPONENTS:

**Hero Types** (3 options)
- Full-bleed photography hero with headline overlay + CTA
- Split: Text left, facility photography right
- Physician-led hero: large surgeon portrait, credentials, CTA

**Trust / Accreditation Band** (3 options)
- Logo strip directly below hero (AAAHC + board certifications)
- Integrated into hero design
- Dedicated "Why Trust Us" section with copy

**Specialties Section** (3 options)
- Icon grid (6 service cards with icons)
- Photography cards (one image per specialty with hover)
- Text-list with expandable descriptions

**Physician/Surgeon Section** (3 options)
- Grid of portrait cards with name, title, credentials
- Featured surgeon spotlight (single surgeon per specialty page)
- Team photography (group shot with individual callouts)

**Patient Testimonials** (3 options)
- Pull-quote with patient name and procedure
- Video testimonial thumbnails
- Star ratings with written reviews

**Patient Information Section** (3 options)
- FAQ accordion
- Step-by-step "What to Expect" timeline
- Downloadable preparation forms list

**Contact / Scheduling Block** (3 options)
- Phone-forward with large clickable number
- Contact form with phone number alongside
- Request a referral (physician-to-facility form)

**Location / Facility Block** (2 options)
- Map embed with address and hours
- Photo gallery of facility with map

### DO NOT INCLUDE AS SELECTABLE (Decided by designer):
- Footer structure
- Internal page templates (procedure detail pages)
- Blog/news section
- Mobile menu behavior
- Form field design
- Button micro-interactions

### GROUPING LOGIC:
Group by patient journey moment, not by component type:
1. First impression (Hero + Navigation)
2. Trust establishment (Accreditation + Physicians)
3. Service discovery (Specialties + Procedures)
4. Social proof (Testimonials + Outcomes)
5. Action (Contact + CTA + Patient Info)

### HOW MANY OPTIONS PER CATEGORY:
Never more than 3 per component type. 3 options = enough to express genuine variety without paralysis.

---

# PHASE 9 — INNOVATION

## New Approaches Not in NutriPath

### INNOVATION 1: THE PATIENT SIMULATION PREVIEW
Instead of showing a static website mock, show a 5-frame "simulated patient visit" — the sequence of screenshots a patient sees when they land, scroll, look for their procedure, find the physician, and decide to call. This simulates the real UX journey, not just the homepage aesthetic.

### INNOVATION 2: BRAND COMPASS CARD (Pre-filters direction gallery)
A persistent visual element generated from the strategic intake (Section 1) that sits beside the direction gallery throughout the session. Shows the client their own stated priorities, so they can self-check whether the direction they're drawn to actually matches what they said.

### INNOVATION 3: COMPETITIVE CONTRAST PANEL
For each direction option, show one real competing ASC website in that same visual register. Not to copy — but to show the client "this is the visual world you'd be entering." This helps clients make differentiation decisions, not just taste decisions.

### INNOVATION 4: ANXIETY SPECTRUM CALIBRATION
A single slider question at the start: "On average, how anxious are your incoming patients when they arrive?" (Scale: Low / Medium / High / Very High). High anxiety shifts recommended directions toward warm/approachable options automatically.

### INNOVATION 5: REVISION RISK INDICATOR
Each direction selection shows a "revision risk" rating based on how many clients in similar industries have changed their minds on this direction after seeing it built. (E.g., "Premium Boutique" has higher revision risk because photography requirements often aren't met at build time.) This sets expectations and protects the project timeline.

### INNOVATION 6: SPECIALTY LINE WEIGHTING
Ask: "Which specialty line drives the most patient volume?" The answer shifts the homepage hierarchy recommendation. If spine is primary, the homepage structure leads with spine content differently than if bariatrics is primary.

### INNOVATION 7: PHYSICIAN INVOLVEMENT QUESTION
"Will your lead physicians be involved in approving the website design?" Yes / No / Unknown. If yes, the selector adds a recommendation: "We suggest including one physician representative in this selector session, as their preferences on credential display and photography will significantly affect revision cycles."

---

# PHASE 10 — FINAL BLUEPRINT

## Complete Strategic Plan for the NPSI Design Direction Selector

### TOOL IDENTITY
**Name:** North PKWY Surgical Institute · Website Direction Selector
**Subtitle:** "Aligning your website with your patients, your physicians, and your practice."
**Built by:** Maxxlab
**Completion time:** 12–18 minutes
**Deliverable:** PDF summary + email to both client and agency

---

### STRUCTURE SUMMARY (7 Sections)

| # | Section | Est. Time | Purpose |
|---|---------|-----------|---------|
| 0 | Introduction | 1 min | Context-setting, expectations |
| 1 | Strategic Compass | 3 min | Intent before aesthetics |
| 2 | Visual Direction | 5 min | Choose 1 of 5 directions |
| 3 | Trust & Credential Style | 2 min | Accreditation display decision |
| 4 | Photography Approach | 1 min | Photography asset planning |
| 5 | Navigation & Homepage Structure | 2 min | Wireframe-only structure choice |
| 6 | CTA Commitment | 30 sec | Primary conversion action |
| 7 | Summary & Submission | 2 min | Review, notes, deliver |

---

### 5 DESIGN DIRECTIONS (Summary)

| Direction | Emotional Register | Best For |
|-----------|-------------------|----------|
| 1. Precision & Authority | Clinical excellence, confidence | Physician audiences, high-acuity patients |
| 2. Warm & Trusted | Human, safe, approachable | Anxious patients, first-timers |
| 3. Premium Boutique | Luxury, discretion, exclusivity | Affluent Dallas patients, bariatric |
| 4. Modern & Active | Outcome-focused, energetic | Younger orthopedic/spine patients |
| 5. Heritage & Excellence | Credentialed, institutional, established | Older patients, AAAHC-first strategy |

---

### COMPONENT DECISIONS (5 Journey Moments × 3 Options Each)

| Journey Moment | Options |
|----------------|---------|
| First Impression | Full-bleed photo hero / Split text+photo / Physician-led hero |
| Trust Layer | Hero-integrated accreditation / Trust band below hero / Dedicated section |
| Specialties | Icon grid / Photo cards / Text + expandable |
| Proof | Text testimonial / Video testimonial / Star ratings |
| Action | Phone-forward / Form + phone / Referral form |

---

### INNOVATIONS TO BUILD IN

1. Brand Compass Card (generated from Section 1, visible throughout)
2. Patient Simulation Preview (5-frame patient journey preview per direction)
3. Competitive Contrast Panel (one real ASC website shown per direction)
4. Anxiety Spectrum Calibration (single slider, shifts recommended order)
5. Revision Risk Indicator (per direction, expectation-setting)

---

### DELIVERY FORMAT REQUIREMENTS

- **Platform:** Standalone HTML file (single-file, no external dependencies except hosted fonts)
- **Email delivery:** EmailJS or equivalent — client copy + agency copy simultaneously
- **PDF export:** Printable summary page generated from selections
- **JSON export:** Machine-readable output for agency import into project brief
- **No login required:** Client completes without creating an account
- **Mobile-compatible:** Primary client session may occur on tablet or mobile
- **Accessibility:** WCAG AA compliant (this is a healthcare client — ironic to deliver an inaccessible selector)

---

### VISUAL DESIGN OF THE SELECTOR ITSELF

The selector's own visual design should lean toward **Direction 2 (Warm & Trusted)** or **Direction 1 (Precision & Authority)** — it should feel like it belongs to the healthcare world, not a tech startup. It should signal that this is a serious, professional tool produced by a serious, professional agency.

Typography: Clean sans (Geist or similar) for UI. Serif headlines optional for section titles.
Color: Neutral off-white background, deep charcoal type, single accent (the NPSI brand color or a neutral blue).
No playful animations or gamified interactions — this is a medical client.

---

### WHAT THIS BLUEPRINT ENABLES THE NEXT AGENT TO BUILD

A next-generation Design Direction Selector for North PKWY Surgical Institute that:
1. Begins with strategic intent, not aesthetic preference
2. Presents exactly 5 curated, healthcare-appropriate visual directions
3. Collects decisions on trust display, photography, navigation, and CTA — the four decisions most likely to cause revision cycles if left unresolved
4. Generates a visible "brand compass" that keeps strategic context in front of the client throughout the session
5. Shows patient simulation previews and competitive context alongside each direction
6. Delivers a complete written alignment statement in the summary, not just a list of selections
7. Outputs to PDF + email + JSON
8. Is built as a single accessible HTML file

**This blueprint is complete and fully actionable without additional research.**

---

*North PKWY Surgical Institute × Maxxlab · Design Direction Selector Strategic Blueprint · June 2026*
