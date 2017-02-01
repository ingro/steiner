const fs      = require('fs');
const path    = require('path');
const rimraf  = require('rimraf');
const os      = require('os');

const linkType = os.platform() === 'win32' ? 'junction' : 'dir';

function doSymLink(packageName, folderName) {
    rimraf(path.join(process.cwd(), `./packages/${folderName}/node_modules/${packageName}`), err => {
        if (err) {
            return;
        }

        fs.symlinkSync(path.join(process.cwd(), `./node_modules/${packageName}`), path.join(process.cwd(), `./packages/${folderName}/node_modules/${packageName}`), linkType);

        console.log(`Symlink created for ${packageName} in ${folderName}!`);
    });
}

function createSymLinkFor(packageName) {
    doSymLink(packageName, 'steiner-demo');
    doSymLink(packageName, 'steiner');
    // doSymLink(packageName, 'steiner-rr4');
}

createSymLinkFor('react');
createSymLinkFor('react-redux');
createSymLinkFor('react-router-dom');
// createSymLinkFor('react-router-addons-controlled');
createSymLinkFor('redux-form');