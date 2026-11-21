// src/data/storyContent.js
// Story panels for ScaleQuest (The Mini-Maker Studio)

import { CHARACTERS } from '../config/characters.config.js';

export const STORY_PANELS = [
  {
    panel: 0,
    title: 'The Poster Problem',
    text: `${CHARACTERS.jack.name} wants to enlarge a 4 cm × 3 cm photo for the makerspace exhibition so its width becomes 12 cm. Since 12 is 8 more than 4, he adds 8 cm to every side, making the poster 12 cm × 11 cm. But when ${CHARACTERS.maya.name} looks at it, the poster is visibly stretched! She measures the ratios: 12 ÷ 4 = 3, but 11 ÷ 3 is not 3. Adding the same amount changed the proportions!`,
    highlight: 'Adding the same number to every side distorts the shape!',
    character: 'Jack & Maya',
    characterEmoji: '👦',
    imageBg: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    imageEmoji: '🖼️',
    model: {
      original: { w: 4, h: 3 },
      jack: { w: 12, h: 11, add: 8 },
      target: { w: 12, h: 9, k: 3 },
    },
  },
  {
    panel: 1,
    title: 'The Magic Multiplier',
    text: `${CHARACTERS.maya.name} explains the golden rule: scaling means multiplying every side by the same scale factor k = image ÷ object. Since 12 ÷ 4 = 3, k is 3! She multiplies both sides: width 4 × 3 = 12 cm, and height 3 × 3 = 9 cm. Even the 5 cm diagonal multiplies by 3 to become 15 cm. The new poster matches the original photo perfectly without any distortion!`,
    highlight: 'Scale factor k = image ÷ object. Multiply every length by k!',
    character: 'Maya & Jack',
    characterEmoji: '👧',
    imageBg: 'linear-gradient(135deg, #311042, #581c87)',
    imageEmoji: '✨',
    model: {
      original: { w: 4, h: 3, diag: 5 },
      k: 3,
      maya: { w: 12, h: 9, diag: 15 },
    },
  },
  {
    panel: 2,
    title: 'Shrinking Back',
    text: `Next, the studio creates a pocket badge from the large exhibition poster. ${CHARACTERS.maya.name} shows that when a scale factor is less than 1, the shape reduces in size. Going from the 12 cm × 9 cm poster back to the 4 cm × 3 cm photo uses k = 4 ÷ 12 = 1/3. So 12 × 1/3 = 4 cm and 9 × 1/3 = 3 cm. Back from ×3 is ×1/3 — the reverse scale factor is always 1/k!`,
    highlight: 'A scale factor k < 1 reduces size. The reverse factor is 1/k!',
    character: 'Maya & Atlas',
    characterEmoji: '👧',
    imageBg: 'linear-gradient(135deg, #064e3b, #047857)',
    imageEmoji: '🔬',
    model: {
      large: { w: 12, h: 9 },
      reverseK: { n: 1, d: 3 },
      small: { w: 4, h: 3 },
    },
  },
  {
    panel: 3,
    title: 'The Model Lighthouse',
    text: `${CHARACTERS.atlas.name} introduces the studio's open-day centerpiece: a 24 cm model lighthouse built at a scale of 1 : 50. ${CHARACTERS.maya.name} and ${CHARACTERS.jack.name} solve for the real lighthouse height using the standard four-step order: Match (model to real), Factor (scale 1 : 50 means k = 50), Use (24 cm × 50 = 1200 cm), and Check (1200 cm = 12 m). A 12-meter lighthouse is perfectly realistic!`,
    highlight: 'Standard solution order: Match → Factor → Use → Check.',
    character: 'Atlas & Maya',
    characterEmoji: '🐜',
    imageBg: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
    imageEmoji: '🗼',
    model: {
      modelHeightCm: 24,
      scaleRatio: 50,
      realHeightCm: 1200,
      realHeightM: 12,
    },
  },
];
