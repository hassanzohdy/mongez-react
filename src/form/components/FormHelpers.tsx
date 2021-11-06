import React from 'react';
import { styled } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Tooltip } from '../../components';
import { trans } from '../../localization';

const Span: any = ({ required, ...otherProps }) => {
    if (!required) return null;

    return <Tooltip title={trans('required')}>
        <span {...otherProps}>*</span>
    </Tooltip>
};

export const RequiredSpan = styled((Span))(({ theme }) => ({
    color: red[400],
    fontWeight: 'bold',
    marginLeft: theme.spacing(0.5)
}));

const InputFile = React.forwardRef((props: any, ref: any) => {
    return <input type="file" ref={ref} {...props} />;
});

export const HiddenInputFile = styled(InputFile)({
    display: 'none',
});