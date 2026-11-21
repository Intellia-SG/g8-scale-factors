// src/data/questionBank.js
// Procedural question generator for ScaleQuest (10 worlds × 10 questions = 100)

import { WORLDS } from '../config/worlds.config.js';
import { FIRST_NAMES } from './names.js';
import { createRng, randInt, pickRandom } from '../utils/rng.js';
import * as sm from '../utils/scaleMath.js';

export const DISTRICTS = WORLDS.map((w) => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  boss: w.boss,
}));

function makeOptions(correct, distractors, rng) {
  const opts = [String(correct).trim()];
  for (const d of distractors) {
    const s = String(d.value).trim();
    if (!opts.includes(s) && s !== '') {
      opts.push(s);
    }
    if (opts.length === 4) break;
  }

  // Backup distractors if duplicates collapsed
  let fallback = 1;
  while (opts.length < 4) {
    const candidate = `${parseInt(correct, 10) || 10} + ${fallback++}`;
    if (!opts.includes(candidate)) {
      opts.push(candidate);
    }
  }

  // Shuffle options
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }

  return opts;
}

// ── WORLD 0 GENERATORS: Scaled Copy or Not ──
function genPickCopyRect(id, rng) {
  const w = randInt(rng, 2, 5);
  const h = randInt(rng, 2, 4);
  const k = randInt(rng, 2, 4);
  const corrW = w * k;
  const corrH = h * k;
  const corr = `${corrW} cm × ${corrH} cm`;

  const diff = corrW - w;
  const dist1 = `${w + diff} cm × ${h + diff} cm`; // M-ADD
  const dist2 = `${w * k} cm × ${h} cm`; // M-ONESIDE
  const dist3 = `${w + 2} cm × ${h + 2} cm`; // M-ADD (+2)

  const distractors = [
    { value: dist1, misconceptionId: 'M-ADD' },
    { value: dist2, misconceptionId: 'M-ONESIDE' },
    { value: dist3, misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 0,
    category: 'SCALE CHECK',
    visual: 'grid-copy',
    questionText: `Rectangle A is ${w} cm × ${h} cm. Which rectangle is a true scaled copy of A?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match sides: width ${corrW} ÷ ${w} = ${k}, and height ${corrH} ÷ ${h} = ${k}. Both ratios equal ${k}, so it is a true scaled copy.`,
    hint1: `First, check the ratio of length and width for each option.`,
    hint2: `A scaled copy multiplies every side by the exact same scale factor k.`,
    visualData: {
      model: { type: 'rectangle', w, h, targetW: corrW, targetH: corrH, k },
      meta: { gen: 'pickCopyRect', params: { w, h, k }, distractors },
    },
  };
}

function genPickCopyTriangle(id, rng) {
  const a = randInt(rng, 3, 5);
  const b = randInt(rng, 4, 6);
  const c = randInt(rng, 5, 8);
  const k = 2;
  const corr = `${a * k}, ${b * k}, ${c * k}`;

  const dist1 = `${a + k}, ${b + k}, ${c + k}`; // M-ADD
  const dist2 = `${a * k}, ${b * k}, ${c}`; // M-ONESIDE
  const dist3 = `${a + 3}, ${b + 3}, ${c + 3}`; // M-ADD (+3)

  const distractors = [
    { value: dist1, misconceptionId: 'M-ADD' },
    { value: dist2, misconceptionId: 'M-ONESIDE' },
    { value: dist3, misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 0,
    category: 'SIMILAR TRIANGLES',
    visual: 'triangle-pair',
    questionText: `A triangle has sides ${a} cm, ${b} cm, and ${c} cm. Which triangle is a scaled copy?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: divide corresponding sides by ${a}, ${b}, ${c}. Each side is multiplied by k = 2 to get ${corr}.`,
    hint1: `First, test if each side is multiplied by the same number.`,
    hint2: `Adding the same number to each side changes the shape and angles.`,
    visualData: {
      model: { type: 'triangle', sides: [a, b, c], k },
      meta: { gen: 'pickCopyTriangle', params: { a, b, c, k }, distractors },
    },
  };
}

function genWhyNotCopy(id, rng) {
  const corr = 'Side lengths were added instead of multiplied';
  const distractors = [
    { value: 'The scale factor was too large', misconceptionId: 'M-NOTSIM' },
    { value: 'Only one side was measured', misconceptionId: 'M-NONCORR' },
    { value: 'The angle was multiplied by k', misconceptionId: 'M-ONESIDE' },
  ];

  return {
    id,
    districtId: 0,
    category: 'ERROR ANALYSIS',
    visual: 'none',
    questionText: `Jack enlarged a 4 × 3 card to 12 × 11 by adding 8 to both sides. Why is this NOT a scaled copy?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: 12 ÷ 4 = 3, but 11 ÷ 3 is not 3. Scaling requires multiplying every side by the same factor k, never just adding!`,
    hint1: `First, compare the ratios of the widths and the heights.`,
    hint2: `Adding a constant amount distorts the shape because it changes side proportions.`,
    visualData: {
      model: { type: 'card', orig: [4, 3], jack: [12, 11] },
      meta: { gen: 'whyNotCopy', params: {}, distractors },
    },
  };
}

// ── WORLD 1 GENERATORS: Corresponding Sides & Angles ──
function genMatchSide(id, rng) {
  const letters = ['ABC', 'DEF'];
  const sidePairs = [
    { orig: 'BC', match: 'EF', wrong1: 'DE', wrong2: 'DF' },
    { orig: 'AB', match: 'DE', wrong1: 'EF', wrong2: 'DF' },
    { orig: 'AC', match: 'DF', wrong1: 'DE', wrong2: 'EF' },
  ];
  const pair = pickRandom(rng, sidePairs);
  const corr = pair.match;
  const distractors = [
    { value: pair.wrong1, misconceptionId: 'M-NONCORR' },
    { value: pair.wrong2, misconceptionId: 'M-NONCORR' },
    { value: 'Not similar', misconceptionId: 'M-NOTSIM' },
  ];

  return {
    id,
    districtId: 1,
    category: 'MATCHING SIDES',
    visual: 'triangle-pair',
    questionText: `Triangle ${letters[0]} is enlarged to similar triangle ${letters[1]} (A➔D, B➔E, C➔F). Which side corresponds to ${pair.orig}?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: Vertex B maps to E and vertex C maps to F, so side ${pair.orig} corresponds directly to side ${corr}.`,
    hint1: `First, identify which vertex in DEF corresponds to each vertex in ABC.`,
    hint2: `Pair the endpoints of the side in the exact matching vertex order.`,
    visualData: {
      model: { type: 'labels', orig: letters[0], copy: letters[1], side: pair.orig },
      meta: { gen: 'matchSide', params: { pair }, distractors },
    },
  };
}

function genMatchAngle(id, rng) {
  const ang = randInt(rng, 35, 75);
  const corr = `${ang}°`;
  const distractors = [
    { value: `${ang * 2}°`, misconceptionId: 'M-ONESIDE' },
    { value: `${ang + 10}°`, misconceptionId: 'M-ADD' },
    { value: `${Math.round(ang / 2)}°`, misconceptionId: 'M-INVERT' },
  ];

  return {
    id,
    districtId: 1,
    category: 'CORRESPONDING ANGLES',
    visual: 'triangle-pair',
    questionText: `Triangle ABC with angle A = ${ang}° is enlarged by scale factor 3. What is the size of matching angle D?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Check angles: scaling changes lengths by multiplying by k, but corresponding angles remain exactly equal!`,
    hint1: `First, consider what happens to the shape when enlarged.`,
    hint2: `Angles do NOT change when a figure is enlarged or reduced.`,
    visualData: {
      model: { type: 'angle', ang, k: 3 },
      meta: { gen: 'matchAngle', params: { ang, k: 3 }, distractors },
    },
  };
}

function genTurnedCopy(id, rng) {
  const shortSide = randInt(rng, 3, 6);
  const k = randInt(rng, 2, 4);
  const corr = `${shortSide * k} cm`;
  const distractors = [
    { value: `${shortSide + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${shortSide * (k + 1)} cm`, misconceptionId: 'M-OFFBY1' },
    { value: `${shortSide} cm`, misconceptionId: 'M-NONCORR' },
  ];

  return {
    id,
    districtId: 1,
    category: 'ROTATED COPIES',
    visual: 'scale-pair',
    questionText: `A rectangle has shortest side ${shortSide} cm. It is rotated and scaled by k = ${k}. How long is its shortest side now?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: rotation does not affect correspondence. The shortest side ${shortSide} cm multiplies by ${k} to become ${corr}.`,
    hint1: `First, match the shortest side of the original to the shortest side of the copy.`,
    hint2: `Multiply the original length by the scale factor: ${shortSide} × ${k}.`,
    visualData: {
      model: { shortSide, k },
      meta: { gen: 'turnedCopy', params: { shortSide, k }, distractors },
    },
  };
}

// ── WORLD 2 GENERATORS: Find the Factor (k = image ÷ object) ──
function genFindKWhole(id, rng) {
  const obj = randInt(rng, 3, 12);
  const k = randInt(rng, 2, 6);
  const img = obj * k;
  const corr = String(k);

  const distractors = [
    { value: String(img - obj), misconceptionId: 'M-SUBTRACT' },
    { value: `1/${k}`, misconceptionId: 'M-INVERT' },
    { value: String(k + 2), misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 2,
    category: 'FIND SCALE FACTOR',
    visual: 'scale-pair',
    questionText: `A banner ${obj} cm wide is enlarged to ${img} cm wide. What is the scale factor k?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Use formula k = image ÷ object: k = ${img} ÷ ${obj} = ${k}.`,
    hint1: `First, set up the scale factor formula: k = image length ÷ object length.`,
    hint2: `Divide the new length (${img}) by the original length (${obj}).`,
    visualData: {
      model: { object: obj, image: img, k },
      meta: { gen: 'findKWhole', params: { object: obj, image: img, k }, distractors },
    },
  };
}

function genFindKFrac(id, rng) {
  const den = pickRandom(rng, [2, 3, 4, 5]);
  const num = randInt(rng, 1, den - 1);
  const base = randInt(rng, 2, 5);
  const obj = base * den;
  const img = base * num;
  const corr = `${num}/${den}`;

  const distractors = [
    { value: `${den}/${num}`, misconceptionId: 'M-INVERT' },
    { value: String(obj - img), misconceptionId: 'M-SUBTRACT' },
    { value: `1/${den}`, misconceptionId: 'M-COMPLEMENT' },
  ];

  return {
    id,
    districtId: 2,
    category: 'FRACTIONAL SCALE FACTOR',
    visual: 'scale-pair',
    questionText: `A shape side shrinks from ${obj} cm to ${img} cm. What is the scale factor k?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Factor: k = image ÷ object = ${img} ÷ ${obj} = ${img}/${obj} = ${corr}. Since k < 1, it is a reduction.`,
    hint1: `First, write the ratio of the new length to the original length: ${img} / ${obj}.`,
    hint2: `Simplify the fraction ${img}/${obj} to lowest terms.`,
    visualData: {
      model: { object: obj, image: img, kn: num, kd: den },
      meta: { gen: 'findKFrac', params: { object: obj, image: img, kn: num, kd: den }, distractors },
    },
  };
}

function genFindKPair(id, rng) {
  const obj1 = 4;
  const obj2 = 6;
  const k = randInt(rng, 2, 5);
  const img1 = obj1 * k;
  const img2 = obj2 * k;
  const corr = String(k);

  const distractors = [
    { value: String(k + 1), misconceptionId: 'M-OFFBY1' },
    { value: `1/${k}`, misconceptionId: 'M-INVERT' },
    { value: String(img1 - obj1), misconceptionId: 'M-SUBTRACT' },
  ];

  return {
    id,
    districtId: 2,
    category: 'PAIR RATIOS',
    visual: 'scale-pair',
    questionText: `Rectangle A (${obj1} cm × ${obj2} cm) scales to Rectangle B (${img1} cm × ${img2} cm). What is k?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match and Factor: ${img1} ÷ ${obj1} = ${k} and ${img2} ÷ ${obj2} = ${k}. The scale factor is k = ${k}.`,
    hint1: `First, divide each side of B by the matching side of A.`,
    hint2: `Both pairs must yield the exact same multiplier k.`,
    visualData: {
      model: { obj1, obj2, img1, img2, k },
      meta: { gen: 'findKPair', params: { obj1, obj2, img1, img2, k }, distractors },
    },
  };
}

// ── WORLD 3 GENERATORS: Whole-Number Enlargements ──
function genApplyWholeK(id, rng) {
  const name = pickRandom(rng, FIRST_NAMES);
  const obj = randInt(rng, 3, 12);
  const k = randInt(rng, 2, 6);
  const img = obj * k;
  const corr = `${img} cm`;

  const distractors = [
    { value: `${obj + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${obj * (k + 1)} cm`, misconceptionId: 'M-OFFBY1' },
    { value: `${Math.round((obj / k) * 10) / 10} cm`, misconceptionId: 'M-INVERT' },
  ];

  return {
    id,
    districtId: 3,
    category: 'ENLARGE LENGTH',
    visual: 'scale-line',
    questionText: `${name} has a badge design ${obj} cm long. Using scale factor ${k}, what is the new length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Use k: new length = object × k = ${obj} cm × ${k} = ${corr}.`,
    hint1: `First, identify the original length and scale factor k.`,
    hint2: `Multiply original length by scale factor: ${obj} × ${k}.`,
    visualData: {
      model: { object: obj, k, result: img },
      meta: { gen: 'applyWholeK', params: { object: obj, k }, distractors },
    },
  };
}

function genApplyKTwoSides(id, rng) {
  const w = randInt(rng, 3, 8);
  const h = randInt(rng, 2, 6);
  const k = randInt(rng, 2, 4);
  const corr = `${w * k} cm × ${h * k} cm`;

  const distractors = [
    { value: `${w * k} cm × ${h} cm`, misconceptionId: 'M-ONESIDE' },
    { value: `${w + k} cm × ${h + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${w * (k + 1)} cm × ${h * (k + 1)} cm`, misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 3,
    category: 'ENLARGE 2D SHAPE',
    visual: 'grid-copy',
    questionText: `A poster is ${w} cm wide and ${h} cm high. It is enlarged with scale factor ${k}. What are the new dimensions?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Use k on both sides: width = ${w} × ${k} = ${w * k} cm; height = ${h} × ${k} = ${h * k} cm.`,
    hint1: `First, multiply the width by scale factor ${k}.`,
    hint2: `Next, multiply the height by the same scale factor ${k}.`,
    visualData: {
      model: { w, h, k, newW: w * k, newH: h * k },
      meta: { gen: 'applyKTwoSides', params: { w, h, k }, distractors },
    },
  };
}

// ── WORLD 4 GENERATORS: Fractional and Decimal Factors ──
function genApplyFracK(id, rng) {
  const fracPairs = [
    { n: 1, d: 2, str: '1/2', dec: 0.5 },
    { n: 3, d: 4, str: '3/4', dec: 0.75 },
    { n: 2, d: 3, str: '2/3', dec: 0.67 },
    { n: 3, d: 5, str: '3/5', dec: 0.6 },
  ];
  const pair = pickRandom(rng, fracPairs);
  const multiplier = randInt(rng, 3, 8);
  const obj = pair.d * multiplier;
  const img = pair.n * multiplier;
  const corr = `${img} cm`;

  const distractors = [
    { value: `${Math.round((obj * pair.d) / pair.n)} cm`, misconceptionId: 'M-FRACDIV' },
    { value: `${obj - pair.n} cm`, misconceptionId: 'M-SUBTRACT' },
    { value: `${Math.round(obj * (1 - pair.n / pair.d))} cm`, misconceptionId: 'M-COMPLEMENT' },
  ];

  return {
    id,
    districtId: 4,
    category: 'FRACTIONAL REDUCTION',
    visual: 'scale-line',
    questionText: `A ribbon ${obj} cm long is reduced by scale factor ${pair.str}. What is the new length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Use k: new length = ${obj} × ${pair.str} = (${obj} ÷ ${pair.d}) × ${pair.n} = ${corr}.`,
    hint1: `First, divide ${obj} by the denominator ${pair.d}.`,
    hint2: `Then multiply the result by the numerator ${pair.n}.`,
    visualData: {
      model: { object: obj, kn: pair.n, kd: pair.d, result: img },
      meta: { gen: 'applyFracK', params: { object: obj, kn: pair.n, kd: pair.d }, distractors },
    },
  };
}

function genApplyDecimalK(id, rng) {
  const decimals = [0.5, 1.5, 2.5];
  const k = pickRandom(rng, decimals);
  const obj = randInt(rng, 4, 10) * 2;
  const img = obj * k;
  const corr = `${img} cm`;

  const distractors = [
    { value: `${obj + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${Math.round((obj / k) * 10) / 10} cm`, misconceptionId: 'M-INVERT' },
    { value: `${obj * (k + 1)} cm`, misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 4,
    category: 'DECIMAL SCALING',
    visual: 'scale-line',
    questionText: `A sticker is ${obj} cm wide. If scaled by k = ${k}, what is the new width?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Use k: new width = ${obj} × ${k} = ${corr}.`,
    hint1: `First, multiply the original length by the decimal factor.`,
    hint2: `${obj} multiplied by ${k} equals ${img}.`,
    visualData: {
      model: { object: obj, k, result: img },
      meta: { gen: 'applyDecimalK', params: { object: obj, k }, distractors },
    },
  };
}

function genDescribeK(id, rng) {
  const kVal = pickRandom(rng, ['0.8', '1.4', '1.0', '1/4', '5/3']);
  let corr = 'Reduces (shrinks)';
  if (kVal === '1.0') corr = 'Stays exact same size';
  else if (parseFloat(kVal) > 1 || kVal === '5/3') corr = 'Enlarges (grows)';

  const distractors = [
    { value: 'Changes angles only', misconceptionId: 'M-NOTSIM' },
    { value: 'Adds lengths together', misconceptionId: 'M-ADD' },
    { value: corr === 'Enlarges (grows)' ? 'Reduces (shrinks)' : 'Enlarges (grows)', misconceptionId: 'M-INVERT' },
  ];

  return {
    id,
    districtId: 4,
    category: 'EFFECT OF K',
    visual: 'none',
    questionText: `What effect does a scale factor of k = ${kVal} have on an object?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `When k > 1, the shape enlarges. When k < 1, it reduces. When k = 1, it stays the exact same size.`,
    hint1: `First, check whether k is greater than 1, equal to 1, or less than 1.`,
    hint2: `Factors under 1 shrink; factors over 1 grow.`,
    visualData: {
      model: { kVal, effect: corr },
      meta: { gen: 'describeK', params: { kVal }, distractors },
    },
  };
}

// ── WORLD 5 GENERATORS: Missing Sides ──
function genMissingForward(id, rng) {
  const obj1 = randInt(rng, 3, 6);
  const obj2 = randInt(rng, 4, 8);
  const k = randInt(rng, 2, 4);
  const img1 = obj1 * k;
  const img2 = obj2 * k;
  const corr = `${img2} cm`;

  const distractors = [
    { value: `${obj2 + (img1 - obj1)} cm`, misconceptionId: 'M-ADD' },
    { value: `${obj1 * k} cm`, misconceptionId: 'M-NONCORR' },
    { value: `${Math.round((obj2 / k) * 10) / 10} cm`, misconceptionId: 'M-INVERT' },
  ];

  return {
    id,
    districtId: 5,
    category: 'MISSING SIDE FORWARD',
    visual: 'triangle-pair',
    questionText: `Two similar triangles have matching sides ${obj1} cm and ${img1} cm. The second side of the smaller is ${obj2} cm. Find the matching larger side.`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: ${obj1} ➔ ${img1} gives factor k = ${img1} ÷ ${obj1} = ${k}. Use: matching side = ${obj2} × ${k} = ${corr}.`,
    hint1: `First, calculate the scale factor from the known pair: ${img1} ÷ ${obj1}.`,
    hint2: `Multiply the second side by that scale factor: ${obj2} × ${k}.`,
    visualData: {
      model: { obj1, img1, obj2, img2, k },
      meta: { gen: 'missingForward', params: { obj1, img1, obj2, img2, k }, distractors },
    },
  };
}

function genMissingBackward(id, rng) {
  const k = randInt(rng, 2, 4);
  const obj = randInt(rng, 3, 7);
  const img = obj * k;
  const corr = `${obj} cm`;

  const distractors = [
    { value: `${img - k} cm`, misconceptionId: 'M-ADD' },
    { value: `${img * k} cm`, misconceptionId: 'M-OFFBY1' },
    { value: `${img - 2} cm`, misconceptionId: 'M-SUBTRACT' },
  ];

  return {
    id,
    districtId: 5,
    category: 'MISSING SIDE BACKWARD',
    visual: 'scale-pair',
    questionText: `A large badge has side ${img} cm, enlarged from an original by scale factor ${k}. What was the original side length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Work backwards: original length = image ÷ k = ${img} ÷ ${k} = ${corr}.`,
    hint1: `First, undo the enlargement by dividing by the scale factor.`,
    hint2: `${img} divided by ${k} gives the original length.`,
    visualData: {
      model: { obj, img, k },
      meta: { gen: 'missingBackward', params: { obj, img, k }, distractors },
    },
  };
}

function genMissingSecond(id, rng) {
  const k = 3;
  const s1 = 4;
  const s2 = 7;
  const corr = `${s2 * k} cm`;
  const distractors = [
    { value: `${s2 + (s1 * k - s1)} cm`, misconceptionId: 'M-ADD' },
    { value: `${s1 * k} cm`, misconceptionId: 'M-NONCORR' },
    { value: `${s2 * 2} cm`, misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 5,
    category: 'PROPORTIONAL SIDES',
    visual: 'triangle-pair',
    questionText: `Similar figures have side pair 4 cm ➔ 12 cm. What does a side of 7 cm become?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Factor: k = 12 ÷ 4 = 3. Use: 7 × 3 = 21 cm.`,
    hint1: `First, find k by dividing 12 by 4.`,
    hint2: `Multiply 7 by k = 3.`,
    visualData: {
      model: { s1, s2, k },
      meta: { gen: 'missingSecond', params: { s1, s2, k }, distractors },
    },
  };
}

// ── WORLD 6 GENERATORS: Reverse and Combine ──
function genReverseFactor(id, rng) {
  const k = randInt(rng, 2, 6);
  const corr = `1/${k}`;
  const distractors = [
    { value: String(k), misconceptionId: 'M-REV-SAME' },
    { value: `-${k}`, misconceptionId: 'M-NEGATE' },
    { value: String(k - 1), misconceptionId: 'M-SUBTRACT' },
  ];

  return {
    id,
    districtId: 6,
    category: 'REVERSE FACTOR',
    visual: 'none',
    questionText: `An image is enlarged by scale factor ${k}. What scale factor reduces it back to the original?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Reverse factor: the inverse of multiplying by ${k} is multiplying by the reciprocal 1/${k}.`,
    hint1: `First, think what number multiplies by ${k} to give 1.`,
    hint2: `The reverse of scale factor k is always 1/k.`,
    visualData: {
      model: { k, rev: corr },
      meta: { gen: 'reverseFactor', params: { k }, kn: 1, kd: k, distractors },
    },
  };
}

function genCombineFactors(id, rng) {
  const k1 = randInt(rng, 2, 3);
  const k2 = randInt(rng, 2, 4);
  const total = k1 * k2;
  const corr = String(total);

  const distractors = [
    { value: String(k1 + k2), misconceptionId: 'M-ADD' },
    { value: String(total + 1), misconceptionId: 'M-OFFBY1' },
    { value: `1/${total}`, misconceptionId: 'M-INVERT' },
  ];

  return {
    id,
    districtId: 6,
    category: 'COMBINE FACTORS',
    visual: 'none',
    questionText: `A shape is first enlarged by scale factor ${k1}, then that copy is enlarged by scale factor ${k2}. What is the overall scale factor?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Combine: successive scaling multiplies the factors: ${k1} × ${k2} = ${total}. Factors multiply, never add!`,
    hint1: `First, remember that scaling is multiplicative.`,
    hint2: `Multiply the two scale factors together: ${k1} × ${k2}.`,
    visualData: {
      model: { k1, k2, total },
      meta: { gen: 'combineFactors', params: { k1, k2 }, distractors },
    },
  };
}

function genRoundTrip(id, rng) {
  const obj = randInt(rng, 5, 15);
  const k = randInt(rng, 2, 5);
  const corr = `${obj} cm`;

  const distractors = [
    { value: `${obj * k} cm`, misconceptionId: 'M-ONESIDE' },
    { value: `${obj + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${obj * 2} cm`, misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 6,
    category: 'ROUND TRIP',
    visual: 'scale-line',
    questionText: `A line of ${obj} cm is scaled by ${k}, and then scaled by 1/${k}. What is its final length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Round trip: ${obj} × ${k} × 1/${k} = ${obj} cm. Multiplying by a factor and its reciprocal returns to the starting length!`,
    hint1: `First, calculate ${k} × (1/${k}).`,
    hint2: `Any number multiplied by 1 returns to itself.`,
    visualData: {
      model: { obj, k },
      meta: { gen: 'roundTrip', params: { obj, k }, distractors },
    },
  };
}

// ── WORLD 7 GENERATORS: Map & Plan Scales ──
function genMapToReal(id, rng) {
  const scales = [
    { n: 50, drawingCm: 4, realM: 2 },
    { n: 100, drawingCm: 5, realM: 5 },
    { n: 200, drawingCm: 6, realM: 12 },
    { n: 250, drawingCm: 4, realM: 10 },
    { n: 500, drawingCm: 3, realM: 15 },
  ];
  const item = pickRandom(rng, scales);
  const totalCm = item.drawingCm * item.n;
  const corr = `${item.realM} m`;

  const distractors = [
    { value: `${totalCm} m`, misconceptionId: 'M-UNIT' },
    { value: `${Math.round((item.drawingCm / item.n) * 100) / 100} cm`, misconceptionId: 'M-MAPREV' },
    { value: `${item.drawingCm + item.n} cm`, misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 7,
    category: 'SCALE DRAWING TO REAL',
    visual: 'map-ruler',
    questionText: `A floor plan uses scale 1 : ${item.n}. A wall is ${item.drawingCm} cm on the plan. What is the real length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match & Factor: scale 1 : ${item.n} means real length is ${item.n} times drawing. Use: ${item.drawingCm} × ${item.n} = ${totalCm} cm. Check: ${totalCm} cm ÷ 100 = ${corr}.`,
    hint1: `First, multiply the drawing length by ${item.n} to get centimeters.`,
    hint2: `Then convert centimeters to meters by dividing by 100.`,
    visualData: {
      model: { n: item.n, drawingCm: item.drawingCm, realM: item.realM, totalCm },
      meta: { gen: 'mapToReal', params: { drawingCm: item.drawingCm, n: item.n, unit: 'm' }, distractors },
    },
  };
}

function genRealToMap(id, rng) {
  const n = pickRandom(rng, [50, 100, 200]);
  const realM = randInt(rng, 4, 12);
  const realCm = realM * 100;
  const drawingCm = realCm / n;
  const corr = `${drawingCm} cm`;

  const distractors = [
    { value: `${realM * n} cm`, misconceptionId: 'M-MAPREV' },
    { value: `${realM} cm`, misconceptionId: 'M-UNIT' },
    { value: `${Math.round(drawingCm + 2)} cm`, misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 7,
    category: 'REAL TO SCALE DRAWING',
    visual: 'map-ruler',
    questionText: `A park path is ${realM} m long. On a map with scale 1 : ${n}, how long is the path?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Convert & Divide: ${realM} m = ${realCm} cm. On a 1 : ${n} map, drawing = ${realCm} ÷ ${n} = ${corr}.`,
    hint1: `First, convert ${realM} meters to centimeters (${realM} × 100).`,
    hint2: `Divide the real centimeters by the scale ratio ${n}.`,
    visualData: {
      model: { n, realM, realCm, drawingCm },
      meta: { gen: 'realToMap', params: { realM, n }, distractors },
    },
  };
}

function genScaleToK(id, rng) {
  const n = pickRandom(rng, [20, 50, 100, 500]);
  const corr = String(n);
  const distractors = [
    { value: `1/${n}`, misconceptionId: 'M-INVERT' },
    { value: String(n / 10), misconceptionId: 'M-UNIT' },
    { value: String(n + 1), misconceptionId: 'M-OFFBY1' },
  ];

  return {
    id,
    districtId: 7,
    category: 'MAP RATIO TO FACTOR',
    visual: 'none',
    questionText: `A model has a scale of 1 : ${n}. What scale factor converts model lengths to real lengths?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Scale 1 : ${n} means every 1 unit of model equals ${n} units of reality, so the multiplier k is ${n}.`,
    hint1: `First, recognize that 1 unit on the model represents ${n} units in reality.`,
    hint2: `The multiplier from model to real is simply ${n}.`,
    visualData: {
      model: { n, k: n },
      meta: { gen: 'scaleToK', params: { n }, distractors },
    },
  };
}

// ── WORLD 8 GENERATORS: Perimeter and Area Scaling ──
function genPerimeterK(id, rng) {
  const side = randInt(rng, 3, 8);
  const origP = side * 4;
  const k = randInt(rng, 2, 4);
  const newP = origP * k;
  const corr = `${newP} cm`;

  const distractors = [
    { value: `${origP + k} cm`, misconceptionId: 'M-ADD' },
    { value: `${origP * (k * k)} cm`, misconceptionId: 'M-SIDE-K2' },
    { value: `${side * k} cm`, misconceptionId: 'M-AREA-SIDE' },
  ];

  return {
    id,
    districtId: 8,
    category: 'PERIMETER SCALING',
    visual: 'area-grid',
    questionText: `A square has perimeter ${origP} cm. It is enlarged by scale factor ${k}. What is the new perimeter?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Perimeter is a length: it scales by factor k. New perimeter = ${origP} × ${k} = ${corr}.`,
    hint1: `First, remember that perimeter measures total boundary length.`,
    hint2: `All lengths scale directly by k, so multiply ${origP} by ${k}.`,
    visualData: {
      model: { side, origP, k, newP },
      meta: { gen: 'perimeterK', params: { origP, k }, distractors },
    },
  };
}

function genAreaK(id, rng) {
  const side = randInt(rng, 3, 6);
  const origArea = side * side;
  const k = randInt(rng, 2, 3);
  const k2 = k * k;
  const newArea = origArea * k2;
  const corr = `${newArea} cm²`;

  const distractors = [
    { value: `${origArea * k} cm²`, misconceptionId: 'M-AREA-K' },
    { value: `${side * k} cm²`, misconceptionId: 'M-AREA-SIDE' },
    { value: `${origArea + k2} cm²`, misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 8,
    category: 'AREA SCALING',
    visual: 'area-grid',
    questionText: `A square has area ${origArea} cm². It is enlarged by scale factor ${k}. What is the new area?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Area scales by k²! Factor k = ${k}, so k² = ${k} × ${k} = ${k2}. New area = ${origArea} × ${k2} = ${corr}.`,
    hint1: `First, calculate k² because area is two-dimensional.`,
    hint2: `Multiply original area by k²: ${origArea} × ${k2} = ${newArea}.`,
    visualData: {
      model: { side, origArea, k, k2, newArea },
      meta: { gen: 'areaK', params: { side, kn: k, kd: 1 }, distractors },
    },
  };
}

function genAreaFromSides(id, rng) {
  const w = randInt(rng, 2, 4);
  const h = randInt(rng, 3, 5);
  const origArea = w * h;
  const k = 2;
  const newArea = origArea * 4;
  const corr = `${newArea} cm²`;

  const distractors = [
    { value: `${origArea * 2} cm²`, misconceptionId: 'M-AREA-K' },
    { value: `${w * 2 + h * 2} cm²`, misconceptionId: 'M-ADD' },
    { value: `${origArea + 4} cm²`, misconceptionId: 'M-ADD' },
  ];

  return {
    id,
    districtId: 8,
    category: 'RECTANGLE AREA',
    visual: 'area-grid',
    questionText: `A rectangle is ${w} cm × ${h} cm (area ${origArea} cm²). Doubling both sides gives what area?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Both sides double: (${w} × 2) × (${h} × 2) = ${w * 2} × ${h * 2} = ${newArea} cm². Area increases by 2² = 4 times!`,
    hint1: `First, calculate the new width and new height.`,
    hint2: `Multiply the new width and height together: ${w * 2} × ${h * 2}.`,
    visualData: {
      model: { w, h, origArea, k, newArea },
      meta: { gen: 'areaFromSides', params: { w, h, k }, distractors },
    },
  };
}

// ── WORLD 9: Mixed Review Finale ──
function genModelRealWorld(id, rng) {
  const scale = 24;
  const modelCm = 25;
  const totalCm = modelCm * scale;
  const realM = totalCm / 100;
  const corr = `${realM} m`;

  const distractors = [
    { value: `${totalCm} m`, misconceptionId: 'M-UNIT' },
    { value: `${modelCm + scale} cm`, misconceptionId: 'M-ADD' },
    { value: `${Math.round((modelCm / scale) * 100) / 100} cm`, misconceptionId: 'M-MAPREV' },
  ];

  return {
    id,
    districtId: 9,
    category: 'SCALE FINALE',
    visual: 'scale-pair',
    questionText: `A scale model car is ${modelCm} cm long built at scale 1 : ${scale}. What is the real car's length?`,
    options: makeOptions(corr, distractors, rng),
    correctAnswer: corr,
    explanation: `Match: 1 : ${scale} gives factor ${scale}. Use: ${modelCm} × ${scale} = ${totalCm} cm. Check: ${totalCm} cm = ${realM} m.`,
    hint1: `First, multiply ${modelCm} cm by ${scale}.`,
    hint2: `Then convert centimeters to meters by dividing by 100.`,
    visualData: {
      model: { modelCm, scale, totalCm, realM },
      meta: { gen: 'modelRealWorld', params: { modelCm, scale, realM }, distractors },
    },
  };
}

// Generator registry by world ID
const WORLD_GENERATORS = {
  0: [
    genPickCopyRect, genPickCopyRect, genPickCopyRect, genPickCopyRect,
    genPickCopyTriangle, genPickCopyTriangle, genPickCopyTriangle,
    genWhyNotCopy, genWhyNotCopy, genWhyNotCopy,
  ],
  1: [
    genMatchSide, genMatchSide, genMatchSide, genMatchSide,
    genMatchAngle, genMatchAngle, genMatchAngle,
    genTurnedCopy, genTurnedCopy, genTurnedCopy,
  ],
  2: [
    genFindKWhole, genFindKWhole, genFindKWhole, genFindKWhole, genFindKWhole,
    genFindKFrac, genFindKFrac, genFindKFrac,
    genFindKPair, genFindKPair,
  ],
  3: [
    genApplyWholeK, genApplyWholeK, genApplyWholeK, genApplyWholeK, genApplyWholeK, genApplyWholeK,
    genApplyKTwoSides, genApplyKTwoSides, genApplyKTwoSides, genApplyKTwoSides,
  ],
  4: [
    genApplyFracK, genApplyFracK, genApplyFracK, genApplyFracK,
    genApplyDecimalK, genApplyDecimalK, genApplyDecimalK,
    genDescribeK, genDescribeK, genDescribeK,
  ],
  5: [
    genMissingForward, genMissingForward, genMissingForward, genMissingForward,
    genMissingBackward, genMissingBackward, genMissingBackward, genMissingBackward,
    genMissingSecond, genMissingSecond,
  ],
  6: [
    genReverseFactor, genReverseFactor, genReverseFactor, genReverseFactor,
    genCombineFactors, genCombineFactors, genCombineFactors, genCombineFactors,
    genRoundTrip, genRoundTrip,
  ],
  7: [
    genMapToReal, genMapToReal, genMapToReal, genMapToReal,
    genRealToMap, genRealToMap, genRealToMap,
    genScaleToK, genScaleToK, genScaleToK,
  ],
  8: [
    genPerimeterK, genPerimeterK, genPerimeterK,
    genAreaK, genAreaK, genAreaK, genAreaK,
    genAreaFromSides, genAreaFromSides, genAreaFromSides,
  ],
  9: [
    genPickCopyRect,
    genMatchSide,
    genFindKWhole,
    genApplyWholeK,
    genApplyFracK,
    genMissingForward,
    genReverseFactor,
    genMapToReal,
    genAreaK,
    genModelRealWorld,
  ],
};

export function generateWorld(worldId, seed = 1000 + worldId) {
  const rng = createRng(seed);
  const gens = WORLD_GENERATORS[worldId] || WORLD_GENERATORS[0];
  return gens.map((fn, idx) => {
    const qId = worldId * 10 + idx + 1;
    return fn(qId, rng);
  });
}

export function generateQuestionBank(seed = 42) {
  const questions = [];
  for (let w = 0; w < 10; w++) {
    const worldQuestions = generateWorld(w, seed + w * 7919);
    questions.push(...worldQuestions);
  }
  return questions;
}

const defaultBank = generateQuestionBank(42);
export default defaultBank;
