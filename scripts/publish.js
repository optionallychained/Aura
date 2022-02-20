const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const webpack = require('webpack');
const { version2d, version3d } = require('../version');

if (!process.argv.includes('--mode=2d') && !process.argv.includes('--mode=3d')) {
    console.error('Please specify a mode of either 2d or 3d');
    process.exit(1);
}

const mode = /--mode=(2d|3d)/.exec(process.argv)[1];
const output = path.resolve(__dirname, '../publish', mode);
const packageName = `@aura/${mode}`;

(async () => {
    // compile (tsc) + pack (webpack) Aura
    console.info(`Compiling ${packageName}...`);
    await Promise.all([
        new Promise((resolve, reject) => {
            exec(`tsc --project ./tsconfig.publish.${mode}.json`, { stdio: 'inherit' }, (err) => err ? reject(err) : resolve());
        }),
        new Promise((resolve, reject) => {
            webpack({
                mode: 'production',
                entry: path.resolve(__dirname, '../src/aura', `aura.${mode}.ts`),
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
        })
    ]).catch((err) => {
        console.error(err);
        process.exit(1);
    });

    // prepare output directory for publish
    console.info(`Preparing ${packageName} for publish...`);
    await Promise.all([
        // rename index + typedefs
        fs.rename(path.resolve(output, `aura.${mode}.js`), path.resolve(output, 'index.js')),
        fs.rename(path.resolve(output, `aura.${mode}.d.ts`), path.resolve(output, 'index.d.ts')),

        // write package.json, carrying over dependencies from project root if applicable
        fs.writeFile(path.resolve(output, 'package.json'), JSON.stringify({
            name: packageName,
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
            dependencies: JSON.parse((await fs.readFile(path.resolve(__dirname, '../', 'package.json'))).toString()).dependencies
        }, null, '\t')),

        // delete all files related to the opposite of mode (all 3d files for Aura2D, vice versa)
        (async function scrub(dir, match) {
            (await fs.readdir(dir)).forEach(async (f) => {
                const path = `${dir}/${f}`;

                if ((await fs.stat(path)).isDirectory()) {
                    if (match(path)) {
                        fs.rm(path, { recursive: true });
                    }
                    else {
                        scrub(path, match);
                    }
                }
            });
        })(output, (path) => path.includes(mode === '2d' ? '/3d' : '/2d'))
    ]).catch((err) => {
        console.error(err);
        process.exit(1);
    });

    console.info(`Done! ${packageName} ready to publish`);
})();
