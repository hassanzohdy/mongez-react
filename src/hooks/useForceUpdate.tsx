/**
 * This hook will force the component to be rendered again
 * 
 * Usage
 * 
 * const forceUpdate = useForceUpdate();
 * ...
 * <button onClick={forceUpdate}>Update component</button>
 */
import React from 'react';

export default function useForceUpdate() {
    const [, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}