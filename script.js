const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('open-envelope');
const cartaContainer = document.getElementById('cartaContainer');
const coracoesContainer = document.getElementById('coracoes-container');
const btnSim = document.getElementById('btn-sim');
const btnClaro = document.getElementById('btn-claro');
const estrelasContainer = document.getElementById('estrelas-container');
const mensagemEnviada = document.getElementById('mensagem-enviada');
const musicaFundo = document.getElementById('musica-fundo');

let geradorCoracoes;
let envelopeAberto = false;

// Gerar estrelas aleatórias no fundo
function gerarEstrelas() {
    const numEstrelas = 100;
    for (let i = 0; i < numEstrelas; i++) {
        const estrela = document.createElement('span');
        estrela.classList.add('estrela');
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.top = `${Math.random() * 100}%`;
        estrela.style.animationDelay = `${Math.random() * 5}s`;
        estrelasContainer.appendChild(estrela);
    }
}

// Chamar a função para gerar as estrelas no carregamento da página
gerarEstrelas();

// Abrir envelope e mostrar carta
openBtn.addEventListener('click', () => {
    if (!envelopeAberto) {
        envelopeAberto = true;
        envelope.classList.add('open');
        openBtn.style.display = 'none';
        musicaFundo.play();

        setTimeout(() => {
            cartaContainer.classList.add('show-carta');
            iniciarGeracaoCoracoes();
        }, 800);
    }
});

// Iniciar a geração contínua de corações
function iniciarGeracaoCoracoes() {
    geradorCoracoes = setInterval(() => {
        gerarCoracaoUnico();
    }, 200);
}

// Criar um único coração
function gerarCoracaoUnico() {
    const coracao = document.createElement('span');
    coracao.classList.add('coracao');
    coracao.innerHTML = '❤️';
    coracao.style.left = `${Math.random() * 100}%`;
    coracoesContainer.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 2000);
}

// Explosão de corações grandes
function explosaoCoracoes(x, y) {
    for (let i = 0; i < 15; i++) {
        const coracao = document.createElement('span');
        coracao.classList.add('coracao-grande');
        coracao.innerHTML = '💖';
        coracao.style.left = `${x}px`;
        coracao.style.top = `${y}px`;
        coracoesContainer.appendChild(coracao);

        const angle = Math.random() * 360;
        const distance = Math.random() * 150 + 50;

        setTimeout(() => {
            coracao.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px) scale(1)`;
            coracao.style.opacity = '0';
        }, 10);

        setTimeout(() => coracao.remove(), 1500);
    }
}

// Função para enviar a carta
function enviarCarta(event) {
    clearInterval(geradorCoracoes);
    cartaContainer.classList.add('carta-enviada');

    const rect = event.target.getBoundingClientRect();
    explosaoCoracoes(rect.left + rect.width / 2, rect.top + rect.height / 2);

    setTimeout(() => {
        cartaContainer.style.display = 'none';
        mensagemEnviada.classList.add('show');
    }, 900);
}

// Eventos dos botões
btnSim.addEventListener('click', enviarCarta);
btnClaro.addEventListener('click', enviarCarta);