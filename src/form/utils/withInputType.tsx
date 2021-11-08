import React from 'react';
import FormInput from '../components/FormInput';

export default function withInputType(type, defaultProps = {}) {
    const Input = function (props, ref) {
        return <FormInput  {...props} ref={ref} type={type} />
    }


    const InputWrapper = React.forwardRef(Input);

    InputWrapper.defaultProps = defaultProps;

    return InputWrapper
}

