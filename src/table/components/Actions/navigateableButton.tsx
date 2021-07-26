import React from 'react';
import useTable from '../../hooks/use-table';
import { IconButton } from '@material-ui/core';
import { trans } from './../../../localization';
import { Tooltip, Link } from './../../../components';
import { currentRoute, concatRoute } from './../../../router';
import { Obj } from 'reinforcements';

export default function navigateableButton({ icon: Icon, navigateTo = null, permission = null, tooltip }) {
    return function (props: any) {
        const { record, column } = props;
        const { options } = useTable();

        if (permission && !options.haveAccessTo(permission)) return null;

        let path;

        if (column.navigateTo) {
            path = column.navigateTo(record, column);
        } else if (navigateTo) {
            path = navigateTo(record, column);
        } else if (Obj.get(options, 'navigation.' + permission)) {
            const buttonNavigation = Obj.get(options, 'navigation.' + permission);
            path = buttonNavigation(record, column, options);
        } else {
            path = concatRoute(currentRoute(), record.id);
        }

        return (
            <Tooltip title={trans(tooltip)}>
                <IconButton component={Link} to={path}>
                    <Icon />
                </IconButton>
            </Tooltip>
        )
    }
}
