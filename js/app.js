/*
 * Create a list that holds all of your cards
 */
 //globals
let moves = 0;
clockOff =true;
let time = 0;
let clockId;
const cards = document.querySelectorAll('.card');
console.log(cards);
//create list to hold clicked cards in global scope
let toggledCards = [];
//select deck of cards as target
const deck = document.querySelector('.deck');

//add event listener to deck, log "", toggle open
deck.addEventListener('click',event =>{
  const clickTarget = event.target;
  if (isClickValid(clickTarget)){
  if(clockOff) {
    startClock();
    clockOff= false;

  }
}

  function isClickValid(clickTarget){
  return (clickTarget.classList.contains('card') &&
  !clickTarget.classList.contains('match')
  && toggledCards.length < 2 &&
  !toggledCards.includes(clickTarget));
}

  if (isClickValid){
    console.log('Im a card');
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
if (toggledCards.length ===2 ){
  checkForMatch();
  addMove();
  checkScore();
  console.log('2 cards');
}

  }
});

//toggle cards in seperate funtion open show
function toggleCard (clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

//create funtion to push clicked cards to new array
function addToggleCard(clickTarget){
  toggledCards.push(clickTarget);
  console.log(toggledCards);


}
 //create a match funtion

 function checkForMatch(){
   if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
     console.log('Match');
     toggledCards[0].classList.toggle('match');
     toggledCards[1].classList.toggle('match');
     toggledCards = [];

   }else{
     setTimeout(()=> {
       console.log('not a match');
       toggleCard(toggledCards[0]);
       toggleCard(toggledCards[1]);
       toggledCards = [];
     }, 700);



   }
 }
 //shuffle the deck

 function shuffleTheDeck (){
   const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
   const shuffledCards = shuffle(cardsToShuffle);
   for (card of shuffledCards) {
     deck.appendChild(card);
   }
 }
 shuffleTheDeck();

//move counter



function addMove(){
  moves ++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;

}

//stars funciton

function checkScore(){

  if (moves === 8 || moves === 12 || moves === 16){
    removeStar();
  }
}
starList = document.querySelectorAll('.fa-star');
function removeStar(){

  starList[0].classList.remove('fa-star');
}
//clock

function startClock(){

  let clockId = setInterval(() =>{
    time ++
    const clock = document.querySelector('#clock');
    const minutes = Math.floor(time / 60);
    const seconds =time % 60;
    if (seconds < 10) {
      clock.innerHTML = minutes + ':0' + seconds;
    } else{
      clock.innerHTML = minutes +':' + seconds;
    }
    console.log( time + ' seconds have passed');
  }, 1000);

}
function stopClock(){
  clearInterval(clockId);
}

//modal

// Get the modal
var modal = document.querySelector('.modal');

// Get the <span> element that closes the modal
var span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
//append stats to modal body

function youWon(){
  const clockTime = document.querySelector(".clock").innerHTML;
  const timeStats = document.querySelector(".modalTime");
  const starStats = document.querySelector(".modalStars");
  const movesStats = document.querySelector(".modalMoves");
  const stars = getStarts();
  //when all cards are matched pop up window with stats
  starStats.innerHTML= "Stars: "  + starList;
}
/*

function displayTime(){
  const clock = document.querySelector('#clock');
  const minutes = Math.floor(time / 60);
  const seconds =time % 60;
  clock.innerHTML = time;


}*/
/*
//restart Game
function(){
  eventlistener to restart button to reload
}
//start Game
function start(){
  flip all deck cards for 2seconds
  reset timer and moves and stars
}*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
