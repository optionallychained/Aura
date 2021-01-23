const pug = require('pug');
const marked = require('marked');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

// source paths
const source = './src/docs';
const pageSource = path.join(source, 'pages');
const staticSource = path.join(source, 'static');

// destination paths
const dest = './docs';
const staticDest = path.join(dest, 'static');

const pageNameMappings = {
    'index': 'Home'
}

const titleCase = (str) => str.replace('-', ' ').replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substr(1));

(async () => {
    try {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        // for every page, render a pug template extending the main layout file and including the compiled markdown for its 'content' block
        for (const file of await fs.promises.readdir(pageSource)) {
            const srcPath = path.join(pageSource, file);
            const pageName = file.replace('.md', '');
            const pageNamePretty = titleCase(pageNameMappings[pageName] ?? pageName);
            const destName = file.replace('.md', '.html');
            const destPath = path.join(dest, destName);

            const markdown = marked((await fs.promises.readFile(srcPath)).toString()).replace(/(?:\r\n|\r|\n)/g, '');
            const page = pug.render(
                `extends layout\nblock content
                ${markdown}`,
                {
                    filename: path.join(source, destName),
                    bodyClass: pageName,
                    pageTitle: pageNamePretty
                }
            )

            await fs.promises.writeFile(destPath, page);
        }

        // copy all static resources into the destination folder
        await fs.copy(staticSource, staticDest);

        // execute TypeDoc to generate API documentation
        exec('typedoc');
    }
    catch (e) {
        console.error('Something went wrong!', e);
    }
})();
