import { Obj } from 'reinforcements';
import config from '../config/index.js';

/**
 * List of locale code object
 *
 * @const {object}
 */
const localeCodesList = config.get('locales', []);
/**
 * Get locale codes
 *
 * @returns {Array<String>}
 */
function getLocaleCodes() {
    return process.env.REACT_APP_LOCALE_CODES_LIST ? process.env.REACT_APP_LOCALE_CODES_LIST.split(',') : Object.keys(config.get('locales', []));
}
/**
 * Current locale code that will be changed later for locale change in the router
 *
 * @var  {string}
 */
let currentLocaleCode = document.documentElement.lang;
/**
 * Get direction of the given locale code
 *
 * @param   {string} localeCode
 * @returns {string}
 */
function directionOf(localeCode) {
    return Obj.get(localeCodesList, localeCode + '.direction');
}
/**
 * Get current direction
 *
 * @returns  {string}
 */
function currentDirection() {
    return directionOf(currentLocaleCode);
}
/**
 * Get current locale code
 *
 * @returns {string}
 */
function getCurrentLocaleCode() {
    return currentLocaleCode;
}
/**
 * Update current locale code
 *
 * @param   {string} localeCode
 * @returns {void}
 */
function updateCurrentLocaleCode(localeCode) {
    if (localeCode === currentLocaleCode)
        return;
    document.documentElement.dir = directionOf(localeCode);
    document.documentElement.lang = localeCode;
    currentLocaleCode = localeCode;
}

export { currentDirection, directionOf, getCurrentLocaleCode, getLocaleCodes, updateCurrentLocaleCode };
