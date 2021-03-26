import { FC, ReactElement, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import { StartPage, AboutPage, LoginPage, HelpPage } from './pages';
import { SessionContext, ISessionContextState } from './context';
import PrivateRoute from './components/private-route';
import * as RoleStore from './state/roles';

export const store: Store<RoleStore.IRolesStoreState, RoleStore.IRolesStoreAction> & {
    dispatch: RoleStore.RoleStoreDispatchType
} = createStore(RoleStore.reducerRoleStore, applyMiddleware(thunk));

const Routes : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

    const dispatch: Dispatch<any> = useDispatch()

    const fetchRoles = useCallback(
      () => dispatch(RoleStore.loadRoles()),
      [dispatch]
    );

    return (
        <Provider store={store}>
            <Router>
                <Redirect exact from="/" to="/start" />
                <Switch>
                    <PrivateRoute path='/start' component={StartPage} isAuthenticated={session.isAuthenticated} />
                    <PrivateRoute path='/about' component={AboutPage} isAuthenticated={session.isAuthenticated} />
                    <Route path='/help'><HelpPage /></Route>
                    <Route path='/login'><LoginPage /></Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default Routes;