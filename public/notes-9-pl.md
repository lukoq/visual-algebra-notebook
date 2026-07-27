# Rozdział 9

## Tożsamość Bézouta

Twierdzenie to mówi, że największy wspólny dzielnik dwóch liczb $a$ i $b$ można przedstawić za pomocą ich liniowej kombinacji. Zapis twierdzenia wygląda tak:
$$
ax + by = NWD(a,b)
$$
$a, b ⩾ NWD(a,b) ⩾ 1$ zatem  jedna z liczb $x, y$ musi być ujemna. 

W szczególności tożsamość ta mówi, że jeżeli $NWD(a,b) = 1$ to istnieje takie $x, y$, że 
$$
ax+by=1
$$
Przekładając to na pojęcia z algorytmu RSA dla pary liczb $(e, \varphi(n))$, gdzie $e$ to klucz publiczny, a $\varphi(n)$ rząd naszej grupy $\mathbb{Z}_{\varphi(n)}$:
$$
e \cdot x+\varphi(n) \cdot y = 1
$$
$\varphi(n) \cdot y \pmod{\varphi(n)} \equiv 0$ bo to kolejne wielokrotności rozmiaru grupy. Daje nam to charakterystyczne równanie. 
$$
e \cdot x \equiv 1
$$
Dowodzi nam to, że jeżeli $NWD(e,\varphi(n)) = 1$ to w grupie $\mathbb{Z}_{\varphi(n)}$ znajduje się element odwrotny do $e$, co daje nam pewność znalezienia klucza prywatnego w algorytmie RSA. 

## Łamanie RSA

### Atak przez faktoryzacje klucza

Załóżmy, że ustaliliśmy szyfr z parametrami 

- $p=3$, $q=5$, 
- $n=3*5=15$, 
- $\varphi(15)=(3-1)(5-1)=8$, 
- $e=3$, $d=e^{-1} \equiv 3$

Chcemy zaszyfrować cyfrę $7$:
- $m \equiv 7^{3} \pmod{15} \equiv 13$

Haker przechwytuję naszą zaszyfrowaną wartość $13$. Posiada też klucz publiczny $(3, 15)$. Wie zatem, że:
$$
m^3 \pmod{15} \equiv 13
$$
Odwrócenie tego działania na dużych liczbach jest w zasadzie niemożliwe. Jedyną możliwością jest faktoryzacja $n$.
Gdyby znał nasze $p$ i $q$ mógłby z łatwością odczytać hasło, ponieważ wiedziałby, że:
$$
\varphi(15)=(p-1)(q-1)=(3-1)(5-1)=2\cdot4=8 \newline
$$
Czyli
$$
e \cdot d \equiv 1 \pmod {\varphi(15)} = 3 \cdot d \equiv 1 \pmod {8} \newline
$$
Za pomocą algorytmu Euklidesa liczy:
$$
3 \cdot d \equiv 1 \pmod 8 \implies \mathbf{d = 3}
$$
Odszyfruje wiadomość za pomocą klucza prywatnego $d$, wiedząc, że $c=13$:
$$
13^3=2197 \newline
2197 = 146 \cdot 15+7 \newline
m=2197 \pmod{15} \newline
m\equiv7 \pmod{15}
$$

### Podatność na iloczyn

Używając dwóch zaszyfrowanych wiadomości $c_1$, $c_2$ można zmienić ich sens. Dzieje się tak ponieważ:
$$
c_1 =  (m_1^e) \pmod{n} \newline
c_2 =  (m_2^e) \pmod{n}
$$
Czyli
$$
c_1 \cdot c_2 = (m_1^e) \cdot (m_2^e) \pmod{n} = (m_1 \cdot m_2)^e \pmod{n}
$$
Zatem pomnożenie dwóch szyfrogramów daje nam poprawny zapis iloczynu dwóch wiadomości. Można w ten sposób np. zmienić kwotę przelewu mnożąc ją po prostu przez jakąś liczbę. W ten sposób haker, nawet nie znając kwoty przelewu może ją precyzyjnie powiększyć. 
***
Jest to prosty sposób wykorzystania homomorfizmu funkcji szyfrującej. 
$$
E(m_1 \cdot m_2) = (m_1 \cdot m_2)^e \pmod n 
 = m_1^e \cdot m_2^e \pmod n 
$$
Zatem
$$
E(m_1 \cdot m_2)= E(m_1) \cdot E(m_2)
$$
Funkcja szyfrująca RSA jest homomorfizmem grupy wiadomości w grupę szyfrogramów.