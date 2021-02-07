/**
 * General full url for the given route
 *
 * @param {string} route
 * @returns {string}
 */
export declare function url(path: string): string;
/**
 * Navigate back to the previous route
 * @returns {string}
 */
export declare function navigateBack(defaultRoute?: string): void;
/**
 * Replace the query string of current route
 * This method will not trigger router change
 *
 * @param {string|object} queryString
 * @returns {void}
 */
export declare function updateQueryString(queryString: string): void;
/**
 * navigate to the given path
 *
 * @param  {string} path
 */
export declare function navigateTo(path: string, localeCode?: string | null): void;
/**
 * Get current route
 *
 * @returns {string}
 */
export declare function fullRoute(): any;
/**
 * Get the route without the locale code
 *
 * @returns  {string}
 */
export declare function currentRoute(): string;
/**
 * Force reload current route content
 *
 * @returns {void}
 */
export declare function refresh(): void;
/**
 * Navigate to current location and switch language
 *
 * @param  {string} localeCode
 */
export declare function switchLang(localeCode: string): void;
/**
 * Initialize Navigator
 */
export default function initiateNavigator(): void;
/**
 * Check if current route has a locale code
 * By comparing the currentFullRoute with fullRouteWithoutLocaleCode
 *
 * @returns  {boolean}
 */
export declare function hasInitialLocaleCode(): boolean;
