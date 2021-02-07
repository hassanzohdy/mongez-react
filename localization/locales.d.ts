/**
 * Get locale codes
 *
 * @returns {Array<String>}
 */
export declare function getLocaleCodes(): Array<String>;
/**
 * List of locale codes only in an array
 *
 * @const {array}
 */
export declare const localeCodes: string[];
/**
 * Get direction of the given locale code
 *
 * @param   {string} localeCode
 * @returns {string}
 */
export declare function directionOf(localeCode: string): any;
/**
 * Get current direction
 *
 * @returns  {string}
 */
export declare function currentDirection(): any;
/**
 * Get current locale code
 *
 * @returns {string}
 */
export declare function getCurrentLocaleCode(): string;
/**
 * Update current locale code
 *
 * @param   {string} localeCode
 * @returns {void}
 */
export declare function updateCurrentLocaleCode(localeCode: string): void;
