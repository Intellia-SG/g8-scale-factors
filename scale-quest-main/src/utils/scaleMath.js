// src/utils/scaleMath.js
// Exact-rational arithmetic and geometry helpers for ScaleQuest

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

export function frac(n, d = 1) {
  if (d === 0) throw new Error('Division by zero');
  const sign = (n < 0) ^ (d < 0) ? -1 : 1;
  const num = Math.abs(Math.round(n));
  const den = Math.abs(Math.round(d));
  const g = gcd(num, den);
  return { n: sign * (num / g), d: den / g };
}

export function eq(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return f1.n === f2.n && f1.d === f2.d;
}

export function add(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return frac(f1.n * f2.d + f2.n * f1.d, f1.d * f2.d);
}

export function sub(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return frac(f1.n * f2.d - f2.n * f1.d, f1.d * f2.d);
}

export function mul(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return frac(f1.n * f2.n, f1.d * f2.d);
}

export function div(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  if (f2.n === 0) throw new Error('Division by zero in div()');
  return frac(f1.n * f2.d, f1.d * f2.n);
}

export function cmp(a, b) {
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return f1.n * f2.d - f2.n * f1.d;
}

export function isInt(f) {
  const fr = typeof f === 'number' ? frac(f) : f;
  return fr.d === 1;
}

export function toFloat(f) {
  const fr = typeof f === 'number' ? frac(f) : f;
  return fr.n / fr.d;
}

export function fmt(f, options = {}) {
  const fr = typeof f === 'number' ? frac(f) : f;
  if (fr.d === 1) return String(fr.n);

  if (options.decimal) {
    const val = fr.n / fr.d;
    return val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  // Check if standard halves/quarters for clean decimal presentation if preferred
  if (options.preferDecimal && (fr.d === 2 || fr.d === 4 || fr.d === 5 || fr.d === 10)) {
    return (fr.n / fr.d).toString();
  }

  return `${fr.n}/${fr.d}`;
}

export function scaleLength(len, k) {
  const frLen = typeof len === 'number' ? frac(len) : len;
  const frK = typeof k === 'number' ? frac(k) : k;
  return mul(frLen, frK);
}

export function scalePoint(p, k, pin = [0, 0]) {
  const frK = typeof k === 'number' ? frac(k) : k;
  const kVal = toFloat(frK);
  return [
    pin[0] + kVal * (p[0] - pin[0]),
    pin[1] + kVal * (p[1] - pin[1]),
  ];
}

export function scaleShape(points, k, pin = [0, 0]) {
  return points.map(p => scalePoint(p, k, pin));
}

export function ratio(a, b) {
  // Returns b / a as fraction
  const f1 = typeof a === 'number' ? frac(a) : a;
  const f2 = typeof b === 'number' ? frac(b) : b;
  return div(f2, f1);
}

export function isScaledCopy(objSides, imgSides, tolerance = 0.001) {
  if (!objSides || !imgSides || objSides.length !== imgSides.length || objSides.length === 0) {
    return false;
  }
  const firstRatio = toFloat(ratio(objSides[0], imgSides[0]));
  if (firstRatio <= 0) return false;

  for (let i = 1; i < objSides.length; i++) {
    const r = toFloat(ratio(objSides[i], imgSides[i]));
    if (Math.abs(r - firstRatio) > tolerance) {
      return false;
    }
  }
  return true;
}

export function scaleFactor(obj, img) {
  // k = image ÷ object
  return ratio(obj, img);
}

export function reverseK(k) {
  // 1 / k
  const frK = typeof k === 'number' ? frac(k) : k;
  return div(frac(1), frK);
}

export function compose(k1, k2) {
  return mul(k1, k2);
}

export function fromScale(n) {
  // Scale 1 : n means drawing to real factor is n
  return {
    k: frac(n),
    toReal: (drawingCm) => mul(frac(drawingCm), frac(n)),
    toDrawing: (realUnits) => div(frac(realUnits), frac(n)),
  };
}

export function cmToM(cm) {
  const fr = typeof cm === 'number' ? frac(cm) : cm;
  return div(fr, frac(100));
}

export function mToCm(m) {
  const fr = typeof m === 'number' ? frac(m) : m;
  return mul(fr, frac(100));
}

export function perimeterFactor(k) {
  return typeof k === 'number' ? frac(k) : k;
}

export function areaFactor(k) {
  const frK = typeof k === 'number' ? frac(k) : k;
  return mul(frK, frK);
}

export function additiveImage(sides, n) {
  // Adds n to every side (misconception M-ADD)
  return sides.map(s => {
    const val = typeof s === 'number' ? s : toFloat(s);
    return val + n;
  });
}
