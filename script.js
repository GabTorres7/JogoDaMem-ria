const dadosDasCartas = [
    { img: 'zoro.jpg', id: 1 },
    { img: 'law.jpg', id: 2 },
    { img: 'sanji.jpg', id: 3 },
    { img: 'zoro.jpg', id: 1 },
    { img: 'law.jpg', id: 2 },
    { img: 'sanji.jpg', id: 3 },
];

let cartasSelecionadas = [];
let cartasEncontradas = 0;
let tentativas = 0;

const tabuleiroJogo = document.querySelector('.tabuleiroJogo');
const tentativasElemento = document.getElementById('tentativas');
const mensagem = document.getElementById('mensagem');
const botaoReniciar = document.getElementById('botaoReniciar');

// Função para embaralhar as cartas
function embaralharCartas() {
    return dadosDasCartas.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro
function criarTabuleiro() {
    const cartasEmbaralhadas = embaralharCartas();
    tabuleiroJogo.innerHTML = '';

    cartasEmbaralhadas.forEach((carta, index) => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.id = carta.id;
        cartaElemento.dataset.index = index;
        cartaElemento.style.backgroundImage = `url('fundo.jpg')`;
        cartaElemento.addEventListener('click', virarCarta);
        tabuleiroJogo.appendChild(cartaElemento);
    });
}

// Função para virar a carta
function virarCarta(event) {
    const cartaSelecionada = event.target;
    const cartaIndex = cartaSelecionada.dataset.index;
    const cartaId = cartaSelecionada.dataset.id;
    const imagemCarta = dadosDasCartas[cartaIndex].img;

    if (cartasSelecionadas.length < 2 && !cartaSelecionada.classList.contains('flip')) {
        cartaSelecionada.style.backgroundImage = `url(${imagemCarta})`;
        cartaSelecionada.classList.add('flip');
        cartasSelecionadas.push({ elemento: cartaSelecionada, id: cartaId });

        if (cartasSelecionadas.length === 2) {
            verificarPar();
        }
    }
}

// Função para verificar se as cartas formam um par
function verificarPar() {
    const [primeiraCarta, segundaCarta] = cartasSelecionadas;
    
    if (primeiraCarta.id === segundaCarta.id) {
        cartasEncontradas += 2;
        cartasSelecionadas = [];

        if (cartasEncontradas === dadosDasCartas.length) {
            mensagem.textContent = 'Parabéns! Você encontrou todos os pares!';
        }
    } else {
        setTimeout(() => {
            primeiraCarta.elemento.style.backgroundImage = `url('fundo.jpg')`;
            segundaCarta.elemento.style.backgroundImage = `url('fundo.jpg')`;
            primeiraCarta.elemento.classList.remove('flip');
            segundaCarta.elemento.classList.remove('flip');
            cartasSelecionadas = [];
        }, 1000);
    }

    tentativas++;
    tentativasElemento.textContent = tentativas;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    cartasSelecionadas = [];
    cartasEncontradas = 0;
    tentativas = 0;
    tentativasElemento.textContent = tentativas;
    mensagem.textContent = 'Encontre os pares!';
    criarTabuleiro();
}

// Eventos
botaoReniciar.addEventListener('click', reiniciarJogo);

// Inicializar o jogo
criarTabuleiro();
