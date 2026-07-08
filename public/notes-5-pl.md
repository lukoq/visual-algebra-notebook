# Rozdział piąty
## Podgrupy normalne i grupy symetrii
Podgrupami normalnymi grupy $(G, *)$ nazywamy wszystkie podgrupy $H$ takie, że $aH = Ha$ dla każdego $a∈G$. Czyli to taka grupa, gdzie kolejność działania nie ma znaczenia.  Każda podgrupa grupy abelowej jest normalna. Istnieją też podgrupy normalne w grupach nieabelowych (np. trywialny przypadek – podgrupa złożona z samego elementu neutralnego $e$).

Podgrupa $H$ grupy $S(3)$ (jest to grupa symetrii) złożona z dwóch elementów: elementu neutralnego $e$  = (1, 2, 3) i permutacji $(2,1,3)$, nie jest normalna. 

W grupach symetrii działaniem jest _składanie operacji_ – czyli zamiana miejsc elementów. I tak:
$$
(2,1,3)○(2,1,3) = (1,2,3)
$$
Zamieniłem miejscami element drugi z pierwszym w permutacji $(2,1,3)$ i otrzymałem element neutralny $(1,2,3)$. Wiem dzięki temu, że $\{(1,2,3), (2,1,3)\}$ jest podgrupą grupy $S(3)$ (samowystarczalność zbioru tj. mam element neutralny i każde działanie jest zamknięte w zbiorze). Ale czy jest to podgrupa normalna?
 Dla $a=(1,3,2)$:
 $$
 aH = \{(1,3,2), (3,1,2)\}\\ 
 Ha = \{(1,3,2), (2,3,1)\}\\
 $$
 Zatem $aH ≠ Ha$, czyli podgrupa nie jest normalna. 
 
## Grupa ilorazowa i epimorfizmy

Grupa ilorazowa, to zbiór $(G/H, *)$, gdzie $H$ jest podgrupą normalną grupy $G$.

Funkcja ilorazowa $q:G→G/H$ jest epimorfizmem grup. Epimorfizm nazywamy taki homorfizm (_Rozdział pierwszy_) , gdzie dla każdego $y∈G$ istnieje takie $x∈G$, że $q(x)=y$. Czyli chodzi o _suriekcje_ każdy element z przeciwdziedziny jest „użyty”  będąc wynikiem jakiegoś działania. 

Dla przykładu w programie _mapa homorfizmów_ możemy ustawić $\mathbb{Z}_{6}$ z lewej strony i $\mathbb{Z}_{3}$ z prawej przy współczynniku odwzorowania $k=1$. 
Przechodząc z grupy większej do mniejszej, gdzie $n$ jest wielokrotnością $m$ otrzymamy poprawny epimorfizm. 

Epimorfizm z $\mathbb{Z}_n$ do $\mathbb{Z}_m$ istnieje wtedy i tylko wtedy, gdy liczba $n$ dzieli się bez reszty przez $m$. Współczynnik $k$ musi być wtedy względnie pierwszy z $m$ (czyli $NWD(k, m) = 1$).

Opsiany przykład $q:G→G/H$ nazywamy homomorfizmem kanonicznym. 

## Jądro homomorfizmu

Dla grup $(G,*)$ i $(H, ○)$ z elementami neutralnymi kolejno $e_1$ i $e_2$, zdefiniujmy funkcje  $\delta : G→H$, która niech będzie homorfizmem tych grup. Wtedy zbiór
$$
ker(\delta) = \{a∈G: \delta(a) = e_2\}
$$
nazywa się jądrem homorfizmu. 

Jądro homorfizmu to zbiór takich $a$ z pierwszej grupy które po przejściu dają element neutralny z drugiej grupy. W _mapie homorfizmów_ dla $k=0$ zawsze będziemy mieli homorfizm, a cała grupa startowa $Z_n$ jest wtedy jądrem homorfizmu. 
