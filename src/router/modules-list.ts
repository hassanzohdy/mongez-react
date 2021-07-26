import concatRoute from "./concat-route";
import { addBaseAppPath } from "./apps-list";

export interface ModuleInfo {
    module: string;
    entry: string[];
    load?: Function;
    appProvider?: Function;
};

export interface Module {
    path: string;
    name: string;
    modules: ModuleInfo[];
}

export interface ModulesList {
    [key: string]: ModuleInfo;
}

// List of all modules 
const modulesList: ModulesList = {};

/**
 * Create modules list for all available applications
 * 
 * @param  {array} modules
 * @returns {void}
 */
export function setModules(modules: Array<Module>) {
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