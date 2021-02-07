import { FC } from 'react';
import { RestfulService } from './../../http';
import { FormProps } from '././../../table/components/TableForm';
export interface TableColumn {
    heading: string;
    key?: string;
    formatter?: Function;
    buttons?: any[];
    settings?: any;
    tooltip?: Function;
}
export interface FilterOption {
    type: 'search' | 'select' | 'autocomplete';
    placeholder?: string;
    name: string;
    col: number;
    inputProps?: any;
}
export interface CrudOptions {
    role?: string;
    title?: string;
    permissions?: object;
    haveAccessTo?: Function;
    service?: RestfulService;
    table: {
        heading: string;
        addButtons?: any[];
        columns: TableColumn[];
        filter?: FilterOption[];
        query?: string;
        inputProps?: any;
    };
    formOptions?: {
        form: FC<FormProps>;
        singleName?: string;
        onSave?: Function;
        defaultData?: object;
        modalOptions?: {
            size?: string;
            fullScreen?: boolean;
        };
    };
}
export default function crudPage(options: CrudOptions): ({ props }: {
    props: any;
}) => JSX.Element;
