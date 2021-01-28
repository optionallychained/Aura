const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => ({
    entry: {
        css: './src/docs/assets/scss/main.scss',
        js: './src/docs/assets/ts/main.ts'
    },
    devtool: options.mode === 'development' ? 'inline-source-map' : false,
    output: {
        path: path.resolve(__dirname, 'docs/assets')
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                sourceMap: options.mode === 'development'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        grid: 'autoplace'
                                    })
                                ],
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'compressed'
                            }
                        }
                    }
                ]
            }
        ]
    }
});
