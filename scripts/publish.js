const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const webpack = require('webpack');
const { version2d, version3d } = require('../version');

if (!process.argv.includes('--mode=2d') && !process.argv.includes('--mode=3d')) {
    console.error('Please specify a mode of either 2d or 3d');
    process.exit(1);
}

const mode = /--mode=(2d|3d)/.exec(process.argv)[1];
const output = path.resolve(__dirname, '../publish', mode);

(async () => {
    // compile Aura
    console.info(`Compiling Aura ${mode}...`);
    execSync(`tsc --project ./tsconfig.publish.${mode}.json`, { stdio: 'inherit' });

    // produce aura.<mode>.min.js with webpack
    console.info(`Packing Aura ${mode}...`);
    await new Promise((resolve, reject) => {
        webpack({
            mode: 'production',
            entry: path.resolve(__dirname, '../src/aura', `index.${mode}.ts`),
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: 'ts-loader',
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.js']
            },
            output: {
                filename: `aura.${mode}.min.js`,
                path: path.resolve(output, '_min'),
                library: `Aura${mode.toUpperCase()}`
            }
        }).run((err) => err ? reject(err) : resolve());
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });

    // rename index + typedefs
    console.info(`Renaming ${mode} indices...`);
    fs.moveSync(path.resolve(output, `index.${mode}.js`), path.resolve(output, 'index.js'));
    fs.moveSync(path.resolve(output, `index.${mode}.d.ts`), path.resolve(output, 'index.d.ts'));

    // write an appropriate package.json, carrying dependencies (if any) from ./package.json
    console.info(`Writing Aura ${mode} package.json...`)
    fs.writeFileSync(path.resolve(output, 'package.json'), JSON.stringify({
        name: `@aura/${mode}`,
        version: `${mode === '2d' ? version2d : version3d}`,
        author: 'optionallychained',
        license: 'MIT',
        homepage: 'https://optionallychained.github.io/Aura',
        repository: {
            type: 'git',
            url: 'git://git@github.com/optionallychained/Aura.git'
        },
        main: 'index.js',
        types: 'index.d.ts',
        dependencies: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../', 'package.json')).toString()).dependencies
    }, null, '\t'));

    // delete all files related to the opposite of mode(for Aura3D, delete 2d files and vice versa)
    console.info(`Deleting all ${mode === '2d' ? '3d' : '2d'} files from ${output}...`);
    (function scrub(dir, match) {
        fs.readdirSync(dir).forEach((f) => {
            const path = `${dir}/${f}`;

            if (fs.statSync(path).isDirectory()) {
                if (match(path)) {
                    fs.rmSync(path, { recursive: true });
                }
                else {
                    scrub(path, match);
                }
            }
        });

        return;
    })(output, (path) => path.includes(mode === '2d' ? '/3d' : '/2d'));

    console.info(`Done! Aura ${mode} ready to publish`);
})();
