# Rozdział siedemnasty

## Algorytm Deutscha-Jozsy

### Problem
Dla deterministycznej funkcji $f(x) \in \{0, 1\}$, gdzie $x \in \{0, 1\}$ chcemy przewidzieć jej działanie. 
Funkcja taka może być stała lub zrównoważona. **Stała** przyjmuje tą samą wartość niezależnie od wejścia, czyli $f(0)=0$, $f(1)=0$ lub $f(0)=1$, $f(1)=1$.
**Zrównoważona** przyjmuje wartość taką samą jak przy wejściu $f(0)=0$, $f(1)=1$ (funkcja tożsamościowa) lub wartości odwrotne do wejścia czyli $f(0)=1$, $f(1)=0$ (funkcja negacyjna).

Są zatem cztery możliwe funkcje $f(x)$, które możemy zbudować. Problem polega na odgadnięciu z jaką jej wersją mamy akurat do czynienia. 

### Rozwiązanie klasyczne

Dla danej funkcji $f(x)$ których wyników nie znamy, musimy odpytać ją dwa razy, czyli sprawdzic dla każdej możliwości. 
*Np.* jeśli po sprawdzeniu jednej wartości $f(0)=0$ to funkcja nadal może być stała lub zrównoważona. Aby się upewnić musimy sprawdzić ją jeszcze dla wartości $f(1)=?$, jeśli otrzymamy $0$ to funkcja jest stała, jeśli $1$ zrównoważona.

Dla większej ilości bitów na wejściu problem się poszerza. Przyjmując, że dziedziną są ciągi $3$-bitowe to ilość możliwych kombinacji zer i jedynek o długości trzy to $2^3=8$. 

Jeśli funkcja jest zrównoważona to sprawdzamy ją tak długo, aż otrzymamy na wyjściu różne wartości. Mogą wystarczyć wtedy zaledwie dwa zapytania, jeśli po pierwszym otrzymamy $0$ (np. $f(000)=0$), a w drugim $1$ (np. $f(001)=1$). Wiemy, że funkcja jest stała lub zrównoważona, a dwie różne wartości wykluczają jej *stałość*, zatem jest *zrównoważona*. 

W najbardziej pesymistycznym przypadku musimy odpytać funkcje pięć razy. Możemy wyobrazić sobie sytuacje, że po czterech zapytaniach otrzymaliśmy tę samą wartość dla każdego argumentu. Wtedy decydujące będzie piąte zapytanie. Jeśli da tę samą wartość co poprzednie to znaczy, że wszystkie pozostałe argumenty też muszą dawać to samo. Zyskujemy wtedy pewność, że $f(x)$ jest stałe. Jeśli jednak w piątym zapytaniu otrzymamy liczbę przeciwną od reszty, to pozostałe argumenty też zwrócą liczbę przeciwną. Wtedy $f(x)$ jest zrównoważone. 

W najgorszym przypadku dla $n$-bitów na wejściu, musimy odpytac funkcje $2^{n-1}+1$ razy (czyli połowa możliwości plus jeden dla pewności). 

### Rozwiązanie kwantowe

Schemat blokowy na komputerze kwantowym wygląda tak:

```text
|0> ───[ H ]───■───[ H ]─── [ Pomiar ]
               |
|1> ──[ H ]──[U_f]───────── (Brak pomiaru)
```

Jest to tzw. algorytm Deutscha. Na wejściu używamy jednego kubitu $\lvert 0\rangle$ i pomocniczego kubitu $\lvert 1\rangle$. Całość polega na wykonaniu kilku kroków:

1. **Przepuszczenie** obu kubitów $\lvert 0\rangle$ i $\lvert 1\rangle$ przez bramki Hadamarda. Nadajemy im wtedy stany superpozycji $H\lvert 0\rangle = \lvert +\rangle = \frac{\lvert 0\rangle + \lvert 1\rangle}{\sqrt{2}}$ oraz $H\lvert 1\rangle = \lvert -\rangle = \frac{\lvert 0\rangle - \lvert 1\rangle}{\sqrt{2}}$. Charakteryzuje je to, że z takim samym prawdopodobieństwem mogą być teraz $\lvert 0\rangle$ jak i $\lvert 1\rangle$.

   Stan całego układu po tej operacji to:

   $$
   \lvert\psi_1\rangle =
   \lvert+\rangle \otimes \lvert-\rangle =
   \left(\frac{\lvert0\rangle + \lvert1\rangle}{\sqrt{2}}\right)
   \otimes
   \left(\frac{\lvert0\rangle - \lvert1\rangle}{\sqrt{2}}\right)
   $$

