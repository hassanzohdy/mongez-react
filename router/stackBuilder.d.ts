declare function cacheCurrentRoute(): void;
declare function routeExistsInStack(route: any): boolean;
declare function updateRootContent(route: any): any;
declare function removeRouteFromStack(route: any): void;
declare const stackBuilder: {
    add: typeof cacheCurrentRoute;
    has: typeof routeExistsInStack;
    get: typeof updateRootContent;
    remove: typeof removeRouteFromStack;
};
export default stackBuilder;
