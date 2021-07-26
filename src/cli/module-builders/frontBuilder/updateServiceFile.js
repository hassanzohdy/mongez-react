const { fs } = require('@flk/fs');
const { default: toStudlyCase } = require('reinforcements/src/utilities/str/toStudlyCase');

module.exports = function updateServiceFile(moduleDirectory, serviceRoute, serviceClassName, command) {
    const serviceFilePath = moduleDirectory + '/services/service.ts';

    const serviceFile = fs.get(serviceFilePath)
                        .replace(/Component/g, toStudlyCase(serviceClassName))
                        .replace('route', serviceRoute);

    fs.put(serviceFilePath, serviceFile);
}
