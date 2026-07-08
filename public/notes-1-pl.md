# Rozdział pierwszy

  ## Struktury algebraiczne

Dany zbiór z określonym na nim działaniem tworzy strukturę algebraiczną.
$$
(S, *)
$$
Jest to zbiór $S$ z działaniem $* : S × S → S$, czyli każdemu $x,y ∈ S$, przyporządkowuje element zbioru $S$. Można zapisać to równanie jako $x * y$, lub też jak każdą inną funkcję $*(x, y)$. 

Struktura algebraiczna posiada też swój element neutralny taki, że:
$$
x * e = e * x = x
$$
Dla przykładu strukturą algebraiczną jest zbiór liczb całkowitych z dodawaniem, czyli ($\mathbb{Z}$, +), którego elementem neutralnym jest 0, oraz zbiór liczb całkowitych z mnożeniem ($\mathbb{Z}$, ·), którego elementem neutralnym jest 1.

Istnieją także struktury algebraiczne na zbiorach skończonych. 
$$
\mathbb{Z}_n = \{0, 1, 2... n-1\}
$$
Są to zbiory reszt z dzielenia modulo przez $n$. Dla zbioru $(\mathbb{Z}_n, ⊕)$ i $x,y ∈ \mathbb{Z}_n$, mamy:
$$
x⊕y = z
$$
gdzie $z$ jest resztą z dzielenia $x+y$ przez $n$.

Ciekawym przykładem takiej struktury jest zegar. Kiedy pytamy jaka będzie godzina za ileś godzin, wykonujemy dodawanie i dzielimy wynik przez modulo 12. W ten sposób dodając 5 godzin do godziny 11:00, mamy godzinę 4:00 po południu. 

## Półgrupa
Półgrupa to taka struktura algebraiczna $(S, *)$, która spełnia warunek łączności dla każdego $x,y,z ∈ S$. Znaczy to tyle co:
$$
x*(y*z)=(x*y)*z
$$
Mając trzy sznurki różnego koloru, nie ma znaczenia, które dwa sznurki zwiążemy jako pierwsze — po związaniu wszystkich trzech otrzymamy ten sam sznurek.

## Grupa

Grupa $(S, *)$ to półgrupa, gdzie każdy element jest odwracalny. Czyli dla każdego elementu $x$ należącego do $S$, mamy taki  $x'∈S$,  że:
$$
x*x' = x'*x = e
$$
Gdy dla dowolnych $x,y ∈ S$ prawdziwa jest równość
$$
x*y=y*x
$$
to grupa jest przemienna (także nazywana abelową). 

Można to porównać do sytuacji z wrzucaniem monet do skarbonki. Czy wrzucisz najpierw 2 zł, a potem 5 zł, lub odwrotnie – w środku masz ciągle tyle samo. (Zegar też jest abelowy: $3 + 11 = 11 + 3$).

Przykładem działania nieabelowego jest zakładanie skarpet i butów. Kolejność tutaj zmienia wszystko. Efekt będzie zgoła inny w zależności od tego czy najpierw założymy skarpety, a potem buty czy odwrotnie najpierw buty, a potem skarpety. 

## Kongruencja

Jeśli  $m ∈ \mathbb{N}$, to mówimy, że liczby całkowite $a, b ∈ \mathbb{Z}$ przystają do siebie modulo $m$. 
$$
a \equiv b \ (mod \ m)
$$
Kongruencja pozwala powiedzieć: „Dzisiaj jest poniedziałek (1), za 7 dni też poniedziałek (8), za 14 dni też (15)”. Liczby 1, 8, 15 w świecie dni tygodnia to dokładnie to samo.

## Homomorfizymy
Dla struktur algebraicznych $(S_1, •)$ z elementem neutralnym $e_1$ oraz $(S_2, *)$ z elementem neutralnym $e_2$, funkcja $h : S_1 → S_2$, jest homomorfizmem, jeśli 
$$
h(e_1) = e_2\\
h(a • b)= h(a) * h(b)
$$
dla dowolnych $a, b∈S_1$.

Na przykład mając słowo „KOT” i „PIES”. W świecie polskim działanie to "dodaj spójnik I" $\rightarrow$ „KOT I PIES”. Tłumaczysz wynik na angielski $\rightarrow$ "CAT AND DOG". 

$$
a = KOT\\
b = PIES\\
a • b = KOT \ I \ PIES\\
h(a • b) = CAT \ AND \ DOG
$$

A teraz druga droga: najpierw tłumaczysz słowa: „CAT”, „DOG”. Łączysz je angielskim działaniem: "CAT AND DOG". Wyniki są identyczne. Tłumaczenie zachowało strukturę relacji między słowami.

$$
h(a) = CAT\\
h(b) = DOG\\
h(a) * h(b) = CAT \ AND \ DOG
$$

Dla funkcji mapującej $h(x) = k · x \ (mod \ m)$ przechodzącej z grupy $\mathbb{Z_n}$ do $\mathbb{Z_m}$ mus być spełniony warunek:

$$
n·k \equiv 0 \ (mod \ m)
$$