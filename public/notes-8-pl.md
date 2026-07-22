# Rozdział ósmy
## Szyfrowanie RSA
Szyfrowanie RSA to pierwszy tzw. _przykład z życia_ jaki będę tutaj omawiał. Szyfrowanie RSA to najpopularniejszy algorytm kryptograficzny służący w protokole HTTPS, podpisach cyfrowych czy wysyłaniu maili (S/MIME).

### Generowanie kluczy

Aby zaszyfrować jakąś wiadomość potrzebujemy klucza prywatnego i publicznego.
Posługujemy się przy tym następującym algorytmem:

1. Wybieramy dwie duże liczby pierwsze $p$ i $q$. Najlepiej aby ich zapis bitowy był podobnej długości, ale ich wartości były maksymalnie różne. Warto zauważyć przy tym, że $\mathbb{Z_p}$ i $\mathbb{Z_q}$ są ciałami, ponieważ każdy element posiada element odwrotny względem mnożenia. 
2. Naszym głównym światem stanie się jednak liczba $n = p*q$. Jest to nasz tzw. _moduł_. 
($\mathbb{Z_n}$, ⋅) nie jest już grupą, bo istnieją w niej elementy, które nie posiadają już swojego elementu odwrotnego. Będziemy zatem operować na specjalnej grupie $\mathbb{Z}_n^\times$ z której wyrzucamy zero i wszystkie elementy które dzielą się przez $p$ lub $q$ (bo nie mają odwrotności) i zostawiamy tylko i wyłącznie te liczby, które są względnie pierwsze z modułem $n$ ($NWD(a, n) = 1$).
3. Liczymy $\varphi(n) = (p-1)(q-1)$. $\varphi(n)$ to po prostu rząd grupy $\mathbb{Z}_n^\times$ ($|\mathbb{Z}_n^\times|$), czyli ilość wszystkich elementów w grupie. 
Jest to własność funkcji Eulera z rozdziału czwartego. 
4. Wybieramy liczbę $e$ taką, że $e>1$ $\wedge$ $e <\varphi(n)$. Do tego liczba $e$ musi być względnie pierwsza z $\varphi(n)$. Liczba $e$ będzie służyła jako klucz publiczny naszego szyfru. 
We współczesnej kryptografii prawie zawsze wybiera się konkretną, stałą liczbę $e = 65537$. Jest to tzw. liczba pierwsza Fermata ($e =2^{16} + 1$), a jej zapis binarny to `10000000000000001` co pozwala komputerom szybko ją mnożyć (tylko dwie jedynki, reszta zera).
5. Szukamy elementu neutralnego $d$ do liczby $e$, czyli szukamy takiej liczby $d$, że $e \cdot d \equiv 1 \pmod{\varphi(n)}$. Skoro liczba $e$ jest względnie pierwsza z $\varphi(n)$ to wiemy, że napewno istnieje do niej unikalny, matematyczny bliźniak – element odwrotny $d$, który posłuży do odszyfrowania wiadomości. 

### Szyfrowanie wiadomości
W świecie komputerów wszystko jest liczbą. Nasz wysyłany tekst, wyświetlany kolor, czy odcisk palca na czytniku jest zapisywany jako ciąg zer i jedynek. Można więc to wykorzystać i zaszyfrować zapisaną przez niego informacje.  
Klucz publiczny jest definiowany jako para liczb $(n, e)$, natomiast kluczem prywatnym jest para $(n, d)$. 
Naszą wiadomość musimy podzielić na bloki, których wartość jest mniejsza od $n$. W przeciwnym razie operując na zegarze $\mathbb{Z}_n^\times$ wartość większa od $n$ jest po prostu przez nią dzielona, a przez to jej oryginalna wartość jest na zawsze zatracana. 
1. Szyfrujemy wiadomość za pomocą wzoru $c \equiv m^e \pmod{n}$, gdzie $m$ to pojedyńczy blok naszej wiadomości. 
2. Aby odszyfrować wiadomość używamy wzoru $m \equiv c^d \pmod{n}$. Działa to dlatego bo:
$$
e \cdot d \equiv 1 \pmod{\varphi(n)} \newline
e \cdot d = 1 + k \cdot \varphi(n) \quad (\text{dla pewnego } k)
$$
Czyli majac $c \equiv m^e \pmod{n}$, licząc $m \equiv (m^e)^d \pmod{n}$ mamy:
$$
m \equiv (m^e)^d  = m^{ed}  = m^{1 + k \cdot \varphi(n) \quad} = m^1 \cdot (m^{\varphi(n)})^k 
$$
(pomijąc operacje modulo z $n$)
Wiemy, że podniesienie jakiekolwiek elementu grupy do potęgi równej rzędowi tej grupy da nam zawsze jedynkę. Zatem $m^{\varphi(n)} \equiv 1 \pmod n$. Dalej:
$$
m^1 \cdot (m^{\varphi(n)})^k = m^1 \cdot (1)^k = m
$$
Co jest równe naszej początkowej wiadomości. 

