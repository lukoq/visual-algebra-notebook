# Rozdział czwarty

## Funkcja Eulera

Funkcja Eulera (Tocjent) $\phi:\mathbb{N} \rightarrow \mathbb{N}$ przypisuje liczbie naturalnej $n$ liczbę $k$ mniejszych od $n$, które są względnie pierwsze z $n$. Przy czym $\phi(1)=1$.
Z definicji wynika, że jeśli $p$ jest liczbą pierwszą to $\phi(p)=p-1$. 

Funkcję można wykorzystać do liczenia liczby generatorów grupy cyklicznej. Na przykład generatorem grupy $\mathbb{Z}_n$ jest każda liczba $m∈\mathbb{Z}_n$, której $NWD(n, m) = 1$. 
W szczególności warto pamiętać, że każda grupa cykliczna, której rząd jest liczbą pierwszą to każdy jej element różny od jedynki jest jej generatorem. 

## Dalsze własności funkcji Eulera

Jeśli $a,b∈\mathbb{N}$ i $NWD(a, b) = 1$ (liczby te są względnie pierwsze), to 
$$
\phi(a·b)=\phi(a)·\phi(b)
$$
(przypomina to trochę twierdzenie o kongurencji)

Dla ciągu $\left(\frac{\phi(n)}{n}\right)_{n=1}^{\infty}$, zbiór wyrazów tego ciągu jest gęsto rozłożony w przedziale $(0,1)$

$$
 a<\frac{\phi(n)}{n}< b
$$
Dla $(a, b)∈(0,1)$, $a<b$ i pewnego $n∈\mathbb{N}$




