// src/hooks/usePointerDrag.js
// Pointer Events drag hook for ScaleQuest interactive stations (Appendix A.1)

import { useRef } from 'react';

export function usePointerDrag({ onStart, onMove, onEnd, threshold = 6 }) {
  const s = useRef(null);

  const down = (e) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    s.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dragging: false };
  };

  const move = (e) => {
    const st = s.current;
    if (!st || st.id !== e.pointerId) return;
    const dx = e.clientX - st.x0;
    const dy = e.clientY - st.y0;
    if (!st.dragging && Math.hypot(dx, dy) >= threshold) {
      st.dragging = true;
      onStart?.(e);
    }
    if (st.dragging) onMove?.(e, { dx, dy, clientX: e.clientX, clientY: e.clientY });
  };

  const end = (e, cancelled) => {
    const st = s.current;
    if (!st || st.id !== e.pointerId) return;
    s.current = null;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {}
    onEnd?.(e, { tap: !st.dragging, cancelled });
  };

  return {
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: (e) => end(e, false),
    onPointerCancel: (e) => end(e, true),
    style: { touchAction: 'none' }, // ONLY on draggable elements
  };
}

export default usePointerDrag;
