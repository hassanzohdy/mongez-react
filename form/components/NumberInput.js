import React from 'react';
import FormInput from './FormInput.js';

function NumberInput(props) {
    return React.createElement(FormInput, Object.assign({ type: "number" }, props));
}

export default NumberInput;
