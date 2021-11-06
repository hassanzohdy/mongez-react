import React from 'react';
import { Route } from './types';

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

    // scroll to the top page when navigating to new page
    window.scrollTo(0, 0);
    return <route.component params={params} history={history} />;
}