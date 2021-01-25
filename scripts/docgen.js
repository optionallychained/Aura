const pug = require('pug');
const marked = require('marked');
const hljs = require('highlight.js');
const minify = require('minify');

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// source paths
const source = './src/docs';
const pageSource = path.join(source, 'pages');
const assetSource = path.join(source, 'assets');

// destination paths
const dest = './docs';
const assetDest = path.join(dest, 'assets');

// whether or not we're running in quiet mode
const quiet = process.argv.includes('--quiet') || process.argv.includes('quiet');

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

/** simple logging function, only logging if we're not 'quiet' */
const log = (...args) => {
    if (!quiet) {
        console.log(...args);
    }
}

// process a given directory of pages, rendering one HTML file per MD file into the 'content' block of 'layout.pug' and retaining
//   the directory structure found in ./src/docs/pages
const processPages = async (src, depth = 1) => {
    log('Processing Pages:', src, '\n');

    for (const file of await fs.promises.readdir(src, 'utf8')) {
        const srcPath = path.join(src, file);
        const pageName = file.replace('.md', '');
        const pageNamePretty = titleCase(pageNameMappings[pageName] ?? pageName);
        const destName = file.replace('.md', '.html');
        const destPath = path.join(src.replace('src', '').replace('pages', '').substr(1), destName);

        const stat = await fs.promises.stat(srcPath);

        // render files
        if (stat.isFile()) {
            log('Rendering File:', destPath);

            // remove any return characters because Pug is finnicky
            const markdown = marked((await fs.promises.readFile(srcPath)).toString()).replace(/(?:\r\n|\r|\n)/g, '');

            // nb: the strange layout of the template string is the only way I've found to avoid Pug complaining about extension/blocks due to indent problems
            const page = pug.render(
                `extends /layout\nblock content
                ${markdown}`,
                {
                    basedir: './src/docs/',
                    bodyClass: pageName,
                    pageTitle: pageNamePretty,
                    relativePrefix: `${'.'.repeat(depth)}/`
                }
            )

            await fs.promises.writeFile(destPath, page);
        }
        // and create directories and recurse for folders
        else if (stat.isDirectory()) {
            mkDirOptional(destPath);
            await processPages(srcPath, depth + 1);
            log('\n');
        }
    }
}

// process a given directory of assets, minifying CSS and JS and maintaining the directory structure found in ./src/assets
const processAssets = async (src) => {
    log('Processing Assets:', src, '\n');

    for (const file of await fs.promises.readdir(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(src.replace('src', '').substr(1), file.replace('.', '.min.'));

        const stat = await fs.promises.stat(srcPath);

        if (stat.isFile()) {
            log('Minifying File:', destPath);
            const minified = await minify(srcPath);

            await fs.promises.writeFile(destPath, minified);
        }
        else if (stat.isDirectory()) {
            mkDirOptional(destPath)
            await processAssets(srcPath);
            log('\n');
        }
    }
}

// main execution routine; create the root output directory and then kick off the recursive generation process in processDir()
(async () => {
    try {
        log('DocGen Starting...\n');

        // process pages
        mkDirOptional(dest);
        await processPages(pageSource);

        // process assets
        log('\n');
        mkDirOptional(assetDest);
        await processAssets(assetSource);

        // execute TypeDoc to generate API documentation
        log('Running TypeDoc...\n');
        const cmd = `typedoc${quiet ? '' : ' --logLevel Verbose'}`;
        const td = exec(cmd);
        td.stdout.pipe(process.stdout);
        td.stderr.pipe(process.stderr);

        td.on('exit', () => {
            log('\n\nDone! Docs generated at', dest);
        });
    }
    catch (e) {
        console.error('Something went wrong!', e);
    }
})();
