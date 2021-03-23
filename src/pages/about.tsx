import React, { FC, ReactElement } from "react";
import { PrimaryLayout } from '../layouts';

const AboutPage : FC = () : ReactElement => {
    return (
        <PrimaryLayout>
            <h3>
                About Page
            </h3>
            <p>
                This page show only after authentication, but does not use the session context.
            </p>
        </PrimaryLayout>
    );
};

export default AboutPage;