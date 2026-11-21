// src/components/shared/Mascot.jsx
// Atlas the Ant mascot component for ScaleQuest

import React from 'react';
import './Mascot.css';
import { CHARACTERS } from '../../config/characters.config.js';

export default function Mascot({ mood = 'curious', message, size = 'md' }) {
  const emoji = CHARACTERS.atlas.avatar;

  return (
    <div className={`mascot-row-wrap mascot-${size}`}>
      <div className={`mascot-avatar-circle mood-${mood}`} aria-label={`${CHARACTERS.atlas.name} the Ant`}>
        <span className="mascot-avatar-emoji">{emoji}</span>
      </div>
      {message && (
        <div className="mascot-speech-bubble anim-fade-in" role="status">
          <span className="speech-text">{message}</span>
        </div>
      )}
    </div>
  );
}
