const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  resolve:  {
      extensions: ['.js', '.jsx']
  },
  entry: [
    './src/export.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [ 'babel-loader', ],
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },

  plugins: [

  ],
};
