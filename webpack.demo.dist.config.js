const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// builds the demo for distribution as browser-friendly JS (with HTML file)

module.exports = {
    entry: './src/demo/demo.ts',
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
            title: 'ProtoGL-TS Demo'
        })
    ],
    output: {
        filename: 'demo.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
