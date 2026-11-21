# ScaleQuest — Module TRD
**Grade 8 · Scale factors**

*Technical companion to `ScaleQuest_Module_PRD.md`, produced from `Intellia_Module_Blueprint_TRD_v3.1.md`. Repo: `scale-quest-main`. Clone source: `G2-Money-Money-main`.*

**Requirement map.** **M1** (font sizes as the reference) → §5.2, §5.8, §12.20 · **M2** (Wonder as the reference) → §5.8, §5.9, §12.20 · **M3** (navbar position as the reference) → §5.3, §5.9, §12.19 · **M4** (Simulate on one screen, no scrolling) → §5.7, §9, §10, §12.21 · **M5** (individual screens for individual elements) → §10, §8, §12.22 · **S1** → §6.4, §12.6 · **S2** → §8, §12.7 · **S3** → §9, §12.8 · **S4** → §10, §12.9 · **S5** (new: single-screen Simulate) → §9, §10, §12.21 · **S6** (new: one element per screen) → §10, §12.22 · **G1** → §4.4, §12.18.

> **How the reference values in this TRD were obtained.** The blueprint's tables were written from the zip's *source*. For this module the reference (`G2-Money-Money-main`) was **built and run in headless Chrome** and computed styles and boxes were read at 1366 × 681, 1920 × 1080, 768 × 1024, 390 × 844 and 320 × 568 (Wonder, header) and at 1366 × 681, 390 × 844, 320 × 568 (Story, Simulate). Values marked *(run-measured)* come from that run; values marked *(source)* were read from CSS but not run-measured; *(screenshot)* values are the blueprint's JPEG measurements (the two screenshots were **not attached** to this request, so Home and Practice-map values are unchanged blueprint figures). Practice-question and Reflect type sizes are *(source)* only.
>
> **Where run-measured values differ from the blueprint tables, this TRD uses the run-measured value** (M1–M3 ask for "as per the uploaded module", and the module is what renders). Each difference is recorded in §1.13–§1.20.

---

## 1. Reference Analysis Notes — Gotcha Check

**Dead and duplicate code (traced from `main.jsx` → `App.jsx`):**
1. **Live tree** is `src/components/**`, `src/config/worlds.config.js`, `src/data/*`, `src/hooks/useAudio.js`, `src/utils/*`. `src/features/*`, `src/core/*` and the unused components `TopBar`, `PhaseNav`, `XPBar`, `FloatingSymbols` are unreachable from `App.jsx`. **Not copied forward.**
2. **`src/index.css` is never imported** (`main.jsx` imports only `styles/globals.css`).

**Undefined CSS variables:**
3. `--text-primary`, `--text-secondary`, `--text-muted`, `--radius-xl`, `--transition` are used but undefined. Defined in §5.1 (also in the override stylesheet, §5.9).

**Layout bugs inherited from the zip:**
4. `.phase-content` uses `100vh` while `.app-shell` uses `100dvh`. Fixed with `100dvh` and `--header-h` (§5.3, §5.9).
5. Mobile header hides phase labels at ≤ 768 px. Kept (compact pill), with the breakpoint moved to 1100 px (§1.18).
6. Viewport meta disables pinch-zoom. ⚠ Recommend removing `maximum-scale=1.0, user-scalable=no` (PRD §15.10).
7. `generateSessionQuestions` only sorts by `id`; `LOAD_QUESTIONS` is dispatched on every Begin. ScaleQuest's bank is procedural and seeded, so replay regenerates (§4.3, §7.4).
8. **Two ElevenLabs voice-settings tables** (`scripts/generate_audio.js` vs `hooks/useAudio.js`). Unify on one table (§11).
9. **Hardcoded counts** in the reducer. Verified against the zip source and **kept unchanged** because ScaleQuest uses the platform defaults (4 story panels, 4 stations, 10 worlds, 100 questions): `NEXT_STORY_PANEL` checks `storyPanel >= 3`; `ADVANCE_SIM_STATION` caps at 3; `NEXT_QUESTION` uses `% 10` and `< 100`; `COMPLETE_SIM_STATION` is unchanged. New reducer pieces: `unlocked[]` and a `REPLAY_WORLD` path (§7.4).
10. **Leftover branding:** `index.html` title/description, `package.json` name (`moneyquest`), `README.md`, `narration.js`, `.coin-btn-emoji`-style class names in `globals.css`, `config/characters.config.js` content, badge strings, audio `phrases`. All rewritten for ScaleQuest.
11. **Mouse-only interaction risk** in inherited station components: all four stations are rewritten (§10).
12. **Locale leftovers (G1):** the zip is a money module (currency, market, a named character pair). Everything learner-facing is rewritten; the locale audit (§12.18) enforces it.

**New findings from running the reference (not in the blueprint):**

13. **CSS cascade order.** `main.jsx` imports `globals.css` *after* `App.jsx` (which imports `App.css` and every component CSS). Rules in `globals.css` therefore win ties against component CSS. Consequences measured at 1366 × 681:
    - `.glass-card` (`globals.css`) sets `max-width:560px` and the glass fill/border/shadow, and wins over `.wonder-card`'s intended 660 px width. **The Wonder card renders 560 px wide** with `padding 22px 26px`, not the 660 px / `clamp()` padding of the blueprint table. (`.wonder-content` is 660 px; the card inside it is 560.)
    - `.home-btn` in `globals.css` overrides `App.css`. **The rendered Home button is a 40 × 40 circle at `top:14px; left:12px`** with `padding 6px 16px; min-height 36px` that clips its label. `App.css` intends a pill at `top:8px; left:16px`. See §1.19.
14. **Undefined helper classes.** `.headline`, `.body-text`, `.number-display` are referenced by `WonderPhase.jsx` but defined nowhere. Result *(run-measured)*: the Wonder **title, dashed number and question text render in Nunito** (the body font), not Fredoka. Mascot bubble, CTA and header labels render in Fredoka. ScaleQuest reproduces this exactly (M1, §5.8) and **defines no new font rule for them**.
15. **Story title weight.** The Story title renders **Fredoka 700** (23.2 px at 1366), not the 900 in the blueprint table *(run-measured)*. Station title renders 900. The type table in §5.2 gives the rendered values.
16. **Phone bottom padding.** `.phase-content` keeps 60 px (≤ 768) / 70 px (≤ 540) of empty padding under every phase. On a 320 × 568 phone this leaves a 452 px Wonder area and a 535 px Wonder card, so the reference's own Wonder **overflows and is clipped** (card top 4, card bottom 540 in a 452 px box). Single-screen Wonder and Simulate need the padding reduced (§5.9). All phases gain the space; no phase loses content.
17. **Wonder mascot bubble** has no line limit in the reference; long text makes the card taller (104 px bubble at 320). ScaleQuest limits the bubble copy to ≤ 40 characters and clamps the text to two lines.
18. **Header collisions.** The pill row is 859 px wide on desktop, and the reference compacts it only at ≤ 768 px. *(Run-measured by the prototype header test.)* Between about 769 and 1040 px the centred row overlaps the Home button; on an 844 px landscape phone it overflows the viewport; at 320–359 px the compact pill (218 px) overlaps Home. ScaleQuest compacts at ≤ 1100 px and hides the step dividers at ≤ 359 px (§5.9). **> 1100 px is unchanged.**
19. **Home button style.** Use the `App.css` pill (amber border, `top:8px; left:16px`, text hidden ≤ 540 px) and delete the `globals.css` override. This is the intended design and avoids the clipped label. ⚠ Needs sign-off (PRD §15.12); the alternative is the rendered circle.
20. **`.sim-tab` and `.sim-footer .btn` heights** (≈ 28–36 px) are below 48 px. ScaleQuest keeps their look and adds invisible `::after` hit areas (§5.9, §9).

**Module-specific risk (AUTHOR).** The failure most likely to corrupt this module is a **direction or correspondence error**: k computed as object ÷ image, the wrong pair of sides, or a drawing whose real proportions do not match the numbers printed beside it (for example a "×3" picture that is ×2.8). The guardrails: (a) one exact-rational module, `utils/scaleMath.js`, used by the generator, all four stations, Reflect and the Story literals — no float arithmetic on lengths; (b) every diagram is drawn **from the same model object** that produces the question's numbers, and a **draw-vs-number test** parses rendered SVG side lengths back and compares them with the model (§12.5); (c) the independent oracle (§12.2) is written without importing `scaleMath.js`.

## 2. Tech Stack

Unchanged from the blueprint: React / React DOM `^19.2.7` · Vite `^8.1.0` / `@vitejs/plugin-react` `^6.0.2` (`base:'/'`, manual `vendor` chunk) · Framer Motion `^12.42.0` · lucide-react `^1.22.0` · Tailwind `^3.4.4` (+ PostCSS, Autoprefixer) · `oxlint ^1.69.0` · `dotenv`, `node-fetch` (audio scripts) · `vercel.json` SPA rewrite · Google Fonts Fredoka 400–700, Nunito 400/600/700/800/900, Quicksand 500–700.
**No new runtime dependencies.** Dev-only: Playwright and axe-core (§12). `scaleMath.js` uses `BigInt`-free integer fractions (numerators/denominators are small), so no big-number library.

## 3. Folder Structure

```
scale-quest-main/
├── public/ (assets/audio, assets/story, favicon.svg)
├── scripts/ generate_audio.js, clean_audio.js, stress_test.mjs, oracle.mjs, layout_tests.spec.mjs,
│            locale_audit.mjs, draw_vs_number.spec.mjs, nav_fidelity.spec.mjs, wonder_fidelity.spec.mjs,
│            sim_fit.spec.mjs, one_manipulator.spec.mjs
├── tests/reference/ (the two screenshots, if supplied; reference_metrics.json = §5 tables)
├── src/
│   ├── main.jsx                      # imports styles/globals.css only
│   ├── App.jsx / App.css             # reducer (counts unchanged, §1.9 + unlock/replay), shell, header
│   ├── styles/ design-tokens.css (§5.1), globals.css, scalequest-overrides.css (§5.9, imported LAST by globals.css)
│   ├── config/ worlds.config.js, audio.config.js, characters.config.js
│   ├── hooks/ useAudio.js, usePointerDrag.js, useVisualScale.js
│   ├── data/ storyContent.js, questionBank.js (generators), misconceptions.js, names.js
│   ├── utils/ audio.js, audioMap.js (generated), narration.js, badgeEngine.js, scoring.js, shuffle.js, rng.js,
│   │          scaleMath.js
│   └── components/
│       ├── IntroScreen.jsx/.css      # rewritten to screenshot 1 (§6)
│       ├── ProgressMap.jsx/.css      # header nav (zip) + compaction rules (§5.9)
│       ├── shared/ Mascot, FeedbackOverlay, FloatingNumbers, ScaleStage.jsx (SVG: grid / object / image / pin / rays / labels)
│       ├── gamification/ KingdomMap (rewritten to screenshot 2, §7), StarRating
│       ├── quiz/ QuestionRenderer, BossBattleModal
│       ├── phases/ WonderPhase (§5.8), StoryPhase, SimulatePhase (frame, §10), PlayPhase, ReflectPhase (§8) + reflect/*
│       └── simulations/ StationFrame.jsx, Stations.css,
│              ScaleMachineStation.jsx (A), PosterPressStation.jsx (B), ModelMakerStation.jsx (C), ScaleInspectorStation.jsx (D)
└── index.html, package.json, vite.config.js, tailwind.config.js, postcss.config.js, vercel.json, .oxlintrc.json, README.md
```
Not copied: `src/features/*`, `src/core/*`, `index.css`, `TopBar`, `PhaseNav`, `XPBar`, `FloatingSymbols`, `CoinDisplay`, `MoneyVisual`, `moneyMath.js`, the zip's money stations.

