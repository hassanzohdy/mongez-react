import React from 'react';
import Tooltip from './Tooltip';

const ColoredIcon = React.forwardRef(function (props: any, ref) {
    let { color, icon: Icon, title = null, ...otherProps } = props;
    let iconProps: any = {};
    if (['primary', 'secondary'].includes(color)) {
        iconProps.color = color;
    } else {
        iconProps.style = {
            fill: color
        };
    }

    iconProps = { ...iconProps, ...otherProps };

    let icon = <Icon {...iconProps} ref={ref} />

    if (title) {
        return (
            <Tooltip title={title}>
                <span>{icon}</span>
            </Tooltip>
        )
    }

    return icon;
});

export default ColoredIcon;