import React from 'react';
import Table from './Table';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';

export default function LazyTable(props) {
    let { request, records, paginationInfo, options, mapResponse, defaultRequestParams = {}, ...otherProps } = props;

    let [isLoading, updateLoader] = React.useState(request && Is.empty(records));
    let [tableInfo, setTableInfo] = React.useState(defaultRequestParams);
    let [tableBody, updateTableBody] = React.useState(({
        records: records || [],
        paginationInfo: paginationInfo || {},
    } as any));

    // first step, set a loading state
    // second step, get data from service
    // third step, stop the loader and display the records

    // only once the component is rendered 
    React.useEffect(() => {
        if (!request) return;

        request(tableInfo).then(response => {
            const { records, pagination } = mapResponse(response);

            updateTableBody({
                records,
                pagination,
            });

            updateLoader(false);
        }).catch(e => {
            console.log(e);
        });
    }, [tableInfo]);

    React.useEffect(() => {
        updateTableBody({
            ...tableBody,
            paginationInfo
        })
    }, [paginationInfo]);

    React.useEffect(() => {
        updateTableBody({
            ...tableBody,
            records
        })
    }, [records]);

    const updateTableInfo = newTableInfo => {
        setTableInfo(newTableInfo);
        updateLoader(true);
    }

    return (
        <Table
            options={options}
            isLoading={isLoading}
            records={tableBody.records}
            pagination={tableBody.pagination}
            onChange={updateTableInfo}
            {...otherProps}
        />
    );
}

LazyTable.propTypes = {
    options: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    mapResponse: PropTypes.func.isRequired,
};