import React from 'react';
import { Link } from '../../../components';

export default function EmailFormatter({ column }) {
    let email = column.value;

    if (!email) return null;

    return <Link relative={false} to={'mailto:' + email} children={email} />;
}