import config from '../config/index.js';
import history from './router-history.js';
import concatRoute from './concat-route.js';
import { getCurrentBseAppPath } from './apps-list.js';
import modulesList from './modules-list.js';
import React from 'react';
import { layoutsList } from './routes-list.js';
import Middleware from './middleware.js';
import { Route } from 'react-router-dom';
import ProgressBar$1 from '../components/Preloaders/ProgressBar.js';
import { firstSegmentOfRoute, isPartOfLazyModules } from './renderer-helpers.js';

const ProgressBar = config.get('router.progressBar', ProgressBar$1);
const forceRefresh = config.get('router.forceRefresh', true);
const currentRoute = {
    routeInfo: null,
};
const renderRoute = (routeData, route) => {
    // const { location } = routeData;
    // const { pathname } = location;
    if (currentRoute.routeInfo)
        return null;
    currentRoute.routeInfo = route;
    // setCurrentRoute(route);
    // const givenRoute = ltrim(pathname, getCurrentBseAppPath()) || '/';
    // if (stackBuilder.has(givenRoute)) {
    //     return stackBuilder.get(givenRoute);
    // }
    // timestamp
    // When forceRefresh flag is set to true
    // then the route component will be re-rendered every time
    // the user clicks on the same route
    // otherwise, the user will still in the same page without re-rendering
    const middlewareKey = forceRefresh ? Date.now() : null;
    return React.createElement(Middleware, { key: middlewareKey, match: routeData.match, location: routeData.location, route: route, history: history });
};
function Renderer(props) {
    const { location } = props;
    let firstSegment = firstSegmentOfRoute(location);
    const currentBasePath = getCurrentBseAppPath();
    firstSegment = concatRoute(currentBasePath, firstSegment);
    const [loadedModules, loadModule] = React.useState([]);
    // check if module is loaded
    const moduleIsLoaded = loadedModules.includes(firstSegment);
    React.useEffect(() => {
        const moduleInfo = modulesList[firstSegment];
        if (!moduleIsLoaded && moduleInfo) {
            const loadingModulePaths = [];
            // load main app provider file
            if (moduleInfo.appProvider) {
                loadingModulePaths.push(moduleInfo.appProvider());
            }
            // load module provider
            loadingModulePaths.push(moduleInfo.load());
            Promise.all(loadingModulePaths).then(() => {
                loadModule(loadedModules.concat(moduleInfo.entry));
            });
        }
    }, [firstSegment, moduleIsLoaded, loadedModules]);
    // Display the progress bar
    // if the first segment is not in the 
    // loadedModules and
    // the first segment is part of modules list that will be loaded
    if (!moduleIsLoaded && isPartOfLazyModules(firstSegment)) {
        return React.createElement(ProgressBar, null);
    }
    currentRoute.routeInfo = null;
    return layoutsList.map((layout) => {
        const { LayoutComponent, routes, routesList } = layout;
        // list of routes
        let layoutRoutes = routes.map(route => {
            return (React.createElement(Route, { path: route.path, exact: true, key: route.path, render: (props) => renderRoute(props, route) }));
        });
        return (React.createElement(Route, { key: routesList.join('_'), exact: true, path: routesList, render: (props) => (React.createElement(LayoutComponent, Object.assign({}, props), layoutRoutes)) }));
    });
}

export default Renderer;
