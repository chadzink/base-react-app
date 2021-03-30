import { FC, ReactElement, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StartPage, AdminPage, LoginPage, HelpPage } from './pages';
import { SessionContext, ISessionContextState } from './context';

const Routes : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);
    const finishedCheckingPreviousSession: boolean = (
        session.checkedCurrentUser && session.checkedRefreshToken
    );

    const protectedRoutes = (
        <Router>
            <Switch>
                <Route path='/start'><StartPage /></Route>
                <Route path='/admin'><AdminPage /></Route>
                <Route path='/help'><HelpPage /></Route>
                <Route path='/'><StartPage /></Route>
            </Switch>
        </Router>
    );

    const publicRoutes = (
        <Router>
            <Switch>
                <Route path='/login'><LoginPage /></Route>
                <Route path='/help'><HelpPage /></Route>
                <Route path='/'><LoginPage /></Route>
            </Switch>
        </Router>
    );

    return finishedCheckingPreviousSession
        ? ( session.isAuthenticated ? protectedRoutes : publicRoutes )
        : (<span>Restoring Session...</span>);
};

export default Routes;