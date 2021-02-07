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
import { Link as Link$1 } from 'react-router-dom';
import styleSettings from '../layout/utils/style-settings.js';
import { styled } from '@material-ui/core';
import '../router/renderer.js';
import '../router/update-current-localization.js';
import MaterialLink from '@material-ui/core/Link';

const ColoredLink = styled(MaterialLink)({
    color: styleSettings.get('colors.link'),
});
const Link = React.forwardRef(function (props, forwardedRef) {
    let { to, href, localeCode, color, style = {}, relative, baseApp = getCurrentBseAppPath(), ...otherLinkProps } = props;
    if (!to && href) {
        to = href;
    }
    if (!to) {
        to = '';
    }
    let materialColor = undefined;
    if (['primary', 'default', 'secondary'].includes(color)) {
        materialColor = color;
    }
    else if (color) {
        style.color = color;
    }
    otherLinkProps.style = style;
    // Using target="_blank" without rel="noopener noreferrer" is a security risk: 
    // @see https://mathiasbynens.github.io/rel-noopener  react/jsx-no-target-blank
    if (otherLinkProps.target) {
        otherLinkProps.rel = 'noopener noreferrer';
    }
    // if not relative, then use the normal anchor tag
    if (!relative) {
        if (!to.startsWith('http') && !to.startsWith('mailto')) {
            to = 'http://' + to;
        }
        return React.createElement(ColoredLink, Object.assign({ href: to, ref: forwardedRef }, otherLinkProps));
    }
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
    otherLinkProps.to = concatRoute(path);
    // otherLinkProps.onClick = e => {
    //     router.stack.add();
    //     onClick && onClick(e);
    // };
    return React.createElement(ColoredLink, Object.assign({ color: materialColor, component: Link$1 }, otherLinkProps, { ref: forwardedRef }));
});
Link.defaultProps = {
    relative: true,
};

export default Link;
