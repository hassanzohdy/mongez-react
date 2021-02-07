import React from 'react';
import PropTypes from 'prop-types';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { create } from 'jss';

const plugins = [...jssPreset().plugins, rtl()];
const jss = create({ plugins });
function MultiDirection(props) {
    return (React.createElement(StylesProvider, { jss: jss }, props.children));
}
MultiDirection.propTypes = {
    children: PropTypes.any.isRequired,
};

export default MultiDirection;
