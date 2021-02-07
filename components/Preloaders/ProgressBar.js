import { Obj } from 'reinforcements';
import React from 'react';
import styleSettings from '../../layout/utils/style-settings.js';
import { createMuiTheme, ThemeProvider, LinearProgress } from '@material-ui/core';

function ProgressBar({ color = null }) {
    let primaryColor = styleSettings.get('colors.primary');
    const settings = {};
    if (color) {
        Obj.set(settings, 'palette.primary.main', color);
    }
    else if (primaryColor) {
        Obj.set(settings, 'palette.primary.main', primaryColor);
    }
    const theme = createMuiTheme(settings);
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(LinearProgress, null)));
}

export default ProgressBar;
