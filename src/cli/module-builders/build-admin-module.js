const { fs } = require('@flk/fs');
const pluralize = require('pluralize');
const { modules } = require('./../helpers');
const updateModules = require('./updateModules');
const { toStudlyCase } = require('reinforcements');
const updateModulesFile = require('./updateModulesFile');
const updateSidebar = require('./adminBuilder/updateSidebar');
const updateRoutesFile = require('./adminBuilder/updateRoutesFile');
const updateForm = require('./adminBuilder/admin-form-page-builder');
const updatePermissions = require('./adminBuilder/updatePermissions');
const updateServiceFile = require('./adminBuilder/updateServiceFile');
const updateTranslations = require('./adminBuilder/updateTranslations');
const updatePageData = require('./adminBuilder/admin-table-page-builder');

module.exports = async function buildAdminModule(command) {
    const ADMIN_MODULE_FILES_DIRECTORY = __dirname + '/admin-module/';
    const app = command.appName;
    global.app = app;

    const ADMIN_MODULE_DIRECTORY = modules(`${app}/`);

    function copyFiles(modulePath) {
        fs.copy(ADMIN_MODULE_FILES_DIRECTORY, modulePath);
    }

    const { moduleName: module, route, serviceRoute, serviceClassName, sidebar, translations, role = '', component = toStudlyCase(module), table, form } = command;

    const moduleDirectory = ADMIN_MODULE_DIRECTORY + module;

    const SingleComponentName = pluralize(component, 1);

    command.ComponentSingleName = SingleComponentName;

    fs.makeDirectory(moduleDirectory);

    copyFiles(moduleDirectory);

    updateModulesFile(command);

    if (command.viewable) {
        const singleComponentPath = moduleDirectory + `/components/DetailsPage/${SingleComponentName}DetailsPage.tsx`;
        fs.rename(moduleDirectory + '/components/DetailsPage/ComponentDetailsPage.tsx', singleComponentPath);
        fs.put(singleComponentPath,
            fs.get(singleComponentPath).replace('ComponentDetailsPage', `${SingleComponentName}DetailsPage`)
        );
    } else {
        fs.remove(moduleDirectory + '/components/DetailsPage');
    }

    updateRoutesFile(moduleDirectory, route, component, command, 'admin');

    updateServiceFile(moduleDirectory, serviceRoute || route, serviceClassName || module, command);

    updatePageData(moduleDirectory, module, table, role, command);
    updateForm(moduleDirectory, form, command);
    updatePermissions(module, command);
    updateSidebar(module, sidebar, route, role);
    updateTranslations(translations);
    updateModules(app, module, route, '// admin-modules');

    fs.rename(moduleDirectory + '/components/module', moduleDirectory + '/components/' + component);
};