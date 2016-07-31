const Critter = require("./critter");
const Player = require("./player");
const ComputerPlayer = require("./computer-player");
const ImageConstants = require("./image-constants");



const GameParts = function (ctx, img) {

  this.img = img;
  this.ctx = ctx;

  this.players = [];
  this.critters = [];
  this.crittersTimeouts = [];

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



GameParts.prototype.addPlayers = function (ai) {

  this.players = [new Player({name: "player1", id: 0, pos: [1, 1],
                              gameParts: this,
                              img: this.img['mallet1']})];

  if (ai) {
    this.players.push(new ComputerPlayer({name: "computer", id: 1, pos: [2, 1],
                                gameParts: this,
                                img: this.img['mallet2']}));

    document.getElementById("player2").textContent = "Computer: ";
    this.players[1].playGame();
  } else {
    this.players.push(new Player({name: "player2", id: 1, pos: [2, 1],
                                gameParts: this,
                                img: this.img['mallet2']}));

  }
  return this.players;
};

GameParts.prototype.addSingleCritter = function (troll) {
  const lifeSpan =  Math.random() * (5000 - 2000) + 2000;
  const pos = this.getRandCoords();

  let img, hitImg1, hitImg2, points;
  if (troll) {
    img = this.img["troll"];
    hitImg1 = this.img["hit1"];
    hitImg2 = this.img["hit2"];
    points = 10;
  } else {
    img = this.img["mole"];
    hitImg1 = this.img["miss1"];
    hitImg2 = this.img["miss2"];
    points = -10;
  }

  this.critters.push(
    new Critter( {pos: pos,
                  gameParts: this,
                  img: img,
                  hitImg1: hitImg1,
                  hitImg2: hitImg2,
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

  const refreshTime = Math.random() * (1000 - 500) + 250;
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
      this.critters[loc].hit = player.playerId;

      this.score[player.playerId] += this.critters[loc].points;
      this.critters[loc].remove();
    }

  }


};




GameParts.prototype.removeCritter = function (critter) {
  window.setTimeout( () => this.critters.splice(this.critters.indexOf(critter), 1), 1000);
};

GameParts.prototype.drawEnd = function () {
  let text = "";
  if (this.score[0] > this.score[1]) {
    text = "Player 1 won!";
  } else if (this.score[0] < this.score[1]) {
    text = `${this.players[1].playerName} won!`;
  }

  this.ctx.font = "bolder 60px sans-serif";
  this.ctx.textBaseline = "center";
  this.ctx.textAlign = "center";
  this.ctx.fillText("Game Over!", this.DIM_X/2, this.DIM_Y/4);
  this.ctx.strokeText("Game Over!", this.DIM_X/2, this.DIM_Y/4);
  this.ctx.fillText(text , this.DIM_X/2, this.DIM_Y/4 + 60);
  this.ctx.strokeText(text , this.DIM_X/2, this.DIM_Y/4 + 60);

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
