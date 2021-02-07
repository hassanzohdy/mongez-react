import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import { TableRow } from '@material-ui/core';
import useTable from '../hooks/use-table.js';
import BoldCell from './BoldCell.js';
import MaterialTableHead from '@material-ui/core/TableHead';

function TableHead() {
    const { options } = useTable();
    const columns = options.table.columns.map((column, index) => {
        return React.createElement(BoldCell, { align: "center", key: index }, trans(column.heading));
    });
    return (React.createElement(MaterialTableHead, null,
        React.createElement(TableRow, null, columns)));
}

export default TableHead;
