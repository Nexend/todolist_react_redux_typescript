import React from "react";
import Login from "../pages/Login";
import Event from '../pages/Event';
import Registration from "../pages/Registration";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
    REGISTRATION = '/registration'
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, exact: true, component: Login },
    { path: RouteNames.REGISTRATION, exact: true, component: Registration }
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.EVENT, exact: true, component: Event }
]