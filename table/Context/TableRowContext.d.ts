import React from 'react';
export interface RecordData {
    record: {
        [type: string]: any;
    };
    updateRecord?: Function;
}
declare const TableRowContext: React.Context<RecordData>;
export default TableRowContext;
