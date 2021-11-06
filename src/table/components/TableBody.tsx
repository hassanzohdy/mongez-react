import React from 'react';
import Is from '@flk/supportive-is';
import { Obj } from 'reinforcements';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import { Tooltip, TextCenter } from './../../components';
import MaterialTableBody from '@material-ui/core/TableBody';
import TableRowContext from '../Context/TableRowContext';

export default function TableBody({ isLoading }) {
    const { records, options, updateRecords, displayedColumns } = useTable();

    let tableRows;

    if (isLoading) {
        tableRows = (
            <TableRow>
                <TableCell align="center" colSpan={options.table.columns.length}>
                    <TextCenter>{trans('table.loading')}</TextCenter>
                </TableCell>
            </TableRow>
        );
    } else if (Is.array(records) && Is.empty(records)) {
        tableRows = (
            <TableRow>
                <TableCell align="center" colSpan={options.table.columns.length}>
                    {trans('table.noResults')}
                </TableCell>
            </TableRow>
        );
    } else {
        tableRows = records.map((record, rowIndex) => {
            if (!record.columnsList) {
                record.columnsList = Obj.clone(options.table.columns);
            }

            const tableRowValue = {
                record,
                rowIndex,
                updateRecord(record) {
                    updateRecords(records => {
                        records[rowIndex] = record;

                        return [...records];
                    });
                }
            }

            return (
                <TableRowContext.Provider key={record.id} value={tableRowValue}>
                    <TableRow>
                        {record.columnsList.filter(column => displayedColumns.includes(column.key)).map((column, columnIndex) => {
                            // if (column.cell) return column.cell;

                            column.value = Obj.get(column, 'value', Obj.get(record, column.key));

                            // if no value and there is a default value
                            // then create new key `originalValue` and override 
                            // the value key with the default value 
                            if (!column.value && column.defaultValue) {
                                column.originalValue = column.value;
                                column.value = column.defaultValue;
                            }

                            const columnValue = column.formatter ? <column.formatter options={options} record={record} column={column} rowIndex={rowIndex} columnIndex={columnIndex} /> : column.value;

                            let Wrapper = ({ children }) => <>{children}</>;

                            if (column.tooltip) {
                                Wrapper = ({ children }) => <Tooltip title={column.tooltip(record)}>
                                    <span>{children}</span>
                                </Tooltip>
                            }

                            column.cell = <TableCell key={column.heading} align="center">
                                <Wrapper>{columnValue}</Wrapper>

                            </TableCell>;

                            return column.cell;
                        })}
                    </TableRow>
                </TableRowContext.Provider>
            )
        });
    }


    return (
        <MaterialTableBody>
            {tableRows}
        </MaterialTableBody>
    );
}