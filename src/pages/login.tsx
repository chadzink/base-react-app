import { FC, ReactElement, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SessionContext, ISessionContextState } from '../context';
import { LoginLayout } from '../layouts';
import { LoginForm } from '../components/login';

const LoginPage : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);
    const history = useHistory();

    useEffect(() => {
        // check if the user was redirect to this by the router, but the current user is authenticated
        if (!session.loading && session.isAuthenticated) {
            history.push(session.appStartUrl);
        }
    }, [session, history]);

    return (
        <LoginLayout>
            {session.loading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <p>Your user is not authenticated. Please use the login form to authenticate your user information.</p>
                    <LoginForm />
                </>
            )}
        </LoginLayout>
    );
};

export default LoginPage;