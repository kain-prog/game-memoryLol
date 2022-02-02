const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "img";
const ICON2 = "img";


startGame();


function startGame(){
    // game.createCardsFromPeopples();
    initializeCards(game.createCardsFromPeopples());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card=>{

        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);

    })

}


function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if(face === FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./Assets/images/" + card.icon + ".jpg"
        cardElementFace.appendChild(iconElement);

    }else{
        let iconElement2 = document.createElement('img');
        iconElement2.classList.add(ICON2);
        iconElement2.src = "./Assets/back-card/Kain-banner.PNG"
        cardElementFace.appendChild(iconElement2);
    }
    element.appendChild(cardElementFace);
}




function flipCard() {

    if(game.setCard(this.id)); {

        this.classList.add("flip");
        if(game.secondCard){
            if (game.checkMatch()){
                game.clearCards();
                if (game.checkGameOver()){
                    let gameOverLayer = document.getElementById("game-over");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
            
                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                },1000);
            };
        }
    }
}


function restart (){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("game-over");
    gameOverLayer.style.display = 'none';
}
