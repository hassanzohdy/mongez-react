import React from 'react';
import PropTypes from 'prop-types';
import Theme from './Theme.js';

function Layout(props) {
    return React.createElement(Theme, Object.assign({}, props));
}
Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default Layout;
