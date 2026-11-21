// src/utils/narration.js
// Narration script builder for ScaleQuest with phonetic spoken conversions

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
  // Spoken conversions per PRD §11 & TRD §11
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
    [
      say("Welcome to the Mini-Maker Studio!"),
      say("Jack wants to enlarge a four centimeter by three centimeter photo so its width becomes twelve centimeters."),
      say("Since twelve is eight more than four, Jack adds eight centimeters to every side, making the poster twelve by eleven centimeters."),
      think("Why does it look stretched? Maya measures: twelve divided by four is three, but eleven divided by three is not three!"),
      emphasize("Adding the same number to every side distorts the shape!"),
    ],
    [
      say("Maya explains the magic multiplier: scale factor k equals image divided by object!"),
      say("Twelve divided by four equals three, so the scale factor is three!"),
      say("Maya multiplies every single side by three: four times three is twelve, three times three is nine, and the five centimeter diagonal becomes fifteen!"),
      cheer("The enlarged poster matches the photo perfectly without distortion!"),
    ],
    [
      say("Now the studio prints a badge by shrinking the poster back down."),
      say("Maya shows that when a scale factor is less than one, the shape reduces in size."),
      say("Going back from twelve by nine to four by three uses scale factor four divided by twelve, which is one third!"),
      cheer("Back from times three is times one third! The reverse factor is always one over k!"),
    ],
    [
      say("Atlas presents the centerpiece: a twenty-four centimeter model lighthouse built at scale one to fifty."),
      say("Maya and Jack follow the four steps: Match, Factor, Use, and Check."),
      say("Scale one to fifty means scale factor fifty. Twenty-four centimeters times fifty equals twelve hundred centimeters, which is twelve meters!"),
      cheer("A twelve-meter lighthouse is perfectly sensible!"),
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
