const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// builds the demo for distribution

module.exports = {
    entry: './src/demo/demo.ts',
    mode: 'production',
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
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo'
        })
    ],
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
