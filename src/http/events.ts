import events from '../events';

interface EndpointEventsInterface {
    onError: Function;
    onSuccess: Function;
    onResponse: Function;
    beforeSending: Function;
}

const endpointEvents: EndpointEventsInterface = {
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