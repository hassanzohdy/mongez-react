import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function Spinner({ className, theme = 'main', color }) {
    const style = {};
    if (color && theme === 'main') {
        theme = '';
        style.backgroundColor = color;
    }
    const spinnerClass = clsx('spinner', className, theme);
    return (React.createElement("div", { className: spinnerClass },
        React.createElement("div", { style: style, className: "bounce bounce1" }),
        React.createElement("div", { style: style, className: "bounce bounce2" }),
        React.createElement("div", { style: style, className: "bounce bounce3" })));
}
Spinner.propTypes = {
    theme: PropTypes.oneOf([
        'white', 'black', 'gray', 'red', 'blue', 'pink', 'purple', 'green',
        'orange', 'main'
    ]),
};

export default Spinner;
