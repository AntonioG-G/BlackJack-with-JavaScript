/* 
C = clubs
D = diamonds
H = hearts
S = spades
*/

let deck = [];
const types =['C', 'D', 'H', 'S']
const specials =['A', 'J', 'Q', 'K']

const playerDOM = document.getElementsByClassName('Cards');
const player = playerDOM[0];
const pointsP = document.getElementById('PointsP');

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
}
const cardValue = (card) =>{
    const value = card.substring(0, card.length-5);
    return (isNaN(value)) ?
    (value === 'A') ?
    ((pointsP.textContent*1)>10) ? 1:11
    :10
    : value*1;
}
const pointsAdd = (value) => {
    let i =pointsP.textContent*1;
    pointsP.textContent = value+i;
}
createDeck();
