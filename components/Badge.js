import React from 'react';
import { makeStyles } from '@material-ui/core';
import { red, blue, orange, yellow, green, grey } from '@material-ui/core/colors';
import clsx from 'clsx';

const badgeStyle = makeStyles(() => ({
    root: {
        color: '#fff',
        display: 'inline-block',
        padding: '5px 12px',
        fontSize: '10px',
        textAlign: 'center',
        fontWeight: 900,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        verticalAlign: 'baseline',
    },
    roundedBadge: {
        borderRadius: '12px',
    },
}));
function Badge(props) {
    let { backgroundColor, color, className, rounded, style = {}, ...otherProps } = props;
    const { root, roundedBadge } = badgeStyle();
    const classesList = clsx(root, className, {
        [roundedBadge]: rounded === true
    });
    const elementStyle = Object.assign({}, style);
    elementStyle.backgroundColor = backgroundColor;
    elementStyle.color = color;
    return React.createElement("span", Object.assign({ className: classesList, style: elementStyle }, otherProps));
}
const RedBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: red[400], color: "#FFF" }, props));
const BlueBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: blue[400], color: "#FFF" }, props));
const OrangeBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: orange[400], color: "#FFF" }, props));
const YellowBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: yellow[600], color: "#FFF" }, props));
const GreenBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: green[400], color: "#FFF" }, props));
const BlackBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: "#000", color: "#FFF" }, props));
const DarkBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: "#333", color: "#FFF" }, props));
const GreyBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: grey[400], color: "#000" }, props));
const WhiteBadge = props => React.createElement(Badge, Object.assign({ backgroundColor: "#FFF", color: "#000" }, props));

export default Badge;
export { BlackBadge, BlueBadge, DarkBadge, GreenBadge, GreyBadge, OrangeBadge, RedBadge, WhiteBadge, YellowBadge };
