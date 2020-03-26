const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false, firstCard, secondCard, lockBoard = false;

function flip() {
    if (lockBoard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    matchForMatch();
}

function matchForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disabledCard() : unFlippedCard();
}
function disabledCard() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    resetBoard();
}
function unFlippedCard() {
    lockBoard = true;
    setTimeout(() => {

        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false;
        resetBoard();
    }, 1000);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null];
}
(function shuffle(){
    cards.forEach(card => {
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flip));