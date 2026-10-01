# Rozdział osiemnasty

## Algorytm Simona

### Problem

Dana jest funkcja $f: \{0, 1\}^n \to \{0, 1\}^n$, przyjmująca pewien ciąg bitów i zwracająca pewny ciąg bitów tej samej długości. Wiemy, że istnieje pewien specjalny ciąg bitów $s \in \{0, 1\}^n$, gdzie
$$f(x) = f(x') \iff (x = x' \quad \lor \quad x \oplus x' = s)$$
Rozwiązanie $x = x'$ jest oczywiście trywialne. Druga możliwość $x \oplus x' = s$ jest znacznie ciekawsza. Z własności algebraicznych operacji XOR wiemy, że: 
$$
x \oplus x' = s \implies x \oplus s = x' 
$$
Zatem możemy zapisać, że
$$
f(x \oplus s)=f(x)
$$
Naszym problemem jest **znalezienie ciągu $s$ w takiej funkcji.** Przy czym jeśli taki ciąg jest równy elementowi neutralnemu $e=000...0$ to znaczy, że funkcja $f$ dla każdego wejścia da różną wartość, czyli jest *różnowartościowa*. Jeśli jednak ciąg $s$ jest różny od $e$ to nasza funkcja $f$ przyjmuje tą samą wartość dla dwóch różnych argumentów. 

### Rozwiązanie klasyczne

Komputer klasyczny szuka tzw. kolizji, czyli dwóch różnych argumentów $k_i$, $k_j$ dla których wartość funkcji $f$ jest taka sama $f(k_i)=f(k_j)$. Musi odpytywać funkcję $f$ dla każdego argumentu pokolei i zapamiętywać otrzymany wynik. Kiedy trafi na dwie takie same wartości obliczy $s$.
$$
x, x' = k_i, k_j \newline
x \oplus x'=s
$$
Nie istnieje rozwiązanie tego zagadnienia o złożoności obliczeniowej mniejszej od wykładniczej $\mathcal{O}(2^{\frac{n}{2}})$. Liczba wszystkich możliwych zapytań (liczba argumnetów funkcji $f$) to $2^n$. Zgodnie z paradoksem dni urodzin musimy wykonać troche więcej niż $2^{\frac{n}{2}}$ zapytań, aby uzyskać prawdopobieństwo spotkania kolizji większe od $50\%$. Dla przykładu dla ciągów od długości $64$ bity musimy wykonać $2^\frac{64}{2}=2^{32}=4294967296$ zapytań.

Komputer kwantowy jest w stanie znaleźć rozwiązanie znacznie szybciej z prędkością rzędu $\mathcal{O}(n)$.

### Rozwiązanie kwantowe

Obwód dla jednego kubita. 

    |0⟩ ────[ H ]───■──────[ H ]──── [ Pomiar ]
                    │
    |0⟩ ──────────[U_f]──[ Pomiar ]

Dla większej ilości kubitów mamy ten sam schemat o wielkości $2n$, gdzie każdy kubit pomiarowy ma swój odpowiedni kubit pomocniczy. 

**Krok 1.** 

Najpierw nakładamy bramkę Hadamarda na pierwsze kubity pomiarowe. Dla $n$-kubitów możemy to zapisać wzorem:
$$
\vert{}\psi_1\rangle = H^{\otimes n}\vert{}0^{(n)}\rangle \vert{}0^{(n)}\rangle = \left( \frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} \vert{}x\rangle \right) \otimes \vert{}0^{(n)}\rangle
$$

- $\{0, 1\}^n$ to zbiór wszystkich możliwych kombinacji ciągów binarnych o długości $n$.
- $\sum_{x \in \{0,1\}^n}$ to suma po tym zbiorze, gdzie każdą liczbę mnożymy przez $\frac{1}{\sqrt{2^n}}$

**Krok 2.**

Używamy wyroczni $U_f$ ($U_f \vert{}x\rangle \vert{}y\rangle = \vert{}x\rangle \vert{}y \oplus f(x)\rangle$).
$$
\vert{}\psi_2\rangle = U_f \vert{}\psi_1\rangle = \frac{1}{\sqrt{2^n}} \sum_{x \in \{0,1\}^n} \vert{}x\rangle \vert{}f(x)\rangle
$$
- W naszym przypadku mamy $\vert{}0^{(n)} \oplus f(x)\rangle=\vert{}f(x)\rangle$
- Splątujemy kubity pomiarowe z wartościami w drugim pomocniczym rejestrze. 

**Krok 3.**

Mamy wszystkie kombinacje zer i jedynek o długości $n$ w pierwszym rejestrze. Są one splątane ze swoimi wynikami funkcji $f$. W kroku trzecim przykładamy urządzenie pomiarowe do drugiego rejestru (pomocniczego) i mierzymy otrzymaną wartość funkcji. Pomiar niszczy stan kwantowy. Otrzymujemy tylko jeden losowy wynik $\vert{}f(x)\rangle$. Reszta wartości bezpowrotnie znika (załamanie funkcji falowej).

