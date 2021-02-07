import 'reinforcements';
import '../router/router-history.js';
import concatRoute from '../router/concat-route.js';
import { getCurrentBseAppPath } from '../router/apps-list.js';
import React from 'react';
import 'sprintf-js';
import { getCurrentLocaleCode } from '../localization/locales.js';
import '../router/routes-list.js';
import { hasInitialLocaleCode } from '../router/navigator.js';
import 'react-dom';
import { Redirect as Redirect$1 } from 'react-router-dom';
import '../router/renderer.js';
import '../router/update-current-localization.js';

const Redirect = React.forwardRef(function (props, forwardedRef) {
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
    return React.createElement(Redirect$1, Object.assign({}, otherProps, { ref: forwardedRef }));
});

export default Redirect;
