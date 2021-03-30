import { FC, FormEvent, useContext, useEffect, useState } from "react";
import { RolesContext, IRolesContextState } from '../../context';
import type { IRole } from '../../api';

export type IRolesTableProps = {
    caption: string,
}

const defaultNewRole: IRole = {
    id: null,
    label: '',
    name_canonical: '',
}

const RolesTable: FC<IRolesTableProps> = ({ caption }: IRolesTableProps) => {
    const ctxRoles : IRolesContextState = useContext<IRolesContextState>(RolesContext);
    const [newRole, setNewRole] = useState<IRole>(defaultNewRole);

    useEffect(() => {
        ctxRoles.loadPage( 1, 10, () => {});
    }, []);

    const removeRole = async (id: string|null): Promise<void> => {
        // TO DO: Add a confirm check here
        if (id !== null) {
            await ctxRoles.removeById(id, () => {});
        }
    }

    const handleNewRoleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const addedRole: IRole|null = await ctxRoles.addNew(newRole, addRoleError);
        if (addedRole) alert('Successfully added new Role');
    }

    const addRoleError = async (errors: any[]) => {
        errors.forEach(error => {
            console.error(error);
        });
    }

    return (
        ctxRoles && ctxRoles.loading ? (
            <span>Loading...</span>
        ) : (
            <table cellPadding={1} cellSpacing={1} style={{border: '1px solid red', width: '100%', maxWidth: 400}}>
                <caption>{ caption }</caption>
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ctxRoles && ctxRoles.roles && ctxRoles.roles.map((role,index) => {
                        return (
                            <tr key={`row_for_${role.id}`}>
                                <td>
                                    {role.label}
                                </td>
                                <td>
                                    <input type="button" value="X" onClick={() => {
                                        removeRole(role.id);
                                    }} />
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td></td>
                        <td>
                            <form onSubmit={handleNewRoleSubmit}>
                                <input type='text' name='label' value={newRole?.label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const neRole: IRole = {
                                        label: e.target.value,
                                        name_canonical: e.target.value.toLowerCase(),
                                    } as IRole;

                                    setNewRole(neRole);
                                }} />
                                <input type="submit" value="Add New" />
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    );
};

export default RolesTable;