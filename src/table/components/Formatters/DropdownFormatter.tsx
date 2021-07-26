import React from 'react';
import Is from '@flk/supportive-is';
import { SelectInput } from '../../../form';

export default function DropdownFormatter({ record, column }) {
    const { value, items, onChange, multiple, label, placeholder } = column;

    const isMultipleSelect = multiple !== undefined ? multiple : Is.array(value);

    const onSelectingItems = selectedItems => {
        onChange(record, selectedItems, column);
    }

    return <SelectInput value={value || ''} placeholder={placeholder} label={label} multiple={isMultipleSelect} onChange={onSelectingItems} items={items} />
}