import React from 'react';
export interface BasicComponentProps {
    key?: string;
    [key: string]: any;
    children?: React.ReactNode;
}
declare type Middleware = React.ReactNode | React.ReactNode[];
declare type Wrapper = React.FunctionComponent<BasicComponentProps>;
export interface Route {
    path: string;
    component: React.FunctionComponent<BasicComponentProps>;
    middleware?: Middleware;
}
export interface Layout {
    LayoutComponent: Wrapper;
    routes: Route[];
    routesList: string[];
}
export interface GroupOptions {
    routes: Route[];
    path: string;
    middleware: Middleware;
    layout: Wrapper;
}
/**
 * Default Full Page >> It Will be just a React Fragment
 */
export declare const FULL_PAGE: Wrapper;
/**
 * Set all layouts that will wrap the application routes
 *
 * @const  {Array}
 */
export declare const layoutsList: Array<Layout>;
/**
 * Add new route to the routes list of full page
 *
 * @param {string} path
 * @param {React.Component} component
 * @param {Function|Array|null} middleware
 */
export declare function addRouter(path: string, component: React.FunctionComponent<BasicComponentProps>, middleware?: any): void;
/**
 * Add the given routes as part of the given layout
 *
 * @param  {React.Component} LayoutComponent
 * @param  {Array} routes
 */
export declare function partOf(LayoutComponent: Wrapper, routes: Array<Route>): void;
/**
 * Group the given routes with the given options
 *
 * @param  object groupOptions
 */
export declare function group(groupOptions: GroupOptions): void;
export {};
