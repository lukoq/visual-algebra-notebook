export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/** Order of element g in Z_n under addition mod n. */
export function orderOf(g: number, n: number): number {
  if (n <= 0) return 0;
  const gm = ((g % n) + n) % n;
  if (gm === 0) return 1;
  return n / gcd(gm, n);
}

/** Sequence of points visited starting from 0, adding g mod n, until returning to 0. */
export function orbit(g: number, n: number): number[] {
  const seq = [0];
  if (n <= 0) return seq;
  const gm = ((g % n) + n) % n;
  if (gm === 0) return seq;
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur = (cur + gm) % n;
    seq.push(cur);
    if (cur === 0) break;
  }
  return seq;
}

/** Euler's totient phi(n): count of integers in [1, n-1] coprime to n. For n=1 returns 1. */
export function eulerPhi(n: number): number {
  if (n <= 1) return n === 1 ? 1 : 0;
  let result = n;
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    if (x % p === 0) {
      while (x % p === 0) x = Math.floor(x / p);
      result -= Math.floor(result / p);
    }
  }
  if (x > 1) result -= Math.floor(result / x);
  return result;
}

export function isGenerator(g: number, n: number): boolean {
  if (n <= 0) return false;
  const gm = ((g % n) + n) % n;
  return gcd(gm, n) === 1;
}
