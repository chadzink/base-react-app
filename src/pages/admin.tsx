import { FC, ReactElement, memo } from "react";
import { PrimaryLayout } from '../layouts';
import { RoleTable } from '../components/admin';

const _AdminPage : FC = () : ReactElement => {
    return (
        <PrimaryLayout>
            <h3>
                About Page
            </h3>
            <p>
                This page show only after authentication, but does not use the session context.
            </p>
            <RoleTable caption="Roles loaded using redux store" ></RoleTable>
        </PrimaryLayout>
    );
};

const AdminPage = memo(_AdminPage);
export default AdminPage;