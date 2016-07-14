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
	// const GameParts = require("./game-parts");
	
	
	const GameControl = function (ctx) {
	  this.ctx = ctx;
	  // this.players = this.gameParts.addPlayers();
	  this.loaded = {};
	  this.img = {};
	  this.loadImages();
	
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
	    console.log(this.loaded);
	  }
	  // this.gameParts = new GameParts;
	
	};
	
	
	GameControl.prototype.bindKeyHandlers = function () {
	  const player1 = this.players[0];
	  const player2 = this.players[1];
	
	  // Object.keys(GameControl.MOVES).forEach((k) => {
	  //   let move = GameControl.MOVES[k];
	  //   key(k, function () { ship.power(move); });
	  // });
	  //
	  // key("space", function () { ship.fireBullet() });
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
	  troll: 'image/troll.jpg',
	  mallet: 'image/hammer.png',
	  mole: 'image/mole.png',
	  back: 'image/hill.png'
	};
	
	module.exports = ImageConstants;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map