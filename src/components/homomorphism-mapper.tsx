import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Arrow {
  fromX: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function MorphismBadge({
  label,
  active,
  visible,
}: {
  label: string;
  active: boolean;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <Badge
      className={cn(
        "text-xs font-medium transition-all",
        active
          ? "border-success/30 bg-success/15 text-success"
          : "border-border/60 bg-muted/40 text-muted-foreground/60 line-through opacity-50"
      )}
    >
      {active ? "✓ " : "✗ "}
      {label}
    </Badge>
  );
}

export default function HomomorphismMapper() {
  const [n, setN] = useState(6);
  const [m, setM] = useState(6);
  const [k, setK] = useState("1");
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [selectedB, setSelectedB] = useState<number | null>(null);
  const [hoveredX, setHoveredX] = useState<number | null>(null);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [viewBox, setViewBox] = useState({ w: 800, h: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  const kVal = parseInt(k) || 0;

  const h = useCallback((x: number) => (kVal * x) % m, [kVal, m]);

  const isGlobalHomomorphism = useMemo(() => {
    for (let a = 0; a < n; a++) {
      for (let b = 0; b < n; b++) {
        const leftSide = h((a + b) % n);
        const rightSide = (h(a) + h(b)) % m;
        if (leftSide !== rightSide) return false;
      }
    }
    return true;
  }, [n, m, h]);

  const mapping = useMemo(() => {
    const map = new Map<number, number[]>();
    for (let x = 0; x < n; x++) {
      const y = h(x);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(x);
    }
    return map;
  }, [n, h]);

  const isInjective = useMemo(() => {
    if (!isGlobalHomomorphism) return false;
    for (const [, preimages] of mapping) {
      if (preimages.length > 1) return false;
    }
    return true;
  }, [mapping, isGlobalHomomorphism]);

  const isSurjective = useMemo(() => {
    if (!isGlobalHomomorphism) return false;
    for (let y = 0; y < m; y++) {
      if (!mapping.has(y)) return false;
    }
    return true;
  }, [mapping, m, isGlobalHomomorphism]);

  const isIsomorphic =
    isGlobalHomomorphism && isInjective && isSurjective && n === m;

  const recalcArrows = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cr = container.getBoundingClientRect();
    const newArrows: Arrow[] = [];

    for (let x = 0; x < n; x++) {
      const leftEl = container.querySelector(`[data-g-badge="${x}"]`);
      const y = h(x);
      const rightEl = container.querySelector(`[data-h-badge="${y}"]`);

      if (leftEl && rightEl) {
        const lr = leftEl.getBoundingClientRect();
        const rr = rightEl.getBoundingClientRect();
        newArrows.push({
          fromX: x,
          x1: lr.right - cr.left,
          y1: lr.top + lr.height / 2 - cr.top,
          x2: rr.left - cr.left,
          y2: rr.top + rr.height / 2 - cr.top,
        });
      }
    }
    setArrows(newArrows);
  }, [n, h]);

  const measureContainer = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setViewBox({ w: Math.round(rect.width), h: Math.round(rect.height) });
  }, []);

  useEffect(() => {
    measureContainer();
    recalcArrows();
    const ro = new ResizeObserver(() => {
      measureContainer();
      recalcArrows();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recalcArrows);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalcArrows);
    };
  }, [measureContainer, recalcArrows, n, m, k]);

  useEffect(() => {
    if (selectedA !== null && selectedA >= n) setSelectedA(null);
    if (selectedB !== null && selectedB >= n) setSelectedB(null);
  }, [n]);

  const handleSelect = (x: number) => {
    if (selectedA === x) {
      setSelectedA(null);
    } else if (selectedB === x) {
      setSelectedB(null);
    } else if (selectedA === null) {
      setSelectedA(x);
    } else {
      setSelectedB(x);
    }
  };

  const verifyResult = useMemo(() => {
    if (selectedA === null || selectedB === null) return null;
    const a = selectedA;
    const b = selectedB;
    const sumModN = (a + b) % n;
    const hSum = h(sumModN);
    const hA = h(a);
    const hB = h(b);
    const hSumModM = (hA + hB) % m;
    const equal = hSum === hSumModM;
    return { a, b, sumModN, hSum, hA, hB, hSumModM, equal };
  }, [selectedA, selectedB, n, m, h]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-6 text-left">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Github: lukoq
        </div>
        <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight sm:text-4xl">
          Homomorphism Mapper
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore structures and mapping behaviors from Z<sub>n</sub> to Z<sub>m</sub>
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Source Group &middot; Z<sub>n</sub>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Slider
                value={[n]}
                min={2}
                max={12}
                step={1}
                onValueChange={(v) => setN(v[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={n}
                readOnly
                className="w-16 font-mono text-center h-8 pointer-events-none"
              />
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              G = {'{'}0, ..., {n - 1}{'}'}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Target Group &middot; Z<sub>m</sub>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Slider
                value={[m]}
                min={2}
                max={12}
                step={1}
                onValueChange={(v) => setM(v[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={m}
                readOnly
                className="w-16 font-mono text-center h-8 pointer-events-none"
              />
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              H = {'{'}0, ..., {m - 1}{'}'}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Map Coefficient &middot; k
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Select value={k} onValueChange={setK}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="k" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: m }, (_, i) => i).map((v) => (
                  <SelectItem key={v} value={String(v)}>
                    k = {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="font-mono text-xs text-muted-foreground">
              h(x) = ({k} &middot; x) mod {m}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge
          className={cn(
            "text-xs px-3 py-1 font-semibold",
            isGlobalHomomorphism
              ? "border-success/30 bg-success/15 text-success"
              : "border-destructive/30 bg-destructive/15 text-destructive"
          )}
        >
          {isGlobalHomomorphism
            ? "✓ Valid Homomorphism"
            : "✗ Invalid Map (Structure Broken)"}
        </Badge>

        <MorphismBadge
          label="Monomorphism (Injection)"
          active={isInjective}
          visible={isGlobalHomomorphism}
        />
        <MorphismBadge
          label="Epimorphism (Surjection)"
          active={isSurjective}
          visible={isGlobalHomomorphism}
        />
        <MorphismBadge
          label="Isomorphism (Bijection)"
          active={isIsomorphic}
          visible={isGlobalHomomorphism}
        />
      </div>

      <Card className="glass-card mb-6 overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Hover an element in Z<sub>n</sub> to trace its image &middot; Click
            two elements to trigger the property test
          </div>

          <div
            ref={containerRef}
            className="relative mx-auto flex max-w-2xl items-start justify-between px-4"
          >
            <div className="flex flex-col gap-2.5 py-2">
              <div className="mb-1 text-center font-mono text-xs font-semibold text-muted-foreground">
                Z<sub>{n}</sub>
              </div>
              {Array.from({ length: n }, (_, i) => {
                const isSelected = selectedA === i || selectedB === i;
                const isHovered = hoveredX === i;
                const label =
                  selectedA === i ? "a" : selectedB === i ? "b" : null;
                return (
                  <button
                    key={i}
                    data-g-badge={i}
                    onClick={() => handleSelect(i)}
                    onMouseEnter={() => setHoveredX(i)}
                    onMouseLeave={() => setHoveredX(null)}
                    className={cn(
                      "relative z-20 flex h-9 w-14 cursor-pointer items-center justify-center rounded-md border font-mono text-xs transition-all duration-150",
                      isSelected
                        ? "border-primary bg-primary/20 font-bold text-primary ring-1 ring-primary"
                        : isHovered
                          ? "border-primary/60 bg-primary/5 text-foreground"
                          : "border-border bg-card text-foreground"
                    )}
                  >
                    {i}
                    {label && (
                      <span className="absolute -left-1.5 -top-1.5 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-black text-primary-foreground">
                        {label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2.5 py-2">
              <div className="mb-1 text-center font-mono text-xs font-semibold text-muted-foreground">
                Z<sub>{m}</sub>
              </div>
              {Array.from({ length: m }, (_, i) => {
                const isTargetedByHover =
                  hoveredX !== null && h(hoveredX) === i;
                const isTargetedByA =
                  selectedA !== null && h(selectedA) === i;
                const isTargetedByB =
                  selectedB !== null && h(selectedB) === i;
                const isHighlighted =
                  isTargetedByHover || isTargetedByA || isTargetedByB;

                return (
                  <div
                    key={i}
                    data-h-badge={i}
                    className={cn(
                      "relative z-20 flex h-9 w-14 items-center justify-center rounded-md border font-mono text-xs transition-all duration-150",
                      isHighlighted
                        ? "border-primary/80 bg-primary/10 font-semibold text-primary shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {i}
                  </div>
                );
              })}
            </div>

            <svg
              className="pointer-events-none absolute inset-0 z-10"
              viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
              preserveAspectRatio="none"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <defs>
                <marker
                  id="arrow-default"
                  markerWidth="6"
                  markerHeight="5"
                  refX="6"
                  refY="2.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 2.5, 0 5"
                    fill="rgba(140,140,140,0.3)"
                  />
                </marker>
                <marker
                  id="arrow-active"
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
                </marker>
                <filter id="arrow-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {arrows.map((arrow, i) => {
                const isHovered = hoveredX === arrow.fromX;
                const isSelectedA = selectedA === arrow.fromX;
                const isSelectedB = selectedB === arrow.fromX;
                const isHighlighted =
                  isHovered || isSelectedA || isSelectedB;

                const dx = arrow.x2 - arrow.x1;
                const cx1 = arrow.x1 + dx * 0.4;
                const cx2 = arrow.x1 + dx * 0.6;

                return (
                  <path
                    key={i}
                    d={`M ${arrow.x1} ${arrow.y1} C ${cx1} ${arrow.y1}, ${cx2} ${arrow.y2}, ${arrow.x2} ${arrow.y2}`}
                    fill="none"
                    stroke={
                      isHighlighted ? "#3b82f6" : "rgba(140,140,140,0.25)"
                    }
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    opacity={
                      hoveredX !== null && !isHovered
                        ? 0.15
                        : isHighlighted
                          ? 1
                          : 0.7
                    }
                    markerEnd={
                      isHighlighted
                        ? "url(#arrow-active)"
                        : "url(#arrow-default)"
                    }
                    filter={isHighlighted ? "url(#arrow-glow)" : undefined}
                    className="transition-all duration-150"
                  />
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {verifyResult && (
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Homomorphism Property Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border border-border/60 bg-muted/40 py-1.5 text-center font-mono text-sm font-semibold">
                h(a + b mod {n}) = (h(a) + h(b)) mod {m}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-card/40 p-4 text-left">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Left Side: Compute via G
                  </div>
                  <div className="space-y-1 font-mono text-xs text-foreground">
                    <div>
                      a + b = {verifyResult.a} + {verifyResult.b} ={" "}
                      {verifyResult.a + verifyResult.b}
                    </div>
                    <div>Sum mod {n} = {verifyResult.sumModN}</div>
                    <div className="mt-1 border-t border-border/40 pt-1 font-semibold">
                      h({verifyResult.sumModN}) = ({k} &times;{" "}
                      {verifyResult.sumModN}) mod {m} ={" "}
                      <span className="text-primary">
                        {verifyResult.hSum}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-card/40 p-4 text-left">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Right Side: Compute via H
                  </div>
                  <div className="space-y-1 font-mono text-xs text-foreground">
                    <div>
                      h({verifyResult.a}) = ({k} &times; {verifyResult.a}) mod{" "}
                      {m} = {verifyResult.hA}
                    </div>
                    <div>
                      h({verifyResult.b}) = ({k} &times; {verifyResult.b}) mod{" "}
                      {m} = {verifyResult.hB}
                    </div>
                    <div className="mt-1 border-t border-border/40 pt-1 font-semibold">
                      (h(a) + h(b)) mod {m} = ({verifyResult.hA} +{" "}
                      {verifyResult.hB}) mod {m} ={" "}
                      <span className="text-primary">
                        {verifyResult.hSumModM}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-center gap-2 border-t border-border/40 py-1">
                {verifyResult.equal && isGlobalHomomorphism ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm font-semibold text-success">
                      Structure Preserved! h(a+b) equals h(a)+h(b)
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="text-sm font-semibold text-destructive">
                      Structure Destroyed! {verifyResult.hSum} &ne;{" "}
                      {verifyResult.hSumModM}
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
