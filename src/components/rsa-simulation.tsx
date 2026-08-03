import { useState } from "react";
import { Info, RotateCcw, Lock, Unlock, KeyRound, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
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
import {
  PRIMES_LIST,
  RSASimulator,
} from "@/lib/rsa-simulator"; // import silnika z poprzedniego kroku

export default function RsaSimulator() {
  // Stan suwaków i wyborów
  const [pIndex, setPIndex] = useState(3); 
  const [qIndex, setQIndex] = useState(4); 
  const [selectedE, setSelectedE] = useState<number | undefined>(undefined);
  const [inputText, setInputText] = useState("Hej");
  const [crackedData, setCrackedData] = useState<{
    foundP: number;
    foundQ: number;
    foundPhi: number;
    foundD: number;
  } | null>(null);

  const p = PRIMES_LIST[pIndex];
  const q = PRIMES_LIST[qIndex];

  // Obsługa sytuacji, gdy użytkownik wybierze p == q
  const isSamePrime = pIndex === qIndex;

  // Inicjalizacja rdzenia algebry RSA
  let rsa: RSASimulator | null = null;
  let errorMsg = "";

  if (isSamePrime) {
    errorMsg = "Liczby p i q muszą być od siebie różne!";
  } else {
    try {
      rsa = new RSASimulator(p, q, selectedE);
    } catch (err: any) {
      errorMsg = err.message;
    }
  }

  // Szyfrowanie i Odszyfrowanie w czasie rzeczywistym
  let encryptionResult = { asciiBlocks: [] as number[], encryptedBlocks: [] as number[] };
  let decryptionResult = { decryptedBlocks: [] as number[], text: "" };
  let encryptError = "";

  if (rsa) {
    try {
      encryptionResult = rsa.encrypt(inputText);
      decryptionResult = rsa.decrypt(encryptionResult.encryptedBlocks);
    } catch (err: any) {
      encryptError = err.message;
    }
  }

  // Akcja resetu
  const handleReset = () => {
    setPIndex(3);
    setQIndex(4);
    setSelectedE(undefined);
    setInputText("Hej");
    setCrackedData(null);
  };

  
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">     
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Kryptografia Asymetryczna
          </div>
          <div className="mb-2 mr-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">           
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> GITHUB: LUKOQ
          </div>
          <h1 className="text-gradient truncate text-3xl font-semibold tracking-tight leading-[2.0] sm:text-4xl">
            Symulator Szyfru RSA
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Odkryj matematyczną pułapkę grup mnożeniowych ℤₙ* oraz funkcję Eulera φ(n)
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                1. Wybierz suwakami liczby pierwsze (p i q)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Suwak P */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>Liczba p: <strong className="text-primary text-sm">{p}</strong></span>
                  <span className="text-muted-foreground">Index: {pIndex}</span>
                </div>
                <Slider
                  value={[pIndex]}
                  min={0}
                  max={PRIMES_LIST.length - 1}
                  step={1}
                  onValueChange={(v) => { setPIndex(v[0]); setCrackedData(null); }}
                />
              </div>

              {/* Suwak Q */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>Liczba q: <strong className="text-primary text-sm">{q}</strong></span>
                  <span className="text-muted-foreground">Index: {qIndex}</span>
                </div>
                <Slider
                  value={[qIndex]}
                  min={0}
                  max={PRIMES_LIST.length - 1}
                  step={1}
                  onValueChange={(v) => { setQIndex(v[0]); setCrackedData(null); }}
                />
              </div>

              {isSamePrime && (
                <div className="rounded-md border border-destructive/40 bg-destructive/15 p-3 text-xs text-destructive">
                  {errorMsg}
                </div>
              )}

              <div className="flex justify-end">
                <Button size="sm" variant="ghost" onClick={handleReset} className="h-7 gap-1 text-xs">
                  <RotateCcw className="h-3 w-3" /> Resetuj
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wyniki obliczeń algebraicznych */}
          {rsa && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard label="Moduł n (p · q)" value={String(rsa.n)} accent="primary" />
                <MetricCard label="Rząd φ(n)" value={String(rsa.phi)} accent="accent" />
              </div>

              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    2. Wybierz klucz publiczny (e)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Select
                      value={String(rsa.e)}
                      onValueChange={(val) => { setSelectedE(Number(val)); setCrackedData(null); }}
                    >
                      <SelectTrigger className="w-full font-mono">
                        <SelectValue placeholder="Wybierz e" />
                      </SelectTrigger>
                      <SelectContent>
                        {rsa.validEList.map((val) => (
                          <SelectItem key={val} value={String(val)} className="font-mono">
                            e = {val} (NWD({val}, {rsa?.phi}) = 1)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-border bg-card/40 p-3 space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Klucz Publiczny (e, n):</span>
                      <Badge variant="outline" className="text-primary font-bold">({rsa.e}, {rsa.n})</Badge>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Klucz Prywatny (d = e⁻¹ mod φ):</span>
                      <Badge variant="outline" className="text-accent font-bold">d = {rsa.d}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Prawa strona: Interaktywna Symulacja Szyfrowania (Alice & Bob & Haker) */}
        <div className="flex flex-col gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Nadawca (Alice)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Wpisz tekst do zaszyfrowania:</label>
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  maxLength={10}
                  className="font-mono"
                  placeholder="np. Hej"
                />
              </div>

              {encryptError ? (
                <div className="rounded-md border border-destructive/40 bg-destructive/15 p-3 text-xs text-destructive">
                  {encryptError}
                </div>
              ) : (
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Bloki ASCII (m &lt; n):</span>
                    <span className="text-foreground">[{encryptionResult.asciiBlocks.join(", ")}]</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Szyfrogram (c = mᵉ mod n):</span>
                    <span className="text-primary font-bold">[{encryptionResult.encryptedBlocks.join(", ")}]</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Unlock className="h-4 w-4 text-accent" /> Odbiorca (Bob)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>Odszyfrowane bloki (m = cᵈ mod n):</span>
                <span className="text-foreground">[{decryptionResult.decryptedBlocks.join(", ")}]</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Odebrany Tekst:</span>
                <span className="text-accent font-bold text-sm">"{decryptionResult.text}"</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: "primary" | "accent" }) {
  return (
    <Card className="glass-card relative overflow-hidden">
      <CardContent className="p-5">
        <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className={`mt-2 font-mono text-3xl font-semibold tabular-nums ${accent === "primary" ? "text-primary" : "text-accent"}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}