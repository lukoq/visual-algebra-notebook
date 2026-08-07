export type BodyMode = 'R' | 'Fp';

export interface Point {
  x: number;
  y: number;
}

export type ECCResult = Point | 'O';

export interface ECCMathConfig {
  mode: BodyMode;
  paramA: number;
  paramB: number;
  paramP?: number; // Wymagane dla trybu 'Fp'
}

/**
 * Oblicza odwrotność modularną: a^(-1) mod m za pomocą Rozszerzonego Algorytmu Euklidesa.
 */
export const modInverse = (a: number, m: number): number => {
  let g0 = a, g1 = m;
  let u0 = 1, u1 = 0;
  while (g1 !== 0) {
    const q = Math.floor(g0 / g1);
    const g2 = g0 % g1;
    const u2 = u0 - q * u1;
    g0 = g1; g1 = g2;
    u0 = u1; u1 = u2;
  }
  return ((u0 % m) + m) % m;
};

/**
 * Wylicza możliwe wartości y dla danego x z równania y^2 = x^3 + Ax + B
 */
export const getPossibleY = (xVal: number, config: ECCMathConfig): number[] => {
  const { mode, paramA, paramB, paramP = 17 } = config;

  if (mode === 'R') {
    const rhs = Math.pow(xVal, 3) + paramA * xVal + paramB;
    if (rhs < 0) return [];
    const ySqrt = Math.sqrt(rhs);
    if (Math.abs(ySqrt) < 1e-9) return [0];
    return [ySqrt, -ySqrt];
  } else {
    const p = Math.max(2, paramP);
    const xMod = ((xVal % p) + p) % p;
    const aMod = ((paramA % p) + p) % p;
    const bMod = ((paramB % p) + p) % p;
    const rhs = (Math.pow(xMod, 3) + aMod * xMod + bMod) % p;

    const matches: number[] = [];
    for (let y = 0; y < p; y++) {
      if ((y * y) % p === rhs) {
        matches.push(y);
      }
    }
    return matches;
  }
};

/**
 * Główna funkcja dodająca dwa punkty P i Q na krzywej eliptycznej
 */
export const addPoints = (
  P: Point,
  Q: Point,
  config: ECCMathConfig
): { result: ECCResult; lambda: number | null } => {
  const { mode, paramA, paramP = 17 } = config;

  if (mode === 'R') {
    // --- TRYB LICZB RZECZYWISTYCH (R) ---
    
    // 1. Prosta pionowa: P + (-P) = O
    if (Math.abs(P.x - Q.x) < 1e-9 && Math.abs(P.y + Q.y) < 1e-9) {
      return { result: 'O', lambda: null };
    }

    let lambda: number;
    // 2. Podwajanie punktu: P = Q
    if (Math.abs(P.x - Q.x) < 1e-9 && Math.abs(P.y - Q.y) < 1e-9) {
      if (Math.abs(P.y) < 1e-9) {
        return { result: 'O', lambda: null };
      }
      lambda = (3 * Math.pow(P.x, 2) + paramA) / (2 * P.y);
    } else {
      // 3. Dodawanie dwóch różnych punktów
      lambda = (Q.y - P.y) / (Q.x - P.x);
    }

    const x3 = Math.pow(lambda, 2) - P.x - Q.x;
    const y3 = lambda * (P.x - x3) - P.y;

    return { result: { x: x3, y: y3 }, lambda };
  } else {
    // --- TRYB CIAŁA SKOŃCZONEGO (F_p) ---
    const p = Math.max(2, paramP);
    const normX1 = ((P.x % p) + p) % p;
    const normY1 = ((P.y % p) + p) % p;
    const normX2 = ((Q.x % p) + p) % p;
    const normY2 = ((Q.y % p) + p) % p;
    const aMod = ((paramA % p) + p) % p;

    // 1. P + (-P) = O
    if (normX1 === normX2 && (normY1 + normY2) % p === 0 && normY1 !== 0) {
      return { result: 'O', lambda: null };
    }

    let lambda: number;
    // 2. Podwajanie: P = Q
    if (normX1 === normX2 && normY1 === normY2) {
      if (normY1 === 0) {
        return { result: 'O', lambda: null };
      }
      const num = (3 * Math.pow(normX1, 2) + aMod) % p;
      const den = modInverse((2 * normY1) % p, p);
      lambda = (num * den) % p;
    } else {
      // 3. Dodawanie różnych punktów
      const num = ((normY2 - normY1) % p + p) % p;
      const denMod = ((normX2 - normX1) % p + p) % p;
      if (denMod === 0) {
        return { result: 'O', lambda: null };
      }
      const den = modInverse(denMod, p);
      lambda = (num * den) % p;
    }

    const x3 = ((Math.pow(lambda, 2) - normX1 - normX2) % p + p) % p;
    const y3 = ((lambda * (normX1 - x3) - normY1) % p + p) % p;

    return { result: { x: x3, y: y3 }, lambda };
  }
};