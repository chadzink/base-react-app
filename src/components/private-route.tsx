import { createElement, ReactElement } from "react";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) : ReactElement => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? createElement(component, props)
            : <Redirect to={{pathname: '/login'}} />
    );

    return (
        <Route {...rest} render={routeComponent} />
    )
}

export default PrivateRoute;