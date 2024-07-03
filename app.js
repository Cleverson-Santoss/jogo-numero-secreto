// Lista que armazena os números sorteados para evitar repetições
let listaDeNumerosSorteados = [];
// Limite superior para o número aleatório
let numeroLimite = 10;
// Gera o número secreto aleatório
let numeroSecreto = gerarNumeroAleatorio();
// Contador de tentativas
let tentativas = 1;

// Função para exibir texto na tela e usar o responsiveVoice para falar o texto
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Exibe a mensagem inicial ao carregar a página
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        // Jogador acertou o número secreto
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilita o botão de reiniciar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Jogador errou o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

// Função para gerar um número aleatório entre 1 e o limite definido
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Reinicia a lista de números sorteados se já tiver todos os números possíveis
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Garante que o número escolhido não foi sorteado anteriormente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
