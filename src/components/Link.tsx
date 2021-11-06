import React from 'react';
import { styled } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { getCurrentLocaleCode } from './../localization';
import styleSettings from './../layout/utils/style-settings';
import { concatRoute, hasInitialLocaleCode, getCurrentBseAppPath } from './../router';
import Is from '@flk/supportive-is';

const ColoredLink = styled(MaterialLink)({
    color: styleSettings.get('colors.link'),
});

export type LinkProps = {
    /**
     * Link Path
     */
    to?: string;
    /**
     * Alias to `to` prop
     */
    href?: string;
    /**
     * The locale code for the link
     * Please note that this props must be used only with relative paths only
     */
     localeCode?: string;
     /**
      * Base app path
      * 
      * @default current app bath
      */
      baseApp?: string;
     /**
      * Style
      */
     style?: React.CSSProperties;
     /**
      * Determine whether the current link is relative to our application
      * 
      * @default true
      */
      relative?: boolean;
      /**
       * Other props
       */
      [id: string]: any;
}

const Link = React.forwardRef(function (props: any, forwardedRef) {
    let { to, href, newTab = false, localeCode, color, style = {}, relative, baseApp = getCurrentBseAppPath(), ...otherLinkProps } = props;

    if (!to && href) {
        to = href;
    }

    if (!to) {
        to = '';
    }

    if (Is.url(to)) {
        relative = false;
    }

    let materialColor = undefined;

    if (['primary', 'default', 'secondary'].includes(color)) {
        materialColor = color;
    } else if (color) {
        style.color = color;
    }

    otherLinkProps.style = style;

    if (newTab) {
        otherLinkProps.target = '_blank';
    }

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
        return <ColoredLink href={to} ref={forwardedRef} {...otherLinkProps} />
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

    return <ColoredLink color={materialColor} component={RouterLink} {...otherLinkProps} ref={forwardedRef} />
});

Link.defaultProps = {
    relative: true,
    // localeCode: hasInitialLocaleCode() ? Globals.localeCode : null,
};

// if initial locale code is true, then add the current locale code as locale code prop
// for the link

// /users ? false >> no locale code
// /en/users ? true >> get current locale code

export default Link;