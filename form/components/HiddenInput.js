import { toInputName } from 'reinforcements';
import React from 'react';

function HiddenInput({ name, ...props }) {
    return React.createElement("input", Object.assign({ type: "hidden", name: toInputName(name) }, props));
}

export default HiddenInput;
