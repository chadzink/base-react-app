import { FC, FormEvent, ReactElement, useContext } from 'react';
import { SessionContext, ISessionContextState } from '../../context';

const LoginForm : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // to do check if form is valid
        const submitSuccess: boolean = await submitForm();
    };

    const submitForm = async () : Promise<boolean> => {
        const loginUser = session.userLogin('chadzink', 'password');
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