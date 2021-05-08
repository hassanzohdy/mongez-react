import { currentRoute } from './navigator';

let root = document.documentElement;

const stack = {};

function cacheCurrentRoute() {
    const fragment = new DocumentFragment();

    fragment.appendChild(root.parentNode.childNodes[1].cloneNode(true));
    
    stack[currentRoute()] = fragment;    
}

function routeExistsInStack(route) {
    return stack[route] !== undefined;
}

function updateRootContent(route) {
    const content = stack[route];

    root.parentNode.replaceChild(content, root.parentNode.childNodes[1]);

    return null;
}

function removeRouteFromStack(route) {
    delete stack[route];
}

const stackBuilder = {
    add: cacheCurrentRoute,
    has: routeExistsInStack,
    get: updateRootContent,
    remove: removeRouteFromStack,
};

export default stackBuilder;