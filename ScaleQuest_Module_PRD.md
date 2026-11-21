# ScaleQuest — Module PRD
**Grade 8 · Scale factors**

*Produced from `Intellia_Module_Blueprint_PRD_v3.1.md`. Inputs: `{{GRADE}}` = Grade 8 · `{{TOPIC}}` = Scale factors · `{{CURRICULUM}}` = Global (multi-framework: England National Curriculum, US Common Core, Singapore MOE, India NCERT/CBSE, Cambridge Lower Secondary / IGCSE; NSW added as a "later" data point) · `{{SPECIAL_INSTRUCTIONS}}` = five instructions, M1–M5 (§6). Repo: `scale-quest-main`. Companion: `ScaleQuest_Module_TRD.md`.*

> **How this PRD relates to the reference module.** Every "as per the uploaded module" requirement (M1–M3) was checked against the **running** reference (`G2-Money-Money-main`, built and measured in a real browser), not only its source. Where the rendered result differs from the blueprint's tables (a CSS-order collision in the reference changes the Wonder card, the Home button and a few card fills), this PRD follows **what the reference actually shows on screen** and says so (§6, §15). The measured values are in the TRD §5.

---

## 1. Overview

**ScaleQuest** teaches Grade 8 students to **recognise** a scaled copy of a shape, **calculate** the scale factor k = image ÷ object, **apply** whole-number, fractional, and decimal scale factors (enlargements *and* reductions), **find** missing sides in similar shapes in either direction, **reverse and combine** scale factors, **read** scale drawings and maps (1 : n ↔ k, with unit conversion), and **predict** how perimeter and area change. The central idea is one sentence: *a scale factor multiplies every length by the same number — it never just adds.* The theme is **the Mini-Maker Studio**, a school makerspace where two club members resize posters, badges, models and plans for an open-day exhibition. The module teaches by **manipulation, not theory questions** (S4): students slide, drag, place, scrub and repair live shapes; Practice stays multiple-choice with live visuals.

## 2. Background

- **Position in the series:** Grade 8 geometry-and-proportion strand. It **starts** the scale / similarity strand for the platform (no sibling on this topic is registered in the material supplied).
- **Prerequisites:** ratio and proportion, multiplying and dividing by fractions and decimals, measuring and unit conversion between cm and m (Grades 6–7).
- **Complements / later:** similar triangles and Pythagoras, area and volume scaling, trigonometry, coordinate transformations.
- **Overlaps to avoid:** simple ratio sharing (a ratio module), area and perimeter formulas (a measurement module). ScaleQuest uses them only as *scaled quantities*.
- **Reuse:** reuses `G2-Money-Money-main`'s five-phase architecture per platform convention (reducer, app shell, header, Wonder/Story/Simulate/Practice/Reflect surfaces, scoring, badges, audio pipeline).

## 3. Standards Alignment

### 3.1 Source and crosswalk (done first)

Intellia is global, so no single framework defines "Grade 8". Placements below were cross-checked across **five default frameworks plus one extra**, using official or school sources where available.

| Framework | Level where taught | Depth / notes | Source |
|---|---|---|---|
| England National Curriculum (KS3) | **Year 7** first enlargements with integer scale factors; **Year 8** enlargement with a centre, fractional factors, "multiplicative change"; **Year 9** enlargement and similarity, missing sides; **Year 10** area and volume scale factors | Core delivery Year 8–9; positive/fractional before negative | Oak National Academy (Year 7 *Enlarging objects*; KS3/KS4 similarity & enlargement units); Hampshire school topic summaries (Year 8 *Multiplicative change*, Year 9 *Enlargement and similarity*, Year 10); a Gloucestershire school's Year 8 curriculum map (*Enlargements*, integer then fractional factors, centre) |
| US Common Core | **Grade 7** scale drawings, scale factor as constant of proportionality (7.G.A.1); **Grade 8** dilations and similarity; **High School Geometry** effect of dilation on area and volume | Scale factor is introduced in Grade 7 and re-used with dilations in Grade 8 | Florida CPALMS benchmark notes (vertical alignment); Common Core 7.G.A.1 text; published Grade 7 / Grade 8 unit overviews |
| Singapore MOE | **Secondary 2** (course outline lists *Congruence and Similarity*, "meaning of scale factor and solving simple problems on scale drawings") | Area/volume of similar figures not listed in the outline reviewed; level mapping *Year 2 Express = Secondary 2* is inferred, the outline does not state it | A school's published Year 2 Express mathematics course outline (MOE-aligned) |
| India NCERT / CBSE | **Class 8** (*Ganita Prakash* Part 1, Ch. 7 *Proportional Reasoning-1*): scaling images and aspect ratio, **informal**, "scale factor" not named as a topic | Formal similarity of triangles is later (Class 10, **not verified in this research**) | NCERT textbook PDF reference; chapter outline from a secondary study site |
| Cambridge Lower Secondary / IGCSE | **Stage 7**: integer scale factors without a centre; scale factor from object and image (G7.5H–I). **Stage 9**: positive, negative, fractional factors about a centre (G9.2A–C). **IGCSE**: scale drawings and similar shapes | Two separate placements: integer early, fractional/centre late | Cambridge scheme-of-work extract (a document-sharing copy — verify against the official PDF); Cambridge IGCSE *Scale drawings* resource unit |
| *Added:* Australia NSW | **Stage 5 (Years 9–10)**: similar figures and scale drawings (MA5-GEO-C-01) | Later than the other frameworks | NSW curriculum site |

> ⚠ **Grade-level scope flag.** Scale factor is taught **earlier and later** than Intellia Grade 8 in a meaningful share of the frameworks: integer scale factors and scale drawings at **Grade 7 / Year 7 / Stage 7**; fractional factors, dilations, similarity at **Grade 8 / Year 8–9 / Secondary 2 / Stage 9**; area/volume scaling at **Year 10 / high school**; India introduces it informally in Class 8 and formally later. **Scope cap applied:** build to Grade 8; teach what is common near Grade 8 — positive whole, fractional and decimal factors, scale between similar shapes, missing sides, reverse/combined factors, scale drawings with unit conversion, and *simple* perimeter/area scaling (World 8, whole-number or ½ factors, squares and rectangles). **Bridge-only / optional:** negative factors, centre of enlargement as coordinates, describing an enlargement fully, volume (k³), similarity tests for triangles. Sources conflicted on the Singapore mapping and on the Cambridge stage; the school outline and the scheme-of-work extract were relied on and are flagged for confirmation (§15).

