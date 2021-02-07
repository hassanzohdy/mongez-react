import config from '../config/index.js';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BaseTooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    tooltip: {
        backgroundColor: config.get('tooltip.backgroundColor', '#000'),
    }
});
function Tooltip(props) {
    const classes = useStyles();
    return React.createElement(BaseTooltip, Object.assign({ classes: { tooltip: classes.tooltip }, placement: "top" }, props));
}

export default Tooltip;