2. **Po przejściu** naszych kubitów wejściowych przez bramki Hadamarda stan naszego układu $\lvert xy\rangle$ może być równy $\lvert 00\rangle$, $\lvert 01\rangle$, $\lvert 10\rangle$ lub $\lvert 11\rangle$. Nie wiemy w jakim stanie są nasze kubity. Na każdą z tych opcji jest równo $\frac{1}{4}$ szans.

   Funkcja $f(x)$ łączy się iloczynem tensorowym z ketem $0$ lub $1$, gdzie $x$ też może być zerem bądź jedynką.

   Aplikujemy wyrocznie $U_f$ do całego stanu. Korzystamy z reguły $U_f \lvert x\rangle\lvert y\rangle = \lvert x\rangle\lvert y \oplus f(x)\rangle$ dla każdego z czterech członów:

   $$
   U_f \lvert\psi_{\text{in}}\rangle =
   \frac{1}{2}\Big(
   U_f\lvert0\rangle\lvert0\rangle -
   U_f\lvert0\rangle\lvert1\rangle +
   U_f\lvert1\rangle\lvert0\rangle -
   U_f\lvert1\rangle\lvert1\rangle
   \Big)
   $$

   Dla $x = 0$ (pierwszy kubit to $\lvert 0\rangle$):

   Jeśli $f(0) = 0$:

   $$
   \begin{aligned}
   &\lvert0\rangle \otimes \lvert0 \oplus f(0)\rangle - \lvert0\rangle \otimes \lvert1 \oplus f(0)\rangle \\
   &= \lvert0\rangle \otimes \Big(\lvert0 \oplus f(0)\rangle - \lvert1 \oplus f(0)\rangle\Big) \\
   &= \lvert0\rangle \otimes \Big(\lvert0 \oplus 0\rangle - \lvert1 \oplus 0\rangle\Big) \\
   &= \lvert0\rangle \otimes \Big(\lvert0\rangle - \lvert1\rangle\Big) = \lvert0\rangle \otimes \mathbf{\sqrt{2}\lvert-\rangle}
   \end{aligned}
   $$

   Jeśli $f(0) = 1$:

   $$
   \begin{aligned}
   &\lvert0\rangle \otimes \lvert0 \oplus f(0)\rangle - \lvert0\rangle \otimes \lvert1 \oplus f(0)\rangle \\
   &= \lvert0\rangle \otimes \Big(\lvert0 \oplus f(0)\rangle - \lvert1 \oplus f(0)\rangle\Big) \\
   &= \lvert0\rangle \otimes \Big(\lvert0 \oplus 1\rangle - \lvert1 \oplus 1\rangle\Big) \\
   &= \lvert0\rangle \otimes -\Big(\lvert0\rangle - \lvert1\rangle\Big) = \lvert0\rangle \otimes \mathbf{-\sqrt{2}\lvert-\rangle}
   \end{aligned}
   $$

   Uogólniając nie znając wartości $f(x)$ możemy zapisać, że jeśli $x=0$, to drugim ketem będzie $\mathbf{\sqrt{2}\lvert-\rangle}$ przemnożony przez $(-1)$ albo nie (zależnie od wartości funkcji $f$). Czyli

   $$
   \mathbf{(-1)^{f(0)}\sqrt{2}\,\lvert0\rangle\lvert-\rangle}
   $$

   Dla $x = 1$ (pierwszy kubit to $\lvert 1\rangle$) mamy właściwie tożsamą sytuacje, a końcowym wynikiem będzie:

   $$
   \mathbf{(-1)^{f(1)}\sqrt{2}\,\lvert1\rangle\lvert-\rangle}
   $$

   Otrzymany stan układu po złożeniu wszystkiego w całość to:

   $$
   \lvert\psi_2\rangle = U_f \lvert\psi_{\text{in}}\rangle =
   \frac{1}{2}\cdot\sqrt{2}\cdot\Big(
   (-1)^{f(0)}\lvert0\rangle\lvert-\rangle +
   (-1)^{f(1)}\lvert1\rangle\lvert-\rangle
   \Big)
   $$

   $$
   = \left(\frac{(-1)^{f(0)}\lvert0\rangle + (-1)^{f(1)}\lvert1\rangle}{\sqrt{2}}\right) \otimes \lvert-\rangle
   $$

