// src/components/simulations/ScaleMachineStation.jsx
// Station A: Concept Discovery Lab (Free-play, no questions, completion by exploration flags)

import React, { useState } from 'react';
import StationFrame from './StationFrame.jsx';
import ScaleStage from '../shared/ScaleStage.jsx';

export default function ScaleMachineStation({ onComplete }) {
  const [microStep, setMicroStep] = useState(1); // 1 (A1), 2 (A2), 3 (A3)

  // A1 state
  const [a1K, setA1K] = useState(1);
  const [a1Flags, setA1Flags] = useState({ sawGrow: false, sawShrink: false, sawSame: true });

  // A2 state
  const [a2W, setA2W] = useState(6);
  const [a2H, setA2H] = useState(5);
  const [a2Flags, setA2Flags] = useState({ foundEqual: false, sawUnequal: true });

  // A3 state
  const [a3K, setA3K] = useState(1);
  const [a3Flags, setA3Flags] = useState({ reachedK3: false, visitedK2: false });

  // ── A1 HANDLERS ──
  function handleA1K(e) {
    const val = parseFloat(e.target.value);
    setA1K(val);
    setA1Flags((prev) => ({
      ...prev,
      sawGrow: prev.sawGrow || val > 1,
      sawShrink: prev.sawShrink || val < 1,
      sawSame: prev.sawSame || val === 1,
    }));
  }

  // ── A2 HANDLERS ──
  const a2RatioW = Math.round((a2W / 4) * 100) / 100;
  const a2RatioH = Math.round((a2H / 3) * 100) / 100;
  const a2IsEqual = Math.abs(a2RatioW - a2RatioH) < 0.05 && a2W > 0 && a2H > 0;

  function handleA2CornerChange(newW, newH) {
    setA2W(newW);
    setA2H(newH);
    const rW = newW / 4;
    const rH = newH / 3;
    const eq = Math.abs(rW - rH) < 0.05;
    setA2Flags((prev) => ({
      ...prev,
      foundEqual: prev.foundEqual || eq,
      sawUnequal: prev.sawUnequal || !eq,
    }));
  }

  // ── A3 HANDLERS ──
  function handleA3K(e) {
    const val = parseFloat(e.target.value);
    setA3K(val);
    setA3Flags((prev) => ({
      ...prev,
      reachedK3: prev.reachedK3 || val >= 3,
      visitedK2: prev.visitedK2 || val === 2,
    }));
  }

  function handleNext() {
    if (microStep === 1) setMicroStep(2);
    else if (microStep === 2) setMicroStep(3);
    else if (microStep === 3) onComplete?.();
  }

  function handleReset() {
    if (microStep === 1) setA1K(1);
    else if (microStep === 2) {
      setA2W(6);
      setA2H(5);
    } else if (microStep === 3) setA3K(1);
  }

  // ── RENDER MICRO-STEP A1 ──
  if (microStep === 1) {
    const pin = [50, 180];
    const objPoints = [
      [50, 180],
      [50 + 80, 180],
      [50, 180 - 60],
    ];
    const imgPoints = [
      [50, 180],
      [50 + 80 * a1K, 180],
      [50, 180 - 60 * a1K],
    ];

    const rays = [
      { x1: pin[0], y1: pin[1], x2: 50 + 80 * 4, y2: 180 },
      { x1: pin[0], y1: pin[1], x2: 50, y2: 180 - 60 * 4 },
      { x1: pin[0], y1: pin[1], x2: 50 + 80 * 4, y2: 180 - 60 * 4 },
    ];

    const labels = [
      { x: 50 + (80 * a1K) / 2, y: 198, text: `w: 4 ➔ ${Math.round(4 * a1K * 10) / 10}`, bg: true },
      { x: 30, y: 180 - (60 * a1K) / 2, text: `h: 3 ➔ ${Math.round(3 * a1K * 10) / 10}`, bg: true },
    ];

    const a1Done = a1Flags.sawGrow && a1Flags.sawShrink && a1Flags.sawSame;

    return (
      <StationFrame
        title="Scale Machine · Grow & Shrink"
        n={1}
        total={3}
        instruction="Slide k to test scaling. Notice how every length multiplies by k from the pin!"
        nextEnabled={a1Done}
        nextLabel="Next: Corner Lab ▸"
        onReset={handleReset}
        onNext={handleNext}
        success={a1Done}
        successMessage="Explored factors > 1, < 1, and = 1! Ready for corner matching."
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            pin={pin}
            rays={rays}
            objectShape={{ points: objPoints, label: 'Object (k=1)' }}
            imageShape={{ points: imgPoints, label: `Image (k=${a1K})` }}
            labels={labels}
          />
        }
        dock={
          <div className="micro-slider-wrap">
            <input
              type="range"
              min="0.25"
              max="4"
              step="0.25"
              value={a1K}
              onChange={handleA1K}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Scale factor k slider"
            />
            <span className="micro-readout">k = {a1K}</span>
          </div>
        }
      />
    );
  }

  // ── RENDER MICRO-STEP A2 ──
  if (microStep === 2) {
    const origin = [40, 170];
    const scalePx = 18;
    const objPoints = [
      [origin[0], origin[1]],
      [origin[0] + 4 * scalePx, origin[1]],
      [origin[0] + 4 * scalePx, origin[1] - 3 * scalePx],
      [origin[0], origin[1] - 3 * scalePx],
    ];
    const imgPoints = [
      [origin[0], origin[1]],
      [origin[0] + a2W * scalePx, origin[1]],
      [origin[0] + a2W * scalePx, origin[1] - a2H * scalePx],
      [origin[0], origin[1] - a2H * scalePx],
    ];

    const labels = [
      {
        x: 270,
        y: 45,
        text: `Width ratio: ${a2W} ÷ 4 = ${a2RatioW}`,
        bg: true,
        color: a2IsEqual ? '#86efac' : '#fca5a5',
      },
      {
        x: 270,
        y: 75,
        text: `Height ratio: ${a2H} ÷ 3 = ${a2RatioH}`,
        bg: true,
        color: a2IsEqual ? '#86efac' : '#fca5a5',
      },
      {
        x: 270,
        y: 110,
        text: a2IsEqual ? '✓ Proportional Copy!' : '✗ Stretched (Ratios differ)',
        bg: true,
        color: a2IsEqual ? '#4ade80' : '#ef5350',
      },
    ];

    const a2Done = a2Flags.foundEqual && a2Flags.sawUnequal;

    return (
      <StationFrame
        title="Scale Machine · Proportional Corner"
        n={2}
        total={3}
        instruction="Drag or adjust the corner handle. A true scaled copy turns green when both ratios match!"
        nextEnabled={a2Done}
        nextLabel="Next: Add vs Multiply ▸"
        onReset={handleReset}
        onNext={handleNext}
        success={a2Done}
        successMessage="Found equal ratio copy! Equal ratios define the scaled copy."
        stage={
          <ScaleStage
            viewBox="0 0 420 230"
            objectShape={{ points: objPoints, label: '4 × 3 Photo' }}
            imageShape={{ points: imgPoints, matched: a2IsEqual, label: `${a2W} × ${a2H}` }}
            labels={labels}
          />
        }
        dock={
          <div className="micro-slider-wrap">
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#cbd5e1' }}>Size:</span>
            <input
              type="range"
              min="2"
              max="12"
              step="1"
              value={a2W}
              onChange={(e) => {
                const nw = parseInt(e.target.value, 10);
                handleA2CornerChange(nw, a2H);
              }}
              className="micro-slider"
              data-manipulator="true"
              aria-label="Adjust width slider"
            />
            <button
              type="button"
              className="interactive-region-btn"
              onClick={() => handleA2CornerChange(8, 6)}
              aria-label="Set proportional 8 by 6"
            >
              Snap 8×6
            </button>
            <span className="micro-readout">{a2W}×{a2H}</span>
          </div>
        }
      />
    );
  }

  // ── RENDER MICRO-STEP A3 ──
  const a3Obj = [[30, 160], [30 + 50, 160], [30, 160 - 40]];
  // Multiply copy: 3k, 4k, 5k
  const a3MulPoints = [[110, 160], [110 + 50 * a3K, 160], [110, 160 - 40 * a3K]];
  // Add copy: 3+(3k-3), 4+(3k-3), 5+(3k-3) -> add = (k-1)*30
  const addPx = (a3K - 1) * 30;
  const a3AddPoints = [[250, 160], [250 + 50 + addPx, 160], [250, 160 - (40 + addPx)]];

  const a3Done = a3Flags.reachedK3 && a3Flags.visitedK2;

  return (
    <StationFrame
      title="Scale Machine · Add vs Multiply"
      n={3}
      total={3}
      instruction="Slide k to compare adding vs multiplying. See how adding visibly skews the proportions!"
      nextEnabled={a3Done}
      nextLabel="Complete Station A! 🎉"
      onReset={handleReset}
      onNext={handleNext}
      success={a3Done}
      successMessage="Concept mastered: multiplying scales evenly; adding skews shapes!"
      stage={
        <ScaleStage
          viewBox="0 0 420 230"
          objectShape={{ points: a3Obj, label: 'Original' }}
          labels={[
            { x: 110 + 25 * a3K, y: 178, text: `Multiply (k=${a3K}) ✓`, bg: true, color: '#86efac' },
            { x: 250 + 25 + addPx / 2, y: 178, text: `Add +${Math.round(addPx / 10)} ✗`, bg: true, color: '#f87171' },
          ]}
        >
          <polygon
            points={a3MulPoints.map((p) => `${p[0]},${p[1]}`).join(' ')}
            fill="rgba(76, 175, 80, 0.4)"
            stroke="#4caf50"
            strokeWidth="2.5"
          />
          <polygon
            points={a3AddPoints.map((p) => `${p[0]},${p[1]}`).join(' ')}
            fill="rgba(239, 83, 80, 0.3)"
            stroke="#ef5350"
            strokeWidth="2.5"
          />
        </ScaleStage>
      }
      dock={
        <div className="micro-slider-wrap">
          <input
            type="range"
            min="1"
            max="4"
            step="0.5"
            value={a3K}
            onChange={handleA3K}
            className="micro-slider"
            data-manipulator="true"
            aria-label="Scale growth multiplier slider"
          />
          <span className="micro-readout">k = {a3K}</span>
        </div>
      }
    />
  );
}
