# Rozdział czwarty

  

## Funkcja Eulera

  

Funkcja Eulera (Tocjent) $\phi:\mathbb{N} \rightarrow  \mathbb{N}$ przypisuje liczbie naturalnej $n$ liczbę $k$ mniejszych od $n$, które są względnie pierwsze z $n$. Przy czym $\phi(1)=1$.

Z definicji wynika, że jeśli $p$ jest liczbą pierwszą to $\phi(p)=p-1$.

  

Funkcję można wykorzystać do liczenia liczby generatorów grupy cyklicznej. Na przykład generatorem grupy $\mathbb{Z}_n$ jest każda liczba $m∈\mathbb{Z}_n$, której $NWD(n, m) = 1$.

W szczególności warto pamiętać, że każda grupa cykliczna, której rząd jest liczbą pierwszą to każdy jej element różny od jedynki jest jej generatorem.

  

## Dalsze własności funkcji Eulera

  

Jeśli $a,b∈\mathbb{N}$ i $NWD(a, b) = 1$ (liczby te są względnie pierwsze), to

$$
\phi(a·b)=\phi(a)·\phi(b)
$$

(przypomina to trochę twierdzenie o kongurencji)

 ---

Dla ciągu $\left(\frac{\phi(n)}{n}\right)_{n=1}^{\infty}$, zbiór wyrazów tego ciągu jest gęsto rozłożony w przedziale $(0,1)$

$$
a<\frac{\phi(n)}{n}< b
$$

Dla $(a, b)∈(0,1)$, $a<b$ i pewnego $n∈\mathbb{N}$

---
Dla każdego $n∈\mathbb{N}$ prawdziwy jest wzór
$$
\sum_{d|n} \phi(d)=n
$$
Przykład dla $n=12$. Dzielniki $12$ to $1,2,3,4,6,12.$ 
$$
\sum_{d|12} \phi(d)=\phi(1)+\phi(2)+\phi(3)+\phi(4)+\phi(6)+\phi(12)=\newline
=1+1+2+2+2+4=12
$$


(przyjmujemy, że $\phi(1)=1$)

---
Jeśli $p$ jest liczbą pierwszą, $a, k∈\mathbb{N}$, to
$$
\phi(p^k)=p^k-p^{k-1}
$$
Dowód indukcyjny ze względu na parametr $k$. 
Dla $k=1$ otrzymujemy $\phi(p^1)=p^1-p^{0}=p-1$. Załóżmy, że $\phi(p^l)=p^l-p^{l-1}$ dla każdego $l \le k$. Dalej korzystając z twierdzenia wyżej:
$$
\sum_{d|p^{k+1}} \phi(d)=p^{k+1}
$$
Dzielnikami takiej liczby $p^{k+1}$ są kolejne potęgi $p$. Czyli $p^{0},p^{1},p^{2}...p^{k},p^{k+1}$. Wiemy zatem, że
$$
p^{k+1}=\phi(1)+\phi(p)+\phi(p^2)+...+\phi(p^{k})+\phi(p^{k+1})=
$$
$$
=1+(p-1)+(p^2-p)+...+(p^k-p^{k-1})+\phi(p^{k+1})=p^k+\phi(p^{k+1})
$$
Czyli
$$
p^{k+1}=p^k+\phi(p^{k+1})
$$
$$
\phi(p^{k+1})=p^{k+1}-p^k
$$
Co kończy dowód. 