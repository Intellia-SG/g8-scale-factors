// src/hooks/useVisualScale.js
// Visual scale hook ensuring SVG labels render at >= 12px (TRD §9.7)

import { useState, useEffect } from 'react';

export function useVisualScale(svgRef, viewBoxWidth = 400) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!svgRef.current) return;

    const updateScale = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0) {
        setScale(rect.width / viewBoxWidth);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [svgRef, viewBoxWidth]);

  // Minimum readable font size in user/SVG coordinate units
  const minFontSize = (basePx = 13) => {
    return Math.max(basePx, 12 / (scale || 1));
  };

  return { scale, minFontSize };
}

export default useVisualScale;
