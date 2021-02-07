interface Keywords {
    [key: string]: string | Keywords;
}
/**
 * Add keywords
 *
 * @param  {object} keywords
 * @returns {void}
 */
export declare function extend(localeCode: string, keywords: Keywords): void;
/**
 * Translate the given keyword in current locale code
 *
 * @param   {string} keyword
 * @returns {any}
 */
export declare function trans(keyword: string, ...args: any[]): any;
/**
 * Translate the given keyword for the given locale code
 *
 * Please note this method accepts dot notation syntax
 *
 * @param   {string} key
 * @returns {any}
 */
export declare function translateFrom(localeCode: string, keyword: string, ...args: any[]): any;
export {};
