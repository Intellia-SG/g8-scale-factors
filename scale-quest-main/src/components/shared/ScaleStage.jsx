// src/components/shared/ScaleStage.jsx
// Core responsive SVG visualization engine for ScaleQuest

import React, { useRef } from 'react';
import { useVisualScale } from '../../hooks/useVisualScale.js';

export default function ScaleStage({
  viewBox = '0 0 400 250',
  grid = true,
  pin,
  rays = [],
  objectShape,
  imageShape,
  ghostShape,
  labels = [],
  draggableHandles = [],
  onDragStart,
  children,
}) {
  const svgRef = useRef(null);
  const vbParts = viewBox.split(' ').map(Number);
  const vbW = vbParts[2] || 400;
  const vbH = vbParts[3] || 250;
  const { minFontSize } = useVisualScale(svgRef, vbW);

  const fontSize = minFontSize(13);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="scale-stage-svg"
      role="img"
      aria-label="Geometry scaling diagram"
    >
      <defs>
        <pattern id="grid-pat" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
        <linearGradient id="obj-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9c7fd8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c5cbf" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="img-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffc107" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffa000" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {grid && <rect width={vbW} height={vbH} fill="url(#grid-pat)" />}

      {/* Dashed Rays from pin */}
      {rays.map((r, i) => (
        <line
          key={`ray-${i}`}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="rgba(255, 193, 7, 0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      ))}

      {/* Ghost Target Shape (dashed) */}
      {ghostShape && (
        <polygon
          points={ghostShape.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      )}

      {/* Object Shape (Original - Purple #9c7fd8) */}
      {objectShape && (
        <g className="object-shape-group">
          <polygon
            points={objectShape.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
            fill="url(#obj-grad)"
            stroke="#9c7fd8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {objectShape.label && (
            <text
              x={objectShape.labelPos?.[0] ?? objectShape.points[0][0]}
              y={objectShape.labelPos?.[1] ?? objectShape.points[0][1] - 8}
              fill="#c4b5fd"
              fontSize={fontSize}
              fontWeight="800"
              fontFamily="var(--font-body)"
              textAnchor="middle"
            >
              {objectShape.label}
            </text>
          )}
        </g>
      )}

      {/* Image Shape (Scaled Copy - Gold #ffc107 / Green if matched) */}
      {imageShape && (
        <g className="image-shape-group">
          <polygon
            points={imageShape.points.map((p) => `${p[0]},${p[1]}`).join(' ')}
            fill={imageShape.matched ? 'rgba(76, 175, 80, 0.45)' : imageShape.mismatched ? 'rgba(239, 83, 80, 0.35)' : 'url(#img-grad)'}
            stroke={imageShape.matched ? '#4caf50' : imageShape.mismatched ? '#ef5350' : '#ffc107'}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {imageShape.label && (
            <text
              x={imageShape.labelPos?.[0] ?? imageShape.points[0][0]}
              y={imageShape.labelPos?.[1] ?? imageShape.points[0][1] - 8}
              fill={imageShape.matched ? '#a7f3d0' : '#fde68a'}
              fontSize={fontSize}
              fontWeight="800"
              fontFamily="var(--font-body)"
              textAnchor="middle"
            >
              {imageShape.label}
            </text>
          )}
        </g>
      )}

      {/* Labels */}
      {labels.map((lbl, i) => (
        <g key={`lbl-${i}`} transform={`translate(${lbl.x}, ${lbl.y})`}>
          {lbl.bg && (
            <rect
              x="-24"
              y="-12"
              width="48"
              height="22"
              rx="6"
              fill="rgba(10, 10, 40, 0.85)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          )}
          <text
            x="0"
            y="4"
            fill={lbl.color || '#ffffff'}
            fontSize={fontSize}
            fontWeight="800"
            fontFamily="var(--font-body)"
            textAnchor="middle"
          >
            {lbl.text}
          </text>
        </g>
      ))}

      {/* Pin (Fixed point marked with a dot + label) */}
      {pin && (
        <g className="pin-group">
          <circle cx={pin[0]} cy={pin[1]} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <circle cx={pin[0]} cy={pin[1]} r="9" fill="none" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          <text
            x={pin[0]}
            y={pin[1] + 18}
            fill="#fcd34d"
            fontSize={Math.max(11, fontSize * 0.85)}
            fontWeight="900"
            fontFamily="var(--font-display)"
            textAnchor="middle"
          >
            pin
          </text>
        </g>
      )}

      {/* Draggable Handles */}
      {draggableHandles.map((h, i) => (
        <g
          key={`handle-${i}`}
          transform={`translate(${h.x}, ${h.y})`}
          className="draggable-handle"
          onPointerDown={(e) => onDragStart && onDragStart(h.id, e)}
          style={{ cursor: 'grab', touchAction: 'none' }}
          role="button"
          tabIndex={0}
          aria-label={h.ariaLabel || `Vertex handle ${i + 1}`}
          aria-valuetext={h.ariaValueText}
          onKeyDown={(e) => h.onKeyDown && h.onKeyDown(e)}
        >
          <circle cx="0" cy="0" r="14" fill="rgba(251, 191, 36, 0.25)" />
          <circle cx="0" cy="0" r="8" fill="#fbbf24" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="2" fill="#18181b" />
        </g>
      ))}

      {children}
    </svg>
  );
}