Nasza otrzymana wartość $\vert{}f(x)\rangle$ jest splątana z dwoma wartościami $\vert{}x_i\rangle$ i $\vert{}x_j\rangle$ (ponieważ wiemy, że nasza funkcja z definicji jest funkcją 2-do-1, czyli przyjmuje ta samą wartość dla dwóch różnych argumentów) z pierwszego rejestru. Końcowo otrzymujemy zatem coś takiego:
$$
\vert{}\psi_{\text{po pomiarze}}\rangle = \frac{1}{2}\Big( \vert{}x_i\rangle \vert{}f(x_i)\rangle + \vert{}x_j \rangle \vert{} f(x_j)\rangle \Big)  = \frac{1}{\sqrt{2}} \Big( \vert{}x_i\rangle + \vert{}x_j \rangle  \Big) \otimes \vert{}f(x_i)\rangle
$$
Zostaje nam więc tylko pierwszy rejestr, który możemy zapisać tak:
$$\vert{}\psi_3\rangle = \frac{1}{\sqrt{2}} \Big( \vert{}x_i\rangle + \vert{}x_j \rangle  \Big)=\frac{1}{\sqrt{2}} \Big( \vert{}x_i\rangle + \vert{}x_i \oplus s\rangle \Big)$$

- Wiemy, że $x_j$ to $x_i$ powiększone o nasz szukany sekret $s$. Można to zapisać $x_j = x_i \oplus s$.

**Krok 4.**

Nakładamy ponownie bramki Hadamarda $H^{\otimes n}$ na każdy kubit. Dla $n$ kubitów działanie $H^{\otimes n}$ na dowolny stan bazowy $\vert{}a\rangle$ wyraża się ogólnym wzorem:

$$
H^{\otimes n} \vert{}a\rangle = \frac{1}{\sqrt{2^n}} \sum_{z \in \{0,1\}^n} (-1)^{a \cdot z} \vert{}z\rangle
$$

Z dwóch stanów $\vert{}x_i\rangle + \vert{}x_i \oplus s\rangle$ robi nam się ponownie wiele możliwości.

$$
\vert{}\psi_4\rangle = H^{\otimes n} \vert{}\psi_3\rangle = \frac{1}{\sqrt{2^{n+1}}} \sum_{z \in \{0,1\}^n} \Big( (-1)^{x_i \cdot z} + (-1)^{(x_i \oplus s) \cdot z} \Big) \vert{}z\rangle=\frac{1}{\sqrt{2^{n+1}}} \sum_{z \in \{0,1\}^n} \Big( (-1)^{x_i \cdot z} + (-1)^{(x_i \cdot z) \oplus (s \cdot z)} \Big) \vert{}z\rangle=\frac{1}{\sqrt{2^{n+1}}} \sum_{z \in \{0,1\}^n} \Big( (-1)^{x_i \cdot z}(1+(-1)^{s \cdot z})\Big) \vert{}z\rangle
$$

- Działanie iloczynu skalarnego modulo $2$ zapisujemy tak: $s \cdot z = (s_1 \cdot z_1) \oplus (s_2 \cdot z_2) \oplus \dots \oplus (s_n \cdot z_n) \pmod 2$. Możemy otrzymać z niego zatem tylko dwie wartości: $0$ lub $1$.
- Jeśli $s \cdot z = 1$ (połowa przypadków) to człon $1+(-1)^{s \cdot z}$ staje się zerem. Czyli wszystkie te przypadki $\vert{}z\rangle$ się zredukują. 

Dla $s \cdot z = 0$ otrzymujemy $1+(-1)^{0}=2$. Nasz wzór będzie wyglądał w ten sposób: 
$$\vert{}\psi_4\rangle = \frac{1}{\sqrt{2^{n+1}}} \sum_{z: \, s \cdot z = 0} (-1)^{x_i \cdot z} \cdot 2 \cdot \vert{}z\rangle= \frac{1}{\sqrt{2^{n-1}}} \sum_{z: \, s \cdot z = 0} (-1)^{x_i \cdot z} \vert{}z\rangle$$

**Krok 5.**

Wykonujemy pomiar stanu $\vert{}\psi_4\rangle$. Znowu dostajemy z tego tylko jeden rejestr $\vert{}z\rangle$. Oczywiście wiemy, że $z$ jest ciągiem binarnym o długości $n$.

Wiemy też, że przetrwały tylko takie ciągi binarne $z$, które wcześniej spełniły warunek $s \cdot z = 0$.  Czyli, mamy relacje naszego $z$ ze szukanym $s$. Można to zapisać tak (dla kolejnych bitów $s$ i $z$):

$$
s_1 z_1 \oplus s_2 z_2 \dots \oplus s_n z_n = 0
$$

Jest to równanie z $n$ niewiadomymi (znamy kolejne $z_1, z_2... z_n$, ale nie znamy $s$). Aby rozwiązać takie równanie potrzebujemy $n - 1$ liniowo niezależnych wektorów $z$.

**Krok 6.**

Zapętlamy algorytm dopóki nie otrzymamy $n - 1$ wektorów $z$. Muszą być one od siebie liniow niezależne (co nie znaczy różne!), więc liczba zapętleń nie jest stała. W praktyce wystarcza około $n$-razy. Trafienie dwóch takich samych wektorów ma małe prawdopodbieństwo.

- Ilość różnych wektorów $\vert{}z\rangle$ które możemy zmierzyć to połowa wszystkich możliwych kombinacji czyli $2^{n-1}$.
- Wraz ze wzrostem $n$ przestrzeń stanów do wylosowania $2^{n-1}$ rośnie wykładniczo, podczas gdy my potrzebujemy zaledwie liniowej liczby wektorów $n-1$. Tym większa ilość stanów, tym większa szansa, że trafimy od razu wszystskie wektory bez powtórzeń. 

Po otrzymaniu $n-1$ różnych binarnych ciągów $z$ rozwiązujemy układ równań i obliczamy nasze $s$. Zatem tak jak wspomniałem na wstępie prędkośc takiego rozwiazania to $\mathcal{O}(n)$. 