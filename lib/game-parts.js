const Critter = require("./critter");
const Player = require("./player");
const ImageConstants = require("./image-constants");



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
