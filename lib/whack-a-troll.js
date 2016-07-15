// const GameParts = require("./game-parts");
const GameControl = require("./game-control");
const ImageConstants = require("./image-constants");


document.addEventListener("DOMContentLoaded", function(){

  const canvasEl = document.getElementById("myCanvas");
  const ctx = canvasEl.getContext("2d");

  new GameControl(ctx);

});
