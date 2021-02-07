interface EndpointEventsInterface {
    onError: Function;
    onSuccess: Function;
    onResponse: Function;
    beforeSending: Function;
}
declare const endpointEvents: EndpointEventsInterface;
export default endpointEvents;
