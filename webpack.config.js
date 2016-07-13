var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/whack-a-troll.js",
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-maps'
};
