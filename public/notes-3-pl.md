# Rozdział trzeci
 ## Warstwy
 Jeśli $H$ jest podgrupą grupy $(G, ∗)$, to zbiór:
 $$
 aH = \{a ∗ H: h∈H\}
 $$
 nazywany jest warstwą lewostronną względem podgrupy $H$ wyznaczoną przez element $a∈G$. To samo robimy z warstwą prawostronną:
$$
 Ha = \{H∗ a: h∈H\}
 $$
Podgrupa $H$ jest wzorcem. Bierzesz element $a$ i tworzysz z nich nową warstwę, układając ją dokładnie w taki sam sposób, w jaki poukładane są elementy w podgrupie $H$.

Warstwy to po prostu kopie podgrupy $H$, ale przesunięte w inne miejsce grupy za pomocą jakiegoś elementu $a$.

Stwórzmy warstwy dla $\mathbb{Z}_{12}$ i podgrupy $H = \{12, 4, 8\}$

-   Przesunięcię o jedną godzinę. Bierzemy każdy element z $H$ i dodajemy 1.
    $12+1=\mathbf{1}$, $4+1=\mathbf{5}$, $8+1=\mathbf{9}$. Dostajemy warstwę: {1, 5, 9}.
    
-   O 2 godziny: 
     Dostajemy warstwę: {2, 6, 10}.
    
-   Przesuwamy o 3 godziny: Dodajemy 3 do elementów $H$.
    Dostajemy warstwę: {3, 7, 11}.
    
-   Przesuwamy o 4 godziny: Dodajemy 4 do elementów $H$
     Dostajemy {12, 4, 8} (czyli naszą wyjściową podgrupę $H$). Dalej nasze warstwy będą się zapętlać. 

## Ilość warstw w grupie

Jeśli weźmiemy wszystkie warstwy razem, to pokryją one całą grupę.

Zegar ma 12 elementów. Nasza podgrupa $H$ ma 3 elementy. Skoro każda warstwa ma tyle samo elementów (3) i idealnie dzielą one grupę, to ile musi być $12 : 3 = 4$ warstwy.

Twierdzenie Lagrange’a mówi, że rząd każdej skończonej podgrupy $H$ grupy $G$ jest dzielnikiem rzędu całej grupy $G$, a wynik tego dzielenia to ilość możliwych do zbudowania warstw. 
$$
Liczba \ warswt = \frac{|G|}{|H|}
$$