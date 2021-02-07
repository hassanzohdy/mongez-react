import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import { TablePagination as TablePagination$1 } from '@material-ui/core';
import useTable from '../hooks/use-table.js';

function TablePagination() {
    const { pagination, itemsPerPage, setItemsPerPage, setPageNumber } = useTable();
    const [currentPage, setCurrentPage] = React.useState(pagination.currentPage - 1);
    const handleChangePage = (e, pageNumber) => {
        setCurrentPage(pageNumber);
        // page has been updated and we need to send again another request to backend
        setPageNumber(pageNumber + 1);
    };
    const allowedItemsPerPage = [10, 15, 20, 25, 30, 50, 100];
    const handleChangeRowsPerPage = e => {
        setItemsPerPage(e.target.value);
        setCurrentPage(0); // reset again current page 
    };
    // display total row translation
    const displayedRows = ({ from, to, count }) => {
        return trans('table.displayedRows', from, to, count);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TablePagination$1, { rowsPerPageOptions: allowedItemsPerPage, component: "div", count: pagination.totalRecords, rowsPerPage: itemsPerPage || pagination.itemsPerPage, page: currentPage, labelDisplayedRows: displayedRows, labelRowsPerPage: trans('table.labelRowsPerPage'), onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })));
}

export default TablePagination;
