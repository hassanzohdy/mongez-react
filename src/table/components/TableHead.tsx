import React from 'react';
import BoldCell from './BoldCell';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { makeStyles, styled, TableRow } from '@material-ui/core';
import MaterialTableHead from '@material-ui/core/TableHead';
import { ElseIf, If } from '../../components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Is from '@flk/supportive-is';

const ClickableCell = styled(BoldCell)({
    cursor: 'pointer'
})

const useStyles = makeStyles({
    sortArrow: {
        fontSize: '1.5rem',
        verticalAlign: 'middle',
        marginLeft: '0.4rem',
    }
})

function TableColumn({ column }) {
    const { setSortBy, sortingColumn } = useTable();

    const { sortBy, sortDirection } = sortingColumn;

    const classes = useStyles();

    const changeSortDirection = () => {
        let newSortDirection = 'asc';

        let newSortBy = column.sortBy;

        if (sortingColumn.sortBy !== column.sortBy) {
            newSortDirection = 'asc';
        } else if (sortDirection === 'asc') {
            newSortDirection = 'desc';
        } else if (sortingColumn.sortBy === column.sortBy && sortDirection === 'desc') {
            newSortBy = '';
            newSortDirection = '';
        }

        setSortBy({
            sortBy: newSortBy,
            sortDirection: newSortDirection,
        })
    };

    if (column.sortBy || column.sortable) {
        if (!column.sortBy) {
            column.sortBy = column.key;
        }

        return (
            <>
                <ClickableCell align="center" onClick={changeSortDirection}>
                    {Is.string(column.heading) ? trans(column.heading) : column.heading}

                    <If condition={column.sortBy === sortBy}>
                        <If condition={sortDirection === 'asc'}>
                            <ArrowUpwardIcon className={classes.sortArrow} />
                        </If>
                        <ElseIf condition={sortDirection === 'desc'}>
                            <ArrowDownwardIcon className={classes.sortArrow} />
                        </ElseIf>
                    </If>
                </ClickableCell>
            </>
        );
    }
    return <BoldCell align="center">
        {Is.string(column.heading) ? trans(column.heading) : column.heading}
    </BoldCell>;
}

export default function TableHead() {
    const { options } = useTable();

    const columns = options.table.columns.map((column, index) => {
        return <TableColumn key={index} column={column} />;
    });

    return (
        <MaterialTableHead>
            <TableRow>
                {columns}
            </TableRow>
        </MaterialTableHead>
    )
}