### 3.2 In-scope skills (each maps to a Learning Objective, §4)

| Skill | LO |
|---|---|
| Decide whether two shapes are scaled copies (equal ratios of corresponding sides, equal angles) | LO1 |
| Pair corresponding sides and angles, including rotated or flipped copies | LO2 |
| Find k = image ÷ object from one pair of corresponding lengths | LO3 |
| Multiply object lengths by a whole-number k | LO4 |
| Use fractional and decimal k; k > 1 enlarges, k < 1 reduces, k = 1 copies | LO5 |
| Find a missing side of similar shapes in either direction (× or ÷ k) | LO6 |
| Reverse a factor (1/k); combine two factors (k₁ × k₂) | LO7 |
| Read a scale 1 : n as a scale factor; convert drawing ↔ real lengths with cm/m | LO8 |
| Perimeter × k; area × k² (simple shapes, whole-number or ½ k) | LO9 |

### 3.3 Adjacent skills treated as bridge only
Negative scale factors; coordinate centre of enlargement and "describe fully"; volume × k³; similar-triangle tests (AA, SAS); scale on curved shapes; trigonometric ratios. Each is named in §15 as a possible companion module.

### 3.4 Common misconceptions (each is a named generated distractor or seeded error)

| ID | Misconception | Wrong procedure (example) |
|---|---|---|
| M-ADD | Add instead of multiply | "Scale factor 2" on 3-4-5 → 5-6-7 |
| M-ONESIDE | Scale only one dimension | 4 × 6 → 4 × 12 |
| M-INVERT | Object ÷ image | k = 4 ÷ 12 = 1/3 for an enlargement |
| M-SUBTRACT | Image − object | k = 48 − 12 = 36 |
| M-NONCORR | Pair sides that do not correspond | multiplies the wrong side |
| M-OFFBY1 | Use k + 1 | 7 × 6 for k = 5 |
| M-FRACDIV | Divide by a fractional factor | 24 ÷ ¾ = 32 for k = ¾ |
| M-COMPLEMENT | Use 1 − k | 24 × ¼ = 6 for k = ¾ |
| M-REV-SAME | Reverse factor is the same factor | back from ×4 is "×4" |
| M-NEGATE | Reverse factor is the negative | back from ×4 is "−4" |
| M-UNIT | Forget the cm → m conversion | 1200 m for 1200 cm |
| M-MAPREV | Read 1 : n backwards | drawing ÷ n instead of × n |
| M-AREA-K | Area × k | 16 → 48 for k = 3 |
| M-AREA-SIDE | Report the new side as the area | 12 instead of 144 |
| M-SIDE-K2 | Side × k² | 4 × 9 = 36 |
| M-NOTSIM | Judge "similar" by one pair only | accepts a copy after one matching ratio |

### 3.5 Domain conventions (fixed for every example, diagram, term and unit)
- **object** = the original shape (purple-light `#9c7fd8`); **image** = the scaled copy (gold `#ffc107`); matched / correct = green `#4caf50`; mismatch = red `#ef5350` (design-system colours only; no new colours).
- Scale factor is **k**, always written with its words on first use per world ("scale factor k"). **k = image ÷ object.** Scaling is written **×**; ratios are written `1 : n` with spaces.
- Lengths are in **cm** unless a real-world length is in **m**; metric only.
- **Standard solution order (used in Story panel 4, hints, and Reflect): Match → Factor → Use → Check.** (Match corresponding sides; find k; use k to multiply or divide; check with a second side and the units.)
- A **pin** marks the fixed point a shape is scaled from; straight dashed **rays** run from the pin through matching points.

### 3.6 Terminology and notation variants (house style chosen)

| Idea | House style (used everywhere) | Variants a student may meet elsewhere |
|---|---|---|
| Original / copy | **object** / **image**; "scaled copy" | original, pre-image; similar figure |
| Making it bigger / smaller | **enlargement** (k > 1) / **reduction** (0 < k < 1) | dilation (US); "enlargement" for both (UK) |
| The fixed point | **pin** (fixed point) | centre of enlargement (UK), center of dilation (US) |
| Scale factor | **k**, "scale factor" | SF, r, multiplier |
| Map / plan scale | `1 : n` and "1 cm : 2 m" | representative fraction; "1 cm = 2 m" |
| Decimal mark | "." | "," in many regions (not used here) |
| Spelling | **US English** for any unavoidable word; the module avoids "centre", "metre", "colour" by using the pin, symbols (cm, m) and no colour words | UK spellings |

### 3.7 Locale-neutral content check (G1)
Contexts are a studio, posters, badges, a lighthouse model, a park plan: valid in any country. No currencies, country or city names, holidays, brands, or national school terms; lengths in cm and m only. Names: Maya and Jack. Framework names appear only in this PRD and the TRD.

## 4. Learning Objectives

| # | Objective (students will…) | World |
|---|---|---|
| LO1 | identify whether a shape is a scaled copy of another by comparing ratios of corresponding sides | 0 |
| LO2 | match corresponding sides and angles of a shape and its scaled copy | 1 |
| LO3 | calculate the scale factor k = image ÷ object | 2 |
| LO4 | apply a whole-number scale factor to find enlarged lengths | 3 |
| LO5 | apply fractional and decimal scale factors and describe the effect of k > 1, k = 1, k < 1 | 4 |
| LO6 | find a missing side in similar shapes using the scale factor in either direction | 5 |
| LO7 | find a reverse scale factor and combine two successive scale factors | 6 |
| LO8 | read scale drawings and maps and convert between drawing and real lengths | 7 |
| LO9 | predict how perimeter and area change when a shape is scaled by k | 8 |
| — | mixed review of LO1–LO9 | 9 |

## 5. Inherited Standards *(FIXED — copied unchanged)*

