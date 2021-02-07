import React from 'react';
import FormInput from '../components/FormInput.js';

function withInputType(type, defaultProps = {}) {
    const Input = function (props) {
        return React.createElement(FormInput, Object.assign({}, props, { type: type }));
    };
    Input.defaultProps = defaultProps;
    return Input;
}

export default withInputType;
