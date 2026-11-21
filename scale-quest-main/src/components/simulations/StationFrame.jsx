// src/components/simulations/StationFrame.jsx
// Common frame for all 18 micro-screens (S5, S6, M4, M5)

import React from 'react';
import './Stations.css';

export default function StationFrame({
  title,
  n,
  total,
  instruction,
  stage,
  dock,
  onReset,
  onNext,
  nextEnabled = true,
  nextLabel = 'Next ▸',
  success = false,
  successMessage,
}) {
  return (
    <div className="station-wrap">
      {/* Head line: station title + step pill */}
      <div className="micro-head">
        <h2 className="station-title">{title}</h2>
        <span className="micro-count">
          {n} / {total}
        </span>
      </div>

      {/* Body: Stage (flexible, min 150px) + Side controls */}
      <div className="micro-body">
        <div className="micro-stage">{stage}</div>

        <div className="micro-side">
          <div className="station-guide-card">
            {success && successMessage ? (
              <p className="station-guide-text success-text">
                🎉 {successMessage}
              </p>
            ) : (
              <p className="station-guide-text">{instruction}</p>
            )}
          </div>

          <div className="micro-dock">{dock}</div>

          <div className="micro-actions">
            {onReset && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={onReset}
                aria-label="Reset micro-screen"
              >
                Reset
              </button>
            )}
            {onNext && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={onNext}
                disabled={!nextEnabled}
                aria-label={nextLabel}
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
