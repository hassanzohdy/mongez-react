import concatRoute from './concat-route.js';
import { addBaseAppPath } from './apps-list.js';

// List of all modules 
const modulesList = {};
/**
 * Create modules list for all available applications
 *
 * @param  {array} modules
 * @returns {void}
 */
function setModules(modules) {
    for (let moduleOptions of modules) {
        const { path, name, modules } = moduleOptions;
        if (path) {
            addBaseAppPath(path);
        }
        // spread all entries into object
        for (let moduleInfo of modules) {
            moduleInfo.load = () => import(`modules/${name}/${moduleInfo.module}/provider.ts`);
            moduleInfo.appProvider = () => import(`modules/${name}/${name}-provider.ts`); // modules/app/admin-provider.ts
            moduleInfo.entry = moduleInfo.entry.map(route => concatRoute(path, route));
            // loop over the entry array
            for (let entryRoute of moduleInfo.entry) {
                modulesList[entryRoute] = moduleInfo;
            }
        }
    }
}

export default modulesList;
export { setModules };
