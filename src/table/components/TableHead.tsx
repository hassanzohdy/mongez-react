import React from 'react';
import BoldCell from './BoldCell';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { TableRow } from '@material-ui/core';
import MaterialTableHead from '@material-ui/core/TableHead';

export default function TableHead() {
    const { options } = useTable();

    const columns = options.table.columns.map((column, index) => {
        return <BoldCell align="center" key={index}>{trans(column.heading)}</BoldCell>;
    });

    return (
        <MaterialTableHead>
            <TableRow>
                {columns}
            </TableRow>
        </MaterialTableHead>
    )
}