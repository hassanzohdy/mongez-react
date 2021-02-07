import React from 'react';
import Label from './Label.js';
import HiddenInput from './HiddenInput.js';
import { ColorPicker } from 'material-ui-color';

function ColorInput({ name, label, value, onChange = null }) {
    const [color, setColor] = React.useState(value || '');
    const updateColor = color => {
        setColor(color.css.backgroundColor);
        onChange && onChange(color.css.backgroundColor, color);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(HiddenInput, { name: name, value: color }),
        React.createElement(Label, null, label),
        React.createElement(ColorPicker, { hideTextfield: true, value: color, onChange: updateColor })));
}

export default ColorInput;
