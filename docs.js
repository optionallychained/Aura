const marked = require('marked');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const source = './src/docs';
const dest = './docs';

marked.setOptions({
    renderer: new marked.Renderer()
});

// purge and restore the destination directory
if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest);

(async () => {
    try {
        // process user docs
        const files = await fs.promises.readdir(source);

        for (const file of files) {
            const sourcePath = path.join(source, file);
            const destPath = path.join(dest, file.replace('.md', '.html'));

            const stat = await fs.promises.stat(sourcePath);

            if (stat.isFile()) {
                await fs.promises.writeFile(destPath, marked((await fs.promises.readFile(sourcePath)).toString()));
            }
        }

        // invoke typedoc for technical documentation
        exec('typedoc');
    }
    catch (e) {
        console.error('something went wrong!', e);
    }
})();
