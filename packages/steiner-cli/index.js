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
`);

// Gather templates variables
const moduleName = cli.input[0];
const ucModuleName = _.capitalize(moduleName);

// Output-scoped fs
const od = jetpack.cwd(path.resolve(process.cwd(), cli.flags.o, moduleName));

// Check if output folder already exists
if (od.exists('.')) {
    console.log(`Destination folder "${chalk.bold(od.path())}" already exists, aborting...`);
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

// Actions
const actionsFile = template(tp.read('actions.tpl'), { name: moduleName });
tf.write(`actions/${moduleName}.js`, actionsFile);

// Apis
const apisFile = template(tp.read('apis.tpl'), { name: moduleName });
tf.write(`apis/${moduleName}.js`, apisFile);

// Components
const editFile = template(tp.read('components/edit.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`components/${ucModuleName}Edit.js`, editFile);
const listFilterFile = template(tp.read('components/listFilter.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`components/${ucModuleName}ListFilter.js`, listFilterFile);
const listTableFile = template(tp.read('components/listTable.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`components/${ucModuleName}ListTable.js`, listTableFile);

// Containers
const listLayoutFile = template(tp.read('containers/listLayout.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`containers/${ucModuleName}ListLayout.js`, listLayoutFile);
const loaderFile = template(tp.read('containers/loader.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`containers/${ucModuleName}Loader.js`, loaderFile);

// Reducers
const reducersFile = template(tp.read('reducers.tpl'), { name: moduleName });
tf.write(`reducers/${moduleName}.js`, reducersFile);

// Routes
const routesFiles = template(tp.read('routes.tpl'), { name: moduleName, ucName: ucModuleName });
tf.write(`routes/${moduleName}.js`, routesFiles);

// Sagas
const sagasFile = template(tp.read('sagas.tpl'), { name: moduleName });
tf.write(`sagas/${moduleName}.js`, sagasFile);

tf.copy('.', od.path());

console.log(chalk.green(`Module ${chalk.bold.yellow(moduleName)} generated successfully!`));