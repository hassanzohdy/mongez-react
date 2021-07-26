import React from 'react';
import { Obj } from 'reinforcements';
import { Link } from './../../../components';
import { styled } from '@material-ui/core';

const ColoredLink = styled(Link)({
    color: '#FFF',
    backgroundColor: '#54545e',
    borderRadius: '5px',
    padding: '0.1rem 0.5rem',
    fontWeight: 'bold',
    // textDecoration: 'none',
});

export default function LinkFormatter({ record, column, children }) {
    let linkProps = Obj.get(column, 'settings', {});

    const { href } = linkProps;

    let value = children || column.value;

    if (!href || (value !== 0 && !value)) return null;

    return <ColoredLink to={href(record, column)} {...linkProps} children={value} />;
}