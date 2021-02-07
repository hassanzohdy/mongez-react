import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

function StaticButton(props) {
    return (React.createElement(Button, Object.assign({ type: "button" }, props)));
}
StaticButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
const PrimaryButton = props => React.createElement(StaticButton, Object.assign({ color: "primary", variant: "contained" }, props));
const SecondaryButton = props => React.createElement(StaticButton, Object.assign({ color: "secondary", variant: "contained" }, props));
const DefaultButton = props => React.createElement(StaticButton, Object.assign({ color: "default", variant: "contained" }, props));

export default StaticButton;
export { DefaultButton, PrimaryButton, SecondaryButton };
