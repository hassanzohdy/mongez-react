import React from 'react'

export default function useBooleanState(defaultValue: boolean = false): [boolean, Function, Function, Function, Function] {
    const [booleanValue, setBooleanValue] = React.useState(defaultValue);

    const [setTrue, setFalse, toggle] = React.useMemo(() => {
        const setTrue = () => setBooleanValue(true);
        const setFalse = () => setBooleanValue(false);
        const toggle = () => setBooleanValue(!booleanValue);

        return [setTrue, setFalse, toggle];
    }, [booleanValue]);

    return [booleanValue, setBooleanValue, setTrue, setFalse, toggle];
}

export function useBooleanStateObj(defaultValue: boolean = false): any {
    const [booleanValue, setBooleanValue] = React.useState(defaultValue);

    const [setTrue, setFalse, toggle] = React.useMemo(() => {
        const setTrue = () => setBooleanValue(true);
        const setFalse = () => setBooleanValue(false);
        const toggle = () => setBooleanValue(!booleanValue);

        return [setTrue, setFalse, toggle];
    }, [booleanValue]);

    return {
        booleanValue,
        isTrue: booleanValue === true,
        isFalse: booleanValue === false,
        setTrue,
        setFalse,
        toggle,
        setBooleanValue,
    }
}