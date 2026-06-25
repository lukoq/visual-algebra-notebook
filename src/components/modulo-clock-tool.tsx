import { useState } from "react";
import { Info, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModuloClock } from "@/components/modulo-clock";
import { orderOf, eulerPhi, isGenerator } from "@/lib/modulo";

export function ModuloClockTool() {
  const [n, setN] = useState(12);
  const [g, setG] = useState<number | null>(1);

  const order = g === null ? null : orderOf(g, n);
  const phi = eulerPhi(n);
  const generator = g === null ? false : isGenerator(g, n);

  const handleNChange = (val: number) => {
    const next = Math.max(2, Math.min(24, val));
    setN(next);
    if (g !== null && g >= next) setG(null);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Cyclic Groups · Z<sub>n</sub>
          </div>
          <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight sm:text-4xl">
            Modulo Clock Calculator
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Click any number on the clock to walk the group it generates.
          </p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              aria-label="What is this?"
            >
              <Info className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full overflow-y-auto sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-2xl tracking-tight">The Intuition</SheetTitle>
              <SheetDescription>Zero jargon. Pure picture.</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6 text-sm leading-relaxed">
              <section>
                <h3 className="mb-2 text-base font-semibold text-foreground">What is this?</h3>
                <p className="text-muted-foreground">
                  A visual tool to explore <span className="text-foreground font-medium">Cyclic
                  Groups (Z<sub>n</sub>)</span> using addition modulo <span className="font-mono">n</span>.
                  Imagine a clock with <span className="font-mono">n</span> hours — every time you
                  add, the hand wraps around.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-base font-semibold text-foreground">Order of an Element</h3>
                <p className="text-muted-foreground">
                  The number of times you must add an element to itself to return to the
                  starting point (<span className="font-mono">0</span>). It's the length of the
                  clock's loop!
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-base font-semibold text-foreground">Generators</h3>
                <p className="text-muted-foreground">
                  If the order of an element equals the size of the clock, it visits every single
                  number before returning to <span className="font-mono">0</span>. It is a
                  <span className="text-accent font-medium"> "super-generator"</span> of the entire
                  group. This happens when the element and the clock size are
                  <span className="text-foreground font-medium"> coprime </span>
                  (gcd = 1).
                </p>
              </section>

              <section className="rounded-lg border border-border bg-card/60 p-4">
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Try this
                </h4>
                <p className="text-muted-foreground">
                  Set <span className="font-mono text-foreground">n = 12</span> and click
                  <span className="font-mono text-foreground"> 3</span> — short loop. Then click
                  <span className="font-mono text-foreground"> 5</span> — a perfect star touching
                  every hour.
                </p>
              </section>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Workspace */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Visual Clock */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <ModuloClock n={n} g={g} onSelect={setG} />
          </CardContent>
        </Card>

        {/* Control Panel */}
        <div className="flex flex-col gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Group Size · n
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Slider
                  value={[n]}
                  min={2}
                  max={24}
                  step={1}
                  onValueChange={(v) => handleNChange(v[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={n}
                  onChange={(e) => handleNChange(parseInt(e.target.value) || 2)}
                  min={2}
                  max={24}
                  className="w-20 font-mono text-center"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Z<sub>{n}</sub> = {`{0, 1, …, ${n - 1}}`}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setG(null)}
                  className="h-7 gap-1 text-xs"
                >
                  <RotateCcw className="h-3 w-3" /> reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              label="Selected · g"
              value={g === null ? "—" : String(g)}
              accent="primary"
            />
            <MetricCard
              label="Order · |g|"
              value={order === null ? "—" : String(order)}
              accent="accent"
            />
          </div>

          <Card className="glass-card">
            <CardContent className="flex items-center justify-between gap-3 p-5">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Is it a generator?
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {g === null
                    ? "Pick a number on the clock."
                    : generator
                    ? `gcd(${g}, ${n}) = 1 — visits every point.`
                    : `gcd(${g}, ${n}) ≠ 1 — short loop of ${order}.`}
                </div>
              </div>
              <Badge
                className={
                  g === null
                    ? "bg-muted text-muted-foreground"
                    : generator
                    ? "bg-success/20 text-success border border-success/40"
                    : "bg-destructive/15 text-destructive border border-destructive/40"
                }
              >
                {g === null ? "—" : generator ? "YES" : "NO"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="flex items-center justify-between gap-3 p-5">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Total Group Generators
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Euler's totient φ({n})
                </div>
              </div>
              <div className="text-3xl font-semibold tabular-nums text-gradient">
                {phi}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "primary" | "accent";
}) {
  return (
    <Card className="glass-card relative overflow-hidden">
      <CardContent className="p-5">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div
          className={`mt-2 font-mono text-4xl font-semibold tabular-nums ${
            accent === "primary" ? "text-primary" : "text-accent"
          }`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
