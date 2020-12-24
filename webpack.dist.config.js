const path = require('path');

//just builds the engine to ./build sans source maps (future: uglify)

module.exports = {
    entry: './src/engine/protogl.ts',
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
        alias: {
            '@input': path.resolve(__dirname, 'src/engine/util/input'),
            '@math': path.resolve(__dirname, 'src/engine/util/math'),
            '@util': path.resolve(__dirname, 'src/engine/util'),
            '@protogl': path.resolve(__dirname, 'src/engine'),
            '@demo': path.resolve(__dirname, 'src/demo')
        },
        extensions: ['.ts'],
    },
    output: {
        filename: 'protogl.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
