import { FC, ReactElement } from "react";
import { Link } from 'react-router-dom';
import LogoutButton from './logout-button';

type NavBarProps = {
    isAuthenticated: boolean,
    logout: () => void;
}

const defaultNavBarProps : NavBarProps = {
    isAuthenticated: false,
    logout: () => {},
}

const NavigationBar: FC<NavBarProps> = (props: NavBarProps = defaultNavBarProps): ReactElement => {
    const { isAuthenticated } = props;

    return (
        <nav>
            <Link to="/start">Start</Link>
            <Link to="/about">About</Link>
            <Link to="/help">Help</Link>
            { isAuthenticated
                ? <LogoutButton logout={props.logout} />
                : <Link to="/login">Login</Link>
            }
        </nav>
    );
};

export default NavigationBar;