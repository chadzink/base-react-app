import { FC, ReactElement } from "react";

const LoginLayout: FC = ({ children }) : ReactElement => {
  return (
    <section>
        {children}
    </section>
  );
};

export default LoginLayout;