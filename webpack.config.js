const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// builds the demo (which will by extension include all necessary engine parts) to ./dev w/ devServer

module.exports = {
    entry: './src/demo/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dev'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        alias: {
            '@input': path.resolve(__dirname, 'src/engine/util/input'),
            '@math': path.resolve(__dirname, 'src/engine/util/math'),
            '@util': path.resolve(__dirname, 'src/engine/util'),
            '@protogl': path.resolve(__dirname, 'src/engine'),
            '@demo': path.resolve(__dirname, 'src/demo')
        },
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ProtoGL-TS'
        })
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dev'),
    }
};
