import { FC, ReactElement, useContext, memo } from 'react';
import { Link } from 'react-router-dom';

import { SessionContext, ISessionContextState } from '../context';
import { LoginLayout } from '../layouts';
import { LoginForm } from '../components/login';

const _LoginPage : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

    return (
        <LoginLayout>
            {session.loading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <p>Your user is not authenticated. Please use the login form to authenticate your user information.</p>
                    <LoginForm />
                    <p>
                        <Link to='/help'>Get Help</Link>
                    </p>
                </>
            )}
        </LoginLayout>
    );
};

const LoginPage = memo(_LoginPage);
export default LoginPage;