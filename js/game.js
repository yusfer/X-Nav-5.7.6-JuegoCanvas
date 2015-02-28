// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

auxNumPiedras = 7;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero2.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";
//METER IMÁGENES PIEDRAS Y MALOS

//stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";



// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};

stone = function(){
	console.log("creo una piedra")
	};

var princessesCaught = 0;
//array inicial enemys vacío
var enemys = [];

//función para rellenar enemigos que llamo en reset
generoEnemys = function(num){
	
	for(i=0;i<num;i++){
		enemys[i]= new stone();
	}	
}

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	//en cada reset genero nuevos enemigos
	console.log("llamo a reset")
	generoEnemys(auxNumPiedras);
	console.log("length enemys: " + enemys.length)
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * ((canvas.width-32) - 64));	//resto 32 (tamaño árboles) para que princesa no esté subida en una higuera
	princess.y = 32 + (Math.random() * ((canvas.height-32) - 64));
	// similar a esto para poner las piedras
	
	for(i=0;i<enemys.length;i++){
		
		enemys[i].x = 32 + (Math.random() * ((canvas.width-32) - 64));	
		enemys[i].y = 32 + (Math.random() * ((canvas.height-32) - 64));
	}
	
};

// Update game objects
var update = function (modifier) {
	
		// CONDICIONES PARA QUE EL HÉROE NO SE SALGA DEL CANVAS
		
	if (38 in keysDown) { // Player holding up
		if(!((hero.y-(hero.speed*modifier))<0)){
			hero.y -= hero.speed * modifier;
		}
	}
	if (40 in keysDown) { // Player holding down
		if(((hero.y-(hero.speed*modifier))<390)){
			hero.y += hero.speed * modifier;
		}
		
	}
	if (37 in keysDown) { // Player holding left
		
		if(!((hero.x-(hero.speed*modifier))<3)){
			hero.x -= hero.speed * modifier;
		}
		
	}
	if (39 in keysDown) { // Player holding right
		if(((hero.x-(hero.speed*modifier))<455)){
			hero.x += hero.speed * modifier;
		}	
	}

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
		reset();
	}
	// veo si se toca con array enemys
	for(i=0;i<auxNumPiedras;i++){
		
		if (
		hero.x <= (enemys[i].x + 16)
		&& enemys[i].x <= (hero.x + 16)
		&& hero.y <= (enemys[i].y + 16)
		&& enemys[i].y <= (hero.y + 32)
	) {
		princessesCaught=0;
		reset();
	}
		
	}
	//ver si toco piedra o malo (RECORRERME ARRAY ENEMYS)
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
	// varias cosas, meter en array
	if (stoneReady) {
		for(i=0;i<auxNumPiedras;i++){
			ctx.drawImage(stoneImage, enemys[i].x, enemys[i].y);
		}
		
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
