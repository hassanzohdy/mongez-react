import React from 'react';
import { Route } from './routes-list';
interface MiddlewareProps {
    route: Route;
    history: History;
    location: Location | any;
    component?: React.ReactNode;
    match?: {
        [key: string]: string;
    };
}
export default function Middleware(props: MiddlewareProps): any;
export {};
