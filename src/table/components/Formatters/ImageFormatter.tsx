import React from 'react';
import { styled } from '@material-ui/core';
import { Image, AlignedAvatar } from '../../../components';

const Wrapper = styled('div')({
    margin: 'auto',
});

export default function ImageFormatter({ column }) {
    let { value: imageSrc, theme = 'avatar' } = column;

    if (!imageSrc) return null;

    let image;

    if (theme === 'avatar') {
        image = <AlignedAvatar src={imageSrc} />
    } else if (theme === 'thumbnail') {
        image = <Image src={imageSrc} />
    }

    return <Wrapper>{image}</Wrapper>
}