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

## Wzory

Mając dwa różne punkty $P=(x_1, y_1)$ i $Q=(x_2, y_2)$ leżące na krzywej chcemy znaleźć trzeci punkt przecięcia prostej. 

Prosta $k$ ma wzór:
$$
k: y = \frac{y_2-y_1}{x_2-x_1}(x-x_1)+y_1
$$

Gdzie możemy przyjąć, że $\frac{y_2-y_1}{x_2-x_1}$ będziemy oznaczać jako $\lambda$. Po podstawieniu pod równanie prostej otrzymujemy:

$$
(\lambda(x-x_1)-y_1)^2=x^3+Ax+B
\newline
x^3 - (\lambda(x - x_1) + y_1)^2 + Ax + B = 0
\newline
x^3 - (\lambda^2(x-x_1)^2+2\lambda y_1 (x-x_1)+y_1^2)+ Ax + B = 0
\newline
x^3 - (\lambda^2x^2-2\lambda^2x x_1+\lambda^2x_1^2+2\lambda y_1 x-2\lambda y_1 x_1+y_1^2)+ Ax + B = 0
\newline
x^3 - \lambda^2x^2 + 2\lambda^2x x_1-\lambda^2x_1^2-2\lambda y_1 x+2\lambda y_1 x_1-y_1^2+ Ax + B = 0
\newline
x^3 - \lambda^2x^2 +x(2\lambda^2x_1-2\lambda y_1 + A)-\lambda^2x_1^2+2\lambda y_1 x_1-y_1^2+ B=0
\newline
x^3 - \lambda^2x^2 +x(2\lambda^2x_1-2\lambda y_1 + A)-(\lambda x_1 -y_1)^2+ B=0
$$
Ze wzorów Viète’a dla wielominau trzeciego stopnia $x^3 + a_2 x^2 + a_1 x + a_0 = 0$ suma pierwiastków wynosi: 
$$
x_1 + x_2 + x_3 = -a_2
$$
Dla naszego przypadku:
$$
a_2 = -\lambda^2
$$
Zatem
$$
x_3 = \lambda^2 - x_1 - x_2
$$
***
Dodawanie tego samego punktu do samego siebie styczna przyjmie wzór o współczynniku kierunkowym:
$$
\lambda = \frac{3x_1^2 + A}{2y_1}
$$
Reszta jest analogiczna z przypadkiem 1-szym, a końcowy wzór to:
$$
x_3 = \lambda^2 - 2x_1
$$