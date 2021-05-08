const { default: fs } = require("@flk/fs");
const { currentModule, stringify, beautify } = require("./../../helpers");

module.exports = function updateSidebar(module, sidebar, route, role) {
    if (!sidebar || !sidebar.iconName) return;

    let path = currentModule('helpers/sidebar-items-list.ts');
    let content = fs.get(path);

    if (!content.includes('import ' + sidebar.iconName + ' from')) {
        content = content.replace('// icons-list',
            `import ${sidebar.iconName} from '@material-ui/icons/${sidebar.iconName}';
// icons-list`);
    }

    const routeSettings = {
        text: `trans('${module}')`,
        route,
        icon: sidebar.iconName,
        role: `${role}.list`,
    };

    content = content.replace('// sidebar-items',
        `${stringify(routeSettings, 1, true, ['text', 'icon'])},
// sidebar-items`);

    fs.put(path, beautify(content));
}