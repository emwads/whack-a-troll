
const Critter = function (options) {
  this.pos = options.pos;
  this.gameParts = options.gameParts;
  this.img = options.img;
  this.points = options.points;
  this.scale = [50, 50];
  this.hit = false;
};


Critter.prototype.draw = function (ctx) {
  const x = 250 + (50 * this.pos[0]);
  const y = 300 + (65 * this.pos[1]);
  ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);


};




Critter.prototype.remove = function () {
  this.gameParts.remove(this);
};





module.exports = Critter;
