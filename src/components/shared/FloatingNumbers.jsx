// src/components/shared/FloatingNumbers.jsx
// Floating geometric and scale symbols background for ScaleQuest

import React, { useMemo } from 'react';
import './FloatingNumbers.css';

const SCALE_SYMBOLS = ['📐', '📏', '🎚️', '🔍', '🪞', '✨', '🖨️', '1:50', '×2', '×3', 'k', '1/3', '1/2', '4 cm', '12 cm', '1:100', 'cm²', 'k²'];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: SCALE_SYMBOLS[i % SCALE_SYMBOLS.length],
      left: `${(i * 5.6 + 3) % 94}%`,
      delay: `${(i * 1.3) % 15}s`,
      duration: `${18 + (i % 5) * 4}s`,
      size: `${1.1 + (i % 4) * 0.4}rem`,
    }));
  }, []);

  return (
    <div className="floating-symbols-container" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-scale-symbol"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
