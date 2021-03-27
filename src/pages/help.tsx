import { FC, ReactElement, memo } from "react";
import { Link } from 'react-router-dom';
import { PublicLayout } from '../layouts';

const _HelpPage : FC = () : ReactElement => {
    return (
        <PublicLayout>
            <h3>
                Help Page
            </h3>
            <p>
                This page demonstrates both a different layout and a page without user authentication (public).
            </p>
            <p>
                <Link to='/start'>Back to Start</Link>
            </p>
        </PublicLayout>
    );
};

const HelpPage = memo(_HelpPage);
export default HelpPage;