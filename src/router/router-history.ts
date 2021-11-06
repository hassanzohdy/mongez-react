import config from './../config';
import { Obj } from 'reinforcements';
import { ltrim, rtrim } from 'reinforcements';
import queryStringParser from 'query-string';
import { createBrowserHistory } from 'history';

export const BASE_NAME = process.env.NODE_ENV === 'production' ? config.get('basePath', '/') : '/';

export const BASE_URL = rtrim(window.location.origin + BASE_NAME, '/');

const history: any = createBrowserHistory({
    // set the basename for production 
    basename: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_BASE_PATH : '/',
});

/**
 * Get has value if provided
 * If the withHash is set to true, then the # will be returned, 
 * otherwise it will be trimmed off
 * 
 * @param {boolean} withHash 
 */
export function hash(withHash = true) {
    let hash = history.location.hash;

    return withHash ? hash : ltrim(hash, '#');
}

export type QueryString = {
    /**
     * Get a value from query string params, if the key does not exist, return default value
     */
    get(key: string, defaultValue?: any): any;

    /**
     * Get all query params
     */
    all(): object;

    /**
     * Return query string as string with & as concat parameter 
     */
    toString(): string;
}

/**
 * Parse the query string then get an object the provides an API to get value(s) from it
 * 
 * @returns {object}
 */
export function queryString(): QueryString {
    const queryString = queryStringParser.parse(history.location.search, {
        parseNumbers: true,
        parseBooleans: true,
        arrayFormat: "bracket"
    });

    return {
        get(key: string, defaultValue: any = null): any {
            if (key.endsWith('[]')) {
                key = rtrim(key, '[]');
            }

            return Obj.get(queryString, key, defaultValue);
        },
        all(): object {
            return queryString;
        },
        toString(): string {
            return history.location.search;
        },
    };
}

export default history;