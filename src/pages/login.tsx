import { FC, ReactElement } from 'react';
import { LoginLayout } from '../layouts';
import { LoginForm } from '../components/login';

const LoginPage : FC = () : ReactElement => {
    return (
        <LoginLayout>
            <p>
                Your user is not authenticated. Please use the login form to authenticate your user information.
            </p>
            <LoginForm />
        </LoginLayout>
    );
};

export default LoginPage;