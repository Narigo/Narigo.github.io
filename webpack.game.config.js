var path = require('path');

module.exports = {
  entry : {
    game : './src/game/index.js'
  },
  output : {
    path : 'out-game',
    filename : 'js/[name].js'
  },
  module : {
    loaders : [{
      test : /\.jsx?$/,
      loader : 'babel-loader',
      include : [path.resolve(__dirname, 'src/game')],
      query : {presets : ['es2015']}
    }, {
      test : /\.scss$/,
      loader : ['style', 'css', 'sass']
    }]
  }
};
