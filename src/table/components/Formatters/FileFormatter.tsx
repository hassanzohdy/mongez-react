import React from 'react';
import { styled } from '@material-ui/core';
import ImageFormatter from './ImageFormatter';

function isImage(fileExtension: string): boolean {
    return ['ico', 'jpg', 'jpeg', 'gif', 'png', 'webp', ''].includes(fileExtension.toLocaleLowerCase());
}

const ExtensionFile = styled('div')({
    color: '#fff',
    fontSize: '11px',
    fontWeight: 'bold',
    padding: '0.3rem',
    borderRadius: '5px',
    display: 'inline-block',
    backgroundColor: '#188af6',
});

export default function FileFormatter({ column }) {
    let { value: url } = column;

    if (!url) return null;

    const fileExtension = url.split('.').pop();

    if (isImage(fileExtension)) {
        return <ImageFormatter column={column} />
    }

    return <ExtensionFile>{fileExtension.toUpperCase()}</ExtensionFile>
}