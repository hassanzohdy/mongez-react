import React from "react";

/**
 * App Module Interface
 */
export interface Module {
    /**
     * Module name
     */
    module: string;
    /**
     * Module possible entry list
     */
    entry?: string[];
    /**
     * App name
     */
    app?: string;
    /**
     * Module loader function
     */
    loadModule?: Function;
    /**
     * Module App loader function
     */
    loadApp?: Function;
};

/**
 * App data interface
 */
export interface App {
    /**
     * Application name
     * The application name must be the same as its directory name 
     */
    name: string;
    /**
     * Application starting path
     */
    path: string;
    /**
     * Application modules list
     */
    modules: Module[];
}

/**
 * Basic component props
 */
export interface BasicComponentProps {
    /**
     * Component key
     */
    key?: string;
    /**
     * Children list of the component
     */
    children?: React.ReactNode;
    /**
     * Any other props
     */
    [key: string]: any;
}

/**
 * Middleware type
 * It can be a react node | function or an array of single middleware
 */
export type Middleware = React.ReactNode | React.ReactNode[];

/**
 * Page component wrapper
 * Useful when many pages has same layout, 
 * it will prevent re-rendering the layout wrapper from beginning each time
 */
export type Wrapper = React.FunctionComponent<BasicComponentProps>;

/**
 * Route options
 */
export interface Route {
    /**
     * Route path
     */
    path: string;
    /**
     * Route middleware
     */
    middleware?: Middleware;
    /**
     * Route rendered component
     */
    component: React.FunctionComponent<BasicComponentProps>;
}

/**
 * Layout options
 */
export interface Layout {
    routes: Route[];
    routesList: string[];
    LayoutComponent: Wrapper;
}

/**
 * Router group options
 */
export interface GroupOptions {
    /**
     * routes base path
     */
    path?: string;
    /**
     * Grouped routes list
     */
    routes?: Route[];
    /**
     * Layout that will be rendered on top of all routes in the group
     */
    layout?: Wrapper;
    /**
     * Routes middleware, it will be merged with each route middleware(s) if provided
     */
    middleware?: Middleware;
}

/**
 * Router configuration options list
 */
export type RouterConfigurations = {
    /**
     * Router configuration key
     */
    router?: {
        /**
         * Lazy modules pre-loader
         * 
         * Please note that can not be changed during the application is running 
         * as its value is cached at the application bootstrap
         * 
         * @default: to Material Ui Progress Bar
         */
        progressBar?: React.ReactNode;
        /**
         * Determine whether to re-render the page 
         * When navigating to any page, even same current page
         * 
         * Please note that can not be changed during the application is running 
         * as its value is cached at the application bootstrap
         * 
         * @default: true
         */
        forceRefresh?: boolean;
        /**
         * NotFound Options
         */
        notFound?: {
            /**
             * Not found mode
             * The redirect mode will redirect the client to the path
             * 
             * Please note that can not be changed during the application is running 
             * as its value is cached at the application bootstrap
             * 
             * @default: render
             */
            mode?: 'redirect' | 'render';
            /**
             * The route that will be redirected when the page is not found
             * Works only when the mode is set to redirect
             * 
             * @default: /404
             */
            route?: string;
            /**
             * The component that will be rendered when the page is not found
             * Works only when the mode is set to render
             * 
             * @default: router/NotFound Component
             */
            component?: React.ReactNode;
        }
    }
};