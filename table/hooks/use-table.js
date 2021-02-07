import React from 'react';
import TableContext from '../Context/TableContext.js';

function useTable() {
    return React.useContext(TableContext);
}

export default useTable;
