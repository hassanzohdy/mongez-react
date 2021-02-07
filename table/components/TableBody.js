import { Obj } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import Is from '@flk/supportive-is';
import { TableRow } from '@material-ui/core';
import '../../components/Link.js';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../../form/Context/FormContext.js';
import '../../components/Confirm.js';
import 'react-timeago';
import Tooltip from '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import { TextCenter } from '../../components/Aligned.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import useTable from '../hooks/use-table.js';
import TableCell from '@material-ui/core/TableCell';
import MaterialTableBody from '@material-ui/core/TableBody';
import TableRowContext from '../Context/TableRowContext.js';

function TableBody({ isLoading }) {
    const { records, options, updateRecords } = useTable();
    let tableRows;
    if (isLoading) {
        tableRows = (React.createElement(TableRow, null,
            React.createElement(TableCell, { align: "center", colSpan: options.table.columns.length },
                React.createElement(TextCenter, null, trans('loading')))));
    }
    else if (Is.array(records) && Is.empty(records)) {
        tableRows = (React.createElement(TableRow, null,
            React.createElement(TableCell, { align: "center", colSpan: options.table.columns.length }, trans('noResults'))));
    }
    else {
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
            };
            return (React.createElement(TableRowContext.Provider, { key: record.id, value: tableRowValue },
                React.createElement(TableRow, null, record.columnsList.map((column, columnIndex) => {
                    // if (column.cell) return column.cell;
                    column.value = Obj.get(column, 'value', Obj.get(record, column.key));
                    // if no value and there is a default value
                    // then create new key `originalValue` and override 
                    // the value key with the default value 
                    if (!column.value && column.defaultValue) {
                        column.originalValue = column.value;
                        column.value = column.defaultValue;
                    }
                    const columnValue = column.formatter ? React.createElement(column.formatter, { record: record, column: column, rowIndex: rowIndex, columnIndex: columnIndex }) : column.value;
                    let Wrapper = ({ children }) => React.createElement(React.Fragment, null, children);
                    if (column.tooltip) {
                        Wrapper = ({ children }) => React.createElement(Tooltip, { title: column.tooltip(record) },
                            React.createElement("span", null, children));
                    }
                    column.cell = React.createElement(TableCell, { key: column.heading, align: "center" },
                        React.createElement(Wrapper, null, columnValue));
                    return column.cell;
                }))));
        });
    }
    return (React.createElement(MaterialTableBody, null, tableRows));
}

export default TableBody;
