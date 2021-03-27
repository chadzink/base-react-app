import { FC } from "react";

import { IRole } from '../../api';

// component here

export type IRolesTableProps = {
    caption: string,
}

const RolesTable: FC<IRolesTableProps> = ({ caption }: IRolesTableProps) => {
    const roles: readonly IRole[]|null = []

    return (
        <table cellPadding={1} cellSpacing={1} style={{width: '100%', maxWidth: 400}}>
            <caption>{ caption }</caption>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Label</th>
                </tr>
            </thead>
            <tbody>
                {roles && roles.map((role,index) => {
                    return (
                        <tr>
                            <td>
                                {role.id}
                            </td>
                            <td>
                                {role.label}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default RolesTable;