import React from 'react';
import { Grid } from '@material-ui/core';

function GridItem(props) {
    return React.createElement(Grid, Object.assign({ item: true, xs: true }, props));
}

export default GridItem;
