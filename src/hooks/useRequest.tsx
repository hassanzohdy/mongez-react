import React from 'react';
import useOnce from './useOnce';
import { lastRequest } from '../http/endpoint';
import config from '../config';

export default function useRequest(promiseFunction, returnAsArray = config.get('http.useRequest.returnAsArray', true)): any {
    const [state, setState] = React.useState({
        value: null,
        error: null,
        isLoading: true,
    });

    useOnce(() => {
        promiseFunction().then(response => {
            setState({
                value: response,
                isLoading: false,
                error: null
            });
        })
            .catch(response => {
                if (response.__CANCEL__ === true) return;

                setState({
                    value: null,
                    isLoading: false,
                    error: response
                });
            });

        let request;

        setTimeout(() => {
            request = lastRequest();
        }, 0);

        return () => request.abort();
    });

    return returnAsArray ? [state.value, state.error, state.isLoading] : {
        response: state.value,
        error: state.error,
        isLoading: state.isLoading
    };
}