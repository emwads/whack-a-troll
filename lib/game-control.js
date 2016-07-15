const ImageConstants = require("./image-constants");
const GameParts = require("./game-parts");


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
