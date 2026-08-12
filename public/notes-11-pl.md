# Rozdział jedenasty

## Protokół Diffiego-Hellmana

Do ustalenia szyfru potrzebujemy multiplikatywnej grupy $(\mathbb{Z_p}, \cdot)$, gdzie $p$ jest liczbą pierwszą. Całość można wytłumaczyć na trzech aktorach. 

1. Alice i Bob ustalają swój szyfr. Wybierają oni dużą liczbę pierwszą $p$ i podstawę $g$, które musi być generatorem całej grupy $\mathbb{Z_p}$. Jest to klucz publiczny.
2. Dalej oboje wybierają swoje klucze prywatne $a, b ∈\mathbb{Z_p}$.
3. Alice wysyła Bobowi wynik działania $A = g^a \pmod{p}$. Natomiast Bob wysyła jej wynik działania $B = g^b \pmod{p}$.
4. Alice bierze otrzymane od Boba $B$ i liczy $S_{Alice}=B^a \pmod{p}$.
5. Bob analogicznie oblicza $S_{Bob}=A^b \pmod{p}$.

Sztuczka polega na tym, że $S_{Alice}=S_{Bob}$. Dzieje się tak, ponieważ $A = g^a$ i $B = g^b$, co daje $S_{Alice}= g^{ba}$ i $S_{Bob}= g^{ab}$ (pomijąc modulo $p$). Możenie jest przemienne, więc $g^{ba}=g^{ab}$.

Oboje posiadają teraz element $g^{ab}$ który może posłużyć jako tajny klucz.

6. Eve która przypatrywała się wszystkiemu z boku zna tylko liczby $p$, $g$, $A$, $B$. Aby obliczyć $g^{ab}$ musiałaby obliczyć _problem dyskretnego logarytmu_.
$$
g^a \equiv A \pmod{p}
$$
Gdzie $a$ jest jej nieznane.

## ElGamal
Po uzgodnieniu klucza można zacząć szyfrować.

1. Jeśli Alice chce wysłać wiadomość Bobowi, tworzy szyfrogram $C =m \cdot g^{ab} \pmod{p}$. 
2. Bob, aby zobaczyć taką wartość $m$ musi najpierw obliczyć $(g^{ab})^{-1}$ w grupie $\mathbb{Z_p}$. Rząd grupy (równa się funkcji Eulera $\phi(p)$) wynosi $p-1$. Z małego twierdzenie Fermata wiemy, że 
$$
a^{p-1} \equiv 1 \pmod p
$$
Dla dowolnego $a∈\mathbb{Z_p}$.
Po pomnożeniu stron przez $a^{-1}$:
$$
a^{p-1} \cdot a^{-1} \equiv 1 \cdot a^{-1} \pmod p \newline
a^{p-2} \equiv a^{-1} \pmod p
$$
Podstawiając $a = g^{ab}$ otrzymujemy:
$$
(g^{ab})^{p-2} \equiv (g^{ab})^{-1} \pmod p
$$
Czyli mnożąc szyfrogram $C$ przez $(g^{ab})^{p-2}$, Bob otrzyma wiadomość $m$.
$$
m \equiv C \cdot (g^{ab})^{p-2} \pmod p
$$