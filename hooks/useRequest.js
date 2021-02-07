import React from 'react';
import useOnce from './useOnce.js';
import { lastRequest } from '../http/endpoint.js';

function useRequest(promiseFunction, _dumpOldLoading = null) {
    const [isLoading, loading] = React.useState(false);
    const [state, setState] = React.useState({
        value: null,
        error: null,
        isLoaded: false,
    });
    useOnce(() => {
        loading(true);
        promiseFunction().then(response => {
            setState({
                value: response,
                isLoaded: true,
                error: null
            });
            loading(false);
        })
            .catch(response => {
            if (response.__CANCEL__ === true)
                return;
            loading(false);
            setState({
                value: null,
                isLoaded: true,
                error: response
            });
        });
        let request;
        setTimeout(() => {
            request = lastRequest();
        }, 0);
        return () => request.abort();
    });
    return [state.value, state.error, isLoading];
}

export default useRequest;
