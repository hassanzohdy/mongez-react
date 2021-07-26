import concatRoute from "./concat-route";
import { App, Module } from "./types";

let currentBaseAppPath = '/';

// List of all apps routes
export const appsList = [];

/**
 * All modules list
 */
export const modulesList = {};

export let appsData = [];

/**
 * Add new app base path
 * 
 * @param  {string} path  
 */
export function addBaseAppPath(path: string) {
    appsList.push(path);
}

/**
 * Set current base App path
 * 
 * @param  {string} path
 */
export function setCurrentBseAppPath(path: string) {
    currentBaseAppPath = concatRoute(path);
}

/**
 * Get current base app path
 * 
 * @returns {string}
 */
export function getCurrentBseAppPath() {
    return currentBaseAppPath;
}

/**
 * Create modules list for all available applications
 * 
 * @param  {array} modules
 * @returns {void}
 */
export function setApps(apps: Array<App>) {
    appsData = apps;
    for (const app of apps) {
        const { path, name, modules } = app;

        if (path) {
            addBaseAppPath(path);
        }

        // spread all entries into object
        for (let moduleInfo of modules) {
            moduleInfo['app'] = name;
            setModuleLoaders(moduleInfo);

            moduleInfo.entry = moduleInfo.entry.map(route => concatRoute(path, route));

            // loop over the entry array
            for (let entryRoute of moduleInfo.entry) {
                modulesList[entryRoute] = moduleInfo;
            }
        }
    }
}

/**
 * Set module loaders
 * 
 * @param   {Module} moduleInfo
 * @returns {void}
 */
function setModuleLoaders(moduleInfo) {
    const app = moduleInfo.app;
    moduleInfo.loadModule = () => import(`apps/${app}/${moduleInfo.module}/provider.ts`);
    moduleInfo.loadApp = () => import(`apps/${app}/${app}-provider.ts`); // apps/app-name/app-name-provider.ts
}

/**
 * Get the dynamic route module for current application
 * 
 * @returns {object|null}
 */
export function appDynamicRouteModule(): Module | null {
    const currentBaseApp = getCurrentBseAppPath();

    for (const app of appsData) {
        const { name, path, dynamicRouteModule } = app;

        if (!dynamicRouteModule) continue;

        if (currentBaseApp !== path) continue;

        const moduleInfo: Module = {
            app: name,
            module: dynamicRouteModule,
        };

        setModuleLoaders(moduleInfo);

        return moduleInfo;
    }

    return null;
}