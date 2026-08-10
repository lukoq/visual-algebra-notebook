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
  <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
    {/* Nagłówek */}
    <div className="mb-6 text-left">
      <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        ECC Calculator
      </div>
      <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">           
        <span className="h-1.5 w-1.5 rounded-full bg-success" /> 
        GITHUB: LUKOQ
      </div>
     

      <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight leading-[2.0] sm:text-4xl">
        Kalkulator Dodawania Punktów ECC
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        Dodawanie punktów na krzywej eliptycznej
        <span className="ml-1 font-mono">
          y² = x³ + Ax + B
        </span>
      </p>
    </div>

    <div className="mb-6 grid gap-4">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Ciało bazowe
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant={mode === "R" ? "default" : "outline"}
              onClick={() => {
                setMode("R");
                setResultPoint(null);
              }}
            >
              Liczby rzeczywiste
            </Button>

            <Button
              className="flex-1"
              variant={mode === "Fp" ? "default" : "outline"}
              onClick={() => {
                setMode("Fp");
                setResultPoint(null);
              }}
            >
              Ciało skończone
            </Button>
          </div>
        </CardContent>
      </Card>

      
    </div>

    {/* Parametry krzywej */}
    <Card className="glass-card mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Parametry krzywej
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-md border border-border/60 bg-muted/40 px-4 py-2.5 text-center font-mono text-sm">
          y² = x³ + Ax + B
          {mode === "Fp" && (
            <span className="ml-2 text-muted-foreground">
              (mod {paramP})
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Parametr A
            </label>

            <Input
              type="number"
              value={paramA}
              onChange={(e) => setParamA(Number(e.target.value))}
              className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Parametr B
            </label>

            <Input
              type="number"
              value={paramB}
              onChange={(e) => setParamB(Number(e.target.value))}
              className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

            />
          </div>

          {mode === "Fp" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Moduł p (pamiętaj, że p musi być liczbą pierwszą!)
              </label>

              <Input
                type="number"
                value={paramP}
                onChange={(e) => setParamP(Number(e.target.value))}
                className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Punkty P i Q */}
    <div className="mb-6 grid gap-4 sm:grid-cols-2">
      {/* Punkt P */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Punkt P
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Współrzędna x₁
            </label>

            <Input
              type="number"
              value={inputX1}
              onChange={(e) => {
                setInputX1(e.target.value);
                setSelectedY1Index(0);
              }}
              className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Gałąź Y
            </label>

            {y1Candidates.length === 0 ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Brak punktów dla x₁ = {inputX1}
              </div>
            ) : (
              <div className="flex gap-2">
                {y1Candidates.map((yVal, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={selectedY1Index === idx ? "default" : "outline"}
                    onClick={() => setSelectedY1Index(idx)}
                    className="flex-1 font-mono text-xs"
                  >
                    y ={" "}
                    {Number.isInteger(yVal)
                      ? yVal
                      : yVal.toFixed(3)}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Punkt Q */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Punkt Q
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Współrzędna x₂
            </label>

            <Input
              type="number"
              value={inputX2}
              onChange={(e) => {
                setInputX2(e.target.value);
                setSelectedY2Index(0);
              }}
              className="font-mono [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground pb-20">
              Gałąź Y
            </label>

            {y2Candidates.length === 0 ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Brak punktów dla x₂ = {inputX2}
              </div>
            ) : (
              <div className="flex gap-2">
                {y2Candidates.map((yVal, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant={selectedY2Index === idx ? "default" : "outline"}
                    onClick={() => setSelectedY2Index(idx)}
                    className="flex-1 font-mono text-xs"
                  >
                    y ={" "}
                    {Number.isInteger(yVal)
                      ? yVal
                      : yVal.toFixed(3)}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Oblicz */}
    <Card className="glass-card mb-6">
      <CardContent className="p-4">
        <Button
          onClick={handleCalculate}
          className="w-full font-semibold"
        >
          Oblicz dodawanie:{" "}
          <span className="ml-1 font-mono">
            P + Q = R
          </span>
        </Button>
      </CardContent>
    </Card>

    {/* Błąd */}
    {errorMsg && (
      <Card className="glass-card mb-6 border-destructive/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-destructive">
            <span className="font-semibold">Błąd:</span>
            <span>{errorMsg}</span>
          </div>
        </CardContent>
      </Card>
    )}

    {/* Wynik */}
    {resultPoint !== null && (
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Wynik obliczeń
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {lambdaVal !== null && (
              <div className="rounded-md border border-border/60 bg-muted/40 px-4 py-2.5 font-mono text-sm">
                <span className="text-muted-foreground">
                  Nachylenie prostej λ =
                </span>{" "}
                <span className="font-semibold text-foreground">
                  {Number.isInteger(lambdaVal)
                    ? lambdaVal
                    : lambdaVal.toFixed(4)}
                </span>
              </div>
            )}

            {resultPoint === "O" ? (
              <div className="flex items-center justify-center rounded-md border border-warning/30 bg-warning/10 px-4 py-4 text-center font-mono text-sm font-semibold text-warning">
                P + Q = Punkt w nieskończoności O
              </div>
            ) : (
              <div className="rounded-md border border-success/30 bg-success/10 px-4 py-4 text-center font-mono text-lg font-semibold text-success">
                R = P + Q = (
                {Number.isInteger(resultPoint.x)
                  ? resultPoint.x
                  : resultPoint.x.toFixed(4)}
                ,{" "}
                {Number.isInteger(resultPoint.y)
                  ? resultPoint.y
                  : resultPoint.y.toFixed(4)}
                )
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )}
  </div>
);
}