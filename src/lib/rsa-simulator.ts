
export const PRIMES_LIST: number[] = [
  3, 5, 7, 11, 13, 17, 19, 23, 29, 31 
];

/** Największy Wspólny Dzielnik (NWD / GCD) */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function modPow(base: number, exp: number, modulus: number): number {
  if (modulus === 1) return 0;
  let result = 1;
  let b = base % modulus;
  let e = exp;

  while (e > 0) {
    if (e % 2 === 1) {
      result = (result * b) % modulus;
    }
    e = Math.floor(e / 2);
    b = (b * b) % modulus;
  }

  return result;
}

export function modInverse(e: number, phi: number): number | null {
  let t = 0;
  let newT = 1;
  let r = phi;
  let newR = e;

  while (newR !== 0) {
    const quotient = Math.floor(r / newR);
    
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }

  if (r > 1) return null; 
  if (t < 0) t = t + phi; 

  return t;
}

export interface RSAKeys {
  p: number;
  q: number;
  n: number;
  phi: number;
  e: number;
  d: number;
  validEList: number[];
}

export class RSASimulator {
  private p: number;
  private q: number;
  public n: number;
  public phi: number;
  public validEList: number[];
  public e: number;
  public d: number;

  constructor(p: number, q: number, selectedE?: number) {
    if (p === q) {
      throw new Error("Liczby p i q muszą być od siebie różne!");
    }

    this.p = p;
    this.q = q;

    // 1. Liczymy moduł n i rząd grupy phi(n)
    this.n = p * q;
    this.phi = (p - 1) * (q - 1);

    this.validEList = this.generateValidEList();

    if (this.validEList.length === 0) {
      throw new Error("Brak prawidłowych wartości e dla wybranego phi.");
    }

    this.e = (selectedE && this.validEList.includes(selectedE)) 
      ? selectedE 
      : this.validEList[0];

    const calculatedD = modInverse(this.e, this.phi);
    if (calculatedD === null) {
      throw new Error("Nie można wyliczyć elementu odwrotnego d.");
    }
    this.d = calculatedD;
  }

  /** Generuje listę wszystkich 'e' spełniających 1 < e < phi oraz NWD(e, phi) === 1 */
  private generateValidEList(): number[] {
    const validE: number[] = [];
    for (let candidate = 2; candidate < this.phi; candidate++) {
      if (gcd(candidate, this.phi) === 1) {
        validE.push(candidate);
      }
    }
    return validE;
  }

  public encrypt(text: string): { asciiBlocks: number[]; encryptedBlocks: number[] } {
    const asciiBlocks: number[] = [];
    const encryptedBlocks: number[] = [];

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      
      // Sprawdzamy warunek algebry RSA: m < n
      if (charCode >= this.n) {
        throw new Error(
          `Znak '${text[i]}' (ASCII: ${charCode}) jest większy lub równy modułowi n=${this.n}. ` +
          `Wybierz większe liczby pierwsze p i q!`
        );
      }

      asciiBlocks.push(charCode);
      // c = m^e mod n
      const encrypted = modPow(charCode, this.e, this.n);
      encryptedBlocks.push(encrypted);
    }

    return { asciiBlocks, encryptedBlocks };
  }

  public decrypt(encryptedBlocks: number[]): { decryptedBlocks: number[]; text: string } {
    const decryptedBlocks: number[] = [];
    let text = "";

    for (const cipher of encryptedBlocks) {
      // m = c^d mod n
      const decrypted = modPow(cipher, this.d, this.n);
      decryptedBlocks.push(decrypted);
      text += String.fromCharCode(decrypted);
    }

    return { decryptedBlocks, text };
  }

  public crackKey(): { foundP: number; foundQ: number; foundPhi: number; foundD: number } {
    let foundP = 0;
    let foundQ = 0;

    for (let i = 2; i <= Math.sqrt(this.n); i++) {
      if (this.n % i === 0) {
        foundP = i;
        foundQ = this.n / i;
        break;
      }
    }

    if (!foundP || !foundQ) {
      throw new Error("Nie udało się zfaktoryzować liczby n.");
    }

    const foundPhi = (foundP - 1) * (foundQ - 1);
    const foundD = modInverse(this.e, foundPhi)!;

    return { foundP, foundQ, foundPhi, foundD };
  }
}