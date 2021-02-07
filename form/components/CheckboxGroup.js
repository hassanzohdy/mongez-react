import React from 'react';
import { FormLabel, FormGroup } from '@material-ui/core';
import PropTypes from 'prop-types';

function CheckboxGroup({ label, row, children }) {
    return (React.createElement(React.Fragment, null,
        label && React.createElement(FormLabel, { children: label }),
        React.createElement(FormGroup, { row: row }, children)));
}
CheckboxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    row: PropTypes.bool,
    children: PropTypes.node,
};
CheckboxGroup.defaultProps = {
    row: true,
};

export default CheckboxGroup;
