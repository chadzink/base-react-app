import React, { FC, ReactElement, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StartPage, AboutPage, LoginPage } from './pages';
import { SessionContext, ISessionContextState } from './context';

type RouterProps = {
    history: any,
}

const Routes : FC<RouterProps> = ({history}) : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

    return (
        <Router>
            {session.authenticated ? (
                <Switch>
                    <Route path="/start" component={StartPage} />
                    <Route path="/about" component={AboutPage} />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" component={LoginPage} />
                </Switch>
            )}
        </Router>
    );
};

export default Routes;