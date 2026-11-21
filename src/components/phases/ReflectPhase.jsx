// src/components/phases/ReflectPhase.jsx
// Stepped, uncongested Reflect Phase for ScaleQuest matching PRD §8.5 & TRD §8

import React, { useState, useEffect } from 'react';
import './ReflectPhase.css';
import { BADGES } from '../../utils/badgeEngine.js';
import { calcStars } from '../../utils/scoring.js';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { generateSessionQuestions } from '../../utils/shuffle.js';
import questionBank from '../../data/questionBank.js';

export default function ReflectPhase({ state, dispatch }) {
  const [step, setStep] = useState(1); // 1: Quick check, 2: Think it over, 3: Scorecard
  const [subQ, setSubQ] = useState(0); // 0 (R1), 1 (R2), 2 (R3) inside Step 1

  // Step 1 answers
  const [r1Choice, setR1Choice] = useState(null);
  const [r2Choice, setR2Choice] = useState(null);
  const [r3Choice, setR3Choice] = useState(null);

  // Step 2 answer
  const [journalText, setJournalText] = useState('');
  const [showBadges, setShowBadges] = useState(false);

  const { narrate, stopAll, sounds } = useAudio(state?.audioEnabled ?? true);

  const totalCorrect = state?.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  const totalStars = state?.districtScores?.reduce((s, sc) => {
    if (sc === null || sc === undefined) return s;
    return s + calcStars(sc);
  }, 0) || 0;

  useEffect(() => {
    narrate(reflectNarration());
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    return () => stopAll();
  }, [dispatch, narrate, stopAll]);

  function handleR1Select(val) {
    sounds.click();
    setR1Choice(val);
  }

  function handleR2Select(val) {
    sounds.click();
    setR2Choice(val);
  }

  function handleR3Select(val) {
    sounds.click();
    setR3Choice(val);
  }

  function handleNextSubQ() {
    if (subQ < 2) {
      setSubQ(subQ + 1);
    } else {
      setStep(2);
    }
  }

  function handlePrevSubQ() {
    if (subQ > 0) setSubQ(subQ - 1);
  }

  function handleSubmitJournal() {
    setStep(3);
    stopAll();
    sounds.badge();
    narrate(reflectCompleteNarration());
  }

  function playAgain() {
    dispatch({ type: 'RESET_SESSION' });
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }

  const earnedBadges = BADGES.filter((b) => state?.badges?.includes(b.id));

  return (
    <div className="reflect-wrap">
      {/* ── STEP 1: QUICK CHECK (3 recap prompts, 1 per sub-screen) ── */}
      {step === 1 && (
        <div className="reflect-card glass-card anim-slide-up">
          <div className="reflect-header">
            <span className="reflect-badge">📓 Step 1 of 3 · Quick Check ({subQ + 1}/3)</span>
            <h2 className="reflect-title">Test Your Understanding</h2>
          </div>

          {/* Sub-screen 1a · M-ADD */}
          {subQ === 0 && (
            <div className="reflect-q-item">
              <p className="reflect-q-text">
                Original rectangle is <strong>4 cm × 6 cm</strong>. Tap the true scaled copy:
              </p>
              <div className="reflect-shapes-grid">
                {[
                  { id: '8x12', label: '8 cm × 12 cm', correct: true, desc: 'k = 2 (Both doubled)' },
                  { id: '8x10', label: '8 cm × 10 cm', correct: false, desc: 'Added +4 to both ✗' },
                  { id: '6x8', label: '6 cm × 8 cm', correct: false, desc: 'Added +2 to both ✗' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`reflect-shape-btn ${r1Choice === item.id ? (item.correct ? 'opt-correct' : 'opt-wrong') : ''}`}
                    onClick={() => handleR1Select(item.id)}
                    aria-label={item.label}
                  >
                    <span className="shape-label-main">{item.label}</span>
                    <span className="shape-label-sub">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-screen 1b · M-INVERT */}
          {subQ === 1 && (
            <div className="reflect-q-item">
              <p className="reflect-q-text">
                Photo (4 cm) was enlarged to Poster (12 cm). Tap the length you divide by to calculate scale factor k:
              </p>
              <div className="reflect-shapes-grid">
                {[
                  { id: '4', label: '4 cm (Original Object)', correct: true, desc: 'k = image ÷ object (divide by 4) ✓' },
                  { id: '12', label: '12 cm (Image Copy)', correct: false, desc: 'Inverts direction ✗' },
                  { id: '8', label: '8 cm (The difference)', correct: false, desc: 'Subtracts instead of dividing ✗' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`reflect-shape-btn ${r2Choice === item.id ? (item.correct ? 'opt-correct' : 'opt-wrong') : ''}`}
                    onClick={() => handleR2Select(item.id)}
                    aria-label={item.label}
                  >
                    <span className="shape-label-main">{item.label}</span>
                    <span className="shape-label-sub">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-screen 1c · M-REV-SAME & M-ADD */}
          {subQ === 2 && (
            <div className="reflect-q-item">
              <p className="reflect-q-text">
                If the poster was enlarged by scale factor 3, what factor takes the poster back to the original photo?
              </p>
              <div className="reflect-shapes-grid">
                {[
                  { id: 'third', label: '× 1/3', correct: true, desc: 'Reverse factor is 1/k ✓' },
                  { id: 'three', label: '× 3', correct: false, desc: 'Keeps same factor ✗' },
                  { id: 'minus8', label: '− 8', correct: false, desc: 'Subtracts amount ✗' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`reflect-shape-btn ${r3Choice === item.id ? (item.correct ? 'opt-correct' : 'opt-wrong') : ''}`}
                    onClick={() => handleR3Select(item.id)}
                    aria-label={item.label}
                  >
                    <span className="shape-label-main">{item.label}</span>
                    <span className="shape-label-sub">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sticky action bar */}
          <div className="reflect-actions-sticky">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handlePrevSubQ}
              disabled={subQ === 0}
            >
              ← Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNextSubQ}
              disabled={subQ === 0 ? !r1Choice : subQ === 1 ? !r2Choice : !r3Choice}
            >
              {subQ < 2 ? 'Next Prompt ▸' : 'Step 2: Think It Over ▸'}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: THINK IT OVER ── */}
      {step === 2 && (
        <div className="reflect-card glass-card anim-slide-up">
          <div className="reflect-header">
            <span className="reflect-badge">📓 Step 2 of 3 · Think It Over</span>
            <h2 className="reflect-title">Maker Studio Reflection</h2>
          </div>

          <p className="reflect-q-text">
            Jack added the same amount to every side. In your own words, why does that change the shape, and what should he do instead?
          </p>

          {/* Quick-insert chips */}
          <div className="quick-chips-row">
            <button
              type="button"
              className="quick-chip-btn"
              onClick={() =>
                setJournalText((prev) =>
                  prev ? `${prev} It stretches some sides more than others.` : 'It stretches some sides more than others.'
                )
              }
            >
              + "It stretches some sides more..."
            </button>
            <button
              type="button"
              className="quick-chip-btn"
              onClick={() =>
                setJournalText((prev) =>
                  prev ? `${prev} Multiply every side by scale factor k.` : 'Multiply every side by scale factor k.'
                )
              }
            >
              + "Multiply every side by k..."
            </button>
          </div>

          <textarea
            className="reflect-journal"
            rows="4"
            placeholder="Write your explanation here..."
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
          />

          <div className="reflect-actions-sticky">
            <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmitJournal}>
              View Scorecard 🏆
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SCORECARD ── */}
      {step === 3 && (
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title">Scale Master!</h1>
          <p className="trophy-sub" style={{ color: '#ffc107', fontWeight: 800 }}>
            Proportional Reasoning Mastery Complete ✅
          </p>

          {/* Stats Breakdown */}
          <div className="trophy-stats">
            <div className="trophy-stat">
              <span className="stat-value">{totalCorrect}</span>
              <span className="stat-label">/ 100 Questions</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value">{state?.xp || 0}</span>
              <span className="stat-label">XP Earned ⭐</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value">{state?.maxStreak || 0}</span>
              <span className="stat-label">Best Streak 🔥</span>
            </div>
          </div>

          {/* Stars line */}
          <div className="trophy-star-line">
            ⭐ {totalStars} / 30 Stars Earned
          </div>

          {/* Closed Accordion: Badges unlocked */}
          <div className="trophy-badges-accordion">
            <button
              type="button"
              className="badges-accordion-toggle"
              onClick={() => setShowBadges(!showBadges)}
              aria-expanded={showBadges}
            >
              <span>Badges Unlocked ({earnedBadges.length})</span>
              <span>{showBadges ? '▲' : '▼'}</span>
            </button>

            {showBadges && (
              <div className="badge-list anim-slide-up">
                {earnedBadges.map((b) => (
                  <div key={b.id} className="badge-pill">
                    <span style={{ fontSize: '1.4rem' }}>{b.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800 }}>{b.label}</span>
                      <span className="badge-desc">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="trophy-actions">
            <button type="button" className="btn btn-primary trophy-cta" onClick={playAgain}>
              🔄 Play Again
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => dispatch({ type: 'SET_PHASE', payload: 'intro' })}
            >
              🏠 Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
