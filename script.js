
const jogoMemoria = document.querySelector('.jogo-memoria'); 
const elementoCronometro = document.getElementById('tempo'); 
let cartaVirada = false;
let primeiraCarta, segundaCarta;
let paresEncontrados = 0;
let cronometroIniciado = false;
let tempoInicio, intervaloCronometro;


const imagens = [
    'astralis.png', 'brazilian_effect.png', 'fnatic.png', 'furia.png',
    'g2.png', 'liquid.png', 'skgaming.png', 'virtuspro.png'
];


let cartas = imagens.concat(imagens);
cartas.sort(() => Math.random() - 0.5);


function criarCartas() {
    cartas.forEach(imagem => {
        const carta = document.createElement('div');
        carta.classList.add('carta'); 
        carta.dataset.imagem = imagem;

        const faceFrente = document.createElement('img');
        faceFrente.classList.add('frente');
        faceFrente.src = './assets/' + imagem; 

        const faceVerso = document.createElement('div');
        faceVerso.classList.add('verso');
     

        carta.appendChild(faceFrente);
        carta.appendChild(faceVerso);
        jogoMemoria.appendChild(carta);

        carta.addEventListener('click', virarCarta);
    });
}


function iniciarCronometro() {
    tempoInicio = new Date();
    intervaloCronometro = setInterval(() => {
        const tempoDecorrido = new Date() - tempoInicio;
        const minutos = String(Math.floor(tempoDecorrido / 60000)).padStart(2, '0');
        const segundos = String(Math.floor((tempoDecorrido % 60000) / 1000)).padStart(2, '0');
        elementoCronometro.textContent = `Cronômetro: ${minutos}:${segundos}`;
    }, 1000);
}


function virarCarta() {
    if (!cronometroIniciado) {
        iniciarCronometro();
        cronometroIniciado = true;
    }

    if (!cartaVirada) {
        this.classList.add('flip');
        cartaVirada = true;
        primeiraCarta = this;
    } else {
        this.classList.add('flip');
        segundaCarta = this;
        verificarPar();
    }
}

function verificarPar() {
    const ehPar = primeiraCarta.dataset.imagem === segundaCarta.dataset.imagem;
    ehPar ? desativarCartas() : reverterCartas();
}


function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    paresEncontrados++;
    if (paresEncontrados === imagens.length) {
        clearInterval(intervaloCronometro);
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 500);
    }
    resetarSelecao();
}

function reverterCartas() {
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        resetarSelecao();
    }, 1000);
}

function resetarSelecao() {
    cartaVirada = false;
    primeiraCarta = null;
    segundaCarta = null;
}

criarCartas();
