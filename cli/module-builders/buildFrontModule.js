const { fs } = require('@flk/fs');
const prompts = require('prompts');
const { modules } = require('./../helpers');
const { toStudlyCase } = require('reinforcements');
const updateModules = require('./updateModules');
const updateServiceFile = require('./adminBuilder/updateServiceFile');
const updateRoutesFile = require('./frontBuilder/updateRoutesFile');

const FRONT_OFFICE_MODULE_FILES_DIRECTORY = __dirname + '/front-module/';
const FRONT_OFFICE_MODULE_DIRECTORY = modules('front-office/');

function copyFiles(modulePath) {
    fs.copy(FRONT_OFFICE_MODULE_FILES_DIRECTORY, modulePath);
}

module.exports = async function (command) {
    const { module, route, serviceRoute, serviceClassName, component = toStudlyCase(module) + 'Page' } = command.data;

    const moduleDirectory = FRONT_OFFICE_MODULE_DIRECTORY + module;

    if (fs.exists(moduleDirectory)) {
        const response = await prompts({
            type: 'text',
            name: 'exists',
            message: 'Module exists, override it? [n/Y]',
        });

        if (response.exists !== 'Y') return;
    }

    fs.makeDirectory(moduleDirectory);

    copyFiles(moduleDirectory);

    updateRoutesFile(moduleDirectory, route, component);

    updateServiceFile(moduleDirectory, serviceRoute || route, serviceClassName || module);

    updateModules(module, route, '// front-office-modules');

    const componentFilePath = moduleDirectory + '/components/' + component + '.tsx';

    fs.rename(moduleDirectory + '/components/ComponentPage.tsx', componentFilePath);

    let content = fs.get(componentFilePath).replace(/ComponentName/g, component);

    fs.put(componentFilePath, content);
};