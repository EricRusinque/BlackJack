( () => {
    'use strict'

    let deck = [];
    const types = ['C','D','H','S'],
          specials = ['A','J','Q','K'];

    let playerPoints = 0,
        computerPoints = 0;

    // References HTML

    const btnRequest = document.querySelector('#btnRequest'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');

    const divPlayerCards = document.querySelector('#player-cards'),
          divComputerCards = document.querySelector('#computer-cards'),
          htmlPoints = document.querySelectorAll('small');


    const createDeck = () => {

        for( let i = 2; i <= 10; i++){
            for (const type of types) {
                deck.push( i + type );
            }
        }

        for ( let type of types) {
            for (const esp of specials) {
                deck.push( esp + type);
            }
        }

        deck = _.shuffle( deck )

        return deck;
    }


    createDeck();

    // This function allow take a card
    const requestCard = () => {
        
        if( deck.length === 0){
            throw 'There are no cards in the deck';
        }

        const card = deck.pop();


        
        return card;

    }

    const card = requestCard();

    const cardValue = ( card ) => {

        const value = card.substring(0 , card.length - 1);
        
        return ( isNaN( value) ) ?
                    ( value === 'A') ? 11 : 10
                    : value * 1;
        // let points = 0
        // console.log({value})
        // if( isNaN( value )) {

        //     points = (value === 'A') ? 11 : 10;
        //     console.log(points)

        // } else {
        //     console.log('Is a number');
        //     points = value * 1;
        //     console.log(points);
        // }
    }

    // Turn of the computer

    const turnComputer = ( minimunPoints ) => {

        do {
            const card = requestCard();

            computerPoints = computerPoints + cardValue( card );
            htmlPoints[1].innerText = computerPoints;

            const imgCard = document.createElement('img');
            imgCard.src= `assets/cartas/${ card }.png`;
            imgCard.classList.add('card');

            divComputerCards.append(imgCard);

            if( minimunPoints > 21 ) {
                break;
            }

        } while( (computerPoints < minimunPoints) && (minimunPoints <= 21 ) );

        setTimeout(() => {
            if( computerPoints === minimunPoints ) {
                alert('Nobody wins');
            } else if ( minimunPoints > 21 ){
                alert('Computer Win');
            } else if ( computerPoints > 21 ){
                alert('Player Win');
            } else {
                alert('Computer Win');
            }
        }, 500);

    }


    // Events 

    btnRequest.addEventListener('click', () => {

        const card = requestCard();
    
        playerPoints = playerPoints + cardValue( card );
        htmlPoints[0].innerText = playerPoints;

        const imgCard = document.createElement('img');
        imgCard.src= `assets/cartas/${ card }.png`;
        imgCard.classList.add('card');

        divPlayerCards.append(imgCard);

        if( playerPoints > 21 ) {
            btnRequest.disabled = true;
            turnComputer( playerPoints );
        } else if ( playerPoints === 21) {
            btnRequest.disabled = true;
            turnComputer( playerPoints );
        } 
    });



    // TODO : Delete  

    btnStop.addEventListener('click', () => {

        btnStop.disabled = true;
        btnRequest.disabled = true;

        turnComputer( playerPoints );

    });

    btnNew.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = createDeck();

        playerPoints = 0;
        computerPoints = 0;

        htmlPoints[0].innerText = 0
        htmlPoints[1].innerText = 0

        divComputerCards.innerHTML = '',
        divPlayerCards.innerHTML = '';
        
        btnRequest.disabled = false;
        btnStop.disabled = false;

    })


})(); 