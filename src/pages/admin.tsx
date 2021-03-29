import { FC, ReactElement, memo } from "react";
import { PrimaryLayout } from '../layouts';
import { RoleTable } from '../components/admin';
import { RolesProvider } from '../context';

const _AdminPage : FC = () : ReactElement => {
    return (
        <PrimaryLayout>
            <h3>
                Admin Page
            </h3>
            <p>
                This page show only after authentication, but does not use the session context.
            </p>
            <RolesProvider>
                <RoleTable caption="Roles loaded using context store"></RoleTable>
            </RolesProvider>
        </PrimaryLayout>
    );
};

const AdminPage = memo(_AdminPage);
export default AdminPage;