const path = require('path');

// builds the engine for distribution as browser-friendly JS (places into publish/_min for npm distribution via unpkg)

module.exports = {
    mode: 'production',
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
        filename: 'protogl.min.js',
        path: path.resolve(__dirname, 'publish/_min'),
        library: 'ProtoGL'
    }
};
