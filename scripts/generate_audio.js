// scripts/generate_audio.js
// Pre-generation script for ScaleQuest static audio assets via ElevenLabs
// Architecture conforms to audio_generation_pipeline (5).md

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { AUDIO_CONFIG } from '../src/config/audio.config.js';
import { speak } from '../src/utils/narration.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const apiKey = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.log('No VITE_ELEVENLABS_API_KEY provided in .env.local. Audio generation skipped.');
  console.log('To generate audio clips, add your API key to .env.local: VITE_ELEVENLABS_API_KEY=your_key_here');
  process.exit(0);
}

// Master list of all educational phrases across all 5 phases
const phrases = [
  // Intro Phase
  { text: "Welcome to ScaleQuest! Enter the Mini-Maker Studio to master scale factors, proportional scaling, and architectural models!", style: 'statement' },

  // Wonder Phase (The Poster Puzzle)
  { text: "The Poster Puzzle!", style: 'statement' },
  { text: "Four centimeters becomes twelve centimeters. What is the multiplier?", style: 'statement' },
  { text: "Jack and Maya must enlarge a four centimeter by three centimeter photo so its width becomes twelve centimeters.", style: 'statement' },
  { text: "Whose poster still looks like the photo, and why?", style: 'question' },
  { text: "Let's explore how scaling really works!", style: 'celebration' },
  { text: "Jack adds eight to every side: twelve by eleven. It looks stretched!", style: 'statement' },
  { text: "Maya multiplies every side by three: twelve by nine. It looks just like the photo!", style: 'statement' },

  // Story Phase - Panel 0: The Poster Problem
  { text: "Jack wants to enlarge a 4 cm × 3 cm photo for the makerspace exhibition so its width becomes 12 cm.", style: 'statement' },
  { text: "Since 12 is 8 more than 4, he adds 8 cm to every side, making the poster 12 cm × 11 cm.", style: 'statement' },
  { text: "But when Maya looks at it, the poster is visibly stretched! She measures the ratios: 12 ÷ 4 = 3, but 11 ÷ 3 is not 3.", style: 'thinking' },
  { text: "Adding the same amount changed the proportions! Adding the same number to every side distorts the shape!", style: 'emphasis' },

  // Story Phase - Panel 1: The Magic Multiplier
  { text: "Maya explains the golden rule: scaling means multiplying every side by the same scale factor k = image ÷ object.", style: 'statement' },
  { text: "Since 12 ÷ 4 = 3, the scale factor k is 3!", style: 'statement' },
  { text: "She multiplies both sides: width 4 × 3 = 12 cm, and height 3 × 3 = 9 cm. Even the 5 cm diagonal multiplies by 3 to become 15 cm.", style: 'statement' },
  { text: "The new poster matches the original photo perfectly without any distortion!", style: 'celebration' },

  // Story Phase - Panel 2: Shrinking Back
  { text: "Next, the studio creates a pocket badge from the large exhibition poster.", style: 'statement' },
  { text: "Maya shows that when a scale factor is less than 1, the shape reduces in size.", style: 'statement' },
  { text: "Going from the 12 cm × 9 cm poster back to the 4 cm × 3 cm photo uses k = 4 ÷ 12 = 1/3. So 12 × 1/3 = 4 cm and 9 × 1/3 = 3 cm.", style: 'statement' },
  { text: "Back from times 3 is times 1/3 — the reverse scale factor is always 1/k!", style: 'celebration' },

  // Story Phase - Panel 3: The Model Lighthouse
  { text: "Atlas introduces the studio's open-day centerpiece: a 24 cm model lighthouse built at a scale of 1 : 50.", style: 'statement' },
  { text: "Maya and Jack solve for the real lighthouse height using the standard four-step order: Match, Factor, Use, and Check.", style: 'statement' },
  { text: "Scale 1 : 50 means scale factor 50. 24 cm × 50 = 1200 cm, which equals 12 meters!", style: 'statement' },
  { text: "A 12-meter lighthouse is perfectly realistic!", style: 'celebration' },

  // Simulate Phase - Station Intros
  { text: "Station A: Scale Machine!", style: 'instruction' },
  { text: "Discover how scale factors stretch shapes. Adjust the slider to test factors above one, below one, and equal to one!", style: 'instruction' },
  { text: "Station B: Poster Press!", style: 'instruction' },
  { text: "Build-to-Target lab. Resize copies to match the ghost outlines and drag vertices along the rays to lock the target!", style: 'instruction' },
  { text: "Station C: Model Maker!", style: 'instruction' },
  { text: "Multi-step builder. Dial the factor, size matching edges, and work backwards to restore original dimensions!", style: 'instruction' },
  { text: "Station D: Scale Inspector!", style: 'instruction' },
  { text: "Error detective. Inspect replayed faulty calculations, tap the exact mistake on screen, and repair the proportions!", style: 'instruction' },

  // Practice & Feedback
  { text: "Incredible streak! You are a master of proportion! 🔥", style: 'celebration' },
  { text: "Spot on! Three in a row! ⭐", style: 'celebration' },
  { text: "That's right! Excellent scaling! 🎉", style: 'celebration' },
  { text: "Not quite — check the hint, verify corresponding sides, and try again! 💡", style: 'thinking' },
  { text: "First, match the corresponding sides that pair together.", style: 'instruction' },
  { text: "Use the scale factor formula: k equals image divided by object.", style: 'instruction' },
  { text: "World Complete! Outstanding proportional reasoning! 🌟", style: 'celebration' },
  { text: "Boss Battle! Answer accurately to protect your lives and defeat the distorter! ⚔️", style: 'emphasis' },
  { text: "Victory! You defeated the boss and secured the master blueprint! 🏆", style: 'celebration' },

  // Reflect Phase
  { text: "Welcome to the Reflect Phase!", style: 'statement' },
  { text: "Review the key concepts: scaling is multiplicative, never additive!", style: 'statement' },
  { text: "Congratulations on completing your ScaleQuest journey! 🌟", style: 'celebration' },
];

const audioDir = path.join(process.cwd(), 'public/assets/audio');
fs.mkdirSync(audioDir, { recursive: true });

async function generate() {
  console.log(`Generating ${phrases.length} pre-rendered narration clips using Alice (${AUDIO_CONFIG.voiceId})...`);
  const audioMap = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const settings = AUDIO_CONFIG.presets[style] || AUDIO_CONFIG.presets.statement;
    // Slugify filename for deterministic, clean caching
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .slice(0, 32);
    const filename = `audio_${i}_${slug}.mp3`;
    const dest = path.join(audioDir, filename);

    // Phonetic spoken conversion ensures Alice pronounces math symbols naturally
    const spokenText = speak(text);

    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AUDIO_CONFIG.voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: spokenText,
          model_id: AUDIO_CONFIG.model,
          voice_settings: settings,
        }),
      });

      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        audioMap[text] = `/assets/audio/${filename}`;
        console.log(`[Generated ${i + 1}/${phrases.length}] "${text}" -> ${filename}`);
      } else {
        console.error(`[Error ${res.status}] Failed for: "${text}"`);
      }
    } catch (e) {
      console.error(`Failed to generate for: "${text}"`, e);
    }
  }

  const mapFile = path.join(process.cwd(), 'src/utils/audioMap.js');
  fs.writeFileSync(mapFile, `export const audioMap = ${JSON.stringify(audioMap, null, 2)};\nexport default audioMap;\n`);
  console.log(`\nUpdated src/utils/audioMap.js successfully with ${Object.keys(audioMap).length} audio mappings.`);
}

generate();
