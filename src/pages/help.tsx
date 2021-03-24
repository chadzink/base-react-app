import { FC, ReactElement } from "react";
import { PublicLayout } from '../layouts';

const HelpPage : FC = () : ReactElement => {
    return (
        <PublicLayout>
            <h3>
                Help Page
            </h3>
            <p>
                This page show without user authentication.
            </p>
        </PublicLayout>
    );
};

export default HelpPage;