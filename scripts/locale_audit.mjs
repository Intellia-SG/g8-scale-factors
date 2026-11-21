// scripts/locale_audit.mjs
// Locale neutrality and naming audit (G1) for ScaleQuest

import fs from 'fs';
import path from 'path';

console.log('Running Locale Neutrality (G1) and Deny-List Audit...');

const DENY_LIST = [
  // Currencies / money terms (bounded words so centimeters / cents in other words don't match)
  '\\bcoins?\\b',
  '\\bpenny\\b',
  '\\bpiggy\\b',
  '\\bdollars?\\b',
  '\\bmoneyquest\\b',
  '\\boliver\\b',
  '\\bemma\\b',
  // Regional curriculum labels
  '\\bCBSE\\b',
  '\\bNCERT\\b',
  '\\bGCSE\\b',
  '\\bIGCSE\\b',
  '\\bCambridge\\b',
  '\\bCommon Core\\b',
  '\\bKey Stage\\b',
  '\\bYear [0-9]+\\b',
  '\\bClass [0-9]+\\b',
  '\\bStage [0-9]+\\b',
  '\\bSingapore\\b',
  // Non-US spelling terms
  '\\bcentre\\b',
  '\\bmetre\\b',
  '\\bcolour\\b',
  '\\bmaths\\b',
  '\\bprogramme\\b',
  // Regional variant terms
  '\\bdilation\\b',
  '\\bpre-image\\b',
];

const patterns = DENY_LIST.map((term) => ({
  name: term,
  regex: new RegExp(term, 'i'),
}));

const rootsToCheck = ['src', 'public', 'index.html'];
const exts = ['.js', '.jsx', '.html', '.json', '.css'];

let violations = 0;

function checkFile(filePath) {
  const relPath = path.relative('c:/Users/HP/Desktop/scale factor/scale-quest-main', filePath);
  // Skip binary/audio assets
  if (filePath.endsWith('.mp3') || filePath.endsWith('.png') || filePath.endsWith('.jpg')) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  for (const p of patterns) {
    if (p.regex.test(content)) {
      console.error(`[Locale Violation] ${relPath} matches deny-list rule "${p.name}"`);
      violations++;
    }
  }
}

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== 'dist' && item !== '.git') {
        walkDir(full);
      }
    } else if (exts.includes(path.extname(full))) {
      checkFile(full);
    }
  }
}

const baseDir = 'c:/Users/HP/Desktop/scale factor/scale-quest-main';
rootsToCheck.forEach((r) => {
  const p = path.join(baseDir, r);
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isDirectory()) walkDir(p);
    else checkFile(p);
  }
});

if (violations === 0) {
  console.log('✅ Locale and neutrality audit PASSED with 0 violations.');
  process.exit(0);
} else {
  console.error(`❌ Locale audit FAILED with ${violations} violations.`);
  process.exit(1);
}
