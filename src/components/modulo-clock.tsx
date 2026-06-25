import { useEffect, useMemo, useState } from "react";
import { orbit } from "@/lib/modulo";

interface ModuloClockProps {
  n: number;
  g: number | null;
  onSelect: (value: number) => void;
}

export function ModuloClock({ n, g, onSelect }: ModuloClockProps) {
  const size = 480;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 56;

  const points = useMemo(() => {
    return Array.from({ length: n }, (_, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return {
        i,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
  }, [n, cx, cy, radius]);

  const path = useMemo(() => (g === null ? [] : orbit(g, n)), [g, n]);

  const [step, setStep] = useState(0);

  // Animate the hand stepping through the orbit
  useEffect(() => {
    setStep(0);
    if (g === null || path.length <= 1) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= path.length - 1) window.clearInterval(id);
    }, 480);
    return () => window.clearInterval(id);
  }, [path, g]);

  const visited = path.slice(0, step + 1);
  const currentIdx = visited[visited.length - 1] ?? 0;
  const currentPoint = points[currentIdx] ?? points[0];

  // Build polyline points for visited edges
  const visitedLine = visited
    .map((idx) => `${points[idx].x},${points[idx].y}`)
    .join(" ");

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label={`Modulo ${n} clock`}
      >
        <defs>
          <radialGradient id="clockBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 250 / 0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.18 250)" />
            <stop offset="100%" stopColor="oklch(0.78 0.16 165)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background disc */}
        <circle cx={cx} cy={cy} r={radius + 32} fill="url(#clockBg)" />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="2 6"
        />

        {/* Visited polyline */}
        {visited.length > 1 && (
          <polyline
            points={visitedLine}
            fill="none"
            stroke="url(#edgeGrad)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity={0.9}
          />
        )}

        {/* Hand from center to current point */}
        {g !== null && (
          <line
            x1={cx}
            y1={cy}
            x2={currentPoint.x}
            y2={currentPoint.y}
            stroke="oklch(0.85 0.16 250)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ transition: "all 360ms cubic-bezier(0.34, 1.4, 0.64, 1)" }}
          />
        )}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={5} fill="oklch(0.85 0.16 250)" />

        {/* Number nodes */}
        {points.map((p) => {
          const isVisited = visited.includes(p.i);
          const isCurrent = p.i === currentIdx && g !== null;
          const isSelected = p.i === g;
          const isZero = p.i === 0;
          return (
            <g
              key={p.i}
              onClick={() => onSelect(p.i)}
              className="cursor-pointer"
              style={{ transition: "transform 200ms" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isCurrent ? 22 : isSelected ? 20 : 16}
                fill={
                  isSelected
                    ? "oklch(0.72 0.18 250)"
                    : isVisited
                    ? "oklch(0.30 0.06 200)"
                    : "var(--card)"
                }
                stroke={
                  isZero
                    ? "oklch(0.78 0.16 165)"
                    : isCurrent
                    ? "oklch(0.85 0.16 250)"
                    : "var(--border)"
                }
                strokeWidth={isCurrent || isZero ? 2 : 1}
                style={{ transition: "all 240ms" }}
                filter={isCurrent ? "url(#glow)" : undefined}
              />
              <text
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={n > 18 ? 11 : 13}
                fontWeight={isSelected || isCurrent ? 700 : 500}
                fill={
                  isSelected
                    ? "oklch(0.15 0.02 265)"
                    : "var(--foreground)"
                }
                style={{ pointerEvents: "none", fontFamily: "var(--font-mono)" }}
              >
                {p.i}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
