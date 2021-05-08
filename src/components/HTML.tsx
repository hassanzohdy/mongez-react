import React from 'react';

export default function HTML(propsList) {
    const { html, component: Component = 'div', ...props } = propsList;
    return <Component {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}