const pug = require('pug');
const marked = require('marked');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const source = './src/docs';
const mdSource = path.join(source, 'pages');
const staticSource = path.join(source, 'static');
const dest = './docs';

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest);

(async () => {
    try {
        const files = await fs.promises.readdir(mdSource);

        // process all markdown documentation
        for (const file of files) {
            const sourcePath = path.join(mdSource, file);
            const destPath = path.join(dest, file.replace('.md', '.html'));

            const markdown = marked((await fs.promises.readFile(sourcePath)).toString()).replace(/(?:\r\n|\r|\n)/g, '');

            await fs.promises.writeFile(destPath, pug.render(
                `extends layout\nblock content
                ${markdown}`,
                {
                    filename: path.join(source, file.replace('.md', '.html'))
                }
            ));
        }

        // copy all static files across
        fs.copySync(staticSource, path.join(dest, 'static'));

        // generate API documentation with typedoc
        exec('typedoc');
    }
    catch (e) {
        console.error('Something went wrong!', e);
    }
})();



// fs.mkdirSync('./test/css');

// for (const file of fs.readdirSync('./src/docs/css')) {
//     fs.copyFileSync(path.join('./src/docs/css', file), path.join('./test/css', file));
// }

// console.log(compiledFunction({ title: 'ProtoGL', pagetitle: 'Index' }));
