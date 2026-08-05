# Rozdział dziesiąty

## Krzywe eliptyczne

Krzywą eliptyczną dla ciała $K$ opisuje równanie (jeśli $\mathrm{char}(K) \neq 2, 3$):
$$
y^2=x^3+Ax+B
$$
gdzie $A, B ∈ K$

Dla ciał z charakterystyka równą $2$ (np. $\mathbb{F}_{2^m}$) równanie przyjmuje postać:

- $y^2 + x y = x^3 +A x^2 + B$

Dla ciał z charakterystyka równą $3$ równanie przyjmuje postać:

- $y^2 = x^3 + A x^2 + Bx + C$

Ogólna postać równania to:

- $y^2 + a_1 x y + a_3 y = x^3 + a_2 x^2 + a_4 x + a_6$

dla pewnych stałych $a_k∈K$

***

Liczba $y^2$ tworzy symetryczne odbicie względem osi $OX$. To oznacza, że dla każdego $x$ mamy dwa rozwiązania (dokładnie dodatnie i ujemne np. jeśli $y^2 = 9$, to $y = 3$ albo $y = -3$). 

## Dodawanie dwóch punktów na krzywej

Dowolna prosta wyznaczona za pomocą dwóch różnych punktów na krzywej ($P$, $Q$) przecina ją w trzech miejscach. 

Dodawanie tych dwóch punktów do siebie rozumiemy jako szukanie tego trzeciego miejsca przecięcia (oznaczanego jako $-R$) i odbicie go symetrycznie względem osi $OX$. Po zmiane znaku na przeciwny otrzymujemy $R$.
$$
P + Q + (-R) = \mathcal{O}
$$
gdzie $\mathcal{O}$ oznacza punkt w nieskończoności.

Jeśli chcemy dodać jeden punkt do siebie ($P + P = 2P$) rysujemy styczną do punktu $P$ i szukamy drugiego miejsca przecięcia $-R$. Odbity punkt $R$ to wynik działania $2P$. Jeśli zrobisz to jeszcze raz (dodasz $2P + P$ rysując prostą przez nie), otrzymasz $3P$. Jest to tzw. _skakanie po krzywej_ ($k \cdot P$).

Jeśli chcemy dodać punkt $P$ i jego element odwrotny $-P$ powinniśmy otrzymać element neutralny. Linia przechodząca przez te dwa punkty jest idealnie pionowa, więc przechodzi tylko przez nie. Oznaczamy wtedy, że $P + (-P) = \mathcal{O}$, gdzie $\mathcal{O}$ pełni rolę zera — punktu przecięcia krzywej w nieskończoności. 
