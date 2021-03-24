import { FC, FormEvent, ReactElement, useContext } from 'react';
import { SessionContext, ISessionContextState } from '../../context';
import { useHistory } from 'react-router-dom';

const LoginForm : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);
    let history = useHistory();

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // to do check if form is valid
        const submitSuccess: boolean = await submitForm();
        if (submitSuccess) {
            history.push('/start');
        }
    };

    const submitForm = async () : Promise<boolean> => {
        const loginUser = await session.authenticate('chadzink', 'password');
        console.log(loginUser);
        return true;
    };

    return (
        <div>
            {session.loading ? (
                <span>Loading...</span>
            ) : (
                <form onSubmit={handleLoginSubmit}>
                    <input type="submit" value="Login" />
                </form>
            )}
        </div>
    );
};

export default LoginForm;