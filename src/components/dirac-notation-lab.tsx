import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

class Complex {
  constructor(public re: number = 0, public im: number = 0) {}

  // Sprzężenie zespolone (z*)
  conjugate(): Complex {
    return new Complex(this.re, -this.im);
  }

  // Dodawanie
  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  // Mnożenie
  multiply(other: Complex): Complex {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  absSq(): number {
    return this.re * this.re + this.im * this.im;
  }

  toString(precision: number = 2): string {
    const r = Number(this.re.toFixed(precision));
    const i = Number(this.im.toFixed(precision));
    if (i === 0) return `${r}`;
    if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
    const sign = i > 0 ? "+" : "-";
    const absI = Math.abs(i);
    return `${r} ${sign} ${absI === 1 ? "" : absI}i`;
  }
}

export default function DiracNotationLab() {
  // Stan dla keta |u> = (u0_re + u0_im*i)|0> + (u1_re + u1_im*i)|1>
  const [u0Re, setU0Re] = useState<number>(1);
  const [u0Im, setU0Im] = useState<number>(0);
  const [u1Re, setU1Re] = useState<number>(0);
  const [u1Im, setU1Im] = useState<number>(1);

  // Stan dla keta |v> = (v0_re + v0_im*i)|0> + (v1_re + v1_im*i)|1>
  const [v0Re, setV0Re] = useState<number>(0);
  const [v0Im, setV0Im] = useState<number>(0);
  const [v1Re, setV1Re] = useState<number>(1);
  const [v1Im, setV1Im] = useState<number>(0);

  // Obiekty zespolone
  const u0 = new Complex(u0Re, u0Im);
  const u1 = new Complex(u1Re, u1Im);
  const v0 = new Complex(v0Re, v0Im);
  const v1 = new Complex(v1Re, v1Im);

  // Bra <u| = [u0*, u1*]
  const braU0 = u0.conjugate();
  const braU1 = u1.conjugate();

  // Bra <v| = [v0*, v1*]
  const braV0 = v0.conjugate();
  const braV1 = v1.conjugate();

  // Iloczyn skalarny <u|v> = u0* * v0 + u1* * v1
  const innerProduct = braU0.multiply(v0).add(braU1.multiply(v1));

  // Iloczyn zewnętrzny |u><v| (Macierz 2x2: m00, m01, m10, m11)
  const outerM00 = u0.multiply(braV0);
  const outerM01 = u0.multiply(braV1);
  const outerM10 = u1.multiply(braV0);
  const outerM11 = u1.multiply(braV1);

  // Długości stanów (normy)
  const normSqU = u0.absSq() + u1.absSq();
  const normSqV = v0.absSq() + v1.absSq();

  // Gotowe presety stanów kwantowych
  const applyPreset = (
    type: "u" | "v",
    preset: "|0>" | "|1>" | "|+>" | "|->" | "|+i>"
  ) => {
    const invSqrt2 = 1 / Math.SQRT2;
    if (type === "u") {
      if (preset === "|0>") { setU0Re(1); setU0Im(0); setU1Re(0); setU1Im(0); }
      if (preset === "|1>") { setU0Re(0); setU0Im(0); setU1Re(1); setU1Im(0); }
      if (preset === "|+>") { setU0Re(invSqrt2); setU0Im(0); setU1Re(invSqrt2); setU1Im(0); }
      if (preset === "|->") { setU0Re(invSqrt2); setU0Im(0); setU1Re(-invSqrt2); setU1Im(0); }
      if (preset === "|+i>") { setU0Re(invSqrt2); setU0Im(0); setU1Re(0); setU1Im(invSqrt2); }
    } else {
      if (preset === "|0>") { setV0Re(1); setV0Im(0); setV1Re(0); setV1Im(0); }
      if (preset === "|1>") { setV0Re(0); setV0Im(0); setV1Re(1); setV1Im(0); }
      if (preset === "|+>") { setV0Re(invSqrt2); setV0Im(0); setV1Re(invSqrt2); setV1Im(0); }
      if (preset === "|->") { setV0Re(invSqrt2); setV0Im(0); setV1Re(-invSqrt2); setV1Im(0); }
      if (preset === "|+i>") { setV0Re(invSqrt2); setV0Im(0); setV1Re(0); setV1Im(invSqrt2); }
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Nagłówek */}
      <div className="mb-6 text-left">
        <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Quantum Algebra Lab
        </div>
        <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Dirac Notation: ℂ²
        </div>

        <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight leading-[2.0] sm:text-4xl">
          Kalkulator Notacji Diraca & Przestrzeni Hilberta
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Interaktywne operacje na ketach <span className="font-mono">|u⟩, |v⟩</span>, bra <span className="font-mono">⟨u|, ⟨v|</span> oraz iloczynach skalarnych i zewnętrznych w przestrzeni <span className="font-mono">ℂ²</span>.
        </p>
      </div>

      {/* Panele wprowadzania wektorów |u> i |v> */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {/* Stan |u> */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex justify-between items-center">
              <span>Wektor Stanu |u⟩ (Ket)</span>
              <span className={`font-mono text-xs ${Math.abs(normSqU - 1) < 0.01 ? 'text-success' : 'text-warning'}`}>
                ⟨u|u⟩ = {normSqU.toFixed(3)} {Math.abs(normSqU - 1) < 0.01 ? "(Znormalizowany)" : "(Brak normy)"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {(["|0>", "|1>", "|+>", "|->", "|+i>"] as const).map((p) => {
              const latex = {
                "|0>": String.raw`\lvert 0\rangle`,
                "|1>": String.raw`\lvert 1\rangle`,
                "|+>": String.raw`\lvert +\rangle`,
                "|->": String.raw`\lvert -\rangle`,
                "|+i>": String.raw`\lvert i\rangle`,
              }[p];

              return (
                <Button
                  key={p}
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 px-2 font-mono"
                  onClick={() => applyPreset("u", p)}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {`$${latex}$`}
                  </ReactMarkdown>
                </Button>
              );
            })}
            </div>

            {/* Składowa |0> */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Amplituda przy |0⟩ : <span className="font-mono text-foreground">{u0.toString()}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Część rzeczywista"
                  value={u0Re}
                  onChange={(e) => setU0Re(parseFloat(e.target.value) || 0)}
                  className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                />
                <Input
                  type="number"
                  placeholder="Część urojona (i)"
                  value={u0Im}
                  onChange={(e) => setU0Im(parseFloat(e.target.value) || 0)}
                  className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                />
              </div>
            </div>

            {/* Składowa |1> */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Amplituda przy |1⟩ : <span className="font-mono text-foreground">{u1.toString()}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Część rzeczywista"
                  value={u1Re}
                  onChange={(e) => setU1Re(parseFloat(e.target.value) || 0)}
                  className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                />
                <Input
                  type="number"
                  placeholder="Część urojona (i)"
                  value={u1Im}
                  onChange={(e) => setU1Im(parseFloat(e.target.value) || 0)}
                  className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

                />
              </div>
            </div>

            {/* Podgląd Bra <u| */}
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 font-mono text-xs">
              <span className="text-muted-foreground">Sprzężony Bra ⟨u| = </span>
              <span className="text-foreground">[ {braU0.toString()}, {braU1.toString()} ]</span>
            </div>
          </CardContent>
        </Card>

        {/* Stan |v> */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex justify-between items-center">
              <span>Wektor Stanu |v⟩ (Ket)</span>
              <span className={`font-mono text-xs ${Math.abs(normSqV - 1) < 0.01 ? 'text-success' : 'text-warning'}`}>
                ⟨v|v⟩ = {normSqV.toFixed(3)} {Math.abs(normSqV - 1) < 0.01 ? "(Znormalizowany)" : "(Brak normy)"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {(["|0>", "|1>", "|+>", "|->", "|+i>"] as const).map((p) => {
              const latex = {
                "|0>": String.raw`\lvert 0\rangle`,
                "|1>": String.raw`\lvert 1\rangle`,
                "|+>": String.raw`\lvert +\rangle`,
                "|->": String.raw`\lvert -\rangle`,
                "|+i>": String.raw`\lvert i\rangle`,
              }[p];

              return (
                <Button
                  key={p}
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 px-2 font-mono"
                  onClick={() => applyPreset("v", p)}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {`$${latex}$`}
                  </ReactMarkdown>
                </Button>
              );
            })}
            </div>

            {/* Składowa |0> */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Amplituda przy |0⟩ : <span className="font-mono text-foreground">{v0.toString()}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Część rzeczywista"
                  value={v0Re}
                  onChange={(e) => setV0Re(parseFloat(e.target.value) || 0)}
                  className="font-mono"
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Część urojona (i)"
                  value={v0Im}
                  onChange={(e) => setV0Im(parseFloat(e.target.value) || 0)}
                  className="font-mono"
                />
              </div>
            </div>

            {/* Składowa |1> */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">
                Amplituda przy |1⟩ : <span className="font-mono text-foreground">{v1.toString()}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Część rzeczywista"
                  value={v1Re}
                  onChange={(e) => setV1Re(parseFloat(e.target.value) || 0)}
                  className="font-mono"
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Część urojona (i)"
                  value={v1Im}
                  onChange={(e) => setV1Im(parseFloat(e.target.value) || 0)}
                  className="font-mono"
                />
              </div>
            </div>

            {/* Podgląd Bra <v| */}
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 font-mono text-xs">
              <span className="text-muted-foreground">Sprzężony Bra ⟨v| = </span>
              <span className="text-foreground">[ {braV0.toString()}, {braV1.toString()} ]</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sekcja wyników operacji algebraicznych */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Iloczyn skalarny ⟨u|v⟩ */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              1. Iloczyn Skalarny (Bracket ⟨u|v⟩)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono">
            <div className="rounded-md border border-border/60 bg-muted/40 p-4 text-center">
              <div className="text-xs text-muted-foreground mb-1">⟨u|v⟩ = u₀* · v₀ + u₁* · v₁</div>
              <div className="text-xl font-bold text-foreground">{innerProduct.toString(4)}</div>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between border-b border-border/40 py-1">
                <span className="text-muted-foreground">Prawdopodobieństwo przejścia |⟨u|v⟩|²:</span>
                <span className="font-semibold text-foreground">{innerProduct.absSq().toFixed(4)}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 py-1">
                <span className="text-muted-foreground">Relacja ortogonalności:</span>
                <span className={innerProduct.absSq() < 0.0001 ? "text-success font-semibold" : "text-warning font-semibold"}>
                  {innerProduct.absSq() < 0.0001 ? "Prostopadłe (90°)" : "Nieortogonalne"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Iloczyn zewnętrzny |u⟩⟨v| */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              2. Iloczyn Zewnętrzny (Operator |u⟩⟨v|)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono">
            <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-center">
              <div className="text-xs text-muted-foreground mb-2">Macierz przekształcenia 2×2:</div>
              <div className="inline-block text-left text-xs bg-card/60 p-2 rounded border border-border">
                <div className="grid grid-cols-2 gap-4 border-b border-border/50 pb-1">
                  <span>{outerM00.toString()}</span>
                  <span>{outerM01.toString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <span>{outerM10.toString()}</span>
                  <span>{outerM11.toString()}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-muted-foreground">
              Gdy $|u\rangle = |v\rangle = |0\rangle$, otrzymujesz projektor $|0\rangle\langle 0|$, który w sumie z $|1\rangle\langle 1|$ tworzy macierz jednostkową $I$.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}