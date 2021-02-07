import React from 'react';
import LinkFormatter from './LinkFormatter.js';
import ImageFormatter from './ImageFormatter.js';

function ImageLinkFormatter(props) {
    const { record, column } = props;
    const Image = React.createElement(ImageFormatter, { column: column });
    if (!Image)
        return null;
    return React.createElement(LinkFormatter, { children: Image, column: column, record: record });
}

export default ImageLinkFormatter;
