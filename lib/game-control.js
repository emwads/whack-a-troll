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
