import React from 'react';
import { Grid } from '@material-ui/core';

function GridContainer(props) {
    return React.createElement(Grid, Object.assign({ spacing: 1, container: true }, props));
}

export default GridContainer;
