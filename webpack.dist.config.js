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
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'protogl.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
