import config from "./../config";
import { Obj } from "reinforcements";
import events, { SWITCHING_LOCALE_CODE_EVENT } from "../events";

/**
 * Get locale codes
 * 
 * @returns {Array<string>}
 */
export function getLocaleCodes(): Array<string> {
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
export function directionOf(localeCode: string) {
    return Obj.get(config.get('locales', {}), localeCode + '.direction', 'ltr');
}

/**
 * Get current direction
 * 
 * @returns  {string}
 */
export function currentDirection() {
    return directionOf(currentLocaleCode);
}

/**
 * Get current locale code
 * 
 * @returns {string}
 */
export function getCurrentLocaleCode() {
    return currentLocaleCode;
}

/**
 * Update current locale code 
 * 
 * @param   {string} localeCode
 * @returns {void} 
 */
export function updateCurrentLocaleCode(localeCode: string) {
    if (localeCode === currentLocaleCode) return;

    document.documentElement.dir = directionOf(localeCode);
    document.documentElement.lang = localeCode;

    currentLocaleCode = localeCode;

    events.trigger(SWITCHING_LOCALE_CODE_EVENT, localeCode);
}