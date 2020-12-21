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
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
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