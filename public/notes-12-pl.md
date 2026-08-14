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

## Zalety podejścia

W klasycznym protokole Diffiego-Hellmana, Eve która przypatrywałaby się wszystkiemu z boku, aby odkryć sekret musi rozwiązać problem _dyskretnego logarytmu_, gdzie jedyną prostą metodą jest przeszukanie wszystkich możliwych liczb. Istnieja jednak bardziej wyszukane metody łamania go np. algorytm _GNFS (General Number Field Sieve)_ lub _redukcja Pohliga-Hellmana_. 

Problem Dyskretnego Logarytmu na Krzywych Eliptycznych (ECDLP) jest jeszcze trudniejszy do złamania. Polega on na znalezieniu nieznanej liczby $a$ w równaniu $A = a \cdot P$, gdzie znane są punkty $P$ oraz $B$ na krzywej eliptycznej.