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
}

cleanModule('react');
cleanModule('react-redux');
cleanModule('react-router');
cleanModule('redux-form');