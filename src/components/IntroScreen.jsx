// src/components/IntroScreen.jsx
// Home screen for ScaleQuest satisfying S1 requirements (one-line phase names 320px+)

import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';
import { CHARACTERS } from '../config/characters.config.js';

const JOURNEY = [
  { num: '01', icon: '🔍', label: 'Wonder', desc: 'Poster puzzle alert' },
  { num: '02', icon: '📖', label: 'Story', desc: `${CHARACTERS.maya.name} & ${CHARACTERS.jack.name}'s studio` },
  { num: '03', icon: '🧪', label: 'Simulate', desc: '4 interactive labs' },
  { num: '04', icon: '🎮', label: 'Practice', desc: '10 worlds & bosses' },
  { num: '05', icon: '📓', label: 'Reflect', desc: 'Review & scorecard' },
];

export default function IntroScreen({ state, dispatch }) {
  const hasSaved = state?.phaseComplete && Object.values(state.phaseComplete).some(Boolean);

  function startFresh() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  function resumeSession() {
    dispatch({ type: 'SET_PHASE', payload: state.savedPhase || 'wonder' });
  }

  return (
    <div className="intro-wrap">
      {/* 1. Top chip */}
      <div className="intro-top-badge">
        ✨ Curriculum · Scale Factors Grade 8
      </div>

      {/* 2. Title */}
      <h1 className="intro-title">
        <span className="text-orange">Scale</span> <span className="text-white">Quest</span>
      </h1>

      {/* 3. Subtitle */}
      <h2 className="intro-subtitle">
        Master enlarging, shrinking and scaling by multiplying!
      </h2>

      {/* 4. Mascot Row */}
      <div className="intro-mascot-row">
        <div className="intro-mascot-circle" aria-label={CHARACTERS.atlas.name}>
          {CHARACTERS.atlas.avatar}
        </div>
        <div className="intro-speech-bubble" role="status">
          Scale factor <b className="hl">k = image ÷ object</b>: we multiply every side by k, never just add!
        </div>
      </div>

      {/* 5. Journey card (Single row with all 5 phases joined by arrows) */}
      <div className="journey-card">
        <div className="journey-card-title">
          YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START
        </div>

        <div className="journey-steps-container">
          {JOURNEY.map((j, i) => (
            <React.Fragment key={j.num}>
              <div
                className="journey-step-item clickable-step"
                onClick={() =>
                  dispatch({
                    type: 'SET_PHASE',
                    payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase(),
                  })
                }
                role="button"
                tabIndex={0}
                title={`Open ${j.label} phase`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dispatch({
                      type: 'SET_PHASE',
                      payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase(),
                    });
                  }
                }}
              >
                <span className="journey-icon-circle">{j.icon}</span>
                <div className="journey-text-col">
                  <span className="journey-item-title">{j.label}</span>
                  <span className="journey-item-desc">{j.desc}</span>
                </div>
              </div>
              {i < JOURNEY.length - 1 && <span className="journey-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 6. CTA Button */}
      <div className="intro-ctas">
        <button className="btn btn-primary btn-lg intro-cta-main" onClick={startFresh}>
          🚀 Begin Your Journey!
        </button>
        {hasSaved && (
          <button className="btn btn-outline" onClick={resumeSession} style={{ marginTop: '10px' }}>
            ↩ Resume Session
          </button>
        )}
      </div>

      {/* 7. Info chips */}
      <div className="intro-bottom-cards">
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{ color: '#ff6b6b' }}>🎯</div>
          <div>100 Questions</div>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{ color: '#feca57' }}>📏</div>
          <div>Scale Factor × k</div>
        </div>
        <div className="bottom-card">
          <div className="bottom-card-icon" style={{ color: '#66bb6a' }}>✨</div>
          <div>Badges &amp; XP</div>
        </div>
      </div>
    </div>
  );
}