## 4. Data Layer

### 4.1 `config/worlds.config.js`
Schema `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`. The map card's `Q{10i+1}–{10i+10}` range is derived. Accents are the zip's ten, in order: `#FFD700, #FF6F61, #4CAF50, #AB47BC, #29B6F6, #EC407A, #FF9800, #26A69A, #5C6BC0, #FFC107`.

```js
export const WORLDS = [
  { id:0, name:'Twin Check',      emoji:'🪞', accent:'#FFD700', conceptFocus:'LO1 scaled copy or not',
    description:'Spot the true scaled copies and the impostors',
    boss:{ name:'Copycat Copier',        emoji:'🖨️', reward:'Twin-Spotter Ribbon' } },
  { id:1, name:'Match Sides',     emoji:'🧩', accent:'#FF6F61', conceptFocus:'LO2 corresponding sides',
    description:'Pair sides and angles, even when a copy is turned',
    boss:{ name:'Tangle Tape',           emoji:'📏', reward:'Matchmaker Medal' } },
  { id:2, name:'Find the Factor', emoji:'🧮', accent:'#4CAF50', conceptFocus:'LO3 k = image ÷ object',
    description:'Work out the multiplier between two lengths',
    boss:{ name:'Factor Phantom',        emoji:'👻', reward:'Factor-Finder Cap' } },
  { id:3, name:'Grow It!',        emoji:'🏗️', accent:'#AB47BC', conceptFocus:'LO4 whole-number k',
    description:'Enlarge lengths by multiplying',
    boss:{ name:'Growth Golem',          emoji:'🗿', reward:'Giant-Maker Gloves' } },
  { id:4, name:'Shrink It!',      emoji:'🔬', accent:'#29B6F6', conceptFocus:'LO5 fractional and decimal k',
    description:'Reduce, copy and enlarge with k < 1, = 1, > 1',
    boss:{ name:'Shrink Sprite',         emoji:'🧚', reward:'Tiny-Titan Trophy' } },
  { id:5, name:'Missing Side',    emoji:'🕵️', accent:'#EC407A', conceptFocus:'LO6 find the gap',
    description:'Find an unknown side, forwards or backwards',
    boss:{ name:'Missing Mimic',         emoji:'🎭', reward:'Gap-Closer Gem' } },
  { id:6, name:'Back & Forth',    emoji:'🔄', accent:'#FF9800', conceptFocus:'LO7 reverse and combine',
    description:'Undo a scaling; chain two scalings',
    boss:{ name:'Echo Bot',              emoji:'🤖', reward:'Round-Trip Stamp' } },
  { id:7, name:'Map Maker',       emoji:'🗺️', accent:'#26A69A', conceptFocus:'LO8 scale drawings',
    description:'Turn 1 : n into k; drawing ↔ real with units',
    boss:{ name:'Maze Minotaur',         emoji:'🐂', reward:"Cartographer's Compass" } },
  { id:8, name:'Perimeter & Area',emoji:'📐', accent:'#5C6BC0', conceptFocus:'LO9 perimeter × k, area × k²',
    description:'See how size measures change when scaled',
    boss:{ name:'Area Dragon',           emoji:'🐉', reward:'Square-Scale Crown' } },
  { id:9, name:'Scale Master',    emoji:'🏆', accent:'#FFC107', conceptFocus:'LO1–LO9 mixed',
    description:'The grand finale',
    boss:{ name:'The Grand Distorter',   emoji:'🌀', reward:"Scale Master's Blueprint" } },
];
```
World 7's boss is **`Maze Minotaur`** everywhere (PRD §9, map button, boss modal).

### 4.2 `data/storyContent.js`
`STORY_PANELS` has length 4. Every number is a fixed literal; `scripts/story_check.mjs` (part of §12.5) recomputes each from `scaleMath.js` at build time.

| Panel | Literals | Check |
|---|---|---|
| 1 The Poster Problem | photo 4 × 3 cm; width target 12 cm; Jack adds 8 → **12 × 11**; Jack's ratios 12÷4 = 3 and 11÷3 ≈ 3.67 | add = 12 − 4 = 8; ratios unequal |
| 2 The Magic Multiplier | **k = 12 ÷ 4 = 3**; Maya **12 × 9**; diagonal **5 → 15** (3 × 5); angles unchanged | 4²+3²=5²; 12²+9²=15²; 15 = 3·5 |
| 3 Shrinking Back | reverse factor **4 ÷ 12 = 1/3**; **12 → 4**, **9 → 3**; "back from ×3 is ×1/3" | 12·⅓=4; 9·⅓=3 |
| 4 The Model Lighthouse | model **24 cm**, scale **1 : 50**; **Match → Factor (k = 50) → Use (24 × 50 = 1200 cm) → Check (1200 cm = 12 m)** | 24·50=1200; 1200÷100=12 |

Names are not literals: story strings contain `{maya}`, `{jack}`, `{atlas}` placeholders filled from `characters.config.js` (§4.4).

### 4.3 Question bank — procedural generation
Architecture is the blueprint's (one source of truth; exact arithmetic; named-misconception distractors; regenerate-don't-pad; coincidence guards; shared logic; explanations from the solution trace; context variety). Schema unchanged: `{ id, districtId, category, visual, questionText, options (4), correctAnswer, explanation, hint1, hint2, visualData }`, where `correctAnswer` is the option **string** (as in the zip), `category` is an upper-case label, and `visual` is one of `'scale-pair' | 'grid-copy' | 'triangle-pair' | 'scale-line' | 'map-ruler' | 'area-grid' | 'none'`. `visualData` carries `{ model, meta }` where `model` is the raw data the diagram is drawn from and `meta = { gen, params, distractors:[{value, misconceptionId}] }`. Exports `DISTRICTS` (derived from `WORLDS`), `generateWorld(worldId, seed)` and `generateQuestionBank(seed)`. `utils/rng.js` is a seeded `mulberry32`; **Begin** uses a fresh seed, a **replay** of a world (score < 4) uses `seed + attempt`, so questions are regenerated, not repeated (§1.7).

**Exact arithmetic.** `scaleMath.js` represents every length and factor as a normalized integer fraction `{n, d}`; a generator **chooses the result first** and builds parameters backwards so that no rounding is ever needed (for example choose object side `a`, factor `k`, then image `b = a·k`). Decimal factors (0.5, 1.5, 2.5) are stored as fractions; display converts back to decimals only when the stem uses a decimal.

**Generator table (10 questions per world; the last row mixes all).**

| World | Generator (count) | Draws | Answer | Misconception distractors (3 of) |
|---|---|---|---|---|
| 0 | `pickCopyRect` (4), `pickCopyTriangle` (3), `whyNotCopy` (3) | rectangles / triangles with 4 candidate shapes, one true copy | the scaled copy / the correct reason | M-ADD (+a or +b on every side, two different n), M-ONESIDE, M-NOTSIM, M-NONCORR |
| 1 | `matchSide` (4), `matchAngle` (3), `turnedCopy` (3) | two triangles with vertex order; copy rotated/flipped in 3 | corresponding side/angle by vertex order | M-NONCORR (first-listed; same page position), M-NOTSIM |
| 2 | `findKWhole` (5), `findKFrac` (3), `findKPair` (2) | an object length and an image length | k as a whole number or fraction | M-SUBTRACT, M-INVERT, M-ADD |
| 3 | `applyWholeK` (6), `applyKTwoSides` (4) | k ∈ {2,…,6}, object 3–15 | image length | M-ADD, M-INVERT, M-OFFBY1, M-ONESIDE |
| 4 | `applyFracK` (4), `applyDecimalK` (3), `describeK` (3) | k ∈ {1/2, 2/3, 3/4, 3/5, 0.5, 1.5, 2.5}; object divisible by the denominator | image length / kind of change | M-FRACDIV, M-COMPLEMENT, M-SUBTRACT |
| 5 | `missingForward` (4), `missingBackward` (4), `missingSecond` (2) | similar triangles/rectangles with one known pair | the missing side | M-ADD, M-NONCORR, M-INVERT |
| 6 | `reverseFactor` (4), `combineFactors` (4), `roundTrip` (2) | k₁, k₂ from {2,3,4,5,1/2,1/3,2/3,3/2} | 1/k; k₁·k₂; length after a round trip | M-REV-SAME, M-NEGATE, M-SUBTRACT, M-ADD (adds the factors) |
| 7 | `mapToReal` (4), `realToMap` (3), `scaleToK` (3) | 1 : n with n ∈ {20, 50, 100, 200, 250, 500, 1000, 2500}, lengths whole in cm or m | real length / drawing length / k | M-UNIT, M-MAPREV, M-ADD |
| 8 | `perimeterK` (3), `areaK` (4), `areaFromSides` (3) | squares/rectangles, k ∈ {2, 3, 4, 1/2}; areas ≤ 999 | perimeter, area | M-AREA-K, M-AREA-SIDE, M-SIDE-K2 |
| 9 | one from each generator family of Worlds 0–8 (9) + `modelRealWorld` (1) | as above, seeded without repeating a family twice in a row | as above | any registered |

**Misconception registry (`data/misconceptions.js`).** Each entry is `{ id, label, apply(params) → value }`; a distractor is created only through a registry call.

| ID | Procedure (symbols: object a, image b, factor k, others as named) |
|---|---|
| M-ADD | `a + (b − a)` shown as +n on every side; or `k₁ + k₂` for combined factors |
| M-ONESIDE | scale one dimension only (4 × 6 → 4 × 12) |
| M-INVERT | `a ÷ b` (or `b ÷ k`, `a ÷ k` when multiplying is correct) |
| M-SUBTRACT | `b − a`; or `a − (k − 1)` style subtraction |
| M-NONCORR | `a′ · k` for the non-matching side a′ |
| M-NOTSIM | "not similar" / "cannot tell" when it is, or accepts a copy after one matching ratio |
| M-REV-SAME | reverse factor = k |
| M-NEGATE | reverse factor = −k |
| M-OFFBY1 | `a · (k + 1)` |
| M-FRACDIV | `a ÷ k` when `k < 1` and the correct move is `a · k` |
| M-COMPLEMENT | `a · (1 − k)` |
| M-UNIT | forgets the cm → m step (×100 or ÷100 missing) |
| M-MAPREV | `drawing ÷ n` (or `real × n`) |
| M-AREA-K | `area · k` |
| M-AREA-SIDE | new side length reported as the area |
| M-SIDE-K2 | `side · k²` |

