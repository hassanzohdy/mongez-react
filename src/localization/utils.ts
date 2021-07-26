import config from '../config';
import Globals from '../globals';
import Is from '@flk/supportive-is';
import { LangModeType } from './../utils/CommonTypes';

/**
 * Get localized text from the given value
 * 
 * @param {object|array|string} value
 * @returns {string}
 */
export function getLocalizedText(value: any): string {
    if (!value) return '';

    if (Is.scalar(value)) return String(value);

    let langMode = getLangMode();

    if (langMode === 'object' && Is.object(value)) {
        return value[Globals.localeCode];
    } else if (langMode === 'array' && Is.array(value)) {
        return String((value.find(val => val.localeCode === Globals.localeCode) || {}).text || '');
    }

    return '';
}

/**
 * Get language mode in the application
 * 
 * @returns {LangModeType}
 */
export function getLangMode(): LangModeType {
    return config.get('langMode', 'object');
}