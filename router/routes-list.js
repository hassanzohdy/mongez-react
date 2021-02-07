import 'reinforcements';
import concatRoute from './concat-route.js';
import { getCurrentBseAppPath } from './apps-list.js';
import React from 'react';
import 'sprintf-js';
import { getLocaleCodes } from '../localization/locales.js';

// join all locale code with | for route matching
const gluedLocaleCodes = getLocaleCodes().join('|');
/**
 * Default Full Page >> It Will be just a React Fragment
 */
const FULL_PAGE = ({ key, children }) => React.createElement(React.Fragment, { key: key, children: children });
/**
 * Set all layouts that will wrap the application routes
 *
 * @const  {Array}
 */
const layoutsList = [];
/**
 * Add new route to the routes list of full page
 *
 * @param {string} path
 * @param {React.Component} component
 * @param {Function|Array|null} middleware
 */
function addRouter(path, component, middleware = null) {
    return partOf(FULL_PAGE, [{
            path,
            component,
            middleware
        }]);
}
/**
 * Add the given routes as part of the given layout
 *
 * @param  {React.Component} LayoutComponent
 * @param  {Array} routes
 */
function partOf(LayoutComponent, routes) {
    let layout = layoutsList.find(layout => layout.LayoutComponent === LayoutComponent);
    // if the layout component does not exist
    // then create new one and add it to the layouts list
    if (!layout) {
        layout = {
            LayoutComponent,
            routes: [],
            routesList: [],
        };
        layoutsList.push(layout);
    }
    routes = routes.map(route => {
        // added optional localization
        route.path = concatRoute(gluedLocaleCodes ? `/:localeCode(${gluedLocaleCodes})?` : null, getCurrentBseAppPath(), route.path);
        layout.routesList.push(route.path);
        return route;
    });
    layout.routes = layout.routes.concat(routes);
}
/**
 * Group the given routes with the given options
 *
 * @param  object groupOptions
 */
function group(groupOptions) {
    const { routes, path, middleware, layout = FULL_PAGE } = groupOptions;
    partOf(layout, routes.map(route => {
        if (middleware) {
            route.middleware = middleware;
        }
        if (path) {
            route.path = concatRoute(path, route.path);
        }
        return route;
    }));
}

export { FULL_PAGE, addRouter, group, layoutsList, partOf };