**Constraints and coincidence guards.** All four option strings differ after formatting; no distractor equals the correct answer; two procedures that give the same number are merged (`M-OFFBY1` and `M-ADD` can coincide for k = 2 — the generator rejects such parameters); if fewer than 3 distinct valid distractors exist, **regenerate** the parameters (never pad with a random number); answers are whole numbers, or exact fractions/decimals with at most one decimal place; lengths in 1–999 cm (or m); `questionText` ≤ 140 characters. Explanations are rendered from the solution trace in the standard order **Match → Factor → Use → Check**, and `hint1`/`hint2` always open with the first thing to do. Context pool: poster, photo, badge, banner, leaf model, model car, lighthouse, park plan, flag, sticker, floor plan, tile; names (when a character is named in a background question) come from the pool in §4.4.

### 4.4 Locale and names
1. **Characters** (`config/characters.config.js`, the only place a name is written): `maya` (careful), `jack` (adds instead of multiplying); mascot `atlas` 🐜. Passed into story, Wonder, narration and Reflect templates; no component, story string or narration string contains a name literal.
2. **Background-name pool** (`data/names.js`, common English first names, no surnames): `Ben, Chloe, Daniel, Ella, Finn, Grace, Henry, Isla, Leo, Mia, Noah, Sam, Zoe` — none equals a sibling's names (the clone source's `Oliver`, `Emma`, `Penny` are deny-listed).
3. **Curriculum-neutral wording:** "grade", "class", "club" only. No Year n / Secondary n / Class n / Stage n.
4. **Money, units, dates, places, brands:** no currencies, no places, no brands. Units are metric (cm, m, cm²) and are not behind a locale config because the topic does not need a regional switch; the decimal mark is "." (PRD §3.6). If a market needs a decimal comma, add `config/locale.config.js` with `{ decimalMark }` and route `fmt()` through it.
5. **Notation and spelling:** house style in PRD §3.6. **US English**: "meters", "centimeters" in spoken forms (narration strings) and learner-facing text; "center" is never used because the module says "pin". Variants (dilation, centre of enlargement, pre-image) never appear in `src/`.
6. **Audio:** names (Maya, Jack, Atlas) and terms are checked by ear; a mispronounced name is replaced, not respelled.

## 5. Design System

### 5.1 `styles/design-tokens.css`
The zip's file verbatim plus the five appended tokens (`--text-primary: #fff`, `--text-secondary: rgba(255,255,255,.75)`, `--text-muted: rgba(255,255,255,.45)`, `--radius-xl: 22px`, `--transition: .25s cubic-bezier(.4,0,.2,1)`). Tokens, recurring literal colours and surface table: **as in the blueprint §5.1 (unchanged)** — `--color-bg #0a0a2e`, `--color-primary/--gold #ffc107`, `--purple #7c5cbf`, `--green #4caf50`, `--red #ef5350`, `--font-display` Fredoka, `--font-body` Nunito, radii 8 / 14 / 22 / 999, and the surface table for `.glass-card`, Wonder/Simulate/Story cards, header pill, Home journey card, chips, sim tabs and overlays. World accents: §4.1. ScaleQuest adds **no colour**; geometry colours reuse the palette: object `#9c7fd8` (`--purple-light`), image `#ffc107`, match `#4caf50`, mismatch `#ef5350`, ghost target `rgba(255,255,255,.35)` dashed, grid `rgba(255,255,255,.10)`.

### 5.2 Typography — effective (rendered) scale *(M1)*
Sizes are the computed values from the run. The `clamp()` source expression is in brackets where it was read.

| Element | Face | Desktop 1366 | 768 | 390 / 320 | Weight | Basis |
|---|---|---|---|---|---|---|
| Home title | Fredoka | `clamp(2.4rem, 4.8vw, 3.8rem)` ≈ 60.8 px | — | — | 900 | source + screenshot |
| Home subtitle | Fredoka | ≈ 18 px | — | — | 800 | screenshot |
| **Wonder title** | **Nunito** | **31.2 px** (`clamp(1.4rem,2.4vw,1.95rem)`; 31.2 also at 1920) | 22.4 | 22.4 | 900 | run-measured |
| **Wonder number display** | **Nunito** | **23.2 px** (`clamp(1.15rem,1.8vw,1.45rem)`) | 18.4 | 18.4 | 900 | run-measured |
| **Wonder question text** | **Nunito** | **15.71 px** (`clamp(.98rem,1.15vw,1.15rem)`; 18.4 at 1920) | 15.68 | 15.68 | 700 (emphasis 900, highlight `#ffc107` 900) | run-measured |
| Wonder mascot bubble | Fredoka | 17.6 px | 17.6 | 15.2 (≤ 600) | 800 | run-measured |
| Wonder CTA | Fredoka | 18.4 px (`btn-lg` 1.15rem) | 18.4 | 16 (≤ 480), 15.04 (320) | 700 | run-measured |
| Story title | Fredoka | **23.2 px** | — | 18.4 / 16.8 | **700** | run-measured |
| Story text | Nunito | 17.76 px, line-height 28.4 | — | 17.28 / 17.28 | 700 | run-measured |
| Sim tab | Fredoka | 13.12 px | — | 12.48 | 900 | run-measured |
| Station title | Fredoka | 18.44 px | — | 17.6 | 900 | run-measured |
| Station guide text | Nunito | 14.72 px, line-height 21.3 | — | 14.72 | 700 | run-measured |
| Sim footer button | Fredoka | 13.6 px | — | 13.12 | 800 | run-measured |
| Header Home button | Fredoka | 14.72 px (`.92rem`) | 13.44 (`.84rem`) | text hidden ≤ 540 | 800 | source (App.css) |
| Header phase label | Fredoka | 16 px | hidden | hidden | 900 | run-measured |
| Header step circle | Nunito/Fredoka | 14.08 px in 30 px circle | 12.16 in 26 | 12.16 in 26 | 900 | run-measured |
| Practice question / option | per blueprint | `clamp(1.35rem,2vw,1.75rem)` / `1.05rem` | — | — | 900 / 700 | source only |
| Reflect title | per blueprint | `clamp(1.5rem,2.5vw,2.1rem)` | — | — | 900 | source only |
| `.btn` / `.btn-sm` / `.btn-lg` | Fredoka | 1 / .88 / 1.15 rem | — | — | 700 | source |

**New text added by ScaleQuest uses only these existing styles:** micro-screen title `.station-title`; instruction `.station-guide-text`; the live readout `--font-display` 900 `clamp(.95rem, 1.15vw, 1.18rem)` in `#fcd34d` (the same colour as `.station-title`); the `n / total` pill `.85rem`/900. No other size or face is introduced. SVG labels inside stages use `--font-body` 800 and never render below 12 px (§9.8).

### 5.3 App shell and header — effective geometry *(M3)*

Measured at 1366 × 681 (and the same at 1920 × 1080 with `left:50%`); x positions are from the prototype header test with the compaction rules of §5.9 applied.

| Item | Reference (rendered) | ScaleQuest (> 1100 px) | ScaleQuest ≤ 1100 | ≤ 540 |
|---|---|---|---|---|
| `.app-header` | 56 px, `padding 0 16`, fixed, z 150, `pointer-events:none` | same | **50 px**, `padding 0 8` | **46 px** |
| **Home button** | *rendered:* 40 × 40 circle at `left 12, top 14` (clipped) | **pill**, `left 16, top 8`, `padding 6 16`, 95 px wide (x 16–111), min-height 36, border `1.5px #f59e0b`, bg `rgba(22,18,48,.9)`, text `#fbbf24` | pill `left 8, top 7`, `padding 4 10`, min-height 32, x 8–87 | icon only, `left 6, top 6`, min-height 30 |
| `.header-progress` (pill + 12 gap + audio) | `left:50%`, `top:7`, `translateX(-50%)`, 859 px wide at desktop | unchanged | `top:7` | `top:6` |
| Phase pill | 803 × 48 at x 254–1057 (1366); `padding 8 20`; gap 14; radius 40; bg `rgba(20,20,45,.78)` | same | `padding 4 8`, gap 4, 218 wide | same |
| Step circle | 30 px | same | 26 px | same |
| Step label (icon + text) | 16 px / 900 | same | hidden | hidden |
| **Audio toggle** | 44 × 44, **12 px right of the pill**, same row | same | 34 × 34 | same |
| `.phase-content` padding-top | 58 | same | 52 (`--header-h` + 2) | 48 |
| `.phase-content` padding-bottom | 6 | 6 | `max(8px, safe-area)` (**reduced**, §1.16) | same |

Step-circle states, the Home-hidden header and the "audio beside the pill" rule are as in the blueprint §5.3. Resulting positions at the test widths (nav left–right): 900 → 321–579 · 1024 → 383–641 · 1100 → 421–679 · **1101 → 126–975** · 1366 → 258–1108 · 1920 → 535–1385. At 1101–1366 the 850-px row clears Home (right edge 111) with ≥ 15 px.

### 5.4 Per-phase layout metrics
As the blueprint §5.4, except the values recorded in §5.7 (Simulate shell, run-measured), §5.8 (Wonder, run-measured) and the phone padding of §5.9.

### 5.5 Breakpoints
Blueprint list **plus** ScaleQuest's: **1100** (header compaction, §1.18), **359** (step dividers hidden), and the two orientation queries used by the single-screen frames: `(orientation:landscape) and (max-height:500px)` (Wonder two-column, Simulate side-by-side) with tighter variants at **max-height 420** and **380** (§5.8). **Supported matrix:** portrait ≥ 320 × 568; landscape ≥ 640 × 360. Smaller landscape windows (for example 568 × 320) are not supported and fall back to a mild vertical clip rather than scroll (flagged, §13).

### 5.6 Motion
Blueprint §5.6. Micro-screens add: spring `stiffness 260, damping 24` (≈ 350 ms) for the image resizing against a k change; 150–200 ms fades; **reduced motion** → instant resize with a 150 ms opacity change.

### 5.7 Simulate shell — effective values *(run-measured, 1366 × 681 | 390 × 844 | 320 × 568)*

| Part | Desktop | Phone |
|---|---|---|
| `.sim-card` | max `min(1080px, 98vw)`, full height | full width |
| `.sim-tab` | 32 px tall (30 content), Fredoka 13.12/900 | 29 px tall, 12.48/900; **≤ 540: icon + letter only (§5.9)** |
| `.station-title` | 18.44 px/900 `#fcd34d` | 17.6 px |
| `.station-guide-text` | 14.72 px/700 | 14.72 px |
| `.sim-footer .btn` | 36 px tall, 13.6 px/800 | 34 px tall, 13.12 px |
| Reference Simulate on 320 × 568 | — | station area scrolls (`overflow-y:auto` ≤ 768) — **removed in ScaleQuest** (M4) |

