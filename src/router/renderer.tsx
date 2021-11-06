import React from 'react';
import config from '../config';
import Middleware from './middleware';
import history from './router-history';
import concatRoute from './concat-route';
import { layoutsList } from './routes-list';
import Redirect from '../components/Redirect';
import { getCurrentBseAppPath } from './apps-list';
import NotFound from '../layout/components/NotFound';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Layout, Route as ModuleRoute, Module } from './types';
import { appDynamicRouteModule, modulesList } from './apps-list';
import DefaultProgressBar from '../components/Preloaders/ProgressBar';
import { firstSegmentOfRoute, isPartOfLazyModules } from './renderer-helpers';
import Is from '@flk/supportive-is';

const ProgressBar = config.get('router.progressBar', DefaultProgressBar);

const forceRefresh = config.get('router.forceRefresh', true);

const notFoundMode = config.get('router.notFound.mode', 'render');

interface CurrentRouteHolder {
    routeInfo: null | ModuleRoute;
}

const currentRoute: CurrentRouteHolder = {
    routeInfo: null,
};
const renderRoute = (routeData: RouteComponentProps, route: ModuleRoute) => {
    // const { location } = routeData;
    // const { pathname } = location;

    if (currentRoute.routeInfo) return null;

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
    // otherwise, the user will stay in the same page without re-rendering
    const middlewareKey = forceRefresh ? Date.now() : null;
    return <Middleware key={middlewareKey} match={routeData.match as any} location={routeData.location} route={route} history={history} />;
};

let isLoadingDynamicRoute = false;

const loadedApps = [];
const loadedModulesList = [];

export default function Renderer(props: any): any {
    const { location } = props;

    let firstSegment: string = firstSegmentOfRoute(location);

    // const [loadedApps, loadApps] = React.useState([]);
    // const [loadedModulesList, loadModulesList] = React.useState([]);

    const currentBasePath = getCurrentBseAppPath();

    firstSegment = concatRoute(currentBasePath, firstSegment);

    const [loadedModules, loadModule] = React.useState([] as Array<string>);

    // check if module is loaded
    const moduleIsLoaded = loadedModules.includes(firstSegment);

    React.useEffect(() => {
        const moduleInfo: Module = modulesList[firstSegment];

        if (!moduleIsLoaded && moduleInfo) {
            const loadingModulePaths: any = [];
            isLoadingDynamicRoute = false;

            // load main app provider file
            if (moduleInfo.loadApp) {
                loadingModulePaths.push(moduleInfo.loadApp());
            }

            // load module provider
            loadingModulePaths.push(moduleInfo.loadModule());

            Promise.all(loadingModulePaths).then(() => {
                if (!loadedApps.includes(moduleInfo.app)) {
                    loadedApps.push(moduleInfo.app);
                }

                if (!loadedModulesList.includes(moduleInfo.module)) {
                    loadedModulesList.push(moduleInfo.module);
                }
                loadModule(loadedModules.concat(moduleInfo.entry));
            });
        }
    }, [firstSegment, moduleIsLoaded, loadedModules]);

    // if route does not exist, then check if it is dynamic module
    if (!moduleIsLoaded && !modulesList[firstSegment]) {
        if (!modulesList[firstSegment]) {
            const dynamicRouteModule = appDynamicRouteModule();

            if (dynamicRouteModule) {
                const dynamicModuleIsLoaded = loadedApps.includes(dynamicRouteModule.app) &&
                    loadedModulesList.includes(dynamicRouteModule.module);

                if (dynamicModuleIsLoaded === false) {
                    isLoadingDynamicRoute = true;

                    const modulesToBeLoaded = [
                        dynamicRouteModule.loadApp(),
                        dynamicRouteModule.loadModule(),
                    ];

                    Promise.all(modulesToBeLoaded).then(() => {
                        isLoadingDynamicRoute = false;

                        if (!loadedApps.includes(dynamicRouteModule.app)) {
                            loadedApps.push(dynamicRouteModule.app);
                        }

                        if (!loadedModulesList.includes(dynamicRouteModule.module)) {
                            loadedModulesList.push(dynamicRouteModule.module);
                        }

                        loadModule([...loadedModules, dynamicRouteModule.module]);
                    });
                }
            } else {
                if (notFoundMode === 'redirect') {
                    return <Redirect to={config.get('router.notFound.route', '/404')} />;
                } else if (notFoundMode === 'render') {
                    const NotFoundComponent = config.get('router.notFound.component', NotFound);

                    return <NotFoundComponent />
                }
            }
        }
    }

    // Display the progress bar
    // if the first segment is not in the 
    // loadedModules and
    // the first segment is part of modules list that will be loaded
    if ((!moduleIsLoaded && isPartOfLazyModules(firstSegment)) || isLoadingDynamicRoute) {
        return <ProgressBar />
    }

    currentRoute.routeInfo = null;

    return layoutsList.map((layout: Layout) => {
        const { LayoutComponent, routes, routesList } = layout;

        // list of routes
        let layoutRoutes = routes.map(route => {
            return (
                <Route path={route.path}
                    exact
                    key={route.path}
                    render={(props: RouteComponentProps) => renderRoute(props, route)}
                />
            );
        });

        return (
            <Route key={routesList.join('_')} exact path={routesList} render={(props: RouteComponentProps) => {
                // let middlewareList = route.middleware;

                const currentRoute = routes.find(route => route.path === props.match.path);

                if (currentRoute && currentRoute.middleware) {
                    let middlewareList = currentRoute.middleware;
                    if (!Is.array(middlewareList)) {
                        middlewareList = [middlewareList];
                    }

                    for (let middleware of (middlewareList as Function[])) {
                        let output = middleware(currentRoute, history, props.match.params);

                        if (output) {
                            return output;
                        }
                    }
                }

                return (
                    <LayoutComponent {...props}>
                        {layoutRoutes}
                    </LayoutComponent>
                )
            }} />
        )
    });
}
