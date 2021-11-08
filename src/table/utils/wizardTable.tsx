import React, { FC } from 'react';
import router from '../../router';
import { Obj } from 'reinforcements';
import { RestfulService } from '../../http';
import permissionsObserver from '../../admin/utils/permissionsObserver';
import { translatedTitle } from '../../utils/metadata';
import LazyTable from '../components/LazyTable';
import { FormProps } from '../components/TableForm';
import AccessDenied from '../../layout/components/AccessDenied';
import TableAddButton from '../components/Actions/TableAddButton';
import Is from '@flk/supportive-is';

type PermissionType = boolean | ((record: any) => boolean);

export type PermissionsList = {
    list?: PermissionType;
    edit?: PermissionType;
    add?: PermissionType;
    delete?: PermissionType;
    view?: PermissionType;
    [key: string]: PermissionType;
}

export interface TableColumn {
    key?: string;
    heading: string;
    sortBy?: string;
    sortable?: boolean;
    defaultValue?: any;
    buttons?: any[];
    settings?: any;
    tooltip?: Function;
    formatter?: Function;
}

export interface FilterOption {
    col: number;
    name: string,
    label?: string;
    inputProps?: any;
    placeholder?: string;
    component?: React.ReactNode;
    type: 'search' | 'select' | 'autocomplete' | 'date' | String;
}

export interface CrudOptions {
    style?: {
        headCells?: React.CSSProperties;
        bodyCells?: React.CSSProperties;
    }
    /**
     * Props that are passed to wizard table component
     */
    props?: object;
    /**
     * Base Permissions role key
     */
    role?: string;
    /**
     * Page Title
     */
    title?: string;
    /**
     * List of service methods that will be called
     */
    requestMethods?: {
        /**
         * The list method for the table
         */
        list?: string;
    };
    /**
     * Here we define what happens when clicking on a button in table actions
     * This will allow setting custom navigation links 
     * 
     * The object keys are matched with table permissions keys
     */
    navigation?: {
        view(record: any, column: any, options: CrudOptions): string;
    },
    /**
     * Set ready records to the table
     * 
     * This will disable the service requests automatically
     */
    records?: any[];
    /**
     * Determine whether rest shall be set
     */
    resetFilterButton?: boolean;
    /**
     * Detect whether to update the url on filtering table
     * Default to true
     */
    updateQueryString?: boolean;
    /**
     * These permissions will be merged with the default permissions
     */
    permissions?: PermissionsList;
    /**
     * A callback function 
     * @param {string} name sub permission key name 
     * @param {object} record Record object 
     * @param {Function} baseAccess Base access function 
     */
    haveAccessTo?(name: string, record?: any, baseAccess?: Function): boolean,
    /**
     * Base Service Class
     */
    service?: RestfulService,
    /**
     * Table configurations options
     */
    table: {
        query?: string;
        heading: string;
        inputProps?: any;
        addButtons?: any[];
        columns: TableColumn[];
        filter?: FilterOption[];
        disableToolbar?: boolean;
    },
    formOptions?: {
        onSave?: Function;
        form: FC<FormProps>,
        lazyForm?: boolean,
        singleName?: string;
        defaultData?: object;
        modalOptions?: {
            size?: string;
            esc?: boolean;
            backdrop?: boolean;
            fullScreen?: boolean;
            saveButtonText?: React.ReactNode;
            [key: string]: any;
        }
    }
}

const defaultRoles: PermissionsList = {
    add: true,
    list: true,
    edit: true,
    view: true,
    delete: true,
};

export default function wizardTable(options: CrudOptions) {
    const { role, permissions: pagePermissions = {} } = options;

    const permissions = Obj.merge(defaultRoles, pagePermissions);

    const haveAccessTo = (permission: string, _record: any = null) => {
        if (Is.callable(permissions[permission])) {
            const permissionObject = permissions[permission];

            const permissionGranted = permissionObject(_record);

            if (permissionGranted === false) return false;
        }

        if (!role && permissions[permission] === undefined) return true;

        return permissions[permission] && permissionsObserver.isGranted(role + '.' + permission);
    };

    return function ({ props }) {
        const [tableOptions] = React.useState(options);

        translatedTitle(tableOptions.title || tableOptions.table.heading);

        if (!haveAccessTo('list')) return <AccessDenied />

        tableOptions.props = props;

        const sendRequest = params => {
            const listMethod = Obj.get(tableOptions, 'requestMethods.list', 'list');

            return tableOptions.service[listMethod](params, tableOptions, props);
        };

        const mapResponse = (response) => {
            const { records, paginationInfo } = response.data;

            return {
                records,
                pagination: paginationInfo,
            };
        };

        if (!tableOptions.haveAccessTo) {
            tableOptions.haveAccessTo = haveAccessTo;
        }

        if (!tableOptions.table.addButtons) {
            tableOptions.table.addButtons = [TableAddButton];
        }

        return <LazyTable {...props} records={(props ? props.records : null) || options.records} options={tableOptions} defaultRequestParams={router.queryString.all()} request={sendRequest} mapResponse={mapResponse} />
    }
}