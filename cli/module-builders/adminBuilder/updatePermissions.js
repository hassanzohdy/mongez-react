const { default: fs } = require("@flk/fs");
const { currentModule } = require("./../../helpers");

module.exports = function updatePermissions(module, command) {
    let path = currentModule('helpers/permissions.ts');
    let method = command.viewable ? 'viewableCrud': 'crud';
    const permissionText = `${method}('${module}', '${command.form.options.singleName}'),`;

    const permissionContents = fs.get(path);

    if (permissionContents.includes(permissionText)) return;

    let content = permissionContents.replace('    // permissions-list', 
`    ${permissionText}
    // permissions-list`);

    fs.put(path, content);
}