import React from 'react';

function HTML(propsList) {
    const { html, component: Component = 'div', ...props } = propsList;
    return React.createElement(Component, Object.assign({}, props, { dangerouslySetInnerHTML: { __html: html } }));
}

export default HTML;
