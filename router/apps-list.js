import concatRoute from './concat-route.js';

const appsList = [];
/**
 * Add new app base path
 *
 * @param  {string} path
 */
function addBaseAppPath(path) {
    appsList.push(path);
}
let currentBaseAppPath = '/';
/**
 * Set current base App path
 *
 * @param  {string} path
 */
function setCurrentBseAppPath(path) {
    currentBaseAppPath = concatRoute(path);
}
/**
 * Get current base app path
 *
 * @returns {string}
 */
function getCurrentBseAppPath() {
    return currentBaseAppPath;
}

export default appsList;
export { addBaseAppPath, getCurrentBseAppPath, setCurrentBseAppPath };
