const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restart');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

// Cartas com pares (8 símbolos duplicados = 16 cartas)
const symbols = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐸', '🦋', '🐠'];
let cardArray = [];

// Função para criar o array embaralhado
function generateCards() {
    cardArray = [...symbols, ...symbols].map(symbol => ({ name: symbol }));
    cardArray.sort(() => 0.5 - Math.random());
}

// Cria o tabuleiro
function createBoard() {
    grid.innerHTML = '';
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = card.name;

        cardElement.append(front, back);
        cardElement.addEventListener('click', flipCard);

        grid.appendChild(cardElement);
    });
}

// Vira carta
function flipCard() {
    const id = this.getAttribute('data-id');

    // Evita clicar duas vezes na mesma carta ou já encontrada
    if (cardsChosenId.includes(id) || this.classList.contains('matched')) return;

    this.classList.add('flip');
    cardsChosen.push(cardArray[id].name);
    cardsChosenId.push(id);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 600);
    }
}

// Verifica se formou par
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[firstId].classList.add('matched');
        cards[secondId].classList.add('matched');
        cardsWon.push(cardsChosen);
    } else {
        cards[firstId].classList.remove('flip');
        cards[secondId].classList.remove('flip');
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === symbols.length) {
        setTimeout(() => alert('🎉 Parabéns! Você encontrou todos os pares!'), 300);
    }
}

// Reinicia o jogo
function restartGame() {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    generateCards();
    createBoard();
}

// Inicia
restartBtn.addEventListener('click', restartGame);
restartGame();
