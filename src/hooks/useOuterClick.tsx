import React from 'react';

/**
 * This hook accepts a callback function when a client clicks outside the element
 * The returned value is a ref that will be attached to the DOM element.
 * 
 * @param callback 
 * @returns Ref
 */
export default function useOuterClick(callback) {
    const callbackRef = React.useRef(); // initialize mutable ref, which stores callback
    const innerRef = React.useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value 
    React.useEffect(() => {
        callbackRef.current = callback;
    });

    React.useEffect(() => {
        function handleClick(e) {
            if (innerRef.current && callbackRef.current &&
                !(innerRef.current as any).contains(e.target)
            ) {
                (callbackRef as any).current(e);
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []); // no dependencies -> stable click listener

    return innerRef; // convenience for client (doesn't need to init ref himself) 
}
