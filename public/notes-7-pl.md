# Rozdział siódmy

## Charakterystyka zero

Charakterystyka zero to rząd jedynki w grupie addytywnej ciała $\mathbb{K}$. Mówimy, że ciało $\mathbb{K}$ posiada charakterystyke zero, gdy $n⋅1≠0$ dla $n∈\mathbb{N}$. 

Dla przypomnienia rząd elementu grupy to ilość kroków jaką należy wykonać danym elementem, aby uzyskać element neutralny. W charakterystyce ciała chodzi nam tylko o jedynkę. Staramy się odpowiedzieć na pytanie ile razy muszę dodać jedynkę samą do siebie, aby otrzymać $0$. Dla charakterystyki zero ten licznik nigdy się nie „przekręci”. 

Załóżmy, że mamy ciało $\mathbb{K}$ o charakterystyce zero i spróbujmy niewiedząc nic więcej coś z tej informacji wywnioskować. 
Skoro mamy charakterystykę zero, to dodając jedynkę samą do siebie w nieskończoność będą nam ciągle powstawały nowe liczby.  
-   $1$    
-   $1 + 1 = 2$    
-   $1 + 1 + 1 = 3$

-   $\dots$

Dzięki temu wiemy, że ciało napewno zawiera zbiór liczb naturalnych  $\mathbb{N}$.
Ale jest to ciało, a ciało musi mieć grupę addytywną, czyli każdy element zawiera swój element przeciwny, który po dodaniu $a+a^{-1}$ (dla $a∈\mathbb{K}$) da element neutralny $e=0$. Stąd mamy zbiór liczb $\{0, -1, -2, -3... \}$. Łącząc to ze sobą wiemy, że nasze ciało $\mathbb{K}$ zawiera napewno zbiór liczb całkowitych $\mathbb{Z}$.
W ciele mamy też grupę multiplikatywną (jest to różnica między ciałem, a pierścieniem, gdzie wystarczy nam półgrupa). W grupie multiplikatywnej potrzebujemy elementów odwrotnych dla każdego $a∈\mathbb{Z}$. Czyli 
-   $2^{-1}=\frac{1}{2}$    
-    $3^{-1}=\frac{1}{3}$    
-    $4^{-1}=\frac{1}{4}$    

-   $\dots$

Skoro nasze ciało zawiera takie ułamki, to zawiera też każdy inny, bo w ciele możemy mnożyć każdy element z każdym nie wychodząc poza daną strukturę. 
Aby otrzymać ułamek $\frac{5}{2}$ wystarczy przemnożyć $\frac{1}{2} * 5$.
Dla $\frac{12631135}{97}$ mamy $\frac{1}{97} * 12631135$. I tak dalej...

Zatem każde ciało o charakterystyce zero zawiera podciało _izomorficzne_ z ciałem $\mathbb{Q}$ (liczb wymiernych). Izomorficzne znaczy, że jajkolwiek skomplikowane będzie moje ciało $\mathbb{K}$ zawsze, gdzieś w jego środku znajduje się pełny zbiór liczb wymiernych. 

Zapisujemy to wzorem:
$$
h\left(\frac{p}{q}\right) = (p \cdot 1) \cdot (q \cdot 1)^{-1}
$$


Wzór pokazuje jak w ciele $\mathbb{K}$ zbudować dowolny ułamek. 

Najpierw dodaj do siebie $p$ jedynek. 
Potem dodaj do siebie $q$ jedynek i znajdź w swoim ciele odwrotność powstałej liczby.
Wtedy przemnóż obie liczby przez siebie i otrzymasz dokładnie pierwiastek $\frac{p}{q}$.

Jest to funkcja homorficzna. 