import React from 'react';
import TableRowContext, { RecordData } from '../Context/TableRowContext';

export default function useTableRow(): RecordData {
    return React.useContext(TableRowContext);
}