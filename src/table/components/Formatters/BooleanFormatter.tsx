import React from 'react';
import { Obj } from 'reinforcements';
import CancelIcon from '@material-ui/icons/Cancel';
import { ColoredIcon } from './../../../components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function BooleanFormatter({ record, column }) {
    let value = Obj.get(record || {}, column.key, false);

    const { settings } = column;

    if (settings) {
        if (settings.reversed) {
            value = !value;
        }
    
        if (settings.condition) {
            value = Boolean(settings.condition(value, record, column));
        }
    }

    if (value) {
        return <ColoredIcon icon={CheckCircleIcon} color="#86b947" />
    }

    return <ColoredIcon icon={CancelIcon} color="#f13434" />
}