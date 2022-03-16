const myModule = ( () => {
    'use strict'

    let deck = [];
    const types = ['C','D','H','S'],
          specials = ['A','J','Q','K'];

    let playersPoints = [];

    // References HTML

    const btnRequest = document.querySelector('#btnRequest'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');

    const divCardsPlayers = document.querySelectorAll('.divCards'),
          htmlPoints = document.querySelectorAll('small');


    // This function initialize the game
    const initializeGame = ( numPlayers = 2 ) => {

        deck = createDeck();

        playersPoints = [];
        for( let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        htmlPoints.forEach( elem => elem.innerText = 0 );
        divCardsPlayers.forEach( elem => elem.innerText = '');

        btnRequest.disabled = false;
        btnStop.disabled = false;

    }
    const createDeck = () => {

        deck = [];

        for( let i = 2; i <= 10; i++){
            for (let type of types) {
                deck.push( i + type );
            }
        }

        for ( let type of types) {
            for (let esp of specials) {
                deck.push( esp + type);
            }
        }

        return  _.shuffle( deck );
    }

   
    // This function allow take a card
    const requestCard = () => {
        
        if( deck.length === 0){
            throw 'There are no cards in the deck';
        }

        return deck.pop();
        
    }


    const cardValue = ( card ) => {

        const value = card.substring(0 , card.length - 1);
        
        return ( isNaN( value )) ?
                    ( value === 'A') ? 11 : 10
                    : value * 1;
    }

    // Turn: 0 = First player and the last will be the computer
    const accumulatePoints = ( card, turn ) => {

        playersPoints[turn] =  playersPoints[turn] + cardValue( card );
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];

    }

    const createCard = (card, turn) => {
        
        const imgCard = document.createElement('img');
        imgCard.src= `assets/cartas/${ card }.png`;
        imgCard.classList.add('card');
        divCardsPlayers[turn].append( imgCard );
    }

    const determineWinner = () => {

        const [ minimumPoints, computerPoints ] = playersPoints;

        setTimeout(() => {
            if( computerPoints === minimumPoints ) {
                alert('Nobody wins');
            } else if ( minimumPoints > 21 ){
                alert('Computer Win');
            } else if ( computerPoints > 21 ){
                alert('Player Win');
            } else {
                alert('Computer Win');
            }
        }, 100);

    }

    // Turn of the computer
    const turnComputer = ( minimumPoints ) => {

        let computerPoints = 0;
        do {
            const card = requestCard();
            computerPoints = accumulatePoints( card, playersPoints.length - 1);

            createCard( card, playersPoints.length - 1 );

        } while( (computerPoints < minimumPoints) && (minimumPoints <= 21 ) );

        determineWinner();

    }


    // Events 
 
    btnRequest.addEventListener('click', () => {

        const card = requestCard();
        const playerPoints = accumulatePoints( card, 0);

        createCard( card, 0);
    
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

        turnComputer( playersPoints[0] );

    });

    // btnNew.addEventListener('click', () => {
    //     initializeGame();        
    // });

    return {
        newGame : initializeGame
    }
})(); 