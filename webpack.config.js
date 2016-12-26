var webpack = require('webpack');
var path = require('path');

var pkg = require('./ezcrop.json');

var paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: paths.src + '/ezcrop.js',
  output: {
    path: paths.dist,
    filename: 'ezcrop.js',
    library: 'ezcrop',
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?blacklist[]=strict',
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin(pkg.name + ' - v' + pkg.version +
      ' <' +pkg.homepage + '>'),
  ],
};
