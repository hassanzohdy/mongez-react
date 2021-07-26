import endpoint from "mongez/http";

// functions go here
export function getComponent() {
    return endpoint.get('route');
}