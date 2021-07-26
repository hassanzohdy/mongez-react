const { fs } = require('@flk/fs');
const { modules } = require('./../helpers');
const { toStudlyCase } = require('reinforcements');
const updateModules = require('./updateModules');
const updateServiceFile = require('./frontBuilder/updateServiceFile');
const updateRoutesFile = require('./adminBuilder/updateRoutesFile');

const FRONT_OFFICE_MODULE_FILES_DIRECTORY = __dirname + '/front-module/';

function copyFiles(modulePath) {
    fs.copy(FRONT_OFFICE_MODULE_FILES_DIRECTORY, modulePath);
}

module.exports = async function (data) {
    const { moduleName: module, appName, route, serviceRoute, serviceClassName, component = toStudlyCase(module) + 'Page' } = data;

    const FRONT_OFFICE_MODULE_DIRECTORY = modules(`${appName}/`);

    const moduleDirectory = FRONT_OFFICE_MODULE_DIRECTORY + module;

    fs.makeDirectory(moduleDirectory);

    copyFiles(moduleDirectory);

    updateRoutesFile(moduleDirectory, route, component, data, 'front-office');

    updateServiceFile(moduleDirectory, serviceRoute || route, serviceClassName || module, data);

    updateModules(appName, module, route, '// front-office-modules');

    const componentFilePath = moduleDirectory + '/components/' + component + '.tsx';

    fs.rename(moduleDirectory + '/components/ComponentPage.tsx', componentFilePath);

    let content = fs.get(componentFilePath).replace(/ComponentName/g, component);

    fs.put(componentFilePath, content);
};