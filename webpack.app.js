const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// config for webpack building both app2d and app3d
module.exports = (env, options) => {
    const dev = options.mode === 'development';
    const { build } = env;

    const config = {
        entry: `./src/app${build}/app.${build}.ts`,
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
                    { from: './assets', to: 'res' }
                ]
            }),
            new HtmlWebpackPlugin({
                title: `Aura${build.toUpperCase()} App`
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: `app${build}.js`,
            path: path.resolve(__dirname, dev ? 'dev' : `dist/app${build}`),
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
