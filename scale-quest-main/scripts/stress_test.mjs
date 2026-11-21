// scripts/stress_test.mjs
// Stress test for ScaleQuest question bank: >= 300 runs x 100 questions = 30,000

import { generateQuestionBank } from '../src/data/questionBank.js';

console.log('Starting question bank stress test (300 seeded iterations x 100 questions)...');

const RUNS = 300;
let totalQuestionsTested = 0;
let errors = 0;

for (let r = 0; r < RUNS; r++) {
  const seed = 1000 + r * 1337;
  const bank = generateQuestionBank(seed);

  if (bank.length !== 100) {
    console.error(`Run ${r}: Expected 100 questions, got ${bank.length}`);
    errors++;
  }

  for (let i = 0; i < bank.length; i++) {
    const q = bank[i];
    totalQuestionsTested++;

    // Invariant: id, districtId, category, questionText, options, correctAnswer
    if (!q.id || q.districtId === undefined || !q.category || !q.questionText || !q.options || !q.correctAnswer) {
      console.error(`Run ${r}, Q${i}: Missing required top-level field`, q);
      errors++;
    }

    // Invariant: no NaN, undefined, or Infinity
    const qStr = JSON.stringify(q);
    if (qStr.includes('NaN') || qStr.includes('null') && !qStr.includes('"model":null') || qStr.includes('undefined') || qStr.includes('Infinity')) {
      console.error(`Run ${r}, Q${i}: Contained invalid numeric or undefined state:`, qStr);
      errors++;
    }

    // Invariant: exactly 4 options
    if (q.options.length !== 4) {
      console.error(`Run ${r}, Q${i}: Options count != 4:`, q.options);
      errors++;
    }

    // Invariant: options are unique
    const unique = new Set(q.options.map(s => String(s).trim()));
    if (unique.size !== 4) {
      console.error(`Run ${r}, Q${i}: Duplicate options:`, q.options);
      errors++;
    }

    // Invariant: correctAnswer appears in options exactly once
    const matchCount = q.options.filter(opt => String(opt).trim() === String(q.correctAnswer).trim()).length;
    if (matchCount !== 1) {
      console.error(`Run ${r}, Q${i}: correctAnswer '${q.correctAnswer}' appeared ${matchCount} times in`, q.options);
      errors++;
    }

    // Invariant: questionText length <= 140
    if (q.questionText.length > 140) {
      console.error(`Run ${r}, Q${i}: questionText too long (${q.questionText.length} chars):`, q.questionText);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log(`✅ Stress test PASSED! Tested ${totalQuestionsTested} questions across ${RUNS} runs with 0 errors.`);
  process.exit(0);
} else {
  console.error(`❌ Stress test FAILED with ${errors} errors.`);
  process.exit(1);
}
