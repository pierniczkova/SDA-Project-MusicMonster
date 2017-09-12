var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
  tryToStartGame();
};
bgImage.src = "./src/background.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
  tryToStartGame();
};
monsterImage.src = "./src/monsterrr.png";

var hintReady = false;
var hintImage = new Image();
hintImage.onload = function() {
  hintReady = true;
  tryToStartGame();
};
hintImage.src = "./src/mellody.png";

var monster = {
  speed: 256
};


var hints = [];
var hintsCaught = 0;

var keysDown = {};

addEventListener(
  "keydown",
  function(e) {
    keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function(e) {
    delete keysDown[e.keyCode];
  },
  false
);

var reset = function() {
  monster.x = canvas.width / 2;
  monster.y = canvas.height - monsterImage.height;
  addNewHint();
	
};

var addNewHint = function() {
  var hint = {};
  hint.x = Math.random() * (canvas.width - hintImage.width);
  hint.y = -hintImage.height;
  hints.push(hint)
  setTimeout(addNewHint, 500 + Math.random() * 3000);
};

var update = function(modifier) {
  if (37 in keysDown) {
	var newXLeft = monster.x - monster.speed * modifier;
	 if (newXLeft < 0) {
		 monster.x = 0;
	 } else { 
		 monster.x = newXLeft;
	 }
  }
  if (39 in keysDown) {
	  var newXRight = monster.x + monster.speed * modifier;
		if (newXRight > (canvas.width - monsterImage.width)) {
			monster.x = canvas.width - monsterImage.width;
		} else {
			monster.x = newXRight;
			}
  	}

  var hint = {};
  hint.x = Math.random() * (canvas.width - hintImage.width);
  hint.y = -hintImage.height;

  detectCollision();
};

var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  if (hintReady) {
	  for ( i = 0; i < hints.length; i++ ) {
		var hint = hints[i];
		ctx.drawImage(hintImage, hint.x, hint.y);
	  }
  }
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + hintsCaught, 20, 20);
};

  var gameStarted = false;
  document.getElementById("starter").disabled = false;
  var intervalId = null;
  function start() {
    intervalId = setInterval(changeValue, 1000);
	gameStarted = true;
	document.getElementById("starter").disabled = true;
	} 
  var secs = 30;
  function changeValue() {
    document.getElementById("finalCountDown").innerHTML = "0 : " +secs ;
    secs--
	  if (secs < 0) {
		clearInterval (intervalId);
		gameStarted = false;
		setTimeout(alert, 100, 'Game over! Your score: ' + hintsCaught + ' tones catched :) Congrats!');
	}
};

var moveHintDown = function() {
  for ( i = 0; i < hints.length; i++ ) {
	var hint = hints[i];
	hint.y = hint.y + 1;;
	}
};

var detectCollision = function() {
  for ( i = 0; i < hints.length; i++ ) {
	var hint = hints[i]; 
	if (
		monster.x <= hint.x + hintImage.width
		&& hint.x <= monster.x + monsterImage.width
		&& monster.y <= hint.y + hintImage.height
		&& hint.y <= monster.y + monsterImage.height
	) {
		++hintsCaught;
		hints.splice(i, 1);
	  }
	}
};


var main = function() {
  var now = Date.now();
  var delta = now - then;
  if (gameStarted) {
	  moveHintDown();
  }
  
  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame || 
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

var then = Date.now();
var tryToStartGame = function() {
  if (monsterReady && bgReady && hintReady) {
    reset();
    main();
  }
};
