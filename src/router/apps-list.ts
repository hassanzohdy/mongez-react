import concatRoute from './concat-route';

const appsList: Array<string> = [];

/**
 * Add new app base path
 * 
 * @param  {string} path  
 */
export function addBaseAppPath(path: string) {
    appsList.push(path);    
}

let currentBaseAppPath = '/';

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

export default appsList;