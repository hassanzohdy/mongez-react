import React from 'react';
import { CrudOptions } from '../../admin/utils/crudPage';
import { RestfulService } from '../../http/restful-endpoint';
export interface ITableContext {
    /**
     * Current Page number
     */
    page?: number;
    /**
     * List of records that are coming from the backend response
     */
    records?: any[];
    /**
     * Pagination Info
     */
    pagination?: any;
    /**
     * A method to detect whether to initialize loading.
     */
    loading?: Function;
    /**
     * Full Data of table info
     */
    tableInfo?: object;
    /**
     * Items Per Page For Pagination.
     */
    itemsPerPage?: number;
    /**
     * List of crud options
     */
    options?: CrudOptions;
    /**
     * Update list of records of current table
     */
    updateRecords?: Function;
    /**
     * Set Current Page Number
     */
    setPageNumber?: Function;
    /**
     * A restful service to list the table records
     */
    service?: RestfulService;
    /**
     * Set items Per Page
     */
    setItemsPerPage?: Function;
    /**
     * Set Pagination Information
     */
    setPaginationInfo?: Function;
}
declare const TableContext: React.Context<ITableContext>;
export default TableContext;
