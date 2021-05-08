import React from 'react';
import styleSettings from './../../layout/utils/style-settings';

import {
    ThemeProvider,
    LinearProgress,
    createMuiTheme
} from "@material-ui/core";
import { Obj } from 'reinforcements';

export default function ProgressBar({ color = null }) {
    let primaryColor = styleSettings.get('colors.primary');

    const settings = {};

    if (color) {
        Obj.set(settings, 'palette.primary.main', color);
    }
    else if (primaryColor) {
        Obj.set(settings, 'palette.primary.main', primaryColor);
    }

    const theme = createMuiTheme(settings);
    return (
        <ThemeProvider theme={theme}>
            <LinearProgress />
        </ThemeProvider>
    )
}