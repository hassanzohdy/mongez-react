import React from 'react';
import PropTypes from 'prop-types';
import { Obj } from 'reinforcements';
import Globals from './../../globals';
import MultiDirection from './MultiDirection';
import styleSettings from '../utils/style-settings';
import CssBaseline from '@material-ui/core/CssBaseline';
import { setExternalFontFamily } from '../utils/font-family-switcher';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Is from '@flk/supportive-is';

export default function Theme(props) {
    let fontFamily = styleSettings.get(`fontFamily.${Globals.localeCode}`);

    if (Is.plainObject(fontFamily)) {
        fontFamily = [fontFamily];
    }

    const fonts = [];

    for (const font of fontFamily) {
        fonts.push(font.fontFamily);
        setExternalFontFamily(font.src);
    }

    // const fontFamily = styleSettings.get(`fontFamily.${Globals.localeCode}.fontFamily`);
    // const fontFamilySrc = styleSettings.get(`fontFamily.${Globals.localeCode}.src`);

    const themeSettings: any = {
        // palette: {
        //     type: "dark",
        // },
        direction: Globals.direction,
        status: 'orange',
    };

    if (!Is.empty(fonts)) {
        themeSettings.typography = {
            fontFamily: fonts.map(font => `"${font}"`).join(','),
        };
    }
    
    if (styleSettings.get('colors.primary')) {
        Obj.set(themeSettings, 'palette.primary.main', styleSettings.get('colors.primary'));
    }

    if (styleSettings.get('colors.secondary')) {
        Obj.set(themeSettings, 'palette.secondary.main', styleSettings.get('colors.secondary'));
    }

    const theme = createTheme(themeSettings);

    return (
        <MultiDirection>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </MultiDirection>
    )
}

Theme.propTypes = {
    children: PropTypes.any.isRequired,
};