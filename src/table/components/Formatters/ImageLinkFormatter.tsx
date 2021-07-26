import React from 'react';
import ImageFormatter from './ImageFormatter';
import LinkFormatter from './LinkFormatter';

export default function ImageLinkFormatter(props: any) {
    const { record, column } = props;
    const Image = <ImageFormatter column={column} />;

    if (! Image) return null;

    return <LinkFormatter children={Image} column={column} record={record} />
}