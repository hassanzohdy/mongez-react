import React from 'react';
import { styled } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const Span = ({ required, ...otherProps }) => {
    if (!required)
        return null;
    return React.createElement("span", Object.assign({}, otherProps), "*");
};
const RequiredSpan = styled((Span))(({ theme }) => ({
    color: red[400],
    fontWeight: 'bold',
    marginLeft: theme.spacing(0.5)
}));
const InputFile = React.forwardRef((props, ref) => {
    return React.createElement("input", Object.assign({ type: "file", ref: ref }, props));
});
const HiddenInputFile = styled(InputFile)({
    display: 'none',
});

export { HiddenInputFile, RequiredSpan };
