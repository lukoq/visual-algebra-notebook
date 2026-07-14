# Rozdział szósty

## Pierścienie
Pierścień to struktura algebraiczna która ma w sobie dwie grupy. Dzielimy go na grupę addytywna, której działaniem wewnątrz jest dodawanie i grupę multiplikatywna, której działaniem jest mnożenie. Formalnie pierścień musi spełniać trzy warunki:

- $(\mathbb{P}, +)$ z elementem 0 jest grupą abelową (czyli dodawanie jest przemienne)
- $(\mathbb{P}, \cdot)$ z elementem 1 jest półgrupą abelową (czyli przy mnożeniu nie potrzebne nam są elementy odwrotne)
- dla dowolnych $x,y,z∈\mathbb{P}$ prawdziwa jest równość $(x+y)*z=x*z+y*z$ (czyli istnieje rozdzielność mnożenia względem dodawania) 

Przykładem pierścienia są liczby całkowite $\mathbb{Z}$. Można je dodawać, mam $0$ jako element neutralny i mogę je sobie mnożyć. Ale przy mnożeniu nie mam elementów odwrotnych (dla $2$ elementem odwrotnym jest pierwiastek $\frac{1}{2}$, dla $3$ to $\frac{1}{3}$ itd.). W strukturze $(\mathbb{Z}, \cdot)$ nie mogę dzielić, więc jest to półgrupa abelowa. 

Ciekawym przykładem pierścieni są macierze $n\times n$. Można je dodawać, mnożyć ale nie są przemienne (abelowe), bo w świecie macierzy$A \cdot B \neq B \cdot A$. Takie coś formalnie kłóci się z definicją pierścieni, ale nazywamy je specjalnie pierścieniami nieprzemiennymi, gdzie półgrupa $(\mathbb{P}, \cdot)$ nie jest abelowa. 

Jeśli $(\mathbb{P}, +, \cdot)$ jest dowolnym pierścieniem, to dla zmiennej $x$ wszystkie wyrażenia postaci (zbiór wszystkich możliwości),
$$
w(x)=a_0+a_1x+a_2x^2+...+a_nx^n
$$
gdzie $n∈\mathbb{N}$, $a_i∈\mathbb{P}$
nazywamy pierścieniem wielomianów. Pojedyńcze elementy tego pierścienia to po prostu wielomiany. 

## Ciało 

Pierścienie w których w półgrupie $(\mathbb{P}, \cdot)$, mogę dzielić tzn. jest ona grupą abelową, bo mam element odwrotny dla każdego elementu (oprócz zera), nazywa się ciałem. 

Przykładem ciała są liczby wymierne $\mathbb{Q}$ lub liczby rzeczywiste $\mathbb{R}$. 

Komputery z reguły działają na ciałach właśnie. Jeśli operowałbym na liczbach nieskończonych błędy zaokrągleń pojawiałyby się błędy zaokrągleń. W ciałach dzielenie jest idealne i pozbawione reszty. Korzystają z tego protokoły szyfrowania, HTTPS, blockchain lub kody QR. 

## Podciała, podpierścienie, rozszerzenia...

Najprościej mówiąc, jeśli jakieś ciało $\mathbb{K}$ zawiera się w innym ciele, bądź pierścień w innym pierścieniu $\mathbb{P}$ to nazywamy je podciałem ciała $\mathbb{K}$ i podpierścieniem pierścienia $\mathbb{P}$. Czyli ich grupy i półgrupy z których są stworzone są podgrupami innych większych grup należących do jednej struktury. 

W drugą stronę, jeśli $\mathbb{M}$ jest podciałem ciała $\mathbb{K}$, to $\mathbb{K}$ jest rozszerzeniem ciała $\mathbb{M}$. 