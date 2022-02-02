let game ={

    lockMode: false,
    firstCard: null,
    secondCard: null,

    peopples : ['ezreal',
    'jayce',
    'leblanc',
    'orianna',
    'qiyana',
    'syndra',
    'talon',
    'vex',
    'viktor',
    'yasuo'],

    cards: null,

    setCard:function(id) {

       let card = this.cards.filter(card=>card.id===id)[0];

       if(card.flipped || this.lockMode){
           return false;
       }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function(){
        if (!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length ==0;
    },
    
    createCardsFromPeopples: function(){

    this.cards = [];

    this.peopples.forEach((peopple) => {
        this.cards.push(this.createPairFromPeopple(peopple));
    })

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
},

    createPairFromPeopple: function (peopple){

        return [{
            id: this.createIdWithPeopple(peopple),
            icon: peopple,
            flipped: false,
        },{
            id: this.createIdWithPeopple(peopple),
            icon: peopple,
            flipped: false,
        }]
    },

    createIdWithPeopple: function (peopple){
        return peopple + parseInt(Math.random() *1000);
    },

    shuffleCards: function (cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }


}