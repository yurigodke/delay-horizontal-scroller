const webpack = require('webpack');

module.exports = {
  entry: [
    "./src/main.js"
  ],
  output: {
    filename: "index.js",
    path: __dirname,
    library: "HorizontalScroller",
    libraryTarget: "umd"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)((\?|\#).*)?$/,
      use: {
        loader: 'url-loader?limit=100000'
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
