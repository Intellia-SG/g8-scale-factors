// src/components/simulations/ModelMakerStation.jsx
// Station C: Multi-step composite builder (2 rounds × 3 chained steps: C1, C2, C3)

import React, { useState } from 'react';
import StationFrame from './StationFrame.jsx';
import ScaleStage from '../shared/ScaleStage.jsx';

export default function ModelMakerStation({ onComplete }) {
  const [round, setRound] = useState(0); // 0 or 1
  const [step, setStep] = useState(1); // 1 (C1), 2 (C2), 3 (C3)

  // C1 State: Dial k
  const [c1K, setC1K] = useState(1.0);
  // C2 State: Drag image side
  const [c2Len, setC2Len] = useState(10);
  // C3 State: Drag object side (backwards)
  const [c3Len, setC3Len] = useState(5);

  const roundsConfig = [
    {
      objSides: [4, 6, 8],
      targetK: 2.5,
      knownImgDE: 10,
      c2Target: 15, // 6 * 2.5
      c3GivenImg: 20,
      c3TargetObj: 8, // 20 / 2.5
    },
    {
      objSides: [8, 12, 16],
      targetK: 0.5,
      knownImgDE: 4,
      c2Target: 6, // 12 * 0.5
      c3GivenImg: 8,
      c3TargetObj: 16, // 8 / 0.5
    },
  ];

  const cfg = roundsConfig[round];

  const c1Matched = Math.abs(c1K - cfg.targetK) < 0.04;
  const c2Matched = Math.abs(c2Len - cfg.c2Target) < 0.4;
  const c3Matched = Math.abs(c3Len - cfg.c3TargetObj) < 0.4;

  function handleNextStep() {
    if (step === 1) {
      setStep(2);
      setC2Len(cfg.c2Target - 4);
    } else if (step === 2) {
      setStep(3);
      setC3Len(cfg.c3TargetObj - 3);
    } else if (step === 3) {
      if (round === 0) {
        setRound(1);
        setStep(1);
        setC1K(1.0);
      } else {
        onComplete?.();
      }
    }
  }

  function handleReset() {
    if (step === 1) setC1K(1.0);
    else if (step === 2) setC2Len(cfg.c2Target - 4);
    else if (step === 3) setC3Len(cfg.c3TargetObj - 3);
  }

  // ── C1 RENDER: Dial Factor k ──
  if (step === 1) {
    return (
      <StationFrame
        title={`Model Maker · Step 1: Find k (Round ${round + 1}/2)`}
        n={round * 3 + 1}
        total={6}
        instruction={`Side AB (${cfg.objSides[0]} cm) scales to DE (${cfg.knownImgDE} cm). Adjust k until the stretch bar matches!`}
        nextEnabled={c1Matched}
        nextLabel="Step 2: Scale Edge ▸"
        onReset={handleReset}
        onNext={handleNextStep}
        success={c1Matched}
        successMessage={`Locked k = ${cfg.targetK}! Scale factor carried forward.`}
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            labels={[
              { x: 100, y: 50, text: `Original AB = ${cfg.objSides[0]} cm`, bg: true, color: '#c4b5fd' },
              { x: 280, y: 50, text: `Target DE = ${cfg.knownImgDE} cm`, bg: true, color: '#fde68a' },
              {
                x: 210,
                y: 190,
                text: c1Matched ? `MATCH: ${cfg.knownImgDE} ÷ ${cfg.objSides[0]} = ${cfg.targetK} ✓` : `k = ${c1K}`,
                bg: true,
                color: c1Matched ? '#4ade80' : '#ffffff',
              },
            ]}
          >
            {/* Stretch bars */}
            <g transform="translate(60, 110)">
              <rect width={cfg.objSides[0] * 18} height="20" fill="#7c5cbf" rx="4" />
              <text x={(cfg.objSides[0] * 18) / 2} y="15" fill="#fff" fontSize="11" fontWeight="800" textAnchor="middle">
                {cfg.objSides[0]} cm
              </text>
            </g>
            <g transform="translate(220, 110)">
              {/* Target Ghost */}
              <rect
                width={cfg.knownImgDE * 18}
                height="20"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
                rx="4"
              />
              {/* Scaled bar */}
              <rect
                width={cfg.objSides[0] * c1K * 18}
                height="20"
                fill={c1Matched ? '#4caf50' : '#f59e0b'}
                rx="4"
              />
            </g>
          </ScaleStage>
        }
        dock={
          <div className="micro-slider-wrap">
            <input
              type="range"
              min="0.25"
              max="3.5"
              step="0.05"
              value={c1K}
              onChange={(e) => setC1K(parseFloat(e.target.value))}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Scale factor k dial"
            />
            <span className="micro-readout">k = {c1K}</span>
          </div>
        }
      />
    );
  }

  // ── C2 RENDER: Scale Next Edge ──
  if (step === 2) {
    return (
      <StationFrame
        title={`Model Maker · Step 2: Forward Scale (Round ${round + 1}/2)`}
        n={round * 3 + 2}
        total={6}
        instruction={`Multiply side BC (${cfg.objSides[1]} cm) by locked k = ${cfg.targetK}. Drag to target length!`}
        nextEnabled={c2Matched}
        nextLabel="Step 3: Reverse Gap ▸"
        onReset={handleReset}
        onNext={handleNextStep}
        success={c2Matched}
        successMessage={`Perfect! ${cfg.objSides[1]} × ${cfg.targetK} = ${cfg.c2Target} cm locked.`}
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            labels={[
              { x: 100, y: 50, text: `Original BC = ${cfg.objSides[1]} cm`, bg: true, color: '#c4b5fd' },
              { x: 280, y: 50, text: `Target EF = ${cfg.c2Target} cm`, bg: true, color: '#fde68a' },
              {
                x: 210,
                y: 190,
                text: c2Matched ? `MATCH: ${c2Len} cm ✓` : `Current: ${c2Len} cm`,
                bg: true,
                color: c2Matched ? '#4ade80' : '#ffffff',
              },
            ]}
          >
            <g transform="translate(60, 110)">
              <rect width={cfg.objSides[1] * 12} height="20" fill="#7c5cbf" rx="4" />
            </g>
            <g transform="translate(200, 110)">
              <rect
                width={cfg.c2Target * 12}
                height="20"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
                rx="4"
              />
              <rect width={c2Len * 12} height="20" fill={c2Matched ? '#4caf50' : '#f59e0b'} rx="4" />
            </g>
          </ScaleStage>
        }
        dock={
          <div className="micro-slider-wrap">
            <input
              type="range"
              min="2"
              max="24"
              step="0.5"
              value={c2Len}
              onChange={(e) => setC2Len(parseFloat(e.target.value))}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Image edge length handle"
            />
            <span className="micro-readout">EF = {c2Len} cm</span>
          </div>
        }
      />
    );
  }

  // ── C3 RENDER: Reverse Gap ──
  return (
    <StationFrame
      title={`Model Maker · Step 3: Backward Scale (Round ${round + 1}/2)`}
      n={round * 3 + 3}
      total={6}
      instruction={`Work backwards: Image DF is ${cfg.c3GivenImg} cm. Divide by k = ${cfg.targetK} to restore object AC!`}
      nextEnabled={c3Matched}
      nextLabel={round === 0 ? 'Next Round ▸' : 'Complete Station C! 🎉'}
      onReset={handleReset}
      onNext={handleNextStep}
      success={c3Matched}
      successMessage={`Restored! ${cfg.c3GivenImg} ÷ ${cfg.targetK} = ${cfg.c3TargetObj} cm.`}
      stage={
        <ScaleStage
          viewBox="0 0 420 230"
          labels={[
            { x: 100, y: 50, text: `Restore Object AC`, bg: true, color: '#c4b5fd' },
            { x: 280, y: 50, text: `Image DF = ${cfg.c3GivenImg} cm`, bg: true, color: '#fde68a' },
            {
              x: 210,
              y: 190,
              text: c3Matched ? `MATCH: ${c3Len} cm ✓` : `Current AC: ${c3Len} cm`,
              bg: true,
              color: c3Matched ? '#4ade80' : '#ffffff',
            },
          ]}
        >
          <g transform="translate(60, 110)">
            <rect
              width={cfg.c3TargetObj * 12}
              height="20"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
              rx="4"
            />
            <rect width={c3Len * 12} height="20" fill={c3Matched ? '#4caf50' : '#9c7fd8'} rx="4" />
          </g>
          <g transform="translate(220, 110)">
            <rect width={cfg.c3GivenImg * 7} height="20" fill="#f59e0b" rx="4" />
          </g>
        </ScaleStage>
      }
      dock={
        <div className="micro-slider-wrap">
          <input
            type="range"
            min="2"
            max="20"
            step="0.5"
            value={c3Len}
            onChange={(e) => setC3Len(parseFloat(e.target.value))}
            className="micro-slider"
            data-manipulator="true"
            aria-label="Object length adjuster slider"
          />
          <span className="micro-readout">AC = {c3Len} cm</span>
        </div>
      }
    />
  );
}
