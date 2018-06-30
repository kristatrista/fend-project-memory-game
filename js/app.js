/*https://matthewcranford.com/memory-game-walkthrough-part-8-puttinggit c-it-all-together/
used this walkthrough for pointers and some code
*/

 //globals
let moves = 0;
clockOff =true;
let time = 0;
let clockId;
const cards = document.querySelectorAll('.card');
console.log(cards);

const totalPairs= 2;

//create list to hold clicked cards in global scope

let toggledCards = [];

//select deck of cards as target

const deck = document.querySelector('.deck');



//on pageload show all cards
window.document.onload =
setTimeout(function startGame(){
  $(".card").toggleClass("open show");
},2000);

//add event listener to deck, log "", toggle open

//when card is clicked game starts, clock starts
deck.addEventListener('click',event =>{
  const clickTarget = event.target;
  if (isClickValid(clickTarget)){
  if(clockOff) {
    startClock();
    clockOff= false;

  }
}
//check for matches
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
    //addMatchedPair();
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
  console.log('toggledCards');
  console.log(toggledCards);
}
let matched = 0;
function addMatchedPair(){
  if(toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
    matched = matched + 1;
    console.log(matched)

  }
}
//check matched and pairs
function winner(){
  if(matched === 8){
    resetGame();
    const winner=document.querySelector('.winLose');
    winner.innerHTML ="YOU WON!";
  }
}

 //create a match funtion

 function checkForMatch(){
   if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
     addMatchedPair();
     winner();
     toggledCards[0].classList.toggle('match');
     toggledCards[1].classList.toggle('match');
     toggledCards = [];
   }else{
     setTimeout(()=> {
       toggledCards[0].classList.toggle('nomatch');
       toggledCards[1].classList.toggle('nomatch');
   }, 0);

     setTimeout(()=> {
       toggledCards[0].classList.toggle('nomatch');
       toggledCards[1].classList.toggle('nomatch');
       console.log('not a match');
       toggleCard(toggledCards[0]);
       toggleCard(toggledCards[1]);
       toggledCards = [];
     }, 300);
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
  if (moves === 10 || moves === 15|| moves === 20){
    removeStar();
  }

}

starList= document.querySelector('ul.stars');
function removeStar(){
  starList.removeChild(starList.lastElementChild);
  console.log('star length ' + starList.length);



    }


function getStars(){
  stars = document.querySelectorAll('.fa-star');
  starCount = 0;
  for (star of stars){
    if (star.style.display !== 'none'){
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

//clock
function stopClock(){
  clearInterval(clockId);
  seconds = -1;
  minutes = 0;
}

function startClock(){
    clockId = setInterval(() =>{
    time ++
    const clock = document.querySelector('#clock');
    const minutes = Math.floor(time / 60);
    const seconds =time % 60;
    if (seconds < 10) {
      clock.innerHTML = minutes + ':0' + seconds;
    } else{
      clock.innerHTML = minutes + ':' + seconds;
    }
  }, 1000);
}




//modal

let modal = document.querySelector('.modal');
let span = document.querySelector(".close");
document.querySelector(".close").addEventListener('click',toggleModal);

/* When the user clicks anywhere outside of the modal, close it/optional
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}*/

document.querySelector(".replayButton").addEventListener('click',newGame);
//document.location.reload()
document.querySelector(".restart").addEventListener('click',resetGame);

//toggle modal open and close
 function toggleModal(){
   modal.classList.toggle("hidden");
   console.log('hey restart me');
 }


//append stats to modal body

function youWon(){
  const modalTime = document.querySelector(".modalTime");
  const clockTime = document.querySelector("#clock").innerHTML;
  const starStats = document.querySelector(".modalStars");
  const movesStats = document.querySelector(".modalMoves");

  const stars = getStars();
//when all cards are matched pop up window with stats

  starStats.innerHTML= "Stars = "  + stars;
  modalTime.innerHTML= "Time = " + clockTime;
  movesStats.innerHTML= "Moves = " + moves;

}
//reload page and restart
function newGame(){
  document.location.reload(true);
}

//reset Game
function resetGame(){
  youWon();
  resetMoves();
  resetClockAndTime();
  toggleModal();

}
function resetClockAndTime(){

  time = 0;
  stopClock();
  resetStars();
  //displayTime();
}
function resetMoves(){
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}
//fix reset stars
function resetStars(){
  stars = 3;
  if (starList.length === 2){
    starList[0].classList.add('fa-star');
  }



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