3. **Mamy więc** dwa przypadki wektora stanu $\lvert\psi_2\rangle$. Dla funkcji stałej $f$ będziemy mieli $f(0)=f(1)$. Czyli znaki przy obu ketach będą takie same.

   $$
   \lvert\psi_2\rangle = \frac{(-1)^{f(0)}\lvert0\rangle + (-1)^{f(1)}\lvert1\rangle}{\sqrt{2}} = \pm \left(\frac{\lvert0\rangle + \lvert1\rangle}{\sqrt{2}}\right) = \pm\lvert+\rangle
   $$

   Dla przypadku gdzie $f(0) \neq f(1)$ otrzymujemy

   $$
   \lvert\psi_2\rangle = \frac{(-1)^{f(0)}\lvert0\rangle + (-1)^{f(1)}\lvert1\rangle}{\sqrt{2}} = \pm \left(\frac{\lvert0\rangle - \lvert1\rangle}{\sqrt{2}}\right) = \pm\lvert-\rangle
   $$

4. **Nasz wektor** żyje w dwóch światach. Po nałożeniu bramki Hadamarda w pierwszym przypadku dla przypadku z plusem otrzymamy:

   $$
   \begin{aligned}
   \lvert\psi_3\rangle &= H\lvert\psi_2\rangle = H\lvert+\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}\frac{1}{\sqrt{2}}\\\frac{1}{\sqrt{2}}\end{pmatrix} \\
   &= \begin{pmatrix}\frac{1}{2}+\frac{1}{2}\\\frac{1}{2}-\frac{1}{2}\end{pmatrix} = \begin{pmatrix}1\\0\end{pmatrix} = \mathbf{\lvert0\rangle}
   \end{aligned}
   $$

   A dla wersji z minusem:

   $$
   \lvert\psi_3\rangle = H(-\lvert+\rangle) = -H\lvert+\rangle = -\begin{pmatrix}1\\0\end{pmatrix} = \mathbf{-\lvert0\rangle}
   $$

   Dla przypadku drugiego, kiedy funkcja jest zrównoważona mamy w wersji z plusem:

   $$
   \begin{aligned}
   \lvert\psi_3\rangle &= H\lvert\psi_2\rangle = H\lvert-\rangle \\
   &= \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}\frac{1}{\sqrt{2}}\\-\frac{1}{\sqrt{2}}\end{pmatrix} \\
   &= \begin{pmatrix}\frac{1}{2}-\frac{1}{2}\\\frac{1}{2}+\frac{1}{2}\end{pmatrix} = \begin{pmatrix}0\\1\end{pmatrix} = \mathbf{\lvert1\rangle}
   \end{aligned}
   $$

   A dla minusa:

   $$
   \lvert\psi_3\rangle = H(-\lvert-\rangle) = -H\lvert-\rangle = -\begin{pmatrix}0\\1\end{pmatrix} = \mathbf{-\lvert1\rangle}
   $$

5. **Pomiar**. Widać zatem, że dla stałej funkcji otrzymamy ket $\mathbf{\pm\lvert0\rangle}$, a dla funkcji zrównoważonej wynikiem będzie zawsze $\mathbf{\pm\lvert1\rangle}$. Dla większej ilości bitów wejściowych dla funkcji stałej dostane ket złożony z samych zer $\mathbf{\pm\lvert000...0\rangle}$. Funkcja zrównoważona przyjmie dowolną inna wartość.