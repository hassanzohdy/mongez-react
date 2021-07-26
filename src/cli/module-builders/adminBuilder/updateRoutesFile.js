const { fs } = require('@flk/fs');

const { stringify, beautify } = require('./../../helpers');

function getRouteImports(component, command, appType) {
    let content = `import ${component} from './components/${component}${appType === 'admin' ? '/Page' : ''}';`;

    if (command.viewable) {
        content += `\n import ${command.ComponentSingleName}DetailsPage from './components/DetailsPage/${command.ComponentSingleName}DetailsPage';`;
    }

    content += '\n // module-imports';

    return content;
}

function getRoutes(component, command) {
    let content = stringify({
        path: '/',
        component,
    }, 1, true, ['component']);

    if (command.viewable) {
        content += `,`;
        content += stringify({
            path: '/:id',
            component: command.ComponentSingleName + 'DetailsPage',
        }, 1, true, ['component']);
    }

    content += '\n // module-routes';

    return content;
}

module.exports = function updateRoutesFile(moduleDirectory, route, component, command, appType) {
    const filePath = moduleDirectory + '/routes.ts';

    let routeContent = fs.get(filePath);

    routeContent = routeContent.replace('/route-path', route);
    routeContent = routeContent.replace('// module-imports', getRouteImports(component, command, appType));
    routeContent = routeContent.replace('// module-routes', getRoutes(component, command));

    fs.put(filePath, beautify(routeContent));
}