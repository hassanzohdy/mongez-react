import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import { styled } from '@material-ui/core';
import { RequiredSpan } from './FormHelpers.js';

const FormLabel = styled('span')({
    display: 'inline-block',
});
function Label(props) {
    let { label, children, component: Component, required, ...otherProps } = props;
    label = label || children;
    if (!label)
        return null;
    return (React.createElement(Component, Object.assign({}, otherProps),
        trans(label),
        React.createElement(RequiredSpan, { required: required })));
}
Label.defaultProps = {
    component: FormLabel,
};

export default Label;
