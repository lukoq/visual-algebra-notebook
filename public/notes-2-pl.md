# Rozdział drugi
## Podgrupa
Jeśli $(G, *)$ jest grupą z elementem neutralnym $e$, to podzbiór $H ⊂ G$ nazywamy podgrupą grupy $G$, jeśli $e∈H$ i zbiór $(H, *)$ jest grupą. 

Żeby być legalną podgrupą, musi być ona samowystarczalna. Jeśli dwa elementy podgrupy wejdą w interakcję, wynik musi zostać w podgrupie (zamkniętość). Muszą też mieć swój element neutralny i umieć cofać swoje ruchy.

## Podgrupa generowana
Najmniejszą podgrupę grupy $G$ zawierającą zbiór $X$ nazywamy podgrupą generowaną przez zbiór $X$, a zbiór $X$ nazywamy zbiorem generatorów. 

$$
H = \langle X  \rangle
$$

Podgrupa generowana przez $X$ (zapisywana jako $\langle X \rangle$) to wszystko, co jesteś w stanie zbudować, mając do dyspozycji te elementy, łącząc ze sobą wszystko na wszelkie możliwe sposoby.

Analogia zegarowa:
Twój zbiór $X$ zawiera tylko jedną liczbę: $X = \{5\}$.

Co zbudujesz na zegarze mając do dyspozycji tylko liczbę $5$ i wciskasz ją wielokrotnie?

-   1 wciśnięcie = 5
-   2 wciśnięcia = 10
-   3 wciśnięcia = 3, bo ($15 \pmod{12} = 3$)
-   4 wciśnięcia = 8, bo ($20 \pmod{12} = 8$)
-   Po czasie otrzymasz sekwencje: 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7 i w końcu 12.

Okazuje się, że za pomocą samej liczby 5 jesteś w stanie wygenerować cały zbiór. Zbiór $\{5\}$ jest więc zbiorem generatorów dla całej grupy $\mathbb{Z}_{12}$.

Aby znaleźć wszystskie podgrupy grupy $\mathbb{Z}_{n}$ biorę po prostu każdy dzielnik liczby $n$. Dla każdego dzielnika istnieje dokładnie jedna podgrupa o takim rozmiarze. 

## Cykliczność 

Grupa jest cykliczna, jeśli całą tę wielką, skomplikowaną strukturę da się wygenerować za pomocą tylko jednego, pojedynczego elementu.

Dowolny element $g$ generuje CAŁĄ grupę cykliczną o rozmiarze $n$ wtedy i tylko wtedy, gdy $\text{NWD}(g, n) = 1$

Ilość takich elementów w grupie liczymy za pomocą funkcji Eulera $\varphi(n)$. Ta funkcja liczy ile jest elementów mniejszych od $n$, które są z nim względnie pierwsze (NWD równa się jeden).

## Rząd grupy i elementu

Rząd grupy (zapisywany najczęściej jako $|G|$) to ilość elementów należąca do grupy.

Rząd elementu (zapisywany jako $|g|$) to to odpowiedź na pytanie: „Ile razy muszę użyć tego elementu, żeby otrzymać element neutralny?”. W grupach cyklicznych rząd elementu to po prostu długość pętli, jaką ten element zatacza, zanim wróci do punktu wyjścia.