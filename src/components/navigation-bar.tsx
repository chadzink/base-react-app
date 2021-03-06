import { FC, ReactElement } from "react";
import { Link } from 'react-router-dom';
import LogoutButton from './logout-button';

type INavBarProps = {
    isAuthenticated: boolean,
    logout: () => void;
}

const defaultNavBarProps : INavBarProps = {
    isAuthenticated: false,
    logout: () => {},
}

const NavigationBar: FC<INavBarProps> = (props: INavBarProps = defaultNavBarProps): ReactElement => {
    const { isAuthenticated } = props;

    return (
        <nav>
            [<Link to="/start">Start</Link>]
            [<Link to="/admin">Admin</Link>]
            [<Link to="/help">Help</Link>]
            [{ isAuthenticated
                ? <LogoutButton logout={props.logout} />
                : <Link to="/login">Login</Link>
            }]
        </nav>
    );
};

export default NavigationBar;