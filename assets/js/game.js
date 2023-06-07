/* 
C = clubs
D = diamonds
H = hearts
S = spades
*/

let deck = [];
const types =['C', 'D', 'H', 'S']
const specials =['A', 'J', 'Q', 'K']

const opponentDOM = document.getElementsByClassName('Cards');
const player = document.getElementById('playerCards')
const pointsP = document.getElementById('PointsP');
const points = document.getElementsByClassName('points');

const createDeck = () =>{
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(i + type + '.png');   
        }     
    }
    for (let type of types) {
        for (let special of specials) {
            deck.push(special + type + '.png');
        }   
    }
    deck = _.shuffle(deck);
    return deck;
}
const hit = () =>{   
    let card = document.createElement('img');
    card.classList.add('pCards');
    let num = Math.floor(Math.random() * deck.length);
    card.src = `/assets/cards/${deck[num]}`;
    player.appendChild(card);

    let value = cardValue(deck[num]);
    pointsAdd(value);
    deck.splice(num, 1);
}
const hitopponent = (posicion) =>{   
    let opponent;
    let card = document.createElement('img');
    card.classList.add('oCards');
    let num = Math.floor(Math.random() * deck.length);
    card.src = `/assets/cards/${deck[num]}`;
    opponent = opponentDOM[posicion];
    opponent.appendChild(card);

    let value = cardValueO(deck[num], posicion);
    pointsAddO(value, posicion);
    deck.splice(num, 1);
}
const firstRound = () =>{
    for (let i = 0; i <= amountPlayers; i++) {
        if (amountPlayers<=2) {
            if (i!=amountPlayers) {
                for (let j = 0; j < 2; j++) {
                    hitopponent(i);
                }
            }else{
                for (let j = 0; j < 2; j++) {
                    hit();
                }
            }
        }else if (amountPlayers>2) {
            if (i<2) {
                for (let j = 0; j < 2; j++) {
                    hitopponent(i);
                }
            }else if (i==2) {
                for (let j = 0; j < 2; j++) {
                    hit();
                }
            }else if (i>2) {
                for (let j = 0; j < 2; j++) {
                    hitopponent(i-1);
                }
            }
        }
    }
}
const cardValue = (card) =>{
    const value = card.substring(0, card.length-5);
    return (isNaN(value)) ?
    (value === 'A') ?
    ((pointsP.textContent*1)>10) ? 1:11
    :10
    : value*1;
}
const cardValueO = (card,posicion) =>{
    const value = card.substring(0, card.length-5);
    return (isNaN(value)) ?
    (value === 'A') ?
    ((points[posicion].textContent*1)>10) ? 1:11
    :10
    : value*1;
}
const pointsAdd = (value) => {
    let i =pointsP.textContent*1;
    pointsP.textContent = value+i;
}
const pointsAddO = (value, posicion) => {
    let i = points[posicion].textContent*1;
    points[posicion].textContent = value+i;
}
createDeck();