import { FC, useContext, useEffect } from "react";
import { RolesContext, IRolesContextState } from '../../context';

// component here

export type IRolesTableProps = {
    caption: string,
}

const RolesTable: FC<IRolesTableProps> = ({ caption }: IRolesTableProps) => {
    const ctxRoles : IRolesContextState = useContext<IRolesContextState>(RolesContext);

    useEffect(() => {
        console.log('ROLE TABLE mounted');
        ctxRoles.loadPage( 1, 10, () => {});
    }, []);

    return (
        ctxRoles && ctxRoles.loading ? (
            <span>Loading...</span>
        ) : (
            <table cellPadding={1} cellSpacing={1} style={{border: '1px solid red', width: '100%', maxWidth: 400}}>
                <caption>{ caption }</caption>
                <thead>
                    <tr>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    {ctxRoles && ctxRoles.roles && ctxRoles.roles.map((role,index) => {
                        return (
                            <tr key={`row_for_${role.id}`}>
                                <td>
                                    {role.label}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    );
};

export default RolesTable;