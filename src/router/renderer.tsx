import React from 'react';
import config from './../config';
import Middleware from './middleware';
import history from './router-history';
import concatRoute from './concat-route';
import { layoutsList } from './routes-list';
import Redirect from '../components/Redirect';
import { getCurrentBseAppPath } from './apps-list';
import NotFound from './../layout/components/NotFound';
import { Layout, Route as ModuleRoute } from './types';
import modulesList, { ModuleInfo } from './modules-list';
import { Route, RouteComponentProps } from 'react-router-dom';
import DefaultProgressBar from './../components/Preloaders/ProgressBar';
import { firstSegmentOfRoute, isPartOfLazyModules } from './renderer-helpers';

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

export default function Renderer(props: any): any {
    const { location } = props;

    let firstSegment: string = firstSegmentOfRoute(location);

    const currentBasePath = getCurrentBseAppPath();

    firstSegment = concatRoute(currentBasePath, firstSegment);

    const [loadedModules, loadModule] = React.useState([] as Array<string>);

    // check if module is loaded
    const moduleIsLoaded = loadedModules.includes(firstSegment);

    React.useEffect(() => {
        const moduleInfo: ModuleInfo = modulesList[firstSegment];

        if (!moduleIsLoaded && moduleInfo) {
            const loadingModulePaths: any = [];

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

    // if route does not exist, then go to not found page
    if (!moduleIsLoaded && !modulesList[firstSegment]) {
        if (notFoundMode === 'redirect') {
            return <Redirect to={config.get('router.notFound.route', '/404')} />;
        } else if (notFoundMode === 'render') {
            const NotFoundComponent = config.get('router.notFound.component', NotFound);

            return <NotFoundComponent />
        }
    }

    // Display the progress bar
    // if the first segment is not in the 
    // loadedModules and
    // the first segment is part of modules list that will be loaded
    if (!moduleIsLoaded && isPartOfLazyModules(firstSegment)) {
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
            <Route key={routesList.join('_')} exact path={routesList} render={(props: RouteComponentProps) => (
                <LayoutComponent {...props}>
                    {layoutRoutes}
                </LayoutComponent>
            )} />
        )
    });
}
