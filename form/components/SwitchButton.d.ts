import React from 'react';
import { CheckboxProps } from './withCheckbox';
declare const SwitchButton: React.FC<CheckboxProps>;
export declare const coloredIOSSwitchButton: (color: any) => React.ComponentType<Pick<any, string | number | symbol> & import("@material-ui/core").StyledComponentProps<"track" | "root" | "switchBase" | "thumb" | "checked" | "focusVisible">>;
export declare const IOSSwitchButton: React.FC<CheckboxProps>;
export default SwitchButton;
