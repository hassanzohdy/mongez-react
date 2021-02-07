import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import { styled } from '@material-ui/core';

const Element = styled('h1')({
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
});
function AccessDenied() {
    return React.createElement(Element, { children: trans('accessDenied') });
}

export default AccessDenied;
