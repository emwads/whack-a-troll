
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
