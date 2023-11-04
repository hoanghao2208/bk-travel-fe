import { memo } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import RouteElement from 'route/components/RouteElement';
import routes from 'route/routes';

const renderRoute = route => {
    const {
        name,
        path,
        Component,
        authorization,
        redirect,
        childRoutes,
        requireSite,
        props,
    } = route;
    return (
        <Route
            key={name}
            path={path}
            element={
                <RouteElement
                    authorization={authorization}
                    redirect={redirect}
                    path={path}
                    requireSite={requireSite}
                    key={name}
                >
                    {Component && <Component {...props} />}
                </RouteElement>
            }
        >
            {childRoutes && childRoutes.map(renderRoute)}
        </Route>
    );
};

const RouteController = memo(() => {
    return (
        <HashRouter>
            <Routes>{routes.map(renderRoute)}</Routes>
        </HashRouter>
    );
});
RouteController.displayName = 'RouteController';

export default RouteController;
