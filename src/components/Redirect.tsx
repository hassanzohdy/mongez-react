import React from 'react';
import concatRoute from './../router/concat-route';
import { getCurrentLocaleCode } from './../localization';
import { Redirect as ReactRedirect } from 'react-router-dom';
import { hasInitialLocaleCode } from './../router/navigator';
import { getCurrentBseAppPath } from './../router/apps-list';

interface IRedirect {
    to?: string;
    localeCode?: string;
    relative?: boolean;
    baseApp?: string;
}

const Redirect = React.forwardRef(function (props: IRedirect|any, forwardedRef) {
    let { to, localeCode, relative, baseApp = getCurrentBseAppPath(), ...otherProps } = props;

    if (!localeCode && hasInitialLocaleCode()) {
        localeCode = getCurrentLocaleCode();
    }

    let path = concatRoute(baseApp, to);

    if (localeCode) {
        // /users
        // /en/users
        // to = /
        path = concatRoute(localeCode, path);
        // /en
    }
    
    otherProps.to = concatRoute(path);

    return <ReactRedirect {...otherProps} ref={forwardedRef} />
});
    
export default Redirect;