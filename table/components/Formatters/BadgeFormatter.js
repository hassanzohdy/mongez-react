import React from 'react';

function BadgeFormatter({ column }) {
    const { value, settings } = column;
    const { badges } = settings;
    if (!badges || !value || !badges[value])
        return value;
    const Badge = badges[value];
    return React.createElement(Badge, { children: value });
}

export default BadgeFormatter;
