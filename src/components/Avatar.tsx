import React from 'react';
import MaterialAvatar from '@material-ui/core/Avatar';
import { styled } from '@material-ui/core';

const MarginedAvatar = styled(MaterialAvatar)({
    margin: '0 auto',
});

export default function Avatar({ title = null, ...props }) {
    props.title = title || props.alt;

    return <MaterialAvatar {...props} />;
}

export const AlignedAvatar = React.forwardRef((props: any, ref) => {
    let title;

    if (props) {
        title = props.title || props.alt;
    }

    return <MarginedAvatar ref={ref} title={title} {...props} />;
});