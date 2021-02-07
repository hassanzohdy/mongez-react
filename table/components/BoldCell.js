import React from 'react';
import { styled, TableCell } from '@material-ui/core';

const BaseCell = styled(TableCell)({
    fontWeight: 'bold',
});
function BoldCell(props) {
    return React.createElement(BaseCell, Object.assign({}, props));
}

export default BoldCell;
