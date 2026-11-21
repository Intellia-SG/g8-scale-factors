// scripts/generate_audio.js
// Pre-generation script for ScaleQuest static audio assets via ElevenLabs

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { AUDIO_CONFIG } from '../src/config/audio.config.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const apiKey = process.env.VITE_ELEVENLABS_API_KEY;
if (!apiKey) {
  console.log('No VITE_ELEVENLABS_API_KEY provided in .env.local. Audio generation skipped.');
  process.exit(0);
}

const phrases = [
  { text: "The Poster Puzzle!", style: 'statement' },
  { text: "Four centimeters becomes twelve centimeters. What is the multiplier?", style: 'statement' },
  { text: "Jack and Maya must enlarge a four centimeter by three centimeter photo so its width becomes twelve centimeters.", style: 'statement' },
  { text: "Whose poster still looks like the photo, and why?", style: 'question' },
  { text: "Let's explore how scaling really works!", style: 'celebration' },
  { text: "Adding the same number to every side distorts the shape!", style: 'emphasis' },
  { text: "Scale factor k equals image divided by object. Multiply every length by k!", style: 'celebration' },
  { text: "A scale factor k less than one reduces size. The reverse factor is one over k!", style: 'statement' },
  { text: "Standard solution order: Match, Factor, Use, Check.", style: 'instruction' },
];

const audioDir = path.join(process.cwd(), 'public/assets/audio');
fs.mkdirSync(audioDir, { recursive: true });

async function generate() {
  console.log(`Generating ${phrases.length} pre-rendered narration clips using Alice...`);
  const audioMap = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const settings = AUDIO_CONFIG.presets[style] || AUDIO_CONFIG.presets.statement;
    const filename = `audio_scale_${i}_${Date.now()}.mp3`;
    const dest = path.join(audioDir, filename);

    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${AUDIO_CONFIG.voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: AUDIO_CONFIG.model,
          voice_settings: settings,
        }),
      });

      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buffer));
        audioMap[text] = `/assets/audio/${filename}`;
        console.log(`[Generated] "${text}" -> ${filename}`);
      }
    } catch (e) {
      console.error(`Failed to generate for: "${text}"`, e);
    }
  }

  const mapFile = path.join(process.cwd(), 'src/utils/audioMap.js');
  fs.writeFileSync(mapFile, `export const audioMap = ${JSON.stringify(audioMap, null, 2)};\nexport default audioMap;\n`);
  console.log('Updated src/utils/audioMap.js successfully.');
}

generate();
