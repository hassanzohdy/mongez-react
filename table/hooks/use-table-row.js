import React from 'react';
import TableRowContext from '../Context/TableRowContext.js';

function useTableRow() {
    return React.useContext(TableRowContext);
}

export default useTableRow;
