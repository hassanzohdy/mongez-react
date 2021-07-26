const { default: fs } = require("@flk/fs");
const { root } = require("../helpers");

module.exports = function (moduleCommand) {
    let modulesFilePath = root('modules.json');
    if (!fs.exists(modulesFilePath)) {
        fs.putJson(modulesFilePath, []);
    }

    let modulesList = fs.getJson(modulesFilePath);

    modulesList.push(moduleCommand);

    fs.putJson(modulesFilePath, modulesList);
};