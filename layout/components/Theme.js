import { Obj } from 'reinforcements';
import React from 'react';
import styleSettings from '../utils/style-settings.js';
import Globals from '../../globals/index.js';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MultiDirection from './MultiDirection.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setExternalFontFamily } from '../utils/font-family-switcher.js';

function Theme(props) {
    const fontFamily = styleSettings.get(`fontFamily.${Globals.localeCode}.fontFamily`);
    const fontFamilySrc = styleSettings.get(`fontFamily.${Globals.localeCode}.src`);
    setExternalFontFamily(fontFamilySrc);
    const themeSettings = {
        direction: Globals.direction,
        status: 'orange',
    };
    if (fontFamily) {
        themeSettings.typography = {
            fontFamily
        };
    }
    if (styleSettings.get('colors.primary')) {
        Obj.set(themeSettings, 'palette.primary.main', styleSettings.get('colors.primary'));
    }
    if (styleSettings.get('colors.secondary')) {
        Obj.set(themeSettings, 'palette.secondary.main', styleSettings.get('colors.secondary'));
    }
    const theme = createMuiTheme(themeSettings);
    return (React.createElement(MultiDirection, null,
        React.createElement(ThemeProvider, { theme: theme },
            React.createElement(CssBaseline, null),
            props.children)));
}
Theme.propTypes = {
    children: PropTypes.any.isRequired,
};

export default Theme;
