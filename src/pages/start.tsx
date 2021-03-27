import { FC, ReactElement, useContext, memo } from 'react';
import { PrimaryLayout } from '../layouts';
import { SessionContext, ISessionContextState } from '../context';

const _StartPage : FC = () : ReactElement => {
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
                User Name: {session.currentUser && session.currentUser.username}
            </p>
        </PrimaryLayout>
    );
};

const StartPage = memo(_StartPage);
export default StartPage;