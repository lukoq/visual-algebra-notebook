# Rozdział trzynasty

## Przestrzenie liniowe 

Przestrzeń liniowa to rodzaj struktury algebraicznej złożonej z wektorów i zdefiniowanych na nich dwóch działaniach: dodawaniu wektorów oraz mnożeniu wektorów przez skalar (czyli liczbę ze zbioru $\mathbb{R}$ lub $\mathbb{C}$).

Załóżmy, że mamy ciało $\mathbb{K}$ i grupę abelową $(V, +)$ z wyróżnionym elementem $0$. Przyjmijmy, że istnieje operacja która dla każdego elementu $\alpha∈\mathbb{K}$ i każdemu $v∈V$ przyporządkuje element $\alpha v$. Przy spełnionych warunkach:

- _(1)_ $\alpha(v+w)=\alpha v + \alpha w$ (dla $\alpha∈\mathbb{K}$ oraz $v, w∈V$),
- _(2)_ $(\alpha + \beta)v=\alpha v+\beta v$ (dla $\alpha, \beta∈\mathbb{K}$ oraz $v∈V$),
- _(3)_ $(\alpha \beta) v= \alpha (\beta v)$ (dla $\alpha, \beta∈\mathbb{K}$ oraz $v∈V$),
- _(4)_ $1v=v$ (dla $v∈V$)

to zbiór $V$ jest przestrzenią liniową nad ciałem $\mathbb{K}$. 

Przykładem takiej przestrzeni może być płaszczyzna kartezjańska $\mathbb{R}^2$, gdzie ciałem skalarów jest $\mathbb{K} = \mathbb{R}$, a zbiorem wektorów $V = \mathbb{R}^2$, czyli pary liczb $(x, y)$.

## Baza wektorowa

Bazę wektorową tworzą wektory z ustalonej przestrzeni liniowej, gdzie poszczególne wektory są ze sobą liniowo niezależne. Jest to maksymalny zbiór tzn. że nie można już do niego dodać nic więcej nie łamiąc zasady liniowej niezależności. 

Liniową niezależność rozumiemy jako brak możliwości utworzenia danego wektora przez kombinacje innych. Żadnego z nich nie da się utworzyć za pomocą sumy ani przeskalowania przez skalar pozostałych. 

Kombinacją liniową wektorów $v_1, v_2... v_n$ nazywamy wektor $v$ postaci
$$
v=a_1v_1+a_2v_2+...+a_nv_n
$$
gdzie $a∈\mathbb{K}$

Przykładem bazy w $\mathbb{R}^2$ jest zbiór wektorów $\begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

Aby sprawdzić czy dany zbiór wektorów jest bazą ustawiamy wektory w kolumnach macierzy i liczymy jej wyznacznik. Jeśli jest różny od zera to wektory tworzą bazę.
Dla podanego przykładu mamy
$$
\det \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = 1 \cdot 1 = 1\neq 0
$$
Dla wektorów $\begin{pmatrix} 1 \\ 0 \\0 \\1 \end{pmatrix}$, $\begin{pmatrix} 0 \\ 1 \\0 \\1 \end{pmatrix}$, $\begin{pmatrix} 0 \\ 0 \\1 \\0 \end{pmatrix}$, $\begin{pmatrix} 0 \\ 0 \\1 \\1 \end{pmatrix}$ wyznacznik wynosi (metodą rozwinięcia Laplace'a):

$$
\begin{aligned} \det \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 1 \\ 1 & 1 & 0 & 1 \end{pmatrix} &= 1 \cdot (-1)^{1+1} \cdot \det \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{pmatrix} - 0 + 0 - 0 \\ &= 1 \cdot 1 \cdot \left[ 1 \cdot (-1)^{1+1} \cdot \det \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} - 0 + 0 \right] \\ &= 1 \cdot \left[ 1 \cdot (1 \cdot 1 - 1 \cdot 0) \right] \\ &= 1 \cdot (1 - 0) = 1 \end{aligned}
$$

Gdzie wzór względem $i$-tego wiersza wygląda w ten sposób
$$
\det(A) = \sum_{j=1}^n a_{ij} \cdot (-1)^{i+j} \cdot M_{ij}
$$

W powyższym przykładzie wektory również tworzą bazę. 