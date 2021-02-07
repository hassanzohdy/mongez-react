import React from 'react';
import Tooltip from './Tooltip.js';

const ColoredIcon = React.forwardRef(function (props, ref) {
    let { color, icon: Icon, title = null, ...otherProps } = props;
    let iconProps = {};
    if (['primary', 'secondary'].includes(color)) {
        iconProps.color = color;
    }
    else {
        iconProps.style = {
            fill: color
        };
    }
    iconProps = { ...iconProps, ...otherProps };
    let icon = React.createElement(Icon, Object.assign({}, iconProps, { ref: ref }));
    if (title) {
        return (React.createElement(Tooltip, { title: title },
            React.createElement("span", null, icon)));
    }
    return icon;
});

export default ColoredIcon;
