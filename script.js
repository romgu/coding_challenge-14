// Cards data
const cardsArray = [
	{
		'name': 'bishopblack',
		'img': 'icons/bishopblack.png'
	},
	{
		'name': 'bishopwhite',
		'img': 'icons/bishopwhite.png'
	},
	{
		'name': 'kingwhite',
		'img': 'icons/kingwhite.png'
	},
	{
		'name': 'kingblack',
		'img': 'icons/kingblack.png'
	},
	{
		'name': 'pawnwhite',
		'img': 'icons/pawnwhite.png'
	},
	{
		'name': 'pawnblack',
		'img': 'icons/pawnblack.png'
	},
	{
		'name': 'queenblack',
		'img': 'icons/queenblack.png'
	},
	{
		'name': 'queenwhite',
		'img': 'icons/queenwhite.png'
	},
	{
		'name': 'rookwhite',
		'img': 'icons/rookwhite.png'
	},
	{
		'name': 'rookblack',
		'img': 'icons/rookblack.png'
	},
	{
		'name': 'knightwhite',
		'img': 'icons/knigthwhite.png'
	},
	{
		'name': 'knightblack',
		'img': 'icons/knigthblack.png'
	}
]

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let constante = 0;
const resetButton = document.querySelector("#reset");
let reset = false;
let click_count = 0;

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

const game = document.querySelector("#cards");

let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

const createGrid = () => {
	gameGrid.forEach(item => {
	const { name, img } = item;

	const card = document.createElement('div');
	card.classList.add('card');
	card.classList.add('zone');
	card.dataset.name = item.name;

	const front = document.createElement('div');
  	front.classList.add('front');

  	const back = document.createElement('div');
  	back.classList.add('back');
  	back.style.backgroundImage = `url(${img})`;

	grid.appendChild(card);
  	card.appendChild(front);
  	card.appendChild(back);
	})
}

createGrid();

const sectionGrid = document.querySelector(".grid");

function createNewGrid() {
	document.querySelectorAll(".zone").remove();
	gameGrid.sort(() => 0.5 - Math.random());
	createGrid();
	let cards = document.querySelectorAll(".zone")
}

//Timer Script

function functionTimer(event) {
	click_count++;
	if(click_count <= 1) {
		reset = false;
		markPresent();
		for(var i = 0; i < cards.length; i++) {
			cards[i].removeEventListener("click", functionTimer);
		}
	}
}

const cards = document.querySelectorAll(".zone")

// Timer Function and Format!

function markPresent(){
		window.markDate = new Date();
   		updateClock();
}

const updateClock = () => {
	console.log(constante);
	if (reset === true) {
		return
	} 
	if (constante === 12) {
		alert(`Congrats, you've finished!`)
	} 	
	else {  
	    const currDate = new Date();
	    const diff = currDate - markDate;
	    document.getElementById("timer").innerHTML = format(diff/1000);
		setTimeout(function() {
		    updateClock()
		}, 1000);
	}	
}

const format = (seconds) => {
	const numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600),10);
	const numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),10);
	const numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60,10);
    return ((numhours<10) ? "0" + numhours : numhours)
    + ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
    + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
}

// Counter

const counter = document.querySelector("#steps");

const moveIncrement = () => {
	counter.innerHTML++;
}

// Cards Script

const match = () => {
  const selected = document.querySelectorAll('.selected');
      constante++;
  selected.forEach(card => {
    card.classList.add('match');
    //This prevent cards to flip again once matched!
    card.classList.add('selected2');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
  moveIncrement();
};

grid.addEventListener('click', event => {
	functionTimer();
  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  	}
});

//reset script
	//script to remove an element
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function resetFunction() {
	reset = true;
	resetGuesses();
	document.getElementById("timer").innerHTML = `00:00:00`;
	counter.innerHTML = `0`;
	constante = 0;
	const cardSelected2 = document.querySelectorAll(".selected2");
	cardSelected2.forEach(card => {
		card.classList.remove("selected2");
		card.classList.remove("match");
	});
	click_count = 0;
	createNewGrid();
} 

resetButton.addEventListener("click", resetFunction)