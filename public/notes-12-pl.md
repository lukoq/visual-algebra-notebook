# Rozdział dwunasty

## Krzywa eliptyczna Diffiego-Hellmana

Protokół Diffiego-Hellmana na krzywej eliptycznej korzysta z tej samej logiki co jego zwykła wersja. Różnica występuje w działaniach jakie wykonujemy. W klasycznym przykładzie algorytmu używamy potęgowania na zegarze $\mathbb{Z_p}$ ($g^a \pmod p$). W wersji używającej krzywej eliptycznej wszystkie działania odbywają się na niej w sposób omówiony w poprzednim rozdziale (Rozdział 10). 

1. W klasycznym protokole Alice i Bob wybierają na początku liczby $p$ i $g$. W tym przypadku ustalają jednak:
- Równanie krzywej $y^2 = x^3 + Ax + B \pmod p$
- Punkt bazowy $P = (x_1, y_1)$ (punkt musi leżeć na wybranej krzywej)
2. Dalej tak jak w klasycznej wersji Alice i Bob wybierają swoje tajne liczby $a$ (Alice) i $b$ (Bob). 
3. Zamiast obliczać $g^a$ i $g^b$ przez każdego z nich, tutaj mnożą punkt bazowy $P$ przez swój skalar. Wykonują działania:
- Alice: $A= a \cdot P$ i wysyła go Bobowi.
- Bob: $B= b \cdot P$ i wysyła go do Alice

	Mnożenie punktu przez skalar na krzywej odbywa się poprzez dodawanie tego samego punktu do samego siebie $n$ razy.
	
4. Otrzymując swoje klucze publiczne, obliczają wspólny sekret. 
- Alice liczy: $S_{\text{Alice}} = a \cdot B = a \cdot (b \cdot P)$
- Bob liczy: $S_{\text{Bob}} = b \cdot A = b \cdot (a \cdot P)$

	Jak nie trudno zauważyć $S_{\text{Alice}}=S_{\text{Bob}}$. Dzieje się tak ponieważ mnożenie na krzywej jest przemienne i łączne.
	$$S = a \cdot (b \cdot P) = b \cdot (a \cdot P) = (a \cdot b) \cdot P$$

## Problem Dyskretnego Logarytmu

W klasycznym protokole Diffiego-Hellmana, Eve która przypatrywałaby się wszystkiemu z boku, aby odkryć sekret musi rozwiązać problem _dyskretnego logarytmu_, gdzie jedyną prostą metodą jest przeszukanie wszystkich możliwych liczb. Istnieja jednak bardziej wyszukane metody łamania go np. algorytm _GNFS (General Number Field Sieve)_ lub _redukcja Pohliga-Hellmana_. 

Problem Dyskretnego Logarytmu na Krzywych Eliptycznych (ECDLP) jest jeszcze trudniejszy do złamania. Polega on na znalezieniu nieznanej liczby $a$ w równaniu $A = a \cdot P$, gdzie znane są punkty $P$ oraz $B$ na krzywej eliptycznej.

## Protokoły SSL / TLS

Komunikacja klient serwer odbywa się za pomocą pakietów TCP. Aby taka rozmowa była bezpieczna należy ją odpowiednio zaszyfrować i zabezpieczyć. 

Działanie **TLS 1.3** sprowadza się do kilku kroków:

1. **Certyfikat X.509**: Serwer wysyła przeglądarce swój certyfikat tożsamości. Jest na nim nazwa domeny, klucz publiczny strony oraz cyfrowy podpis zaufanego urzędu świadczący o autentyczności. 
2. **Użycie krzywych eliptycznych**: Klient wymienia się z serwerem obliczonymi punktami na krzywej. Często używa się krzywej *Curve25519* o wzorze:
- $y^2=x^3+486662x^2+x$
3. **Haszowanie punktu**: Kiedy strony obliczyły wspólny tajny punkt na krzywej haszują go za pomocą algorytmów *SHA-256* lub *HKDF*. Obie strony otrzymują ten sam wynik. Robi się tak, aby przekształcić geometryczny punkt w losowy ciąg bitów, który jest wygodniejszy w użyciu. Taki ciąg można pociąć na mniejsze fragmenty i wygenerować wiele przydatnych kluczy z jednego sekretu. 
4. **ChaCha20**: Zamiast używania algorytmu Elgamal, używa się symetrycznego szyfrowania *ChaCha20*. Pakuje do niego zahaszowany klucz prywatny i tzw. nonce, czyli publiczną losową liczbę, którą serwer wymienia się z klientem. Algorytm generuje ciąg zer i jedynek, który jest zależny od otrzymanych danych. Ten losowy szum łącze XORem z moją właściwą wiadomością. W ten sposób generuje zaszyfrowany ciąg. 
5. **Poly1305**: Algorytm bierze zaszyfrowaną wiadomość jeszcze przed wysłaniem i generuje z niej unikalny kod. Potem wysyła wiadomość + unikalny kod. Po wysłaniu odbiorca robi to samo i sprawdza czy jego szum daje ten sam kod.  W ten sposób chronimy naszą wiadomość i zysujemy pewność, że nikt po drodze nie podmienił w niej jakiś bitów. 

Podsumowując:
-   **X.509:** Daję gwarancję wiarygodności rozmówcy (ochrona przed oszustem).
-   **Krzywa eliptyczna:** Ustala wspólny sekret w publicznym kanale (ECDH).
-   **SHA-256:** Wyciąga czyste klucze z punktu na krzywej.
-   **ChaCha20:** Chroni przed podejrzeniem treści (poufność).
-   **Poly1305:** Chroni przed zafałszowaniem danych po drodze (integralność).

Protokół **SSL** to przestarzała wersja **TLS**. Algorytmy szyfrujące go zostały uznane za niebezpieczne i istnieją sposoby ich złamania np. atak *POODLE*. 
