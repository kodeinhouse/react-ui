const resolve = require('path').resolve;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    resolve:  {
        extensions: ['.js', '.jsx', '.less']
    },
    entry: [
        './src/export.js'
    ],
    output: {
        filename: 'bundle.js',
        // the output bundle

        path: resolve(__dirname, 'dist'),

        publicPath: '/dist/'
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
