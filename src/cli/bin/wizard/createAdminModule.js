const { Obj, capitalize } = require("reinforcements");
const { fs } = require("@flk/fs");
const { modules } = require("../../helpers");
const buildAdminModule = require("../../module-builders/build-admin-module");

module.exports = async function (request, response) {
    const data = request.body;

    const bad = message => response.status(400).send({ error: message });

    const get = (key, $default) => Obj.get(data, key, $default);

    const appName = get('appName'),
        moduleName = get('moduleName');

    const appPath = modules(appName);

    if (! fs.exists(appPath)) {
        return bad(`"${capitalize(appName)}" Application doesn't exist`);
    }

    const modulePath = appPath + '/' + moduleName;

    if (fs.exists(modulePath)) {
        return bad(`"${capitalize(moduleName)}" Module already exists in "${capitalize(appName)}" Application.`);
    }

    await buildAdminModule(data);

    response.send(data);
};