const fs      = require('fs');
const path    = require('path');
const rimraf  = require('rimraf');
const os      = require('os');

const linkType = os.platform() === 'win32' ? 'junction' : 'dir';

rimraf(path.join(process.cwd(), './packages/steiner-demo/node_modules/react'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/react'), path.join(process.cwd(), './packages/steiner-demo/node_modules/react'), linkType);

    console.log('Symlink created!');
});

rimraf(path.join(process.cwd(), './packages/steiner/node_modules/react'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/react'), path.join(process.cwd(), './packages/steiner/node_modules/react'), linkType);

    console.log('Symlink created!');
});

rimraf(path.join(process.cwd(), './packages/steiner-demo/node_modules/react-router'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/react-router'), path.join(process.cwd(), './packages/steiner-demo/node_modules/react-router'), linkType);

    console.log('Symlink created!');
});

rimraf(path.join(process.cwd(), './packages/steiner/node_modules/react-router'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/react-router'), path.join(process.cwd(), './packages/steiner/node_modules/react-router'), linkType);

    console.log('Symlink created!');
});

rimraf(path.join(process.cwd(), './packages/steiner-demo/node_modules/redux-form'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/redux-form'), path.join(process.cwd(), './packages/steiner-demo/node_modules/redux-form'), linkType);

    console.log('Symlink created!');
});

rimraf(path.join(process.cwd(), './packages/steiner/node_modules/redux-form'), err => {
    if (err) {
        return;
    }

    fs.symlinkSync(path.join(process.cwd(), './node_modules/redux-form'), path.join(process.cwd(), './packages/steiner/node_modules/redux-form'), linkType);

    console.log('Symlink created!');
});