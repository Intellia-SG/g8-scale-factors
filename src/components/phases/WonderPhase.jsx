// src/components/phases/WonderPhase.jsx
// Wonder Phase for ScaleQuest matching PRD §8.1 and TRD §5.8

import React, { useState, useEffect } from 'react';
import './WonderPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import {
  wonderNarration,
  wonderJackResultNarration,
  wonderMayaResultNarration,
} from '../../utils/narration.js';
import { CHARACTERS } from '../../config/characters.config.js';

const PARTICLES = ['📐', '📏', '🎚️', '🔍', '🪞', '✨', '🖼️', '🎯', '🐜', '⭐'];

export default function WonderPhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state?.audioEnabled ?? true);
  const [selectedToggle, setSelectedToggle] = useState(null); // null | 'jack' | 'maya'

  useEffect(() => {
    const segs = wonderNarration();
    narrate(segs);
    return () => stopAll();
  }, [narrate, stopAll]);

  function handleToggle(choice) {
    setSelectedToggle(choice);
    stopAll();
    if (choice === 'jack') {
      narrate(wonderJackResultNarration());
    } else if (choice === 'maya') {
      narrate(wonderMayaResultNarration());
    }
  }

  function handleInvestigate() {
    stopAll();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'SET_PHASE', payload: 'story' });
  }

  return (
    <div className="wonder-wrap">
      {/* Floating particles background */}
      <div className="wonder-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="wonder-particle"
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${5 + (i * 7.5) % 80}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${1.1 + (i % 3) * 0.4}rem`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="wonder-content anim-slide-up">
        {/* Main Hook Card */}
        <div className="wonder-card glass-card">
          <div className="wonder-stadium-icon" aria-hidden="true">
            🖼️
          </div>

          <h1 className="wonder-title headline">The Poster Puzzle!</h1>

          <div className="wonder-number-display">
            <span className="number-display wonder-num">
              {selectedToggle === 'maya' ? '4 cm ➔ 12 cm ➔ ×3' : '4 cm ➔ 12 cm ➔ ×?'}
            </span>
          </div>

          {/* Interactive Strip (PRD §8.1, TRD §5.8) */}
          <div className="wonder-lab">
            <svg
              viewBox="0 0 300 100"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Photo and enlargement comparison"
            >
              {/* Background grid */}
              <defs>
                <pattern id="w-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="300" height="100" fill="url(#w-grid)" rx="8" />

              {/* Original 4x3 photo */}
              <g transform="translate(25, 20)">
                <rect width="40" height="30" fill="rgba(156, 127, 216, 0.4)" stroke="#9c7fd8" strokeWidth="2" rx="3" />
                <text x="20" y="20" fill="#fff" fontSize="10" fontWeight="800" textAnchor="middle">4×3</text>
                <text x="20" y="44" fill="#c4b5fd" fontSize="9" fontWeight="700" textAnchor="middle">Photo</text>
              </g>

              {/* Arrow */}
              <text x="95" y="42" fill="rgba(255,255,255,0.5)" fontSize="16" fontWeight="900" textAnchor="middle">➔</text>

              {/* Ghost 12x9 proportional shape */}
              <g transform="translate(130, 8)">
                <rect
                  width="120"
                  height="75"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  rx="4"
                />

                {/* Candidate shape based on toggle */}
                {selectedToggle === 'jack' && (
                  <g className="anim-slide-up">
                    {/* Jack +8: 12x11 (stretched vertically to 92px) */}
                    <rect
                      width="120"
                      height="88"
                      fill="rgba(239, 83, 80, 0.3)"
                      stroke="#ef5350"
                      strokeWidth="2.5"
                      rx="4"
                    />
                    <text x="60" y="48" fill="#fca5a5" fontSize="12" fontWeight="900" textAnchor="middle">
                      Jack: 12×11 (Stretched!)
                    </text>
                  </g>
                )}

                {selectedToggle === 'maya' && (
                  <g className="anim-slide-up">
                    {/* Maya ×3: 12x9 (matches ghost) */}
                    <rect
                      width="120"
                      height="75"
                      fill="rgba(76, 175, 80, 0.35)"
                      stroke="#4caf50"
                      strokeWidth="2.5"
                      rx="4"
                    />
                    <text x="60" y="42" fill="#86efac" fontSize="12" fontWeight="900" textAnchor="middle">
                      Maya: 12×9 (Proportional ✓)
                    </text>
                  </g>
                )}

                {!selectedToggle && (
                  <text x="60" y="42" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="700" textAnchor="middle">
                    Choose below to test
                  </text>
                )}
              </g>
            </svg>

            <div className="wonder-toggle" role="group" aria-label="Scaling method comparison">
              <button
                type="button"
                aria-pressed={selectedToggle === 'jack'}
                onClick={() => handleToggle('jack')}
              >
                {CHARACTERS.jack.name}: add 8
              </button>
              <button
                type="button"
                aria-pressed={selectedToggle === 'maya'}
                onClick={() => handleToggle('maya')}
              >
                {CHARACTERS.maya.name}: × 3
              </button>
            </div>
          </div>

          <div className="wonder-question-card">
            <p className="body-text wonder-q">
              Jack and Maya must enlarge a <strong className="wonder-em">4 cm × 3 cm photo</strong> so its width becomes <strong className="wonder-em">12 cm</strong>…
            </p>
            <p className="body-text wonder-q wonder-q-2">
              Whose poster still looks like the photo, and <strong className="wonder-em">why?</strong>
            </p>
          </div>

          {/* Mascot */}
          <div className="wonder-mascot-row">
            <Mascot mood="curious" message="Let's explore how scaling really works!" size="sm" />
          </div>

          <button className="btn btn-primary btn-lg wonder-cta" onClick={handleInvestigate}>
            Start Investigation 🔍
          </button>
        </div>
      </div>
    </div>
  );
}
