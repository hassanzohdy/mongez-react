import React from 'react';

function useOnce(callback) {
    React.useEffect(callback, []);
}

export default useOnce;
