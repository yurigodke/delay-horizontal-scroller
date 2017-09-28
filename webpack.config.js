const webpack = require('webpack');

module.exports = {
  entry: [
    "./index.js"
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/src"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
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
