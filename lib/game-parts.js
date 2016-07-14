const Critter = require("./critter");
const Player = require("./player");
const ImageConstants = require("./image-constants");



const GameParts = function (ctx, img = {}) {

  this.img = img;
  this.loadImages();
  this.mounds = [[undefined, undefined, undefined],
                [undefined, undefined, undefined],
                [undefined, undefined, undefined]] ;
  // this.players = this.game.addPlayers();
  this.ctx = ctx;

};

GameParts.BG_COLOR = "white";
GameParts.DIM_X = 600;
GameParts.DIM_Y = 400;
GameParts.FPS = 32;


GameParts.prototype.addCritter = function (critter) {
  let coords;
  do {
    coords = getRandCoords();
  } while (this.mounds[coords[0]][coords[1]] !== undefined)

  this.mounds[coords[0]][coords[1]] = critter;
  return cords;
};


GameParts.prototype.addPlayers = function () {
  this.players = [new Player("1", [2, 1]), new Player("2", [2, 2])];
  return this.players;
};

GameParts.prototype.allObjects = function () {
  return [].concat(this.players, this.mounds, this.bullets);
};


GameParts.prototype.clearBoard = function () {
  this.ctx.clearRect(0, 0, GameParts.DIM_X, GameParts.DIM_Y);
  this.ctx.fillStyle = GameParts.BG_COLOR;
  this.ctx.fillRect(0, 0, GameParts.DIM_X, GameParts.DIM_Y);
};

GameParts.prototype.drawBackground = function () {
  this.ctx.drawImage(this.img["back"], 0, 0);
};




GameParts.prototype.draw = function () {

  this.clearBoard();
  this.drawBackground();
  //
  // this.allObjects().forEach((object) => {
  //   object.draw(ctx);
  // });
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
