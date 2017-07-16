const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  resolve:  {
      extensions: ['.js', '.jsx'],
      alias: {
          components: resolve(__dirname, 'src/export.js')
      }
  },
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:5000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './dev/index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dev'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    host: '0.0.0.0',
    // Allow accesing externally (security risk)

    disableHostCheck: true,
    // This allows setting the host to 0.0.0.0

    contentBase: resolve(__dirname, 'dev'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    historyApiFallback: true
  },

  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: [ 'babel-loader', ],
            exclude: /(node_modules)/
        },
        {
            test: /\.less$/,
            use: [ 'style-loader', 'css-loader', 'less-loader'],
        },
        {
            test: /\.(png|gif)$/,
            loader: "url-loader"
        }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
