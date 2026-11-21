// src/utils/narration.js
// Narration script builder for ScaleQuest with phonetic spoken conversions and styled segments
// Adheres strictly to audio_generation_pipeline (5).md (Parity, ElevenLabs Alice, Semantic Styles)

export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think = (text) => ({ text, style: 'thinking' });
export const instruct = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

export function speak(text) {
  if (!text) return '';
  let s = String(text);
  // Spoken conversions per PRD §11, TRD §11 & audio pipeline specs
  s = s.replace(/×/g, 'times');
  s = s.replace(/÷/g, 'divided by');
  s = s.replace(/−/g, 'minus');
  s = s.replace(/➔/g, 'becomes');
  s = s.replace(/1\s*:\s*50/g, 'one to fifty');
  s = s.replace(/1\s*:\s*200/g, 'one to two hundred');
  s = s.replace(/1\s*:\s*(\d+)/g, 'one to $1');
  s = s.replace(/1\/2/g, 'one half');
  s = s.replace(/1\/3/g, 'one third');
  s = s.replace(/2\/3/g, 'two thirds');
  s = s.replace(/3\/4/g, 'three quarters');
  s = s.replace(/1\/4/g, 'one quarter');
  s = s.replace(/cm²/g, 'square centimeters');
  s = s.replace(/cm\b/g, 'centimeters');
  s = s.replace(/m²\b/g, 'square meters');
  s = s.replace(/\bm\b/g, 'meters');
  s = s.replace(/\bk = 3\b/g, 'the scale factor is three');
  s = s.replace(/\bk\b/g, 'scale factor');
  return s;
}

export function introNarration() {
  return [
    say("Welcome to ScaleQuest! Enter the Mini-Maker Studio to master scale factors, proportional scaling, and architectural models!"),
  ];
}

export function wonderNarration() {
  return [
    say("The Poster Puzzle!"),
    say("Four centimeters becomes twelve centimeters. What is the multiplier?"),
    say("Jack and Maya must enlarge a four centimeter by three centimeter photo so its width becomes twelve centimeters."),
    ask("Whose poster still looks like the photo, and why?"),
    cheer("Let's explore how scaling really works!"),
  ];
}

export function wonderJackResultNarration() {
  return [say("Jack adds eight to every side: twelve by eleven. It looks stretched!")];
}

export function wonderMayaResultNarration() {
  return [say("Maya multiplies every side by three: twelve by nine. It looks just like the photo!")];
}

export function storyNarration(panel) {
  const scripts = [
    // Panel 0: The Poster Problem
    [
      say("Jack wants to enlarge a 4 cm × 3 cm photo for the makerspace exhibition so its width becomes 12 cm."),
      say("Since 12 is 8 more than 4, he adds 8 cm to every side, making the poster 12 cm × 11 cm."),
      think("But when Maya looks at it, the poster is visibly stretched! She measures the ratios: 12 ÷ 4 = 3, but 11 ÷ 3 is not 3."),
      emphasize("Adding the same amount changed the proportions! Adding the same number to every side distorts the shape!"),
    ],
    // Panel 1: The Magic Multiplier
    [
      say("Maya explains the golden rule: scaling means multiplying every side by the same scale factor k = image ÷ object."),
      say("Since 12 ÷ 4 = 3, the scale factor k is 3!"),
      say("She multiplies both sides: width 4 × 3 = 12 cm, and height 3 × 3 = 9 cm. Even the 5 cm diagonal multiplies by 3 to become 15 cm."),
      cheer("The new poster matches the original photo perfectly without any distortion!"),
    ],
    // Panel 2: Shrinking Back
    [
      say("Next, the studio creates a pocket badge from the large exhibition poster."),
      say("Maya shows that when a scale factor is less than 1, the shape reduces in size."),
      say("Going from the 12 cm × 9 cm poster back to the 4 cm × 3 cm photo uses k = 4 ÷ 12 = 1/3. So 12 × 1/3 = 4 cm and 9 × 1/3 = 3 cm."),
      cheer("Back from times 3 is times 1/3 — the reverse scale factor is always 1/k!"),
    ],
    // Panel 3: The Model Lighthouse
    [
      say("Atlas introduces the studio's open-day centerpiece: a 24 cm model lighthouse built at a scale of 1 : 50."),
      say("Maya and Jack solve for the real lighthouse height using the standard four-step order: Match, Factor, Use, and Check."),
      say("Scale 1 : 50 means scale factor 50. 24 cm × 50 = 1200 cm, which equals 12 meters!"),
      cheer("A 12-meter lighthouse is perfectly realistic!"),
    ],
  ];

  return scripts[panel] || scripts[0];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      instruct("Station A: Scale Machine!"),
      instruct("Discover how scale factors stretch shapes. Adjust the slider to test factors above one, below one, and equal to one!"),
    ],
    [
      instruct("Station B: Poster Press!"),
      instruct("Build-to-Target lab. Resize copies to match the ghost outlines and drag vertices along the rays to lock the target!"),
    ],
    [
      instruct("Station C: Model Maker!"),
      instruct("Multi-step builder. Dial the factor, size matching edges, and work backwards to restore original dimensions!"),
    ],
    [
      instruct("Station D: Scale Inspector!"),
      instruct("Error detective. Inspect replayed faulty calculations, tap the exact mistake on screen, and repair the proportions!"),
    ],
  ];

  return intros[stationIdx] || intros[0];
}

export function playQuestionNarration(questionText) {
  return [ask(speak(questionText))];
}

export function playCorrectNarration(streak = 1) {
  if (streak >= 5) {
    return [cheer("Incredible streak! You are a master of proportion! 🔥")];
  }
  if (streak >= 3) {
    return [cheer("Spot on! Three in a row! ⭐")];
  }
  return [cheer("That's right! Excellent scaling! 🎉")];
}

export function playWrongNarration() {
  return [think("Not quite — check the hint, verify corresponding sides, and try again! 💡")];
}

export function playHint1Narration(text) {
  return [instruct(speak(text || "First, match the corresponding sides that pair together."))];
}

export function playHint2Narration(text) {
  return [instruct(speak(text || "Use the scale factor formula: k equals image divided by object."))];
}

export function districtCompleteNarration() {
  return [cheer("World Complete! Outstanding proportional reasoning! 🌟")];
}

export function bossStartNarration() {
  return [emphasize("Boss Battle! Answer accurately to protect your lives and defeat the distorter! ⚔️")];
}

export function bossWinNarration() {
  return [cheer("Victory! You defeated the boss and secured the master blueprint! 🏆")];
}

export function reflectNarration() {
  return [
    say("Welcome to the Reflect Phase!"),
    say("Review the key concepts: scaling is multiplicative, never additive!"),
  ];
}

export function reflectCompleteNarration() {
  return [cheer("Congratulations on completing your ScaleQuest journey! 🌟")];
}
