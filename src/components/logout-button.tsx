import { FC } from "react";
import { useHistory } from 'react-router-dom';

type ILogoutButtonProps = {
    logout: () => void;
}


const defaultLogoutButtonProps : ILogoutButtonProps = {
    logout: () => {},
}

const LogoutButton: FC<ILogoutButtonProps> = (props: ILogoutButtonProps = defaultLogoutButtonProps) => {
    const { logout } = props;
    let history = useHistory();

    return (
        <input type="button" value="Logout" onClick={() => {
            logout();
            history.push('/login');
        }} />
    );
}

export default LogoutButton;