- **Five-phase architecture:** Wonder → Story → Simulate → Practice → Reflect ("Play" in code; **"Practice"** in the UI).
- **Look and feel:** the zip's design system — dark navy `#0a0a2e` base, gold `#ffc107` primary, purple `#7c5cbf` secondary, green `#4caf50` success, red `#ef5350` error; **Fredoka** (display) and **Nunito** (body); glass-card surfaces; radii 8 / 14 / 22 / pill — exactly as in the TRD §5. No module redefines them.
- **Shell and navigation:** the zip's header — **Home** button at top-left, a centred **numbered phase pill** (01 Wonder … 05 Reflect) and the **audio toggle immediately to the right of the pill**. The header is hidden on the Home screen. (This replaces the earlier "audio toggle at right-centre" wording.)
- **Home screen (S1):** per screenshot 1 — all five phase names on one line (§8.0).
- **Practice map:** per screenshot 2 (§8.4).
- **Reflect (S2):** stepped and uncongested, reusing the zip's Reflect styling (§8.5).
- **Responsive (S3):** mobile-first, 320 px to 1920 px, portrait and landscape; touch, mouse, and keyboard (§12).
- **Simulate (S4):** exactly 4 archetype-mapped stations in the zip's station shell, animated, interactive, none a multiple-choice quiz (§8.3).
- **Gamification:** XP per question, 0–3 stars per world (≥ 9 → 3, ≥ 7 → 2, ≥ 5 → 1 correct of 10), streaks, 8 fixed badge triggers (§10), 10 Boss Battles (5Q / 3 lives).
- **Practice modes:** Guided (5Q, hints, untimed), Independent (10Q, no hints), Timed Challenge (8Q, 60 s), Boss Battle (5Q, 3 lives).
- **Audio pipeline:** ElevenLabs **Alice** only, 6 emotional presets (one table used for both pre-generated and dynamic clips), pre-generated + dynamic narration, no browser TTS fallback, strict 1:1 narration/on-screen-text parity. Every question and every hint has its own narration. Wonder narration auto-starts right after **Begin Your Journey**.
- **Question bank:** 10 worlds × 10 questions = 100 (platform minimum 20+), procedurally generated, ≥ 300-run stress test, fixed schema, World 9 is the mixed-review finale.
- **Feedback system:** correct — green highlight, success animation, positive sound, encouraging message; incorrect — red highlight, gentle shake, retry sound, hint, another attempt; popups/modals animated and consistent; buttons have hover / active / focus / disabled states.
- **Delivery:** zip with placeholder story art and an art-brief README.
- **Global and language conventions (G1):** English-language content for a global audience; characters have common English first names; learner-facing text uses only Intellia grade labels and generic school words ("club", "class", "grade"), with no country-specific terms, currencies, places, holidays, or brands unless the topic requires them (then isolated behind one locale setting, TRD §4.4); one notation and spelling house style per module, declared in §3.

**Module additions (do not change the fixed text above; they come from M1–M5, §6):**
- **S5 — Single-screen Simulate:** every Simulate screen fits the visible viewport with **no scrolling of any kind**, from a 320 × 568 phone to a 1920 × 1080 display (§8.3, §12).
- **S6 — One element per screen:** each Simulate station is a sequence of **micro-screens**; each micro-screen has exactly **one manipulator** (the one element the student works), at most one readout, one instruction and navigation. Reflect (already stepped) and Wonder (one interactive strip) follow the same rule (§8.1, §8.3, §8.5).
- **F1 — Reference fidelity:** font sizes, the Wonder card and the navbar positions equal the **rendered** reference module (TRD §5.2, §5.3, §5.8).

## 6. Enhancement Requests / Special Instructions

Every instruction is a **binding acceptance requirement**; each is a testable criterion in §14.

| # | Instruction (requester's words) | Where satisfied |
|---|---|---|
| M1 | "ensure that the font sizes … must be as per the uploaded module" | PRD §5 (F1), §8.0–8.5; TRD §5.2 (effective type scale, measured), §5.8, §12.20 |
| M2 | "ensure that the … wonder phase … must be as per the uploaded module" | PRD §8.1; TRD §5.8 (Wonder spec, measured), §12.20 |
| M3 | "ensure that the … navbar position must be as per the uploaded module" | PRD §8.6; TRD §5.3 (header geometry, measured), §12.19 |
| M4 | "simulate phase must fit in a single screen so need to scroll" — read as **"no need to scroll"** | PRD §5 (S5), §8.3, §12; TRD §9, §10, §12.21 |
| M5 | "individual screens for individual elements" | PRD §5 (S6), §8.3, §8.5; TRD §10, §12.22 |

**Interpretation of M5.** Every screen carries one primary task. In Simulate that means **micro-screens** (one manipulator each, 18 in total across the four stations). The same reading is applied to Wonder (one interactive strip) and Reflect (one prompt per screen, already in S2). If "individual screens" was meant only as "one station per screen", that is already true of the zip's tabs and this PRD simply goes further; confirm in §15.

**Conflicts with platform text, and what was followed.**
- *M4 vs blueprint:* the blueprint/TRD let stations scroll vertically at ≤ 768 px (`overflow-y:auto`) and move controls to a collapsible side panel in phone landscape. **Followed M4:** no scroll anywhere; a fixed-height frame, and a merged layout in short landscape (TRD §10).
- *M1–M2 vs blueprint tables:* the reference renders some values differently from the blueprint (for example the Wonder card is 560 px wide, not 660 px; the Wonder title/number/body text are Nunito because three helper classes are undefined). **Followed the reference as rendered** (TRD §5.8).
- *M3:* the navbar **position** is unchanged at desktop. Two collisions found in the reference (below 1100 px, and at 320–359 px) are fixed by compaction rules without moving the elements' anchors (TRD §5.3, §1.18; PRD §15.13).

## 7. Module Identity

- **Module name:** `ScaleQuest`; the Home title splits as **Scale** (orange) + **Quest** (white).
- **Story theme:** **The Mini-Maker Studio** — a school makerspace club resizes things for an open-day exhibition. Each world is a studio job: matching copies, finding the factor, growing, shrinking, filling gaps, reversing, mapping, and a grand finale. *New* (the only known sibling theme is a school-market money story), age-appropriate (Appendix A, lower secondary), and a natural fit: posters, badges, models and plans are all scaled copies.
- **Named characters:** **Maya** (careful: checks every side and writes k = image ÷ object) and **Jack** (makes the common mistake: adds the same amount to every side). Common English first names, no surnames, gender-balanced, easy for the Alice voice.
- **Mascot:** **Atlas the Ant** 🐜 — a tiny map-maker who sees everything at a very small scale, and "atlas" means a book of maps. Appears in the Home speech bubble, Wonder, Story and Reflect.
- **Global-content check (G1):** passed (§3.7).
- **Collision check:** compared with **MoneyQuest** (characters Oliver and Emma, mascot Penny the Piggy Bank 🐷, money-market theme) and with the blueprint's **VennQuest** example (only the name is known). No collision with either. The full registry was **not supplied**, so the check is partial (§15.3).

## 8. Five-Phase Journey Detail

