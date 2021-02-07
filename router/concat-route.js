import { trim, rtrim, ltrim } from 'reinforcements';

/**
 * Concatenate the given paths to one single path
 *
 * @param   {...string} segments
 * @returns {string}
 */
function concatRoute(...segments) {
    let path = '';
    for (let segment of segments) {
        segment = String(segment || '');
        if (segment === '/')
            continue;
        segment = '/' + trim(segment || '', '/');
        path += segment;
    }
    path = rtrim(path, '/');
    return '/' + ltrim(path || '/', '/');
}

export default concatRoute;
