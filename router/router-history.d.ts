import queryStringParser from 'query-string';
export declare const BASE_NAME: any;
export declare const BASE_URL: string;
declare const history: any;
/**
 * Get has value if provided
 * If the withHash is set to true, then the # will be returned,
 * otherwise it will be trimmed off
 *
 * @param {boolean} withHash
 */
export declare function hash(withHash?: boolean): any;
/**
 * Parse the query string then get an object the provides an API to get value(s) from it
 *
 * @returns {object}
 */
export declare function queryString(): {
    get(key: string, defaultValue?: any): any;
    all(): queryStringParser.ParsedQuery<string | number | boolean>;
    toString(): string;
};
export default history;
