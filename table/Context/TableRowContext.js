import React from 'react';

const row = {
    record: {},
    updateRecord: null,
};
const TableRowContext = React.createContext(row);

export default TableRowContext;
