const { default: fs } = require("@flk/fs");
const { root } = require("./../helpers");

module.exports = function updateModules(app, module, route, searchFor) {
    let path = root(`src/apps/${app}/${app}-modules.json`);
    let content = fs.getJson(path);

    let addedModule = false;

    for (let i = 0; i < content.modules.length; i++) {
        let moduleData = content.modules[i];

        if (moduleData.entry.includes('/')) {
            content.modules[i] = {
                entry: [route],
                module: module,
            };

            content.modules.push(moduleData);

            addedModule = true;
            break;
        }
    }

    if (!addedModule) {
        content.modules.push({
            entry: [route],
            module: module,
        });
    }

    fs.putJson(path, content);
}