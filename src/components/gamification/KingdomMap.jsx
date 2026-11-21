// src/components/gamification/KingdomMap.jsx
// Scale Factor Game Worlds Map adhering to PRD §8.4 & TRD §7

import React from 'react';
import './KingdomMap.css';
import StarRating from './StarRating.jsx';
import { calcStars } from '../../utils/scoring.js';
import { WORLDS } from '../../config/worlds.config.js';

export default function KingdomMap({
  districtScores,
  districtCorrect,
  currentDistrict,
  unlocked = [],
  onSelectDistrict,
  onReplayDistrict,
  onStartBoss,
  onJumpReflect,
}) {
  const totalStars = districtScores.reduce((s, sc) => {
    if (sc === null || sc === undefined) return s;
    return s + calcStars(sc);
  }, 0);

  const currentBoss = WORLDS[currentDistrict]?.boss || WORLDS[0].boss;

  return (
    <div className="play-map-card anim-slide-up">
      {/* Header Row */}
      <div className="play-map-head">
        <div>
          <h2 className="play-map-title">Scale Factor Game Worlds</h2>
          <p className="play-map-sub">
            10 Themed Worlds · Need 4/10 Correct to Unlock Next World
          </p>
        </div>
        <div className="play-star-pill">
          <span style={{ color: '#fdcb38' }}>⭐</span> {totalStars} / 30
        </div>
      </div>

      {/* 5 × 2 World Grid */}
      <div className="world-grid">
        {WORLDS.map((w, idx) => {
          const isCurrent = idx === currentDistrict;
          const isDone = districtScores?.[idx] !== null && districtScores?.[idx] !== undefined;
          const isUnl = unlocked[idx] ?? (idx === 0 || isDone);
          const score = isDone ? districtScores[idx] : districtCorrect?.[idx] || 0;
          const stars = isDone ? calcStars(score) : 0;
          const needsReplay = isDone && score < 4;

          return (
            <div
              key={w.id}
              className={`world-card ${isCurrent ? 'current' : ''} ${!isUnl ? 'locked' : ''} ${isDone ? 'completed' : ''}`}
              onClick={() => isUnl && onSelectDistrict && onSelectDistrict(idx)}
              role="button"
              tabIndex={isUnl ? 0 : -1}
              aria-label={`World ${idx + 1}: ${w.name}`}
            >
              <div className="world-card-top">
                <span className="world-badge">W{idx + 1}</span>
                <span className={`world-q-range ${isCurrent ? 'current-range' : ''}`}>
                  Q{idx * 10 + 1}–{idx * 10 + 10}
                </span>
              </div>

              <div className="world-icon">{isUnl ? w.emoji : '🔒'}</div>
              <div className="world-name">{w.name}</div>

              <div className="world-status">
                {needsReplay ? (
                  <button
                    type="button"
                    className="replay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReplayDistrict?.(idx);
                    }}
                  >
                    Replay ({score}/10)
                  </button>
                ) : isDone ? (
                  <div className="world-score-row">
                    <StarRating stars={stars} size="sm" />
                    <span className="score-text">{score}/10</span>
                  </div>
                ) : isCurrent ? (
                  <span className="play-status">Play →</span>
                ) : isUnl ? (
                  <span className="ready-status">Ready</span>
                ) : (
                  <span className="locked-status">Locked</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons Under the Grid */}
      <div className="world-actions">
        <button
          type="button"
          className="btn btn-primary boss-btn"
          onClick={onStartBoss}
          aria-label={`Boss Battle: ${currentBoss.name}`}
        >
          👑 Boss Battle: {currentBoss.name}
        </button>
        <button
          type="button"
          className="btn btn-outline reflect-btn"
          onClick={onJumpReflect}
          aria-label="Jump to Reflect Phase"
        >
          📓 Jump to Reflect Phase →
        </button>
      </div>
    </div>
  );
}
