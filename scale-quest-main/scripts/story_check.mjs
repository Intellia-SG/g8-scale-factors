// scripts/story_check.mjs
// Verification of the Story Phase numerical literals against scaleMath.js

import { STORY_PANELS } from '../src/data/storyContent.js';
import * as sm from '../src/utils/scaleMath.js';

console.log('Verifying Story Phase mathematical literals...');
let errors = 0;

// Panel 0: 4x3 photo, width 12, Jack +8 -> 12x11 (ratios 3 and 11/3)
const p0 = STORY_PANELS[0].model;
if (p0.jack.w !== 12 || p0.jack.h !== 11) {
  console.error('Panel 0: Jack dimensions incorrect', p0.jack);
  errors++;
}
const r1 = sm.ratio(p0.original.w, p0.jack.w);
const r2 = sm.ratio(p0.original.h, p0.jack.h);
if (sm.eq(r1, r2)) {
  console.error('Panel 0: Jack dimensions should NOT be proportional');
  errors++;
}

// Panel 1: Maya k=3 -> 12x9, diagonal 5 -> 15
const p1 = STORY_PANELS[1].model;
if (p1.k !== 3 || p1.maya.w !== 12 || p1.maya.h !== 9 || p1.maya.diag !== 15) {
  console.error('Panel 1: Maya scaled dimensions incorrect', p1);
  errors++;
}
if (!sm.isScaledCopy([p1.original.w, p1.original.h, p1.original.diag], [p1.maya.w, p1.maya.h, p1.maya.diag])) {
  console.error('Panel 1: Maya copy is not a true scaled copy');
  errors++;
}

// Panel 2: Shrinking Back: 12x9 to 4x3 with reverseK = 1/3
const p2 = STORY_PANELS[2].model;
const forwardK = sm.scaleFactor(p2.small.w, p2.large.w);
const revK = sm.reverseK(forwardK);
if (!sm.eq(revK, p2.reverseK)) {
  console.error('Panel 2: Reverse scale factor mismatch', revK, p2.reverseK);
  errors++;
}

// Panel 3: Lighthouse: 24 cm, 1:50 -> 1200 cm = 12 m
const p3 = STORY_PANELS[3].model;
const calcCm = sm.mul(sm.frac(p3.modelHeightCm), sm.frac(p3.scaleRatio));
const calcM = sm.cmToM(calcCm);
if (calcCm.n !== 1200 || calcM.n !== 12) {
  console.error('Panel 3: Lighthouse calculations mismatch', calcCm, calcM);
  errors++;
}

if (errors === 0) {
  console.log('✅ Story mathematical literals verified successfully!');
  process.exit(0);
} else {
  console.error(`❌ Story check failed with ${errors} errors.`);
  process.exit(1);
}
