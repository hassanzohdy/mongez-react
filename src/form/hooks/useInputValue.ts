import React from "react";
import Is from "@flk/supportive-is";

export default function useInputValue<T>(initialValue: T = null) {
    const [value, setValue] = React.useState<T>(initialValue);

    const valueChecker: (e: any) => void = (e: any): void => {
        if (! e) {
            setValue(null);
        } else if (!Is.undefined(e.value)) {
            setValue(e.value);
        } else if (e.target && !Is.undefined(e.target.value)) {
            setValue(e.target.value);
        } else if (e.id) {
            setValue(e.id);
        } else {
            setValue(e);
        }
    };

    const returnedState: [T, (e: any) => void] = [
        value,
        valueChecker,
    ];

    return returnedState;
}