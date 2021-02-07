import React from 'react';
import { Typography } from '@material-ui/core';

const TextCenter = props => React.createElement(Typography, Object.assign({ component: "div", align: "center" }, props));
const TextLeft = props => React.createElement(Typography, Object.assign({ component: "div", align: "left" }, props));
const TextRight = props => React.createElement(Typography, Object.assign({ component: "div", align: "right" }, props));
const TextJustify = props => React.createElement(Typography, Object.assign({ component: "div", align: "justify" }, props));

export { TextCenter, TextJustify, TextLeft, TextRight };
