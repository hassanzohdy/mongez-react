import React from 'react';
import MaterialImage from 'material-ui-image';

function Image(props) {
    return React.createElement(MaterialImage, Object.assign({}, props));
}

export default Image;
