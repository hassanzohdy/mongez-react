import React from 'react';
import { styled, TableCell } from '@material-ui/core';

const BaseCell = styled(TableCell)({
    fontWeight: 'bold',
});

export default function BoldCell(props) {
    return <BaseCell {...props} />
}