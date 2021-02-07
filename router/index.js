import { hash, queryString } from './router-history.js';
export { BASE_NAME, BASE_URL, default as history } from './router-history.js';
export { default as concatRoute } from './concat-route.js';
export { addBaseAppPath, default as appsList, getCurrentBseAppPath, setCurrentBseAppPath } from './apps-list.js';
export { default as modulesList, setModules } from './modules-list.js';
import { addRouter, partOf, group } from './routes-list.js';
export { FULL_PAGE } from './routes-list.js';
export { currentRoute, fullRoute, hasInitialLocaleCode, navigateBack, navigateTo, refresh, switchLang, updateQueryString, url } from './navigator.js';
export { default as Renderer } from './renderer.js';
export { default as scan } from './scanner.js';
export { default as setCurrentLocale } from './update-current-localization.js';

var index = {
    add: addRouter,
    partOf,
    group,
    hash,
    get queryString() {
        return queryString();
    }
};

export default index;
