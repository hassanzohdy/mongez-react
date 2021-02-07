import 'reinforcements';
import history from './router-history.js';
import 'sprintf-js';
import { getLocaleCodes, updateCurrentLocaleCode } from '../localization/locales.js';
import events from '../events/events.js';
import { SWITCHING_LOCALE_CODE_EVENT } from '../events/events-list.js';

/**
 * Set current locale code at the beginning of the application
 */
function detectLocaleCodeChange() {
    // /en/users
    // /users
    // first remove the first slash from the url
    // then split the pathname by the /
    // then get the first segment of the created array 
    let [localeCode] = history.location.pathname.replace(/^\//, '').split('/');
    if (getLocaleCodes().includes(localeCode)) {
        updateCurrentLocaleCode(localeCode);
    }
    events.on(SWITCHING_LOCALE_CODE_EVENT, (newLocaleCode) => {
        updateCurrentLocaleCode(newLocaleCode);
    });
}

export default detectLocaleCodeChange;
