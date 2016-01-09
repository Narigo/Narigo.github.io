var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (outDir) {
  return {
    entry : {
      app : './src/main/js/app.js'
    },
    output : {
      path : outDir,
      filename : 'js/[name].js'
    },
    module : {
      loaders : [{
        test : /\.jsx?$/,
        loader : 'babel-loader',
        include : [path.resolve(__dirname, 'src/main')],
        query : {presets : ['es2015']}
      }, {
        test : /\.scss$/,
        loader : ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }]
    },
    plugins : [
      new ExtractTextPlugin("css/[name].css")
    ]
  };
};
