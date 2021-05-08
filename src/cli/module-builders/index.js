const buildAdmin = require('./build-admin-module');
const buildFrontModule = require('./buildFrontModule');

module.exports = function (modules) {
    for (let module of modules) {
        if (module.enabled === false) continue;

        if (module.type === 'adminModule') {
            buildAdmin(module);
        } else if (module.type === 'frontModule') {
            buildFrontModule(module);
        }
    }
}