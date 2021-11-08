import React from 'react';
import { toInputName } from 'reinforcements';

export type HiddenInputProps = {
    name: string;
    value: string;
    [id: string]: any;
};

export default function HiddenInput({ name, value, ...props }: HiddenInputProps) {
    return <input type="hidden" name={toInputName(name)} value={value} {...props} />
}