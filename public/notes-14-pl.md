# Rozdział czternasty

## Iloczyn skalarny

Warto na początku określić pojęcie iloczynu skalarnego. Iloczyn skalarny to funkcja w przestrzeni liniowej, która bierze dwa wektory i zwraca tylko jedną liczbę (skalar). 

Biorąc wektory $\vec{v} = (v_1, v_2, v_3, ..., v_n), \vec{u} = (u_1, u_2, u_3, ..., u_n)$ otrzymujemy:
$$
\vec{v}\cdot \vec{u}=v_{1}u_{1}+v_{2}u_{2}+v_{3}u_{3}+...+v_{n}u_{n}
$$
lub jeśli znamy kąt $\alpha$ między nimi 
$$
\vec{v}\cdot \vec{u}=|{}\vec{v}|{}\cdot |{}\vec{u}|{}\cdot \cos (\alpha )
$$
Dla przykładu.

Mamy wektory $\vec{v} = (5, 1)$ i $\vec{u}=(2,3)$.
$$
\vec{v}\cdot \vec{u}=5\cdot2+1\cdot3=13
$$
lub jeśli wiemy, że kąt miedzy nimi wynosi $45°$ to
$$
\vec{v}\cdot \vec{u}=\sqrt{5^2+1^2}{}\cdot \sqrt{2^2+3^2}{}\cdot \cos (45°)=\sqrt{26}\cdot\sqrt{13}\cdot\frac{\sqrt{2}}{2}=\frac{\sqrt{676}}{2}=13
$$

W praktyce często iloczyn skalarny dwóch wektorów oznacza się przez symbol $\langle\vec{v}, \vec{u} \rangle$.

## Przestrzeń Hilberta

Przestrzeń Hilberta $\mathcal{H}$ to przestrzeń liniowa, która spełnia dodatkowe trzy warunki:
1. Jest **geometryczna**. Mogę mierzyć kąty między wektorami oraz ich długość.(posiada zdefiniowany iloczyn skalarny). 
2. Jest **zupełna**. Mogę z elementów tego zbioru utworzyć pewien ciąg (ciąg Cauchy'ego), którego granica zawsze będzie zawierała się w tej samej przestrzeni. 
3. Może posiadać nieskończoną liczbę wymiarów. 

Przykładem takiej przestrzeni jest przestrzeń $ℓ_2$. Jest to jedyna przestrzeń z rodziny $\ell_p$, w której norma pochodzi od iloczynu skalarnego. Wektorami są tutaj nieskończone ciągi liczb, np. $(\vec{x}= (x_1, x_2, x_3, \dots))$, których kwadraty tworzą skończoną sumę $(\sum \vert{}x_i\vert{}^2 < \infty)$.

Przykładem odwrotnym jest przestrzeń liniowa $\mathbb{Q}$. Ciąg $x_1=1$, $x_{n+1}=\frac{x_n}{2}+\frac{1}{x_n}$ jest ciągiem Cauchy'ego liczb wymiernych, ale jego granicą jest liczba $\sqrt{2}$. Zbiór $\mathbb{Q}$ nie spełnia przez to warunku zupełności, zatem nie może być przestrzenią Hilberta. 

## Właściwości przestrzeni Hilberta w mechanice kwantowej

Przestrzeń Hilberta $\mathcal{H}$ w mechanice kwantowej to przestrzeń $\mathbb{C}^n$ liczb zespolonych. Użycie na wektorach takiej przestrzeni funkcji iloczynu skalarnego charakteryzuje się następującymi cechami. 

1. Sprzężona symetria: $\langle u, v \rangle = \overline{\langle v, u \rangle}$ (zmiana znaku na przeciwny przy $i$, czyli $\overline{a+bi} = a-bi$)
2. Jest dodatnio określony: Długość każdego wektora jest zawsze liczbą dodatnią (lub zerem). 
3. Liniowość z prawej: Liniowość z prawej oznacza, że jeśli w iloczynie skalarnym chcę wyciągnąć coś z prawej strony (drugiego wektora) to mogę to normalnie zrobić bez przeszkód: $\langle u, \alpha v \rangle = \alpha \langle u, v \rangle$
4. Półliniowość z lewej: Półliniowość z lewej oznacza, że kiedy chcę coś wyciągnąć z lewej strony iloczynu skalarnego (pierwszy wektor) to mogę to zrobić, ale muszę go zamienić na jego sprężenie: $\langle \alpha u, v \rangle = \bar{\alpha} \langle u, v \rangle$
5. Nasza baza jest ortonormalna, czyli wszystkie wektory tworzące bazę przecinają się pod kątem prostym (jeśli dwa wektory $\vec{v}$, $\vec{u}$ przecinają się pod kątem $90°$ to $\langle\vec{v}, \vec{u} \rangle = 0$) oraz każdy wektor bazowy ma długość $1$ ($|\vec{v_n}|=1$)