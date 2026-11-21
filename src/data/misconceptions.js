// src/data/misconceptions.js
// Named misconception registry for ScaleQuest distractors

export const MISCONCEPTIONS = {
  'M-ADD': {
    id: 'M-ADD',
    label: 'Add instead of multiply',
    description: 'Adds difference or scale factor to sides instead of multiplying',
    apply: (p) => {
      if (p.diff !== undefined && p.object !== undefined) return p.object + p.diff;
      if (p.k !== undefined && p.object !== undefined) return p.object + p.k;
      if (p.k1 !== undefined && p.k2 !== undefined) return p.k1 + p.k2;
      return null;
    },
  },
  'M-ONESIDE': {
    id: 'M-ONESIDE',
    label: 'Scale only one dimension',
    description: 'Multiplies only length or width, leaving the other unchanged',
    apply: (p) => p.oneSideValue ?? null,
  },
  'M-INVERT': {
    id: 'M-INVERT',
    label: 'Object ÷ image',
    description: 'Inverts scale factor direction (object ÷ image, or divides instead of multiplying)',
    apply: (p) => {
      if (p.object !== undefined && p.image !== undefined && p.image !== 0) {
        return `${p.object}/${p.image}`;
      }
      if (p.object !== undefined && p.k !== undefined && p.k !== 0) {
        return Math.round((p.object / p.k) * 10) / 10;
      }
      return null;
    },
  },
  'M-SUBTRACT': {
    id: 'M-SUBTRACT',
    label: 'Image minus object',
    description: 'Subtracts lengths instead of calculating ratio',
    apply: (p) => {
      if (p.image !== undefined && p.object !== undefined) return Math.abs(p.image - p.object);
      return null;
    },
  },
  'M-NONCORR': {
    id: 'M-NONCORR',
    label: 'Pair non-corresponding sides',
    description: 'Multiplies or pairs sides that do not match position or orientation',
    apply: (p) => p.wrongSideValue ?? null,
  },
  'M-NOTSIM': {
    id: 'M-NOTSIM',
    label: 'Judge similarity by single pair only or claim not similar',
    description: 'Accepts single ratio or claims shapes cannot be scaled',
    apply: (p) => p.notSimAnswer ?? 'Cannot be determined',
  },
  'M-OFFBY1': {
    id: 'M-OFFBY1',
    label: 'Use k + 1 multiplier',
    description: 'Multiplies by (k + 1) instead of k',
    apply: (p) => {
      if (p.object !== undefined && p.k !== undefined) return p.object * (p.k + 1);
      return null;
    },
  },
  'M-FRACDIV': {
    id: 'M-FRACDIV',
    label: 'Divide by fractional factor',
    description: 'Divides by fraction instead of multiplying when reducing',
    apply: (p) => {
      if (p.object !== undefined && p.kn !== undefined && p.kd !== undefined && p.kn !== 0) {
        return Math.round((p.object * p.kd) / p.kn);
      }
      return null;
    },
  },
  'M-COMPLEMENT': {
    id: 'M-COMPLEMENT',
    label: 'Use 1 - k complement',
    description: 'Multiplies by (1 - k) instead of k',
    apply: (p) => {
      if (p.object !== undefined && p.kn !== undefined && p.kd !== undefined) {
        return Math.round((p.object * (p.kd - p.kn)) / p.kd);
      }
      return null;
    },
  },
  'M-REV-SAME': {
    id: 'M-REV-SAME',
    label: 'Reverse factor is the same',
    description: 'Believes reverse scale factor is identical to forward factor',
    apply: (p) => (p.k !== undefined ? String(p.k) : null),
  },
  'M-NEGATE': {
    id: 'M-NEGATE',
    label: 'Reverse factor is negative',
    description: 'Thinks reversing a factor makes it negative rather than reciprocal',
    apply: (p) => (p.k !== undefined ? `-${p.k}` : null),
  },
  'M-UNIT': {
    id: 'M-UNIT',
    label: 'Forget unit conversion',
    description: 'Keeps centimeters instead of converting to meters or vice versa',
    apply: (p) => p.unitError ?? null,
  },
  'M-MAPREV': {
    id: 'M-MAPREV',
    label: 'Read map ratio backwards',
    description: 'Divides drawing by scale factor instead of multiplying for real length',
    apply: (p) => p.mapRevError ?? null,
  },
  'M-AREA-K': {
    id: 'M-AREA-K',
    label: 'Area times k',
    description: 'Multiplies area by k instead of k²',
    apply: (p) => {
      if (p.area !== undefined && p.k !== undefined) return p.area * p.k;
      return null;
    },
  },
  'M-AREA-SIDE': {
    id: 'M-AREA-SIDE',
    label: 'Report new side as area',
    description: 'Confuses scaled side length with scaled area',
    apply: (p) => p.newSide ?? null,
  },
  'M-SIDE-K2': {
    id: 'M-SIDE-K2',
    label: 'Side times k²',
    description: 'Multiplies length by k² instead of k',
    apply: (p) => {
      if (p.side !== undefined && p.k !== undefined) return p.side * (p.k * p.k);
      return null;
    },
  },
};
