import events from '../events/events.js';

const endpointEvents = {
    beforeSending: callback => {
        events.on('endpoint.sending', callback);
    },
    onResponse: callback => {
        events.on('endpoint.sent', callback);
    },
    onSuccess: callback => {
        events.on('endpoint.success', callback);
    },
    onError: callback => {
        events.on('endpoint.error', callback);
    }
};

export default endpointEvents;
