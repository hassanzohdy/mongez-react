import React from 'react';
import { styled } from '@material-ui/core';
import MaterialAvatar from '@material-ui/core/Avatar';

const MarginedAvatar = styled(MaterialAvatar)({
    margin: '0 auto',
});
function Avatar({ title = null, ...props }) {
    props.title = title || props.alt;
    return React.createElement(MaterialAvatar, Object.assign({}, props));
}
const AlignedAvatar = React.forwardRef((props, ref) => {
    let title;
    if (props) {
        title = props.title || props.alt;
    }
    return React.createElement(MarginedAvatar, Object.assign({ ref: ref, title: title }, props));
});

export default Avatar;
export { AlignedAvatar };
