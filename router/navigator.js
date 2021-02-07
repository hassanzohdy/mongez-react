import { ltrim } from 'reinforcements';
import history, { BASE_URL } from './router-history.js';
import concatRoute from './concat-route.js';
import { getCurrentBseAppPath } from './apps-list.js';
import 'sprintf-js';
import { getLocaleCodes, updateCurrentLocaleCode, getCurrentLocaleCode } from '../localization/locales.js';
import events from '../events/events.js';
import { SWITCHING_LOCALE_CODE_EVENT } from '../events/events-list.js';
import Is from '@flk/supportive-is';
import { queryString } from 'object-query-string';

let currentFullRoute, fullRouteWithoutLocaleCode;
let previousRoute = '/';
/**
 * General full url for the given route
 *
 * @param {string} route
 * @returns {string}
 */
function url(path) {
    return BASE_URL + path;
}
/**
 * Navigate back to the previous route
 * @returns {string}
 */
function navigateBack(defaultRoute = '') {
    if (!previousRoute) {
        return navigateTo(defaultRoute);
    }
    goTo(previousRoute);
}
/**
 * Set the full current route and the current route without the locale code
 *
 * @param   {string} route
 * @returns {void}
 */
function updateFullRoute(route) {
    previousRoute = currentFullRoute;
    // /en/users
    currentFullRoute = route;
    // remove any possible locale code
    let regex = new RegExp(`^/(${getLocaleCodes().join('|')})`);
    // let regex = new RegExp('^/(en|ar)')
    fullRouteWithoutLocaleCode = currentFullRoute.replace(regex, function (_matched, localeCode) {
        updateCurrentLocaleCode(localeCode);
        return '';
    });
}
/**
 * Replace the query string of current route
 * This method will not trigger router change
 *
 * @param {string|object} queryString
 * @returns {void}
 */
function updateQueryString(queryString$1) {
    if (Is.object(queryString$1)) {
        queryString$1 = queryString(queryString$1);
    }
    const [fullUrl] = window.location.href.split('?');
    window.history.replaceState(null, '', fullUrl + '?' + ltrim(queryString$1, '?'));
}
/**
 * navigate to the given path
 *
 * @param  {string} path
 */
function navigateTo(path, localeCode = null) {
    // login >> valid
    // /login >> valid
    path = concatRoute(getCurrentBseAppPath(), path);
    // /users
    // if current initial locale code
    // /en/users   
    if (localeCode === null && hasInitialLocaleCode()) {
        localeCode = getCurrentLocaleCode();
    }
    if (localeCode) {
        path = concatRoute(localeCode, path);
    }
    goTo(path);
}
/**
 * Go to the given full path
 *
 * @param  {string} path
 */
function goTo(path) {
    // stackBuilder.add();
    history.push(path);
}
/**
 * Get current route
 *
 * @returns {string}
 */
function fullRoute() {
    return history.location.pathname;
}
/**
 * Get the route without the locale code
 *
 * @returns  {string}
 */
function currentRoute() {
    let route = ltrim(fullRoute(), '/' + getCurrentLocaleCode()) || '/';
    route = ltrim(route, getCurrentBseAppPath());
    return concatRoute(route);
}
/**
 * Force reload current route content
 *
 * @returns {void}
 */
function refresh() {
    // stackBuilder.remove(currentRoute());
    goTo(fullRoute());
}
/**
 * Navigate to current location and switch language
 *
 * @param  {string} localeCode
 */
function switchLang(localeCode) {
    let route = currentRoute();
    events.trigger(SWITCHING_LOCALE_CODE_EVENT, localeCode);
    navigateTo('/' + route, localeCode);
}
/**
 * Initialize Navigator
 */
function initiateNavigator() {
    /**
     * Listen to any router navigation to update current full route
     * and current route without locale codes
     */
    history.listen((location) => {
        updateFullRoute(location.pathname);
    });
    updateFullRoute(history.location.pathname || '/');
}
/**
 * Check if current route has a locale code
 * By comparing the currentFullRoute with fullRouteWithoutLocaleCode
 *
 * @returns  {boolean}
 */
function hasInitialLocaleCode() {
    return currentFullRoute !== fullRouteWithoutLocaleCode;
}

export default initiateNavigator;
export { currentRoute, fullRoute, hasInitialLocaleCode, navigateBack, navigateTo, refresh, switchLang, updateQueryString, url };
