import { useState, useMemo } from "react";
import { Layers, Hash, Divide, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

export default function SubgroupExplorer() {
  const { t } = useI18n(); 
  const [n, setN] = useState(12);
  const [activeDivisor, setActiveDivisor] = useState(3);

  const divisors = useMemo(() => {
    const divs: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) divs.push(i);
    }
    return divs.sort((a, b) => a - b);
  }, [n]);

  const currentDivisor = useMemo(() => {
    if (divisors.includes(activeDivisor)) return activeDivisor;
    return divisors[0] || 1;
  }, [divisors, activeDivisor]);

  const subgroupH = useMemo(() => {
    const generator = n / currentDivisor;
    const elements: number[] = [];
    for (let i = 0; i < currentDivisor; i++) {
      elements.push((i * generator) % n);
    }
    return {
      generator,
      size: currentDivisor,
      elements: elements.sort((a, b) => a - b),
    };
  }, [n, currentDivisor]);

  const cosetsData = useMemo(() => {
    const H = subgroupH.elements;
    const visited = new Set<number>();
    const allCosets: { defaultRep: number; selectedRep: number; elements: number[] }[] = [];

    for (let a = 0; a < n; a++) {
      if (!visited.has(a)) {
        const cosetElements = H.map((h) => (a + h) % n).sort((x, y) => x - y);
        cosetElements.forEach((el) => visited.add(el));

        allCosets.push({
          defaultRep: a,
          selectedRep: a, 
          elements: cosetElements,
        });
      }
    }
    return allCosets;
  }, [n, subgroupH]);

  const [customReps, setCustomReps] = useState<Record<number, number>>({});

  useMemo(() => {
    setCustomReps({});
  }, [n, currentDivisor]);

  const indexGtoH = n / subgroupH.size;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-8 text-left">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Github: lukoq
        </div>
        <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight leading-[2.0] sm:text-4xl">
          {t.subgroups.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.subgroups.description} Z<sub>n</sub>
        </p>
      </div>

      <div className="mb-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t.subgroups.globalGroup} &middot; Z<sub>n</sub>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 max-w-xl">
              <Slider
                value={[n]}
                min={2}
                max={32}
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
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
   
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
            {t.subgroups.availableSubgroups}
          </div>
          
          <div className="grid gap-2.5">
            {divisors.map((d) => {
              const gen = n / d;
              const isActive = d === currentDivisor;
              
              const previewElements = Array.from({ length: d }, (_, i) => (i * gen) % n)
                .sort((x, y) => x - y)
                .join(", ");

              return (
                <button
                  key={d}
                  onClick={() => setActiveDivisor(d)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border font-mono text-xs transition-all duration-150 cursor-pointer relative overflow-hidden",
                    isActive
                      ? "bg-primary/25 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                  )}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-sm text-foreground">
                      {t.subgroups.orderH} = {d}
                    </span>
                    <Badge variant="outline" className="font-sans text-[10px] uppercase tracking-wide">
                      {t.subgroups.generator}: {gen}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground truncate text-[11px]">
                    H = {"{"}{previewElements}{"}"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
              {t.subgroups.completePartition.replace("{n}", String(n)).replace("{index}", String(indexGtoH))}
            </div>

            <div className="space-y-3">
              {cosetsData.map((coset) => {
                const currentRep = customReps[coset.defaultRep] ?? coset.defaultRep;

                return (
                  <div
                    key={coset.defaultRep}
                    className="border border-border bg-card p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-border/80"
                  >
                    <div className="space-y-1 text-left min-w-[120px]">
                      <div className="font-mono text-sm font-bold text-primary">
                        {currentRep} + H
                      </div>
                      <div className="text-[10px] text-muted-foreground font-sans uppercase tracking-wider">
                        {t.subgroups.cosetBox}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center sm:justify-end flex-1">
                      {coset.elements.map((el) => {
                        const isRepresentative = currentRep === el;
                        return (
                          <button
                            key={el}
                            onClick={() => {
                              setCustomReps((prev) => ({
                                ...prev,
                                [coset.defaultRep]: el,
                              }));
                            }}
                            className={cn(
                              "h-8 w-11 font-mono text-xs border rounded-md transition-all flex items-center justify-center relative cursor-pointer",
                              isRepresentative
                                ? "bg-primary border-primary font-black text-primary-foreground shadow-md scale-105"
                                : "bg-muted/40 border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                            )}
                            title={t.subgroups.tooltip.replace("{el}", String(el))}
                          >
                            {el}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}