### 8.0 Home Screen (S1) *(FIXED structure; copy slots filled)*

Top to bottom, centred, no header, no description paragraph:

1. **Top chip:** `✨ Curriculum · Scale Factors Grade 8`
2. **Title:** **Scale** (orange) **Quest** (white)
3. **Subtitle** (gold, one line): `Master enlarging, shrinking and scaling by multiplying!`
4. **Mascot row:** Atlas 🐜 + white bubble: `Scale factor **k = image ÷ object**: we multiply every side by k, never just add!` (key formula highlighted orange).
5. **Journey card** — `YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START`; five phases in one row:

   | Phase | Descriptor (≤ 22 chars) |
   |---|---|
   | Wonder | `Poster puzzle alert` (19) |
   | Story | `Maya & Jack's studio` (20) |
   | Simulate | `4 interactive labs` (18) |
   | Practice | `10 worlds & bosses` (18) |
   | Reflect | `Review & scorecard` (18) |

6. **CTA:** `🚀 Begin Your Journey!`
7. **Three info chips:** `🎯 100 Questions`, `📏 Scale Factor × k`, `✨ Badges & XP`.

**S1 requirements:** the five names appear on one line at every width from 320 px up (never wrapped, truncated, or scrolled sideways); on phones each item stacks icon above name and descriptors are hidden. Sizes and positions: TRD §6.2. *(Home values come from the blueprint's screenshot measurements; the screenshots themselves were not attached to this request — §15.17.)*

### 8.1 Wonder — "The Poster Puzzle!" *(as per the reference module — M1, M2)*

**Layout (identical to the reference):** one glass card, centred, in this order: stadium-style icon → gold title → dashed number display → *(one interactive strip, new)* → question text → mascot row → CTA. Metrics, fonts and breakpoints are the reference's **rendered** values (TRD §5.8): card max-width 560 px, padding 22 × 26 px (16 × 18 px at ≤ 480 px), radius 22 px (14 px at ≤ 480 px), gap `clamp(8px, 1.2vh, 12px)`, floating emoji particles behind, slide-up entrance. The card **never scrolls and never clips** at any size.

| Slot | Copy |
|---|---|
| Icon | 🖼️ |
| Title (gold) | `The Poster Puzzle!` |
| Dashed display | `4 cm ➔ 12 cm ➔ ×?` |
| Interactive strip | two toggle buttons: `Jack: add 8` and `Maya: × 3` over a small live picture of the photo |
| Question 1 | `Jack and Maya must enlarge a **4 cm × 3 cm photo** so its width becomes **12 cm**…` |
| Question 2 | `Whose poster still looks like the photo, and **why?**` |
| Mascot (≤ 40 characters so it never clips) | `Let's explore how scaling really works!` |
| CTA | `Start Investigation 🔍` |

**The one small thing the student does:** tap a toggle. *Jack: add 8* animates the photo to **12 × 11** (every side +8) beside a dashed ghost of the true 12 × 9 shape, so the stretch is visible; *Maya: × 3* animates it to **12 × 9**, which matches the ghost, with the dashed display resolving to `×3`. Both can be tried in any order, any number of times. **No scoring**, the CTA is always enabled. Fixed numbers: 12 ÷ 4 = 3; Jack 12 × 11 (ratios 3 and 11⁄3, unequal); Maya 12 × 9 (ratios 3 and 3).

**Short screens:** type sizes never shrink below the reference minimums; instead the decorative icon and the second question line are hidden on screens shorter than 640 px, and in phone landscape the card becomes two columns (TRD §5.8). Narration auto-starts after **Begin Your Journey** and reads the title, display, both question lines, and the mascot line, one segment per on-screen text (§11).

### 8.2 Story — 4 panels

| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | The Poster Problem | the common mistake: adding the same amount to every side distorts a shape | Jack wants the 4 × 3 cm photo to become 12 cm wide, so he adds 8 cm to every side → **12 × 11**; the poster looks stretched. Maya measures: 12 ÷ 4 = 3 but 11 ÷ 3 is not 3. |
| 2 | The Magic Multiplier | **k = image ÷ object**; multiply *every* length by k; angles do not change | Maya multiplies each side by k = 12 ÷ 4 = **3** → **12 × 9**, and the 5 cm diagonal becomes **15** (3 × 5). The poster matches the photo. |
| 3 | Shrinking Back | k < 1 reduces; the reverse factor is **1/k** | The studio prints a badge: poster → photo is k = 4 ÷ 12 = **1/3**, so 12 → **4** and 9 → **3**. "Back from ×3 is ×1/3." |
| 4 | The Model Lighthouse | worked application in the standard order **Match → Factor → Use → Check**, with a scale 1 : n | A model lighthouse is **24 cm** tall at scale **1 : 50**: Match (model ↔ real), Factor (k = 50), Use (24 × 50 = **1200 cm**), Check (1200 cm = **12 m**, a sensible lighthouse). |

Every number above is a fixed literal that the TRD unit-tests (§4.2). Layout: the zip's Story card (image left, text right; single column on phones).

### 8.3 Simulate — 4 stations, 18 micro-screens, one screen, no scrolling (S4, S5, S6 — M4, M5)

**Frame (the same for every micro-screen):** the zip's tabbed Simulate card (tabs → station area → footer), unchanged in look. Inside the station area there is **one head line** (station title + `n / total` pill), **one stage** (the live picture), and **one control side** (a one-line instruction, **one dock** holding the single manipulator, and a Reset / Next row). On phones (≤ 768 px, portrait) the stage is on top and the controls below; at ≥ 769 px and in short landscape the stage is left and the controls right. **Nothing scrolls**; the stage is the flexible element and always keeps ≥ 150 px of height at 320 × 568 (verified, TRD §12.21). Station tabs show an icon and the letter A–D on phones.

| Station | Archetype | Premise and why it teaches |
|---|---|---|
| **A · Scale Machine** 🎚️ | Concept Discovery Lab (**free-play**, no questions, no score, no timer, no confirmation question) | The student drives a scale machine. A1: slide k and watch the whole copy and every side label grow or shrink from a pin. A2: drag one corner of the copy and watch the two side ratios; the copy lights green only when they are equal. A3: slide the growth and compare an **add** copy with a **multiply** copy side by side. Motion shows that equal ratios define the copy. Completion is gated on **exploration flags**. |
| **B · Poster Press** 🖨️ | Build-to-Target | The student builds a copy to match a ghost target. B1: set k with a slider until the copy fits the ghost. B2: drag vertices, one at a time, onto the points where rays from the pin through the object's corners land. B3: drag the end of a line on a ruler so a plan wall has the right drawing length for its real length. A live match indicator and a "lock" stamp reward exact matches; retries are free. |
| **C · Model Maker** 🛠️ | Multi-Step / Composite Construction | One scenario, three chained manipulations, two rounds. C1: dial k until a stretch bar of one side lands exactly on its partner. C2: drag the next image side to length (k carried forward, locked). C3: work backwards by dragging an object side to the length that gives a given image side. Later steps are locked until the earlier one is complete. |
| **D · Scale Inspector** 🕵️ | Error-Detective | Two flawed pieces of working, replayed as animation. D1: scrub the replay. D2: **tap the exact fault** on the diagram (the added strips; the swapped fraction). D3: **repair it by manipulation** (drag the corner to the right size; dial k to the right value) and watch the check re-run. |

**Micro-screens (S6): one manipulator each**

| ID | Student manipulates (the one element) | What moves live | Completion gate |
|---|---|---|---|
| A1 | slider: scale factor k, 0.25–4 in steps of 0.25 | copy scales from the pin with a spring; rays extend; each side label shows object → image (3 → 3k, 4 → 4k, 5 → 5k) | flags: seen k > 1, k < 1, k = 1 |
| A2 | one draggable corner of the copy (4 × 3 object) | width and height ratios update live; copy turns green only when equal | flags: found an equal-ratio copy, and saw an unequal one |
| A3 | slider: k from 1 to 4 in steps of 0.5 | an add-copy (3k, 3k + 1, 3k + 2) and a multiply-copy (3k, 4k, 5k) redraw together; the add-copy visibly skews | flags: reached k ≥ 3 and visited k = 2 (6-7-8 vs 6-8-10) |
| B1 | slider: k, 0.25–4 in steps of 0.25 | copy resizes against a ghost target; outline turns green on a match; lock stamp | 3 rounds: ×2, ×½, ×3⁄2 on a 4 × 2 object |
| B2 | one draggable vertex at a time, snapping to grid points | ray from the pin through the vertex; live ratio readout; snap and lock | R1 triangle, k = 2 (3 placements); R2 square, k = 3 (2 diagonal corners, rest auto-complete) |
| B3 | one draggable line end on a ruler (snap 0.5 cm) | drawing length and real length update together | 3 rounds: 1 cm : 2 m, 8 m → 4 cm; 1 cm : 5 m, 15 m → 3 cm; 1 cm : 50 cm, 250 cm → 5 cm |
| C1 | dial: k, 0.05 steps | a stretch bar of side AB scales until it meets the partner side | R1: AB = 4 → DE = 10, k = 2.5; R2: 8 → 4, k = 0.5 |
| C2 | one draggable side handle (snap 0.5 cm) | the side lengthens against a ruler, k shown locked | R1: 6 × 2.5 = 15; R2: 12 × 0.5 = 6 |
| C3 | one draggable *object* side handle | works backwards from a given image side | R1: 20 ÷ 2.5 = 8; R2: 8 ÷ 0.5 = 16 |
| D1 | scrubber | replay of the flawed working | played to the end and paused on ≥ 2 steps |
| D2 | tap on the diagram | wrong tap shakes with a reason; right tap pulses the fault | R1: the added +2 strips; R2: the swapped fraction (4 over 12) |
| D3 | R1: drag one corner (whole copy follows from the pin); R2: dial k | repair re-runs the ratio check | R1: reaches k = 2 (6-8-10); R2: reaches k = 3 |

Rounds: A has none; B1 3, B2 2, B3 3; C 2 rounds × (C1, C2, C3) = 6 screens; D 2 rounds × (D1, D2, D3) = 6 screens. Approximate time: A ≈ 3 min, B ≈ 4 min, C ≈ 5 min, D ≈ 5 min.

**Rules that apply to every micro-screen:** animated and interactive; **no theoretical multiple-choice** (a static reveal does not count); touch, mouse and keyboard equivalents for every drag (drag ⇄ tap-to-select-then-tap ⇄ keyboard); pitched to lower secondary (about 25 words per instruction, 48 px targets); honours reduce-motion. **Station design test** (Appendix B) passed for each: without text could a student still learn by manipulating; does motion show the concept; works by touch, mouse and keyboard; no point where the student only reads and picks an option.

### 8.4 Practice — world map and questions *(FIXED structure; names filled)*

**Map screen:** one card titled **`Scale Factor Game Worlds`** with the subtitle **`10 Themed Worlds · Need 4/10 Correct to Unlock Next World`** and a **star pill** (`⭐ n / 30`) at the right. A short teal accent line sits at the top edge of the card.

**World cards (5 × 2):** each shows `W1`…`W10` (top-left), the question range `Q1–10`…`Q91–100` (top-right), the world icon (🔒 while locked), the world name, and a status — **`Play →`** on the current world (mint border), **`Locked`**, **`Ready`**, or stars + `n/10` once completed. Clicking the current world card enters it. Names are in §9.

**Buttons under the grid:** `👑 Boss Battle: {current world's boss}` and `📓 Jump to Reflect Phase →`.

**Rules shown on screen:** a world unlocks when the previous world is scored **at least 4 of 10**; below that, the student replays the world with **freshly generated questions**. Stars are 0–3 per world, 30 in total.

**Question screen, feedback overlay, and Boss modal** are the zip's, unchanged (top bar, thin progress line, question card with its live visual, hint, Previous/Next, feedback popup 2.2 s). Practice stays multiple-choice with live visuals (§15.2).

### 8.5 Reflect (S2, S6) *(FIXED structure; targets and prompt filled)*

A short, spacious, three-step flow built from the zip's Reflect card (title badge "📓 Learning Reflection & Scorecard"):

1. **Quick check** — 3 recap prompts, **one per screen**, each answered by a direct interaction:
   - **R1 · M-ADD:** a 4 × 6 rectangle and three copies drawn to scale on screen (8 × 12, 8 × 10, 6 × 8): *Tap the scaled copy.* (tap a shape)
   - **R2 · M-INVERT:** a photo (4 cm) and its poster (12 cm) with labelled sides: *Tap the length you divide by to get k.* (tap a side — the object's, 4 cm)
   - **R3 · M-REV-SAME and M-ADD:** *What takes the poster back to the photo?* with three buttons `× 3`, `× 1/3`, `− 8`.
2. **Think it over** — prompt: *Jack added the same amount to every side. In your own words, why does that change the shape, and what should he do instead?* Two quick-insert chips (`It stretches some sides more…`, `Multiply every side by k…`) and a text box.
3. **Scorecard** — three stat tiles (correct / XP / best streak), one line `⭐ n / 30`, a **closed** "Badges unlocked" section, and **Play Again** / **Home**.

Rules: one primary task per screen; sticky bottom Back/Next bar; "Step n of 3" indicator; no nested scrolling; at most five interactive controls per step; Reflect reachable in **one tap**. Limits: TRD §8.

### 8.6 Header and navigation (M3)
The reference's header, as it renders: **Home** button at the top-left corner; a centred **numbered phase pill** (01 Wonder … 05 Reflect); the **audio toggle immediately to the right of the pill**, the pill and toggle centred together on the page; header hidden on the Home screen. Heights 56 / 50 / 46 px. Exact positions (measured) are in TRD §5.3. Two collisions in the reference are fixed without moving the anchors: below 1100 px the 850-px-wide pill row overlaps the Home button, and at 320–359 px the pill overlaps the Home icon (TRD §5.3, §1.18; PRD §15.13).

## 9. World & Question Bank Table

Worlds 0–8 follow LO1–LO9 in order; World 9 is the mixed finale with the hardest boss. Accents are the zip's ten, in order. Schema: `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`.

| id | World | Emoji | conceptFocus | Description | Boss | Reward |
|---|---|---|---|---|---|---|
| 0 | Twin Check | 🪞 | LO1 scaled copy or not | Spot the true scaled copies and the impostors | Copycat Copier 🖨️ | Twin-Spotter Ribbon |
| 1 | Match Sides | 🧩 | LO2 corresponding sides | Pair sides and angles, even when a copy is turned | Tangle Tape 📏 | Matchmaker Medal |
| 2 | Find the Factor | 🧮 | LO3 k = image ÷ object | Work out the multiplier between two lengths | Factor Phantom 👻 | Factor-Finder Cap |
| 3 | Grow It! | 🏗️ | LO4 whole-number k | Enlarge lengths by multiplying | Growth Golem 🗿 | Giant-Maker Gloves |
| 4 | Shrink It! | 🔬 | LO5 fractional and decimal k | Reduce, copy and enlarge with k < 1, = 1, > 1 | Shrink Sprite 🧚 | Tiny-Titan Trophy |
| 5 | Missing Side | 🕵️ | LO6 find the gap | Find an unknown side, forwards or backwards | Missing Mimic 🎭 | Gap-Closer Gem |
| 6 | Back & Forth | 🔄 | LO7 reverse and combine | Undo a scaling; chain two scalings | Echo Bot 🤖 | Round-Trip Stamp |
| 7 | Map Maker | 🗺️ | LO8 scale drawings | Turn 1 : n into k; drawing ↔ real with units | Maze Minotaur 🐂 | Cartographer's Compass |
| 8 | Perimeter & Area | 📐 | LO9 perimeter × k, area × k² | See how size measures change when scaled | Area Dragon 🐉 | Square-Scale Crown |
| 9 | Scale Master | 🏆 | LO1–LO9 mixed | The grand finale | The Grand Distorter 🌀 | Scale Master's Blueprint |

**One verified sample question per world** (arithmetic checked in code; every distractor is a named misconception):

| W | Sample question | Answer | Distractors → misconception |
|---|---|---|---|
| 0 | Rectangle A is 4 cm × 6 cm. Which rectangle is a scaled copy of A? | **8 × 12** (k = 2) | 8 × 10 → M-ADD (+4 each); 6 × 8 → M-ADD (+2 each); 4 × 12 → M-ONESIDE |
| 1 | Triangle ABC is enlarged to DEF (A→D, B→E, C→F). Which side of DEF matches BC? | **EF** | DE → M-NONCORR (first-listed side); DF → M-NONCORR (same position on the page); "none — not similar" → M-NOTSIM |
| 2 | A flag 12 cm wide is enlarged to 48 cm wide. What is the scale factor? | **4** (48 ÷ 12) | 36 → M-SUBTRACT; 1/4 → M-INVERT; 60 → M-ADD |
| 3 | A leaf is 7 cm long. A model uses scale factor 5. How long is the model leaf? | **35 cm** | 12 → M-ADD; 1.4 → M-INVERT (÷); 42 → M-OFFBY1 |
| 4 | A banner 24 cm wide is reduced by scale factor ¾. New width? | **18 cm** (24 × ¾) | 32 → M-FRACDIV; 21 → M-SUBTRACT (24 − 3); 6 → M-COMPLEMENT (24 × ¼) |
| 5 | Triangles are similar. The small one has sides 6, 9, 12. In the large one the side matching 6 is 18. Longest side of the large triangle? | **36** (k = 3) | 24 → M-ADD (+12); 27 → M-NONCORR (9 × 3); 4 → M-INVERT (12 ÷ 3) |
| 6 | Photo A is enlarged to B with scale factor 4. What scale factor takes B back to A? | **1/4** | 4 → M-REV-SAME; −4 → M-NEGATE; 3 → M-SUBTRACT (4 − 1) |
| 7 | A plan uses scale 1 : 200. A wall is 6 cm on the plan. Real length? | **12 m** (6 × 200 = 1200 cm) | 1200 m → M-UNIT; 0.03 cm → M-MAPREV; 206 cm → M-ADD |
| 8 | A square of side 4 cm is enlarged by scale factor 3. Area of the new square? | **144 cm²** (12 × 12) | 48 → M-AREA-K (16 × 3); 12 → M-AREA-SIDE; 36 → M-SIDE-K2 (4 × 9) |
| 9 | A model car is 25 cm long at scale 1 : 24. Real length? | **6 m** (600 cm) | 600 m → M-UNIT; 49 cm → M-ADD; ≈ 1.04 cm → M-MAPREV |

## 10. Gamification — Badge Renames

| Fixed trigger | Badge name |
|---|---|
| First correct answer | **First Scale-Up** |
| 5-answer streak | **Ratio Rhythm** |
| 10-answer streak | **Perfect Proportion** |
| All 4 Simulate stations complete | **Workshop Whiz** |
| Any world scores 3 stars | **Scale Star** |
| Any Boss Battle won | **Glitch Buster** |
| 20+ questions answered in Practice | **Twenty-Times Tinkerer** |
| Full 5-phase journey complete | **Scale Master** |

## 11. Audio & Narration Content Rules

*Fixed base:* every question text and hint has its own narration (dynamic, cached by text hash for the procedural bank); fixed phrases are pre-generated; the Wonder narration auto-starts after Begin Your Journey.

*Module additions:*
- **Symbols and units spoken in full:** "×" → "times"; "÷" → "divided by"; "k" → "scale factor" on first use per world, then "k" or "the scale factor"; "k = 3" → "the scale factor is three"; `1 : 50` → "one to fifty"; "1/3" → "one third", "3/4" → "three quarters"; "cm" → "centimeters", "m" → "meters"; "cm²" → "square centimeters"; "➔" → "becomes".
- **Words always spoken in full and used consistently:** *object*, *image*, *scaled copy*, *corresponding side*, *enlargement*, *reduction*, *pin*, *scale factor*. "Enlarge", "reduce", "scale up/down" are not swapped for each other.
- **The standard order is spoken the same way every time:** "Match, Factor, Use, Check."
- **Hints always open with the first thing to do** ("First, match the sides that correspond…").
- **Wonder narration** is one segment per on-screen text (title, display, both question lines, mascot line) plus one short line for each toggle result ("Jack adds eight to every side: twelve by eleven. It looks stretched!" / "Maya multiplies every side by three: twelve by nine. It looks just like the photo!").
- Names (Maya, Jack, Atlas) are checked by ear in the generated clips; if mispronounced the name is replaced, not respelled.

## 12. Accessibility and Responsiveness (S3, S5) *(FIXED baseline; module items added)*

**Responsive on mobile and web.** Desktop (≥ 1024 px) matches the zip and the two screenshots; below that, the zip's own rules apply plus the additions in TRD §9. Verified from a 320 px phone to a 1920 px display, portrait and landscape:
- No horizontal scrolling at any width; no clipped or overlapping elements; the main visual scales with its labels kept legible (minimum rendered label size).
- Header: labels hidden and pill compacted as in the zip, but at ≤ **1100 px** (instead of ≤ 768 px) so the row never collides with Home; Home text hidden ≤ 540 px. Home screen: §8.0. Map grid: 5 / 3 / 2 columns.
- All interactions work by **touch, mouse, and keyboard**; touch targets ≥ 48 × 48 px (tabs and footer buttons keep their look and gain an invisible hit area); sticky bars respect safe areas; full-height layouts use dynamic viewport height.

**Module items (M4, M5).**
- **S5 — Single-screen Simulate.** At every supported size (portrait from 320 × 568; landscape from 640 × 360) the page and the Simulate card never scroll, no element inside the card is a scroll container, nothing is cut off, and the stage keeps ≥ 150 px of height. Phones portrait: stage over controls; ≥ 769 px and short landscape: stage beside controls. Tabs show icon + letter on phones.
- **S6 — One element per screen** (§8.3, §8.5).
- **Wonder fits one screen** at every supported size without scrolling (§8.1).

**Accessibility.** Enlarged fonts and targets in Simulate and Practice; no cue is colour-only (patterns and text labels too: ✓ / ✗ marks, "equal" / "not equal" words); every part of a diagram has a text label; animations honour reduce-motion; changes announced to screen readers; visible keyboard focus. ⚠ The zip's viewport meta disables pinch-zoom; recommended change in §15.

## 13. Assets Required
4 story images at the reference module's placeholder dimensions, delivered as blank CSS-framed placeholders (`object-fit: cover`) with an art-brief README:
1. *The Poster Problem* — two posters side by side; Jack's looks stretched, Maya's matches the photo; Atlas peeks in.
2. *The Magic Multiplier* — Maya multiplying every side of the photo by 3, the diagonal marked.
3. *Shrinking Back* — a poster shrinking to a badge on a press, an arrow marked 1/3.
4. *The Model Lighthouse* — a 24 cm model lighthouse on a bench with a ruler and a 1 : 50 label.

## 14. Success Metrics / Acceptance Criteria

*Baseline (fixed):*
- Question-bank stress test (≥ 300 runs), audio parity, clean production build, full-journey walkthrough with zero console errors.
- **Visual fidelity:** token values, header, Wonder/Story/Simulate/Practice-question/Reflect surfaces match the zip (token-parity test); the **Home screen** and **Practice map** match the screenshot boxes within ±4 px at 1366 × 681 and 1361 × 654 (layout-anchor test).
- **S1:** at every tested width from 320 px up, the five Home-screen phase names render on a single line — no wrapping, truncation, or horizontal scroll.
- **S2:** each Reflect step fits 360 × 640 without scrolling (steps 1–2), has ≤ 5 interactive controls, targets ≥ 48 px, no overlapping or competing animation; Reflect reachable in one tap.
- **S3:** the full journey passes the device matrix; every station completable by touch only, mouse only, and keyboard only; no horizontal overflow.
- **S4:** no Simulate station contains a multiple-choice question; each is manipulation-driven with live animated feedback; the Concept Discovery Lab has no questions.
- **Practice map:** the 4/10 unlock rule, replay with regenerated questions, and the 0–30 star total behave as in §8.4.
- Every correct answer verified by an **independent solver**; every distractor traces to a named misconception.
- **G1:** the locale audit passes (TRD §12.18): no country-specific terms, currencies, places or brands in learner-facing text; every character and background name is a common English first name; only Intellia grade labels appear; the §3 crosswalk is complete and the terminology house style is applied consistently.

*Module-specific:*

| Req | Testable criterion |
|---|---|
| **M1** | Computed font sizes and weights of the header, Wonder, Story, Simulate, Practice, Reflect and overlay text equal the reference table (TRD §5.2) within ±0.5 px at 1366 × 681, 768 × 1024 and 390 × 844. Wonder title, number and body text are rendered in the reference's faces and weights. |
| **M2** | The Wonder card matches the reference's order, box model, colours and type (TRD §5.8) within ±2 px at 1366 × 681, 1920 × 1080 and 390 × 844; it fits without scrolling or clipping at all 15 matrix sizes; the strip has exactly three controls (two toggles and the CTA). |
| **M3** | At ≥ 1101 px the header is 56 px tall, Home sits at the top-left, the pill row is centred at `left:50%`, `top:7px` and the audio toggle is 12 px right of the pill, all within ±4 px of TRD §5.3; at no tested width from 320 to 1920 do Home and the pill row overlap or leave the viewport. |
| **M4** | For every station × micro-screen × matrix size, the document and the Simulate card have no scrollbars (scrollHeight ≤ clientHeight), no descendant of the card has `overflow:auto|scroll`, nothing is cut off, and the stage is ≥ 150 px tall. |
| **M5** | Every micro-screen has exactly one element marked as its manipulator; ≤ 4 interactive controls per micro-screen including Reset and Next; the Wonder strip and each Reflect step follow the same rule. |
| **S6** | 18 micro-screens exist as specified in §8.3, and each can be completed by touch, mouse and keyboard. |

## 15. Assumptions & Open Questions

1. **Grade placement and curriculum crosswalk** — scale factor sits across Grade 7–10 equivalents (§3.1); scope capped to Grade 8 common content. *Confirm the intended level and target markets* (for example, if India or Australia are priority, parts of this are early; if England/Cambridge, fractional factors and the pin are already Year 8–9).
2. **Practice item formats** — Practice stays multiple-choice with live visuals under the fixed schema. Several worlds (map reading, perimeter/area) would suit interactive item formats; that needs a schema change.
3. **Characters, mascot, theme** — Maya, Jack, Atlas the Ant 🐜, Mini-Maker Studio are proposed defaults, not approved. Collision check is partial: MoneyQuest and the VennQuest name only; the full registry was not supplied.
4. **Concept Discovery Lab** — free-play with no confirmation question (A1–A3).
5. **Excluded adjacent topics** — negative factors, coordinate centre/describe fully, volume k³, similarity tests. *Each deserves a companion module*, especially "Enlargement on the grid" (centre of enlargement, negative k).
6. **Header size** — screenshot 2's header pill is ≈ 37 px tall, the zip's ≈ 46–48 px. The zip's header is used for all phases.
7. **Audio-toggle position** — beside the phase pill (the zip), not right-centre. Confirm.
8. **Practice unlock rule** — "Need 4/10 Correct to Unlock Next World" is new relative to the zip. Confirm the rule and the regenerated-replay behaviour.
9. **Screenshot-derived values** are approximate (JPEG). Defects visible in the screenshots (unequal map columns, clipped Home button, a three-line "Simulate" descriptor) are not reproduced.
10. **Viewport meta** — remove `user-scalable=no` to allow pinch-zoom; needs sign-off.
11. **Markets and locale variants** — which markets this module serves; whether any need a regional variant (decimal comma, "dilation / center of dilation" vocabulary, spelling).
12. **Home button style (M3).** The reference's `App.css` defines a pill (amber border, `top 8 / left 16`), but a later rule in `globals.css` overrides it, so the *rendered* Home button is a clipped 40 px circle at `top 14 / left 12` whose label spills outside it. This is the "clipped Home button" defect the blueprint already lists. **This PRD uses the intended pill in the same top-left corner.** Confirm, or ask for the rendered circle.
13. **Header compaction breakpoint.** The reference compacts the header at ≤ 768 px, but its 850–860 px pill row collides with Home between ≈ 769 and ≈ 1040 px (it even overflows the viewport on 844 px landscape phones) and at 320–359 px. **Compaction now starts at ≤ 1100 px and the dividers are hidden at ≤ 359 px.** Desktop (> 1100 px) is unchanged. Confirm.
14. **Phase bottom padding.** The reference reserves 60–70 px of empty space under every phase on phones; Wonder and Simulate cannot fit one screen with it. It is reduced to 8 px / safe-area on all phases (Story, Practice, Reflect also gain the space). Confirm.
15. **Wonder typeface.** In the reference, the Wonder title, number display and question text render in **Nunito** (three helper classes that would have set Fredoka are undefined). Following M1, ScaleQuest keeps **Nunito, same sizes and weights**. If Fredoka was intended, it is a one-line change.
16. **M4 / M5 interpretation** — see §6. If "individual screens" meant something narrower, the 18 micro-screens can be merged (for example one screen per round or per station) without changing any station content.
17. **Screenshots not attached.** The two reference screenshots named in the blueprint were not part of this request; Home and Practice-map values are taken from the blueprint's measurements (TRD §6.2, §7.2).
18. **Source confidence.** The India Class 10 placement and the Cambridge stage numbers were not verified against primary documents (§3.1); the Singapore level mapping is inferred.
19. **World 8 as stretch.** Area × k² is introduced at Grade 7 in some programmes and at Year 10 in others. World 8 is capped to whole-number and ½ factors and can be made optional or moved to bridge-only without changing Worlds 0–7 or 9 (World 9 would then drop the LO9 items).

---

## Appendix A — Grade-Band Guide (applied)
Lower secondary (Grades 7–8): multi-variable manipulation, draggable geometry elements, replay-and-pause error hunts, composite builds; notation introduced with words first (one new symbol per world); targets ≥ 48 px; ≈ 25 words per instruction; ≈ 4–6 min per station. *(Phones: guide text of up to ≈ 25 words was verified to fit with ≥ 150 px of stage at 320 × 568.)*

## Appendix B — Simulation Pattern Catalogue (applied)
A: Concept Discovery Lab · B: Build-to-Target · C: Multi-Step/Composite · D: Error-Detective, exactly as in the blueprint's catalogue.

## Appendix C — Pre-Handoff Checklist (PRD → TRD)
- [x] Curriculum crosswalk table and multi-framework grade-placement check done; scope flag/cap recorded. (§3.1)
- [x] Terminology and notation house style stated; variants listed. (§3.6)
- [x] Every special instruction has a §6 row and a §14 criterion. (M1–M5)
- [x] Home copy slots filled (chip, title word, subtitle, bubble, five descriptors ≤ 22 chars, topic chip). (§8.0)
- [x] Map titled `Scale Factor Game Worlds`; ten worlds with icons, names, bosses. (§8.4, §9)
- [x] Four stations, one per archetype; none MCQ; the Lab is free-play. (§8.3)
- [x] Reflect recap targets and prompt written. (§8.5)
- [x] Sample questions verified; distractors named. (§9, checked with exact arithmetic)
- [x] Theme, characters, mascot checked against siblings. (§7 — partial registry, §15.3)
- [x] Characters have common English first names; no country-specific terms, currencies, places, or brands in learner-facing text (G1).
- [x] Story numbers listed as fixed literals. (§8.2)
- [x] No new colours, sizes, or positions introduced beyond the module slots. *Exceptions, all flagged:* header compaction breakpoint (§15.13), phase bottom padding (§15.14), Home button (§15.12), Wonder strip and landscape layout (§8.1), single-screen Simulate frame (§8.3).
