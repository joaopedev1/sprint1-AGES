const visor = document.getElementById('tela');

function inserir(valor) {
    const texto = visor.innerHTML;
    const ultimo = texto.slice(-1);
    const operadores = ['+', '-', '*', '/', '%', ','];

    // 1. Impede começar com operador ou repetir operadores
    if (operadores.includes(valor) && (texto === "" || operadores.includes(ultimo))) return;

    // 2. Impede duas vírgulas no mesmo número
    if (valor === ',') {
        const partes = texto.split(/[\+\-\*\/%]/);
        if (partes[partes.length - 1].includes(',')) return;
    }
    visor.innerHTML += valor;
}

function limpar() { 
    visor.innerHTML = ""; 
}

function apagarUm() { 
    visor.innerHTML = visor.innerHTML.slice(0, -1); 
}

function trocarSinal() {
    if (visor.innerHTML && visor.innerHTML !== "Erro") {
        try {
            // Calcula o que está na tela primeiro para evitar erro de sintaxe ao inverter
            calcular();
            let v = parseFloat(visor.innerHTML.replace(',', '.'));
            visor.innerHTML = String(v * -1).replace('.', ',');
        } catch { visor.innerHTML = "Erro"; }
    }
}

function calcular() {
    let exp = visor.innerHTML;
    if (!exp) return;

    try {
        // PASSO 1: Troca a vírgula visual pelo ponto matemático
        exp = exp.replace(/,/g, '.');

        // PASSO 2: Trata a Porcentagem ANTES do eval
        if (exp.includes('%')) {
            // Caso A: Soma/Subtração (Ex: 100 + 10% vira 110)
            // A fórmula correta é: n1 + (n1 * n2 / 100)
            exp = exp.replace(/(\d+\.?\d*)([\+\-])(\d+\.?\d*)%/g, "($1$2($1*$3/100))");

            // Caso B: Multiplicação/Divisão (Ex: 100 * 10% vira 10)
            exp = exp.replace(/(\d+\.?\d*)([\*\/])(\d+\.?\d*)%/g, "($1$2($3/100))");

            // Caso C: Porcentagem solta (Ex: 10% vira 0.1)
            exp = exp.replace(/(\d+\.?\d*)%/g, "($1/100)");
        }

        // PASSO 3: O eval agora recebe uma expressão limpa (ex: "100+(100*10/100)")
        let resultado = eval(exp);

        // PASSO 4: Segurança contra divisões por zero
        if (!isFinite(resultado)) throw new Error();

        // PASSO 5: Limpa dízimas e volta para o padrão com vírgula
        resultado = Number(resultado.toFixed(10)); 
        visor.innerHTML = String(resultado).replace('.', ',');

    } catch (e) {
        // Se cair aqui, a string enviada para o eval era inválida
        visor.innerHTML = "Erro";
        setTimeout(() => { if(visor.innerHTML === "Erro") limpar(); }, 1200);
    }
}