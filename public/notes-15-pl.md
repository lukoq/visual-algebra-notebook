# Rozdział piętnasty

## Notacja Diraca

Inaczej notacja bra-ket. To sposób zapisu fizycznych stanów kwantowych w formie przekształceń liniowych.  

Stan kwantowy to znormalizowany (czyli o długości równej jeden) wektor w przestrzeni Hilberta $\mathcal{H} = \mathbb{C}^2$ (dla jednego kubitu) lub $\mathcal{H} = (\mathbb{C}^2)^{\otimes n} = \mathbb{C}^{2^n}$ (dla rejestru $n$-kubitowego).
- **Ket** $\vert{v}\rangle$ oznacza macierz dwuelementową kolumnową. Na przykład:
$$
\vert{}v\rangle = \begin{pmatrix} 7-i \\ 5 + 3i \end{pmatrix}
$$
Wektory bazowe zapisujemy jako:
 $$\vert{}0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad \vert{}1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$
 - **Bra**  $\langle v\vert{}$ to transpozycja i sprężenie ket-a
	 Przykładowo dla:
$$
\vert{}v\rangle = \begin{pmatrix} 7-i \\ 5 + 3i \end{pmatrix}
$$
Otrzymujemy:
$$
\langle v\vert{} = \begin{pmatrix} \overline{7-i} \\ \overline{5 + 3i} \end{pmatrix}^\dagger=\begin{pmatrix} {7+1} \\ {5 - 3i} \end{pmatrix}^\dagger=\begin{pmatrix} 7+1 & 5-3i \end{pmatrix}
$$

## Iloczyn dwóch stanów kwantowych

Iloczyn skalarny zapisujemy jako:
$$
\langle v\vert{} \cdot \vert{}w\rangle
$$
lub po prostu
$$
\langle v \vert{} w\rangle
$$
gdzie _bra_ pełni rolę funkcjonału, czyli funkcji która biorąc wektor $\vert{}w\rangle$ wypluwa pojedyńczą liczbę zespoloną. 

Istotnie, kiedy rozpiszemy działanie otrzymujemy:
$$\langle v\vert{} \cdot \vert{}w\rangle = \begin{pmatrix} a & b \end{pmatrix} \begin{pmatrix} c \\ d \end{pmatrix} = ac + bd$$
***
W przypadku odwrotnego działania, gdzie będziemy mnożyć _bra_ przez _ket_ otrzymujemy tzw. _iloczyn zewnętrzny_

$$
\vert{} u \rangle \cdot \langle v \vert{}
$$
Po rozpisaniu (mnożymy wiersze pierwszej macierzy razy kolumny drugiej):
$$
\vert{} u \rangle \cdot \langle v \vert= \begin{pmatrix} c \\ d \end{pmatrix} \begin{pmatrix} a & b \end{pmatrix}= \begin{pmatrix} ac & bc \\ ad & bd \end{pmatrix}
$$
Otrzymujemy w ten sposób macierz przekształcenia. 

## Relacja ortogonalności

Dwa wektory są ortogonalne jeśli przecinają się pod kątem $90^\circ$. W zwykłej geometrii łatwo to stwierdzić poprzez narysowanie dwóch wektorów na danej płaszczyźnie kartezjańskiej. 

W przestrzeniach liniowych będącymi przestrzeniami Hilberta $\mathcal{H} =\mathbb{C}^n$ obliczamy to za pomocą iloczynu skalarnego. Jeśli $\langle u \vert{} v \rangle = 0$ to wektory $\vert{}u\rangle$ i $\vert{}v\rangle$ są do siebie prostopadłe. Dzieje się tak, ponieważ jeśli jakiś wektor jest prostopadły do innego to ich wartości powinny się zerować. Czyli tam gdzie kieruje się ja, mój odpowiednik na pewno nie idzie (ma wartość zero). 

W sensie kwantowym takie dwa wektory reprezentują zdarzenia wzajemnie się wykluczające. 

## Prawdopodobieństwo przejścia

Pomiar zmienia stan kwantowy cząstki. Jeśli otrzymam kubit w pewnym stanie $\vert{}\psi\rangle$ jego prawdopodbieństwo przejścia do stanu $\vert{}\phi\rangle$ wynosi:
$$P = \vert{}\langle \phi \vert{} \psi \rangle\vert{}^2$$
Kubit $\vert{}\psi\rangle=\begin{pmatrix} \alpha \\ \beta \end{pmatrix}$ mierzony w bazie $\{ \vert{} 1 \rangle\ \text{,} \vert{} 0 \rangle\}$ można zapisać jako $\vert{}\psi\rangle=\alpha \vert{} 1 \rangle+\beta\vert{} 0 \rangle$. Ma on prawdopodobieństwo przejścia w stan $\vert{} 1 \rangle$ równy:
$$
\vert{}\langle 1\vert{} \psi \rangle\vert{}^2=\vert{}\begin{pmatrix} 0 & 1 \end{pmatrix} \cdot \begin{pmatrix} \alpha \\ \beta \end{pmatrix}\vert{}^2=\vert{}\beta\vert{}^2
$$
Mierząc dla stanu $\vert{} 0 \rangle$:
$$
\vert{}\langle 0\vert{} \psi \rangle\vert{}^2=\vert{}\begin{pmatrix} 1 & 0 \end{pmatrix} \cdot \begin{pmatrix} \alpha \\ \beta \end{pmatrix}\vert{}^2=\vert{}\alpha\vert{}^2
$$
Przy czym:
$$
\vert{}\alpha\vert{}^2+\vert{}\beta\vert{}^2=1
$$

## Ważne kety (znormalizowane)
$$
\vert{}0\rangle=\begin{pmatrix} 1 \\\\ 0 \end{pmatrix}
$$
$$
\vert{}1\rangle=\begin{pmatrix} 0 \\\\ 1 \end{pmatrix}
$$
$$
\vert{}+\rangle=\begin{pmatrix} \frac{\sqrt2}{2} \\\\ \frac{\sqrt2}{2} \end{pmatrix}
$$
$$
\vert{}-\rangle=\begin{pmatrix} \frac{\sqrt2}{2} \\\\ -\frac{\sqrt2}{2} \end{pmatrix}
$$
$$
\vert{}i\rangle=\begin{pmatrix} \frac{\sqrt2}{2} \\\\ \frac{\sqrt2}{2}i \end{pmatrix}
$$



