const pug = require('pug');
const marked = require('marked').marked;
const hljs = require('highlight.js');

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

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

// whether or not we're running in dev mode
const dev = process.argv.includes('--dev') || process.argv.includes('dev');

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
const mkDirOptional = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
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

    for (const file of await fs.promises.readdir(src, 'utf8')) {
        const srcPath = path.join(src, file);
        const pageName = file.replace('.md', '');
        const pageNamePretty = titleCase(pageNameMappings[pageName] ?? pageName);
        const destName = file.replace('.md', '.html');
        const destPath = path.join(src.replace(/src|pages/g, '').substr(1), destName);

        const stat = await fs.promises.stat(srcPath);

        if (stat.isFile()) {
            // file encountered: render it
            log('Rendering File:', destPath);

            // remove any return characters because Pug is finnicky
            const markdown = marked((await fs.promises.readFile(srcPath)).toString()).replace(/(?:\r\n|\r|\n)/g, '');

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
            )

            // write the file
            await fs.promises.writeFile(destPath, page);
        }
        else if (stat.isDirectory()) {
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

    for (const file of await fs.promises.readdir(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(src.replace(/src/g, '').substr(1), file);

        const stat = await fs.promises.stat(srcPath);

        if (stat.isFile()) {
            // file encountered: copy it
            log('Copying File:', destPath);

            await fs.promises.copyFile(srcPath, destPath);
        }
        else if (stat.isDirectory()) {
            // directory encountered: mirror into dest, then recurse
            mkDirOptional(destPath);
            await processImages(srcPath);
            log('\n');
        }
    }

    log('\n');
};

// process the documentation's assets by compiling TS + SCSS with Webpack, shuffling the output a bit and then copying the images directory
const processAssets = async () => {
    log('Processing Assets:', assetSource, '\n');
    mkDirOptional(assetSource);

    // run webpack in the proper mode
    const cmd = `webpack --config webpack.docs.js --mode ${dev ? 'development' : 'production'}`;
    execSync(cmd, { stdio: 'inherit' });

    // move webpack JS output to the right dest
    mkDirOptional(cssDest);
    await fs.promises.rename(path.join(assetDest, 'css.css'), path.join(cssDest, 'main.css'));

    // move webpack CSS output to the right dest
    mkDirOptional(jsDest);
    await fs.promises.rename(path.join(assetDest, 'js.js'), path.join(jsDest, 'main.js'));

    // clean up the Webpack CSS JS output (not applicable for our use-case)
    await fs.promises.rm(path.join(assetDest, 'css.js'));

    // handle images
    mkDirOptional(imgDest);
    log('\n');
    await copyImages(imgSource);
}

// generate the API documentation by running typedoc
const generateAPI = () => {
    log('\n', 'Generating Aura2D API Documentation...', '\n');
    execSync(`typedoc --options ./typedoc.2d.json ${dev ? '' : '--logLevel Verbose'}`, { stdio: 'inherit' });

    log('\n', 'Generating Aura3D API Documentation...', '\n');
    execSync(`typedoc --options ./typedoc.3d.json ${dev ? '' : '--logLevel Verbose'}`, { stdio: 'inherit' });
}

// main execution routine; create the root output directory, then process assets, pages and API documentation in order
(async () => {
    try {
        log('DocGen Starting...', '\n');
        mkDirOptional(dest);

        // process assets
        await processAssets();

        // process pages
        await processPages(pageSource);

        // generate API documentation only if we're building for prod
        if (!dev) {
            generateAPI();
        }

        log('\n\n', 'Done! Docs generated at', dest);
    }
    catch (e) {
        console.error('Something went wrong!', e);
    }
})();
