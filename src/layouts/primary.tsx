import { FC, ReactElement } from "react";
import PrimaryHeader from '../components/primary-header';

const PrimaryLayout: FC = ({ children }) : ReactElement => {

  return (
    <>
        <PrimaryHeader title="My Example Title as Prop" />
        <nav>
            Nav Here
        </nav>
        <section>
            {children}
        </section>
        <footer>
            Footer Here
        </footer>
    </>
  );
};

export default PrimaryLayout;