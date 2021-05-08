import React from 'react';

export default function BadgeFormatter({ column }) {
    const { value, settings } = column;

    const { badges } = settings;

    if (!badges || !value || !badges[value]) return value;

    const Badge = badges[value];
    return <Badge children={value} />
}