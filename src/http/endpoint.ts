import axios from 'axios';
import events from './../events';
import config from './../config';
import Is from '@flk/supportive-is';
import { Obj, ltrim } from 'reinforcements';
import { concatRoute } from './..//router';
import { getCurrentUser } from './../user';

let cancelToken;

let lastRequestInfo = {};

const endpoint = axios.create({
    transformRequest: [function (data, headers) {
        if (Is.plainObject(data)) {
            headers['Content-Type'] = 'Application/json';

            if (headers.isPutRequest) {
                data._method = 'PUT';
                delete headers.isPutRequest;
            }

            data = JSON.stringify(data);
        } else if (Is.formElement(data)) {
            let formData = new FormData(data);

            // @see line: 53
            if (headers.isPutRequest) {
                formData.append('_method', 'PUT');

                // delete the isPutRequest flag
                delete headers.isPutRequest;
            }

            return formData;
        } else if (Is.formData(data)) {
            // @see line: 53
            if (headers.isPutRequest) {
                data.append('_method', 'PUT');

                // delete the isPutRequest flag
                delete headers.isPutRequest;
            }

            return data;
        }

        return data;
    }],
});

endpoint.interceptors.request.use(requestConfig => {
    // concat the base url with the requested route 
    requestConfig.url = ltrim(concatRoute(config.get('endpoint.baseUrl'), requestConfig.url), '/');

    const user = getCurrentUser();

    let auth = user.isLoggedIn() ? `Bearer ${user.getAccessToken()}` : `key ${config.get('endpoint.apiKey')}`;

    // A workaround for put requests to be sent as post request
    // this will allow us to upload images
    if (requestConfig.method === 'put') {
        requestConfig.method = 'post';
        requestConfig.headers.isPutRequest = true;
    }

    requestConfig.headers.Authorization = auth;

    // this will be used mainly with lastRequest
    // and with useRequest hook as well
    const CancelToken = axios.CancelToken;

    requestConfig.cancelToken = new CancelToken(c => cancelToken = c);

    // capture last request info
    lastRequestInfo = requestConfig;

    // trigger event of sending ajax request
    events.trigger('endpoint.sending', requestConfig);

    return requestConfig;
});

// when response is returned from the request
endpoint.interceptors.response.use((response: any) => {
    // trigger success response
    events.trigger('endpoint.sent', response.response);
    events.trigger('endpoint.success', response);
    return response;
}, responseError => {
    // trigger error response
    events.trigger('endpoint.sent', responseError.response);
    events.trigger('endpoint.error', responseError.response);
    throw responseError;
});

/**
 * Get last request 
 * This function MUST BE called directly after sending the request so we can cancel the 
 * last ajax request, and also to get any info we need about it as well
 * 
 * @returns {object} 
 */
export const lastRequest = () => {
    return {
        ...lastRequestInfo,
        cancelToken: Obj.clone(cancelToken),
        abort() {
            this.cancelToken();
        },
    };
};

export default endpoint;