### 5.8 Wonder — effective spec *(M2; run-measured)*

**Order and boxes at 1366 × 681:** `.wonder-content` max-width 660, centred; inside it **one `.glass-card` 560 px wide** — `padding 22px 26px`, gap `clamp(8px,1.2vh,12px)` (8.17 px at 681 tall, 12 px at 1080 tall), fill `rgba(22,22,80,.72)`, `1px rgba(255,255,255,.1)`, radius 22, `blur(14px)`, shadow `0 6px 28px rgba(0,0,0,.4)`.

| Slot (top → bottom) | Box (x, y, w × h) at 1366 × 681 | Style |
|---|---|---|
| Icon | 653, 161 · 60 × 48 | font-size 47.8 px (`clamp`), Nunito emoji stack |
| Title | 492, 217 · 382 × 37 | Nunito 31.2 px / 900, `#ffc107`, `text-shadow 0 4px 18px rgba(255,179,0,.4)` |
| Number display | 437, 263 · 492 × 53 | padding `8px 18px`, `1px dashed rgba(255,179,0,.45)`, radius 12, fill `rgba(255,255,255,.08)`; text Nunito 23.2 px / 900 `#ffe082`, `letter-spacing .5px` |
| Question card | 430, 324 · 506 × 97 (max 580, gap 6) | Nunito 15.7 px / 700 white; emphasis 900; highlight `#ffc107` |
| Mascot row | avatar 430, 443 · 48 × 48 (font 25.6); bubble 492, 431 · 444 × 71 | bubble: Fredoka 17.6 px / 800, `#18181b` on white, padding `10px 20px`, radius 20, max 540 |
| CTA | 551, 516 · 265 × 56 | Fredoka 18.4 px / 700, `#1a1a2e`, padding `14px 36px`, radius 999, primary gradient |

Card edge at 1366: x 403–963, y 138–595 (reference, no strip). At 1920 × 1080 the card is 680–1240 × 320–812. At 390 × 844: card 366 wide, padding `16px 18px`, radius 14, title 22.4, bubble 15.2 px (`padding 8px 14px`), CTA 48 px tall, 16 px.

**ScaleQuest additions (the only departures):**
1. **One interactive strip** (`.wonder-lab`, max-width 440) between the number display and the question: an SVG (3 : 1, max-height 104 px) with the 4 × 3 photo, and a two-column toggle row (`Jack: add 8` / `Maya: × 3`, min-height 48, radius 14, 2 px border, `aria-pressed`; pressed = `#fbbf24` border on `rgba(251,176,59,.2)`). Photo, Jack result (12 × 11 with a dashed ghost of 12 × 9) and Maya result (12 × 9) are drawn from `scaleMath.js` (§10.4). No scoring; the CTA is always enabled.
2. **Bubble copy ≤ 40 characters**, two-line clamp (§1.17).
3. **Height budget:** the strip adds 104 + 6 + 48 px. At **≤ 640 px viewport height** the stadium icon and the second question line are hidden (**fonts are not reduced**); in **landscape phones** (`max-height:500px`) the card becomes a two-column grid (areas: `title title / disp q / lab mascot / lab cta`); at ≤ 420 the second question line is hidden; at ≤ 380 the strip SVG shrinks to 52 px and padding/gap tighten (no font shrinking).
4. Wonder uses the reduced phone bottom padding (§5.9).

