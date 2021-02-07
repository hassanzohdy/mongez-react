const { fs } = require('@flk/fs');

module.exports = function updateRoutesFile(moduleDirectory, route, component) {
    const filePath = moduleDirectory + '/routes.ts';

    const content = fs.get(filePath)
                    .replace(/ComponentName/g, component)
                    .replace('ROUTE', route);

    fs.put(filePath, content);
}