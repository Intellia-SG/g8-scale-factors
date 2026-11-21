// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for ScaleQuest

export const BADGES = [
  {
    id: 'first_scale',
    icon: '🏅',
    label: 'First Scale-Up',
    description: 'Answered your very first scale factor question correctly!',
  },
  {
    id: 'ratio_rhythm',
    icon: '🔥',
    label: 'Ratio Rhythm',
    description: 'Achieved a streak of 5 correct answers!',
  },
  {
    id: 'perfect_proportion',
    icon: '⚡',
    label: 'Perfect Proportion',
    description: 'Achieved a 10-question winning streak!',
  },
  {
    id: 'workshop_whiz',
    icon: '🧪',
    label: 'Workshop Whiz',
    description: 'Completed all 4 interactive simulation labs!',
  },
  {
    id: 'scale_star',
    icon: '⭐',
    label: 'Scale Star',
    description: 'Scored 3 stars in a Practice World!',
  },
  {
    id: 'glitch_buster',
    icon: '👑',
    label: 'Glitch Buster',
    description: 'Defeated a World Boss in battle!',
  },
  {
    id: 'twenty_tinkerer',
    icon: '🎯',
    label: 'Twenty-Times Tinkerer',
    description: 'Answered over 20 questions in Practice!',
  },
  {
    id: 'scale_master',
    icon: '🏆',
    label: 'Scale Master',
    description: 'Completed the full 5-phase ScaleQuest journey!',
  },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_scale');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('ratio_rhythm');
  if (state.maxStreak >= 10) unlocked.push('perfect_proportion');

  // Simulation completion
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('workshop_whiz');
  }

  // 3-star district check
  if (state.districtScores && state.districtScores.some((score) => score !== null && score >= 9)) {
    unlocked.push('scale_star');
  }

  // Centurion (20+ questions answered)
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('twenty_tinkerer');
  }

  // Boss slayer
  if (state.bossDefeated) {
    unlocked.push('glitch_buster');
  }

  // Full journey
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('scale_master');
  }

  return unlocked;
}
