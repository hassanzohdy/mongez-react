import React from 'react';
import { FormInput2Props } from '../utils/types/FormInput';
import SemanticInput from './FormInput/SemanticInput';

export default function FormInput(props: FormInput2Props) {
    if (props.theme === 'semantic') {
        return <SemanticInput {...props} />
    }
}

FormInput.defaultProps = {
    theme: 'semantic',
};