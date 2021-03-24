import { FC, ReactElement } from "react";
import PublicFooter from '../components/footer';
import PublicHeader from '../components/public-header';

const PublicLayout: FC = ({ children }) : ReactElement => {

  return (
    <>
      <PublicHeader title={"Public Space Title"} />
      <section>
          {children}
      </section>
      <PublicFooter>
          Footer Here
      </PublicFooter>
    </>
  );
};

export default PublicLayout;