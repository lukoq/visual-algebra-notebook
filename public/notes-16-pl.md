# Rozdział szesnasty

## Iloczyn tensorowy

Jeśli chcemy połączyć kubity w jeden rejestr robimy to za pomocą iloczynu tensorowego. Iloczyn tensorowy (zwany też iloczynem Kroneckera ) to pomnożenie każdego elementu wektora pierwszego przez wektor drugi. 
$$
\vert{}u\rangle \otimes \vert{}v\rangle = \begin{pmatrix} u_0 \\ u_1 \end{pmatrix} \otimes \begin{pmatrix} v_0 \\ v_1 \end{pmatrix} = \begin{pmatrix} u_0 \cdot \begin{pmatrix} v_0 \\ v_1 \end{pmatrix} \\ u_1 \cdot \begin{pmatrix} v_0 \\ v_1 \end{pmatrix} \end{pmatrix} = \begin{pmatrix} u_0 v_0 \\ u_0 v_1 \\ u_1 v_0 \\ u_1 v_1 \end{pmatrix}
$$
Np.
$$\vert{}0\rangle \otimes \vert{}0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 1 \\ 0 \end{pmatrix} =
\begin{pmatrix} 1 \cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix} \\ 0 \cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix} \end{pmatrix}=
 \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix}
$$
Kiedy używamy iloczynu tensorowego przestrzeń liniowa opisująca powstały rejestr kubitów podnosi się do kwadratu. Pojedyńczy kubit istnieje w przestrzenii liczb zespolonych $\mathbb{C}^2$. Dla rejestru $n$-kubitowego liczba przestrzeni wynosi $2^n$, czyli końcowy wymiar to $\mathbb{C}^{2^n}$. 

Iloczyn tensorowy w notacji Diraca zapisujemy jednym ciągiem:
- $\vert{}0\rangle \otimes \vert{}0\rangle \equiv \vert{}00\rangle$
- $\vert{}1\rangle \otimes \vert{}0\rangle\otimes \vert{}1\rangle \equiv \vert{}101\rangle$
- itd...

W rejestrze $4$-wymiarowym baza standardowa składa się z dwóch kubitów we wszystkich konfiguracjach: $\vert{}00\rangle$, $\vert{}01\rangle$, $\vert{}10\rangle$ oraz $\vert{}11\rangle$. Po przemnożeniu i wyliczeniu wygląda w ten sposób

$$
\vert{}00\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix}, \quad \vert{}01\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}
$$

$$
\vert{}10\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \otimes \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}, \quad \vert{}11\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix} \otimes \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}
$$
##  Bramki kwantowe

Podstawową bramką kwantową używaną w programowaniu kwantowym jest bramka Hadamarda. Wprowadza ona kubit w idealną, symetryczną superpozycję $\vert{}+\rangle$ i $\vert{}-\rangle$. Prawdopodobieństwo przejścia takiego kubitu w $\vert{}0\rangle$ albo $\vert{}1\rangle$ to po równo $\frac{1}{2}$. 
Np. dla $\vert{}+\rangle$:
- $\vert{}\langle 0 \vert{} + \rangle\vert{}^2 = \left\vert{} \begin{pmatrix} 1 & 0 \end{pmatrix} \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix} \right\vert{}^2 = \left\vert{} \frac{1}{\sqrt{2}} \right\vert{}^2 = \mathbf{\frac{1}{2}}$
- $\vert{}\langle 1 \vert{} + \rangle\vert{}^2 = \left\vert{} \begin{pmatrix} 0 & 1 \end{pmatrix} \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix} \right\vert{}^2 = \left\vert{} \frac{1}{\sqrt{2}} \right\vert{}^2 = \mathbf{\frac{1}{2}}$

Dla $\vert{}-\rangle$ sprawa wygląda tak samo. 

Aby otrzymać kubit w tym idealnym stanie niepewności musimy przepuścić go przez wspomnianą bramkę Hadamarda. 

$$H = \begin{pmatrix} \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}} \end{pmatrix}$$

Wektory bazowe $\vert{}0\rangle$, $\vert{}1\rangle$ przepuszczone przez tą bramkę dają $\vert{}+\rangle$ i $\vert{}-\rangle$.
 
$$
H\vert{}0\rangle = \begin{pmatrix} \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}} \end{pmatrix}  \begin{pmatrix} 1  \\ 0\end{pmatrix} = \begin{pmatrix} \frac{1}{\sqrt{2}}  \\ \frac{1}{\sqrt{2}} \end{pmatrix}  = \vert{}+\rangle
$$
$$
H\vert{}1\rangle = \begin{pmatrix} \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{2}} \end{pmatrix}  \begin{pmatrix} 0  \\ 1 \end{pmatrix} = \begin{pmatrix} \frac{1}{\sqrt{2}}  \\ -\frac{1}{\sqrt{2}} \end{pmatrix}  = \vert{}-\rangle
$$

Każda bramka kwantowa to macierz unitarna, czyli spełniająca warunek
$$U^\dagger U =U U^\dagger= I_n$$

$U^\dagger$ to sprężenie hermitowskie, czyli transponujemy macierz i sprężamy każdy jej element. 

$I_n$ to macierz jednostkowa o wymiarze $n$ (tzn. taka, która ma jedynki po przekątnej i zera wszędzie indziej.)
Ma to dawać gwarancje stałej długości wektora przepuszczanego przez bramkę. Wektor bazowy o długości jeden po przemnożeniu będzie nadal miał tę długość. 

## Popularne bramki kwantowe
- Bramka $\text{NOT}$ (Pauli-X)
$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}
$$
- Bramka Pauli-Y
$$
Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}
$$
- Bramka Pauli-Z
$$
Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
$$
- Bramka Hadamarda
$$
H = \frac{1}{\sqrt{2}} \cdot\begin{pmatrix} 1& 1 \\ 1 & -1 \end{pmatrix}
$$