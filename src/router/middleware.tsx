import React from 'react';
import { Route } from './types';
import Is from '@flk/supportive-is';

interface MiddlewareProps {
    route: Route;
    history: History;
    location: Location | any;
    component?: React.ReactNode;
    match?: {
        [key: string]: string;
    }
}

export default function Middleware(props: MiddlewareProps) {
    let { route, history, match } = props;

    let { params } = match || {};

    let middlewareList = route.middleware;

    if (middlewareList) {
        if (!Is.array(middlewareList)) {
            middlewareList = [middlewareList];
        }

        for (let middleware of (middlewareList as Function[])) {
            let output = middleware(route, history, params);

            if (output) {
                return output;
            }
        }
    }

    // scroll to the top page when navigating to new page
    window.scrollTo(0, 0);
    return <route.component params={params} history={history} />;
}