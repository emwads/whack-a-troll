const ImageConstants = require("./image-constants");
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
