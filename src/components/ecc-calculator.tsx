"use client";

import { useState } from "react";
import { Info, RotateCcw, Calculator, Variable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Importujemy z naszego pliku matematycznego
import {
  addPoints,
  getPossibleY,
  ECCMathConfig,
  BodyMode,
  ECCResult,
} from "@/lib/ecc-calculator";

export default function ECCCalculator() {
  const [mode, setMode] = useState<BodyMode>("R");
  const [paramA, setParamA] = useState<number>(0);
  const [paramB, setParamB] = useState<number>(7);
  const [paramP, setParamP] = useState<number>(17);

  const [inputX1, setInputX1] = useState<string>("2");
  const [inputX2, setInputX2] = useState<string>("3");

  const [selectedY1Index, setSelectedY1Index] = useState<number>(0);
  const [selectedY2Index, setSelectedY2Index] = useState<number>(0);

  const [resultPoint, setResultPoint] = useState<ECCResult | null>(null);
  const [lambdaVal, setLambdaVal] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const config: ECCMathConfig = {
    mode,
    paramA,
    paramB,
    paramP,
  };

  // Bezpieczne pobranie punktów Y z zabezpieczeniem przed undefined
  const y1Candidates = getPossibleY ? getPossibleY(Number(inputX1) || 0, config) || [] : [];
  const y2Candidates = getPossibleY ? getPossibleY(Number(inputX2) || 0, config) || [] : [];

  const handleCalculate = () => {
    setErrorMsg(null);
    setResultPoint(null);
    setLambdaVal(null);

    if (y1Candidates.length === 0 || y2Candidates.length === 0) {
      setErrorMsg("Dla podanych x nie istnieją punkty leżące na krzywej!");
      return;
    }

    const y1 = y1Candidates[selectedY1Index] ?? y1Candidates[0];
    const y2 = y2Candidates[selectedY2Index] ?? y2Candidates[0];

    const P = { x: Number(inputX1) || 0, y: y1 };
    const Q = { x: Number(inputX2) || 0, y: y2 };

    const { result, lambda } = addPoints(P, Q, config);
    setResultPoint(result);
    setLambdaVal(lambda);
  };

  const handleReset = () => {
    setParamA(0);
    setParamB(7);
    setParamP(17);
    setInputX1("2");
    setInputX2("3");
    setSelectedY1Index(0);
    setSelectedY2Index(0);
    setResultPoint(null);
    setLambdaVal(null);
    setErrorMsg(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Kalkulator Dodawania Punktów ECC
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleReset} title="Resetuj">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-slate-900 text-slate-100 border-slate-800">
                <SheetHeader>
                  <SheetTitle className="text-emerald-400">Jak to działa?</SheetTitle>
                  <SheetDescription className="text-slate-400">
                    Kalkulator wyznacza prosta przechodzącą przez punkty $P$ i $Q$ na krzywej $y^2 = x^3 + Ax + B$, znajduje trzeci punkt przecięcia oraz odbija go symetrycznie.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Wybór Ciała */}
          <div className="flex gap-4">
            <Button
              className="flex-1"
              variant={mode === "R" ? "default" : "outline"}
              onClick={() => { setMode("R"); setResultPoint(null); }}
            >
              Liczby Rzeczywiste ($\mathbb{'R'}$)
            </Button>
            <Button
              className="flex-1"
              variant={mode === "Fp" ? "default" : "outline"}
              onClick={() => { setMode("Fp"); setResultPoint(null); }}
            >
              Ciało Skończone ($\mathbb{'F'}_p$)
            </Button>
          </div>

          {/* Parametry Krzywej */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Parametry Równania: $y^2 = x^3 + Ax + B$ {mode === "Fp" && `(mod ${paramP})`}
              </span>
              <Badge variant="secondary" className="bg-emerald-950 text-emerald-400 border-emerald-800">
                {mode === "R" ? "Ciało Ciągłe" : "Ciało Dyskretne"}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400">Parametr A</label>
                <Input
                  type="number"
                  value={paramA}
                  onChange={(e) => setParamA(Number(e.target.value))}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Parametr B</label>
                <Input
                  type="number"
                  value={paramB}
                  onChange={(e) => setParamB(Number(e.target.value))}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              {mode === "Fp" && (
                <div>
                  <label className="text-xs text-slate-400">Moduł p (Liczba pierwsza)</label>
                  <Input
                    type="number"
                    value={paramP}
                    onChange={(e) => setParamP(Number(e.target.value))}
                    className="bg-slate-900 border-slate-700"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Punkty P i Q */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Punkt P */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
              <h4 className="font-semibold text-emerald-400">Punkt P</h4>
              <div>
                <label className="text-xs text-slate-400">Współrzędna x1</label>
                <Input
                  type="number"
                  value={inputX1}
                  onChange={(e) => { setInputX1(e.target.value); setSelectedY1Index(0); }}
                  className="bg-slate-900 border-slate-700 mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Gałąź Y</label>
                {y1Candidates.length === 0 ? (
                  <p className="text-xs text-rose-400">Brak punktów dla x1 = {inputX1}</p>
                ) : (
                  <div className="flex gap-2">
                    {y1Candidates.map((yVal, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={selectedY1Index === idx ? "default" : "outline"}
                        onClick={() => setSelectedY1Index(idx)}
                        className="flex-1 text-xs"
                      >
                        y = {Number.isInteger(yVal) ? yVal : yVal.toFixed(3)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Punkt Q */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
              <h4 className="font-semibold text-emerald-400">Punkt Q</h4>
              <div>
                <label className="text-xs text-slate-400">Współrzędna x2</label>
                <Input
                  type="number"
                  value={inputX2}
                  onChange={(e) => { setInputX2(e.target.value); setSelectedY2Index(0); }}
                  className="bg-slate-900 border-slate-700 mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Gałąź Y</label>
                {y2Candidates.length === 0 ? (
                  <p className="text-xs text-rose-400">Brak punktów dla x2 = {inputX2}</p>
                ) : (
                  <div className="flex gap-2">
                    {y2Candidates.map((yVal, idx) => (
                      <Button
                        key={idx}
                        size="sm"
                        variant={selectedY2Index === idx ? "default" : "outline"}
                        onClick={() => setSelectedY2Index(idx)}
                        className="flex-1 text-xs"
                      >
                        y = {Number.isInteger(yVal) ? yVal : yVal.toFixed(3)}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold">
            Oblicz Dodawanie: P + Q = R
          </Button>

          {errorMsg && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-lg text-sm">
              {errorMsg}
            </div>
          )}

          {resultPoint !== null && (
            <div className="bg-slate-950 p-5 rounded-lg border border-emerald-500/40 space-y-2">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Wynik Obliczeń
              </h3>
              {lambdaVal !== null && (
                <p className="text-sm text-slate-400 font-mono">
                  Nachylenie prostej λ = <span className="text-slate-100">{Number.isInteger(lambdaVal) ? lambdaVal : lambdaVal.toFixed(4)}</span>
                </p>
              )}
              {resultPoint === "O" ? (
                <div className="text-xl font-bold text-amber-400 font-mono">
                  P + Q = Punkt w Nieskończoności (O)
                </div>
              ) : (
                <div className="text-2xl font-mono text-emerald-300">
                  R = P + Q = ({Number.isInteger(resultPoint.x) ? resultPoint.x : resultPoint.x.toFixed(4)}, {Number.isInteger(resultPoint.y) ? resultPoint.y : resultPoint.y.toFixed(4)})
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}