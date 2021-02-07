export { currentDirection, directionOf, getCurrentLocaleCode, getLocaleCodes, updateCurrentLocaleCode } from './locales.js';
import { extend } from './translator.js';
export { trans, translateFrom } from './translator.js';

var localization = {
    extend,
};

export default localization;