**Prototype result:** all 15 sizes pass with no scroll, no clipping, nothing under the header; the card is 464 px tall at 320 × 568 (72–536), 568 at 1366 × 681 (83–650), 244–254 px in the landscape phones. *(The prototype's check of "number display on one line" used a stale selector and returned NaN; §12.20 asserts it properly.)*

### 5.9 Tested override stylesheet (`styles/scalequest-overrides.css`, imported last)
Used verbatim by the prototype (`proto/overrides.css`, 15 viewports × Wonder and Simulate = 30 checks, 0 failures; header test at 24 widths, 0 failures). Font-file `@import`s are omitted here (the prototype used them only to get real font metrics; production loads the fonts from `index.html`). The prototype's Simulate markup used **placeholder SVG** only: the real stations (§10) must be re-run through the same checks (§12.21).

```css
:root { --header-h:56px; --phase-pad-b:6px; --text-primary:#fff; --text-secondary:rgba(255,255,255,.75); --text-muted:rgba(255,255,255,.45); --radius-xl:22px; --transition:.25s cubic-bezier(.4,0,.2,1); }
@media (max-width:768px){ :root{ --header-h:50px; --phase-pad-b:max(8px, env(safe-area-inset-bottom,0px)); } }
@media (max-width:540px){ :root{ --header-h:46px; } }
.phase-content{ height:auto; padding-top:calc(var(--header-h) + 2px); padding-bottom:var(--phase-pad-b); }

/* Wonder: pin the rendered values (§5.8) */
.wonder-card.glass-card{ max-width:560px; padding:22px 26px; background:rgba(22,22,80,.72); border:1px solid rgba(255,255,255,.1); border-radius:22px; box-shadow:0 6px 28px rgba(0,0,0,.4); backdrop-filter:blur(14px); }
.wonder-q{ color:#fff; }
.wonder-cta.btn-lg{ padding:14px 36px; font-size:1.15rem; }
@media (max-width:600px){ .mascot-speech-bubble{ font-size:.95rem; padding:8px 14px; } }
@media (max-width:480px){ .wonder-card.glass-card{ padding:16px 18px; border-radius:14px; } .wonder-cta.btn-lg{ padding:12px 24px; font-size:1rem; } .mascot-speech-bubble{ max-width:190px; } }
@media (max-width:360px){ .wonder-cta.btn-lg{ padding:11px 20px; font-size:.94rem; } }
.wonder-lab{ width:100%; max-width:440px; display:flex; flex-direction:column; gap:6px; }
.wonder-lab svg{ width:100%; height:auto; aspect-ratio:3/1; max-height:104px; display:block; }
.wonder-toggle{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.wonder-toggle button{ min-height:48px; border-radius:14px; border:2px solid rgba(255,255,255,.22); background:rgba(255,255,255,.06); color:#fff; font-family:var(--font-display); font-weight:800; font-size:.95rem; cursor:pointer; }
.wonder-toggle button[aria-pressed=true]{ border-color:#fbbf24; background:rgba(251,176,59,.2); }
.mascot-speech-bubble .speech-text{ display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
@media (max-height:640px){ .wonder-stadium-icon{display:none} .wonder-q-2{display:none} }

/* Simulate single-screen frame (S5/S6) */
.sim-tab{position:relative} .sim-tab::after,.sim-footer .btn::after{content:'';position:absolute;inset:-8px -2px} .sim-footer .btn{position:relative}
@media (max-width:540px){ .sim-tab .tab-name{display:none} .sim-tab{padding:4px 12px} .sim-tab::before{content:attr(data-letter);font-weight:900} }
.station-wrap{justify-content:flex-start}
.micro-head{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:0 0 auto}
.micro-count{font-family:var(--font-display);font-weight:900;font-size:.85rem;color:#cbd5e1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:2px 10px;white-space:nowrap}
.micro-body{flex:1 1 0;min-height:0;display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;gap:clamp(6px,.8vh,10px)}
.micro-stage{position:relative;min-height:0;border-radius:14px;background:rgba(10,8,30,.55);border:1.5px solid rgba(255,255,255,.12);overflow:hidden}
.micro-stage svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.micro-side{display:flex;flex-direction:column;gap:clamp(4px,.7vh,8px);min-height:0}
.micro-dock{min-height:48px;display:flex;align-items:center;gap:10px;background:rgba(12,10,32,.9);border:2px solid rgba(255,255,255,.22);border-radius:12px;padding:4px 12px}
.micro-dock input[type=range]{flex:1;min-width:0;height:40px;accent-color:#fbb03b;touch-action:none}
.micro-readout{font-family:var(--font-display);font-weight:900;font-size:clamp(.95rem,1.15vw,1.18rem);color:#fcd34d;white-space:nowrap}
.micro-actions{display:flex;gap:8px} .micro-actions button{flex:1 1 0;min-height:48px;border-radius:12px;font-size:clamp(.9rem,1vw,1rem);font-weight:800}
@media (min-width:769px){ .micro-body{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr)} .micro-side{justify-content:flex-end} }
@media (orientation:landscape) and (max-height:500px){
  .micro-body{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);grid-template-rows:minmax(0,1fr)} .micro-side{justify-content:flex-end}
  .wonder-content{max-width:min(780px,100%)}
  .wonder-card.glass-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:'title title' 'disp q' 'lab mascot' 'lab cta';column-gap:16px;row-gap:6px;padding:10px 16px;max-width:780px;text-align:center;align-items:center;justify-items:center}
  .wonder-title{grid-area:title}.wonder-number-display{grid-area:disp}.wonder-question-card{grid-area:q}.wonder-lab{grid-area:lab}.wonder-mascot-row{grid-area:mascot}.wonder-cta{grid-area:cta}
  .wonder-stadium-icon{display:none}.wonder-q-2{display:block}.wonder-lab svg{max-height:84px} }
@media (orientation:landscape) and (max-height:420px){ .wonder-q-2{display:none} }
@media (orientation:landscape) and (max-height:380px){ .wonder-lab svg{max-height:52px} .wonder-card.glass-card{padding:8px 14px;row-gap:4px} .wonder-toggle button{min-height:44px} }

/* Header compaction 768 -> 1100 (§1.18) */
@media (max-width:1100px){ :root{--header-h:50px} .app-header{height:50px;padding:0 8px} .home-btn{top:7px;left:8px;padding:4px 10px;font-size:.84rem;min-height:32px} .header-progress{top:7px} .step-label-icon,.step-label{display:none} .progress-bar-nav{gap:6px} .progress-bar-pill{gap:4px;padding:4px 8px} .step-circle{width:26px;height:26px;min-width:26px;font-size:.76rem} .step-divider{font-size:.6rem} .audio-btn{width:34px;height:34px;min-width:34px;font-size:1rem} }
@media (max-width:540px){ :root{--header-h:46px} .app-header{height:46px} .home-btn{top:6px;left:6px;padding:4px 8px;gap:0;min-height:30px} .home-btn .home-text{display:none} .header-progress{top:6px} }
@media (max-width:359px){ .step-divider{display:none} }
```
Notes: (1) the prototype relied on the real `App.css` `.home-btn` pill (the `globals.css` override deleted, §1.19); (2) the prototype's `.station-wrap` rules came from the zip's `Stations.css` lines 4–43 and 489–512, which production keeps; (3) `.sim-tab::before` needs `data-letter="A"…"D"` on each tab (§10.1).

## 6. Home Screen

Follows screenshot 1, as in the blueprint §6. **Module copy:** chip `✨ Curriculum · Scale Factors Grade 8`; title **Scale** (`#ff9f43`) + **Quest** (white); subtitle `Master enlarging, shrinking and scaling by multiplying!`; mascot Atlas 🐜, bubble `Scale factor <b class="hl">k = image ÷ object</b>: we multiply every side by k, never just add!`; five phase descriptors `Poster puzzle alert` · `Maya & Jack's studio` (name from config) · `4 interactive labs` · `10 worlds & bosses` · `Review & scorecard` (all ≤ 22 chars); CTA `🚀 Begin Your Journey!`; chips `🎯 100 Questions`, `📏 Scale Factor × k`, `✨ Badges & XP`.

### 6.1 Structure
Top chip → title → subtitle → mascot row → journey card (`YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START`, five phases in one row joined by `→`) → CTA → three info chips. No description paragraph.

### 6.2 Measurements at 1366 × 681 *(screenshot, ±3 px; blueprint values, not re-measured)*

| Element | Box / size | Style |
|---|---|---|
| Top chip | x 458–908 (≈ 450 w), y 55–88 | ≈ 15 px / 800 white; fill ≈ `rgba(255,255,255,.16)`; border `1px rgba(255,255,255,.22)`; pill |
| Title | centred; y ≈ 136–181 | `clamp(2.4rem,4.8vw,3.8rem)`, 900, shadow `2px 2px 0 rgba(0,0,0,.25)` |
| Subtitle | y ≈ 188–205 | ≈ 18 px / 800, `#feca57` |
| Mascot avatar | ≈ 48 px (x 294–341) | `radial-gradient(circle,#ffd54f,#ff9f43)`, border `2.5px rgba(255,255,255,.35)` |
| Speech bubble | x 353–1073 (≈ 720 w), y 253–311 | white, radius ≈ 20, ≈ 15 px / 800 `#2b2b2b`, left tail 8 × 10 |
| Journey card | x 253–1113 (**≈ 860 w**), y 354–477 | `rgba(30,30,65,.65)`, `1px rgba(255,255,255,.14)`, radius 20, blur 14 |
| Journey heading | y ≈ 374 | ≈ 13 px / 900 `#feca57`, letter-spacing 1, uppercase |
| Journey items | centre y ≈ 430; pitch ≈ 173 px | icon ≈ 36 px; name ≈ 15 px / 800 white; descriptor ≈ 12 px `#a4b0be` |
| Arrows | between items | `→` `rgba(255,255,255,.25)` ≈ 20 px |
| CTA | x 547–819 (≈ 272 w), y 520–577 | `#fbb03b → #f59e0b`, text `#18181b` ≈ 19 px / 800, radius ≈ 18 (not a pill), glow `0 6px 20px rgba(245,158,11,.4)` |
| Info chips | y 585–624; widths ≈ 145 / 161 / 139; gap ≈ 13 | pill; fill ≈ `rgba(30,30,60,.6)`; `1px rgba(255,255,255,.1)`; label ≈ 14 px / 800 `#d1d8e0` |
| Background | `radial-gradient(ellipse at 50% 40%, #1b1143 0%, #09051c 100%)` | no scroll at 1366 × 681 |

### 6.3 Reference CSS
```css
.intro-wrap { background: radial-gradient(ellipse at 50% 40%, #1b1143 0%, #09051c 100%);
  align-items:center; padding:24px 16px 40px; overflow-y:auto; min-height:100%; font-family:'Fredoka','Quicksand',sans-serif; }
.journey-card { max-width:860px; width:100%; padding:16px 26px; border-radius:20px; }
.journey-steps-container { display:flex; align-items:center; justify-content:space-between; width:100%; gap:0; }
.journey-step-item { flex:1 1 0; min-width:0; display:flex; align-items:center; justify-content:center; gap:10px; }
.journey-item-title { white-space:nowrap; font-size:clamp(.72rem,1.1vw,1.05rem); font-weight:800; }
.journey-item-desc  { font-size:clamp(.66rem,.9vw,.8rem); display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.journey-arrow { flex:0 0 auto; }
.intro-cta-main { border-radius:18px; padding:16px 44px; font-size:1.2rem; background:linear-gradient(180deg,#fbb03b,#f59e0b); color:#18181b; }
.intro-bottom-cards { display:flex; gap:13px; justify-content:center; flex-wrap:wrap; }
.bottom-card { flex-direction:row; width:auto; border-radius:999px; padding:9px 16px; gap:8px; }
```

### 6.4 One-line phase names (S1) and mobile behaviour
Names are `white-space:nowrap`, never truncated from 320 px up; descriptors ≤ ≈ 22 chars, two-line clamp, equal item height. ≥ 641: one row, icon beside text, arrows visible. ≤ 640: one row, icon above name, arrows and descriptors hidden, names `clamp(10.5px, 3.2vw, 15px)`, icon 28 px. ≤ 380: page padding 12, card padding 8, item gap 0 (the longest name "Simulate" fits ≈ 56 px per item at 320); below 340 icons may hide. The page scrolls vertically (`overflow-y:auto`) when the viewport is shorter than the content (Home only; the single-screen rule S5 applies to Simulate).

### 6.5 Screenshot defects not to reproduce
The screenshot's three-line "Simulate" descriptor misaligns the row. Use the clamped equal-height items above.

## 7. Practice Phase — World Map

Follows screenshot 2 (blueprint §7). The question screen, feedback overlay and boss modal stay as in the zip.

### 7.1 Structure
Glass card → title row (left: **`Scale Factor Game Worlds`** in mint over `10 Themed Worlds · Need 4/10 Correct to Unlock Next World`; right: star pill `⭐ n / 30`) → centred teal accent line at the top edge → 5 × 2 world grid → buttons. World card: `W{n}` (top-left), `Q{a}–{b}` (top-right), icon (🔒 locked), name, status (`Play →` / `Locked` / `Ready` / stars + `n/10`). Buttons: `👑 Boss Battle: {current boss}` and `📓 Jump to Reflect Phase →`. Clicking the current card enters it.

### 7.2 Measurements at 1361 × 654 *(screenshot, ±3 px; blueprint values)*

| Element | Box / size | Style |
|---|---|---|
| Card | x 209–1157 (**≈ 948 w**), y 131–593 | fill ≈ `#131432`, border ≈ `#262745`, radius ≈ 22 |
| Accent line | ≈ 65 × 3 px at top + 20, centred | `#08bd88` |
| Title | left padding ≈ 25; baseline ≈ y 184 | Fredoka 900 ≈ 24 px `#1fda96` |
| Subtitle | y ≈ 211 | ≈ 14 px / 700 `#a4a8c5` |
| Star pill | x 1037–1132 (≈ 95 × 34) | fill ≈ `#0c0d21`, star `#fdcb38`, text ≈ 14 px / 800 `#eeefff` |
| World grid | y 239–521; 5 columns × 2 rows; gaps ≈ 13 / 14 | — |
| World card | ≈ 134 h; padding ≈ 10 × 12; radius ≈ 14 | locked fill ≈ `#181736`, border `1px rgba(255,255,255,.08–.1)`, content ≈ 55–60 % opacity |
| `W{n}` badge | ≈ 28 × 18 | fill ≈ `#201f3e`, ≈ 11–12 px / 800 `#edeeff` |
| `Q` range | top-right | ≈ 11–12 px / 800 `≈ #3bb0e8` (current: mint) |
| Icon / name / status | ≈ 28 px / ≈ 14 px 800 `≈ #d3d0ed` / ≈ 12 px (`Locked` `≈ #6c6f93`, `Play →` `#18cb89` 800) | — |
| Current card | — | border `1.5px #1fda96`, fill ≈ `#101532` |
| Buttons | y 538–569; gap ≈ 12; grid-to-button gap ≈ 17 | Boss: gold `#f3c563`, border `rgba(255,193,7,.5)`; Reflect: `#a8aec8`, border `rgba(255,255,255,.12)`; fill ≈ `#22223e`; ≈ 13 px / 800 |

### 7.3 Reference CSS
```css
.play-map-card { width:100%; max-width:950px; padding:24px 25px; border-radius:22px; background:#131432; border:1px solid #262745; position:relative; }
.play-map-card::before { content:''; position:absolute; top:20px; left:50%; transform:translateX(-50%); width:65px; height:3px; border-radius:999px; background:#08bd88; }
.play-map-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-top:22px; }
.play-map-title { font-family:var(--font-display); font-weight:900; font-size:1.5rem; color:#1fda96; }
.play-map-sub   { font-size:.9rem; font-weight:700; color:#a4a8c5; }
.play-star-pill { background:#0c0d21; border-radius:999px; padding:7px 16px; font-weight:800; font-size:.9rem; }
.world-grid { display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:14px 13px; margin-top:16px; }
.world-card { height:134px; padding:10px 12px; border-radius:14px; background:#181736; border:1px solid rgba(255,255,255,.09); display:flex; flex-direction:column; align-items:center; text-align:center; }
.world-card.locked  { opacity:.6; cursor:not-allowed; }
.world-card.current { border:1.5px solid #1fda96; background:#101532; }
.world-actions { display:flex; gap:12px; justify-content:center; margin-top:17px; flex-wrap:wrap; }
```
≤ 768: 3 columns; ≤ 480: 2 columns; cards auto height.

### 7.4 Behaviour
- **Unlock rule:** world *n + 1* unlocks when world *n* is scored **≥ 4 of 10**. Reducer state gains `unlocked: boolean[10]` (`unlocked[0] = true`) and `attempt: number[10]`. `COMPLETE_WORLD {id, score}` sets stars via `calcStars`, sets `unlocked[id+1] = score >= 4`; **below 4**, the UI offers **Replay** and dispatches `REPLAY_WORLD {id}` → `attempt[id]++`, `LOAD_QUESTIONS` with `generateWorld(id, seed + attempt[id])` (fresh questions). Unit test: scores 3 (locked), 4 (unlocked), 10 (unlocked, 3 stars); replay yields ≥ 8 of 10 different `questionText` values.
- **Stars:** 0–3 per world, total 0–30 (`calcStars` ≥ 9 → 3, ≥ 7 → 2, ≥ 5 → 1).
- **Boss button** targets the current world's boss; **Jump to Reflect Phase** dispatches `SET_PHASE: reflect`.

### 7.5 Screenshot defects not to reproduce
Equal columns (`minmax(0,1fr)`) with full card padding; the zip's Home button (§1.19); the zip's header (§5.3).

## 8. Reflect Phase — Stepped (S2, S6)

Reuses the zip's classes (`reflect-card`, `reflect-badge`, `reflect-title`, `reflect-quiz-container`, `reflect-opt-btn`, `reflect-journal`, `quick-insert-btn`, `trophy-card`).

| Step | ScaleQuest content | Interaction |
|---|---|---|
| 1a · Quick check (M-ADD) | rectangle 4 × 6 and three drawn-to-scale copies **8 × 12, 8 × 10, 6 × 8**; prompt `Tap the scaled copy.` | tap a shape (SVG hit areas ≥ 48 px, labelled buttons) |
| 1b · Quick check (M-INVERT) | photo (4 cm) and poster (12 cm), labelled sides; `Tap the length you divide by to get k.` | tap a side; right = 4 cm (the object) |
| 1c · Quick check (M-REV-SAME, M-ADD) | `What takes the poster back to the photo?` | three `reflect-opt-btn`: `× 3`, `× 1/3`, `− 8` |
| 2 · Think it over | `Jack added the same amount to every side. In your own words, why does that change the shape, and what should he do instead?` | chips `It stretches some sides more…`, `Multiply every side by k…`; textarea |
| 3 · Scorecard | three stat tiles, `⭐ n / 30`, closed **Badges unlocked (n)**, Play Again, Home | — |

Rules: card max 760 (trophy 620), padding `clamp(20px,3.5vw,32px)`, gap 18; mascot `sm` 48 px, hidden when viewport height < 600; **sticky bottom action bar** (Back/Next, min-height 52, safe-area padding); "Step n of 3" indicator (12 px dots, active 28 px); ≤ 5 interactive controls per step; body ≥ 16 px; targets ≥ 48 × 48; no nested scroll; steps 1–2 fit 360 × 640; focus moves to each step heading; `aria-live="polite"`; one short star animation (none under reduced motion); Reflect reachable in one tap (header, map button, Practice-complete card). Reflect CSS: blueprint Appendix A.2 unchanged. Reflect uses the reduced phone bottom padding (§5.9).

## 9. Responsive System (S3, S5)

Principle: desktop (≥ 1024 px) matches the zip's rendered values; mobile extends the zip's rules with the additions below. Verified in the prototype from 320 × 568 to 1920 × 1080, portrait and landscape (§5.8, §5.9).

1. **Heights:** `100dvh` everywhere; `--header-h` drives `.phase-content`; safe-area insets on the header, sticky bars and bottom padding.
2. **Header:** compaction at ≤ 1100 px (not 768), Home text hidden ≤ 540, dividers hidden ≤ 359 (§5.9).
3. **Home:** §6.4. **Map grid:** 5 / 3 / 2.
4. **Single-screen frames (S5):**
   - **Wonder** — never scrolls or clips at the 15 matrix sizes (§5.8).
   - **Simulate** — the frame is a fixed-height column: `sim-tabs` → `station-wrap` (`micro-head`, `micro-body`) → `sim-footer`. `micro-body` is a CSS grid whose **stage row is the flexible one** (`minmax(0,1fr)`) and whose side column is content-sized: guide text, dock, actions. **No element in the card has `overflow:auto|scroll`** (the zip's `overflow-y:auto` at ≤ 768 is removed from `.station-wrap`, `.sim-station-area`, `.station-grid-2col`; `overflow:hidden` stays only on `.micro-stage`).
   - **Layouts:** portrait phones/tablets (≤ 768, and any portrait): stage over side. ≥ 769 and landscape with `max-height:500px`: stage left (1.15 fr), side right (1 fr). The older collapsible side panel and `data-stack-below` mechanism are **not used**.
   - **Phone tabs:** icon + letter A–D (`data-letter`), full names ≥ 541 px.
   - **Instruction budget:** ≤ 25 words, 14.72 px/700; the side column is sized for 5 lines at 320 px (guide 103 px) and the stage keeps its height.
   - **Stage floor:** ≥ 150 px (the test asserts it). Measured stage heights: 320 × 568 → 294 × 166; 360 × 640 → 334 × 236; 640 × 360 → 323 × 172; 844 × 390 → 423 × 186; 1366 × 681 → 556 × 468; 1920 × 1080 → 555 × 854.
5. **Touch:** `touch-action: manipulation` on buttons/steppers; `touch-action:none` only on draggable elements and `input[type=range]` in the dock; targets ≥ 48 × 48 in stations (tab and footer buttons keep their look; invisible `::after` hit areas of `inset:-8px -2px`).
6. **Drag** uses Pointer Events with tap-to-select-then-tap and keyboard equivalents (§10.2).
7. **Visual scale (`useVisualScale`):** `ScaleStage` computes `scale = renderedWidth / viewBoxWidth`; label font-size in user units is `max(baseSize, 12 / scale)`, so rendered labels are ≥ 12 px. SVG `viewBox` is fitted to the model's bounding box plus padding, `preserveAspectRatio="xMidYMid meet"`.
8. **No horizontal overflow** at any width; the dock's readout never wraps (`white-space:nowrap`, `micro-dock` is `min-width:0` on the slider).
9. ⚠ **Viewport meta:** remove `maximum-scale=1.0, user-scalable=no` (pending sign-off).

## 10. Simulate Stations (S4, S5, S6)

### 10.1 Shell and frame
`SimulatePhase` keeps the zip's `sim-card`, tab bar (icon + name; ✅ when done; locked until the previous station is complete) and footer (← Previous Station / progress dots / Next Station →, becoming **Practice! 🎮** once all are complete). Reducer actions are unchanged (`COMPLETE_SIM_STATION`, `ADVANCE_SIM_STATION`). A station is complete when its **last micro-screen** is complete. Tabs carry `data-letter="A|B|C|D"`. Micro-screen progress lives in station-local state: `{ step, round, flags }`.

`StationFrame` (shared by all four stations) renders exactly:
```
<div class="station-wrap">
  <div class="micro-head"> <h2 class="station-title">…</h2> <span class="micro-count">n / total</span> </div>
  <div class="micro-body">
    <div class="micro-stage"> <ScaleStage …/> </div>
    <div class="micro-side">
      <div class="station-guide-card"><p class="station-guide-text">…≤ 25 words…</p></div>
      <div class="micro-dock"> …THE ONE MANIPULATOR (data-manipulator) + .micro-readout… </div>
      <div class="micro-actions"><button>Reset</button><button>Next ▸</button></div>
    </div>
  </div>
</div>
```
`StationFrame` props: `{ title, n, total, instruction, stage, dock, onReset, onNext, nextEnabled, success }`. The `success` state replaces the guide text with the zip's `station-success` panel (same box, so the frame does not change size).

### 10.2 Rules enforced by tests (§12.9, §12.21, §12.22)
- No option component or quiz renderer imported under `components/simulations/`.
- Concept Discovery Lab (A): no questions, scoring, timer or confirmation; completion by exploration flags.
- Every micro-screen has **exactly one element with `data-manipulator`** (a range input, a draggable handle, a draggable line end, a scrubber, or the diagram's tap targets treated as one group) and ≤ 4 interactive controls in total (manipulator, Reset, Next, and the footer ones do not count). Wonder strip: 2 toggles + CTA (the two toggles are one manipulator group). Each Reflect step: ≤ 5.
- **Input equivalence:** *slider/dial* — native `<input type=range>` (arrows, Home/End, PageUp/Down); *draggable handle* — `usePointerDrag` (Appendix A.1), tap-to-select-then-tap on a grid point, and keyboard (Enter/Space picks up, arrows move one grid step, Shift+arrow five, Enter drops, Esc cancels), with an `aria-live="polite"` region and `aria-valuetext` such as "corner at 12 by 9"; *scrubber* — range input; *tap targets* — real `<button>`s over SVG regions with `aria-label`s.
- Reduced motion → instant moves, brief fade.

### 10.3 `utils/scaleMath.js` (single source of truth)
Exact fractions `{n, d}` (d > 0, reduced).

| Function | Purpose |
|---|---|
| `frac(n, d=1)`, `eq(a, b)`, `add`, `sub`, `mul`, `div`, `cmp`, `isInt` | exact arithmetic |
| `fmt(f, {decimal})` | "3", "1/3", or "0.5" for display |
| `scaleLength(len, k)` | `len · k` |
| `scalePoint(p, k, pin=[0,0])` | `pin + k·(p − pin)` |
| `scaleShape(points, k, pin)` | map each vertex |
| `ratio(a, b)` | `b / a` as a fraction |
| `isScaledCopy(objSides, imgSides)` | all `img_i / obj_i` equal and > 0 |
| `scaleFactor(obj, img)` | `img / obj` (image ÷ object) |
| `reverseK(k)` | `1 / k` |
| `compose(k1, k2)` | `k1 · k2` |
| `fromScale(n)` | `1 : n` → `k = n` (drawing → real); `toDrawing = real ÷ n` |
| `cmToM(x)`, `mToCm(x)` | unit conversion (×/÷ 100) |
| `perimeterFactor(k)`, `areaFactor(k)` | `k`, `k²` |
| `additiveImage(sides, n)` | the M-ADD "copy" used in A3/D1/Wonder |

### 10.4 Station and micro-screen specifications
Stage coordinates are model units (grid cells); `ScaleStage` draws grid, **object** (`#9c7fd8`), **image** (`#ffc107`), pin (small dot + label "pin"), rays (dashed, from the pin through matching points) and side labels from the same model object (§1, module risk).

**A · Scale Machine 🎚️ — Concept Discovery Lab (free-play).**

| ID | Manipulator and range | Model and live feedback | Completion flags |
|---|---|---|---|
| A1 | `range` k 0.25–4, step 0.25 (default 1) | 3-4-5 right triangle with pin at the lower-left vertex; image scales with a spring; rays extend; labels `3 → 3k`, `4 → 4k`, `5 → 5k` | `sawGrow` (k>1), `sawShrink` (k<1), `sawSame` (k=1) |
| A2 | one draggable corner of the image rectangle, snap 0.5 | object 4 × 3; live `w ÷ 4` and `h ÷ 3`; image turns green and a "✓ equal" tag (plus text, not colour only) when `w/4 = h/3` | `foundEqual`, `sawUnequal` |
| A3 | `range` k 1–4, step 0.5 | 3-4-5 triangle; **add-copy** (3k, 3k+1, 3k+2 — sides all +(3k−3)) and **multiply-copy** (3k, 4k, 5k) drawn side by side; the add-copy visibly skews | `reachedK3` (k ≥ 3), `visitedK2` (6-7-8 vs 6-8-10) |

**B · Poster Press 🖨️ — Build-to-Target.**

| ID | Manipulator | Targets (checked with `eq`, exact) | Feedback |
|---|---|---|---|
| B1 | `range` k 0.25–4, step 0.25 | R1 4×2 → k = 2 (8×4); R2 k = 1/2 (2×1); R3 k = 3/2 (6×3) | image over dashed ghost; outline green on match; "lock" stamp; retries free |
| B2 | one draggable vertex at a time (snaps to grid), pin at origin | R1 triangle (1,1),(3,1),(1,2) with k = 2 → (2,2),(6,2),(2,4) (3 placements); R2 square (1,1),(2,1),(2,2),(1,2), k = 3 → place (3,3) and (6,6); remaining corners auto-complete (2 placements) | a ray from the pin through each object vertex shows where the image vertex must lie; live ratio; snap + lock |
| B3 | draggable line end on a ruler (snap 0.5 cm) | R1 1 cm : 2 m, 8 m → 4 cm; R2 1 cm : 5 m, 15 m → 3 cm; R3 1 cm : 50 cm, 250 cm → 5 cm | drawing length and real length update together; lock stamp |

**C · Model Maker 🛠️ — Composite (2 rounds × 3 steps; each step locked until the previous is complete).**

| ID | Manipulator | Round 1 | Round 2 |
|---|---|---|---|
| C1 | dial k, step 0.05 | object sides 4, 6, 8; image DE = 10 → **k = 2.5** | sides 8, 12, 16; image 4 → **k = 1/2** |
| C2 | draggable side handle, snap 0.5 | next image side: 6 × 2.5 = **15** (EF) | 12 × 1/2 = **6** |
| C3 | draggable *object* side handle (works backwards) | image DF = 20 → object AC = 20 ÷ 2.5 = **8** | image longest 8 → object **16** (8 ÷ ½) |

**D · Scale Inspector 🕵️ — Error-Detective (2 rounds × 3 screens).**

| ID | Manipulator | Round 1 (M-ADD) | Round 2 (M-INVERT) |
|---|---|---|---|
| D1 | `range` scrubber over a replayed flawed working | 3-4-5 "scaled by 2" shown as +2 → 5, 6, 7 | "enlarged from 4 to 12" shown as k = 4 ÷ 12 = 1/3 → the shape shrinks |
| D2 | tap on the diagram (one target group) | the added **+2 strips** on each side (wrong tap → shake + reason) | the **fraction** `4 over 12` (swapped) |
| D3 | R1: drag one corner (the whole copy follows from the pin); R2: `range` k | reach **6, 8, 10** (k = 2) | reach **k = 3** |

Gates: D1 requires playing to the end and pausing on ≥ 2 steps; D2 requires the exact fault; D3 re-runs the check (`isScaledCopy`) and shows the result.

**Completion → reducer:** station A completes when all flags of A1–A3 are set; B when B1 (3 rounds), B2 (2) and B3 (3) are done; C when C3 of round 2 is done; D when D3 of round 2 is done. Approximate times: A ≈ 3, B ≈ 4, C ≈ 5, D ≈ 5 min.

## 11. Gamification and Audio

**Gamification:** `calcXP(attempts, hints, streak)` base 12 / 8 / 5 by attempt, −2 per hint, +5 at streak ≥ 3, +10 at ≥ 5, floor 2; `calcStars` ≥ 9 → 3, ≥ 7 → 2, ≥ 5 → 1 (unchanged). **Badges** (`badgeEngine.js` triggers unchanged; display strings renamed — the zip's ids `first_coin, hot_streak, super_streak, change_champ, district_champ, boss_slayer, century_scorer, money_master` map to): **First Scale-Up**, **Ratio Rhythm**, **Perfect Proportion**, **Workshop Whiz**, **Scale Star**, **Glitch Buster**, **Twenty-Times Tinkerer**, **Scale Master**. Ids are renamed to `first_scale, ratio_rhythm, perfect_proportion, workshop_whiz, scale_star, glitch_buster, twenty_tinkerer, scale_master`. Practice modes: Guided 5Q (hints, untimed), Independent 10Q (no hints), Timed 8Q / 60 s, Boss 5Q / 3 lives.

**Audio:** ElevenLabs only, voice **Alice** `Xb7hH8MSUJpSbSDYk0k2`, model `eleven_multilingual_v2`, no browser TTS fallback. **One settings table** (stability / similarity / style; speaker boost on) used by both `generate_audio.js` and `hooks/useAudio.js`:

| Preset | Settings |
|---|---|
| statement / instruction | 0.65 / 0.80 / 0.30 |
| question | 0.55 / 0.75 / 0.50 |
| encouragement | 0.50 / 0.85 / 0.60 |
| emphasis | 0.75 / 0.90 / 0.20 |
| thinking | 0.70 / 0.78 / 0.40 |
| celebration | 0.45 / 0.85 / 0.80 |

Every question and hint is narrated (dynamic path cached by text hash); Wonder narration starts after **Begin Your Journey** (title, display, both question lines, mascot line, one line per toggle result); the audio toggle sits beside the pill (§5.3). **Spoken-form function (`narration.js` `speak(text)`):** `×` → "times", `÷` → "divided by", `−` → "minus", `k` → "scale factor" on first use per world then "k", `k = 3` → "the scale factor is three", `1 : 50` → "one to fifty", `1/3` → "one third", `3/4` → "three quarters", `cm` → "centimeters", `m` → "meters", `cm²` → "square centimeters", `➔` → "becomes". The same function is used in the generator's `narrationText` so on-screen and spoken text stay 1:1.

## 12. Build, QA, and Delivery

1. **Question-bank stress test** (`scripts/stress_test.mjs`): ≥ 300 seeded runs × 100 questions = 30,000. Invariants: no `NaN`/`undefined`/`Infinity` in any field; 4 distinct options; `correctAnswer` appears exactly once; ≥ 9 of 10 distinct stems per world per session; `questionText` ≤ 140; every answer a whole number or an exact fraction/decimal (≤ 1 decimal place); lengths 1–999; World 9 draws from nine families.
2. **Independent-oracle audit** (`scripts/oracle.mjs`): re-derives every answer from `visualData.model` using its own integer-fraction code **with no import of `scaleMath.js`** and cross-multiplication instead of division; compares with `correctAnswer`.
3. **Distractor-provenance audit:** every option other than the correct one appears in `meta.distractors` with an ID in the registry (§4.3).
4. **Degenerate-case audit:** k = 1, k = 0.5 boundary, unit edge cases (cm ↔ m), 1 : n with n = 1000, area at k = 1/2, perimeter at k = 1; none yields an ill-posed question.
5. **Module-specific audits:** (a) **draw-vs-number** (`draw_vs_number.spec.mjs`): for every visual-type question and every station model, parse rendered SVG polygon side lengths and require agreement with the model within 0.01 grid units and the printed labels; (b) `story_check.mjs` for the §4.2 literals; (c) round-trip: `reverseK(k)·k = 1` for every factor in the bank; (d) Wonder's 12 × 11 / 12 × 9 values from `scaleMath.js`.
6. **S1 Home test** (Playwright, widths 320, 340, 360, 375, 390, 412, 600, 640, 768, 1024, 1280, 1366, 1440, 1920): the five `.journey-item-title` render on one line, share a top (±1 px), do not overflow, no ellipsis, no horizontal overflow; real fonts.
7. **S2 Reflect test:** 360 × 640, 390 × 844, 768 × 1024, 1280 × 800: steps 1–2 fit at 360 × 640; ≤ 5 controls per step; controls ≥ 48 × 48; body ≥ 16 px; no overlaps; focus on each step heading; Reflect reachable in one tap.
8. **S3 device matrix:** 320×568, 360×640, 390×844, 412×915, 768×1024, 1024×768, 844×390, 1280×800, 1366×681, 1920×1080 (plus 640×360 and 667×375 for landscape phones): full journey, no horizontal overflow, no clipped controls; every station completed **touch-only**, **mouse-only** and **keyboard-only**.
9. **S4 interactivity audit:** the build fails if `components/simulations/` imports the option component or quiz renderer; walkthrough confirms manipulation-driven stations and a question-free station A.
10. **Layout-anchor fidelity (Home, Practice map):** 1366 × 681 and 1361 × 654, bounding boxes against §6.2 / §7.2 within ±4 px (chip, title, bubble, journey card ≈ 860 w, CTA ≈ 272 × 57, chips row; map card ≈ 948 w, 5 equal columns, buttons row). Screenshots under `tests/reference/` if supplied.
11. **Token-parity test:** computed styles of `body`, `.glass-card`, `.btn-primary`, `.sim-tab.active`, `.progress-bar-pill`, `.reflect-card` equal the zip's; every `var(--x)` used in CSS is defined in `:root`.
12. **Reduced-motion and performance:** no springs under `prefers-reduced-motion`; ≈ 50 fps or better for the heaviest drag (B2 vertex drag, A2 corner drag) under 4× CPU throttle.
13. **Audio parity:** every narrated string has an `audioMap` entry or is intentionally dynamic; runtime voice settings equal the §11 table.
14. **Full-journey walkthrough:** Home → Wonder → Story (4 panels) → Simulate (4 stations, 18 micro-screens) → Practice (map, unlock rule, replay, all four modes, 10 bosses, badges) → Reflect (3 steps) with zero console errors.
15. **Production build:** `npm install && npm run build` from a clean extract.
16. **Accessibility:** axe-core, no serious/critical issues; non-colour cues (✓/✗ marks and "equal"/"not equal" words); announcements; visible focus.
17. **Delivery:** zip excludes `node_modules/` and `dist/`; four story placeholders + art-brief README; branding cleaned (§1.10, §1.12); `.env.local.example` documents `VITE_ELEVENLABS_API_KEY`.
18. **Locale-neutrality audit (G1)** (`scripts/locale_audit.mjs`): fails if any file under `src/`, `public/`, `index.html`, `README.md` or the audio `phrases` array contains a deny-list term. **Deny-list:** the blueprint seed (`Singapore`, `Singaporean`, `MOE`, `HDB`, `CCA`, `S$`, `SGD`, `Singlish`, `Secondary [0-9]`, `Primary [0-9]`, `Sec [0-9]`, `Year [0-9]`, `Class [0-9]`) **plus** framework and level names (`CBSE`, `NCERT`, `GCSE`, `IGCSE`, `Cambridge`, `Common Core`, `Key Stage`, `KS[0-9]`, `Stage [0-9]`, `Standard [0-9]`), the clone source's names (`Oliver`, `Emma`, `Penny`, `Piggy`, `MoneyQuest`), currency/money leftovers (`\bcoins?\b`, `¢`, `\$`, `\bcents?\b` — word-bounded so that "centimeters" is not flagged), non-US spellings (`centre`, `metre`, `colour`, `maths`, `programme`) and variant terms (`dilat`, `pre-image`, `enlargement of`). It also checks that every name in `characters.config.js` and `data/names.js` is on the module's English first-name list and that level labels are Intellia grades only.
19. **Navbar fidelity test (M3)** (`nav_fidelity.spec.mjs`): at 1366 × 681 and 1920 × 1080 assert header height 56; Home button box within ±4 px of x 16–111, y 8–44; `.header-progress` centred (`left` = 50% ± 2 px) at `top 7`; pill 803 × 48 ± 4; audio toggle 44 × 44 and 12 ± 2 px right of the pill; at 1100 × 700, 768 × 1024, 390 × 844 and 320 × 568 assert the compact geometry of §5.3. At **every width from 320 to 1920** (step 20 plus the 24 widths of the prototype header test) assert no overlap between the Home button and the pill row, and that the row stays inside the viewport.
20. **Wonder and type fidelity test (M1, M2)** (`wonder_fidelity.spec.mjs`, `reference_metrics.json`): at 1366 × 681, 1920 × 1080, 768 × 1024 and 390 × 844 compare computed `font-family` (first family), `font-size` (±0.5 px), `font-weight`, colour of the Wonder icon/title/number/question/bubble/CTA and of the Story title/text, Simulate tab/title/guide/footer button with the §5.2 table; compare the Wonder card box (width 560, padding, radius), the order of slots and their boxes with §5.8 (±2 px; vertical positions shift by the strip's height); assert `.wonder-num` renders on **one line** at ≥ 768 (two lines allowed ≤ 480); fits without scroll or clip at the 15 matrix sizes; the strip contains exactly 2 toggles + the CTA.
21. **S5 Simulate no-scroll test** (`sim_fit.spec.mjs`, adapted from the prototype's `layout_test.mjs`): for every station × micro-screen (18) × matrix size (the 15 prototype sizes): `documentElement.scrollHeight ≤ innerHeight`, no scroll container in `.sim-card`, no clipped descendant, nothing outside the card, `.micro-stage` ≥ 150 px tall and ≥ 200 px wide, `.micro-dock` and `.micro-actions button` do not overlap the footer, action buttons ≥ 48 px tall. The check must be run against the **real stations** (the prototype used placeholder SVG).
22. **S6 one-manipulator audit** (`one_manipulator.spec.mjs`): each of the 18 micro-screens has exactly one `[data-manipulator]`, ≤ 4 interactive controls in `.micro-side` (manipulator, Reset, Next), every drag handle also reachable by keyboard and by tap-to-select-then-tap; Wonder strip and each Reflect step within their budgets.

## 13. Risks

- **Screenshot-derived values are approximate** (Home, Practice map): the two screenshots were not attached. Replace with exact values if supplied.
- **Reference quirks reproduced on purpose** (Nunito Wonder text, Fredoka-700 Story title, 560 px Wonder card). If the reference is later "fixed", `reference_metrics.json` and §12.20 must be updated together or the test will fail.
- **Home button and header changes** (§1.18, §1.19) depart from what the reference renders; sign-off needed (PRD §15.12–15.13).
- **Prototype scope:** layout was verified on placeholder SVG at 15 viewports; real stations with real labels must pass §12.21 before sign-off. Landscape smaller than 640 × 360 is unsupported.
- **Phone bottom-padding reduction** changes spacing on all phases (§1.16).
- **Undefined tokens** reappearing if `design-tokens.css` is re-cloned without the five appended tokens; the token-parity test catches it.
- **Home one-line guarantee** depends on font metrics; rerun §12.6 after any label or font change.
- **Unlock-rule change** (≥ 4/10) affects progression; confirm (PRD §15.8).
- **Reflect creep** — per-step budget (§8) via §12.7.
- **Pointer/scroll conflicts** from `touch-action:none` — only on draggable items and the dock range input.
- **Animation drifting from data** — one source of truth (§4.3) and the draw-vs-number test.
- **Static-station regression** — §12.9.
- **Locale leakage (G1)** — cloned content reappears; the deny-list audit runs in CI and the list is updated when a new sibling is used as a clone source.
- **Direction/correspondence errors** (module risk, §1) — covered by §12.2, §12.5.
- **Curriculum placement uncertainty** (PRD §3.1) — World 8 can be made optional (PRD §15.19) without touching other worlds.
- **Slider precision:** fractional k in B1/C1 must snap to exact fractions (0.25 steps, 0.05 steps → `frac(n,20)`), never compared as floats.

---

## Appendix A — Reference Code (adapt and verify)

### A.1 `usePointerDrag`
```js
import { useRef } from "react";
export function usePointerDrag({ onStart, onMove, onEnd, threshold = 6 }) {
  const s = useRef(null);
  const down = (e) => { e.currentTarget.setPointerCapture(e.pointerId);
    s.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dragging: false }; };
  const move = (e) => { const st = s.current; if (!st || st.id !== e.pointerId) return;
    const dx = e.clientX - st.x0, dy = e.clientY - st.y0;
    if (!st.dragging && Math.hypot(dx, dy) >= threshold) { st.dragging = true; onStart?.(e); }
    if (st.dragging) onMove?.(e, { dx, dy }); };
  const end = (e, cancelled) => { const st = s.current; if (!st || st.id !== e.pointerId) return;
    s.current = null; e.currentTarget.releasePointerCapture?.(e.pointerId);
    onEnd?.(e, { tap: !st.dragging, cancelled }); };
  return { onPointerDown: down, onPointerMove: move,
    onPointerUp: (e) => end(e, false), onPointerCancel: (e) => end(e, true),
    style: { touchAction: "none" } };   // ONLY on draggable elements
}
```

### A.2 Reflect layout CSS
```css
.reflect-wrap { display:flex; flex-direction:column; align-items:center; width:100%;
  min-height:calc(100dvh - var(--header-h,56px)); padding:clamp(14px,2.2vh,26px) 16px 0; }
.reflect-card { width:100%; max-width:760px; padding:clamp(20px,3.5vw,32px); display:flex; flex-direction:column; gap:18px; }
.reflect-actions-sticky { position:sticky; bottom:0; width:100%; max-width:760px; display:flex; gap:12px;
  padding:12px 0 calc(12px + env(safe-area-inset-bottom)); background:linear-gradient(transparent, #0a0a2e 30%); }
.reflect-actions-sticky .btn { flex:1; min-height:52px; touch-action:manipulation; }
.reflect-stat-tiles { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
```

### A.3 Home-screen one-line test (Playwright)
```js
import { test, expect } from "@playwright/test";
const W = [320,340,360,375,390,412,600,640,768,1024,1280,1366,1440,1920];
for (const w of W) test(`home phase names on one line @${w}`, async ({ page }) => {
  await page.setViewportSize({ width: w, height: 800 });
  await page.goto("/"); await page.evaluate(() => document.fonts.ready);
  const r = await page.$$eval(".journey-item-title", els => els.map(el => {
    const g = document.createRange(); g.selectNodeContents(el);
    return { lines: g.getClientRects().length, top: Math.round(el.getBoundingClientRect().top),
      over: el.scrollWidth > el.clientWidth + 1, ell: getComputedStyle(el).textOverflow === "ellipsis" }; }));
  expect(r).toHaveLength(5);
  r.forEach(x => { expect(x.lines).toBe(1); expect(x.over).toBe(false); expect(x.ell).toBe(false); });
  const tops = r.map(x => x.top); expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});
```

### A.4 S5 single-screen check (core of `sim_fit.spec.mjs`)
```js
// run for each [w,h] in the matrix, for each micro-screen
const issues = await page.evaluate(() => {
  const out = [], de = document.documentElement, card = document.querySelector('.sim-card'),
        cr = card.getBoundingClientRect();
  if (de.scrollHeight > innerHeight + 1 || de.scrollWidth > innerWidth + 1) out.push('document scrolls');
  for (const el of card.querySelectorAll('*')) {
    if (el.closest('svg')) continue;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') out.push('scroll container ' + el.className);
    if (el.clientHeight > 0 && el.scrollHeight > el.clientHeight + 1 && cs.overflowY !== 'visible') out.push('clipped ' + el.className);
    if (r.width > 0 && (r.right > cr.right + 1 || r.left < cr.left - 1 || r.bottom > cr.bottom + 1)) out.push('outside card ' + el.className);
  }
  if (document.querySelector('.micro-stage').getBoundingClientRect().height < 150) out.push('stage < 150');
  return out;
});
expect(issues).toEqual([]);
```

### A.5 Header overlap check (core of `nav_fidelity.spec.mjs`)
```js
const g = await page.evaluate(() => {
  const b = s => document.querySelector(s).getBoundingClientRect();
  const home = b('.home-btn'), nav = b('.header-progress');
  return { homeR: home.right, navL: nav.left, navR: nav.right, vw: innerWidth };
});
expect(g.navL).toBeGreaterThanOrEqual(g.homeR + 4);   // no overlap with Home
expect(g.navR).toBeLessThanOrEqual(g.vw);              // row stays inside the viewport
```

### A.6 Independent oracle skeleton
```js
// scripts/oracle.mjs — must NOT import src/utils/scaleMath.js
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const F = (n, d = 1) => { const g = gcd(n, d) || 1; return d < 0 ? [-n / g, -d / g] : [n / g, d / g]; };
const same = ([a, b], [c, d]) => a * d === b * c;            // cross-multiplication
export function solve({ gen, params: p }) {
  switch (gen) {
    case 'findKWhole': return F(p.image, p.object);
    case 'applyFracK': return F(p.object * p.kn, p.kd);
    case 'reverseFactor': return F(p.kd, p.kn);
    case 'mapToReal': return F(p.drawingCm * p.n, p.unit === 'm' ? 100 : 1);
    case 'areaK': return F((p.side * p.kn) ** 2, p.kd ** 2);
    // … one case per generator in §4.3
  }
}
export const check = (q) => same(solve(q.visualData.meta), parse(q.correctAnswer));   // parse() handles "3", "1/3", "0.5", "12 m"
```

---

## Appendix B — Prototype test record (run in this work)

| Check | Matrix | Result |
|---|---|---|
| Wonder fits one screen (no scroll, no clip, not under the header) | 320×568, 360×640, 375×667, 390×844, 412×915, 768×1024, 1024×768, 640×360, 667×375, 844×390, 915×412, 1280×800, 1366×681, 1366×600, 1920×1080 | 15 / 15 pass |
| Simulate frame fits one screen (no scroll container, nothing clipped or outside the card, stage ≥ 150 px, action buttons ≥ 48 px, nothing over the footer) | same 15 sizes | 15 / 15 pass |
| Header: Home and pill row never overlap and stay inside the viewport | 24 widths, 320–1920 | 24 / 24 pass |
| Numbers (Python, exact fractions): story literals, station targets, ten sample questions with named distractors | — | all pass |

Limits: placeholder SVG only; Practice and Reflect were not run in the prototype; Home and Practice-map values are the blueprint's.

## Appendix C — Changelog from the blueprint (v3.1 → ScaleQuest)

- **Added standards:** S5 single-screen Simulate; S6 one element per screen; F1/M1–M3 reference fidelity with run-measured values (§5.2, §5.3, §5.7, §5.8).
- **Changed from the blueprint (flagged):** Wonder card 560 px / Nunito text as rendered (§5.8); Home button pill without the `globals.css` override (§1.19); header compaction at ≤ 1100 (§1.18); phone bottom padding reduced (§1.16); Simulate stations no longer scroll or use a collapsible side panel (§9, §10); Story title weight 700 as rendered (§5.2).
- **Added gotchas:** §1.13–§1.20.
- **Added tests:** §12.19–§12.22.
- **Unchanged:** token set, Home screen structure, Practice-map structure, Reflect structure, gamification and audio rules, S1–S4, G1.
