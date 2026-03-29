
## 🚀 O que cada função faz?

### 1. `inserir(valor)`
Essa função é o "ouvido" dos botões numéricos.
* **Lógica:** Toda vez que você clica em um número ou operador, ele envia esse `valor` para a função.
* **O que acontece:** O código usa o operador `+=` (concatenação) para pegar o que já estava no visor e grudar o novo valor ao lado, sem apagar o anterior.

### 2. `limpar()`
O famoso botão "C" ou "AC".
* **Lógica:** Simplesmente acessa a propriedade `innerHTML` do nosso elemento de tela.
* **O que acontece:** Atribui uma string vazia `""`, o que na prática "reseta" o visor para o usuário.

### 3. `calcular()`
Aqui é onde a "mágica" (perigosa) acontece.
* **Lógica:** Primeiro, ele verifica se existe algum conteúdo no visor (`if`). Se estiver vazio, ele não faz nada para não dar erro.
* **O que acontece:** Usamos a função nativa `eval()`. Ela pega a string de texto (ex: `"2+5*10"`) e a interpreta como uma expressão matemática real, devolvendo o resultado direto no visor.
> **Nota de estudante:** No futuro, vamos aprender que o `eval()` deve ser usado com cuidado por questões de segurança, mas para esse projeto acadêmico, ele resolve o problema com uma linha!

### 4. `apagarUm()´
Lógica: Ela acessa o texto atual do visor e usa o método .substring() para manipular a string.
O que acontece: O código "fatia" o conteúdo, pegando desde o início (índice 0) até a penúltima posição (length - 1). Na prática, ele deleta apenas o último caractere digitado, poupando o usuário de ter que limpar tudo por causa de um erro bobo.

### 5. `trocarSinal()´

A função do botão "+/-" para alternar polaridade.Lógica: Primeiro, ela verifica se há algo no visor.
 Se houver, ela trata o conteúdo como um número para poder realizar uma operação matemática.O que acontece: 
 Multiplica o valor atual (ou o resultado da expressão via eval) por -1.Se o número for positivo, ele vira negativo (ex: 10 vira -10).Se for negativo, ele vira positivo (ex: -5 vira 5).
