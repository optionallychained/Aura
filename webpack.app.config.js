const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const dev = options.mode === 'development';

    const config = {
        entry: './src/app/app.ts',
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
                    { from: './src/app/res', to: 'res' }
                ]
            }),
            new HtmlWebpackPlugin({
                title: 'Aura App'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'app.js',
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
