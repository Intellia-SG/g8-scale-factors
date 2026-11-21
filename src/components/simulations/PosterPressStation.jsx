// src/components/simulations/PosterPressStation.jsx
// Station B: Build-to-Target (Match ghost, place vertices, ruler scaling)

import React, { useState } from 'react';
import StationFrame from './StationFrame.jsx';
import ScaleStage from '../shared/ScaleStage.jsx';

export default function PosterPressStation({ onComplete }) {
  const [microStep, setMicroStep] = useState(1); // 1 (B1), 2 (B2), 3 (B3)

  // ── B1: Slider k against ghost target (3 rounds: k=2, k=0.5, k=1.5) ──
  const [b1Round, setB1Round] = useState(0);
  const [b1K, setB1K] = useState(1);
  const b1Targets = [
    { targetK: 2, objW: 40, objH: 20, desc: 'Target: ×2 Enlargement (8×4)' },
    { targetK: 0.5, objW: 80, objH: 40, desc: 'Target: ×1/2 Reduction (2×1)' },
    { targetK: 1.5, objW: 40, objH: 20, desc: 'Target: ×1.5 Enlargement (6×3)' },
  ];
  const currentB1 = b1Targets[b1Round] || b1Targets[0];
  const b1Matched = Math.abs(b1K - currentB1.targetK) < 0.05;

  // ── B2: Draggable vertices along rays (R1 triangle k=2, R2 square k=3) ──
  const [b2Round, setB2Round] = useState(0);
  // Triangle target vertices: (2,2)=>(60,60), (6,2)=>(180,60), (2,4)=>(60,120)
  const [b2Placed, setB2Placed] = useState({ v1: false, v2: false, v3: false });

  // ── B3: Draggable line end on ruler (3 rounds) ──
  const [b3Round, setB3Round] = useState(0);
  const [b3Cm, setB3Cm] = useState(1);
  const b3Scenarios = [
    { scale: '1 cm : 2 m', real: '8 m', targetCm: 4, desc: 'Scale 1 cm : 2 m ➔ 8 m real wall' },
    { scale: '1 cm : 5 m', real: '15 m', targetCm: 3, desc: 'Scale 1 cm : 5 m ➔ 15 m path' },
    { scale: '1 cm : 50 cm', real: '250 cm', targetCm: 5, desc: 'Scale 1 cm : 50 cm ➔ 250 cm model' },
  ];
  const currentB3 = b3Scenarios[b3Round] || b3Scenarios[0];
  const b3Matched = b3Cm === currentB3.targetCm;

  function handleB1Next() {
    if (b1Round < 2) {
      setB1Round(b1Round + 1);
      setB1K(1);
    } else {
      setMicroStep(2);
    }
  }

  function handleB2Next() {
    if (b2Round === 0) {
      setB2Round(1);
      setB2Placed({ v1: false, v2: false, v3: false });
    } else {
      setMicroStep(3);
    }
  }

  function handleB3Next() {
    if (b3Round < 2) {
      setB3Round(b3Round + 1);
      setB3Cm(1);
    } else {
      onComplete?.();
    }
  }

  // ── B1 RENDER ──
  if (microStep === 1) {
    const origin = [40, 160];
    const ghostPoints = [
      [origin[0], origin[1]],
      [origin[0] + currentB1.objW * currentB1.targetK, origin[1]],
      [origin[0] + currentB1.objW * currentB1.targetK, origin[1] - currentB1.objH * currentB1.targetK],
      [origin[0], origin[1] - currentB1.objH * currentB1.targetK],
    ];
    const imgPoints = [
      [origin[0], origin[1]],
      [origin[0] + currentB1.objW * b1K, origin[1]],
      [origin[0] + currentB1.objW * b1K, origin[1] - currentB1.objH * b1K],
      [origin[0], origin[1] - currentB1.objH * b1K],
    ];

    return (
      <StationFrame
        title={`Poster Press · Fit to Ghost (Round ${b1Round + 1}/3)`}
        n={1}
        total={3}
        instruction={`Adjust k until the yellow poster fits the dashed ghost target! (${currentB1.desc})`}
        nextEnabled={b1Matched}
        nextLabel={b1Round < 2 ? 'Next Round ▸' : 'Next: Ray Placement ▸'}
        onReset={() => setB1K(1)}
        onNext={handleB1Next}
        success={b1Matched}
        successMessage="Exact lock! Scale factor matches target."
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            ghostShape={{ points: ghostPoints }}
            imageShape={{ points: imgPoints, matched: b1Matched }}
            labels={[
              {
                x: 290,
                y: 50,
                text: b1Matched ? 'TARGET LOCKED ✓' : `Target k = ${currentB1.targetK}`,
                bg: true,
                color: b1Matched ? '#4ade80' : '#fcd34d',
              },
            ]}
          />
        }
        dock={
          <div className="micro-slider-wrap">
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={b1K}
              onChange={(e) => setB1K(parseFloat(e.target.value))}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Poster scale factor slider"
            />
            <span className="micro-readout">k = {b1K}</span>
          </div>
        }
      />
    );
  }

  // ── B2 RENDER ──
  if (microStep === 2) {
    const pin = [30, 180];
    const rays = [
      { x1: 30, y1: 180, x2: 240, y2: 60 },
      { x1: 30, y1: 180, x2: 360, y2: 180 },
      { x1: 30, y1: 180, x2: 30, y2: 30 },
    ];
    const allPlaced = b2Placed.v1 && b2Placed.v2 && b2Placed.v3;

    return (
      <StationFrame
        title={`Poster Press · Ray Placement (Round ${b2Round + 1}/2)`}
        n={2}
        total={3}
        instruction="Tap the ray targets to snap vertices at exactly 2× distance from the pin!"
        nextEnabled={allPlaced}
        nextLabel={b2Round === 0 ? 'Next Round ▸' : 'Next: Scale Ruler ▸'}
        onReset={() => setB2Placed({ v1: false, v2: false, v3: false })}
        onNext={handleB2Next}
        success={allPlaced}
        successMessage="All vertices locked along the rays! Proportional shape complete."
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            pin={pin}
            rays={rays}
            objectShape={{
              points: [
                [30, 180],
                [30 + 60, 180],
                [30 + 30, 180 - 45],
              ],
              label: 'Original (k=1)',
            }}
          >
            {/* Target 1 */}
            <circle
              cx="150"
              cy="180"
              r="14"
              fill={b2Placed.v1 ? '#4caf50' : 'rgba(255,193,7,0.3)'}
              stroke="#ffc107"
              strokeWidth="2"
              strokeDasharray={b2Placed.v1 ? 'none' : '3 3'}
              style={{ cursor: 'pointer' }}
              onClick={() => setB2Placed((p) => ({ ...p, v1: true }))}
            />
            {/* Target 2 */}
            <circle
              cx="90"
              cy="90"
              r="14"
              fill={b2Placed.v2 ? '#4caf50' : 'rgba(255,193,7,0.3)'}
              stroke="#ffc107"
              strokeWidth="2"
              strokeDasharray={b2Placed.v2 ? 'none' : '3 3'}
              style={{ cursor: 'pointer' }}
              onClick={() => setB2Placed((p) => ({ ...p, v2: true }))}
            />
            {/* Complete marker */}
            {allPlaced && (
              <polygon
                points="30,180 150,180 90,90"
                fill="rgba(76, 175, 80, 0.35)"
                stroke="#4caf50"
                strokeWidth="3"
              />
            )}
          </ScaleStage>
        }
        dock={
          <div className="micro-slider-wrap">
            <button
              type="button"
              className="interactive-region-btn"
              data-manipulator="true"
              onClick={() => setB2Placed({ v1: true, v2: true, v3: true })}
            >
              Snap All to k = 2
            </button>
            <span className="micro-readout">
              {allPlaced ? 'LOCKED ✓' : 'Tap points'}
            </span>
          </div>
        }
      />
    );
  }

  // ── B3 RENDER ──
  return (
    <StationFrame
      title={`Poster Press · Plan Ruler (Round ${b3Round + 1}/3)`}
      n={3}
      total={3}
      instruction={`Adjust the drawing line on the ruler to represent the real length! (${currentB3.desc})`}
      nextEnabled={b3Matched}
      nextLabel={b3Round < 2 ? 'Next Round ▸' : 'Complete Station B! 🎉'}
      onReset={() => setB3Cm(1)}
      onNext={handleB3Next}
      success={b3Matched}
      successMessage="Perfect scale measurement locked!"
      stage={
        <ScaleStage
          viewBox="0 0 420 230"
          labels={[
            { x: 210, y: 35, text: `Scale ${currentB3.scale}`, bg: true, color: '#fcd34d' },
            { x: 210, y: 65, text: `Real Length: ${currentB3.real}`, bg: true, color: '#86efac' },
          ]}
        >
          {/* Ruler body */}
          <g transform="translate(40, 110)">
            <rect width="340" height="50" fill="rgba(255,255,255,0.08)" stroke="#cbd5e1" strokeWidth="2" rx="4" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((cm) => (
              <g key={cm} transform={`translate(${cm * 45}, 0)`}>
                <line x1="0" y1="0" x2="0" y2="18" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="32" fill="#cbd5e1" fontSize="12" fontWeight="800" textAnchor="middle">
                  {cm} cm
                </text>
              </g>
            ))}
            {/* Active Drawing Line */}
            <rect
              x="0"
              y="5"
              width={b3Cm * 45}
              height="8"
              fill={b3Matched ? '#4caf50' : '#f59e0b'}
              rx="4"
            />
          </g>
        </ScaleStage>
      }
      dock={
        <div className="micro-slider-wrap">
          <input
            type="range"
            min="1"
            max="7"
            step="0.5"
            value={b3Cm}
            onChange={(e) => setB3Cm(parseFloat(e.target.value))}
            className="micro-slider"
            data-manipulator="true"
            aria-label="Ruler drawing length slider"
          />
          <span className="micro-readout">Drawing = {b3Cm} cm</span>
        </div>
      }
    />
  );
}
