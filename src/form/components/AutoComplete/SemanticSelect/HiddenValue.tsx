import Is from '@flk/supportive-is';
import React from 'react'
import HiddenInput from '../../HiddenInput';

export default function HiddenValue({name, value}) {
    if (! name) return null;

    if (! Is.array(value)) {
        value = [value];
    }

    return (
        <>
            {value.map((value, index) => (
                <HiddenInput key={index} name={name} value={value} />
            ))} 
        </>
    )
}
