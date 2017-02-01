const path    = require('path');
const rimraf  = require('rimraf');

function doClean(packageName, folderName) {
    rimraf(path.join(process.cwd(), `./packages/${folderName}/node_modules/${packageName}`), err => {
        if (err) {
            return;
        }

        console.log(`Module ${packageName} cleaned from ${folderName}!`);
    });
}

function cleanModule(packageName) {
    doClean(packageName, 'steiner-demo');
    doClean(packageName, 'steiner');
    // doClean(packageName, 'steiner-rr4');
}

cleanModule('react');
cleanModule('react-redux');
cleanModule('react-router-dom');
// cleanModule('react-router-addons-controlled');
cleanModule('redux-form');