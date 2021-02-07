import React from 'react';
import { InputProps } from './FormInput';
export declare type CheckboxProps = InputProps & {
    checked?: boolean;
    readOnly?: boolean;
    onChange?(checked: boolean, value: string, e: any): any;
    defaultChecked?: boolean;
    labelClasses?: Object;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
};
export default function withCheckbox(WrappedCheckboxComponent: any): React.FC;
