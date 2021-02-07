import { Obj } from 'reinforcements';
import React from 'react';
import router from '../../router/index2.js';
import { translatedTitle } from '../../utils/metadata.js';
import permissionsObserver from './permissionsObserver.js';
import LazyTable from '../../table/components/LazyTable.js';
import AccessDenied from '../../layout/components/AccessDenied.js';
import TableAddButton from '../../table/components/Actions/TableAddButton.js';

const defaultRoles = {
    list: true,
    edit: true,
    add: true,
    delete: true,
    view: true,
};
function crudPage(options) {
    const { role, permissions: pagePermissions = {} } = options;
    const permissions = Obj.merge(pagePermissions, defaultRoles);
    const haveAccessTo = (permission) => {
        if (!role)
            return true;
        return permissions[permission] && permissionsObserver.isGranted(role + '.' + permission);
    };
    return function ({ props }) {
        translatedTitle(options.title || options.table.heading);
        if (!haveAccessTo('list'))
            return React.createElement(AccessDenied, null);
        const sendRequest = params => {
            return options.service.list(params);
        };
        const mapResponse = (response) => {
            const { records, paginationInfo } = response.data;
            return {
                records,
                pagination: paginationInfo,
            };
        };
        options.haveAccessTo = haveAccessTo;
        if (!options.table.addButtons) {
            options.table.addButtons = [TableAddButton];
        }
        return React.createElement(LazyTable, Object.assign({}, props, { options: options, defaultRequestParams: router.queryString.all(), request: sendRequest, mapResponse: mapResponse }));
    };
}

export default crudPage;
