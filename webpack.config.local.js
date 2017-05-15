const resolve = require('path').resolve;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    resolve:  {
        extensions: ['.js', '.jsx', '.less'],
        alias: {

        }
    },
    entry: [
        './src/export.js'
    ],
    output: {
        filename: 'bundle.js',
        // the output bundle
        libraryTarget: 'umd',

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
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {
              test: /\.png$/,
              loader: "url-loader",
              query: { mimetype: "image/png" }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css'
        }),
        new ExtractTextPlugin({
            filename: 'bundle.less'
        })
    ]
};
