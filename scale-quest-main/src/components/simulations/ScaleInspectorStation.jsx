// src/components/simulations/ScaleInspectorStation.jsx
// Station D: Error Detective (Replay flawed working, tap exact fault, repair)

import React, { useState } from 'react';
import StationFrame from './StationFrame.jsx';
import ScaleStage from '../shared/ScaleStage.jsx';

export default function ScaleInspectorStation({ onComplete }) {
  const [round, setRound] = useState(0); // 0 (M-ADD) or 1 (M-INVERT)
  const [subStep, setSubStep] = useState(1); // 1 (D1 scrub), 2 (D2 tap fault), 3 (D3 repair)

  // D1 state
  const [scrubStep, setScrubStep] = useState(0);
  const [scrubPassed, setScrubPassed] = useState(false);

  // D2 state
  const [tappedFault, setTappedFault] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState('');

  // D3 state
  const [d3K, setD3K] = useState(1);

  const isD1 = subStep === 1;
  const isD2 = subStep === 2;
  const isD3 = subStep === 3;

  const d3Target = round === 0 ? 2 : 3;
  const d3Repaired = d3K === d3Target;

  function handleScrub(e) {
    const val = parseInt(e.target.value, 10);
    setScrubStep(val);
    if (val >= 2) {
      setScrubPassed(true);
    }
  }

  function handleTapDiagram(fault) {
    if (fault) {
      setTappedFault(true);
      setWrongFeedback('');
    } else {
      setWrongFeedback('That part is correct. Look for where adding or inverting occurred!');
    }
  }

  function handleNext() {
    if (isD1) {
      setSubStep(2);
      setTappedFault(false);
      setWrongFeedback('');
    } else if (isD2) {
      setSubStep(3);
      setD3K(1);
    } else if (isD3) {
      if (round === 0) {
        setRound(1);
        setSubStep(1);
        setScrubStep(0);
        setScrubPassed(false);
      } else {
        onComplete?.();
      }
    }
  }

  function handleReset() {
    if (isD1) {
      setScrubStep(0);
      setScrubPassed(false);
    } else if (isD2) {
      setTappedFault(false);
      setWrongFeedback('');
    } else if (isD3) {
      setD3K(1);
    }
  }

  // ── D1: Scrub Flawed Working ──
  if (isD1) {
    return (
      <StationFrame
        title={`Scale Inspector · D1: Replay Flawed Working (Round ${round + 1}/2)`}
        n={round * 3 + 1}
        total={6}
        instruction={
          round === 0
            ? 'Scrub through the student work to watch them scale a 3-4-5 triangle by adding +2.'
            : 'Scrub through the work to see how inverting the fraction shrunk the banner instead of enlarging it.'
        }
        nextEnabled={scrubPassed}
        nextLabel="Next: Spot the Fault ▸"
        onReset={handleReset}
        onNext={handleNext}
        success={scrubPassed}
        successMessage="Replay inspected! Now identify the exact fault in the diagram."
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            labels={[
              {
                x: 210,
                y: 30,
                text:
                  round === 0
                    ? `Step ${scrubStep + 1}: ${scrubStep === 0 ? 'Original 3-4-5' : scrubStep === 1 ? 'Added +2 to each edge' : 'Distorted copy: 5-6-7 (Unequal ratios!)'}`
                    : `Step ${scrubStep + 1}: ${scrubStep === 0 ? 'Banner: 4 cm ➔ 12 cm' : scrubStep === 1 ? 'Wrote k = 4 ÷ 12 = 1/3' : 'Applied 1/3: Shrunk to 1.3 cm!'}` ,
                bg: true,
                color: scrubStep === 2 ? '#f87171' : '#fcd34d',
              },
            ]}
          >
            {round === 0 ? (
              <g transform="translate(100, 70)">
                <polygon
                  points={`0,100 ${80 + scrubStep * 20},100 0,${100 - (60 + scrubStep * 20)}`}
                  fill="rgba(239, 83, 80, 0.35)"
                  stroke="#ef5350"
                  strokeWidth="2.5"
                />
              </g>
            ) : (
              <g transform="translate(80, 80)">
                <rect
                  width={scrubStep === 2 ? 40 : 120}
                  height="40"
                  fill="rgba(239, 83, 80, 0.35)"
                  stroke="#ef5350"
                  strokeWidth="2.5"
                  rx="4"
                />
              </g>
            )}
          </ScaleStage>
        }
        dock={
          <div className="micro-slider-wrap">
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#cbd5e1' }}>Scrub:</span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={scrubStep}
              onChange={handleScrub}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Replay scrub slider"
            />
            <span className="micro-readout">Step {scrubStep + 1}/3</span>
          </div>
        }
      />
    );
  }

  // ── D2: Tap Exact Fault ──
  if (isD2) {
    return (
      <StationFrame
        title={`Scale Inspector · D2: Tap the Fault (Round ${round + 1}/2)`}
        n={round * 3 + 2}
        total={6}
        instruction={
          round === 0
            ? 'Tap the mistake on screen: Find the added strips (+2) that ruined the proportions!'
            : 'Tap the mistake on screen: Find the inverted fraction (4 over 12)!'
        }
        nextEnabled={tappedFault}
        nextLabel="Next: Repair Proportions ▸"
        onReset={handleReset}
        onNext={handleNext}
        success={tappedFault}
        successMessage={
          round === 0
            ? 'Fault identified: student added +2 instead of multiplying by 2!'
            : 'Fault identified: student inverted k as object ÷ image instead of image ÷ object!'
        }
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            labels={[
              {
                x: 210,
                y: 35,
                text: wrongFeedback || (tappedFault ? 'MISTAKE LOCATED ✓' : 'Tap the faulty calculation:'),
                bg: true,
                color: wrongFeedback ? '#f87171' : tappedFault ? '#4ade80' : '#ffffff',
              },
            ]}
          >
            {round === 0 ? (
              <g transform="translate(140, 75)">
                {/* Object triangle */}
                <polygon points="0,80 80,80 0,20" fill="none" stroke="#9c7fd8" strokeWidth="2" />
                {/* Tap targets */}
                <rect
                  x="80"
                  y="70"
                  width="40"
                  height="20"
                  rx="4"
                  fill={tappedFault ? '#22c55e' : '#ef4444'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTapDiagram(true)}
                />
                <text x="100" y="85" fill="#fff" fontSize="12" fontWeight="900" textAnchor="middle">+2 cm</text>
              </g>
            ) : (
              <g transform="translate(130, 80)">
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="50"
                  rx="8"
                  fill={tappedFault ? 'rgba(34,197,94,0.3)' : 'rgba(239,83,80,0.3)'}
                  stroke={tappedFault ? '#22c55e' : '#ef5350'}
                  strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTapDiagram(true)}
                />
                <text x="80" y="32" fill="#fff" fontSize="18" fontWeight="900" textAnchor="middle">
                  k = 4 ÷ 12 = 1/3
                </text>
              </g>
            )}
          </ScaleStage>
        }
        dock={
          <div className="micro-slider-wrap">
            <button
              type="button"
              className={`interactive-region-btn error-tap-target ${tappedFault ? 'selected-fault' : ''}`}
              data-manipulator="true"
              onClick={() => handleTapDiagram(true)}
            >
              {round === 0 ? 'Fault: Added +2 Strips' : 'Fault: Inverted Fraction 4/12'}
            </button>
            <span className="micro-readout">{tappedFault ? 'LOCKED ✓' : 'Tap fault'}</span>
          </div>
        }
      />
    );
  }

  // ── D3: Repair Proportions ──
  return (
    <StationFrame
      title={`Scale Inspector · D3: Repair Proportions (Round ${round + 1}/2)`}
      n={round * 3 + 3}
      total={6}
      instruction={
        round === 0
          ? 'Repair the triangle: Set scale factor k = 2 to multiply every side (6, 8, 10).'
          : 'Repair the banner: Set correct scale factor k = 12 ÷ 4 = 3.'
      }
      nextEnabled={d3Repaired}
      nextLabel={round === 0 ? 'Next Round ▸' : 'Complete Station D! 🎉'}
      onReset={handleReset}
      onNext={handleNext}
      success={d3Repaired}
      successMessage="Repaired! All corresponding sides are now strictly proportional."
      stage={
        <ScaleStage
          viewBox="0 0 420 230"
          labels={[
            {
              x: 210,
              y: 35,
              text: d3Repaired ? `REPAIRED: k = ${d3Target} Proportional ✓` : `Current k = ${d3K}`,
              bg: true,
              color: d3Repaired ? '#4ade80' : '#fcd34d',
            },
          ]}
        >
          {round === 0 ? (
            <g transform="translate(100, 60)">
              <polygon
                points={`0,120 ${40 * d3K},120 0,${120 - 30 * d3K}`}
                fill={d3Repaired ? 'rgba(76, 175, 80, 0.4)' : 'rgba(255, 193, 7, 0.3)'}
                stroke={d3Repaired ? '#4caf50' : '#ffc107'}
                strokeWidth="2.5"
              />
            </g>
          ) : (
            <g transform="translate(80, 80)">
              <rect
                width={30 * d3K}
                height="40"
                fill={d3Repaired ? 'rgba(76, 175, 80, 0.4)' : 'rgba(255, 193, 7, 0.3)'}
                stroke={d3Repaired ? '#4caf50' : '#ffc107'}
                strokeWidth="2.5"
                rx="4"
              />
            </g>
          )}
        </ScaleStage>
      }
      dock={
        <div className="micro-slider-wrap">
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={d3K}
            onChange={(e) => setD3K(parseInt(e.target.value, 10))}
            className="micro-slider"
            data-manipulator="true"
            aria-label="Repair scale factor slider"
          />
          <span className="micro-readout">k = {d3K}</span>
        </div>
      }
    />
  );
}
