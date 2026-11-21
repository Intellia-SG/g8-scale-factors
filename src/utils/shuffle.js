// src/utils/shuffle.js
// Seeded array shuffle

import { createRng } from './rng.js';

export function shuffle(array, seed = Date.now()) {
  const rng = createRng(seed);
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(questionBank, seed = Date.now()) {
  if (typeof questionBank === 'function') {
    return questionBank(seed);
  }
  if (Array.isArray(questionBank)) {
    return [...questionBank];
  }
  return [];
}
