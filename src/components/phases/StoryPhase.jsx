// src/components/phases/StoryPhase.jsx
// Story phase for ScaleQuest (The Mini-Maker Studio) matching UI specs from user reference

import React, { useState, useEffect } from 'react';
import './StoryPhase.css';
import { STORY_PANELS } from '../../data/storyContent.js';
import { useAudio } from '../../hooks/useAudio.js';
import { storyNarration } from '../../utils/narration.js';

function StoryIllustration({ panel }) {
  // Built-in vector/CSS framed illustration fallback for each of the 4 panels
  if (panel.panel === 0) {
    return (
      <svg viewBox="0 0 320 220" className="story-svg-art" role="img" aria-label="The Poster Problem illustration">
        <rect width="320" height="220" fill="#1e1b4b" rx="12" />
        <g transform="translate(30, 70)">
          <rect width="60" height="45" fill="rgba(156, 127, 216, 0.5)" stroke="#9c7fd8" strokeWidth="2.5" rx="4" />
          <text x="30" y="28" fill="#fff" fontSize="13" fontWeight="900" textAnchor="middle">4×3</text>
          <text x="30" y="62" fill="#c4b5fd" fontSize="11" fontWeight="800" textAnchor="middle">Original Photo</text>
        </g>
        <text x="120" y="100" fill="#fcd34d" fontSize="18" fontWeight="900">➔</text>
        <g transform="translate(150, 30)">
          <rect width="140" height="130" fill="rgba(239, 83, 80, 0.25)" stroke="#ef5350" strokeWidth="2.5" rx="6" />
          <rect width="140" height="105" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" rx="4" />
          <text x="70" y="65" fill="#fca5a5" fontSize="14" fontWeight="900" textAnchor="middle">12 × 11 cm</text>
          <text x="70" y="85" fill="#f87171" fontSize="11" fontWeight="800" textAnchor="middle">Jack added 8 to both!</text>
          <text x="70" y="152" fill="#ef4444" fontSize="11" fontWeight="800" textAnchor="middle">Stretched shape ⚠️</text>
        </g>
      </svg>
    );
  }

  if (panel.panel === 1) {
    return (
      <svg viewBox="0 0 320 220" className="story-svg-art" role="img" aria-label="The Magic Multiplier illustration">
        <rect width="320" height="220" fill="#311042" rx="12" />
        <g transform="translate(30, 80)">
          <rect width="50" height="38" fill="rgba(156, 127, 216, 0.4)" stroke="#9c7fd8" strokeWidth="2" rx="3" />
          <line x1="0" y1="38" x2="50" y2="0" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="25" y="24" fill="#fff" fontSize="11" fontWeight="900" textAnchor="middle">diag: 5</text>
          <text x="25" y="55" fill="#c4b5fd" fontSize="10" fontWeight="800" textAnchor="middle">4×3</text>
        </g>
        <g transform="translate(100, 95)">
          <text x="15" y="0" fill="#fbb03b" fontSize="14" fontWeight="900" textAnchor="middle">× 3</text>
          <text x="15" y="16" fill="rgba(255,255,255,0.5)" fontSize="18" fontWeight="900" textAnchor="middle">➔</text>
        </g>
        <g transform="translate(145, 35)">
          <rect width="150" height="112" fill="rgba(76, 175, 80, 0.3)" stroke="#4caf50" strokeWidth="3" rx="6" />
          <line x1="0" y1="112" x2="150" y2="0" stroke="#ffd54f" strokeWidth="2" strokeDasharray="4 4" />
          <text x="75" y="55" fill="#86efac" fontSize="15" fontWeight="900" textAnchor="middle">12 × 9 cm</text>
          <text x="75" y="75" fill="#fde68a" fontSize="12" fontWeight="800" textAnchor="middle">diagonal = 15 cm</text>
          <text x="75" y="132" fill="#4ade80" fontSize="11" fontWeight="900" textAnchor="middle">Perfect match! ✓</text>
        </g>
      </svg>
    );
  }

  if (panel.panel === 2) {
    return (
      <svg viewBox="0 0 320 220" className="story-svg-art" role="img" aria-label="Shrinking Back illustration">
        <rect width="320" height="220" fill="#064e3b" rx="12" />
        <g transform="translate(25, 35)">
          <rect width="140" height="105" fill="rgba(255, 193, 7, 0.2)" stroke="#ffc107" strokeWidth="2.5" rx="6" />
          <text x="70" y="55" fill="#fde68a" fontSize="14" fontWeight="900" textAnchor="middle">12 × 9 Poster</text>
          <text x="70" y="125" fill="#cbd5e1" fontSize="11" fontWeight="800" textAnchor="middle">Large poster</text>
        </g>
        <g transform="translate(180, 85)">
          <text x="15" y="-5" fill="#6ee7b7" fontSize="14" fontWeight="900" textAnchor="middle">× 1/3</text>
          <text x="15" y="15" fill="rgba(255,255,255,0.6)" fontSize="18" fontWeight="900" textAnchor="middle">➔</text>
        </g>
        <g transform="translate(225, 65)">
          <rect width="55" height="42" fill="rgba(52, 211, 153, 0.35)" stroke="#34d399" strokeWidth="2.5" rx="4" />
          <text x="28" y="26" fill="#fff" fontSize="12" fontWeight="900" textAnchor="middle">4×3</text>
          <text x="28" y="60" fill="#a7f3d0" fontSize="11" fontWeight="800" textAnchor="middle">Badge</text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 220" className="story-svg-art" role="img" aria-label="The Model Lighthouse illustration">
      <rect width="320" height="220" fill="#1e3a8a" rx="12" />
      <g transform="translate(45, 60)">
        <polygon points="20,10 5,90 35,90" fill="rgba(255,255,255,0.25)" stroke="#93c5fd" strokeWidth="2" />
        <rect x="15" y="0" width="10" height="10" fill="#fcd34d" />
        <text x="20" y="112" fill="#bfdbfe" fontSize="11" fontWeight="800" textAnchor="middle">Model: 24 cm</text>
      </g>
      <g transform="translate(125, 95)">
        <text x="15" y="-6" fill="#fcd34d" fontSize="13" fontWeight="900" textAnchor="middle">1 : 50</text>
        <text x="15" y="14" fill="rgba(255,255,255,0.5)" fontSize="18" fontWeight="900" textAnchor="middle">➔</text>
      </g>
      <g transform="translate(180, 20)">
        <polygon points="50,15 15,160 85,160" fill="rgba(251, 191, 36, 0.3)" stroke="#fbbf24" strokeWidth="2.5" />
        <rect x="42" y="0" width="16" height="15" fill="#f59e0b" />
        <text x="50" y="85" fill="#fef08a" fontSize="13" fontWeight="900" textAnchor="middle">1200 cm</text>
        <text x="50" y="105" fill="#fde047" fontSize="14" fontWeight="900" textAnchor="middle">= 12 m</text>
        <text x="50" y="180" fill="#93c5fd" fontSize="11" fontWeight="800" textAnchor="middle">Real Lighthouse</text>
      </g>
    </svg>
  );
}

export default function StoryPhase({ state, dispatch }) {
  const currentIdx = state?.storyPanel || 0;
  const panel = STORY_PANELS[currentIdx] || STORY_PANELS[0];
  const { narrate, stopAll } = useAudio(state?.audioEnabled ?? true);
  const totalPanels = STORY_PANELS.length;
  const isLastPanel = currentIdx >= totalPanels - 1;

  const [imgLoaded, setImgLoaded] = useState(true);

  useEffect(() => {
    setImgLoaded(true);
    stopAll();
    const timer = setTimeout(() => narrate(storyNarration(currentIdx)), 300);
    return () => {
      clearTimeout(timer);
      stopAll();
    };
  }, [currentIdx, narrate, stopAll]);

  function handleNext() {
    stopAll();
    dispatch({ type: 'NEXT_STORY_PANEL' });
  }

  function handlePrev() {
    stopAll();
    dispatch({ type: 'PREV_STORY_PANEL' });
  }

  function handleSelectDot(idx) {
    stopAll();
    dispatch({ type: 'SET_STORY_PANEL', payload: idx });
  }

  return (
    <div className="story-wrap">
      <div className="story-container anim-slide-up" key={currentIdx}>
        {/* Top Progress Bar Row */}
        <div className="story-progress-bar-row">
          <div className="story-track">
            <div
              className="story-fill"
              style={{ width: `${((currentIdx + 1) / totalPanels) * 100}%` }}
            />
          </div>
          <span className="story-counter-text">
            {currentIdx + 1}/{totalPanels}
          </span>
        </div>

        {/* Main Horizontal Story Card */}
        <div className="story-main-card">
          {/* Left: Illustration Image with Vector SVG Fallback */}
          <div className="story-image-section">
            {imgLoaded ? (
              <img
                src={`/assets/story/story_panel_${panel.panel}.png`}
                alt={panel.title}
                className="story-panel-img"
                onError={() => setImgLoaded(false)}
              />
            ) : (
              <StoryIllustration panel={panel} />
            )}
          </div>

          {/* Right: Story Content */}
          <div className="story-content-section">
            <div className="story-content-top">
              <h2 className="story-title">
                {panel.title} <span className="story-title-emoji">{panel.imageEmoji || '✨'}</span>
              </h2>
              <p className="story-text">{panel.text}</p>

              {panel.highlight && (
                <div className="story-callout-box">
                  <span className="callout-icon">💡</span>
                  <span className="callout-text">{panel.highlight}</span>
                </div>
              )}
            </div>

            {/* Character / Speaker Badge */}
            <div className="story-speaker-row">
              <div className="speaker-avatar-circle">
                <span className="speaker-emoji">{panel.characterEmoji || '👦'}</span>
              </div>
              <span className="speaker-name">{panel.character || 'Jack & Maya'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Pagination Dots on Left, Actions on Right */}
        <div className="story-footer-nav">
          <div className="story-dots-group">
            {STORY_PANELS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`story-dot-btn ${i === currentIdx ? 'active' : ''} ${i < currentIdx ? 'passed' : ''}`}
                onClick={() => handleSelectDot(i)}
                aria-label={`Go to story panel ${i + 1}`}
              />
            ))}
          </div>

          <div className="story-nav-actions">
            {currentIdx > 0 && (
              <button
                type="button"
                className="btn btn-outline btn-sm story-prev-btn"
                onClick={handlePrev}
                aria-label="Previous story panel"
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              className="story-next-btn"
              onClick={handleNext}
              aria-label={isLastPanel ? 'Start Simulating' : 'Next story panel'}
            >
              {!isLastPanel ? 'Next →' : 'Simulate! 🧪'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
