import React from 'react';

/**
 * Re-Render the component when the prop value is changed
 * 
 * @param {Function} stateUpdater 
 * @param {any} prop 
 * @param {Function} propHandler 
 */
export default function usePropDetector(stateUpdater, prop = null, propHandler = prop => prop) {
    React.useEffect(() => {
        stateUpdater(propHandler(prop));
    }, [prop, stateUpdater]);
}