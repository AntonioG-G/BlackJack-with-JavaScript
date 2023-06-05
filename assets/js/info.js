const form = document.getElementById('userForm');
const user = document.getElementById('playerName');
const intro = document.getElementById('intro');
const generalContainer = document.getElementById('generalContainer');
const playButton = document.getElementById('play');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const amountPlayers = form.elements.players.value;
    const inputText = form.elements.username;
    const text = inputText.value;
    console.log(`Jugadores: ${amountPlayers} y Texto: ${text}`);

    submitFunction(amountPlayers,text);
});
const submitFunction = (players,text) => {
    user.textContent = text;
    intro.style.animation = '1s fadeout linear';
    playButton.style.visibility = 'hidden';
    intro.addEventListener('animationend', function(event){
        intro.style.visibility = 'hidden';
        generalContainer.style.filter = 'none';
    });
    removeOpponents(players);
}
const removeOpponents = (players) =>{
    let maxopponents = 4;
    let i = 1;
    for (players; players < maxopponents; players++) {
        let element = document.getElementById(`o${(maxopponents+1)-i}`)
        element.remove();
        console.log('borrado')
        i++;
    } 
}