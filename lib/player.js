
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
