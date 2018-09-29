const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {

    mode: 'development',

    entry: {
        entry: path.join(__dirname, 'src/index.js'),
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash:5].js',
    },

    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
        new CleanWebpackPlugin([ 'dist' ]),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: 'eval-source-map',

    devServer: {
        hot: true,
        open: true,
        port: 9000,
        host: 'free',
        disableHostCheck: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015', 'react' ],
                        plugins: [ 'transform-class-properties', 'transform-decorators-legacy', ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' } ] ],
                    },
                },
            },
            {
                test: /\.css/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.less/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
            },
        ],
    },
}
