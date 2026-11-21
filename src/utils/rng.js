// src/utils/rng.js
// Mulberry32 deterministic pseudo-random number generator

export function createRng(seed = 123456789) {
  let s = Math.floor(Math.abs(seed)) || 1;

  return function next() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function pickRandom(rng, array) {
  if (!array || array.length === 0) return null;
  return array[Math.floor(rng() * array.length)];
}
