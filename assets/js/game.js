/* 
C = clubs
D = diamonds
H = hearts
S = spades
*/

let deck = [];
const types =['C', 'D', 'H', 'S']
const specials =['A', 'J', 'Q', 'K']

const competitors = document.getElementsByClassName("competitor");
const pointsP = document.getElementById('PointsP');
const points = document.getElementsByClassName('points');
let p=0;

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
    const player = document.getElementById('playerCards');
    let card = document.createElement('img');
    card.classList.add('pCards');
    let num = Math.floor(Math.random() * deck.length);
    card.src = `/assets/cards/${deck[num]}`;
    player.appendChild(card);

    let value = cardValue(deck[num]);
    pointsAdd(value);
    deck.splice(num, 1);
}
const hitopponent = (oc) =>{   
    let card = document.createElement('img');
    card.classList.add('oCards');
    let num = Math.floor(Math.random() * deck.length);
    card.src = `/assets/cards/${deck[num]}`;
    oc.appendChild(card);

    let value = cardValueO(deck[num], p);
    pointsAddO(value, p);
    deck.splice(num, 1);
}
const firstRound = () =>{
    for(let i = 0; i < competitors.length; i++) {
      if (!competitors[i].classList.contains("player")) {
          for (let j = 0; j < 2; j++) {
            const cardsElement = competitors[i].querySelector(".Cards");
            hitopponent(cardsElement);
          }
          p++;
        } else {
          for (let j = 0; j < 2; j++) {
            hit();
          }
        }
      };
      mainGame();
}

const cardValue = (card) =>{
    const value = card.substring(0, card.length-5);
    return (isNaN(value)) ?
    (value === 'A') ?
    ((pointsP.textContent*1)>10) ? 1:11
    :10
    : value*1;
}
const cardValueO = (card, p) =>{
    const value = card.substring(0, card.length-5);
    return (isNaN(value)) ?
    (value === 'A') ?
    ((points[p].textContent*1)>10) ? 1:11
    :10
    : value*1;
}
const pointsAdd = (value) => {
    let i =pointsP.textContent*1;
    pointsP.textContent = value+i;
}
const pointsAddO = (value, p) => {
    let i = points[p].textContent*1;
    points[p].textContent = value+i;
}

const mainGame = () => {
    p=0;
    for (let i = 0; i < competitors.length; i++) {
      if (competitors[i].id !== _player.id) {
        const pointsElement = competitors[i].querySelector(".points").textContent;
        const cardsElement = competitors[i].querySelector(".Cards");
          if ((pointsElement*1)<30) {
                  hitopponent(cardsElement);
                  mainGame();
                }
              p++;
            } else {
              console.log("funcion del jugador jaja")
            }
      }
}
      createDeck();