### Przykład

Spróbujmy okiełznać taki szyfr. Wybierzmy sobie dwie liczby pierwsze $p=11$ i $q=13$ i spróbujmy coś nimi zaszyfrować.

Liczymy nasz moduł $n = p*q=11*13=143$ 

Rząd naszej grupy $\mathbb{Z}_{143}^\times$ to $\varphi(143) = (p-1)(q-1)=(11-1)(13-1)=10*12=120$, czyli w naszej grupie jest $120$ elementów.

Nasza grupa $\mathbb{Z}_{143}^\times$ ma tylko liczby względnie pierwsze z $143$. Wiedząc, że 143 = 11*13 można szybko odgadnąć, że grupa nie zawiera liczb podzielnych ani przez $11$, ani przez $13$. Można to zapisać tak $\mathbb{Z}_{143}^\times = \mathbb{Z}_{143} \ /  \ \{11, 13, 22, 26, 33, ... \ 130, 132\}$ 

Wybierzmy $e$, które będzie pierwszą liczbą względnie pierwszą z $\varphi(143)=120$ i większą od $1$ jaką napotkamy:
$$
NWD(2,120) = 2 \newline
NWD(3,120) = 3 \newline
...\newline
NWD(7,120) = 1 \newline
$$
$7$ jest liczbą względnie pierwszą ze 120 (ponadto sama w sobie też jest liczbą pierwszą). Użyjmy jej jako nasza klucza publicznego $e$.

Odwrotnością $e$ w grupie $\mathbb{Z}_{143}^\times$ jest $d$.
$$
e \cdot d \equiv 1 \pmod{\varphi(n)} \newline
e \cdot d + \varphi(n) \cdot k = 1 \newline
7 \cdot d + 120 \cdot k = 1 \newline
$$
Używamy rozszerzonego algorytmu Euklidesa:
$$
120=7⋅17+1 \newline
1=120−7⋅17 \newline
1≡−17⋅7\pmod{120} \newline
$$
Wiedząc, że $-17\pmod{120}≡103$ mamy:
$$
7⋅103≡1
$$
Zatem $d=103$.

Zaszyfrujmy zatem wiadomość "HI". W systemie binarnym ASCI jest to `01001000 01001001`. Liczby $01001000$ i $01001001$ to $72$ i $73$ w systemie dziesiętnym, zatem będziemy mieli dwie paczki $m$ z dwoma literami. 
$$
m_1 = 72,  \ m_2 = 73 \newline
c_1 = m_1^e \pmod{143} = 72^7 \pmod{143} = 19\newline
c_2 = m_2^e \pmod{143} = 73^7 \pmod{143} = 83 \newline
$$
Wysyłamy teraz naszą wiadomość do Boba, który posiada klucz prywatny $d=103$ i $n=143$. Ze wzoru $m \equiv c^d \pmod{n}$ liczy:
$$
c_1^d \pmod{n} = 19^{103} \pmod{143} = 72\newline 
c_2^d \pmod{n} = 83^{103} \pmod{143} = 73
$$
Co daję mu liczby $72$ i $73$ a po konwersji na ASCII otrzymuje napis "HI".

Komputery, aby nie mnożyć tych ogromnych liczb $m^e \pmod{n}$ oraz $c^d \pmod{n}$ korzysta z _mnożenia modularnego na bieżąco_ i _szybkiego potęgowania_ (Algorytm `Square-and-Multiply`).

