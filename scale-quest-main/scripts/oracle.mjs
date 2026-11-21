// scripts/oracle.mjs
// Independent mathematical oracle for ScaleQuest (does NOT import scaleMath.js)

import { generateQuestionBank } from '../src/data/questionBank.js';

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function F(n, d = 1) {
  const g = gcd(n, d) || 1;
  return d < 0 ? [-n / g, -d / g] : [n / g, d / g];
}

function same([a, b], [c, d]) {
  return a * d === b * c;
}

function parseAnswer(ans) {
  const s = String(ans).trim();
  // Clean off " cm", " m", " cm²", "°"
  const clean = s.replace(/ cm²| cm| m|°/g, '').trim();

  // Fraction "n/d"
  if (clean.includes('/')) {
    const parts = clean.split('/');
    return F(parseInt(parts[0], 10), parseInt(parts[1], 10));
  }

  // Decimal "x.y"
  if (clean.includes('.')) {
    const val = parseFloat(clean);
    return F(Math.round(val * 100), 100);
  }

  // Integer
  const val = parseInt(clean, 10);
  if (!isNaN(val)) return F(val, 1);

  return null;
}

export function solveMeta(meta) {
  const p = meta.params;
  switch (meta.gen) {
    case 'findKWhole':
      return F(p.image, p.object);
    case 'findKFrac':
      return F(p.kn, p.kd);
    case 'findKPair':
      return F(p.img1, p.obj1);
    case 'applyWholeK':
      return F(p.object * p.k, 1);
    case 'applyFracK':
      return F(p.object * p.kn, p.kd);
    case 'applyDecimalK':
      return F(Math.round(p.object * p.k * 10), 10);
    case 'missingForward':
      return F(p.obj2 * p.k, 1);
    case 'missingBackward':
      return F(p.img / p.k, 1);
    case 'missingSecond':
      return F(p.s2 * p.k, 1);
    case 'reverseFactor':
      return F(1, p.k);
    case 'combineFactors':
      return F(p.k1 * p.k2, 1);
    case 'roundTrip':
      return F(p.obj, 1);
    case 'mapToReal':
      return F(p.drawingCm * p.n, p.unit === 'm' ? 100 : 1);
    case 'realToMap':
      return F((p.realM * 100) / p.n, 1);
    case 'scaleToK':
      return F(p.n, 1);
    case 'perimeterK':
      return F(p.origP * p.k, 1);
    case 'areaK':
      return F(p.side * p.side * p.kn * p.kn, p.kd * p.kd);
    case 'areaFromSides':
      return F(p.w * p.h * p.k * p.k, 1);
    case 'modelRealWorld':
      return F((p.modelCm * p.scale) / 100, 1);
    default:
      return null;
  }
}

console.log('Running independent mathematical oracle audit...');
const bank = generateQuestionBank(42);
let verified = 0;
let skipped = 0;
let errors = 0;

for (const q of bank) {
  const meta = q.visualData?.meta;
  if (!meta) {
    skipped++;
    continue;
  }
  const solved = solveMeta(meta);
  if (!solved) {
    skipped++;
    continue;
  }
  const parsed = parseAnswer(q.correctAnswer);
  if (!parsed) {
    skipped++;
    continue;
  }

  if (same(solved, parsed)) {
    verified++;
  } else {
    console.error(`Oracle mismatch in Q${q.id} (${meta.gen}): Expected [${solved}], parsed correctAnswer was [${parsed}] ('${q.correctAnswer}')`);
    errors++;
  }
}

console.log(`Oracle checked ${verified} numeric questions. Skipped ${skipped} qualitative/geometry-string questions.`);
if (errors === 0) {
  console.log('✅ Independent oracle audit PASSED with 0 mismatches.');
  process.exit(0);
} else {
  console.error(`❌ Oracle audit FAILED with ${errors} mismatches.`);
  process.exit(1);
}
