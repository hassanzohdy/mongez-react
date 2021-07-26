import config from '../config';
import history from './router-history';

/**
 * Return dynamic route path generator
 * 
 * @param  {string} paramName
 * @returns {string}
 */
export function dynamicRoute(paramName: string = 'dynamic'): string {
    return `:${paramName}(.+)`;
}

/**
 * Accept only integer route segment
 * 
 * @param  {string} segmentName
 * @returns {string}
 */
export function integerSegment(segmentName: string): string {
    return `:${segmentName}(\d+)`;
}

/**
 * Accept only float route segment
 * 
 * @param  {string} segmentName
 * @returns {string}
 */
export function floatSegment(segmentName: string): string {
    return `:${segmentName}(\d+)(.\d+)?`;
}

/**
 * Update current locale code to the document
 */
export default function setCurrentLocale() {
    const localeCodes = config.get('locales');
    // /en/users
    // /users
    // first remove the first slash from the url
    // then split the pathname by the /
    // then get the first segment of the created array 
    let [firstSegmentOfLocation] = history.location.pathname.replace(/^\//, '').split('/');

    if (localeCodes[firstSegmentOfLocation]) {
        document.documentElement.dir = localeCodes[firstSegmentOfLocation];
        document.documentElement.lang = firstSegmentOfLocation;
    }
};