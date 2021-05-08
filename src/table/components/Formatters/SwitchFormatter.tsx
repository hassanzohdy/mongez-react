import React from 'react';
import { SwitchButton } from './../../../form';

export default function SwitchFormatter({ record, column }) {
    const { value, switchComponent: SwitchComponent = SwitchButton, settings } = column;

    const { onChange } = settings;

    const onSwitching = checked => {
        column.value = checked;
        onChange(record, checked, column);
    };

    return <SwitchComponent defaultChecked={value} onChange={onSwitching} />
}