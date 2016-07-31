const Player = require('./player.js');

const ComputerPlayer = function (options) {

  // function Surrogate () {}
  // Surrogate.prototype = Player.prototype;
  // this.prototype = new Surrogate;
  // this.prototype.constructor = ComputerPlayer;
  // Player.call(this, options, this.playGame);

  this.pos = options.pos;
  this.gameParts = options.gameParts;
  this.img = options.img;
  this.scale = [125, 100];
  this.playerName = options.name;
  this.playerId = options.id;
  this.hitting = false;

};

ComputerPlayer.prototype.whack = function() {
};

ComputerPlayer.prototype.move = function (increment) {
};


ComputerPlayer.prototype.compWhack = function() {
  this.gameParts.whack(this);
  this.hitting = true;
  window.setTimeout(this.resetHit.bind(this), 250);
};

ComputerPlayer.prototype.calculateMove = function (increment) {


};

ComputerPlayer.prototype.validateMove = function (increment) {
  const newY = this.pos[1] + increment[1];
  const newX = this.pos[0] + increment[0];

  if (newY <= 2 && newY >= 0) {
    this.pos[1] = newY;
  }

  if (newX >= 0 && newX <=3) {
    this.pos[0] = newX;
  }
};



ComputerPlayer.prototype.playGame = function(){
  let self = this;

  const trollHere = this.gameParts.critters.findIndex( (el) => {
    if (el.pos[0] === self.pos[0] &&
        el.pos[1] === self.pos[1] &&
        el.points > 0 &&
        el.hit === false
      ) {

      return true;
    } else {
      return false;
    }
  });

  if (trollHere >= 0) {
    this.compWhack();
  } else {
    let pos;

    const trollNear = this.gameParts.critters.findIndex( (el) => {
      const xDist = el.pos[0] - self.pos[0];
      const yDist = el.pos[1] - self.pos[1];
      if ( ( Math.abs(xDist) <= 1 && Math.abs(yDist) <= 1 ) && el.points > 0 &&
             el.hit === false) {
        // console.log('trollnear!!!');
        pos = [xDist, yDist];
        return true;
      } else {
        return false;
      }
    });

    if (trollNear === -1) {
      const opts = [[0,1], [0,-1], [1,0], [-1, 0]];
      pos = opts[Math.floor(Math.random()*4)];
    }
    this.validateMove(pos);
  }

  if (this.gameParts.trolling) {
    window.setTimeout(this.playGame.bind(this), 350);
  }
};

ComputerPlayer.prototype.draw = function (ctx) {
  const x = 25 + (175 * this.pos[0]);
  const y = 120 + (125 * this.pos[1]);

  ctx.save();


  if (this.hitting === true) {
    if (this.playerId === 0) {
      ctx.translate(x, y + 10);
    } else {
      ctx.translate(x, y + 10);
    }
  }
  else { ctx.translate(x, y); }


  ctx.drawImage(this.img, 0, 0, this.scale[0], this.scale[1]);

  ctx.restore();
};




ComputerPlayer.prototype.resetHit = function () {
  this.hitting = false;
};



module.exports = ComputerPlayer;
