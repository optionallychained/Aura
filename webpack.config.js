const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// builds the demo for development with webpack-dev-server

module.exports = {
    entry: './src/demo/demo.ts',
    devtool: 'inline-source-map',
    mode: 'development',
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
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ProtoGL-TS'
        })
    ],
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dev'),
    }
};
