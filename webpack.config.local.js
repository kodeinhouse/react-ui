const resolve = require('path').resolve;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname,
    resolve:  {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            menu: resolve(__dirname, 'src/menu.js'),
            grid: resolve(__dirname, 'src/grid.js'),
            chart: resolve(__dirname, 'src/chart.js'),
            form: resolve(__dirname, 'src/form.js'),
            util: resolve(__dirname, 'src/util.js'),
            container: resolve(__dirname, 'src/container.js'),
            components: resolve(__dirname, 'src/export.js')
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
                }),
                exclude: [resolve(__dirname, 'styles/_components'), resolve(__dirname, 'styles/_core')]
            },
            {
                test: /\.(png|gif)$/,
                loader: "url-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [resolve(__dirname, 'styles/_components'), resolve(__dirname, 'styles/_core')]
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
