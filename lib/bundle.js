/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// const GameParts = require("./game-parts");
	const GameControl = __webpack_require__(1);
	const ImageConstants = __webpack_require__(2);
	
	
	document.addEventListener("DOMContentLoaded", function(){
	
	  const canvasEl = document.getElementById("myCanvas");
	  const ctx = canvasEl.getContext("2d");
	
	  new GameControl(ctx);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const ImageConstants = __webpack_require__(2);
	const GameParts = __webpack_require__(3);
	
	
	const GameControl = function (ctx) {
	  this.ctx = ctx;
	  this.loaded = {};
	  this.img = {};
	  this.loadImages();
	
	  this.players = [];
	  this.startTime = new Date;
	  this.gameTime = 30000; //Game length in milliseconds
	};
	
	GameControl.PLAYER1MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	};
	
	GameControl.PLAYER2MOVES = {
	  "p": [ 0, -1],
	  "l": [-1,  0],
	  ";": [ 0,  1],
	  "'": [ 1,  0],
	};
	
	
	GameControl.prototype.loadImages = function() {
	  const self = this;
	  Object.keys(ImageConstants).forEach ( (imageKey) => {
	    let img = new Image();
	    img.src = ImageConstants[imageKey];
	    img.addEventListener("load", function(e) {self.checkLoaded(e, imageKey);}, false);
	    this.img[imageKey] = img;
	  });
	
	};
	
	GameControl.prototype.checkLoaded = function(e, imageKey) {
	  const self=this;
	  this.loaded[imageKey] = true;
	
	  if (Object.keys(this.loaded).length === Object.keys(ImageConstants).length) {
	    // console.log("all loaded!");
	
	    const buttonEl = document.getElementById("start-button");
	    buttonEl.addEventListener("click", self.start.bind(self));
	    buttonEl.className="";
	
	  }
	};
	
	
	GameControl.prototype.bindKeyHandlers = function () {
	  const player1 = this.players[0];
	  const player2 = this.players[1];
	
	  Object.keys(GameControl.PLAYER1MOVES).forEach((k) => {
	    let increment = GameControl.PLAYER1MOVES[k];
	    key(k, function () { player1.move(increment); });
	  });
	
	  key("e, q", function () { player1.whack() });
	
	  Object.keys(GameControl.PLAYER2MOVES).forEach((k) => {
	    let increment = GameControl.PLAYER2MOVES[k];
	    key(k, function () { player2.move(increment); });
	  });
	
	  key("o, [", function () { player2.whack() });
	};
	
	
	
	GameControl.prototype.unbindKeyHandlers = function () {
	  let someKeys = [].concat( Object.keys(GameControl.PLAYER1MOVES),
	                        Object.keys(GameControl.PLAYER2MOVES), ['e', 'q', 'o', '[' ]);
	
	  someKeys.forEach((k) => {
	    key.unbind(k);
	});
	};
	
	
	
	GameControl.prototype.updateTime = function (timeLeft) {
	  if (timeLeft < 0) {
	    timeLeft = 0;
	  }
	  document.getElementById("time").textContent = Math.round(timeLeft);
	};
	
	
	GameControl.prototype.start = function () {
	  this.gameParts = new GameParts(this.ctx, this.img);
	  this.players = this.gameParts.addPlayers();
	
	  this.bindKeyHandlers();
	  this.time = new Date;
	  this.gameParts.addCritters();
	
	  this.animate();
	};
	
	
	GameControl.prototype.animate = function(){
	  let timeLeft = (this.gameTime - (new Date - this.time))/1000;
	
	  this.updateTime(timeLeft);
	  this.gameParts.updateScore();
	  this.gameParts.draw();
	
	
	  if (timeLeft > 0) {
	    requestAnimationFrame(this.animate.bind(this));
	  } else {
	    this.end();
	  }
	
	};
	
	
	GameControl.prototype.end = function () {
	  this.gameParts.trolling = false;
	  this.unbindKeyHandlers();
	  this.gameParts.drawEnd();
	
	};
	
	
	
	
	
	module.exports = GameControl;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const ImageConstants = {
	  troll: 'image/troll.png',
	  mallet2: 'image/hammer1.png',
	  mallet1: 'image/hammer2.png',
	  mole: 'image/mole.png',
	  back: 'image/hill.png',
	  mound: 'image/mound.png',
	  miss: 'image/no.png',
	  hit: 'image/bam.png'
	};
	
	module.exports = ImageConstants;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Critter = __webpack_require__(4);
	const Player = __webpack_require__(5);
	const ImageConstants = __webpack_require__(2);
	
	
	
	const GameParts = function (ctx, img) {
	
	  this.img = img;
	  this.ctx = ctx;
	
	  this.players = [];
	  this.critters = [];
	
	  this.score = [0, 0];
	  this.trolling = true;
	
	  const canvasEl = document.getElementById("myCanvas");
	  this.BG_COLOR = "white";
	  this.MAXX = 4;
	  this.MAXY = 3;
	  this.DIM_X = canvasEl.clientWidth;
	  this.DIM_Y = canvasEl.clientHeight;
	  GameParts.FPS = 32;
	
	};
	
	
	
	GameParts.prototype.addPlayers = function () {
	
	  this.players = [new Player({name: "player1", id: 0, pos: [1, 1],
	                              gameParts: this,
	                              img: this.img['mallet1']}),
	                  new Player({name: "player2", id: 1, pos: [2, 1],
	                              gameParts: this,
	                              img: this.img['mallet2']})];
	  return this.players;
	};
	
	GameParts.prototype.addSingleCritter = function (troll) {
	  const lifeSpan =  Math.random() * (5000 - 2000) + 2000;
	
	  const pos = this.getRandCoords();
	
	  let img, hitImg, points;
	  if (troll) {
	    img = this.img["troll"];
	    hitImg = this.img["hit"];
	    points = 10;
	  } else {
	    img = this.img["mole"];
	    hitImg = this.img["miss"];
	    points = -10;
	  }
	
	  this.critters.push(
	    new Critter( {pos: pos,
	                  gameParts: this,
	                  img: img,
	                  hitImg: hitImg,
	                  points: points,
	                  life:lifeSpan})
	  );
	};
	
	
	GameParts.prototype.addCritters = function(){
	  if (this.critters.length < 7) {
	    const chance = Math.random();
	
	    this.addSingleCritter(chance > 0.25);
	    // console.log('added critter');
	
	  }
	
	  const refreshTime = Math.random() * (1000 - 500) + 500;
	  // console.log(refreshTime);
	  if (this.trolling) {
	    window.setTimeout(this.addCritters.bind(this), refreshTime);
	  }
	};
	
	
	GameParts.prototype.allObjects = function () {
	  return [].concat( this.critters, this.players);
	};
	
	
	GameParts.prototype.clearBoard = function () {
	  this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.ctx.fillStyle = this.BG_COLOR;
	  this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	};
	
	GameParts.prototype.drawBackground = function () {
	  this.ctx.drawImage(this.img["back"], 0, 0);
	};
	
	
	GameParts.prototype.drawMounds = function () {
	
	let x;
	let y;
	  for (let i = 0; i < this.MAXX; i++) {
	    for (let j = 0; j < this.MAXY; j++) {
	       x = 25 + (175 * i);
	       y = 120 + (125 * j);
	
	       this.ctx.drawImage(this.img["mound"], x, y);
	    }
	  }
	
	
	};
	
	
	
	GameParts.prototype.draw = function () {
	
	  this.clearBoard();
	  this.drawBackground();
	
	  this.allObjects().forEach((object) => {
	    object.draw(this.ctx);
	  });
	
	  this.drawMounds();
	};
	
	GameParts.prototype.updateScore = function () {
	  document.getElementById("score1").textContent = this.score[0];
	  document.getElementById("score2").textContent = this.score[1];
	};
	
	GameParts.prototype.whack = function (player) {
	  let loc, pos = player.pos;
	
	  loc = this.critters.findIndex( (critter) => {
	    if (critter.pos[0] === pos[0] && critter.pos[1] === pos[1]) {
	      return true;
	    } else {
	      return false;
	    }
	  });
	
	  if (loc >= 0) {
	    if (this.critters[loc].hit === false) {
	      this.critters[loc].hit = true;
	      this.score[player.playerId] += this.critters[loc].points;
	      this.critters[loc].remove();
	    }
	
	  }
	
	
	};
	
	
	
	
	GameParts.prototype.removeCritter = function (critter) {
	  // this.critters.splice(this.critters.indexOf(critter), 1);
	  setTimeout( () => this.critters.splice(this.critters.indexOf(critter), 1), 1000);
	};
	
	GameParts.prototype.drawEnd = function () {
	  let text = "";
	  if (this.score[0] > this.score[1]) {
	    text = "Player 1 won!";
	  } else if (this.score[0] < this.score[1]) {
	    text = "Player 2 won!";
	  }
	
	  this.ctx.font = "bolder 60px sans-serif";
	  this.ctx.textBaseline = "center";
	  this.ctx.textAlign = "center";
	  this.ctx.fillText("Game Over!", this.DIM_X/2, this.DIM_Y/2);
	  this.ctx.fillText(text , this.DIM_X/2, this.DIM_Y/2 + 60);
	};
	
	
	
	
	GameParts.prototype.getRandCoords = function () {
	  let pos, loc;
	
	  do {
	    pos = [Math.floor(Math.random() * (this.MAXX + 1)),
	    Math.floor(Math.random() * (this.MAXY + 1))];
	
	    loc = this.critters.findIndex( (critter) => {
	      if (critter.pos[0] === pos[0] && critter.pos[1] === pos[1]) {
	        return true;
	      } else {
	        return false;
	      }
	    });
	
	  } while (loc >= 0);
	
	  return pos;
	};
	
	
	
	module.exports = GameParts;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	const Critter = function (options) {
	  this.pos = options.pos;
	  this.gameParts = options.gameParts;
	  this.img = options.img;
	  this.hitImg = options.hitImg;
	  this.points = options.points; //point value
	  this.scale = [125, 100];
	
	  //lifetime in ms
	  this.life = options.life;
	  this.hit = false;
	
	   window.setTimeout(this.remove.bind(this), options.life);
	};
	
	
	Critter.prototype.draw = function (ctx) {
	    const x = 25 + (175 * this.pos[0]);
	    const y = 120 + (125 * this.pos[1]);
	    ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);
	
	    if (this.hit) {
	      ctx.drawImage(this.hitImg, x, y, this.scale[0], this.scale[1]);
	    }
	};
	
	
	
	
	Critter.prototype.remove = function () {
	  this.gameParts.removeCritter(this);
	};
	
	
	
	
	
	module.exports = Critter;


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	const Player = function (options) {
	  this.pos = options.pos;
	  this.gameParts = options.gameParts;
	  this.img = options.img;
	  this.scale = [125, 100];
	  this.playerName = options.name;
	  this.playerId = options.id;
	
	};
	
	
	Player.prototype.draw = function (ctx) {
	  const x = 25 + (175 * this.pos[0]);
	  const y = 120 + (125 * this.pos[1]);
	  ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);
	};
	
	
	Player.prototype.move = function (increment) {
	  const newY = this.pos[1] + increment[1];
	  const newX = this.pos[0] + increment[0];
	
	  if (newY <= 2 && newY >= 0) {
	    this.pos[1] = newY;
	  }
	
	  if (newX >= 0 && newX <=3) {
	    this.pos[0] =newX;
	  }
	};
	
	
	Player.prototype.whack = function () {
	  this.gameParts.whack(this);
	};
	
	
	
	
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map