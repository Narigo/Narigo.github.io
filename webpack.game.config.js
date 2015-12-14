var path = require('path');

module.exports = {
  entry : {
    index : path.resolve(__dirname, 'src/game/index.html'),
    game : path.resolve(__dirname, 'src/game/index.js')
  },
  output : {
    path : 'out-game',
    filename : 'js/[name].js'
  },
  module : {
    loaders : [{
      test : /\.jsx?$/,
      exclude : /node_modules/,
      loader : 'react-hot'
    }, {
      test : /\.jsx?$/,
      exclude : /node_modules/,
      loader : 'babel',
      query : {
        presets : ['es2015', 'react', 'stage-2']
      }
    }, {
      test : /\.scss$/,
      loaders : ['style', 'css', 'sass']
    }, {
      test : /\.html$/,
      loader : "file?name=[name].[ext]"
    }]
  },
  resolve : {
    extensions : ['', '.js', '.jsx']
  }
};
