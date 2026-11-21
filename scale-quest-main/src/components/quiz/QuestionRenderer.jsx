// src/components/quiz/QuestionRenderer.jsx
// Question display with live ScaleStage visual aid and 4 options

import React from 'react';
import './QuestionRenderer.css';
import ScaleStage from '../shared/ScaleStage.jsx';

export default function QuestionRenderer({
  question,
  onAnswer,
  hintsShown = 0,
  showHint = false,
  onHint,
  isLocked = false,
  onPrev,
  onNext,
  canPrev = false,
}) {
  if (!question) return null;

  const { category, questionText, options, visualData, hint1, hint2 } = question;
  const categoryTag = category || 'SCALE FACTOR';
  const model = visualData?.model;

  return (
    <div className="qr-wrap glass-card anim-slide-up">
      {/* Category Tag */}
      <div className="qr-category-badge">
        <span className="cat-icon">📐</span> {categoryTag}
      </div>

      {/* Question Text */}
      <p className="qr-question">{questionText}</p>

      {/* Visual rendering via ScaleStage */}
      {model && (
        <div className="qr-visual">
          <ScaleStage
            viewBox="0 0 320 130"
            grid={true}
            objectShape={
              model.w && model.h
                ? {
                    points: [
                      [25, 105],
                      [25 + model.w * 8, 105],
                      [25 + model.w * 8, 105 - model.h * 8],
                      [25, 105 - model.h * 8],
                    ],
                    label: `${model.w}×${model.h}`,
                  }
                : model.sides
                ? {
                    points: [
                      [30, 105],
                      [30 + model.sides[0] * 8, 105],
                      [30, 105 - model.sides[1] * 8],
                    ],
                    label: 'Original',
                  }
                : null
            }
            labels={[
              model.k ? { x: 160, y: 25, text: `k = ${model.k}`, bg: true, color: '#fcd34d' } : null,
              model.n ? { x: 160, y: 25, text: `Scale 1 : ${model.n}`, bg: true, color: '#fcd34d' } : null,
            ].filter(Boolean)}
          />
        </div>
      )}

      {/* 2x2 Options Grid */}
      <div className="options-grid">
        {options?.map((opt, i) => (
          <button
            key={i}
            type="button"
            className="option-btn"
            onClick={() => !isLocked && onAnswer(opt)}
            disabled={isLocked}
            aria-label={`Option: ${opt}`}
          >
            <span>{opt}</span>
          </button>
        ))}
      </div>

      {/* Hint Display */}
      {showHint === 1 && hint1 && (
        <div className="qr-hint anim-slide-up" role="note">
          <span className="hint-icon">💡</span>
          <span>{hint1}</span>
        </div>
      )}
      {showHint === 2 && hint2 && (
        <div className="qr-hint anim-slide-up" role="note">
          <span className="hint-icon">🔑</span>
          <span>{hint2}</span>
        </div>
      )}

      {/* Action Row */}
      <div className="qr-actions-row">
        {hintsShown < 2 && onHint ? (
          <button
            type="button"
            className="btn btn-outline btn-sm hint-btn"
            onClick={onHint}
            aria-label="Show hint"
          >
            💡 Hint {hintsShown + 1}
          </button>
        ) : (
          <div />
        )}

        <div className="qr-nav-btns">
          {onPrev && (
            <button
              type="button"
              className="btn btn-outline btn-sm qr-nav-btn"
              onClick={onPrev}
              disabled={!canPrev}
              aria-label="Previous question"
            >
              ← Prev
            </button>
          )}
          {onNext && (
            <button
              type="button"
              className="btn btn-primary btn-sm qr-nav-btn"
              onClick={onNext}
              aria-label="Next question"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
