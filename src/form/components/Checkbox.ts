import React from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import withCheckbox, { CheckboxProps } from './withCheckbox';

const Checkbox: React.FC<CheckboxProps> = withCheckbox(MaterialCheckbox);

export default Checkbox;