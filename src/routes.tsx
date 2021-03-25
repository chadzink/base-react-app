import { FC, ReactElement, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { StartPage, AboutPage, LoginPage, HelpPage } from './pages';
import { SessionContext, ISessionContextState } from './context';
import PrivateRoute from './components/private-route';

const Routes : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);
    
    return (
        <Router>
            <Redirect exact from="/" to="/start" />
            <Switch>
                <PrivateRoute path='/start' component={StartPage} isAuthenticated={session.isAuthenticated} />
                <PrivateRoute path='/about' component={AboutPage} isAuthenticated={session.isAuthenticated} />
                <Route path='/help'><HelpPage /></Route>
                <Route path='/login'><LoginPage /></Route>
            </Switch>
        </Router>
    );
};

export default Routes;