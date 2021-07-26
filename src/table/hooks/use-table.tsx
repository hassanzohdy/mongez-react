import React from 'react';
import TableContext, { ITableContext } from '../Context/TableContext';

export default function useTable(): ITableContext {
    return React.useContext(TableContext);
}