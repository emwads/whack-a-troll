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
	  this.gameTime = 60000; //Game length in milliseconds
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
	  this.loaded[imageKey] = true;
	
	  if (Object.keys(this.loaded).length === Object.keys(ImageConstants).length) {
	    console.log("all loaded!");
	
	    this.gameParts = new GameParts(this.ctx, this.img);
	
	    this.players = this.gameParts.addPlayers();
	
	    this.start();
	  }
	
	};
	
	
	GameControl.prototype.bindKeyHandlers = function () {
	  const player1 = this.players[0];
	  const player2 = this.players[1];
	
	  Object.keys(GameControl.PLAYER1MOVES).forEach((k) => {
	    let increment = GameControl.PLAYER1MOVES[k];
	    key(k, function () { player1.move(increment); });
	  });
	
	  // key("e", function () { player1.strike() });
	
	  Object.keys(GameControl.PLAYER2MOVES).forEach((k) => {
	    let increment = GameControl.PLAYER2MOVES[k];
	    key(k, function () { player2.move(increment); });
	  });
	
	  // key("o", function () { player2.strike() });
	};
	
	
	
	GameControl.prototype.updateTime = function (timeLeft) {
	  if (timeLeft < 0) {
	    timeLeft = 0;
	  }
	  document.getElementById("time").textContent = Math.round(timeLeft);
	};
	
	
	GameControl.prototype.start = function () {
	  // this.gameParts = new GameParts(this.ctx, this.img);
	  this.bindKeyHandlers();
	  this.time = new Date;
	
	  this.animate();
	
	
	};
	
	
	GameControl.prototype.animate = function(){
	  let timeLeft = (this.gameTime - (new Date - this.time))/1000;
	
	  this.updateTime(timeLeft);
	  // this.gameParts.step();
	  this.gameParts.draw();
	  // console.log(timeLeft);
	
	
	  if (timeLeft > 0) {
	    requestAnimationFrame(this.animate.bind(this));
	  } else {
	    console.log('game over');
	  }
	
	};
	
	
	GameControl.prototype.startRound = function () {
	
	
	  // this.bindKeyHandlers();
	  // this.lastTime = 0;
	  // //start the animation
	  // requestAnimationFrame(this.animate.bind(this));
	//
	// GameControl.prototype.animate = function(time){
	//   const timeDelta = time - this.lastTime;
	//
	//   this.gameParts.step(timeDelta);
	//   this.gameParts.draw(this.ctx);
	//   this.lastTime = time;
	//
	//   //every call to animate requests causes another call to animate
	//   requestAnimationFrame(this.animate.bind(this));
	};
	
	
	
	
	
	module.exports = GameControl;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const ImageConstants = {
	  troll: 'image/troll.png',
	  mallet1: 'image/hammer.png',
	  mallet2: 'image/hammer2.png',
	  mole: 'image/mole.png',
	  back: 'image/hill.png',
	  mound: 'image/mound.png'
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
	
	
	  this.BG_COLOR = "white";
	
	  const canvasEl = document.getElementById("myCanvas");
	  this.DIM_X = canvasEl.clientWidth;
	  this.DIM_Y = canvasEl.clientHeight;
	  GameParts.FPS = 32;
	};
	
	
	GameParts.prototype.addCritter = function (critter) {
	  let coords;
	  do {
	    coords = getRandCoords();
	  } while (this.mounds[coords[0]][coords[1]] !== undefined);
	
	  this.mounds[coords[0]][coords[1]] = critter;
	  return coords;
	};
	
	
	GameParts.prototype.addPlayers = function () {
	
	  this.players = [new Player({name: "player1", id: 0, pos: [2, 1],
	                              gameParts: this,
	                              img: this.img['mallet1']}),
	                  new Player({name: "player2", id: 1, pos: [2, 2],
	                              gameParts: this,
	                              img: this.img['mallet2']})];
	  return this.players;
	};
	
	GameParts.prototype.allObjects = function () {
	
	  return [].concat(this.players, this.critters);
	};
	
	
	GameParts.prototype.clearBoard = function () {
	  this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.ctx.fillStyle = this.BG_COLOR;
	  this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	};
	
	GameParts.prototype.drawBackground = function () {
	  this.ctx.drawImage(this.img["back"], 0, 0);
	};
	
	
	GameParts.prototype.draw = function () {
	
	  this.clearBoard();
	  this.drawBackground();
	
	  this.allObjects().forEach((object) => {
	    object.draw(this.ctx);
	  });
	};
	
	GameParts.prototype.updateScore = function () {
	  document.getElementById("score1").textContent = this.score[0];
	  document.getElementById("score2").textContent = this.score[1];
	};
	
	
	
	GameParts.prototype.moveObjects = function () {
	  this.allObjects().forEach((object) => {
	    object.move();
	  });
	};
	
	
	GameParts.prototype.remove = function (object) {
	
	};
	
	GameParts.prototype.step = function () {
	  this.moveObjects();
	};
	
	
	function getRandCoords(max) {
	  return [Math.floor(Math.random() * (max + 1)), Math.floor(Math.random() * (max + 1))];
	}
	
	module.exports = GameParts;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	const Critter = function (options) {
	  this.pos = options.pos;
	  this.gameParts = options.gameParts;
	  this.img = options.img;
	  this.points = options.points;
	  this.scale = [50, 50];
	  this.hit = false;
	};
	
	
	Critter.prototype.draw = function (ctx) {
	  const x = 250 + (50 * this.pos[0]);
	  const y = 300 + (65 * this.pos[1]);
	  ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);
	
	
	};
	
	
	
	
	Critter.prototype.remove = function () {
	  this.gameParts.remove(this);
	};
	
	
	
	
	
	module.exports = Critter;


/***/ },
/* 5 */
/***/ function(module, exports) {

	
	const Player = function (options) {
	  this.pos = options.pos;
	  this.gameParts = options.gameParts;
	  this.img = options.img;
	  this.scale = [25, 25];
	  this.playerName = options.name;
	  this.playerId = options.id;
	
	};
	
	
	Player.prototype.draw = function (ctx) {
	  const x = 75 + (125 * this.pos[0]);
	  const y = 125 + (100 * this.pos[1]);
	  // console.log(`${x}, ${y}`)
	  ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);
	};
	
	Player.prototype.move = function (increment) {
	  const newY = this.pos[1] + increment[1];
	  const newX = this.pos[0] + increment[0];
	
	  if (newY <= 3 && newY >= 0) {
	    this.pos[1] = newY;
	  }
	
	  if (newX >= 0 && newX <=4) {
	    this.pos[0] =newX;
	  }
	  console.log(this.pos);
	};
	
	Player.prototype.remove = function () {
	  this.gameParts.remove(this);
	};
	
	
	
	
	
	module.exports = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map