import { Obj } from 'reinforcements';
import { vsprintf } from 'sprintf-js';
import { getCurrentLocaleCode } from './locales.js';

/**
 * all keywords for all locale codes
 */
let keywordsList = {};
/**
 * Add keywords
 *
 * @param  {object} keywords
 * @returns {void}
 */
function extend(localeCode, keywords) {
    keywordsList[localeCode] = Obj.merge(keywordsList[localeCode], keywords);
}
/**
 * Translate the given keyword in current locale code
 *
 * @param   {string} keyword
 * @returns {any}
 */
function trans(keyword, ...args) {
    return translateFrom(getCurrentLocaleCode(), keyword, ...args);
}
/**
 * Translate the given keyword for the given locale code
 *
 * Please note this method accepts dot notation syntax
 *
 * @param   {string} key
 * @returns {any}
 */
function translateFrom(localeCode, keyword, ...args) {
    let translation = Obj.get(keywordsList, `${localeCode}.${keyword}`);
    return vsprintf(translation, args) || keyword;
}

export { extend, trans, translateFrom };
