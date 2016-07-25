
const Critter = function (options) {
  this.pos = options.pos;
  this.gameParts = options.gameParts;
  this.img = options.img;
  this.hitImg = options.hitImg;
  this.points = options.points; //point value
  this.scale = [125, 100];

  //lifetime in ms
  this.life = options.life;
  this.hit = false;

   window.setTimeout(this.remove.bind(this), options.life);
};


Critter.prototype.draw = function (ctx) {
    const x = 25 + (175 * this.pos[0]);
    const y = 120 + (125 * this.pos[1]);
    ctx.drawImage(this.img, x, y, this.scale[0], this.scale[1]);

    if (this.hit) {
      ctx.drawImage(this.hitImg, x, y, this.scale[0], this.scale[1]);
    }
};




Critter.prototype.remove = function () {
  this.gameParts.removeCritter(this);
};





module.exports = Critter;
