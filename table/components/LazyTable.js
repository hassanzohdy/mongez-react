import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table.js';

function LazyTable(props) {
    let { request, options, mapResponse, defaultRequestParams = {}, ...otherProps } = props;
    let [isLoading, updateLoader] = React.useState(true);
    let [tableInfo, setTableInfo] = React.useState(defaultRequestParams);
    let [tableBody, updateTableBody] = React.useState({});
    // first step, set a loading state
    // second step, get data from service
    // third step, stop the loader and display the records
    // only once the component is rendered 
    React.useEffect(() => {
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
    }, [request, mapResponse, tableInfo]);
    const updateTableInfo = newTableInfo => {
        setTableInfo(newTableInfo);
        updateLoader(true);
    };
    return (React.createElement(Table, Object.assign({ options: options, isLoading: isLoading, records: tableBody.records, pagination: tableBody.pagination, onChange: updateTableInfo }, otherProps)));
}
LazyTable.propTypes = {
    options: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    mapResponse: PropTypes.func.isRequired,
};

export default LazyTable;
