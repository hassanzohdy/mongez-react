import events, { SWITCHING_LOCALE_CODE_EVENT } from "./../events";
import history from "./router-history";
import { updateCurrentLocaleCode, getLocaleCodes } from './../localization';

/**
 * Set current locale code at the beginning of the application
 */
export default function detectLocaleCodeChange() {
    // /en/users
    // /users
    // first remove the first slash from the url
    // then split the pathname by the /
    // then get the first segment of the created array 
    let [localeCode] = history.location.pathname.replace(/^\//, '').split('/');

    if (getLocaleCodes().includes(localeCode)) {
        updateCurrentLocaleCode(localeCode);
    }

    events.on(SWITCHING_LOCALE_CODE_EVENT, (newLocaleCode: string) => {
        updateCurrentLocaleCode(newLocaleCode);
    });
};