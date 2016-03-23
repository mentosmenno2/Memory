window.onload = init;

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

//wat gebeurt er on page load
function init() { 
	var button = document.getElementById("play");
	playMusic();
	button.onclick = buttonClick; 
}

//speel muziekje af
function playMusic() {

	var myAudio = new Audio('sounds/TROLOLOLOLOL.mp3'); 
	myAudio.volume = 0.2;
	myAudio.addEventListener('ended', function() { //als geluid klaar is
		this.currentTime = 0; //spoel terug
		this.play();
	}, false);
	myAudio.play();	

}


//als op play geklikt wordt
function buttonClick() {
	memory_values = [];
	memory_tile_ids = [];
	tiles_flipped = 0;
	var selectbox = document.getElementById('moeilijkheidsgraad');
	var selection = selectbox.options[selectbox.selectedIndex].value; //verkrijg gekozen moeilijkheidsgraad
	document.getElementById("memory_board").innerHTML = ""; //reset bord
	
	if (selection == "Beginner") { 
		newBoard_beginner(); //start beginnermodus
	}
	else if (selection == "Expert") {
		newBoard_expert(); //start expertmodus
	}
	else {
		alert("Kies een moeilijkheidsgraad a.u.b.")
	}
	}

//random functie. Deze heb ik gedeeltelijk van een tutorialfilmpje gekopieerd. https://www.youtube.com/watch?v=c_ohDPWmsM0
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//start nieuw bord
function newBoard_beginner(){
	var memory_array = ['bat','bat','bug','bug','cat','cat','dog','dog']; //plaatjes
	tiles_flipped = 0; //aantal dingen omgedraaid
    memory_array.memory_tile_shuffle(); //shuffle de array
	for(var i = 0; i < memory_array.length; i++){ //voor elk item in de array doe dit
		
		var x = document.createElement("DIV");//maak een div
		x.setAttribute("id", 'card'+i); //geef deze een id van card + de plaats van het willekeurige item in de array
		x.className = "card";//geef deze een class van card
		x.onclick = function(mymemarray) { //dit moet op de een of andere manier, anders kan die waardes niet meezenden, zie http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
			return function() {
				flipKaartje(this, mymemarray);
			}
		}(memory_array[i]);
		document.getElementById("memory_board").appendChild(x); //voeg de div toe
		
	}
	document.getElementById('play').value = 'opnieuw'; //verander de knoptext
}

function newBoard_expert(){
	var memory_array = ['bat','bat','bug','bug','cat','cat','dog','dog','fly','fly','frog','frog'];
	tiles_flipped = 0;
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){

		var x = document.createElement("DIV");
		x.setAttribute("id", 'card'+i);
		x.className = "card";
		x.onclick = function(mymemarray) { 
			return function() {
				flipKaartje(this, mymemarray);
			}
		}(memory_array[i]);
		document.getElementById("memory_board").appendChild(x);

	}
	document.getElementById('play').value = 'opnieuw';
}

function flipKaartje(tile,val){ //in deze functie wordt het kaartje "omgedraaid"
	if(memory_values.length < 2){ //klikken heeft geen nut als er al 2 kaartjes gekozen zijn en nog niet gereset zijn
		tile.style.background = 'url(img/'+val+'.jpg) no-repeat 100%'; //zet background voor kaartje naar willekeurig gekozen ding
		tile.style.backgroundSize = "100% 100%";
		tile.style.pointerEvents = "none"; //op dit kaartje kan niet nogmaals geklikt worden
		if(memory_values.length == 0){ //bij het eerste kaartje
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){//bij het 2e kaartje
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){//als beide kaartjes gelijk zijn
				tiles_flipped += 2;
				document.getElementById(memory_tile_ids[0]).style.borderColor = "green"; //kleur kaartje goen
				document.getElementById(memory_tile_ids[1]).style.borderColor = "green"; //same
				// arrays leeg maken
				memory_values = []; //values leeg maken
            	memory_tile_ids = []; //id's leeg maken
				var correctAudio = new Audio('sounds/correct.mp3'); 
				correctAudio.play();	
				
				var selectbox = document.getElementById('moeilijkheidsgraad');
				var selection = selectbox.options[selectbox.selectedIndex].value;
				if (selection == "Beginner") {
					var memory_array = ['bat','bat','bug','bug','cat','cat','dog','dog'];
					if(tiles_flipped == memory_array.length){ //als alle 8 kaartjes zijn omgedraaid dan
						var congratulationsAudio = new Audio('sounds/congratulations.mp3'); 
						congratulationsAudio.play();
						setTimeout(function(){alert("Gefeliciteerd, je hebt de puzzel opgelost!");},10);
					}
				}
				else if (selection == "Expert") {
					var memory_array = ['bat','bat','bug','bug','cat','cat','dog','dog','fly','fly','frog','frog'];
					if(tiles_flipped == memory_array.length){ //als alle 12 kaartjes zijn omgedraaid dan
						var congratulationsAudio = new Audio('sounds/congratulations.mp3'); 
						congratulationsAudio.play();
						setTimeout(function(){alert("Gefeliciteerd, je hebt de puzzel opgelost!");},10);
					}
				}
				
			} else {
				function flipTerug(){
				    // flip terug
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(img/memory-bg.jpg) no-repeat'; //achtergrond terug veranderen naar vraagteken
            	    tile_1.style.backgroundSize = "100% 100%";
					tile_1.style.borderColor = "white";
				    tile_2.style.background = 'url(img/memory-bg.jpg) no-repeat';
            	    tile_2.style.backgroundSize = "100% 100%";
					tile_2.style.borderColor = "white";
				    // Arrays legen
				    memory_values = [];
            	    memory_tile_ids = [];
					tile_1.style.pointerEvents = "auto"; //kaartje weer klikbaar maken
					tile_2.style.pointerEvents = "auto";
				}
				
				document.getElementById(memory_tile_ids[0]).style.borderColor = "red"; //fout antwoord dus kleur wordt rood
				document.getElementById(memory_tile_ids[1]).style.borderColor = "red";
				var buzzerAudio = new Audio('sounds/Buzzer.mp3'); 
					buzzerAudio.play();	
				setTimeout(flipTerug, 700); //draai kaartjes terug na 0,7 seconden
			}
		}
	}
}