import React from 'react';

/**
 * This hook will force the component to be rendered again
 *
 * Usage
 *
 * const forceUpdate = useForceUpdate();
 * ...
 * <button onClick={forceUpdate}>Update component</button>
 */
function useForceUpdate() {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default useForceUpdate;
