import { memo } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter>
            <Routes>{routes.map(renderRoute)}</Routes>
        </BrowserRouter>
    );
});
RouteController.displayName = 'RouteController';

export default RouteController;
