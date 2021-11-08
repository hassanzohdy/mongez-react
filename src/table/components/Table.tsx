import React from 'react';
import { Form } from './../../form';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { Obj } from 'reinforcements';
import { If } from '../../components';
import TableFilter from './TableFilter';
import TableToolBar from './TableToolBar';
import { HiddenInput } from '../../form';
import { styled } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from './TablePagination';
import { queryString, updateQueryString } from './../../router';
import MaterialTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { LightBackdrop } from './../../layout/components/Backdrop';
import TableContext, { ITableContext } from '../Context/TableContext';
import arabicText from './../locales/ar';
import englishText from './../locales/en';
import localization from './../../localization';

localization.extend('ar', arabicText);
localization.extend('en', englishText);

const TablePaper = styled(Paper)({
    position: 'relative',
})

let resetPageNumber = null;

export default function Table(props: any) {
    let { options, records, pagination: defaultPagination, isLoading: defaultIsLoading } = props;
    const [tableRecords, setRecords] = React.useState(records);

    const queryParams = queryString();

    const [currentTableInfo, setTableInfo] = React.useState({} as any);
    const [pagination, setPaginationInfo] = React.useState(defaultPagination);
    const [sortingColumn, setSortingColumn] = React.useState({
        sortBy: queryParams.get('sortBy'),
        sortDirection: queryParams.get('sortDirection'),
    });

    const [isLoading, loading] = React.useState(defaultIsLoading);

    const formRef = React.useRef() as any;

    const { service } = options;

    React.useEffect(() => {
        setRecords(records);
    }, [records]);

    React.useEffect(() => {
        loading(defaultIsLoading);
    }, [defaultIsLoading]);

    React.useEffect(() => {
        setPaginationInfo(defaultPagination);
    }, [defaultPagination]);

    const updateTableInfo = newInfo => {
        const newTableInfo = Obj.merge(currentTableInfo, newInfo);

        setTableInfo(newTableInfo);

        setTimeout(() => {
            formRef.current.submit();
        }, 0);
    };

    const setPageNumber = pageNumber => {
        resetPageNumber = false;

        pageNumber = Number(pageNumber);

        currentTableInfo.pageNumber = pageNumber;

        updateTableInfo({
            page: pageNumber,
        });
    };

    const setItemsPerPage = itemsPerPage => {
        resetPageNumber = true;
        updateTableInfo({
            itemsPerPage,
            page: 1, // reset again page to 1
        });
    };

    const submitFilter = (e, form) => {
        // reset page number
        const pageTableElement = document.getElementById('table-page-number') as HTMLInputElement;
        if (resetPageNumber !== false) {
            pageTableElement.value = '1';
        } else {
            if (String(currentTableInfo.pageNumber) !== String(pageTableElement.value)) {
                pageTableElement.value = currentTableInfo.pageNumber;
                updateTableInfo({
                    pageNumber: Number(currentTableInfo.pageNumber),
                });
            }
        }

        if (options.updateQueryString !== false) {
            updateQueryString(form.toQueryString());
        }

        const formData = form.toObject();

        sendRequest(formData);
    };

    const sendRequest = data => {
        loading(true);

        const listMethod = Obj.get(options, 'requestMethods.list', 'list');

        service[listMethod](data).then(response => {
            setPaginationInfo(response.data.paginationInfo);
            setRecords(response.data.records);
            formRef.current.submitting(false);
            loading(false);
            resetPageNumber = null;
        });
    }

    const setSortBy = (newSortData) => {
        setSortingColumn({
            sortBy: newSortData.sortBy,
            sortDirection: newSortData.sortDirection,
        });

        updateTableInfo({
            sortBy: newSortData.sortBy,
            sortDirection: newSortData.sortDirection,
        });
    }

    const tableOptions: ITableContext = {
        options,
        pagination,
        setPageNumber,
        sortingColumn,
        setSortBy,
        setPaginationInfo,
        setItemsPerPage,
        itemsPerPage: currentTableInfo.itemsPerPage,
        loading,
        pageNumber: currentTableInfo.pageNumber,
        records: tableRecords,
        updateRecords: setRecords,
        service: options.service,
    };

    return (
        <TableContext.Provider value={tableOptions}>
            <TableToolBar />

            <Form ref={formRef} className="filterForm" onSubmit={submitFilter}>
                <TableFilter />

                <TablePaper>
                    <TableContainer>
                        <LightBackdrop open={isLoading} />
                        <MaterialTable>
                            <TableHead />
                            <TableBody isLoading={isLoading} />
                        </MaterialTable>
                    </TableContainer>
                    <If condition={Boolean(sortingColumn.sortBy)}>
                        <HiddenInput name="sortBy" value={sortingColumn.sortBy} />
                        <HiddenInput name="sortDirection" value={sortingColumn.sortDirection} />
                    </If>
                    <If condition={Boolean(pagination)}>
                        <HiddenInput name="page" id="table-page-number" value={currentTableInfo.page || 1} />
                        <HiddenInput name="itemsPerPage" value={currentTableInfo.itemsPerPage} />
                        <TablePagination />
                    </If>
                </TablePaper>
            </Form>
        </TableContext.Provider>
    );
}