const pug = require('pug');
const marked = require('marked').marked;
const hljs = require('highlight.js');
const fs = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');

const dev = process.argv.includes('--dev') || process.argv.includes('dev');

// source paths
const source = './src/docs';
const pageSource = path.join(source, 'pages');
const assetSource = path.join(source, 'assets');
const imgSource = path.join(assetSource, 'img');

// destination paths
const dest = './docs';
const assetDest = path.join(dest, 'assets');
const jsDest = path.join(assetDest, 'js');
const cssDest = path.join(assetDest, 'css');
const imgDest = path.join(assetDest, 'img');

// pretty filename => pagetitle mappings
const pageNameMappings = {
    'index': 'Home'
}

// title case transformer for page titles
const titleCase = (str) => str.replace('-', ' ').replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substr(1));

// set up marked to highlight code with highlight.js
marked.setOptions({
    // fix a bug where the hljs class is not added to the <code> element for some reason
    langPrefix: 'hljs ',
    // replace return characters with <br/> in highlighted code because Pug is finnicky with newlines
    highlight: (code) => hljs.highlightAuto(code).value.replace(/(?:\r\n|\r|\n)/g, '<br/>')
});

// convenient shorthand for making a directory only if it doesn't already exist
const mkdir = async (dir) => {
    await fs.mkdir(dir);
}

// simple logging function, only logging if we're not in dev mode
const log = (...args) => {
    if (!dev) {
        console.log(...args);
    }
}

// process a given directory of pages, rendering one HTML file per MD file into the 'content' block of 'layout.pug' and retaining the correct directory structure
const processPages = async (src, depth = 1) => {
    log('Processing Pages:', src, '\n');

    for (const file of await fs.readdir(src, 'utf8')) {
        const srcPath = path.join(src, file);
        const pageName = file.replace('.md', '');
        const pageNamePretty = titleCase(pageNameMappings[pageName] ?? pageName);
        const destName = file.replace('.md', '.html');
        const destPath = path.join(src.replace(/src|pages/g, '').substr(1), destName);

        if ((await fs.stat(srcPath)).isFile()) {
            // file encountered: render it
            log('Rendering File:', destPath);

            // remove any return characters because Pug is finnicky
            const markdown = marked((await fs.readFile(srcPath)).toString()).replace(/(?:\r\n|\r|\n)/g, '');

            // nb: the strange layout of the template string is the only way I've found to avoid Pug complaining about extension/blocks due to indent problems
            const page = pug.render(
                `extends /layout\nblock content
                ${markdown}`,
                {
                    basedir: './src/docs/',
                    // body class for nav link highlighting
                    bodyClass: pageName,
                    // page title for the <title>
                    pageTitle: pageNamePretty,
                    // relative prefix for links and asset inclusions
                    relativePrefix: `${'.'.repeat(depth)}/`
                }
            );

            // write the file
            await fs.writeFile(destPath, page);
        }
        else {
            // directory encountered: mirror into dest, then recurse
            mkDirOptional(destPath);
            await processPages(srcPath, depth + 1);
            log('\n');
        }
    }
}

// copy a given directory of images, retaining the correct directory structure
const copyImages = async (src) => {
    log('Copying Images:', src, '\n');

    for (const file of await fs.readdir(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(src.replace(/src/g, '').substr(1), file);

        log('srcpath:', srcPath);
        log('destPath:', destPath);

        if ((await fs.stat(srcPath)).isFile()) {
            // file encountered: copy it
            log('Copying File:', destPath);

            await fs.copyFile(srcPath, destPath);
        }
        else {
            // directory encountered: mirror into dest, then recurse
            await mkdir(destPath);
            await copyImages(srcPath);
            log('\n');
        }
    }

    log('\n');
};

// process the documentation's assets by compiling TS + SCSS with Webpack, shuffling the output a bit and then copying the images directory
const processAssets = async () => {
    log('Processing Assets:', assetSource, '\n');

    await mkdir(assetDest);

    await Promise.all([
        mkdir(cssDest),
        mkdir(jsDest),
        mkdir(imgDest)
    ]);

    // run webpack in the proper mode
    await new Promise((resolve, reject) => {
        exec(`webpack --config webpack.docs.js --mode ${dev ? 'development' : 'production'}`, { stdio: 'inherit' }, (err) => err ? reject(err) : resolve());
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });

    await Promise.all([
        // move webpack CSS output to the right dest
        fs.rename(path.join(assetDest, 'css.css'), path.join(cssDest, 'main.css')),

        // move webpack JS output to the right dest
        fs.rename(path.join(assetDest, 'js.js'), path.join(jsDest, 'main.js')),

        // clean up the webpack CSS JS output (not applicable for our use-case)
        fs.rm(path.join(assetDest, 'css.js'))
    ]);

    log('\n');
    await copyImages(imgSource);
}

// generate the API documentation by running typedoc
const generateAPI = async () => {
    log('\n', 'Generating Aura API documentation...', '\n');

    await Promise.all([
        new Promise((resolve, reject) => {
            exec(`typedoc --options ./typedoc.2d.json ${dev ? '' : '--logLevel Verbose'}`, { stdio: 'inherit' }, (err) => err ? reject(err) : resolve());
        }),
        new Promise((resolve, reject) => {
            exec(`typedoc --options ./typedoc.3d.json ${dev ? '' : '--logLevel Verbose'}`, { stdio: 'inherit' }, (err) => err ? reject(err) : resolve());
        })
    ]);
}

// main execution routine; create the root output directory, then process assets, pages and API documentation in order
(async () => {
    try {
        log('DocGen Starting...', '\n');
        mkdir(dest);

        await Promise.all([
            processAssets(),
            processPages(pageSource)
        ]);

        if (!dev) {
            await generateAPI();
        }

        log('\n\n', 'Done! Docs generated at', dest);
    }
    catch (e) {
        console.error('Something went wrong!', e);
    }
})();
