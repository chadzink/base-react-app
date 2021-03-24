import { FC, ReactElement, useContext } from "react";
import { SessionContext, ISessionContextState } from '../context';

import PrimaryHeader from '../components/primary-header';
import PublicFooter from '../components/footer';
import NavigationBar from '../components/navigation-bar';

const PrimaryLayout: FC = ({ children }) : ReactElement => {
  const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

  return (
    <>
      <PrimaryHeader title="My Example Title as Prop" />
      <NavigationBar isAuthenticated={session.isAuthenticated} logout={session.logout} />
      <section>
        {children}
      </section>
      <PublicFooter>
        Footer Here
      </PublicFooter>
    </>
  );
};

export default PrimaryLayout;