#!/usr/bin/env node

const program  = require('commander');
const fs       = require('fs');
const chalk    = require('chalk');
const tmp      = require('tmp');
const path     = require('path');
const _        = require('lodash');
const jetpack  = require('fs-jetpack');
const nunjucks = require('nunjucks');
const template = require('es6-template-strings');

function generateModule(moduleName, options) {
    // TODO: Throw if options.outputPath is not defined
    // console.log(options);
    // return;

    // Gather templates variables
    const ucModuleName = _.capitalize(moduleName);

    // Output-scoped fs
    const od = jetpack.cwd(path.resolve(process.cwd(), options.outputPath, moduleName));

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
    const tp = jetpack.cwd(path.resolve(__dirname, 'templates/module'));
    // Tempdir-scoped fs
    const tf = jetpack.cwd(tmpDir.name);

    const vars = { 
        name: moduleName,
        richComponents: options.richComponents,
        useHelper: options.helper
    };

    // Generate a file from a template
    function generateFile(tplPath, destPath) {
        const file = nunjucks.renderString(tp.read(tplPath), vars);
        // const file = template(tp.read(tplPath), vars);
        tf.write(destPath, file);
        console.log(`File ${chalk.blue(destPath)} created`);
    }

    // Actions
    generateFile('actions.tpl', `actions/${moduleName}.js`);

    // Apis
    generateFile('apis.tpl', `apis/${moduleName}.js`);

    if (options.components) {
        // Components
        generateFile('components/edit.tpl', `components/${ucModuleName}Edit.js`);
        generateFile('components/listFilter.tpl', `components/${ucModuleName}ListFilter.js`);
        generateFile('components/listTable.tpl', `components/${ucModuleName}ListTable.js`);

        // Containers
        generateFile('containers/listLayout.tpl', `containers/${ucModuleName}ListLayout.js`);
        generateFile('containers/loader.tpl', `containers/${ucModuleName}Loader.js`);
    }

    // Reducers
    generateFile('reducers.tpl', `reducers/${moduleName}.js`);

    // Routes
    generateFile('routes.tpl', `routes/${moduleName}.js`);

    // Sagas
    generateFile('sagas.tpl', `sagas/${moduleName}.js`);

    // Copy the generated files to the destination path
    tf.copy('.', od.path());

    console.log(chalk.green(`Module ${chalk.bold.yellow(moduleName)} generated successfully!`));
}

function bootstrapApp(appName) {
    // Output-scoped fs
    const od = jetpack.cwd(path.resolve(process.cwd(), appName));
    
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

    // Templates-scoped fs
    const tp = jetpack.cwd(path.resolve(__dirname, 'templates/app'));
    // Tempdir-scoped fs
    const tf = jetpack.cwd(tmpDir.name);

    const vars = { 
        appName
    };

    // Generate a file from a template
    function generateFile(tplPath, destPath) {
        const file = template(tp.read(tplPath), vars);
        tf.write(destPath, file);
    }

    console.log('Generating project\'s files...');

    // Copy all the files except the templates
    tp.copy('.', tf.path(), { matching: ['!*.tpl'], overwrite: true });

    // Generate files from templates
    generateFile('.env.tpl', `.env`);
    generateFile('.env.example.tpl', `.env.example`);
    generateFile('package.json.tpl', `package.json`);
    generateFile('.gitignore.tpl', `.gitignore`);

    generateFile('public/index.html.tpl', 'public/index.html');

    // Copy the generated files to the destination path
    tf.copy('.', od.path());

    console.log(chalk.green(`Project ${chalk.yellow(appName)} bootstrapped correctly!`));
    console.log(`To get started type "cd ${appName} && npm install"`);
}

program
    .version('0.6.0');

program
    .command('generate <module>')
    .description('generate a steiners\'s module')
    .option('-o, --output-path <path>', 'Path to output dir')
    .option('-n, --no-components', 'Don\'t generate components and containers')
    .option('-r, --rich-components', 'Use react-helmet and keybindings in components')
    .option('-h, --no-helper', 'Don\'t use SteinerHelper')
    .action(generateModule);

program 
    .command('bootstrap <app>')
    .description('bootstrap a steiners\'s app')
    .action(bootstrapApp);

program.parse(process.argv);