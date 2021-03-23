import { FC, ReactElement, useContext } from 'react';
import { PrimaryLayout } from '../layouts';
import { SessionContext, ISessionContextState } from '../context';

const StartPage : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

    return (
        <PrimaryLayout>
            <h3>
                Welcome!
            </h3>
            <p>
                Start Page Content, shows after authentication.
            </p>
            <p>
                User Name: {session.currentUser.username}
            </p>
        </PrimaryLayout>
    );
};

export default StartPage;