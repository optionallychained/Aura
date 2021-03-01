const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const dev = options.mode === 'development';

    const config = {
        entry: './src/demo/demo.ts',
        devtool: dev ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/demo/res', to: 'res' }
                ]
            }),
            new HtmlWebpackPlugin({
                title: 'ProtoGL Demo'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'demo.js',
            path: path.resolve(__dirname, dev ? 'dev' : 'dist'),
        }
    };

    if (dev) {
        config.devServer = {
            contentBase: './dev'
        };
    }

    return config;
};
