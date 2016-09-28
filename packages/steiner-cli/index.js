const fs       = require('fs');
const meow     = require('meow');
const chalk    = require('chalk');
const tmp      = require('tmp');
const path     = require('path');
const _        = require('lodash');
const jetpack  = require('fs-jetpack');
const template = require('es6-template-strings');

// Init CLI
const cli = meow(`
    Usage
        $ steiner <moduleName> -o path/to/output/dir

    Options
        -o Path to output dir
        -f, --fields List of module's model fields
        -n, --name Name of the module's model field that describe the model
        -s, --silent Reduce the console output at the minimum
`);

// Gather templates variables
const moduleName = cli.input[0];
const ucModuleName = _.capitalize(moduleName);

// Output-scoped fs
const od = jetpack.cwd(path.resolve(process.cwd(), cli.flags.o, moduleName));

// Check if output folder already exists
if (od.exists('.')) {
    console.log(`${chalk.red('ERR:')} Destination folder "${chalk.bold(od.path())}" already exists, aborting...`);
    return false;
}

// Craete a temp dir
tmp.setGracefulCleanup();

const tmpDir = tmp.dirSync({
    prefix: 'steiner_',
    unsafeCleanup: true
});

// console.log(tmpDir.name);

// Templates-scoped fs
const tp = jetpack.cwd('./templates');
// Tempdir-scoped fs
const tf = jetpack.cwd(tmpDir.name);

const vars = { 
    name: moduleName,
    ucName: ucModuleName
};

// Generate a file from a template
function generateFile(tplPath, destPath) {
    const file = template(tp.read(tplPath), vars);
    tf.write(destPath, file);
    console.log(`File ${chalk.blue(destPath)} created`);
}

// Actions
generateFile('actions.tpl', `actions/${moduleName}.js`);

// Apis
generateFile('apis.tpl', `apis/${moduleName}.js`);

// Components
generateFile('components/edit.tpl', `components/${ucModuleName}Edit.js`);
generateFile('components/listFilter.tpl', `components/${ucModuleName}ListFilter.js`);
generateFile('components/listTable.tpl', `components/${ucModuleName}ListTable.js`);

// Containers
generateFile('containers/listLayout.tpl', `containers/${ucModuleName}ListLayout.js`);
generateFile('containers/loader.tpl', `containers/${ucModuleName}Loader.js`);

// Reducers
generateFile('reducers.tpl', `reducers/${moduleName}.js`);

// Routes
generateFile('routes.tpl', `routes/${moduleName}.js`);

// Sagas
generateFile('sagas.tpl', `sagas/${moduleName}.js`);

// Copy the generated files to the destination path
tf.copy('.', od.path());

console.log(chalk.green(`Module ${chalk.bold.yellow(moduleName)} generated successfully!`));