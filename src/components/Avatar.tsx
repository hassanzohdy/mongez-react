import React from 'react';
import MaterialAvatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core';

const MarginedAvatar = styled(MaterialAvatar)({
    margin: '0 auto',
});

export default function Avatar({ ...props }) {
    return <MaterialAvatar {...props} />;
}

export const AlignedAvatar = React.forwardRef((props: any, ref) => {
    return <MarginedAvatar ref={ref} {...props} />;
});