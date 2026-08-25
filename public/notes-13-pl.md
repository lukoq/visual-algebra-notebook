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

## Właściwości przestrzeni liniowych

Powłokę liniową zbioru $A$ oznaczamy symbolem $\text{lin}(A)$. Powłoka liniowa to zbiór wszystkich wektorów jakie jesteśmy w stanie zbudować za pomocą wyłącznie wektorów dostępnych w zbiorze $A$. 

I tak na przykład mając zbiór $A=\{(1,0,0),(0,1,0)\}$, zbiór $\text{lin}(A)$ będzie zawierał wszystkie kombinacje tych wektorów. Zatem $\text{lin}(A)=\{(\alpha,\beta,0)\}$, gdzie po prostu $\alpha, \beta \in \mathbb{R}$. Rozpiszemy w ten sposób całą płaszczyznę kartezjańską $XY$, czyli zbiór $\mathbb{R}^2$.

Jeśli $A \subseteq V$ jest zbiorem liniowo niezależnym takim, że $V = \text{lin}(A)$, to zbiór A definiujemy jako bazę przestrzeni liniowej $V$.

***
Jak mówi twierdzenie Steinitza
> Niech $V$ będzie przestrzenią liniową nad ciałem $\mathbb{K}$. Jeśli zbiór $B \subseteq V$ jest takim zbiorem skończonym, że $\text{lin}(B)=V$, a zbiór skończony $A \subseteq V$ składa się z wektorów liniowo niezależnych, to
> - _(1)_ $|A|\le|B|$
> - _(2)_ istnieje taki podzbiór $B'\subseteq B$, że $|B'| = |B|-|A|$ oraz $\text{lin}(B'\cup A)=V$

Tłumacząc to na język ludzki, możemy z tego twierdzenia wyciągnąć dwa wnioski. 
Po pierwsze wiemy, że w przestrzeni rozpinanej przez $n$ wektorów nie da się wcisnąć więcej niż $n$ wektorów niezależnych.
Po drugie, możesz wyrzucić $k$ wektorów ze starego zbioru $B$ i zastąpić je wektorami ze zbioru $A$, a nowo powstały zbiór nadal będzie rozpinał tę samą przestrzeń $V$.

Z powyższego twierdzenia można dowieść, że jeśli przestrzeń liniowa $V$ ma bazę $n$-elementową, to każda baza w przestrzeni $V$ ma $n$ elementów.