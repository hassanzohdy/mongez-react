import React from 'react';

export interface RecordData {
    record: {
        [type: string]: any;
    };
    updateRecord?: Function;
}

const row: RecordData = {
    record: {}, 
    updateRecord: null,
}

const TableRowContext = React.createContext(row);

export default TableRowContext;