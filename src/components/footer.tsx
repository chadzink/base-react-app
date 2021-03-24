import { FC, ReactElement } from "react";

const PublicFooter: FC = ({children}): ReactElement => {
    const copyrightYear: number = (new Date()).getFullYear();

    return (
        <footer>
            &copy; {copyrightYear} {children}
        </footer>
    );
};

export default PublicFooter;