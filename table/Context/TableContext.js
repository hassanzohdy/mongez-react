import React from 'react';

const tableOptions = {
    tableInfo: {},
    options: null,
    service: null,
    updateRecords: null,
    records: null,
};
const TableContext = React.createContext(tableOptions);

export default TableContext;
