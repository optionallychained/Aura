const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const dev = options.mode === 'development';

    const config = {
        entry: './src/app3d/app.3d.ts',
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
                    { from: './src/app3d/res', to: 'res' }
                ]
            }),
            new HtmlWebpackPlugin({
                title: 'Aura3D App'
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'app3d.min.js',
            path: path.resolve(__dirname, dev ? 'dev' : 'dist/app3d'),
        }
    };

    if (dev) {
        config.devServer = {
            static: {
                directory: './dev'
            }
        };
    }

    return config;
};
