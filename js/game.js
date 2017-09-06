var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
  tryToStarGame();
};
bgImage.src = "./src/background.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
  tryToStarGame();
};
monsterImage.src = "./src/pinkMonster.png";

var hintReady = false;
var hintImage = new Image();
hintImage.onload = function() {
  hintReady = true;
  tryToStarGame();
};
hintImage.src = "./src/music.png";

var monster = {
  speed: 256
};


var hints = [];
var hintCaught = 0;

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
	setTimeout(addNewHint, 300 + Math.random() * 3000);
};

var update = function(modifier) {
  if (37 in keysDown) {
    monster.x -= monster.speed * modifier;
  }
  if (39 in keysDown) {
    monster.x += monster.speed * modifier;
  }
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
};

var moveHintDown = function() {
	for ( i = 0; i < hints.length; i++ ) {
		var hint = hints[i];
		hint.y = hint.y + 1;;
	}
};
var main = function() {
  var now = Date.now();
  var delta = now - then;
  moveHintDown();

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
var tryToStarGame = function() {
  if (monsterReady && bgReady && hintReady) {
    reset();
    main();
  }
};
