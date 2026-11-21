// scripts/clean_audio.js
// Clean unreferenced audio files from public/assets/audio

import fs from 'fs';
import path from 'path';
import { audioMap } from '../src/utils/audioMap.js';

const audioDir = path.join(process.cwd(), 'public/assets/audio');
if (!fs.existsSync(audioDir)) process.exit(0);

const referencedFiles = new Set(Object.values(audioMap).map((p) => path.basename(p)));
const diskFiles = fs.readdirSync(audioDir);

let cleaned = 0;
for (const file of diskFiles) {
  if (file.endsWith('.mp3') && !referencedFiles.has(file)) {
    fs.unlinkSync(path.join(audioDir, file));
    cleaned++;
  }
}

console.log(`Cleaned ${cleaned} unreferenced audio files.`);
