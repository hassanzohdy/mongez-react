import { Obj } from 'reinforcements';
import { vsprintf } from 'sprintf-js';
import { getCurrentLocaleCode } from './locales';

interface Keywords {
    [key: string]: string | Keywords;
}

interface KeywordsList {
    [key: string]: Keywords;
}

/**
 * all keywords for all locale codes
 */
let keywordsList: KeywordsList = {};

/**
 * Add keywords 
 * 
 * @param  {object} keywords
 * @returns {void}
 */
export function extend(localeCode: string, keywords: Keywords) {
    keywordsList[localeCode] = Obj.merge(keywordsList[localeCode], keywords);
}

/**
 * Translate the given keyword in current locale code
 *  
 * @param   {string} keyword
 * @returns {any} 
 */
export function trans(keyword: string, ...args: any[]) {
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
export function translateFrom(localeCode: string, keyword: string, ...args: any[]) {
    let translation = Obj.get(keywordsList, `${localeCode}.${keyword}`);

    return vsprintf(translation, args) || keyword;
}

const translator = {
    extend,
};

export default translator;