import Is from '@flk/supportive-is';
import { toInputName } from 'reinforcements';
import { HiddenInputProps } from '../utils/types';

export default function HiddenInput({ name, value, ...props }: HiddenInputProps) {
    if (! name) return null;

    if (! Is.array(value)) {
        value = [value as string];
    }

    return (
        <>
            {(value as string[]).map((value, index) => (
                <input key={index} type="hidden" name={toInputName(name)} value={value} {...props} />
            ))} 
        </>
    )
}